/*
 * @author Dalmau
 * 15/12/2018
 */

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

/*
   Interface de la machine de Turing + moteur qui la fait fonctionner
 */
public class MachineDeTuring extends JFrame {
	private static final long serialVersionUID = 1L; // Pour éviter un warning

	// Propriétés liées à l'interface
	private VueBande vueBande; // Dessin de la bande de la machine de Turing
	private VueTableDEtats vueEtats; // Affichage de la table d'états lue dans un fichier
	private JLabel ligneDEtat; // Affiche des messages de fonctionnement ou d'erreurs
	private JTextFieldCache etatActuel, caractereLu, actionAFaire; // Zones d'affichage de ce que fait la machine
	private JTextField chaineInit; // Zone de saisie ou de récupération du texte écrit sur la bande
	private JButton reinitialiser, pasAPas, demarrer; // Boutons pour initialiser, faire une étape et lancer/mettre en pause
	private JButton capturer; // Capture le contenu de la bande
	private JLabel anime; // Image animée pour faire joli
	private static final String NOM_IMAGE_ANIMEE = "engrena_035.gif"; // gif animé
	private static final String NOM_IMAGE_FIXE = "engrena_0.gif"; // gif fixe
	private JSlider curseurVitesse; // Curseur de réglage de la vitesse d'exécution
	private static final int CURSEUR_MIN = 0, CURSEUR_MAX = 9, CURSEUR_INIT = 3; // min, max et position initiale du curseur
	private static final int TEMPS_PAR_UNITE = 100; // Temps d'attente par unité du curseur de vitesse
	private boolean aProposVisible, aideVisible; // Indiquent si les fenêtres "à propos" et "aide" sont ou non visibles
	private static final Color SURLIGNAGE = Color.red; // Couleur de surlignage dans la table d'états
	private static final Color COULEUR_ERREUR = Color.red; // Couleur d'affichage des messages d'erreur
	
	// Propriétés liées au fonctionnement de la machine de Turing
	private static final String SUFFIXE_FICHIERS = "txt"; // suffixe utilisé pour les fichiers contenant des tables d'état
	private int delaiMachine; // Délai en ms pour ralentir le fonctionnement de la machine
	private TableDEtats tableDesEtats; // Table des états et transitions de la machine
	// Les propriétés suivantes sont volatiles car modifiées par des Threads
	private volatile boolean dernierPas; // Devient true quand la machine s'arrête
	private volatile int rangSurligne; // Numero de ligne surlignée dans la table (-1 si aucune)

	// Création de l'interface
	public MachineDeTuring() {
		super("Machine de Turing"); // Titre de la fenêtre
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Arrêt du programme par fermeture de la fenêtre
		
		// Menu
		JMenu menuFichier = new JMenu("Fichier"); // Menu pour ouvrir un fichier d'états
		menuFichier.setToolTipText("Fichier de table de transition"); // Simple aide
		JMenuItem ouvrir = new JMenuItem("Ouvrir"); // Ouvrir un fichier d'états
		menuFichier.add(ouvrir);
		ouvrir.setToolTipText("Ouvrir un fichier contenant une table de transistion"); // Simple aide
		ouvrir.addActionListener(new ActionOuvrirFichier()); // Action de lecture 
		JMenu menuAide = new JMenu("?"); // Rubriques aide et à propos
		menuAide.setToolTipText("Aide et copyright"); // Simple aide
		JMenuItem aide = new JMenuItem("Aide"); // Fonction d'affichage d'une aide générale
		aide.setToolTipText("Affichage d'une aide à l'utilisation de l'application");
		aide.addActionListener(new ActionAide()); // Traitement associé à l'aide générale
		JMenuItem aPropos = new JMenuItem("A propos"); // Fonction d'affichage de copyright
		aPropos.setToolTipText("Affichage du copyright");
		aPropos.addActionListener(new ActionAPropos()); // Traitement associé au copyright
		menuAide.add(aPropos); menuAide.add(aide); // Ajoutées à la rubrique
		JMenuBar laBarre = new JMenuBar(); // Création de la barre de menu
		laBarre.add(menuFichier); laBarre.add(menuAide); // Ajout des rubriques à la barre de menu
		setJMenuBar(laBarre); // Ajout de la barre de menu à la fenêtre		
		
		 // Titre général + image animée (en haut)
		getContentPane().setLayout(new BorderLayout(10, 0));
		JPanel zoneTitre = new JPanel(); // Titre et image
		zoneTitre.setLayout(new FlowLayout()); // Le titre et l'image sont placés côte à côte
		getContentPane().add(zoneTitre, BorderLayout.NORTH); // En haut de l'interface
		JLabel titre = new JLabel("Simulateur de machine de Turing", JLabel.CENTER); // Titre
		titre.setFont(new Font("Serif",Font.BOLD, 30)); // En gras et police 30
		zoneTitre.add(titre);
		// Image récupérée sur : http://gif.toutimages.com/images/objets/engrenages/index.htm
		anime = new JLabel(); // Zone d'affichage de l'image
		afficheImageTitre(NOM_IMAGE_FIXE); // Afficher l'image fixe
		zoneTitre.add(anime);
		
		 // Ligne d'affichage d'erreurs ou états (en bas)
		ligneDEtat = new JLabel(" "); // Ne pas la créer vide pour qu'elle apparaisse au départ
		ligneDEtat.setToolTipText("Affiche des messages de fonctionnement ou d'erreurs");
		getContentPane().add(ligneDEtat, BorderLayout.SOUTH); // La ligne d'affichage d'erreurs ou états est en bas
		
		// Machine (à gauche)
		JPanel centre = new JPanel();
		centre.setLayout(new BorderLayout());
		getContentPane().add(centre, BorderLayout.CENTER); // A gauche car il n'y rien à l'ouest
		vueBande = new VueBande(); // Affichage de la bande et de la tête de lecture/écriture
		vueBande.setToolTipText("Bande et  tête de la machine de Turing");
		centre.add(vueBande, BorderLayout.NORTH);
		
		JPanel panneauMachine = new JPanel(); // Vue de la bande+tête et de ce que fait la machine
		panneauMachine.setLayout(new GridLayout(3,1,2,2));
		centre.add(panneauMachine, BorderLayout.CENTER);
		JPanel etatMachine = new JPanel();
		panneauMachine.add(etatMachine);
		etatMachine.setLayout(new FlowLayout(FlowLayout.CENTER));
		etatMachine.add(new JLabel("Etat actuel"));
		etatActuel = new JTextFieldCache(5); // Affichage de l'état actuel de la machine
		etatActuel.setFont(etatActuel.getFont().deriveFont(Font.BOLD | Font.ITALIC));
		etatActuel.setForeground(Color.BLUE);
		etatActuel.setToolTipText("Etat actuel de la machine (l'état initial est défini par la 1ère ligne du fichier)");
		etatActuel.setHorizontalAlignment(JTextField.CENTER);
		etatMachine.add(etatActuel);
		etatMachine.add(new JLabel("Caractère lu"));
		caractereLu = new JTextFieldCache(5); // Affichage du caractère lu par la tête
		caractereLu.setFont(caractereLu.getFont().deriveFont(Font.BOLD | Font.ITALIC));
		caractereLu.setForeground(Color.BLUE);
		caractereLu.setToolTipText("Caractère lu par la tête de la machine");
		caractereLu.setHorizontalAlignment(JTextField.CENTER);
		caractereLu.setText(vueBande.getCaractereLu());
		etatMachine.add(caractereLu);
		etatMachine.add(new JLabel("Action : "));
		actionAFaire = new JTextFieldCache(20); // Affichage de l'action à effectuer (droite/gauche/arrêt)
		actionAFaire.setFont(actionAFaire.getFont().deriveFont(Font.BOLD | Font.ITALIC));
		actionAFaire.setForeground(Color.BLUE);
		actionAFaire.setToolTipText("Action  effectuée par la machine");
		actionAFaire.setHorizontalAlignment(JTextField.CENTER);
		etatMachine.add(actionAFaire);

		JPanel controleMachine = new JPanel(); // Panneau de contrôle de la machine
		panneauMachine.add(controleMachine);
		controleMachine.setLayout(new FlowLayout(FlowLayout.CENTER));
		curseurVitesse = new JSlider (JSlider.HORIZONTAL, CURSEUR_MIN, CURSEUR_MAX, CURSEUR_INIT); // Réglage de la vitesse
		curseurVitesse.setMajorTickSpacing (2);
		curseurVitesse.setMinorTickSpacing (1);
		curseurVitesse.setPaintTicks (true);
		curseurVitesse.setSnapToTicks (true);
		curseurVitesse.setToolTipText("Réglage de la vitesse d'exécution (vers la droite pour ralentir)");
		controleMachine.add(curseurVitesse); // Affichage du réglage de la vitesse
		curseurVitesse.addChangeListener(new ActionChangerVitesse()); // Action associé à la modification du curseur de vitesse
		reinitialiser = new JButton("Réinitialiser"); // Init de la machine => état initial et tête sur le 1er caractère
		reinitialiser.setToolTipText("Initialiser ou réinitialiser la machine");
		reinitialiser.addActionListener(new ActionReinitialiser()); // Action associé à l'init de la machine
		controleMachine.add(reinitialiser); // Affichage du bouton pour réinitialise la machine
		pasAPas = new JButton("Faire une étape"); // Bouton pour exécuter une étape de l'automate
		pasAPas.setToolTipText("Effectuer une étape de la table de transition");
		pasAPas.addActionListener(new ActionFaireUnPas()); // Action associée à l'exécution d'une étape de l'automate
		pasAPas.setEnabled(false); // Au début on ne peut pas faire d'étape
		controleMachine.add(pasAPas); // Affichage du bouton pour exécuter une étape de l'automate
		demarrer = new JButton("Démarrer"); // Bouton pour lancer la machine jusqu'à l'arrêt ou mise en pause
		demarrer.setToolTipText("Démarrer ou mettre en pause la machine");
		demarrer.addActionListener(new ActionDemarrer()); // Action associée au démarrage et à la mise en pause
		demarrer.setEnabled(false); // Au début on ne peut pas lancer la machine
		controleMachine.add(demarrer); // Affichage du bouton pour lancer la machine jusqu'à l'arrêt ou mise en pause
		
		JPanel saisiChaine = new JPanel(); // Saisie et capture du texte sur la bande 
		panneauMachine.add(saisiChaine); // Zone de saisie de la chaîne à écrire sur la bande (donnée du problème)
		saisiChaine.setLayout(new FlowLayout(FlowLayout.CENTER));
		saisiChaine.add(new JLabel("Texte sur la bande : ")); // Indication
		chaineInit = new JTextField(20);  // Saisie de la chaîne à écrire sur la bande (donnée du problème)
		chaineInit.setToolTipText("Saisie de la donnée à écrire sur la bande (validée par le bouton Réinitialiser)");
		saisiChaine.add(chaineInit); // Affichage de la zone de saisie de la chaîne à écrire sur la bande (donnée du problème)
		capturer = new JButton("Capturer"); // Bouton permettant de capturer le texte actuellement sur la bande
		capturer.setToolTipText("Capture le contenu de la bande comme donnée saisie");
		capturer.addActionListener(new ActionCapturer());
		saisiChaine.add(capturer); // Affichage du bouton permettant de capturer le texte actuellement sur la bande
		vueBande.changeContenu(chaineInit.getText()); // Ecrire la chaîne saisie sur la bande (donnée du problème)
		caractereLu.setText(vueBande.getCaractereLu()); // Afficher le caractère lu par la tête (càd le 1er)
		
		// Table d'états (à droite)
		vueEtats = new VueTableDEtats(); // initialement vide pauis placée à droite quand remplie

		// Initialisation de l'état du programme
		aProposVisible = false; // La fenêtre "à propos" n'est pas visible actuellement
		aideVisible = false; // La fenêtre "aide" n'est pas visible actuellement
		tableDesEtats = null; // La table ne sera créée que par lecture d'un fichier
		dernierPas = false; // La machine n'a pas atteint la fin d'un traitement
		rangSurligne = -1; // Pas de rang surligné dans la table
		delaiMachine = curseurVitesse.getValue()* TEMPS_PAR_UNITE; // calcul du delai selon la position du curseur

		// Affichage de la fenêtre + contraintes de taille minimale
		pack();
		setVisible(true);
		// Le texte du bouton change mais sa taille actuelle ne doit pas changer
		demarrer.setPreferredSize(new Dimension(demarrer.getWidth(), demarrer.getHeight()));
		setMinimumSize(new Dimension(getWidth(), getHeight())); // Taille minimale de la fenêtre = sa taille actuelle
	}
	
	// Affiche un message d'état (en noir)
	public void afficheEtat(String message) { 
		ligneDEtat.setForeground(Color.black); // en noir
		ligneDEtat.setText("  "+message);
	}
	
	// Affiche un message d'erreur (dans la couleur définie par 'COULEUR_ERREUR')
	public void afficheErreur(String message) { 
		ligneDEtat.setForeground(COULEUR_ERREUR); // Couleur définie pour les erreurs
		ligneDEtat.setText("  "+message);
	}
	
	// Affiche une image prise dans le jar
	private void afficheImageTitre(String nom) { // Reçoit le nom du fichier
		ImageIcon roues = new ImageIcon (getClass().getClassLoader().getResource(nom)); // Le fichier dans le jar
		if (roues.getImage() != null) { // Si on obtenu l'image
			if ((roues.getIconWidth() != 0) && (roues.getIconHeight() != 0)) {  // Et qu'elle n'est pas vide
				// Réduire sa taille d'un tiers en largeur et en hauteur
			    roues.setImage(roues.getImage().getScaledInstance(roues.getIconWidth()/3, roues.getIconHeight()/3, Image.SCALE_DEFAULT));
			    anime.setIcon(roues);  // Afficher l'image réduite
			}
		}
	}
	
	// Action du bouton de réinitialisation de la machine
	private class ActionReinitialiser implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent evt) {
			if ((chaineInit.getText().length() != 0) && (tableDesEtats != null)) { // Il faut un texte sur la bande et une table d'états
				try {
					etatActuel.setText(tableDesEtats.getEtatInitial()); // Affiche l'état initial (1ère ligne du fichier)
					pasAPas.setEnabled(true); // On peut faire une étape
					demarrer.setEnabled(true); // On peut lancer la machine
					dernierPas = false; // On n'est pas encore arrivé à la fin (on commence)
					vueBande.changeContenu(chaineInit.getText()); // Afficher le texte saisi saur la bande
					caractereLu.setText(vueBande.getCaractereLu()); // Afficher le caractère lu par la tête
					actionAFaire.setText("");// Pas d'action à faire pour le moment
					afficheEtat("Machine prête"); // Indiquer que la machine a été initialisée
					if (rangSurligne != -1) { // Enlever l'ancien surlignage dans la table des états s'il y en a un
						vueEtats.surligneLigne(rangSurligne, Color.black, Font.PLAIN, false); 
					}
					if (delaiMachine != 0) { // On ne surligne pas à vitesse max
						rangSurligne = vueEtats.getLigne(etatActuel.getText(), caractereLu.getText()); // Ligne de l'état actuel et du car lu
						vueEtats.surligneLigne(rangSurligne, SURLIGNAGE, Font.BOLD, true); // Surligner l'état actuel dans la table des états
					}
				} 
				catch (MoteurException e) { // La table ne contient rien pour l'état in initial et le caractère lu 
					afficheErreur(e.getMessage()); // C'est une erreur
					return;
				}
			}
			else { // Pas de texte sur la bande ou pas de table d'états => erreur
				if (chaineInit.getText().length() == 0) afficheErreur("Pas de texte sur la bande");
				else afficheErreur("Pas de table d'états");
			}
		}
	}
	
	// Thread qui exécute une étape de l'automate.
	// Toutes les modifications d'interface sont faites dans des threads lancés par SwingUtilities.invokeLater
	// et dont on attend la terminaison grâce à un sémaphore.
	// Sinon il y a des problèmes d'accès en parallèle à l'interface que swing ne sait pas gérer
	// par conséquent il y a des affichages qui se font au mauvais endroit !
	// Ce thread est lui même un thread dont on peut attendre la terminaison sur un sémaphore
	private class FaitUnPasEnParallele extends ThreadSynchrone { // Thread dont on peut attendre la terminaison sur un sémaphore
		private int delai; // Délai pour ralentir le fonctionnement
		private ActionAFaire action; // Caractère à écrire, nouvel état et déplacement de la bande
		private String ecrire; // Caractère à écrire
		private String actuel, carLu; // Etat actuel de la amchine et caractère lu par la tête
		private boolean erreur; // Devient true si une erreur se produit lors d'une étape de calcul
		private boolean continu; // true si la machine fonctionne en continu
		
		// Création avec un délai pour ralentir 
		// et un booleen indiquant si la machine fonctionne ou non en continu
		public FaitUnPasEnParallele(int delai, boolean cont) {
			this.delai = delai; // Délai pour ralentir le fonctionnement
			continu = cont; // true si la machine fonctionne en continu
			dernierPas = false; // La machine n'a pas fini
			erreur = false; // Pour le moment il n'y a pas d'erreur (on commence)
			afficheEtat("Etape en cours"); // Message dans la ligne d'état (en bas)
			etatActuel.setCache(delai == 0); // Pas d'affichage à vitesse max
			caractereLu.setCache(delai == 0); // Pas d'affichage à vitesse max
			actionAFaire.setCache(delai == 0); // Pas d'affichage à vitesse max
			start(); // Lancement d'une étape
		}
		
		// Tâche du Thread = gérer les boutons et le gif animé, faire une étape, détecter la terminaison et les erreurs
		@Override
		public void tache() { 
			afficheImageTitre(NOM_IMAGE_ANIMEE); // Animer l'image
			pasAPas.setEnabled(false); // On ne peut pas faire d'étape pendant une étape
			reinitialiser.setEnabled(false); // On ne peut pas réinitialiser la machine pendant une étape
			if (!continu) demarrer.setEnabled(false); // On ne peut pas démarrer la machine pendant du pas à pas
			faireUnPas(delai); // Faire une étape complète
			if (!dernierPas) { // Si ce n'est pas terminé et qu'il n'y a pas eu d'erreur
				afficheEtat("Fin d'étape"); // Indiquer que l'étape est finie
				pasAPas.setEnabled(true); // On peut faire une autre étape
				demarrer.setEnabled(true); // On peut lancer ou mettre en pause la machine
			}
			else { // Si c'est terminé (avec ou sans erreur)
				if (!erreur) afficheEtat("Fin de calcul"); // s'il n'y a pas d'erreur indiquer que c'est juste fini
			}
			etatActuel.setCache(false); // Retour au mode d'affichage normal
			caractereLu.setCache(false); // Retour au mode d'affichage normal
			actionAFaire.setCache(false); // Retour au mode d'affichage normal
			reinitialiser.setEnabled(true); // On peut réinitialiser la machine après chaque étape ou à la fin
			afficheImageTitre(NOM_IMAGE_FIXE); // Arêter l'image animée
		}
		
		// Laisse un délai si la vitesse choisie n'est pas la vitesse maximale
		private void ralentir() {
			if (delai != 0) { // Si on n'est pas à vitesse maximale indiquer l'effacement + délai
				try { sleep(delai); }
				catch(InterruptedException ie) {}
			}
		}
		
		// lance un thread dans la queue d'événements de swing pour éviter les problèmes d'affichage
		private void lancerParSwing(ThreadSynchrone tache) {
			SwingUtilities.invokeLater(tache); // Lancer un thread par swing
			tache.attendreFin(); // Attendre que ce soit fait par swing
		}
		
		// Exécution d'une étape de l'automate
		// Toutes les modifications d'interface sont faites dans des threads lancés par swing
		// Pour éviter les problèmes d'accès en parallèle à l'interface que swing ne sait pas gérer
		// et donc des affichages qui se font au mauvais endroit
		private void faireUnPas(int delai) {
			dernierPas = false; // Valeur de retour : false si la machine s'est arrêtée ou une erreur est survenue
			actuel = etatActuel.getText(); // Récupérer l'état actuel
			carLu = caractereLu.getText(); // Récupérer le caractère lu par la tête
			if (carLu.equals(" ")) carLu = "."; // Les espaces sont notés par des . dans le fichier
			try {
				action = tableDesEtats.getActionAFaire(actuel, carLu); // Récupérer ce qu'il faut faire
			}
			catch (MoteurException me){ // Erreur : état inexistant ou table incomplète
				afficheErreur(me.getMessage());
				dernierPas = true; // Arrêt de la machine car erreur
				erreur = true; // Arrêt de la machine sur erreur
				action = null; // Il n'y a plus rien à faire
			}
			if (action != null) { // S'il y a quelque chose à faire
				// Changer d'état et effacer le caractère sous la tête
				lancerParSwing(new ChangerDEtat());
				ralentir();
				// Ecrire le caractère de remplacement
				lancerParSwing(new ChangerCaractere());
				ralentir();
				// Déplacement de la bande ou arrêt de la machine
				if (action.getAction().equals("D")) { // Déplacement vers le caractère de droite
					lancerParSwing(new BandeADroite());
				}
				else if (action.getAction().equals("G")) {// Déplacement vers le caractère de gauche
					lancerParSwing(new BandeAGauche());
				}
				else if (action.getAction().equals("A")) { // Arrêt de la machine
					dernierPas = true; // C'est fini sans erreur
				}
			}
			if (!dernierPas) { // Si on n'a pas fini
				// Afficher le nouveau caractère lu par la tête et surligner l'état actuel dans la table des états + délai
				lancerParSwing(new Surligne());
				ralentir();
			}
			else { // On a fini avec ou sans erreur
				// Nouvel état = arrêt, il n'est plus possible de faire une étape ni de lancer la machine
				lancerParSwing(new Finir());
			}
		}
		
		// Les 6 threads suivants modifient l'interface et sont donc lancés par SwingUtilities.invokeLater
		
		// Thread pour afficher le nouvel état et effacer le caractère sous la tête
		private class ChangerDEtat extends ThreadSynchrone  {  // Thread dont on peut attendre la terminaison sur un sémaphore
			@Override
			public void tache() {
				etatActuel.setText(action.getEtatSuivant()); // Nouvel état (affiché si pas vitesse max)
				ecrire = action.getCaractereEcrit(); // Caractère à écrire
				if (ecrire.equals(".")) ecrire = " "; // Les espace sont notés par des . dans le fichier 
				vueBande.changeCaractere(" ", (delai != 0)); // Effacer la caractère sous la tête
				actionAFaire.setText("Caractère effacé");  // Action (affichée si pas vitesse max)
			}
		}
		
		// Thread pour changer le caractère qui est sous la tête
		private class ChangerCaractere extends ThreadSynchrone  { // Thread dont on peut attendre la terminaison sur un sémaphore
			@Override
			public void tache() {
				vueBande.changeCaractere(ecrire, (delai != 0)); // Ecrire le caractère de remplacement
				actionAFaire.setText("Caractère écrit");  // Action (affichée si pas vitesse max)
			}
		}
		
		// Thread pour décaler la bande pour mettre la tête sur le caractère de droite
		private class BandeADroite extends ThreadSynchrone { // Thread dont on peut attendre la terminaison sur un sémaphore
			@Override
			public void tache() {
				vueBande.aDroite(); // Mettre la tête sur le caractère de droite (mouvement toujours visible)
				actionAFaire.setText("Décalage à droite");  // Action (affichée si pas vitesse max)
			}
		}
		
		// Thread pour décaler la bande pour mettre la tête sur le caractère de gauche
		private class BandeAGauche extends ThreadSynchrone { // Thread dont on peut attendre la terminaison sur un sémaphore
			@Override
			public void tache() {
				vueBande.aGauche(); // Mettre la tête sur le caractère de gauche (mouvement toujours visible)
				actionAFaire.setText("Décalage à gauche");  // Action (affichée si pas vitesse max)
			}
		}
		
		// Thread pour montrer et surligner la ligne correspondant à l'état actuel dans la table
		private class Surligne extends ThreadSynchrone { // Thread dont on peut attendre la terminaison sur un sémaphore
			@Override
			public void tache() {
				caractereLu.setText(vueBande.getCaractereLu()); // Afficher le nouveau caractère lu par la tête sauf si vitesse max
				if (delai != 0) { // A vitesse max on ne montre pas la ligne de la table d'états
					try {
						// Enlever le surlignage de l'état précédent dans la table
						rangSurligne = vueEtats.getLigne(actuel, carLu);
						vueEtats.surligneLigne(rangSurligne, Color.black, Font.PLAIN, false); 
						// Surligner l'état actuel dans la table si on n'est pas à vitesse max
						if (delaiMachine != 0) {
							rangSurligne = vueEtats.getLigne(etatActuel.getText(), caractereLu.getText());
							vueEtats.surligneLigne(rangSurligne, SURLIGNAGE, Font.BOLD, true);
						}
					}
					catch (MoteurException me){ // Le nouvel état n'existe pas
						afficheErreur(me.getMessage());
						dernierPas = true; // C'est fini
						erreur = true; // Arrêt sur erreur
					}
				}
			}
		}
		
		// Thread pour terminer le calcul (dernière étape)
		private class Finir extends ThreadSynchrone { // Thread dont on peut attendre la terminaison sur un sémaphore
			@Override
			public void tache() {
				actionAFaire.setCache(false); // L'affichage de l'arrêt doit être visible
				actionAFaire.setText("Arrêt"); // On n'a plus rien à faire d'autre
				pasAPas.setEnabled(false); // Il n'est plus possible de faire une étape
				demarrer.setEnabled(false);// Il n'est plus possible de lancer la machine
			}
		}
	}	
	
	// Action associée au bouton qui exécute une étape
	private class ActionFaireUnPas implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent evt) {
			if (!dernierPas) { // Si la machine n'a pas fini
				new FaitUnPasEnParallele(delaiMachine, false); // Faire une étape en parallèle
			}
		}
	}
	
	// Thread qui effectue des étapes jusqu'à ce que la machine s'arrête
	private class MarcheContinueEnParallele extends Thread {
		private volatile boolean enMarche; // Pour arrêter ce thread (pause)
		
		public MarcheContinueEnParallele() {
			enMarche = true; // Le thread démarre
			start();
		}
		
		public void arreter() { 
			enMarche = false; // Le thread s'arrête
		}
		
		@Override
		public void run() { // Effectuer des étapes jusqu'à ce que la machine s'arrête
			while (!dernierPas && enMarche) { // tant que la machine n'a pas fini et que le thread n'est pas arrêté
				FaitUnPasEnParallele faitUnPas = new FaitUnPasEnParallele(delaiMachine, true); // Faire une étape
				faitUnPas.attendreFin(); // Attendre qu'elle soit finie
			}
			demarrer.setText("Démarrer"); // Quand on a fini on peut redémarrer
			vueBande.repaint();
		}
	}
	
	// Action associée au bouton qui lance la machine ou la met en pause
	private class ActionDemarrer implements ActionListener {
		private MarcheContinueEnParallele moteur; // Thread qui fait marcher la machine en continu
		@Override
		public void actionPerformed(ActionEvent evt) {
			if (demarrer.getText().equals("Démarrer")) { // Le bouton permet de lancer la machine
				demarrer.setText("Pause"); // Le bouton permettra de la mettre en pause
				moteur = new MarcheContinueEnParallele(); // Lancer ou relancer la machine en continu
			}
			else { // Le bouton permet de mettre la machine en pause
				demarrer.setText("Démarrer"); // Le bouton permettra de la relancer
				demarrer.setEnabled(false); // Mais il sera actif qu'à la fin de l'étape en cours
				moteur.arreter(); // Arrêter la machine
			}
		}
	}
	
	// Action associée au bouton qui capture le contenu de la bande comme saisie
	private class ActionCapturer implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent evt) {
			chaineInit.setText(vueBande.getContenu()); // Mettre dans la zone de saisie le contenu de la bande
		}
	}
	
	// Action associée au déplacements du curseur de vitesse
	private class ActionChangerVitesse implements ChangeListener {
		@Override
		public void stateChanged(ChangeEvent evt) {
			if ( ! curseurVitesse.getValueIsAdjusting () ) { // Si le curseur a fini de bouger
				delaiMachine = curseurVitesse.getValue() * TEMPS_PAR_UNITE; // Calcul du délai de ralentissement
				if ((delaiMachine == 0) && (rangSurligne != -1)) { // Vitesse maximale et ligne actuellement surlignée
					// Enlever l'ancien surlignage dans la table des états 
					vueEtats.surligneLigne(rangSurligne, Color.black, Font.PLAIN, false); 
				}
			}
		}
	}
	
	// Action associée au menu de lecture d'un fichier de table d'états
	private class ActionOuvrirFichier implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent evt) {
			File table = choixFichier(SUFFIXE_FICHIERS); // On n'accepte que les fichiers .txt
			if (table == null) return; // Pas de fichier choisi
			try {
				afficheEtat("");
				tableDesEtats = new TableDEtats(table); // Creation de la nouvelle table d'états à partir du fichier
				rangSurligne = -1; // Pas de rang surligné dans la table
				MachineDeTuring.this.getContentPane().remove(vueEtats); // Enlever de l'interface l'ancienne table
				vueEtats = new VueTableDEtats(); // On va créer une nouvelle vue de la table d'états
				vueEtats.remplir(tableDesEtats); // Remplir la nouvelle table d'état à partir du fichier
				getContentPane().add(vueEtats, BorderLayout.EAST); // Afficher la nouvelle table d'état lue sur le fichier
				try {
					etatActuel.setText(tableDesEtats.getEtatInitial()); // L'état actuel de la machine est le 1er de la table
				} 
				catch (MoteurException e) { // Il n'y a pas d'état dans la table => erreur
					afficheErreur(e.getMessage());
				}
				dernierPas = false; // La machine n'a pas terminé
				pack(); // Redimensionner la fenêtre pour voir la table
				MachineDeTuring.this.setMinimumSize(new Dimension(getWidth(), getHeight())); // Taille nimimale de la nouvelle fenêtre
			} 
			catch (LigneIncorrecteException lie) { // Le fichier contient des erreurs
				afficheErreur(lie.getMessage());
			}
			catch (LectureFichierTableException lfte) { // Le fichier contient des erreurs ou est illisible
				afficheErreur(lfte.getMessage());
			}
		}
		
		// Méthode d'ouverture d'un fichier avec FileChooser
		private File choixFichier(String extension) {
			JFileChooser fc = new JFileChooser("."); // Répertoire de départ = répertoire courant
			fc.setAcceptAllFileFilterUsed(false); // N'accepte pas tous les fichiers
			fc.addChoosableFileFilter(new FiltreParExtension(extension)); // Filtre pour n'accepter que les fichiers .txt
			int retour = fc.showOpenDialog(MachineDeTuring.this); // Ouverture de la boîte de choix de fichier
			if (retour == JFileChooser.APPROVE_OPTION) return fc.getSelectedFile(); // Résultat du choix = OK => renvoyer le fichier choisi
			else return null; // Si pas de choix renvoyer null
		}
	}
		
	// Action associée au choix "à propos" dans le menu
	// La fenêtre de copyright apparaît si elle n'est pas déjà visible
	private class ActionAPropos implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent evt) {
			if (!aProposVisible) { // Si la fenêtre de copyright n'est pas déjà affichée
				new FenetreAPropos(MachineDeTuring.this); // Afficher une fenêtre de copyright
				aProposVisible = true; // La fenêtre de copyright est maintenant affichée
			}
		}
	}
	
	// Méthode indiquant que la fenêtre de copyright a été fermée
	public void aProposFermee() { aProposVisible = false; } // Appelée lorsque l'on ferme la fenêtre de copyright
	
	// Action associée au choix "aide" dans le menu
	// La fenêtre d'aide apparaît si elle n'est pas déjà visible
	private class ActionAide implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent evt) {
			if (!aideVisible) { // Si la fenêtre d'aide n'est pas déjà affichée
				new FenetreAide(MachineDeTuring.this); // Afficher une fenêtre d'aide
				aideVisible = true; // La fenêtre d'aide est maintenant affichée
			}
		}
	}
	
	// Méthode indiquant que la fenêtre d'aide a été fermée
	public void aideFermee() { aideVisible = false; } // Appelée lorsque l'on ferme la fenêtre d'aide

 	// Démarrage de l'application
	public static void main(String[] args) {
		new MachineDeTuring(); // Création de l'interface
	}
}
