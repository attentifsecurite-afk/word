/**
 * Gestionnaire de Documents Unifié
 * Utilise le StorageManager pour une persistance robuste
 */

import { LocalStorageManager } from './StorageManager';

// Interface unifiée pour tous les documents
export interface SavedDocument {
  id: string;
  name: string;
  content: string;
  type?: 'word' | 'excel' | 'powerpoint' | 'mail';
  timestamp: string;
  createdAt?: string;
  updatedAt?: string;
  wordCount?: number;
  size?: number;
  tags?: string[];
}

// Alias pour compatibilité
export type Document = SavedDocument;

export class DocumentManager {
  private static DOCS_KEY = 'documents';

  /**
   * Récupère tous les documents
   */
  static getAll(): Document[] {
    return LocalStorageManager.load<Document[]>(this.DOCS_KEY) || [];
  }

  /**
   * Sauvegarde un document
   */
  static save(doc: Document): boolean {
    const docs = this.getAll();
    const existingIndex = docs.findIndex(d => d.id === doc.id);

    if (existingIndex >= 0) {
      docs[existingIndex] = { ...doc, updatedAt: new Date().toISOString() };
    } else {
      docs.push(doc);
    }

    return LocalStorageManager.save(this.DOCS_KEY, docs);
  }

  /**
   * Charge un document par ID
   */
  static load(id: string): Document | null {
    const docs = this.getAll();
    return docs.find(d => d.id === id) || null;
  }

  /**
   * Supprime un document
   */
  static delete(id: string): boolean {
    const docs = this.getAll().filter(d => d.id !== id);
    return LocalStorageManager.save(this.DOCS_KEY, docs);
  }

  /**
   * Recherche des documents
   */
  static search(query: string): Document[] {
    const docs = this.getAll();
    const lowerQuery = query.toLowerCase();
    
    return docs.filter(doc => 
      doc.name.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }

  /**
   * Récupère les documents par type
   */
  static getByType(type: 'word' | 'excel' | 'powerpoint' | 'mail'): Document[] {
    return this.getAll().filter(d => d.type === type);
  }

  /**
   * Récupère les documents récents
   */
  static getRecent(limit: number = 10): Document[] {
    return this.getAll()
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.timestamp).getTime();
        const dateB = new Date(b.updatedAt || b.timestamp).getTime();
        return dateB - dateA;
      })
      .slice(0, limit);
  }

  /**
   * Ajoute des tags à un document
   */
  static addTags(id: string, tags: string[]): boolean {
    const doc = this.load(id);
    if (!doc) return false;

    doc.tags = [...(doc.tags || []), ...tags.filter(t => !(doc.tags || []).includes(t))];
    return this.save(doc);
  }

  /**
   * Supprime des tags d'un document
   */
  static removeTags(id: string, tags: string[]): boolean {
    const doc = this.load(id);
    if (!doc || !doc.tags) return false;

    doc.tags = doc.tags.filter(t => !tags.includes(t));
    return this.save(doc);
  }

  /**
   * Exporte un document en JSON
   */
  static exportDocument(id: string): string | null {
    const doc = this.load(id);
    if (!doc) return null;
    return JSON.stringify(doc, null, 2);
  }

  /**
   * Importe un document depuis JSON
   */
  static importDocument(jsonData: string): Document | null {
    try {
      const doc = JSON.parse(jsonData) as Document;
      doc.id = Date.now().toString(); // Nouveau ID
      doc.createdAt = new Date().toISOString();
      doc.updatedAt = new Date().toISOString();
      
      if (this.save(doc)) {
        return doc;
      }
      return null;
    } catch (e) {
      console.error('Erreur d\'import:', e);
      return null;
    }
  }

  /**
   * Duplique un document
   */
  static duplicate(id: string): Document | null {
    const doc = this.load(id);
    if (!doc) return null;

    const newDoc: Document = {
      ...doc,
      id: Date.now().toString(),
      name: `${doc.name} (copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (this.save(newDoc)) {
      return newDoc;
    }
    return null;
  }

  /**
   * Renomme un document
   */
  static rename(id: string, newName: string): boolean {
    const doc = this.load(id);
    if (!doc) return false;

    doc.name = newName;
    return this.save(doc);
  }

  /**
   * Obtient les statistiques des documents
   */
  static getStats() {
    const docs = this.getAll();
    
    return {
      total: docs.length,
      byType: {
        word: docs.filter(d => d.type === 'word').length,
        excel: docs.filter(d => d.type === 'excel').length,
        powerpoint: docs.filter(d => d.type === 'powerpoint').length,
        mail: docs.filter(d => d.type === 'mail').length
      },
      totalSize: docs.reduce((sum, doc) => sum + (doc.size || 0), 0),
      lastModified: docs.length > 0 
        ? docs.sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.timestamp).getTime();
            const dateB = new Date(b.updatedAt || b.timestamp).getTime();
            return dateB - dateA;
          })[0].updatedAt || docs[0].timestamp
        : null
    };
  }

  // ============================================
  // Méthodes de compatibilité avec l'ancienne API
  // ============================================

  /**
   * @deprecated Utilisez save() à la place
   */
  static saveDocument(name: string, content: string, wordCount: number): SavedDocument {
    const doc: SavedDocument = {
      id: Date.now().toString(),
      name,
      content,
      timestamp: new Date().toISOString(),
      wordCount
    };

    const docs = this.getAllDocuments();
    const existingIndex = docs.findIndex(d => d.name === name);

    if (existingIndex >= 0) {
      docs[existingIndex] = doc;
    } else {
      docs.unshift(doc);
    }

    LocalStorageManager.save(this.DOCS_KEY, docs);
    return doc;
  }

  /**
   * @deprecated Utilisez getAll() à la place
   */
  static getAllDocuments(): SavedDocument[] {
    return LocalStorageManager.load<SavedDocument[]>(this.DOCS_KEY) || [];
  }

  /**
   * @deprecated Utilisez delete() à la place
   */
  static deleteDocument(id: string): void {
    const docs = this.getAllDocuments().filter(d => d.id !== id);
    LocalStorageManager.save(this.DOCS_KEY, docs);
  }
}
