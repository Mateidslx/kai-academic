/*
 * @author Dalmau
 * 15/12/2018
 */

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextPane;
import javax.swing.text.BadLocationException;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyledDocument;

// Fenêtre affichée pour le copyright
public class FenetreAPropos extends JFrame {
	private static final long serialVersionUID = 1L; // Pour éviter un warning
	// Message de copyright affiché dans la fenêtre
	private static final String TITRE = "          Simulateur de la machine de Turing.   \n";
	private static final String MESSAGE = "   Machine théorique imaginée par Alan Turing en 1936 pour résoudre le problème de la calculabilité.   \n\n";
	private static final String LIEN = "   (L'image animée provient de : http://gif.toutimages.com/images/objets/engrenages/index.htm)  \n";
	private MachineDeTuring mere; // Fenêtre depuis laquelle celle d'aide a été ouverte
	
	public FenetreAPropos(MachineDeTuring mere) { // Création de la fenêtre de copyright
		super("A Propos"); // Titre de la fenêtre
		this.mere = mere; // Fenêtre depuis laquelle celle de copyright a été ouverte
		setLocation(mere.getLocation().x, mere.getLocation().y + mere.getHeight());  // Placer cette fenêtre sous celle depuis laquelle elle a été ouverte
		addWindowListener(new GestionFenetre()); // Action a faire quand on ferme la fenêtre
		getContentPane().setLayout(new BorderLayout()); // Placement dans la fenêtre 
		JTextPane texte = new JTextPane(); // Zone d'affichage du texte du copyright
		texte.setEditable(false); // Le texte du copyright n'est pas modifiable
		// Style pour le texte normal
		SimpleAttributeSet styleNormal = new SimpleAttributeSet();
		StyleConstants.setFontFamily(styleNormal, "Serif");
		StyleConstants.setFontSize(styleNormal, 18);
		// Style pour le titre
		SimpleAttributeSet styleTitre = new SimpleAttributeSet();
		StyleConstants.setFontFamily(styleTitre, "Serif");
		StyleConstants.setForeground(styleTitre, Color.BLUE);
		StyleConstants.setFontSize(styleTitre, 22);
		StyleConstants.setBold(styleTitre, true);
		// Style pour le texte lien
		SimpleAttributeSet styleLien = new SimpleAttributeSet();
		StyleConstants.setFontFamily(styleLien, "Serif");
		StyleConstants.setItalic(styleLien, true);
		StyleConstants.setFontSize(styleLien, 16);
		// Parties de texte centrées
		StyledDocument documentStyle = texte.getStyledDocument();
		SimpleAttributeSet texteCentre = new SimpleAttributeSet();
		StyleConstants.setAlignment(texteCentre, StyleConstants.ALIGN_CENTER);
		// Parties de texte justifiées
		SimpleAttributeSet texteJustifie = new SimpleAttributeSet();
		StyleConstants.setAlignment(texteJustifie, StyleConstants.ALIGN_JUSTIFIED);
		try {
			documentStyle.setParagraphAttributes(0, TITRE.length(), texteCentre, false);
			documentStyle.insertString(documentStyle.getLength(), TITRE, styleTitre); // Titre
			documentStyle.setParagraphAttributes(documentStyle.getLength(),MESSAGE.length() , texteJustifie, false);
			documentStyle.insertString(documentStyle.getLength(), MESSAGE, styleNormal); // corps
			documentStyle.insertString(documentStyle.getLength(), LIEN, styleLien); // lien image
		} 
		catch (BadLocationException e) { // En cas de problème on affiche simplement (sans styles)
 			texte.setFont(new Font("Times",Font.PLAIN,14)); // Le copyright est en police 14
 			texte.setText(TITRE+MESSAGE+LIEN); // Afficher le texte de copyright
		}
		
		
		//texte.setText(message);	// Afficher le texte du copyright
		getContentPane().add(texte, BorderLayout.CENTER); // Texte du copyright au centre de la fenêtre
		JLabel pied = new JLabel(" (C) M. Dalmau IUT de Bayonne Pays Basque", JLabel.LEFT); // Signature
		pied.setFont(new Font("Times",Font.PLAIN,10)); // La signature est écrite en petit 
		getContentPane().add(pied, BorderLayout.SOUTH);  // La signature est placée en bas
		pack();
		setVisible(true);
	}
	
	// Action associée à la fermeture de la fenêtre
	private class GestionFenetre extends WindowAdapter {
		@Override
		public synchronized void windowClosing(WindowEvent evt) {
			mere.aProposFermee();  // Indiquer au programme que le fenêtre n'est plus visible
		}
	}
}	

