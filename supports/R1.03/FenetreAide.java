/*
 * @author Dalmau
 * 15/12/2018
 */

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.text.BadLocationException;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyledDocument;

// Fenêtre affichée pour l'aide
public class FenetreAide extends JFrame { 
	private static final long serialVersionUID = 1L; // Pour éviter un warning
	private JScrollPane ascenseur;
	// Message d'aide affiché dans la fenêtre
	private static final String TITRE1 = "\n\t Machine de Turing :  \n";
	private static final String TITRE2 = "\n\t Utilisation :   \n";
	private static final String PARTIE1 =
			  "   La machine de Turing est un concept abstrait, mais son fonctionnement peut être simulé.   \n"
			+ "   C'est ce que fait cette petite application.   \n";
	private static final String PARTIE2 =
			  " 1. Ouvrir un fichier (.txt) contenant la description du fonctionnement désiré (menu Fichier/Ouvrir) \n"
			+ "    Chaque ligne de ce fichier décrit une transition d'état et une action de la machine sous la forme de cinq   \n"
			+ "    valeurs dans l'ordre (de gauche à droite) :   \n"
			+ "     - Etat actuel : L'état dans lequel est la machine (l'état initial de la machine sera celui défini comme   \n"
			+ "                   état actuel à la 1ère ligne du fichier)   \n"
			+ "     - Caractère lu : Le caractère se trouvant actuellement sous la tête de lecture   \n"
			+ "     - Etat suivant : L'état dans lequel sera ensuite la machine   \n"
			+ "     - Caractère écrit : Le caractère qui remplacera celui se trouvant actuellement sous la tête de lecture \n"
			+ "     - Action : Ce que fera la machine :   \n"
			+ "         D pour déplacer la bande pour que le tête se trouve devant le caractère de droite   \n"
			+ "         G pour déplacer la bande pour que le tête se trouve devant le caractère de gauche   \n"
			+ "         A pour que la machine s'arrête   \n"
			+ "     Dans ce fichier les valeurs doivent être séparées par des espaces ou des tabulations.   \n"
			+ "     Dans ce fichier lorsque le caractère lu ou écrit est un espace, il est noté par un point.   \n"
			+ "     Dans ce fichier une ligne començant par // est considérée comme un commentaire.   \n"
			+ " 2.  Saisir le texte à écrire sur la bande (c'est la donnée du problème à traiter).   \n"
			+ " 3.  Cliquer sur le bouton \"Réinitialiser\" pour intialiser la machine   \n"
			+ "      La tête se place sur le 1er caractère de la donnée et l'état initial est le 1er état défini dans le fichier.   \n"
			+ " 4.  On peut alors suivre le fonctionnement de la machine étape par étape avec le bouton \"Faire une étape\"   \n"
			+ "      ou faire démarrer la machine jusqu'à ce qu'elle termine avec le bouton \"Démarrer\".   \n"
			+ "      Le bouton \"Démarrer\" permet aussi de la mettre en pause à tout moment puis de reprendre le calcul.   \n"
			+ " 5.  Le curseur permet de régler la vitesse d'exécution des étapes pour les suivre en détail   \n"
			+ "      lorsqu'il est totalement à gauche le fonctionnement est très rapide (il devrait être instantané).    \n"
			;
	private static final String TITRE3 = "\n\t Exemples :   \n";
	private static final String PARTIE3 =
			  "   Plusieurs fichiers (.txt) d'exemples sont proposés :   \n"
			+ "   - Un qui remplace un nombre décimal de longueur quelconque en son double.   \n"
			+ "   - Un qui remplace un nombre décimal de longueur quelconque en son triple.   \n"
			+ "   - Un qui retourne en miroir un mot binaire de longueur quelconque.   \n"
			+ "   - Un qui convertit un entier naturel binaire de longueur quelconque en décimal.   \n"
			+ "   - Un qui convertit un entier naturel décimal de longueur quelconque en binaire.   \n"
			+ "   - Un qui fait la somme binaire de 2 entiers naturels binaires de longueur quelconque.   \n"
			;
	private MachineDeTuring mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
	
	public FenetreAide(MachineDeTuring mere) { // Création de la fenêtre d'aide
		super("Aide"); // Titre de la fenêtre
		this.mere = mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
		setLocation(mere.getLocation().x + mere.getWidth(), mere.getLocation().y); // Placer cette fenêtre à droite de celle depuis laquelle elle a été ouverte
		addWindowListener(new GestionFenetre()); // Actions à faire quand on ouvre ou ferme la fenêtre
		getContentPane().setLayout(new BorderLayout()); // Placement dans la fenêtre
		JLabel titre = new JLabel("Problème de calculabilité", JLabel.CENTER); // Titre
		titre.setForeground(Color.black); // Le titre est écrit en bleu
		titre.setFont(new Font("Times",Font.BOLD,24)); // Le titre est en gras et en police 20
		getContentPane().add(titre, BorderLayout.NORTH); // Le titre est en haut
		JTextPane texte = new JTextPane(); // Zone d'affichage du texte d'aide
		texte.setEditable(false); // Le texte d'aide n'est pas modifiable
		// Style pour le texte normal
		SimpleAttributeSet styleNormal = new SimpleAttributeSet();
		StyleConstants.setFontFamily(styleNormal, "Serif");
		StyleConstants.setFontSize(styleNormal, 18);
		// Style pour les titres
		SimpleAttributeSet styleTitre = new SimpleAttributeSet();
		StyleConstants.setFontFamily(styleTitre, "Serif");
		StyleConstants.setForeground(styleTitre, Color.BLUE);
		StyleConstants.setFontSize(styleTitre, 22);
		StyleConstants.setBold(styleTitre, true);
		// Parties de texte centrées
		StyledDocument documentStyle = texte.getStyledDocument();
		SimpleAttributeSet texteCentre = new SimpleAttributeSet();
		StyleConstants.setAlignment(texteCentre, StyleConstants.ALIGN_CENTER);
		// Parties de texte justifiées
		SimpleAttributeSet texteJustifie = new SimpleAttributeSet();
		StyleConstants.setAlignment(texteJustifie, StyleConstants.ALIGN_JUSTIFIED);
		// Afficher l'aide (2 titres + 2 parties)
		try {
			documentStyle.setParagraphAttributes(0, TITRE1.length(), texteCentre, false);
			documentStyle.insertString(documentStyle.getLength(), TITRE1, styleTitre); // 1er titre
			documentStyle.setParagraphAttributes(documentStyle.getLength(),PARTIE1.length() , texteJustifie, false);
			documentStyle.insertString(documentStyle.getLength(), PARTIE1, styleNormal); // 1ere partie
			documentStyle.setParagraphAttributes(documentStyle.getLength(), TITRE2.length(), texteCentre, false);
			documentStyle.insertString(documentStyle.getLength(), TITRE2, styleTitre); // 2ème titre
			documentStyle.setParagraphAttributes(documentStyle.getLength(),PARTIE2.length() , texteJustifie, false);
			documentStyle.insertString(documentStyle.getLength(), PARTIE2, styleNormal); // 2ème partie
			documentStyle.setParagraphAttributes(documentStyle.getLength(), TITRE3.length(), texteCentre, false);
			documentStyle.insertString(documentStyle.getLength(), TITRE3, styleTitre); // 3ème titre
			documentStyle.setParagraphAttributes(documentStyle.getLength(),PARTIE3.length() , texteJustifie, false);
			documentStyle.insertString(documentStyle.getLength(), PARTIE3, styleNormal); // 3ème partie
		} 
		catch (BadLocationException e) { // En cas de problème on affiche simplement (sans styles)
 			texte.setFont(new Font("Times",Font.PLAIN,14)); // Police du texte d'aide
 			texte.setText(TITRE1+PARTIE1+TITRE2+PARTIE2+TITRE3+PARTIE3); // Afficher le texte d'aide
		}
		ascenseur = new JScrollPane(texte);	
		getContentPane().add(ascenseur, BorderLayout.CENTER); // Le texte d'aide est placé au centre
		JLabel pied = new JLabel(" (C) M. Dalmau IUT de Bayonne Pays Basque", JLabel.LEFT); // Signature
		pied.setFont(new Font("Times",Font.PLAIN,10)); // La signature est écrite en petit
		getContentPane().add(pied, BorderLayout.SOUTH);  // La signature est placée en bas
		setVisible(true); // Fenêtre visible
	}
	
	// Actions associées à l'ouverture et à la fermeture de la fenêtre
	private class GestionFenetre extends WindowAdapter {
		@Override
		public synchronized void windowOpened(WindowEvent evt) { // Mettre l'ascenseur en haut à l'ouverture de la fenêtre 
			pack(); // Pour que swing calcule la largeur de la fenêtre (sans l'ascenseur vertical)
			// ascenseur placé en haut => l'ascenseur vertical est affiché
			ascenseur.getVerticalScrollBar().setValue(ascenseur.getVerticalScrollBar().getMinimum());
			 // Limiter la hauteur de la fenêtre en calculant la largeur avec l'ascenseur vertical affiché
			setPreferredSize(new Dimension(getWidth() + ascenseur.getVerticalScrollBar().getWidth(), 600));
			pack(); // Afficher la fenêtre de la hauteur choisie
		}
		
		@Override
		public synchronized void windowClosing(WindowEvent evt) { 
			mere.aideFermee(); // Indiquer au programme que le fenêtre n'est plus visible
		}
	}
}
