/*
 * @author Dalmau
 * 15/12/2018
 */

/*
  Une action à faire corresponda à :
  - Un état suivant
  - Le caractère à écrire sur la bande
  - Le déplacement de la bande ou l'arrêt de la machine
  Cette classe est un simple conteneur pour ces 3 informations avec des méthodes get
 */
public class ActionAFaire {
	private String etatSuivant, caractereEcrit, deplacement;
	
	// Création avec contenu (classique pour un conteneur)
	public ActionAFaire(String es, String ce, String ac) {
		etatSuivant = new String(es);
		caractereEcrit = new String(ce);
		deplacement = new String(ac);
	}

	// Méthodes de récupération du contenu (classique pour un conteneur)
	public String getEtatSuivant() { return etatSuivant; }
	public String getCaractereEcrit() { return caractereEcrit; }
	public String getAction() { return deplacement; }

}
