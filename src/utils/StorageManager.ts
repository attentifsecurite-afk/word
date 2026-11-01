/**
 * Gestionnaire de Stockage Local Avancé
 * Gère la persistance, la sauvegarde et la restauration des données
 */

export interface StorageStats {
  totalSize: number;
  usedSize: number;
  availableSize: number;
  itemCount: number;
  lastBackup?: string;
}

export interface BackupData {
  timestamp: string;
  version: string;
  data: Record<string, any>;
  checksum: string;
}

export class LocalStorageManager {
  private static STORAGE_PREFIX = 'officerapide_';
  private static BACKUP_KEY = 'backups';
  private static VERSION = '1.0.0';

  /**
   * Vérifie si localStorage est disponible
   */
  static isAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Sauvegarde des données avec gestion d'erreurs
   */
  static save(key: string, data: any): boolean {
    try {
      if (!this.isAvailable()) {
        console.error('localStorage non disponible');
        return false;
      }

      const fullKey = this.STORAGE_PREFIX + key;
      const serialized = JSON.stringify(data);
      
      // Vérifier la taille avant sauvegarde
      if (serialized.length > 5 * 1024 * 1024) { // 5MB limit
        console.warn('Données trop volumineuses pour localStorage');
        return false;
      }

      localStorage.setItem(fullKey, serialized);
      return true;
    } catch (e) {
      console.error('Erreur de sauvegarde:', e);
      return false;
    }
  }

  /**
   * Charge des données avec gestion d'erreurs
   */
  static load<T>(key: string): T | null {
    try {
      if (!this.isAvailable()) {
        console.error('localStorage non disponible');
        return null;
      }

      const fullKey = this.STORAGE_PREFIX + key;
      const item = localStorage.getItem(fullKey);
      
      if (!item) return null;
      
      return JSON.parse(item) as T;
    } catch (e) {
      console.error('Erreur de chargement:', e);
      return null;
    }
  }

  /**
   * Supprime des données
   */
  static remove(key: string): boolean {
    try {
      if (!this.isAvailable()) return false;
      
      const fullKey = this.STORAGE_PREFIX + key;
      localStorage.removeItem(fullKey);
      return true;
    } catch (e) {
      console.error('Erreur de suppression:', e);
      return false;
    }
  }

  /**
   * Crée une sauvegarde complète
   */
  static createBackup(name: string): BackupData | null {
    try {
      if (!this.isAvailable()) return null;

      const allData: Record<string, any> = {};
      
      // Collecter toutes les données
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_PREFIX)) {
          const shortKey = key.replace(this.STORAGE_PREFIX, '');
          const value = localStorage.getItem(key);
          if (value) {
            try {
              allData[shortKey] = JSON.parse(value);
            } catch {
              allData[shortKey] = value;
            }
          }
        }
      }

      const backup: BackupData = {
        timestamp: new Date().toISOString(),
        version: this.VERSION,
        data: allData,
        checksum: this.generateChecksum(JSON.stringify(allData))
      };

      // Sauvegarder la sauvegarde
      const backups = this.load<BackupData[]>(this.BACKUP_KEY) || [];
      backups.unshift(backup);
      
      // Garder seulement les 10 dernières sauvegardes
      if (backups.length > 10) {
        backups.splice(10);
      }

      this.save(this.BACKUP_KEY, backups);
      return backup;
    } catch (e) {
      console.error('Erreur de création de sauvegarde:', e);
      return null;
    }
  }

  /**
   * Restaure une sauvegarde
   */
  static restoreBackup(index: number): boolean {
    try {
      if (!this.isAvailable()) return false;

      const backups = this.load<BackupData[]>(this.BACKUP_KEY);
      if (!backups || !backups[index]) return false;

      const backup = backups[index];
      
      // Vérifier l'intégrité
      const currentChecksum = this.generateChecksum(JSON.stringify(backup.data));
      if (currentChecksum !== backup.checksum) {
        console.error('Sauvegarde corrompue');
        return false;
      }

      // Restaurer les données
      for (const [key, value] of Object.entries(backup.data)) {
        this.save(key, value);
      }

      return true;
    } catch (e) {
      console.error('Erreur de restauration:', e);
      return false;
    }
  }

  /**
   * Liste toutes les sauvegardes
   */
  static listBackups(): BackupData[] {
    return this.load<BackupData[]>(this.BACKUP_KEY) || [];
  }

  /**
   * Supprime une sauvegarde
   */
  static deleteBackup(index: number): boolean {
    try {
      const backups = this.load<BackupData[]>(this.BACKUP_KEY);
      if (!backups || !backups[index]) return false;

      backups.splice(index, 1);
      this.save(this.BACKUP_KEY, backups);
      return true;
    } catch (e) {
      console.error('Erreur de suppression de sauvegarde:', e);
      return false;
    }
  }

  /**
   * Obtient les statistiques de stockage
   */
  static getStats(): StorageStats {
    try {
      if (!this.isAvailable()) {
        return {
          totalSize: 0,
          usedSize: 0,
          availableSize: 0,
          itemCount: 0
        };
      }

      let usedSize = 0;
      let itemCount = 0;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_PREFIX)) {
          const value = localStorage.getItem(key);
          if (value) {
            usedSize += value.length;
            itemCount++;
          }
        }
      }

      const totalSize = 5 * 1024 * 1024; // 5MB typical limit
      const backups = this.listBackups();
      const lastBackup = backups.length > 0 ? backups[0].timestamp : undefined;

      return {
        totalSize,
        usedSize,
        availableSize: totalSize - usedSize,
        itemCount,
        lastBackup
      };
    } catch (e) {
      console.error('Erreur de calcul des statistiques:', e);
      return {
        totalSize: 0,
        usedSize: 0,
        availableSize: 0,
        itemCount: 0
      };
    }
  }

  /**
   * Génère un checksum simple
   */
  private static generateChecksum(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Exporte toutes les données en JSON
   */
  static exportAllData(): string {
    const allData: Record<string, any> = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.STORAGE_PREFIX)) {
        const shortKey = key.replace(this.STORAGE_PREFIX, '');
        const value = localStorage.getItem(key);
        if (value) {
          try {
            allData[shortKey] = JSON.parse(value);
          } catch {
            allData[shortKey] = value;
          }
        }
      }
    }

    return JSON.stringify(allData, null, 2);
  }

  /**
   * Importe des données depuis JSON
   */
  static importAllData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      for (const [key, value] of Object.entries(data)) {
        this.save(key, value);
      }
      
      return true;
    } catch (e) {
      console.error('Erreur d\'import:', e);
      return false;
    }
  }

  /**
   * Efface toutes les données
   */
  static clearAll(): boolean {
    try {
      if (!this.isAvailable()) return false;

      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (e) {
      console.error('Erreur de nettoyage:', e);
      return false;
    }
  }
}
