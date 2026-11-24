// -*- coding: utf-8 -*-
/**
 * cloud_sync.js - Passerelle de Synchronisation & Télémétrie Cloud Kai
 * ======================================================================
 * Permet à l'application de communiquer avec le VPS Kai (88.96.47.180)
 * de manière silencieuse, sans jamais provoquer d'erreurs rouges dans la console.
 */

class CloudSyncGateway {
    constructor(cloudHost = "http://88.96.47.180:8765", onStatusChange = null) {
        this.cloudHost = cloudHost;
        this.onStatusChange = onStatusChange;

        this.isOnline = false;
        this.lastSyncTime = null;
        this.queueKey = "af_sync_queue";
        this.queue = [];

        this.init();
    }

    init() {
        const saved = localStorage.getItem(this.queueKey);
        if (saved) {
            try {
                this.queue = JSON.parse(saved) || [];
            } catch (e) {
                this.queue = [];
            }
        }

        // Test silencieux au démarrage
        this.checkHealthQuietly();

        // Vérification espacée (toutes les 60 secondes pour économiser la batterie et éviter le spam)
        setInterval(() => {
            if (this.queue.length > 0) {
                this.flushQueue();
            } else {
                this.checkHealthQuietly();
            }
        }, 60000);
    }

    saveQueue() {
        try {
            localStorage.setItem(this.queueKey, JSON.stringify(this.queue));
        } catch (e) {
            console.warn("Erreur sauvegarde queue:", e);
        }
    }

    async checkHealthQuietly() {
        // 1. Si on est dans l'application native Electron, utiliser le pont IPC silencieux Node
        if (window.algoNative && typeof window.algoNative.quietPingCloud === "function") {
            try {
                const res = await window.algoNative.quietPingCloud(`${this.cloudHost}/api/health`);
                this.isOnline = !!res.online;
                this.notifyStatus();
                return;
            } catch (e) {
                this.isOnline = false;
                this.notifyStatus();
                return;
            }
        }

        // 2. Fallback Web : ping ultra-court silencieux avec timeout 1000ms
        if (!navigator.onLine) {
            this.isOnline = false;
            this.notifyStatus();
            return;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 1200);

            const res = await fetch(`${this.cloudHost}/api/health`, {
                method: "GET",
                mode: "no-cors", // Évite les erreurs réseau bloquantes
                signal: controller.signal
            }).catch(() => null);
            clearTimeout(timeoutId);

            this.isOnline = !!res;
        } catch (e) {
            this.isOnline = false;
        }

        this.notifyStatus();
    }

    // Envoi d'un événement de TD (changement d'exercice, simulation réussie, export de code C)
    recordTdActivity(activityData) {
        const payload = {
            id: "act_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            timestamp: Date.now(),
            student: "Matéi de Saint Leger",
            course: "R1.01 Initiation au Développement",
            campus: "IUT de Bayonne et du Pays Basque (Anglet)",
            ...activityData
        };

        this.queue.push(payload);
        this.saveQueue();
        this.notifyStatus();

        // Tenter un envoi seulement si on a été détecté en ligne
        if (this.isOnline) {
            this.flushQueue();
        }
    }

    async flushQueue() {
        if (this.queue.length === 0) {
            this.checkHealthQuietly();
            return;
        }

        try {
            const batch = [...this.queue];
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);

            const res = await fetch(`${this.cloudHost}/api/td/activity`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ batch }),
                signal: controller.signal
            }).catch(() => null);
            clearTimeout(timeoutId);

            if (res && res.ok) {
                this.queue = [];
                this.saveQueue();
                this.isOnline = true;
                this.lastSyncTime = Date.now();
            } else {
                this.isOnline = false;
            }
        } catch (e) {
            this.isOnline = false;
        }

        this.notifyStatus();
    }

    notifyStatus() {
        if (typeof this.onStatusChange === "function") {
            this.onStatusChange({
                isOnline: this.isOnline,
                pendingCount: this.queue.length,
                lastSyncTime: this.lastSyncTime
            });
        }
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { CloudSyncGateway };
}
