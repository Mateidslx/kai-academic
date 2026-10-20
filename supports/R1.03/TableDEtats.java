/*
 * @author Dalmau
 * 15/12/2018
 */
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.Vector;

/*
  La table complète des états de la machine.
  Cette table est accessible par une 1ere clé qui est l'état actuel de la machine
  Puis une seconde clé qui le caractère lu par la tête.
  On y récupère l'action à faire = état suivant, car écrit, déplacement
 */

public class TableDEtats {
	private HashMap<String, HashMap<String, ActionAFaire>> tableDeTransition; // Table de transition
	private Vector<String> clesEnOrdre; // Pour conserver l'ordre du fichier (entrySet de Hashmap donne  
									// un ordre de clés ne correspondant pas à celui auquel elles ont été ajoutées)
	private int tailleTable; // Nombre de lignes de la table de transition
	
	// Crée une table d'états vide
	public TableDEtats() {
		tableDeTransition = new HashMap<String, HashMap<String, ActionAFaire>>();
		tailleTable = 0; // Table initialement vide
		clesEnOrdre = new Vector<String>(); // Pas de clés
	}
	
	// Crée la table d'états à partir d'un fichier
	// Exception si : ligne incorrecte ou ligne dupliquée ou fichier introuvable ou fichier illisible
	public TableDEtats(File fich) throws LectureFichierTableException {
		this(); // Construction vide
		int cptLigne = 0; // Compte des lignes du fichier
		try {
			// Flux pour lire le fichier ligne par ligne
			BufferedReader lecteur = new BufferedReader(new InputStreamReader(new FileInputStream(fich)));
			String ligne; // Ligne lue dans le fichier
			while ((ligne = lecteur.readLine()) != null) { // Tant qu'on n'est pas à la fin du fichier
				cptLigne++; // Une ligne de plus lue
				if ((ligne.length () != 0 )&& (!ligne.trim().startsWith ("//"))) { // Saute les lignes vides et les commentaires
					try {
						LigneDeTable lt = new LigneDeTable(ligne); // Exception si ligne incorrecte
						ajouteLigne(lt); // Exception si ligne dupliquée
					}
					catch(LigneIncorrecteException ile) { // Le contenu du fichier n'est pas correct
						lecteur.close(); // Fermer le fichier
						throw new LectureFichierTableException(ile.getMessage()+ " à la ligne : "+cptLigne); // Lever une exception
					}
					catch(LectureFichierTableException ile) { // Le contenu du fichier n'est pas correct
						lecteur.close(); // Fermer le fichier
						throw new LectureFichierTableException(ile.getMessage()+ " à la ligne : "+cptLigne); // Lever une exception
					}
				}
			}
			lecteur.close(); // C'est fini => fermer le fichier
		} 
		catch (FileNotFoundException e) { // Exception si fichier introuvable
			throw new LectureFichierTableException("Fichier de table d'états : "+fich.getName()+" inaccessible"); // Lever une exception
		}
		catch (IOException e) { // Exception si fichier illisible
			throw new LectureFichierTableException("Fichier de table d'états : "+fich.getName()+" illisible"); // Lever une exception
		}
	}
	
	// Ajoute une ligne à la table d'état, Exception si ligne dupliquée
	private void ajouteLigne(LigneDeTable ligne) throws LectureFichierTableException {
		if (tableDeTransition.get(ligne.getEtatActuel()) != null) { // l'état initial existe
			HashMap<String, ActionAFaire> entree = tableDeTransition.get(ligne.getEtatActuel()); // Entrée liée à l'état actuel
			if (entree.get(ligne.getCaractereLu()) != null) { // le car lu par la tête est déjà prévu pour cet état
				throw new LectureFichierTableException("Ligne dupliquée état = "+ligne.getEtatActuel()+ ", caractère lu = "+ligne.getCaractereLu());
			}
			else { // // l'état initial existe on ajoute le car lu et l'action à faire
				entree.put(ligne.getCaractereLu(), ligne.getSuite());
				tailleTable++; // Une ligne de plus dans la table
			}
		}
		else {  // l'état initial n'existe pas encore
			clesEnOrdre.addElement(ligne.getEtatActuel()); // On mémorise cette nouvelle clé
			HashMap<String, ActionAFaire> entree = new HashMap<String, ActionAFaire>(); 
			entree.put(ligne.getCaractereLu(), ligne.getSuite()); // On y met l'action à faire pour ce caractère lu
			tableDeTransition.put(ligne.getEtatActuel(), entree);// On Ajoute ça à la table
			tailleTable++; // Une ligne de plus dans la table
		}
	}
	
	// Renvoie le nombre de lignes de la table d'états
	public int getTaille() { return tailleTable; }
	
	// Renvoie le contenu complet de la table ligne par ligne dans un Vector
	public Vector<LigneDeTable> getContenu() throws LigneIncorrecteException {
		Vector<LigneDeTable> contenu = new Vector<LigneDeTable>(); // Vector à constituer
		for (int i = 0; i<clesEnOrdre.size(); i++) { // Passer en revue toutes les clés mémorisées
			String cleEtatActuel = clesEnOrdre.elementAt(i); // Clé courante
			HashMap<String, ActionAFaire> tabEtatActuel = tableDeTransition.get(cleEtatActuel); // Hashmap associé à cette clé
			for (Entry<String, ActionAFaire> entreeSecondaire : tabEtatActuel.entrySet()) { // Parcourir ce HashMap
				String cleCaractereLu = entreeSecondaire.getKey(); // Caractère lu par la tête
				contenu.add(new LigneDeTable(cleEtatActuel, cleCaractereLu, entreeSecondaire.getValue())); // Ajiuter ça au Vector
			}
		}
		return contenu; // Renvoyer le Vector contenant toute la table
	}
	
	// Renvoie l'état initial de la machine càd le 1er état désigné dans le fichier
	public String getEtatInitial() throws MoteurException {
		if (clesEnOrdre.isEmpty()) throw new MoteurException("Pas d'état initial défini dans la table");
		return clesEnOrdre.firstElement(); 
	}
	
	// Renvoie l'action à faire pour l'état actuel et un caractère lu ou null s'il n'y en a pas
	public ActionAFaire getActionAFaire(String etatAct, String carLu) throws MoteurException {
		if (tableDeTransition.get(etatAct) == null) throw new MoteurException("L'état \""+etatAct+"\" n'est pas défini dans la table");
		if (tableDeTransition.get(etatAct).get(carLu) == null)
			throw new MoteurException("La ligne correspondant à l'état \""+etatAct+"\" pour le caractère \""+carLu+"\" n'est pas définie dans la table");
		else return tableDeTransition.get(etatAct).get(carLu);
	}
	
}
