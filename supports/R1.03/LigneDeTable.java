/*
 * @author Dalmau
 * 15/12/2018
 */
import java.util.StringTokenizer;

/*
  Une Ligne de table correspond à la description d'une étape de l'automate :
    - Etat actuel de la machine
    - Caractère lu par la tête
    - Etat suivant
    - Caractère à écrire sur la bande
    - Déplacement de la bande ou arrêt de la machine
  Les 3 derniers éléments sont regroupés dans un conteneur ActionAFaire
*/

public class LigneDeTable {
	public static final String DROITE = "D"; // Dans le fichier D ou d indique un déplacement à droite
	public static final String GAUCHE = "G"; // Dans le fichier G ou g indique un déplacement à gauche
	public static final String ARRET = "A"; // Dans le fichier A ou a indique l'arrêt de la machine

	private String etatActuel, caractereLu; // état actuel de la machine et caractère lu par la tête
	private ActionAFaire actionAFaire; // Action à faire dans ce cas = état suivant, caractère à écrire et déplacement ou arrêt
	
	// Crée une ligne de table d'état à partir de : état actuel, car lu, action à faire = état suivant, car écrit, déplacement
	public LigneDeTable(String ea, String cl, ActionAFaire aaf) throws LigneIncorrecteException {
		if (aaf == null) throw new LigneIncorrecteException();
		else {
			etatActuel = new String(ea);
			caractereLu = new String(cl);
			actionAFaire = new ActionAFaire(aaf.getEtatSuivant(), aaf.getCaractereEcrit(), aaf.getAction());
		}
	}
	
	// Crée une ligne de table d'état à partir d'une ligne lue dans un fichier texte
	// Lève une exception si la ligne du fichier est incorrecte : pas assez d'éléments ou caractère lu ou écrit trop long
	// ou si l'action à faire n'est ni D ni G ni A ou (d, g, a)
	public LigneDeTable(String ligne) throws LigneIncorrecteException {
		StringTokenizer decoupe = new StringTokenizer (ligne); // Pour analyse de la ligne de fichier
		String etatAct = "", carLu = "", etatSuiv = "", carEcrit = "", action = ""; // Les 5 champs d'une ligne
		int complet = 0; // Compte le nombre de champs récupérés (il en faut 5)
		int i = 0; // Index de récupération des éléments de la ligne
		while (decoupe.hasMoreTokens()) { // Tnat qu'on n'a pas récupéré tous les éléments de la ligne 
			String champ = decoupe.nextToken();
			switch(i) {
			case 0 : // etat actuel
				etatAct = champ; 
				complet++; // Un de plus champ obtenu
				break;
			case 1 : // caractère lu
				if (champ.length() == 1) { // doit être 1 seul caractère
					carLu = champ; 
					complet++; // Un de plus champ obtenu
				}
				break;
			case 2 : // état suivant
				etatSuiv = champ; 
				complet++;
				break;
			case 3 : // caractère écrit
				if (champ.length() == 1) { // doit être 1 seul caractère
					carEcrit = champ; 
					complet++; // Un de plus champ obtenu
				}
				break;
			case 4 : // Déplacement bande ou arrêt
				if (champ.toUpperCase().equals(DROITE) || 
					champ.toUpperCase().equals(GAUCHE) ||
					champ.toUpperCase().equals(ARRET) ) {
					action = champ; 
					complet++; // Un de plus champ obtenu
				}
				break;
			default : // commentaires possibles en fin de ligne => ignorés
				break;
			}
			i++; // passer à l'élément suivant de la ligne
		}
		if (complet == 5) { // On a eu les 5 éléments de la ligne de table d'états
			etatActuel = new String(etatAct);
			caractereLu = new String(carLu);
			actionAFaire = new ActionAFaire(etatSuiv, carEcrit, action);
		}
		else throw new LigneIncorrecteException(); // Texte de création d'une ligne de table incorrect
	}
	
	// Méthodes de récupération du contenu de la ligne de table d'état
	public ActionAFaire getSuite() { return actionAFaire; }
	public String getEtatActuel() { return etatActuel; }
	public String getCaractereLu() { return caractereLu; }
	public String getEtatSuivant() { return actionAFaire.getEtatSuivant(); }
	public String getCaractereEcrit() { return actionAFaire.getCaractereEcrit(); }
	public String getAction() { return actionAFaire.getAction(); }
}
