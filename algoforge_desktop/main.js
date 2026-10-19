// -*- coding: utf-8 -*-
/**
 * main.js - Processus Principal Electron pour AlgoForge Pro
 * ==========================================================
 * Véritable application de bureau native Windows (IUT R1.01).
 * Gère le stockage sécurisé dans %APPDATA%, les boîtes de dialogue
 * de fichiers natives, les raccourcis OS et les menus d'application.
 */

const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');

let mainWindow = null;

// Dossier de données utilisateur dans %APPDATA%/AlgoForgePro
const userDataDir = path.join(app.getPath('appData'), 'AlgoForgePro');
if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
}
const notebookStorePath = path.join(userDataDir, 'notebook.json');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1360,
        height: 900,
        minWidth: 980,
        minHeight: 640,
        title: "AlgoForge Pro — Studio d'Algorithmique & Carnet de TD (IUT R1.01)",
        backgroundColor: '#eef3f7',
        autoHideMenuBar: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false
        }
    });

    const menuTemplate = [
        {
            label: 'Fichier',
            submenu: [
                {
                    label: 'Nouvel exercice de TD',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.__algoTriggerNewPage?.();');
                    }
                },
                {
                    label: 'Ouvrir un exercice (.af)...',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.__algoTriggerOpenFile?.();');
                    }
                },
                {
                    label: 'Enregistrer (.af)',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.__algoTriggerSaveFile?.();');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exporter le Code C (Allman)',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('document.getElementById("m-export-c")?.click();');
                    }
                },
                {
                    label: 'Exporter en image vectorielle SVG',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('document.getElementById("m-export-svg")?.click();');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Quitter',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'Édition',
            submenu: [
                {
                    label: 'Annuler',
                    accelerator: 'CmdOrCtrl+Z',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('document.getElementById("btn-dock-undo")?.click();');
                    }
                },
                {
                    label: 'Rétablir',
                    accelerator: 'CmdOrCtrl+Y',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('document.getElementById("btn-dock-redo")?.click();');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Réorganiser automatiquement l\'arbre',
                    accelerator: 'CmdOrCtrl+L',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('document.getElementById("btn-top-autolayout")?.click();');
                    }
                },
                {
                    label: 'Auto-nommer l\'exercice par IA',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('window.__algoTriggerAutoName?.();');
                    }
                }
            ]
        },
        {
            label: 'Affichage',
            submenu: [
                {
                    label: 'Afficher / Masquer le Carnet (Ctrl+\\)',
                    accelerator: 'CmdOrCtrl+\\',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('document.getElementById("btn-toggle-sidebar")?.click();');
                    }
                },
                { type: 'separator' },
                { role: 'reload', label: 'Actualiser' },
                { role: 'forceReload', label: 'Forcer l\'actualisation' },
                { role: 'toggleDevTools', label: 'Outils de développement (F12)' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: 'Plein écran' }
            ]
        },
        {
            label: 'Aide',
            submenu: [
                {
                    label: 'À propos d\'AlgoForge Pro',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'À propos d\'AlgoForge Pro',
                            message: 'AlgoForge Pro — Studio d\'Algorithmique v2.1.0',
                            detail: "Véritable application de bureau native pour Matéi (BUT 1 Informatique - Campus d'Anglet).\n" +
                                    "Basé sur le formalisme graphique des arbres d'action IUT R1.01 (Etcheverry / Tabula Rasa / AlgoForge).\n\n" +
                                    "Fonctionnalités avancées :\n" +
                                    "- Carnet d'exercices multi-pages avec persistance %APPDATA%\n" +
                                    "- Auto-nommage intelligent par IA\n" +
                                    "- Générateur de Code C Allman R1.01 & Pseudo-code IUT\n" +
                                    "- Simulateur pas-à-pas avec trace mémoire des variables\n" +
                                    "- Assistant de TD avec cas de tests aux limites"
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    mainWindow.webContents.on('did-finish-load', () => {
        console.log('[MAIN] Page did-finish-load successfully');
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
        console.error('[MAIN] Page did-fail-load:', errorCode, errorDescription, validatedURL);
    });

    mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
        console.log(`[RENDERER CONSOLE] (${sourceId}:${line}) [level ${level}] ${message}`);
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// =========================================================================
// IPC HANDLERS NATIFS (Application de bureau Windows)
// =========================================================================

// 1. Dialogue native Windows : Enregistrer sous
ipcMain.handle('native-save-dialog', async (event, { defaultName, content, filterType }) => {
    let filters = [{ name: 'Fichier AlgoForge (*.af)', extensions: ['af', 'json'] }];
    if (filterType === 'c') filters = [{ name: 'Fichier Source C (*.c)', extensions: ['c'] }];
    if (filterType === 'svg') filters = [{ name: 'Image Vectorielle SVG (*.svg)', extensions: ['svg'] }];

    const res = await dialog.showSaveDialog(mainWindow, {
        title: 'Enregistrer l\'exercice',
        defaultPath: defaultName || 'exercice.af',
        filters: filters
    });

    if (!res.canceled && res.filePath) {
        fs.writeFileSync(res.filePath, content, 'utf-8');
        return { success: true, filePath: res.filePath };
    }
    return { success: false, canceled: true };
});

// 2. Dialogue native Windows : Ouvrir un fichier
ipcMain.handle('native-open-dialog', async () => {
    const res = await dialog.showOpenDialog(mainWindow, {
        title: 'Ouvrir un exercice AlgoForge',
        filters: [{ name: 'Fichiers AlgoForge (*.af, *.json)', extensions: ['af', 'json'] }],
        properties: ['openFile']
    });

    if (!res.canceled && res.filePaths.length > 0) {
        const filePath = res.filePaths[0];
        const content = fs.readFileSync(filePath, 'utf-8');
        return { success: true, filePath, content };
    }
    return { success: false, canceled: true };
});

// 3. Persistance automatique du carnet dans %APPDATA%/AlgoForgePro/notebook.json
ipcMain.handle('save-notebook-disk', async (event, jsonData) => {
    try {
        fs.writeFileSync(notebookStorePath, typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData, null, 2), 'utf-8');
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

ipcMain.handle('load-notebook-disk', async () => {
    try {
        if (fs.existsSync(notebookStorePath)) {
            const raw = fs.readFileSync(notebookStorePath, 'utf-8');
            return { success: true, data: JSON.parse(raw) };
        }
    } catch (e) {
        // En cas d'erreur de lecture, ignorer gracieusement
    }
    return { success: false };
});

// 4. Ping silencieux via Node (sans polluer la console DevTools avec des ERR_CONNECTION_TIMED_OUT)
ipcMain.handle('quiet-ping-cloud', async (event, urlStr) => {
    return new Promise((resolve) => {
        try {
            const u = new URL(urlStr || 'http://88.96.47.180:8765/api/health');
            const req = http.request({
                hostname: u.hostname,
                port: u.port || 80,
                path: u.pathname,
                method: 'GET',
                timeout: 1500
            }, (res) => {
                resolve({ online: res.statusCode >= 200 && res.statusCode < 400 });
            });
            req.on('error', () => resolve({ online: false }));
            req.on('timeout', () => { req.destroy(); resolve({ online: false }); });
            req.end();
        } catch (e) {
            resolve({ online: false });
        }
    });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
