/*
 * @author Dalmau
 * 15/12/2018
 */

public class MoteurException extends Exception {
	private static final long serialVersionUID = 64240040400000001L;
	public static final String ERREUR_MACHINE = "Erreur dans la table des états de la machine";
	private String message = null;

	public MoteurException() {
		super();
		this.message = ERREUR_MACHINE;
	}

	public MoteurException(String message) {
		super(message);
		this.message = message;
	}

	@Override
	public String getMessage() {
		return this.message;
	}

}
