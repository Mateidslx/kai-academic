/*
 * @author Dalmau
 * 15/12/2018
 */

/*
   Classe dont héritent les threads dont on doit attendre la terminaison.
   C'est, en particulier, le cas de ceux lancés par swing pour modifier l'interface. 
   Ils ont une méthode pour en attendre la fin et une méthode pour en signaler la fin
   ces méthodes sont des méthodes avec sémaphore (synchronized)
*/

public abstract class ThreadSynchrone extends Thread { // Classe abstraite
	protected volatile boolean fini; // Passe à true quand le thread se termine
	
	public ThreadSynchrone() {
		fini = false; // Le thread n'est pas terminé
	}
	
	@Override
	public void run() {
		tache(); // Méthode équivalente au run pour ces threads
		signalerFin(); // Débloquer les threads qui attendent la terminaison
	}
	
	// Le thread appelant se bloque jusqu'à la fin du thread
	public synchronized void attendreFin() {
		try { 
			while (!fini) { // Tant que le thread n'est pas terminé
				wait(); // Blocage sur sémaphore jusqu'à la fin du thread
			}
		} 
		catch (InterruptedException e) {} 
	}
	
	// Débloquer le thread qui attend la fin
	protected synchronized void signalerFin() {
		fini = true; // Le thread est termine
		notify(); // Débloquer le thread en attente de terminaison sur sémaphore
	}
	
	// Méthode équivalente au run pour ces threads
	public abstract void tache(); // A définir
}

