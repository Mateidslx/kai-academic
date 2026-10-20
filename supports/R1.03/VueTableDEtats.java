/*
 * @author Dalmau
 * 15/12/2018
 */
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.util.Vector;

import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;

/*
  Element à ajouter à l'interface pour afficher la table lue dans un fichier
 */
public class VueTableDEtats extends JPanel {
	private static final long serialVersionUID = 1L; // Pour éviter un warning

	private static final int LARGEUR = 400; // Largeur préférentielle de la table d'états
	private static final int HAUTEUR = 100; // Hauteur préférentielle de la table d'états
	private static final int DECALAGE_ASCENSEUR = 2; // Nombre de lignes au dessus de la la ligne rendue visible quand on bouge l'ascenseur
	private Vector<Vector<JTextField>> textes; // Zones d'affichage des éléments de la table d'états
	private JScrollPane ascenseur; // Comme la table peut être longue on prévoit un ascenseur
	private JPanel liste; // Partie de l'interface contenant la table d'états 

	// Création du JPanel contenant la table d'états
	public VueTableDEtats() {
		super();
		setBorder(BorderFactory.createLineBorder(Color.black)); // Pour dessiner un cadre autours de la table d'états
		setLayout(new BorderLayout());

		// Mise en place du tableau représentant la table d'états
		JPanel haut = new JPanel();
		haut.setLayout(new GridLayout(2,1,2,2));
		JLabel intitule = new JLabel("Table de transistion", JLabel.CENTER); // Titre de la table d'états
		intitule.setToolTipText("Table décrivant le fonctionnement de la machine de Turing");
		intitule.setFont(new Font("Serif", Font.PLAIN, 22)); // Ecrit en gros
		haut.add(intitule, BorderLayout.NORTH);
		JPanel titre = new JPanel(); // Placement des titres des colonnes de la table d'états
		titre.setLayout(new GridLayout(1,5,2,2));
		JLabel ea = new JLabel(" Etat act ",JLabel.CENTER);
		ea.setToolTipText("Etat actuel de la machine");
		titre.add(ea); // Etat actuel
		JLabel cl = new JLabel(" Car lu ",JLabel.CENTER);
		cl.setToolTipText("Caractère lu par la tête");
		titre.add(cl); // caractère lu par la tête
		JLabel es = new JLabel(" Etat suiv ",JLabel.CENTER);
		es.setToolTipText("Etat que prendra la machine ensuite");
		titre.add(es); // Etat suivant
		JLabel ce = new JLabel(" Car écrit ",JLabel.CENTER);
		ce.setToolTipText("Caractère écrit sur la bande par la tête");
		titre.add(ce); // caractère écrit sur la bande
		JLabel dep = new JLabel(" Action ",JLabel.CENTER);
		dep.setToolTipText("Déplacement de la tête (D ou G) ou arrêt de la machine (A)"); 
		titre.add(dep); // Déplacement de la bande ou arrêt
		haut.add(titre);
		add(haut, BorderLayout.NORTH);
		liste = new JPanel(); // Partie de l'interface contenant la table d'états 
		ascenseur = new JScrollPane(liste); // Comme la table peut être longue on prévoit un ascenseur
		ascenseur.setPreferredSize(new Dimension(LARGEUR, HAUTEUR)); // Permet de limiter la taille de la fenêtre
		add(ascenseur, BorderLayout.CENTER);
	}
	
	// Ajoute une zone de texte à l'interface
	private void ajouteZone(JTextField zone) {
		textes.lastElement().add(zone); // Conserver la zone de texte ajoutée
		textes.lastElement().lastElement().setEditable(false); // Zone non modifiable
		textes.lastElement().lastElement().setHorizontalAlignment(JTextField.CENTER); // Zone centrée
		liste.add(textes.lastElement().lastElement()); // Zone mise dans l'interface
	}

	// Remplit cette interface à partir d'une table d'états lue dans un fichier
	public void remplir(TableDEtats table) throws LigneIncorrecteException {
		liste.removeAll(); // Enlever tout ce qu'il y avait dans l'interface de la table précédente
		textes = new Vector<Vector<JTextField>>();  // Nouvelles zones d'affichage des éléments de la table d'états 
		liste.setLayout(new GridLayout(table.getTaille(), 5, 2, 2));
		Vector<LigneDeTable> aMettre = table.getContenu(); // Récupérer la table d'états sous forme de vecteur
		for (int i = 0; i< aMettre.size(); i++) { // balayer toute la table d'états
			textes.add(new Vector<JTextField>()); // Ajouter une nouvelle série de 5 zones d'affichage
			LigneDeTable lig = aMettre.elementAt(i); // Ligne courante de la table d'états
			ajouteZone(new JTextField(lig.getEtatActuel())); // Ajouter la zone pour l'état actuel
			ajouteZone(new JTextField(lig.getCaractereLu())); // Ajouter la zone pour le caractère lu par la tête
			ajouteZone(new JTextField(lig.getEtatSuivant())); // Ajouter la zone pour l'état suivant
			ajouteZone(new JTextField(lig.getCaractereEcrit())); // Ajouter la zone pour le caractère à écrire sur la bande
			ajouteZone(new JTextField(lig.getAction())); // Ajouter la zone pour le déplacement ou l'arrêt
		}
	}
	
	// Renvoie la zone d'affichage placée à la ligne et la colonne données
	private JTextField getElementAt(int ligne, int colonne) {
		if ((ligne >= textes.size()) || (ligne < 0)) return null; // n° de ligne incorrect
		if ((colonne >= textes.elementAt(ligne).size()) || (colonne < 0)) return null; // n° de colonne incorrect
		return textes.elementAt(ligne).elementAt(colonne);
	}
	
	// Change la couleur et le style de la zone d'affichage placée à la ligne et la colonne données
	// Le dernier paramètre est à true si on doit montrer la modification en bougeant l'ascenseur
	private void setStyleEtCouleurElement(int ligne, int colonne, Color coul, int graisse, boolean voir) {
		JTextField t = getElementAt(ligne, colonne); // Zone d'affichage placée à la ligne et la colonne données
		if (t != null) { // Si elle existe on la modifie
			t.setFont(t.getFont().deriveFont(graisse)); // Même fonte de caractères mais avec le style donné
			t.setForeground(coul); // Et avec la couleur donnée
			if (voir) { // Positionner l'ascenseur pour que la ligne modifiée soit visible
				int ligneSurlignee = ligne; // L'ascenseur se place 2 lignes avant celle surlignée
				if (ligneSurlignee <= DECALAGE_ASCENSEUR) ligneSurlignee = 0;
				else ligneSurlignee = ligneSurlignee - DECALAGE_ASCENSEUR;
				// Décaler l'ascenseur pour que la ligne surlignée soit visible
				ascenseur.getVerticalScrollBar().setValue(
						ligneSurlignee * ascenseur.getVerticalScrollBar().getMaximum()/textes.size());
			}
		}
	}
	
	// Change le style et la couleur de tous les éléments de la ligne désignée
	// Le dernier paramètre est à true si on doit montrer la modification en bougeant l'ascenseur
	public void surligneLigne(int ligne, Color coul, int graisse, boolean voir) {
		for(int i = 0; i<5; i++) setStyleEtCouleurElement(ligne, i, coul, graisse, voir); // 5 zones pour une ligne
	}
	
	// Renvoie le n° de la ligne correspondant à un état et un caractère lu donnés
	public int getLigne(String etatActuel, String carLu) throws MoteurException {
		int lig = 0;
		String carCherche = carLu; // La caractère recherché
		if (carCherche.equals(" ")) carCherche = "."; // Un espace est noté . dans le fichier
		while ((lig < textes.size()) && ((!textes.elementAt(lig).firstElement().getText().equals(etatActuel))
			|| (!textes.elementAt(lig).elementAt(1).getText().equals(carCherche))) ) lig++; // Chercher dans toute la table d'états
		if (lig == textes.size()) // On ne l'a pas trouvé => lever une exception
			throw new MoteurException("La ligne correspondant à l'état \""+etatActuel+"\" pour le caractère \""+carLu+"\" n'est pas définie dans la table");
		else return lig; // On l'a trouvé => on renvoie le n° de la ligne correspondant à l'état et au caractère lu donnés
	}
}
