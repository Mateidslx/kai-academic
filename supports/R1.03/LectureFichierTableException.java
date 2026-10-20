/*
 * @author Dalmau
 * 15/12/2018
 */

public class LectureFichierTableException extends Exception {
	private static final long serialVersionUID = 64240040400000001L;
	public static final String ERREUR_LECTURE = "Erreur de lecture du fichier de table d'états";
	private String message = null;

	public LectureFichierTableException() {
		super();
		this.message = ERREUR_LECTURE;
	}

	public LectureFichierTableException(String message) {
		super(message);
		this.message = message;
	}

	@Override
	public String getMessage() {
		return this.message;
	}

}
