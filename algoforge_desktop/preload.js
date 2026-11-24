// -*- coding: utf-8 -*-
/**
 * preload.js - Pont Natif Electron pour AlgoForge Pro
 * =====================================================
 * Expose les fonctionnalités d'une VRAIE application de bureau native :
 * - Boîtes de dialogue de fichiers Windows natives (Ouvrir, Enregistrer sous)
 * - Persistance automatique dans %APPDATA%/AlgoForgePro/
 * - Vérification réseau silencieuse sans erreur de console Chromium
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('algoNative', {
    isDesktopApp: true,
    platform: process.platform,

    // Boîte de dialogue native Windows pour Enregistrer un fichier .af ou .c
    saveFileDialog: (defaultName, content, filterType) => {
        return ipcRenderer.invoke('native-save-dialog', { defaultName, content, filterType });
    },

    // Boîte de dialogue native Windows pour Ouvrir un fichier .af
    openFileDialog: () => {
        return ipcRenderer.invoke('native-open-dialog');
    },

    // Sauvegarde persistance native sur disque dans %APPDATA%
    saveNotebookToDisk: (jsonData) => {
        return ipcRenderer.invoke('save-notebook-disk', jsonData);
    },

    // Chargement persistance native depuis %APPDATA%
    loadNotebookFromDisk: () => {
        return ipcRenderer.invoke('load-notebook-disk');
    },

    // Ping Cloud silencieux via Node (zéro trace ERR_CONNECTION_TIMED_OUT dans DevTools)
    quietPingCloud: (url) => {
        return ipcRenderer.invoke('quiet-ping-cloud', url);
    }
});
