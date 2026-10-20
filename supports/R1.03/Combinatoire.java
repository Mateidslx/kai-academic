/*
 * @author Dalmau
 * 15/12/2018
 */

 import java.util.Vector;
import javax.swing.JTextArea;
import java.math.BigDecimal;

/*
   Recherche de solution au problème de correspondance de Post par méthode combinatoire :
   On essaye toutes les suites de taille 1 puis 2 ...
   En ne conservant que celles dont le début est une solution possible càd où un mot est contenu dans l'autre
   Et en éliminant celles qui n'ont aucune chance d'aboutir parce qu'un mot est trop court
   et que même en choisissant les rangs permettant de l'allonger plus que l'autre ça ne suffira pas
   avec le nombre de rangs restants (ça ne marche que parce qu'on limite la taille de la suite).
   Le temps de recherche augmente si on choisit une taille limite trop grande car peu de suites seront éliminées.
   La recherche est faite par un Thread.
*/
class Combinatoire extends Thread implements Calculateur {
	// "profondeurMax" définit la profondeur maximale de récursivité, càd le nombre max de mots à concatener.
	// Quand le programme ne donne pas de solution ce peut être parce qu'il n'y en a pas 
	//  ou que l'on a choisi profondeurMax trop petit.
	private int profondeurMax; // Longueur maximale des suites testées
	private int tailleGroupes; // Nombre de mots des groupes
	private Vector<int[]> liste, nouvelleListe; // Liste de mots corrects jusque là de taille n et liste des mots possibles de taille n+1 
	private Vector<String> langA, langB; // Les 2 groupes de mots
	private int gainA, gainB; // Augmentation de taille du mot du 1er groupe resp. du 2ème groupe par ajout d'un rang
	//private int elimine; // Compte les suites éliminées parce que ne pouvant pas aboutir à la solution
	BigDecimal compte_essais; // Compte le nombre d'essais faits
	private volatile boolean enMarche; // Pour arrêter la recherche
	private int abandon; // 0 = trouvé, 1 = pas de solution, 2 = abandon
	private JTextArea ecran; // Zone d(affichage des résultats
	private PostCorrespondance mere; // Fenêtre où afficher les résultats 
	private Patience patience; // Thread d'animation de la barre de progression pour indiquer que le calcul est en cours
	
	public Combinatoire(int nbrMots, int profondeur, PostCorrespondance m) { 
		tailleGroupes = nbrMots; // Nombre de mots des groupes
		profondeurMax = profondeur; // Longueur maximale des suites testées
		mere = m; // Fenêtre d'interface ayant lancé cette recherche
		ecran = m.getResultat(); // Zone où l'on affichera les résultats
		compte_essais = new BigDecimal(0); // Compte d'essais = 0 au démarrage
		patience = null; // La barre n'est pas encore animée
		langA = new Vector<String>(); // 1er groupe de mots
		langB = new Vector<String>(); // 2ème groupe de mots
		liste = new Vector<int[]>(); // Suite de rangs testée
		liste.addElement(new int[0]); // On part d'une seule suite de rangs vide
	}
	
	// Démarrage de la recherche
	@Override
	public void lancer() { 
		patience = new Patience(mere); // Lancement de l'animation de la barre
		start(); // Lancement de la recherche en parallèle
	}
	
	// Arrêt volontaire de la recherche
	@Override
	public void arret() {  
		enMarche = false; // La recherche n'est plus en cours
		abandon = 2; // Arrêt par le bouton de l'interface
	}

	@Override
	public void ajoutGroupe1(String mot) { // Ajouter un mot au groupe 1
		langA.addElement(mot);
	}
	
	@Override
	public void ajoutGroupe2(String mot) { // Ajouter un mot au groupe 2
		langB.addElement(mot);
	}
	
	// Crée un mot à partir de la suite de rangs donnée et du groupe de mots donné
	private String creerMot(int[] t, Vector<String> l) {
		String ret="";
		for(int i = 0; i < t.length; i++) ret = ret + l.elementAt(t[i]);
		return ret;
	}
	
	// Recherche de solution : tente les suites de longueur de + en + grandes
	// S'arrête si on a la solution ou s'il n'y en a pas ou si on atteint la longueur max donnée
	public void run() {
		ecran.setText(""); // Effacer la zone d'affichage des résulatts
		abandon = 1; // A priori on suppose ne pas trouver de solution (pourqoi pas ?)
		enMarche = true; // La recherche est en cours
		gainA = 0; gainB = 0;  // Gain maximal possible de taille par ajout d'un rang pour chaque groupe
		for (int i = 0; i < langA.size(); i++) { // Parcourir les mots des groupes pour calculer le gain max de longueur possible par mot
			int diff = langA.elementAt(i).length() - langB.elementAt(i).length(); // Différence de taille des mots au rang i
			if (diff > gainA) gainA = diff; // Max de gain de taille par le rang i pour le mot A
			if (-diff > gainB) gainB = -diff; // Max de gain de taille par le rang i pour le mot B
		}
		while (enMarche && (liste.firstElement().length < profondeurMax)) { // Tant que l'on n'a pas atteint la longueur max donnée
			ecran.setText("Taille : " + (liste.firstElement().length+1) + " , "+liste.size() + " combinaisons à tester\n");
			//if (elimine > 0) ecran.append("Dont "+elimine+" suites élimineés");
			if (cherche()) { // Si on a la solution ou s'il n'y en a pas c'est fini, sinon on essaye un rang de plus
				enMarche = false; // Arrêt de la recherche soit par le bouton, soit parce qu'il n' y a pas de solution, soit parce qu'on a trouvé
			}
		}
		if (patience != null) patience.arret(); // Si la barre est animée arrêter cette animation
		if (abandon == 1) { // Si la recherche s'est terminée sans trouver de solution
			ecran.append("  -----------------------  \n");
			ecran.append("  Pas de solution trouvée  \n");
			ecran.append("  -----------------------  \n");
			ecran.append("  Malgré "+compte_essais.toString()+" suite(s) essayée(s)\n\n");
			ecran.append("  La recherche était limitée à des suites de rangs de longueur " + profondeurMax + "  \n");
		}
		else {
			if (abandon == 2) { // Si la recherche a été abandonnée par le bouton d'arrêt
				ecran.append("  -----------------------  \n");
				ecran.append("  Abandon de la recherche  \n");
				ecran.append("  -----------------------  \n");
				ecran.append("  Après "+compte_essais.toString()+" suite(s) essayée(s)  \n");
			}
			// Quand abandon = 0 c'est qu'on a trouvé et l'affichage a été fait dans la méthode "cherche"
		}
		mere.initBoutons(); // Réinitialiser les boutons de l'interface pour permettre une nouvelle recherche
	}
	
	private boolean cherche() { // Test les mots de taille n, renvoie false si on peut encore essayer à la longueur n+1
		nouvelleListe = new Vector<int[]>(); // Liste des suites conservées car pouvant donner une solution
		//elimine = 0;
		while (!liste.isEmpty()) { // On essaye 1 à 1 les listes de suites conservées
			if (!enMarche) { // Recherche arrêtée : abandon de la recherche
			 	return true; // On arrête la recherche récursive sur un pseudo échec 
			}
			int[] actuel = liste.firstElement(); // Suite de rangs à tester
			String mot1 = creerMot(actuel, langA); // 1er mot obtenu
			String mot2 = creerMot(actuel, langB); // 2ème mot obtenu
			for (int j = 0; j < tailleGroupes; j++) { // On leur ajoute 1 à 1 tous les rangs possibles
				String motA = mot1 + langA.elementAt(j); // 1er mot + rang testé
				String motB = mot2 + langB.elementAt(j); // 2ème mot + rang testé
				int ecart, distance; boolean debut;
				if (motA.length() < motB.length()) { // Le motA est plus court que le motB
					distance = motB.length()- motA.length(); // Ecart de longueur entre le motA et le motB
					ecart = gainA; // Gain maximal possible par ajout de rang au motA
					debut = motB.startsWith(motA); // Le motA est-il inclus dans le motB ?
				}
				else {  // Le motB est plus court que le motA
					distance = motA.length()- motB.length();  // Ecart de longueur entre le motB et le motA
					ecart = gainB;  // Gain maximal possible par ajout de rang au motB
					debut = motA.startsWith(motB);  // Le motB est-il inclus dans le motA ?
				}
				// "possible" est true si le mot le plus court peut rattraper l'autre par ajout des rangs manquants 
				boolean possible = (((profondeurMax - actuel.length-1) * ecart) >= distance);
				//if (!possible) elimine++; // Si le mot le plus court ne peut plus rattraper l'autre la suite est éliminée
				if (possible && debut) { // L'un des mots est égal à l'autre  ou contenu dans l'autre et le rattrapage est encore possible
					int plus[] = new int[actuel.length + 1]; // Conserver la suite de rangs correspondante
					System.arraycopy(actuel, 0, plus, 0, actuel.length); // Copie de la suite initiale
					plus[actuel.length] = j; // à laquelle on ajoute le rang testé
					nouvelleListe.add(plus); // Mémoriser cette suite comme pouvant donner une solution
					compte_essais = compte_essais.add(BigDecimal.ONE); // Compter un essai supplémentaire
					if (motA.equals(motB)) { // Si on a trouvé la solution
						ecran.append("  ----------------------------------  \n");
						ecran.append("  Solution trouvee avec n="+plus.length+"   \n");
						ecran.append("  ----------------------------------  \n");
						ecran.append("  Après "+compte_essais.toString()+" suite(s) essayée(s)\n\n"); // Afficher le nombre d'essais faits
						ecran.append("  Mot obtenu = "+ motA+"  \n"); // Afficher les mots obtenus	
				        ecran.append("  Ordre des rangs : "); // Afficher l'ordre de choix des mots concaténés
					    for (int i = 0; i < plus.length-1; i++) ecran.append((plus[i] + 1)+",");
					    ecran.append((plus[plus.length-1] + 1)+"  \n\n");
					    abandon = 0; // On arrête la recherche car on a trouvé
						return true; // On a trouvé => c'est fini
					}
				}
			}
			liste.removeElementAt(0); // Enlever le début de mot correct testé
		}
		if (!nouvelleListe.isEmpty()) { // S'il reste des mots à tester
			liste = new Vector<int[]>(nouvelleListe); // On recommence avec la liste de suites pouvant donner une solution
			return false; // On n'a pas encore fini mais il y a encore de l'espoir
		}
		else {  // S'il ne reste plus de mots à tester
			abandon = 1;
			return true; // Pas de solution => c'est fini
		}
	}
}