/*
 * @author Dalmau
 * 15/12/2018
 */

 import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.Vector;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

/* 
Problème de correspondance de Post :
 - On définit deux langages A et B contenant le même nombre de mots.
 - On forme un premier mot X en concaténant N mots de A, on peut prendre N aussi grand qu'on veut 
   et mettre autant de fois qu'on veut les mêmes mots de A dans l'ordre qu'on veut. 
   Par exemple pour A ={a , ab , bba} et B = {baa , aa , bb} 
   le mot M = aabababba  constitué de a+ab+ab+a+bba est un mot correct pour N=5. 
   Pour fabriquer X on a pris dans l'ordre les mots de rang 1,2,2,1,3 de A.
 - Puis on forme un second mot Y en concaténant le même nombre N de mots de B pris dans le même ordre
   que ceux de A ayant servi à constituer X donc ici Y = baa+aa+aa+baa+bb 
   (on a pris dans l'ordre les mots de rang 1,2,2,1,3 de B).
 - La question  est de savoir s'il est possible de trouver une valeur de N et un ordre tels que X=Y
Ce problème est non décidable.

Interface de recherche récursive de solution au problème de correspondance de Post.
Ce problème étant non décidable il est non programmable.
Pour le rendre programmable il faut se donner un nombre maximal de mots à concaténer N et considérer
qu'il n'y a pas de solution au delà de ce nombre.
En pratique c'est impossible donc en cas de non réponse on ne sait pas s'il existe ou non une solution
tout ce que l'on sait c'est qu'il n'en existe pas avec moins de N mots concaténés
*/

public class PostCorrespondance extends JFrame {
	private static final long serialVersionUID = 1L;
	// Composants de l'interface
	private JTextField saisieProfondeur; // Saisie de la longueur maximale des suites testées
	private JTextField saisieTailleLangages; // Saisie du nombre de mots dans chaque groupe
	private JButton valider; // validation des saisies précédentes
	private JPanel saisieGroupes;  // Zone de saisie des mots de chaque groupe
	private JTextArea resultat; // Zone d'afiichage du résultat
	private JButton lancer, arreter; // Boutons pour lancer/arrêter la recherche de solution
	private JProgressBar attente; // Barre indiquant que la recherche est en cours
	private JMenuItem menuCombinatoire, menuRecursif; // Menus de choix du mode recherche
	private boolean attenteAvance; // La barre se remplit (si true) puis se vide (si false) en boucle
	// Gestion des fenêtres auxiliaires
	private boolean aProposVisible, aideVisible; // Indiquent si les fenêtres "à propos" et "aide" sont ou non visibles
	// Objets servant au moteur de recherche de solution
	private Vector<JTextField> groupe1, groupe2; // Groupes de mots saisis
	private Calculateur calc; // Moteur de recherche de solution
	private int profondeur; // Longueur maximale des suites testées saisie
	private int tailleGroupes; // Nombre de mots dans chaque groupe saisi
	private boolean calculRecursif; // true si le mode combinatoire est sélectionné

	public PostCorrespondance() { // Mise en place de l'interface
		super("Calculabilité");  // Titre de la fenêtre
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Arrêt du programme sur fermeture de la fenêtre
		
		// Menu de la fenêtre
		JMenu menuMode = new JMenu("Mode de recherche"); // Modes de recherche : combinatoire et récursif
		menuMode.setToolTipText("Recherche combinatoire ou récursive"); // Simple aide 
		menuCombinatoire = new JMenuItem("Recherche combinatoire"); // Mode de recherche combinatoire 
		menuCombinatoire.setForeground(Color.blue); // C'est le sous menu sélectionné par défaut
		calculRecursif = false; // Le mode combinatoire est sélectionné
		menuRecursif = new JMenuItem("Recherche récursive"); // Mode correction d'un message contrôlé par Hamming
		menuRecursif.setForeground(Color.black); // Sous menu non sélectionné par défaut
		menuMode.add(menuCombinatoire); menuMode.add(menuRecursif); // Ajoutées à la rubrique mode
		menuCombinatoire.addActionListener(new ActionCombinatoire()); // Traitement lié à la création d'un code de Hamming
		menuRecursif.addActionListener(new ActionRecursif()); // Traitement lié à la correction d'un message contrôlé par Hamming
		JMenu menuAide = new JMenu("?"); // Rubrique aide et à propos
		menuAide.setToolTipText("Aide et copyright"); // Simple aide
		JMenuItem aide = new JMenuItem("Aide"); // Fonction d'affichage d'une aide générale
		aide.addActionListener(new ActionAide()); // Traitement associé à l'aide générale
		JMenuItem aPropos = new JMenuItem("A propos"); // Fonction d'affichage de copyright
		aPropos.addActionListener(new ActionAPropos()); // Traitement associé au copyright
		menuAide.add(aPropos); menuAide.add(aide); // Ajoutées à la rubrique
		JMenuBar laBarre = new JMenuBar(); // Création de la barre de menu
		laBarre.add(menuMode); // Ajout de la rubrique à la barre de menu
		laBarre.add(menuAide); // Ajout de la rubrique à la barre de menu
		setJMenuBar(laBarre); // Ajout de la barre de menu à la fenêtre		

		// Constitution de l'interface
		getContentPane().setLayout(new BorderLayout()); // Placement en 3 zones (nord, centre et sud)
		JPanel haut = new JPanel(); // Zone du haut
		getContentPane().add(haut, BorderLayout.NORTH);
		haut.setLayout(new BorderLayout()); // La zone du haut contient 3 lignes
		JPanel panelMax = new JPanel(); // Zone de saisie de la longueur maximale des suites testées
		haut.add(panelMax,BorderLayout.NORTH);
		panelMax.setLayout(new FlowLayout(FlowLayout.LEADING)); // Cette zone contient 2 composants d'interface
		panelMax.add(new JLabel("Longueur maximale de la suite de rangs : ")); // Titre
		saisieProfondeur = new JTextField(5); // Saisie de la longueur maximale des suites testées
		saisieProfondeur.setToolTipText("<html>Suite de rangs la plus longue que le programme essaiera<br>"
				+ "Une solution plus longue ne sera donc pas trouvée<br>"
				+ "Une valeur elevée risque de provoquer un temps de calcul très long</html>");
		panelMax.add(saisieProfondeur);
		JPanel panelTaille = new JPanel(); // Zone de saisie du nombre de mots dans chaque groupe 
		haut.add(panelTaille, BorderLayout.CENTER);
		panelTaille.setLayout(new FlowLayout(FlowLayout.LEADING)); // Cette zone contient 3 composants d'interface
		panelTaille.add(new JLabel("Nombre de mots de chacun des 2 goupes : ")); // Titre
		saisieTailleLangages = new JTextField(5);  // Saisie du nombre de mots dans chaque groupe
		saisieTailleLangages.setToolTipText("Saisie du nombre de mots de chacun des 2 groupes");
		panelTaille.add(saisieTailleLangages);
		valider = new JButton("Valider"); // Bouton de validation des saisies => affiche la zone de saisie des mots
		valider.setToolTipText("Valider le nombre de mots pour pouvoir les saisir");
		valider.addActionListener(new Valider());
		panelTaille.add(valider);
		saisieGroupes = new JPanel(); // Zone de saisie des mots de chaque groupe
		saisieGroupes.setToolTipText("Saisie des 2 groupes de mots");
		haut.add(saisieGroupes, BorderLayout.SOUTH);
		resultat = new JTextArea(10, 30); // Zone d'affichage du résultat
		resultat.setToolTipText("Affichage du resultat"); // Aide
		resultat.setEditable(false); // Cette zone ne sert que d'affichage
		JScrollPane asc = new JScrollPane(resultat); // Ascenceur au cas où la zone d'affichage soit trop petite
		getContentPane().add(asc, BorderLayout.CENTER); // L'affichage est fait dans un ascenseur au centre
		JPanel bas = new JPanel(); // Zone du bas de la fenêtre
		getContentPane().add(bas, BorderLayout.SOUTH);
		bas.setLayout(new GridLayout(1,3,2,2)); // Cette zone contient  3 composants d'interface
		lancer = new JButton("Lancer la recherche"); // Bouton de lancement de la recherche
		lancer.setToolTipText("Lancer la recherche de solution limitée à la longueur saisie");
		lancer.setEnabled(false);
		lancer.addActionListener(new Lancer()); // Action qui lance la recherche
		bas.add(lancer);
		attente = new JProgressBar(JProgressBar.HORIZONTAL,0,100); // Barre d'attente
		attente.setToolTipText("La barre va et vient pendant qu'une recherche est en cours");
		bas.add(attente);
		arreter = new JButton("Arreter la recherche"); // Bouton d'arrêt de la recherche
		arreter.setToolTipText("Abandonner la recherche en cours");
		arreter.setEnabled(false);
		arreter.addActionListener(new Arreter()); // Action qui arrête la recherche
		bas.add(arreter);

		// Initialisation de l'état du programme
		groupe1 = new Vector<JTextField>(); // 1er groupe de mots 
		groupe2 = new Vector<JTextField>(); // Second groupe de mots
		tailleGroupes = -1; // Pas de taille encore définie
		profondeur = -1; // Pas de longueur maximale de suites testées définie
		calc = null;  // Pas de recherche en cours
		aProposVisible = false; // La fenêtre "à propos" n'est pas visible actuellement
		aideVisible = false; // La fenêtre "aide" n'est pas visible actuellement
		
		// Affichage de l'interface
		pack(); // Dimensionnement de la fenêtre
		setVisible(true); // Visibilité de la fenêtre
	}
	
	// Réinitialisation des boutons lorsque la recherche se termine ou est arrêtée
	public void initBoutons() {
		valider.setEnabled(true); // On peut valider de nouveaux paramètres
		arreter.setEnabled(false); // On n'a plus rien à arrêter
	}
	
	// Méthode d'accès à la zone d'affichage des résultats
	public JTextArea getResultat() { return resultat; }
	
	 // La barre est mise à 0 quand la recherche se termine ou est arrêtée
	public void effaceProgressbar() { attente.setValue(0); }
	
	// La barre va et vient pendant que la recherche est en cours
	public void bougeProgressBar (int val) { 
		int nouvelleValeur; // Nouvelle position de la barre
		if (attenteAvance) { // La barre avance
			nouvelleValeur = attente.getValue() + val; // Nouvelle position de la barre (avance)
			if (nouvelleValeur <= attente.getMaximum()) { // Si la barre n'est pas au max
				attente.setValue(nouvelleValeur); // Avancer la barre
			}
			else { // Si la barre va atteindre le max
				attente.setValue(attente.getMaximum()); // La mettre au max
				attenteAvance = !attenteAvance; // Changer de sens de remplissage de la barre
			}
		}
		else {
			nouvelleValeur = attente.getValue() - val; // Nouvelle position de la barre (recule)
			if (nouvelleValeur >= attente.getMinimum()) {// Si la barre n'est pas au min
				attente.setValue(nouvelleValeur); // La barre recule
			}
			else { // Si la barre va atteindre le min
				attente.setValue(attente.getMinimum()); // La mettre au min
				attenteAvance = !attenteAvance; // Changer de sens de remplissage de la barre
			}
		}
	}
	
	// Validation des paramètres de recherche (action associée au bouton "Valider")
	private class Valider implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent e) {
			try { // Longueur maximale de suite de rangs saisie
				profondeur = Integer.parseInt(saisieProfondeur.getText());
				if (profondeur <= 0) { // La valeur saisie est incorrecte
					saisieProfondeur.setText(""); // L'effacer
					profondeur = -1; // Pas de longueur maximale de suite de rangs saisie
					return; // On abandonne
				}
			}
			catch (NumberFormatException nfe) { // La valeur saisie est incorrecte
				saisieProfondeur.setText(""); // L'effacer
				profondeur = -1; // Pas de longueur maximale de suite de rangs saisie
				return; // On abandonne
			}
			try { // Nombre de mots des groupes saisi
				int taille = Integer.parseInt(saisieTailleLangages.getText());
				if (taille <= 0) { // Le nombre de mots est incorrect
					saisieTailleLangages.setText(""); // L'effacer
					tailleGroupes = -1; // Pas de nombre de mots des groupes saisi
					return; // On abandonne
				}
				if (taille != tailleGroupes) { // Le nombre de mots des groupes saisi n'est pas le même que précédemment
					tailleGroupes = taille; // La taille des groupes a changé
					calc = null; // Pas de recherche en cours
					groupe1 = new Vector<JTextField>(); // Liste des mots du 1er groupe
					groupe2 = new Vector<JTextField>(); // Liste des mots du 2ème groupe
					saisieGroupes.removeAll(); // Enlever les zones de saisie des mots actuellement à l'écran
					saisieGroupes.setBorder(BorderFactory.createEmptyBorder(2, 20, 2, 20)); // Marges du tableau positions / bits
					saisieGroupes.setLayout(new GridLayout(3, taille+1, 2, 0)); // La zone de saisie affiche 3 lignes et 1 colonne de plus que de mots par groupe
					saisieGroupes.add(new JLabel("Rangs :")); // Titre de la 1ere ligne
					for (int i = 0; i < taille; i++) { // Indiquer les rangs des mots sur la 1ere ligne
						saisieGroupes.add(new JLabel("rang " + (i+1), SwingConstants.CENTER));
					}
					saisieGroupes.add(new JLabel("Goupe 1 :")); // Titre pour le 1er groupe de mots
					for (int i = 0; i < taille; i++) { // Placer une zone de saisie par mot du 1er groupe
						JTextField mot = new JTextField(6);
						groupe1.addElement(mot); // Conserver les zones de saisie des mots du 1er groupe
						saisieGroupes.add(mot); // Ajouter une zone de saisie de mot du 1er groupe à l'interface
					}
					saisieGroupes.add(new JLabel("Goupe 2 :")); // Titre pour le 2ème groupe de mots
					for (int i = 0; i < taille; i++) { // Placer une zone de saisie par mot du 2ème groupe
						JTextField mot = new JTextField(6);
						groupe2.addElement(mot); // Conserver les zones de saisie des mots du 2ème groupe
						saisieGroupes.add(mot); // Ajouter une zone de saisie de mot du 2ème groupe à l'interface
					}
				}
				resultat.setText(""); // Effacer les résultats antérieurs
				lancer.setEnabled(true); // Autoriser le lancement de la recherche
				arreter.setEnabled(false); // Pas de recherche en cours
				pack(); // Redimensionner la fenêtre
			}
			catch (NumberFormatException nfe) { // Le nombre de mots est incorrect
				saisieTailleLangages.setText(""); // L'effacer
				tailleGroupes = -1; // Pas de nombre de mots des groupes saisi
			}
		}
	}
	
	// Lancement d'une recherche : action associée au bouton "Lancer"
	private class Lancer implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent e) {
			if ((profondeur > 0) && (tailleGroupes > 0)) { // Vérifier que les paramètres ont été saisis
				lancer.setEnabled(false); // On ne pourra pas lancer de recherche tant que celle-ci est en cours
				arreter.setEnabled(true); // On peut arrêter la recherche en cours
				valider.setEnabled(false); // On ne modifie pas les paramètres quand la recherche est en cours
				attenteAvance = true; // La barre va commencer par avancer (puis elle reculera)
				if (calculRecursif) calc = new Calculabilite(groupe1.size(), profondeur, PostCorrespondance.this); // Créer le thread de recherche récursive
				else calc = new Combinatoire(groupe1.size(), profondeur, PostCorrespondance.this); // Créer le thread de recherche combinatoire
				for (int i = 0; i < groupe1.size(); i++) { // Donner au thread de recherche les mots des 2 groupes
					calc.ajoutGroupe1((groupe1.elementAt(i)).getText()); // Mots du goupe 1 saisis
					calc.ajoutGroupe2((groupe2.elementAt(i)).getText()); // Mots du goupe 2 saisis
				}
				calc.lancer(); // Lancer la recherche en parallèle
			}
		}
	}
	
	// Arrêt de la recherche : action associée au bouton "Arrêter"
	private class Arreter implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent e) {
			if (calc != null) calc.arret(); // S'il y a une recherche en cours l'arrêter
			calc = null; // Il n'y a plus de recherche en cours
			lancer.setEnabled(true); // On peut lancer une nouvelle recherche
			arreter.setEnabled(false); // On n'a plus de recherche à arrêter
			valider.setEnabled(true); // On peut valider de nouveaux paramètres pour lancer une nouvelle recherche
		}
	}
	
	// Action associée au choix du mode de rcherche combinatoire
	private class ActionCombinatoire implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent arg0) {
			calculRecursif = false; // Mode combinatoire choisi
			menuCombinatoire.setForeground(Color.blue); // Le mode combinatoire est sélectioné
			menuRecursif.setForeground(Color.black); // Le mode récursif n'est pas sélectionné
		}
	}
	
	// Action associée au choix du mode de rcherche récursif
	private class ActionRecursif implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent arg0) {
			calculRecursif = true; // Mode récursif choisi
			menuRecursif.setForeground(Color.blue); // Le mode récursif est sélectioné
			menuCombinatoire.setForeground(Color.black); // Le mode combinatoire n'est pas sélectionné
		}
	}
	
	// Action associée au choix "à propos" dans le menu
	// La fenêtre apparaît si elle n'est pas déjà visible
	private class ActionAPropos implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent arg0) {
			if (!aProposVisible) { // Si la fenêtre de copyright n'est pas déjà affichée
				new FenetreAPropos(PostCorrespondance.this); // Afficher une fenêtre de copyright
				aProposVisible = true; // La fenêtre de copyright est maintenant affichée
			}
		}
	}
	
	// Méthode indiquant que la fenêtre de copyright a été fermée
	public void aProposFermee() { aProposVisible = false; } // Appelée lorsque l'on ferme la fenêtre de copyright
	
	// Action associée au choix "aide" dans le menu
	// La fenêtre apparaît si elle n'est pas déjà visible
	private class ActionAide implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent arg0) {
			if (!aideVisible) { // Si la fenêtre d'aide n'est pas déjà affichée
				new FenetreAide(PostCorrespondance.this); // Afficher une fenêtre d'aide
				aideVisible = true; // La fenêtre d'aide est maintenant affichée
			}
		}
	}
	
	// Méthode indiquant que la fenêtre d'aide a été fermée
	public void aideFermee() { aideVisible = false; } // Appelée lorsque l'on ferme la fenêtre d'aide
 	
 	// Fenêtres auxiliaires :

 	// Fenêtre affichée pour l'aide
 	private class FenetreAide extends JFrame { 
 		private static final long serialVersionUID = 1L; // Pour éviter un warning
 		// Message d'aide affiché dans la fenêtre
		private final String message =
				"\n\t Problème de correspondance de Post :  \n"
				+ "   On définit deux groupes de N mots ordonnés (chaque mot a un rang dans son groupe).   \n"
				+ "   On choisit une suite de rangs de longueur quelconque.   \n"
				+ "   On fabrique le mot obtenu en concaténant les mots du 1er groupe pris dans l'ordre de cette suite de rangs.   \n"
				+ "   On fabrique aussi le mot obtenu en concaténant les mots du 2ème groupe pris dans l'ordre de cette même suite de rangs.   \n"
				+ "   L'objectif est de trouver la suite de rangs la plus courte pour laquelle ces deux mots sont identiques.   \n"
				+ "\n   Ce problème peut ne pas avoir de solution mais comme la suite de rangs peut être aussi grande que l'on veut il est   \n"
				+ "   impossible de le savoir.    \n"
				+ "\n\n\t\tUtilisation de l'application :\n"
				+ "   Comme ce problème peut ne pas avoir de solution, l'application pourrait chercher indéfiniment !   \n"
				+ "   Pour éviter cela :   \n"
 				+ "   1. Saisir une longueur maximale de suite de rangs à tester.   \n"
				+ "      Si le programme s'arrête sans trouver de solution cela signifie qu'il n'y en pas pour des suites de rangs dont la longueur   \n"
				+ "      est inférieure ou égale à cette valeur (mais il y en a peut-être une avec une suite de rangs plus longue).   \n"	
 				+ "   2. Saisir le nombre de mots contenus dans chacun des 2 groupes de mots (désigné par N ci-dessus).   \n"
 				+ "   3. Valider ces saisies par le bouton \"Valider\" : une zone permettant la saisie des mots des deux groupes apparaît.  \n"
 				+ "   4. Sasir tous les mots de chacun des 2 groupes en respectant leur rang.  \n"
 				+ "   5. Lancer la recherche par le bouton du bas (la barre à droite de ce bouton indique que la recherche est en cours).  \n\n"
 				+ "   Si une suite de longueur inférieure ou égale à celle saisie résout le problème, elle sera affichée.   \n"
 				+ "   Pour accelérer la recherche il est préférable de donner une longueur limite proche de celle de la solution (si on la connait).   \n"
 				+ "   Une recherche en cours peut être abandonnée par le bouton en bas à droite.  \n"
 				+ "\n   Lorsqu'une recherche est terminée ou abandonnée il est possible de modifier les mots des 2 groupes ainsi que la longueur   \n"
 				+ "   maximale de la suite de rangs puis de valider ces valeurs pour relancer la recherche avec ces nouveaux paramètres.  \n"
 				+ "   Il est également possible de relancer une recherche pour 2 groupes de mots totalement différents (en recommançant au 1.).   \n"
 				+ "\n   L'application propose 2 modes de recherche (voir menu \"Mode de Recherche\") :   \n"
 				+ "   - Le mode combinatoire trouve toujours la solution la plus courte mais peut parfois prendre beaucoup de temps.   \n"
 				+ "   - Le mode récursif peut trouver une solution exacte plus longue que la solution optimale mais il peut parfois être plus rapide.   \n"
 				+ "\n   Vous pouvez tester les exemples suivants ou en inventer d'autres :   \n"
 				+ "   Exemple 1 : groupe1 = {\"aa\", \"bb\", \"abb\"} et groupe2 =  {\"aab\", \"ba\", \"b\"}   \n"
 				+ "   Exemple 2 : groupe1 = {\"a\", \"c\", \"ba\", \"acb\"} et groupe2 =  {\"ac\", \"ba\", \"a\", \"b\"}   \n"
 				+ "   Exemple 3 : groupe1 = {\"ab\", \"b\", \"abb\"} et groupe2 =  {\"b\", \"abb\", \"a\"}   \n"
 				;
 		private PostCorrespondance mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
 		
 		public FenetreAide(PostCorrespondance mere) { // Création de la fenêtre d'aide
 			super("Aide"); // Titre de la fenêtre
 			this.mere = mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
 			setLocation(mere.getWidth(), 1); // Placer cette fenêtre à droite de celle depuis laquelle elle a été ouverte
 			addWindowListener(new GestionFenetre()); // Action a faire quand on ferme la fenêtre
 			getContentPane().setLayout(new BorderLayout()); // Placement dans la fenêtre
			JLabel titre = new JLabel("Calculabilité", SwingConstants.CENTER); // Titre
			titre.setForeground(Color.blue); // Le titre est écrit en bleu
 			titre.setFont(new Font("Times",Font.BOLD,20)); // Le titre est en gras et en police 20
 			getContentPane().add(titre, BorderLayout.NORTH); // Le titre est en haut
 			JTextArea texte = new JTextArea(); // Zone d'affichage du texte d'aide
 			texte.setEditable(false); // Le texte d'aide n'est pas modifiable
 			texte.setFont(new Font("Times",Font.PLAIN,14)); // Police du texte d'aide
 			texte.setText(message); // Afficher le texte d'aide
 			getContentPane().add(new JScrollPane(texte), BorderLayout.CENTER); // Le texte d'aide est placé au centre
			JLabel pied = new JLabel("M. Dalmau IUT de Bayonne Pays Basque", SwingConstants.LEFT); // Signature
 			pied.setFont(new Font("Times",Font.PLAIN,10)); // La signature est écrite en petit
 			getContentPane().add(pied, BorderLayout.SOUTH);  // La signature est placée en bas
 			pack();
 			setVisible(true);
 		}
 		
 		// Action associée à la fermeture de la fenêtre
 		private class GestionFenetre extends WindowAdapter {
 			public synchronized void windowClosing(WindowEvent e) { 
 				mere.aideFermee(); // Indiquer au programme que le fenêtre n'est plus visible
 			}
 		}
 	}

 	// Fenêtre affichée pour le copyright
 	private class FenetreAPropos extends JFrame {
 		private static final long serialVersionUID = 1L; // Pour éviter un warning
 		// Message de copyright affiché dans la fenêtre
 		private final String message =
 				"\n   Le problème de correspondance de Post (PCP) est un problème indécidable.   \n"
 				+  "   Ce problème a été inventé Emil Post en 1946.   \n"
				+  "   Cette application tente de le résoudre (lire l'aide pour en savoir plus).   \n";
 		private PostCorrespondance mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
 		
 		public FenetreAPropos(PostCorrespondance mere) { // Création de la fenêtre de copyright
 			super("A Propos"); // Titre de la fenêtre
 			this.mere = mere; // Fenêtre depuis laquelle celle de copyright a été ouverte
 			setLocation(1,mere.getHeight());  // Placer cette fenêtre sous celle depuis laquelle elle a été ouverte
 			addWindowListener(new GestionFenetre()); // Action a faire quand on ferme la fenêtre
 			getContentPane().setLayout(new BorderLayout()); // Placement dans la fenêtre 
 			JTextArea texte = new JTextArea(); // Zone d'affichage du texte du copyright
 			texte.setEditable(false); // Le texte du copyright n'est pas modifiable
 			texte.setFont(new Font("Times",Font.PLAIN,14)); // Le copyright est en police 14
 			texte.setText(message);	// Afficher le texte du copyright
 			getContentPane().add(texte, BorderLayout.CENTER); // Texte du copyright au centre de la fenêtre
			JLabel pied = new JLabel(" (C) M. Dalmau IUT de Bayonne Pays Basque", SwingConstants.LEFT); // Signature
 			pied.setFont(new Font("Times",Font.PLAIN,10)); // La signature est écrite en petit 
 			getContentPane().add(pied, BorderLayout.SOUTH);  // La signature est placée en bas
			pack();
 			setVisible(true);
 		}
 		
 		// Action associée à la fermeture de la fenêtre
 		private class GestionFenetre extends WindowAdapter {
 			public synchronized void windowClosing(WindowEvent e) {
 				mere.aProposFermee();  // Indiquer au programme que le fenêtre n'est plus visible
 			}
 		}
 	}

 	// Démarrage du programme
	public static void main(String[] args) {
		new PostCorrespondance(); // Création de l'interface
	}

}
