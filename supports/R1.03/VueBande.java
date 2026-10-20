/*
 * @author Dalmau
 * 15/12/2018
 */
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import javax.swing.JLabel;

/*
   Affichage de la bande et de la tête de la machine de Turing
   L'affichage est fait dans un JLabel par dessin dans sa zone graphique
   La méthode paint est surchargée pour que l'affichage se fasse normalement
 */
public class VueBande extends JLabel {
	private static final long serialVersionUID = 1L; // Pour éviter un warning
	
	// Constantes pour le dessin
	private static final int TAILLE_CASE = 20; // taille des cases de la bande
	private static final int MARGE_X = 5*TAILLE_CASE/12; // Centrage des caractères dans les cases
	private static final int MARGE_Y = TAILLE_CASE/5; // Marge en hauteur pour la tête et les caractères dans les cases
	private static final int EPAISSEUR_TETE = 5; // épaisseur de la tête
	private static final Color COULEUR_TETE = Color.blue; // Couleur de la  partie pleine de la tête
	private static final int LARGEUR = 600; // Largeur préférentielle de la zone graphique d'affichage de la bande
	private static final int HAUTEUR = TAILLE_CASE*3; // Hauteur préférentielle de la zone graphique d'affichage de la bande

	// Propiétés de la vue de la bande
	private String contenu; // Texte écrit sur la bande
	private int positionTete; // position de la tête : 0 => sur le 1er caractère

	// Création d'une bande vide
	public VueBande() { 
		super(""); // JLabel intialement vide
		contenu = ""; // Contenu intialement vide
		positionTete = 0; // La position normale de la tête est au début du texte
		setPreferredSize(new Dimension(LARGEUR, HAUTEUR)); // C'est une zone graphique elle n'a pas de taille prédéfinie
	}
	
	// Change le contenu de la bande
	public void changeContenu(String nouveauContenu) {
		contenu = new String(nouveauContenu); // Nouveau texte écrit sur la bande
		positionTete = 0; // La position normale de la tête est au début du texte
		repaint(); // Le nouveau contenu est affiché
	}

	// Renvoie le texte écrit sur la bande en enlevant les espaces
	public String getContenu() { 
		return new String(contenu.trim()); 
	}
	
	// Change un caractère écrit sur la bande (utilisé aussi pour effacer un caractère)
	public void changeCaractere(String nouveauCaractere, boolean montrer)  {
		if ((positionTete < 0) || (positionTete >= contenu.length())) { // La tête n'est pas sur le texte écrit
			if (positionTete < 0) { // La tête se situe à gauche du texte écrit
				if (positionTete == -1) { // La tête est juste avant le 1er caractère 
					contenu = nouveauCaractere + contenu; // on ajoute ce caractère en début de texte
				}
				else { // La tête est à gauche du 1er caractère
					String nouvelle = "";
					for (int i = 1; i < -positionTete; i++) nouvelle = nouvelle + " "; // On ajoute des espaces après le caractère écrit
					nouvelle = nouvelle + nouveauCaractere; // Puis on place le caractère écrit
					contenu = nouvelle + contenu; // Tout ça vient en début de texte
				}
				positionTete++; // La position 0 à changé puisqu'on a ajouté un caractère en début de texte
			}
			else { // La tête se situe à droite du texte écrit
				for (int i = 0; i < positionTete - contenu.length(); i++) contenu = contenu + " "; // On ajoute des espaces à droite du texte
			}
			contenu = contenu + nouveauCaractere; // Puis on y ajoute le caractère écrit
		}
		else { // La tête est sur le texte écrit
			StringBuilder remplace = new StringBuilder(contenu);
			remplace.setCharAt(positionTete, nouveauCaractere.charAt(0)); // On remplace l'ancien caractère par celui écrit
			contenu = remplace.toString();
		}
		if (montrer) repaint(); // Afficher la bande modifiée
	}
	
	// Renvoie la caractère actuellement sous la tête
	public String getCaractereLu() {
		if ((positionTete < 0) || (positionTete >= contenu.length())) return new String(" "); // La tête n'est pas sur le texte => espace
		else return contenu.substring(positionTete, positionTete+1); // La tête est sur le texte => caractère actuellement sous la tête
	}
	
	// Décale la tête à droite (donc la bande à gauche)
	public void aDroite(boolean montrer) { // le paramètre permet d'afficher ou pas le mouvement de la bande
		positionTete++;
		if (montrer) repaint();
	}
	public void aDroite() { aDroite(true); } // Décalage affiché
	
	// Décale la tête à gauche (donc la bande à droite)
	public void aGauche(boolean montrer) { // le paramètre permet d'afficher ou pas le mouvement de la bande
		positionTete--;
		if (montrer) repaint();
	}
	public void aGauche() { aGauche(true); } // Décalage affiché
	
	// Surcharge de paint pour que swing affiche la bande et la tête dessinées
	@Override
	public void paint(Graphics g) {
		super.paint(g); // Redessin du JLabel normal

		// Dessin de la bande vierge
		g.drawLine(0, (getHeight() - TAILLE_CASE)/2, getWidth(), (getHeight() - TAILLE_CASE)/2); // trait horizontal haut
		g.drawLine(0, (getHeight() + TAILLE_CASE)/2, getWidth(), (getHeight() + TAILLE_CASE)/2); // trait horizontal bas
		for (int i = (getWidth() + TAILLE_CASE)/2; i < getWidth(); i = i+ TAILLE_CASE) {
			g.drawLine(i, (getHeight() - TAILLE_CASE)/2, i, (getHeight() + TAILLE_CASE)/2); // lignes verticales à droite de la tête
		}
		for (int i = (getWidth() - TAILLE_CASE)/2; i > 0; i = i- TAILLE_CASE) { // lignes verticales à gauche de la tête
			g.drawLine(i, (getHeight()-TAILLE_CASE)/2, i, (getHeight()+TAILLE_CASE)/2);
		}

		// Dessin de la tête
		g.setColor(COULEUR_TETE); // Couleur de la tête
		// Rectangle arrondi extérieur
		g.fillRoundRect((getWidth() - TAILLE_CASE)/2 - EPAISSEUR_TETE, 
				(getHeight() - TAILLE_CASE)/2 - MARGE_Y - EPAISSEUR_TETE, 
				TAILLE_CASE + 2*EPAISSEUR_TETE, 
				TAILLE_CASE * 3/2 + 2*EPAISSEUR_TETE, 
				(TAILLE_CASE + MARGE_Y)/2, (TAILLE_CASE + MARGE_Y)/2);
		// Rectangle arrondi intérieur
		g.setColor(getBackground()); // Ce rectangle est un trou donc dessiné couleur fond
		g.fillRoundRect((getWidth()- TAILLE_CASE)/2, 
				(getHeight()- TAILLE_CASE)/2 - MARGE_Y, 
				TAILLE_CASE, TAILLE_CASE * 3/2, 
				TAILLE_CASE/2, TAILLE_CASE/2);
		// Bord du rectangle arrondi extérieur
		g.setColor(Color.black); // les bords sont en noir
		g.drawRoundRect((getWidth()- TAILLE_CASE)/2 - EPAISSEUR_TETE, 
				(getHeight() - TAILLE_CASE)/2 - MARGE_Y - EPAISSEUR_TETE, 
				TAILLE_CASE + 2*EPAISSEUR_TETE, 
				TAILLE_CASE * 3/2 + 2*EPAISSEUR_TETE, 
				(TAILLE_CASE + MARGE_Y)/2, (TAILLE_CASE + MARGE_Y)/2);
		// Bord du rectangle arrondi intérieur
		g.drawRoundRect((getWidth()- TAILLE_CASE)/2, 
				(getHeight() - TAILLE_CASE)/2 - MARGE_Y, 
				TAILLE_CASE, TAILLE_CASE * 3/2, 
				TAILLE_CASE/2, TAILLE_CASE/2);
		// Redessiner les bords de la bande dans le trou de la tête
		g.drawLine((getWidth() - TAILLE_CASE)/2, (getHeight() - TAILLE_CASE)/2, 
				(getWidth()+ TAILLE_CASE)/2, (getHeight() - TAILLE_CASE)/2);
		g.drawLine((getWidth() - TAILLE_CASE)/2, (getHeight() + TAILLE_CASE)/2, 
				(getWidth() + TAILLE_CASE)/2, (getHeight() + TAILLE_CASE)/2);

		// Dessin du texte de la bande
		// Le 1er caractère est placé à -positionTete par rapport au centre
		for (int i = 0; i < contenu.length(); i++) { // Pour chaque caractère
			// Position de ce caractère en fonction de où se trouve la tête
			int pos = (getWidth() - TAILLE_CASE)/2 - (positionTete * TAILLE_CASE) + MARGE_X + (i * TAILLE_CASE);
			if ((pos > 0) && (pos < getWidth())) { // Si la position est visible
				g.drawString(contenu.substring(i, i+1), pos, (getHeight() + TAILLE_CASE)/2 - MARGE_Y); // afficher le caractère
			}
		}
	}

}
