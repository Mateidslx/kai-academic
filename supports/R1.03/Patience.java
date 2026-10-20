/*
 * @author Dalmau
 * 15/12/2018
 */

 // Thread d'animation de la barre de l'interface pour faire patienter l'utilisateur
public class Patience extends Thread { 
	private PostCorrespondance mere; // Fenêtre où se trouve le barre à animer
	private volatile boolean enMarche; // Le Thread d'animation de la barre est en marche (true) ou arrêté (false)
	
	// Création du Thread d'animation de la barre
	public Patience(PostCorrespondance mere) { 
		this.mere = mere;  // Fenêtre où se trouve le barre à animer
		enMarche = true; // Le Thread d'animation de la barre est en marche
		start(); // Lancer l'animation de la barre
	}
	
	// Arrêt de l'animation de la barre
	public void arret() { 
		mere.effaceProgressbar(); // Mettre la barre à vide
		enMarche = false; // Le Thread d'animation de la barre est arrêté
		interrupt(); // Pour sortir du "sleep" utilisé par le Thread (peu utile ici mais plus correct)
	}

	// Boucle d'animation de la barre
	public void run() { 
		while (enMarche) { // On anime la barre tant que le thread n'est pas arrêté
			try { 
				sleep(100);  // Délai d'animation (0,1s)
				mere.bougeProgressBar(2); // Bouger la barre dans un sens puis dans l'autre
			}
			catch(InterruptedException ie) { } // Arrêt du Thread
		}
	}
}
