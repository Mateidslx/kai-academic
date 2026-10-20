/*
 * @author Dalmau
 * 15/12/2018
 */

import java.io.File;
import javax.swing.filechooser.FileFilter;

// Filtre pour le choix de fichier à ouvrir limité à une extension
public class FiltreParExtension extends FileFilter {
	String extension; // Extension du fichier
	
	public FiltreParExtension(String ext) {
		extension = ext; // Extension du fichier
	}
	
	@Override
	public boolean accept(File f) { // Renvoie true si accepté => proposé par le FileChooser
		if (f.isDirectory()) return true; // Les répertoires sont acceptés (pour pouvoir naviguer)
		String ext = null;
		String s = f.getName(); // Nom du fichier choisi
		int i = s.lastIndexOf('.'); // Position de l'extension du fichier
		if ((i>0) && (i<s.length()-1)) ext = s.substring(i+1).toLowerCase(); // extension en minuscule
		if (ext != null) { // Si le fichier a une extension
			return ext.equals(extension); // Si c'est la bonne il est accepté
		}
		return false; // Si le fichier n'a pas d'extension il est refusé
	}
	
	@Override
	public String getDescription() {
    	return "Table d'états"; // Message affiché en bas du FileChooser
	}
}

