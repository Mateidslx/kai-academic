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
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

// Interface montrant les différentes étapes de la méthode de Hamming :
// 		- Lors de l'ajout des bits de contrôle à un message pour son envoi
// 		- Lors de la correction d'un message reçu
public class Hamming extends JFrame { 

	private static final long serialVersionUID = 1L; // Evite un Warning mais inutile ici
	
	// Propriétés de la classe :
	// Composants de l'interface
	private JPanel table; // zone d'affichage du tableau de bits avec positions
	private JLabel titre; // Affiche le mode de fonctionnement choisi
	private JTextField saisieMessage; // Zone de saisie du message binaire à encoder
	private JTextArea calcul; // Zone d'affichage du calcul de parité des positions à 1
	private JButton etapes; // Etapes de calcul selon le mode de fonctionnement choisi
	private JMenuItem creation, correction; // Modes de fonctionnement proposés dans le menu
	// Objets servant aux calculs et affichages
	private Vector<JLabel> positions, valeurs; // Positions et valeurs des bits
	private Vector<String> messagesBouton; // Textes du bouton pour passer d'une étape à l'autre (son texte change)
	private String message; // Message binaire saisi à encoder ou corriger
	private int tailleHamming; // Taille du message incluant les bits de contrôle
	private int nbrKbits; // Nombre de bits de contrôle
	private Vector<String> codesPositions; // Codes binaires des positions à 1 (hors bits de contrôle)
	private String parite; // Parité des codes binaires des positions à 1 (hors bits de contrôle)
	private String positionErreur; // Calcul de la position de l'erreur par parité (0 si pas d'erreur)
	private int etapeEnCours; // Etape actuelle du calcul (0 à nbrEtapes)
	private int nbrEtapes; // Nombre d'étapes de calcul (ce n'est pas le même pour l'ajout et pour la correction)
	private ActionListener encodageOuCorrection; // Actions associées au bouton selon le mode de fonctionnement
	// Gestion des fenêtres auxiliaires
	private boolean aProposVisible, aideVisible; // Indiquent si les fenêtres "à propos" et "aide" sont ou non visibles
	// Messages inscrits dans le bouton selon les étapes des calculs
	private static final String commencer = "Saisie du message";
	private static final String calculPositions = "Calcul des positions à 1";
	private static final String messageFinal = "Affichage du message final";
	private static final String calculParite = "Calcul parité finale";
	private static final String messageCorrige = "Affichage du message corrigé";
	// Messages affichés en titre pour indiquer le mode de fonctionnement actuel
	private static final String modeAjout = "Contrôle de Hamming : Ajout des bits de contrôle";
	private static final String modeCorrection = "Contrôle de Hamming : Correction d'un message";

	// Création de l'interface.
	// Au départ la zone d'affichage du tableau de bits avec positions est vide, 
	//  elle sera remplie après la saisie du message à contrôler ou à corriger
	// Le mode de fonctionnement au départ est celui d'ajout des bits de contrôle à un message saisi
	//  il peut être changé par le menu.
	public Hamming() { 
		super("Méthode de Hamming"); // Titre de la fenêtre
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Arrêt du programme sur fermeture de la fenêtre
		
		// Ajout de la barre de menu et association des actions aux rubriques
		JMenu menuMode = new JMenu("Mode de calcul"); // Modes de calcul : création et correction
		menuMode.setToolTipText("Choix du mode de fonctionnement"); // Simple aide 
		creation = new JMenuItem("Ajout des bits de contrôle"); // Mode création d'un code de Hamming 
		creation.setForeground(Color.blue); // C'est le sous menu sélectionné par défaut
		correction = new JMenuItem("Correction d'un message"); // Mode correction d'un message contrôlé par Hamming
		correction.setForeground(Color.black); // Sous menu non sélectionné par défaut
		menuMode.add(creation); menuMode.add(correction); // Ajoutées à la rubrique mode
		creation.addActionListener(new ActionCreation()); // Traitement lié à la création d'un code de Hamming
		correction.addActionListener(new ActionCorrection()); // Traitement lié à la correction d'un message contrôlé par Hamming
		JMenu menuAide = new JMenu("?"); // Rubrique aide et à propos
		menuAide.setToolTipText("Aide et copyright"); // Simple aide
		JMenuItem aide = new JMenuItem("Aide"); // Fonction d'affichage d'une aide générale
		aide.addActionListener(new ActionAide()); // Traitement associé à l'aide générale
		JMenuItem aPropos = new JMenuItem("A propos"); // Fonction d'affichage de copyright
		aPropos.addActionListener(new ActionAPropos()); // Traitement associé au copyright
		menuAide.add(aPropos); menuAide.add(aide); // Ajoutées à la rubrique
		JMenuBar laBarre = new JMenuBar(); // Création de la barre de menu
		laBarre.add(menuMode); laBarre.add(menuAide); // Ajout des rubriques à la barre de menu
		setJMenuBar(laBarre); // Ajout de la barre de menu à la fenêtre		
		
		// Constitution de l'interface
		getContentPane().setLayout(new BorderLayout()); // Placement en 3 zones (nord, centre et sud)
		JPanel haut = new JPanel(); // Le haut contient le mode de fonctionnement et le tableau de bits avec leurs positions
		haut.setLayout(new BorderLayout()); // Placement en 2 zones (haut et centre)
		titre = new JLabel(modeAjout, SwingConstants.CENTER); // Zone d'affichage du mode de fonctionnement actuel
		titre.setFont(new Font("Times",Font.BOLD,20)); // Ecrit en gros
		titre.setForeground(Color.blue); // Et en bleu
		haut.add(titre, BorderLayout.NORTH); // Placé tout en haut de la fenêtre
		table = new JPanel(); // Zone d'affichage du tableau de bits avec leurs positions (initialement vide)
		haut.add(table, BorderLayout.CENTER); // Ajout à l'interface du mode de fonctionnement et du tableau de bits
		getContentPane().add(haut, BorderLayout.NORTH); // Placée en haut de la fenêtre
		calcul = new JTextArea(30, 20); // Zone d'affichage des étapes de calcul 
		calcul.setToolTipText("Affichage des étapes de calcul"); // Aide
		calcul.setEditable(false); // Cette zone ne sert que d'affichage
		JScrollPane asc = new JScrollPane(calcul); // Ascenceur au cas où la zone d'affichage soit trop petite
		getContentPane().add(asc, BorderLayout.CENTER); // L'affichage est fait dans un ascenseur au centre
		JPanel bas = new JPanel(); // Zone pour la saisie et le bouton
		getContentPane().add(bas, BorderLayout.SOUTH); // Elle est mise en bas
		bas.setLayout(new FlowLayout()); // Placement de la zone de saisie et du bouton
		bas.setPreferredSize(new Dimension(630, 45)); // Evite les mauvais redimensionements de la fenêtre
		saisieMessage = new JTextField(35); // Zone de saisie du message à encoder ou corriger
		saisieMessage.setToolTipText("Saisie du message à encoder ou corriger"); // Aide
		bas.add(saisieMessage); // Placement de la zone de saisie du message à encoder ou corriger
		etapes = new JButton("");  // Bouton pour les étapes de calcul
		etapes.setToolTipText("Etape de calcul selon le fonctionnement choisi"); // Aide
		encodageOuCorrection = new Encodage(); // Au départ on est en mode encodage = ajout de bits de contrôle
		etapes.addActionListener(encodageOuCorrection); // Le bouton effectue les étapes du calcul
		bas.add(etapes);  // Le bouton pour les étapes de calcul est mis dans l'interface
		
		// Initialisation de l'état du programme
		aProposVisible = false; // La fenêtre "à propos" n'est pas visible actuellement
		aideVisible = false; // La fenêtre "aide" n'est pas visible actuellement
		initEnModeCreation(); // Initialisation pour le mode de création de code de Hamming (défaut)
		
		// Affichage de l'interface
		pack(); // Dimensionnement de la fenêtre
		setVisible(true); // Visibilité de la fenêtre
	}
	
	// Initialisations pour le mode de fonctionnement "ajout des bits de contrôle" qui est le mode par défaut au départ
	private void initEnModeCreation() { 
		messagesBouton = new Vector<String>(); // Textes pour le bouton selon l'étape de calcul
		messagesBouton.add(commencer); // Etape 0 : saisie du message
		messagesBouton.add(calculPositions);  // Etape 1 : calcul de la parité des codes binaires des positions à 1
		messagesBouton.add(messageFinal); // Etape 2 : mise en place des bits de contrôle dans le message final
		titre.setText(modeAjout); // Indiquer le mode de fonctionnement choisi
		etapeEnCours = 0; // Commencer par l'étape de sasie du message à encoder
		nbrEtapes = 3; // Ce mode de fonctionnement a 3 étapes
		etapes.setText(messagesBouton.elementAt(etapeEnCours)); // Texte initial du bouton pour les étapes de calcul
		calcul.setText(""); // Effacer les messages antérieurs
		saisieMessage.setText(""); // Effacer les saisies antérieures
	}

	// Remplit la zone d'affichage du tableau de bits avec leurs positions en fonction du message saisi
	private void afficheTable(int taille) { 
		table.removeAll(); // Enlever tous les composants pour recommencer
		table.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20)); // Marges du tableau positions / bits
		table.setLayout(new GridLayout(2, taille, 2, 2)); // Tableau positions / bits
		positions = new Vector<JLabel>(); // JLabels contenant les positions
		for (int i = taille; i > 0; i--) { // Création des n°s de positions (ordre décroissant)
			JLabel etiquette = new JLabel(" "+String.valueOf(i)+" ", SwingConstants.CENTER); // Position i
			if (estPuissanceDeDeux(i)) etiquette.setForeground(Color.red); // Mise en rouge si c'est un bit de contrôle
			else etiquette.setForeground(Color.black); // Mise en noir si c'est un bit de message
			positions.addElement(etiquette); // Conserver le JLabel de position
			table.add(etiquette); // Afficher la position
		}
		for (int i = taille-1; i >= 0; i--) table.add(valeurs.elementAt(i)); // Affichage des valeurs des bits
		table.setToolTipText("Affichage du code complet (les positions de contrôle sont en rouge)"); // Aide
		pack(); // Redimensionner la fenêtre pour afficher le tableau positions / bits
	}
	
	// Action associée au choix "Ajout des bits de contrôle" dans le menu
	// Les textes affichés dans le bouton ainsi que l'action qui lui est associée sont modifiés
	// Toutes les informations affichées sont affacées
	private class ActionCreation implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent arg0) {
			table.removeAll(); // Enlever tous les composants pour recommencer
			creation.setForeground(Color.blue); // Le mode création est sélectioné
			correction.setForeground(Color.black); // Le mode correction n'est pas sélectionné
			initEnModeCreation();  // Initialisation pour le mode création de code de Hamming
			etapes.removeActionListener(encodageOuCorrection); // Enlever l'action actuelle du bouton
			encodageOuCorrection = new Encodage(); // L'action du bouton va correspondre à la création
			etapes.addActionListener(encodageOuCorrection); // Le bouton effectuera les étapes de calcul
		}
	}
	
	// Action associée au choix "Correction d'un message" dans le menu
	// Les textes affichés dans le bouton ainsi que l'action qui lui est associée sont modifiés
	// Toutes les informations affichées sont affacées
	private class ActionCorrection implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent arg0) {
			table.removeAll(); // Enlever tous les composants pour recommencer
			creation.setForeground(Color.black); // Le mode création n'est pas sélectioné
			correction.setForeground(Color.blue); // Le mode correction est sélectioné
			messagesBouton = new Vector<String>(); // Textes pour le bouton selon l'étape de calcul
			messagesBouton.add(commencer); // Etape 0 : saisie du message
			messagesBouton.add(calculPositions);  // Etape 1 : calcul de la parité des codes binaires des positions à 1
			messagesBouton.add(calculParite); // Etape 2 : calcul de la position d'erreur
			messagesBouton.add(messageCorrige); // Etape 3 : correction du message
			titre.setText(modeCorrection); // Indiquer le mode de fonctionnement choisi
			etapeEnCours = 0; // Commencer par l'étape de sasie du message à corriger
			nbrEtapes = 4; // Ce mode de fonctionnement a 4 étapes
			etapes.setText(messagesBouton.elementAt(etapeEnCours)); // Texte initial du bouton pour les étapes de calcul
			calcul.setText(""); // Effacer les messages antérieurs
			saisieMessage.setText(""); // Effacer les saisies antérieures
			etapes.removeActionListener(encodageOuCorrection); // Enlever l'action actuelle du bouton
			encodageOuCorrection = new Correction();// L'action du bouton va correspondre à la correction
			etapes.addActionListener(encodageOuCorrection); // Le bouton effectuera les étapes de calcul
		}
	}
	
	// Action associée au choix "à propos" dans le menu
	// La fenêtre apparaît si elle n'est pas déjà visible
	private class ActionAPropos implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent arg0) {
			if (!aProposVisible) { // Si la fenêtre de copyright n'est pas déjà affichée
				new FenetreAPropos(Hamming.this); // Afficher une fenêtre de copyright
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
				new FenetreAide(Hamming.this); // Afficher une fenêtre d'aide
				aideVisible = true; // La fenêtre d'aide est maintenant affichée
			}
		}
	}
	
	// Méthode indiquant que la fenêtre d'aide a été fermée
	public void aideFermee() { aideVisible = false; } // Appelée lorsque l'on ferme la fenêtre d'aide

	// Traitement des événements du bouton = étapes de calcul lors de l'ajout des bits de contrôle :
	// Etape 0 : saisie du message à contrôler
	// Etape 1 : calcul de la parité des codes binaires des positions à 1
	// Etape 2 : Constitution et affichage du message final
	private class Encodage implements ActionListener { 
		@Override
		public void actionPerformed(ActionEvent arg0) { // Action sur le bouton
			boolean ok = true; // true si on doit passer à l'étape suivante (a priori oui)
			switch(etapeEnCours) { // Action selon l'étape de calcul
			case 0 : // Etape 0 : saisie du message
				calcul.setText(""); // Effacement du calcul des bits de contrôle précédent
				message = saisieMessage.getText(); // Récupération du message à encoder
				if (incorrect(message)) { // Vérification du message à encoder
					ok = false; // On reste à l'étape 1 car la saisie est mauvaise
					saisieMessage.setText(""); // La saisie est effacée car incorrecte
				}
				else { // Le message saisi est correct
					valeurs = new Vector<JLabel>(); // Contiendra les bits du message
					for (int i = message.length()-1; i >= 0; i--) { // Récupération des bits du message saisi
						// Création de JLabels pour affichage des bits du message
						valeurs.addElement(new JLabel(message.substring(i, i+1), SwingConstants.CENTER));
					}
					nbrKbits = 0; //  Nombre de bits de contrôle
					int pos = 1; // Ppositions des bits de contrôle
					while(pos <= valeurs.size()) { // Les bits de contrôle sont inséres selon la taille du message final
						 // Insertion d'une position pour bit de contrôle (initialement vide)
						valeurs.insertElementAt(new JLabel(" ", SwingConstants.CENTER), pos-1);
						pos = pos * 2; // Les positions des bits de contrôle sont les puissances de 2
						nbrKbits++; //  Nombre de bits de contrôle
					}
					tailleHamming = message.length() + nbrKbits; // Taille totale du message encodé
					afficheTable(tailleHamming); // Afficher ce message
				}
				break;
			case 1 : // Etape 1 : calcul des positions à 1
				codesPositions = new Vector<String>(); // Contiendra les codes binaires des positions à 1
				calcul.setText("   Positions à 1 :\n"); // Titre
				for (int i = 0; i < tailleHamming; i++) { // Balayer tout le message
					String texte = valeurs.elementAt(i).getText(); // Bit de position i+1
					if (texte.equals("1")) { // C'est un bit à 1 (ne peut pas être un bit de contrôle car ils sont vides)
						String bin = conversionBinaire(i+1, nbrKbits); // Position du bit mise en binaire
						codesPositions.addElement(bin); // Conserver le code binaire des positions à 1
						calcul.append("   "+(i+1)+" : \t"+bin+"\n"); // Affichage des positions à 1 + code binaire
					}
				}
				parite = ""; // Contiendra le parité des codes binaires des positions à 1
				int cptPar; // Comptage des bits à 1 modulo 2
				for (int j = 0; j < nbrKbits; j++) { // Pour tous les bits des codes binaires des positions à 1
					cptPar=0; // Le comptage des bits à 1 modulo 2 part à 0
					for (int i = 0; i < codesPositions.size(); i++) { // Pour tous les codes binaires des positions à 1
						if (codesPositions.elementAt(i).charAt(j) == '1') { // C'est un bit à 1 => on en tient compte
							cptPar = (cptPar + 1) % 2;  // Comptage des bits à 1 modulo 2
						}
					}
					parite = parite + String.valueOf(cptPar); // Ajout du jème bit de la parité des codes binaires des positions à 1
				}
				calcul.append("   Parité :\t"+parite); // Affichage de la parité des codes binaires des positions à 1
				break;
			case 2 : // Etape 2 : Calcul du message final
				int pos = 1; // Positions des bits de contrôle
				int i = nbrKbits-1; // Position du bit le plus à gauche des codes binaires de position
				while(pos <= valeurs.size()) { // Mise en place des bits de contrôle aux positions puissances de 2
					valeurs.elementAt(pos-1).setText(parite.substring(i, i+1)); // valeur du bit de contrôle
					valeurs.elementAt(pos-1).setForeground(Color.red); // Affichage des bits de contrôle en rouge
					i--; // Passer à la position précédente du code binaire de position
					pos = pos * 2; // Les positions des bits de contrôle sont les puissances de 2
				}
				String enBin = ""; // Chaîne représentant le message complet en binaire
				for (int j = valeurs.size()-1; j >= 0; j--) { // Parcours du code final bit par bit
					enBin = enBin + valeurs.elementAt(j).getText().trim(); // Enlever les espaces => bits collés
				}
				calcul.append("\n\n  Code final : "+enBin+"\n"); // Afficher le code final en binaire
				 // Afficher le code final en hexadécimal (si c'est possible)
				try { // Essayer de le convertir en hexadécimal (la méthode utilisée est limitée aux "long" càd 64 bits)
					calcul.append("  En hexadécimal : " + conversionBase(conversionDepuisBinaire(enBin), 16)); // L'afficher
				}
				catch(NumberFormatException nfe) {} // On ne le convertit pas s'il est > 2^63-1 => on n'affiche pas
				break;
			default : // Etape inconnue : ce cas ne se produit jamais
				etapeEnCours = 0; // Retour à l'étape initiale
				System.err.println("Etape de calcul incorrecte");
				break;
			}
			if (ok) { // Passer à l'étape suivante (sauf dans le cas d'un message incorrect saisi à l'étape 1)
				etapeEnCours = (etapeEnCours + 1) % nbrEtapes; // Etape suivante, si dernière étape => recommencer
				etapes.setText(messagesBouton.elementAt(etapeEnCours)); // Changer le texte du bouton
			}
		}
	}
	
	// Traitement des événements du bouton = étapes de calcul lors de la correction d'un message :
	// Etape 0 : saisie du message à corriger
	// Etape 1 : calcul de la parité des codes binaires des positions à 1 hors bits de contrôle
	// Etape 2 : Calcul de la position d'erreur
	// Etape 3 : Correction et affichage du message si la correction est possible (pas plus d'une erreur)
	private class Correction implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent arg0) {
			boolean ok = true; // true si on doit passer à l'étape suivante (a priori oui)
			switch(etapeEnCours) { // Action selon l'étape de calcul
			case 0 : // Etape 0 : saisie du message
				calcul.setText(""); // Effacer le calcul des bits de contrôle précédent
				message = saisieMessage.getText(); // Récupération du message à corriger
				if (incorrect(message)) { // Vérification du message à corriger
					ok = false; // On reste à l'étape 1 car la saisie est mauvaise
					saisieMessage.setText(""); // La saisie est effacée car incorrecte
				}
				else { // Le message saisi est correct
					nbrKbits = 0; // Nombre de bits de contrôle
					valeurs = new Vector<JLabel>(); // Contiendra les bits du message
					for (int i = message.length()-1; i >= 0; i--) { // Récupération des bits du message
						// Pour affichage des bits du message
						JLabel leBit = new JLabel(message.substring(i, i+1), SwingConstants.CENTER);
						valeurs.addElement(leBit); // Conserver l'affichage
						if (estPuissanceDeDeux(valeurs.size())) { // Si c'est un bit de contrôle
							leBit.setForeground(Color.red); // Mettre en rouge les bits de contrôle
							nbrKbits++; // Nombre de bits de contrôle
						}
					}
					tailleHamming = message.length(); // Taille totale du message (avec bits de contrôle)
					afficheTable(tailleHamming); // Afficher ce message
				}
				break;
			case 1 : // Etape 1 : calcul des positions à 1
				codesPositions = new Vector<String>(); // Contiendra les codes binaires des positions à 1 (hors bits de contrôle)
				calcul.setText("   Positions à 1 :\n"); // Titre
				for (int i = 0; i < tailleHamming; i++) { // Balayer tout le message
					String texte = valeurs.elementAt(i).getText(); // Bit en position i+1
					if ((texte.equals("1")) && (!estPuissanceDeDeux(i+1))) { // C'est un bit à 1 mais pas un bit de contrôle 
						String bin = conversionBinaire(i+1, nbrKbits); // Position du bit en binaire
						codesPositions.addElement(bin); // Conserver le code binaire des positions à 1 (hors bits de contrôle)
						calcul.append("   "+(i+1)+" : \t"+bin+"\n"); // Affichage des positions à 1 (hors bits de contrôle) + code binaire
					}
				}
				parite = ""; // Contiendra la parité des codes binaires des positions à 1 (hors bits de contrôle)
				int cptPar; // Comptage des bits à 1 modulo 2
				for (int j = 0; j < nbrKbits; j++) { // Pour tous les bits des codes binaires des positions à 1
					cptPar=0; // Le comptage des bits à 1 modulo 2 part à 0
					for (int i = 0; i < codesPositions.size(); i++) { // Pour tous les codes binaires des positions à 1
						if (codesPositions.elementAt(i).charAt(j) == '1') { // C'est un bit à 1 => on le compte
							cptPar = (cptPar + 1) % 2;  // Comptage des bits à 1 modulo 2
						}
					}
					parite = parite + String.valueOf(cptPar); // Ajout du jème bit de la parité des codes binaires des positions à 1
				}
				calcul.append("   Parité :\t"+parite); // Affichage de la parité des codes binaires des positions à 1 (hors bits de contrôle)
				break;
			case 2 : // Etape 2 : Calcul de la position d'erreur
				String pariteRecue = ""; // Contiendra les bits de contrôle contenus dans le message
				int pos = 1; // Position des bits de contrôle
				while (pos <= valeurs.size()) { // Récupérer les bits qui sont dans les positions de contrôle
					pariteRecue = valeurs.elementAt(pos-1).getText() + pariteRecue; // Ajouter le bit de parité verticale obtenu
					pos = pos * 2; // Les positions de contrôle sont les puissances de 2
				}
				calcul.append("\n   Parité reçue :\t" + pariteRecue); // Afficher les bits de contrôle contenus dans le message
				positionErreur = ""; // Contiendra le calcul de la position d'erreur
				for (int i = 0; i < nbrKbits; i++) {  // Pour chaque bit du code de parité
					// Calcul de la parité entre celle des positions à 1 et celle reçue = position d'erreur
					if (parite.charAt(i) == pariteRecue.charAt(i) ) positionErreur = positionErreur + "0";
					else positionErreur = positionErreur + "1";
				}
				calcul.append("\n   Pos. d'erreur :\t"+positionErreur+" = "+
									conversionDepuisBinaire(positionErreur)+"\n"); // Afficher la position d'erreur
				break;
			case 3 : // Etape 3 : Correction du message (si possible)
				boolean corrigeable = true; // On pourra ou pas corriger le message (a priori on suppose que oui)
				int erreur = (int)conversionDepuisBinaire(positionErreur); // Convertir la position d'erreur en décimal
				if (erreur == 0) { // Le code calculé est 0 donc il n'y a pas d'erreur
					calcul.append("\n   Le message ne comporte pas d'erreurs"); 
				}
				else { // Le code calculé n'est pas 0 
					if (erreur > valeurs.size()) { // Le code calculé indique une position qui n'existe pas
						calcul.append("\n   Ce message comporte plus d'une erreur\n");
						corrigeable = false; // On ne peut rien faire
					}
					else { // Le code calculé indique une position qui existe => il y a une erreur à cette position
						String actuel = valeurs.elementAt(erreur-1).getText(); // Valeur du bit erroné
						 // Correction du bit erroné (0->1 ou 1->0)
						if (actuel.equals("0")) valeurs.elementAt(erreur-1).setText("1");
						else valeurs.elementAt(erreur-1).setText("0");
						valeurs.elementAt(erreur-1).setForeground(Color.BLUE); // Marquer le bit corrigé en bleu
						positions.elementAt(positions.size()-erreur).setForeground(Color.BLUE); // Marquer la position du bit corrigé en bleu
					}
				}
				if (corrigeable) { // Si le message peut être corrigé ou n'a pas d'erreur, l'afficher sans les bits de contrôle
					String messageRecu = ""; // Contiendra le message débarrassé des bits de contrôle
					for (int i = 0; i < tailleHamming; i++) { // Balayer tout le message
						if (!estPuissanceDeDeux(i+1)) { // Sauter les bits de contrôle 
							messageRecu = valeurs.elementAt(i).getText() + messageRecu; // Ajouter un bit du message
						}
					}
					calcul.append("\n   Message reçu : "+messageRecu); // Afficher le message sans les bits de contrôle
					 // Afficher le message sans les bits de contrôle en hexadécimal (si c'est possible)
					try { // Essayer de convertir en hexadécimal (la méthode utilisée est limitée aux "long" càd 64 bits)
						calcul.append("\n   En hexadécimal : " + conversionBase(conversionDepuisBinaire(messageRecu), 16)); // L'afficher
					}
					catch(NumberFormatException nfe) {} // On ne le convertit pas s'il est > 2^63-1 => on n'affiche pas
				}
				break;
			default : // Etape inconnue : ce cas ne se produit jamais
				etapeEnCours = 0; // Retour à l'étape initiale
				System.err.println("Etape de calcul incorrecte");
				break;
			}
			if (ok) { // Passer à l'étape suivante (sauf dans le cas d'un message incorrect saisi à l'étape 1)
				etapeEnCours = (etapeEnCours + 1) % nbrEtapes; // Etape suivante, si dernière étape => recommencer
				etapes.setText(messagesBouton.elementAt(etapeEnCours)); // Changer le texte du bouton
			}
		}
	}

	// Méthodes utilitaires :
	
	// Vérification du message saisi : renvoie true s'il est binaire
	private boolean incorrect(String message) { 
		if (message.length() == 0) return true; // Le message saisi ne doit pas être vide
		boolean ok = true; // Indicateur de message correct càd binaire
		int i = 0; // Indice de parcours du message caractère par caractère
		while(ok && (i < message.length())) { // Parcourir le message caractère par caractère
			if ((message.charAt(i) != '0') && (message.charAt(i) != '1')) ok = false; // Si pas 0 ou 1 erreur
			else i++; // Passer au caractère suivant
		}
		return !ok; // Renvoie true si le message est incorrect
	}

	// Renvoie true si x est une puissance de 2
	private boolean estPuissanceDeDeux(int x) { 
		// Pour que x soit une puissance de 2 il faut que x soit > 0 et que le ET entre x et x-1 soit nul 
		//  (exemple (x=8) : 1000 ET 0111 = 0000)
		return ( (x > 0) && (((x-1) & x) == 0) ); // Et voilà !
	}
	
  	// Convertit un entier positif en une base quelconque 
 	private String conversionBase(long aMettreEnBase, int base) {
	 	return Long.toString(aMettreEnBase, base).toUpperCase();
 	}
  	// Convertit un entier positif en une base quelconque sur un nombre de chiffres donné
 	private String conversionBase(long aMettreEnBase, int base, int tailleEnBits) {
	 	return String.format("%"+tailleEnBits+"s", conversionBase(aMettreEnBase, base)).replace(' ','0');
 	}
	// Convertit un entier positif en binaire 
 	private String conversionBinaire(int aMettreEnBinaire) {
	 	return conversionBase(aMettreEnBinaire, 2);
 	}
	// Convertit un entier positif en binaire sur un nombre de bits donné
 	private String conversionBinaire(int aMettreEnBinaire, int tailleEnBits) {
	 	return conversionBase(aMettreEnBinaire, 2, tailleEnBits);
 	}

 	// Convertit une valeur représentée dans la base donnée en un nombre décimal
 	// Lève une exception si la valeur dépasse 2^63-1 (car "long" est un entier relatif sur 64 bits en complément à 2)
 	private long conversionDepuisBase(String aMettreEnDecimal, int base) throws NumberFormatException {
	 	return Long.parseLong(aMettreEnDecimal, base);
 	}
 	// Convertit une valeur binaire en un nombre décimal
 	// Lève une exception si la valeur dépasse 2^63-1 (car "long" est un entier relatif sur 64 bits en complément à 2)
 	private long conversionDepuisBinaire(String aMettreEnDecimal) throws NumberFormatException {
	 	return conversionDepuisBase(aMettreEnDecimal, 2);
 	}
 	
 	// Fenêtres auxiliaires :

 	// Fenêtre affichée pour l'aide
 	private class FenetreAide extends JFrame { 
 		private static final long serialVersionUID = 1L; // Pour éviter un warning
 		// Message d'aide affiché dans la fenêtre
		private final String message ="\n\t\tUtilisation :\n"
 				+ "  Choisir le fonctionnement désiré par le menu \"Mode de calcul\"\n"
 				+ "  Choisir \"Ajout des bits de contrôle\" pour calculer et ajouter les bits de contrôle à un mot binaire saisi.  \n"
 				+ "  Choisir \"Correction d'un message\" pour corriger un message contenu dans un mot binaire saisi.  \n"
 				+ "  Le choix actuel de fonctionnement correspond à la ligne du menu qui s'affiche en bleu.  \n\n"
 				+ "  Quand le mode a été choisi il suffit :  \n"
 				+ "  - De saisir le mot binaire à contrôler ou à corriger et valider par le bouton.  \n"
 				+ "  - De suivre le processus de calcul étape par étape grâce au même bouton.\n"
 				+ "  Le texte contenu dans le bouton indique l'étape de calcul qu'il provoquera.  \n";
 		private Hamming mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
 		
 		public FenetreAide(Hamming mere) { // Création de la fenêtre d'aide
 			super("Aide"); // Titre de la fenêtre
 			this.mere = mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
 			setLocation(1,mere.getHeight()); // Placer cette fenêtre sous celle depuis laquelle elle a été ouverte
 			addWindowListener(new GestionFenetre()); // Action a faire quand on ferme la fenêtre
 			getContentPane().setLayout(new BorderLayout()); // Placement dans la fenêtre
			JLabel titre = new JLabel("Méthode de Hamming", SwingConstants.CENTER); // Titre
			titre.setForeground(Color.blue); // Le titre est écrit en bleu
 			titre.setFont(new Font("Times",Font.BOLD,20)); // Le titre est en gras et en police 20
 			getContentPane().add(titre, BorderLayout.NORTH); // Le titre est en haut
 			JTextArea texte = new JTextArea(); // Zone d'affichage du texte d'aide
 			texte.setEditable(false); // Le texte d'aide n'est pas modifiable
 			texte.setFont(new Font("Times",Font.PLAIN,14)); // Police du texte d'aide
 			texte.setText(message); // Afficher le texte d'aide
 			getContentPane().add(texte, BorderLayout.CENTER); // Le texte d'aide est placé au centre
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
 		private final String message ="\n    Calcul et correction d'erreurs selon la méthode de Hamming.   \n\n";
 		private Hamming mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
 		
 		public FenetreAPropos(Hamming mere) { // Création de la fenêtre de copyright
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
		new Hamming(); // Créer la fenêtre et c'est tout
	}

}
