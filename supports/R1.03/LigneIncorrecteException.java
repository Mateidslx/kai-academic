/*
 * @author Dalmau
 * 15/12/2018
 */

public class LigneIncorrecteException extends Exception {
	private static final long serialVersionUID = 64240040400000001L;
	public static final String LIGNE_INCORRECTE = "Texte de création d'une ligne de table incorrect";
	private String message = null;

	public LigneIncorrecteException() {
		super();
		this.message = LIGNE_INCORRECTE;
	}

	public LigneIncorrecteException(String message) {
		super(message);
		this.message = message;
	}

	@Override
	public String getMessage() {
		return this.message;
	}

}
