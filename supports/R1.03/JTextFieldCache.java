/*
 * @author Dalmau
 * 15/12/2018
 */
import javax.swing.JTextField;

// Héritage de JTextfield pour permettre d'afficher ou de ne pas afficher les setText
// Un JTextFieldCache est une zone d'affichage pas de saisie (non éditable)

public class JTextFieldCache extends JTextField {
	private static final long serialVersionUID = 1L;
	private String contenu; // copie du texte contenu dans le JTextField
	private boolean cache; // true si les écritures ne sont pas visibles
	
	public JTextFieldCache() {
		super();
		setEditable(false); // zone d'affichage pas de saisie
		contenu = new String("");
		setCache(false); // Initialement en mode non caché
	}
	
	public JTextFieldCache(String text) {
		super(text);
		setEditable(false); // zone d'affichage pas de saisie
		contenu = new String(text);
		setCache(false); // Initialement en mode non caché
	}
	
	public JTextFieldCache(int columns) {
		super(columns);
		setEditable(false); // zone d'affichage pas de saisie
		contenu = new String("");
		setCache(false); // Initialement en mode non caché
	}
	
	public JTextFieldCache(String text, int columns) {
		super(text, columns);
		setEditable(false); // zone d'affichage pas de saisie
		contenu = new String(text);
		setCache(false); // Initialement en mode non caché
	}

	public boolean isCache() { // Indique si te texte est caché
		return cache;
	}

	public void setCache(boolean cache) {
		this.cache = cache; // Gangement de mode : caché/non caché
	}
	
	@Override
	public String getText() {
		return contenu; // Renvoie la copie car le texte peut ne pas avoir été affiché
	}
	
	@Override
	public void setText(String t) {
		contenu = new String(t); // Copie du texte
		if (!cache) super.setText(t); // Visible si en mode non caché
	}

}
