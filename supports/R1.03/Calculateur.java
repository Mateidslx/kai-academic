/*
 * @author Dalmau
 * 15/12/2018
 */

 // Interface commune aux 2 Threads de recherche : combinatoire et récursif
public interface Calculateur {
	public void lancer(); // Lancement de la recherche 
	public void arret(); // Arrêt de la recherche
	public void ajoutGroupe1(String mot); // Ajout d'un mot au groupe 1
	public void ajoutGroupe2(String mot);// Ajout d'un mot au groupe 2
}
