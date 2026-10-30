export interface SavedDocument {
  id: string;
  name: string;
  content: string;
  timestamp: string;
  wordCount: number;
}

export class DocumentManager {
  private static STORAGE_KEY = 'wordrapide_documents';

  static getAllDocuments(): SavedDocument[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static saveDocument(name: string, content: string, wordCount: number): SavedDocument {
    const docs = this.getAllDocuments();
    const existingIndex = docs.findIndex(d => d.name === name);
    
    const doc: SavedDocument = {
      id: existingIndex >= 0 ? docs[existingIndex].id : Date.now().toString(),
      name,
      content,
      timestamp: new Date().toISOString(),
      wordCount
    };

    if (existingIndex >= 0) {
      docs[existingIndex] = doc;
    } else {
      docs.unshift(doc);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(docs));
    return doc;
  }

  static loadDocument(id: string): SavedDocument | null {
    const docs = this.getAllDocuments();
    return docs.find(d => d.id === id) || null;
  }

  static deleteDocument(id: string): void {
    const docs = this.getAllDocuments().filter(d => d.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(docs));
  }

  static renameDocument(id: string, newName: string): void {
    const docs = this.getAllDocuments();
    const doc = docs.find(d => d.id === id);
    if (doc) {
      doc.name = newName;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(docs));
    }
  }
}
