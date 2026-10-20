/*
 * @author Dalmau
 * 15/12/2018
 */

 import java.math.BigDecimal;
import java.util.Vector;
import javax.swing.JTextArea;

/*
   Recherche de solution au problème de correspondance de Post
   La méthode de recherche est récursive.
   La recherche est faite par un Thread.
   
   Cette méthode ne garantit pas de trouver la solution la plus courte (elle peut trouver une solution exacte mais trop longue)
   Il est préférable pour aller plus vite de la limiter en profondeur au plus près de la longueur de la solution (si on la connait)
   pour éviter qu'elle ne teste des longueurs inutilement grandes et qu'elle ne trouve des solutions trop longues.
*/

class Calculabilite extends Thread  implements Calculateur {
	// "profondeurMax" définit la profondeur maximale de récursivité, càd le nombre max de mots à concatener.
	// Quand le programme ne donne pas de solution ce peut être parce qu'il n'y en a pas 
	//  ou que l'on a choisi profondeurMax trop petit.
	private int profondeurMax; // Longueur maximale des suites testées
	private int tailleGroupes; // Nombre de mots des groupes
	private int table[]; // Table d'indices testés
	String motA, motB; // Mots constitués à chaque essai
	BigDecimal compte_essais; // Compte le nombre d'essais faits
	private volatile boolean enMarche; // Pour arrêter la recherche
	private boolean abandon; // Indique que la recherche a été volontairement arrêtée ou terminée
	private JTextArea ecran; // Zone d(affichage des résultats
	private PostCorrespondance mere; // Fenêtre où afficher les résultats 
	private Patience patience; // Thread d'animation de la barre de progression pour indiquer que le calcul est en cours
	private Vector<String> langA, langB; // Les 2 groupes de mots
	
	// Création d'un Thread de recherche
	public Calculabilite(int nbrMots, int profondeur, PostCorrespondance m) { 
		tailleGroupes = nbrMots; // Nombre de mots dans chaque groupe de mots
		profondeurMax = profondeur; // Longueur maximale de la suite de rangs à tester
		mere = m; // Fenêtre d'interface ayant lancé cette recherche
		ecran = m.getResultat(); // Zone où l'on affichera les résultats
		table = new int[profondeurMax+1]; // Suite de rangs en test
		for (int i = 0; i <= profondeurMax; i++) table[i] = 0; // Mise à 0 de la table de rangs
		compte_essais = new BigDecimal(0); // Compte d'essais = 0 au démarrage
		langA = new Vector<String>(); // 1er groupe de mots (pour l'instant vide)
		langB = new Vector<String>(); // 2ème groupe de mots (pour l'instant vide)
		patience = null; // La barre n'est pas encore animée
	}
	
	// Démarrage de la recherche
	@Override
	public void lancer() { 
		patience = new Patience(mere); // Lancement de l'animation de la barre
		start(); // Lancement de la recherche en parallèle
	}
	
	// Ajouter un mot au groupe 1
	@Override
	public void ajoutGroupe1(String mot) { 
		langA.addElement(mot);
	}
	
	// Ajouter un mot au groupe 2
	@Override
	public void ajoutGroupe2(String mot) { 
		langB.addElement(mot);
	}
	
	// Exécution de la recherche 
	public void run() { 
		ecran.setText(""); // Effacer la zone d'affichage des résulats
		abandon = false; // La recherche n'est ni terminée ni abandonnée
		enMarche = true; // La recherche est en cours
		cherche(1, table); // Lancement de la recherche récursive
		if (patience != null) patience.arret(); // Si labarre est animée arrêter cette animation
		if (!abandon) { // La recherche s'est terminée sans trouver de solution
			ecran.append("  -----------------------  \n");
			ecran.append("  Pas de solution trouvée  \n");
			ecran.append("  -----------------------  \n");
			ecran.append("  Malgré "+compte_essais.toString()+" suite(s) essayée(s)\n\n");
			ecran.append("  La recherche était limitée à des suites de rangs de longueur " + profondeurMax + "  \n");
		}
		mere.initBoutons(); // Réinitialiser les boutons de l'interface pour permettre une nouvelle recherche
	}
	
	// Arrêt volontaire de la recherche
	@Override
	public void arret() {  
		enMarche = false; // La recherche n'est plus en cours
		if (patience != null) patience.arret(); // Si la barre est animée arrêter cette animation
	}
	
	// Teste si une chaine est incluse dans l'autre
	private boolean match(String a, String b) { 
		if (a.length() < b.length()) return b.startsWith(a); // a est plus courte que b mais est-elle incluse dans b ?
		else return a.startsWith(b); // b est plus courte ou de même longueur que a mais est-elle incluse ou égale à a ?
	}
	
	// Recherche récursive de solution, renvoie true si elle trouve la solution
	private boolean cherche(int n, int[] tab) {
		// Pour rendre le problème programmable il faut se donner une profondeur max
		if (!enMarche) { // Recherche arrêtée : abandon de la recherche
			if (!abandon) { // La recherche a été arrêtée par le bouton d'abandon
				ecran.append("  -----------------------  \n");
				ecran.append("  Abandon de la recherche  \n");
				ecran.append("  -----------------------  \n");
				ecran.append("  Après "+compte_essais.toString()+" suite(s) essayée(s)  \n");
			}
			abandon = true; // Arrêt volontaire
		 	return false; // On arrête la recherche récursive sur un pseudo échec 
		}
		if (n >= profondeurMax) { // La suite actuellement testée a atteint N rangs => il faut revenir en arrière si possible
			return false; // On arrete la recherche récursive sur un pseudo échec dû à la longueur max testée
		}
		ecran.setText("profondeur = "+n+"\n"); // Trace de la profondeur de recherche actuelle
		boolean fini = false; // Sortie de récursion quand tous les indices ont été testés au rang n
		int copie[] = new int[profondeurMax+1]; // Copie de la table de rangs pour récursivité
		while (!fini) { // on n'a pas essayé tous les rangs possibles pour le dernier rang
			for (int i = 0; i <= profondeurMax; i++) copie[i]=tab[i]; // Sauvegarder la table de rangs
			motA = ""; motB = ""; // Constituer les mots correspondant à la table de rangs actuelle
			for (int i = 0; i < n; i++){  // Ajouter un rang de la table aux 2 mots
				motA = motA+langA.elementAt(copie[i]);
				motB = motB+langB.elementAt(copie[i]);
			}
			compte_essais = compte_essais.add(BigDecimal.ONE); // Compter un essai supplémentaire
			if(motA.equals(motB)) { // On a trouvé la solution 
				solutionTrouvee(copie, n); // On affiche que l'on a trouvé la solution
	            return true; // Terminer en indiquant que la solution a été trouvée
			}
			if (match(motA, motB)) { // Le début des mots obtenus correspond 
				// Un rang de plus peut terminer la recherche ou pas
				boolean trouve = false; // On suppose ne pas trouver
				int essai = 0; // Rang du mot ajouter pour tester
				while ((essai<tailleGroupes) && (!trouve)) { // On essaie d'ajouter juste un mot d'un rang à chacun
					compte_essais = compte_essais.add(BigDecimal.ONE); // Compte de suites essayées
					if ((motA + langA.elementAt(essai)).equals(motB + langB.elementAt(essai))) trouve = true; // C'est bon !
					else essai++; // Ce n'est pas bon => essayer le rang suivant
				}
				if (trouve) { // En ajoutant un rang c'est fini
					motA = motA+langA.elementAt(essai); // Le mot final est donc celui-ci
					copie[n] = essai; // Le rang ajouté est "essai"
					solutionTrouvee(copie, n+1); // On a trouvé la solution
		            return true; // Terminer en indiquant que la solution a été trouvée
				}
				else { // Si un rang de plus ne termine pas la recherche, on peut essayer de repartir avec une suite plus longue de 1
					copie[n] = 0; // on commence la recherche récursive au rang n+1 avec l'indice 0
					if (cherche(n+1, copie)) return true; // Si on a trouvé à la longueur suivante on s'arrete sur un succes
				}
			}
			for (int i = 0; i <= profondeurMax; i++) tab[i]=copie[i]; // Reprendre la table de rangs telle qu'elle a été sauvegardée
			if (tab[n-1] < tailleGroupes-1) { // Si on n'a pas essayé tous les rangs possibles à la longueur n
				tab[n-1]++; // Essayer avec le rang suivant au rang n
			}
			else { // Si on a essayé tous les rangs possibles à la longueur n
				fini = true; // On sort sans avoir trouvé de solution pour cette longueur
			}
		}
		return false; // Terminaison sans solution
	}
	
	private void solutionTrouvee(int copie[], int n) { // Afficher la solution trouvée
		ecran.append("  ----------------------------------  \n");
		ecran.append("  Solution trouvee avec n="+n+"   \n");
		ecran.append("  ----------------------------------  \n");
		ecran.append("  Après "+compte_essais.toString()+" suite(s) essayée(s)\n\n"); // afficher le nombre d'essais faits
		ecran.append("  Mot obtenu = "+ motA+"  \n"); // afficher les mots obtenus	
        ecran.append("  Ordre des rangs : "); // afficher l'ordre de choix des mots concaténés
	    for (int i = 0; i < n-1; i++) ecran.append((copie[i] + 1)+",");
	    ecran.append((copie[n-1] + 1)+"  \n\n");
	    abandon = true; // On arrête la recherche
		
	}
	
}
