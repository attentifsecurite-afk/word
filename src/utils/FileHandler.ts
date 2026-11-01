/**
 * File Import/Export Utility
 * Permet d'importer et exporter des documents depuis/vers le système de fichiers
 */

export interface ImportResult {
  success: boolean;
  data?: string;
  fileName?: string;
  error?: string;
}

/**
 * Importe un fichier texte depuis le système de fichiers
 */
export function importTextFile(): Promise<ImportResult> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.html,.htm,.rtf,.md';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve({ success: false, error: 'Aucun fichier sélectionné' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        resolve({
          success: true,
          data: content,
          fileName: file.name
        });
      };
      reader.onerror = () => {
        resolve({ success: false, error: 'Erreur de lecture du fichier' });
      };
      reader.readAsText(file);
    };

    input.click();
  });
}

/**
 * Importe un fichier CSV pour Excel
 */
export function importCSVFile(): Promise<ImportResult> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.txt';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve({ success: false, error: 'Aucun fichier sélectionné' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        resolve({
          success: true,
          data: content,
          fileName: file.name
        });
      };
      reader.onerror = () => {
        resolve({ success: false, error: 'Erreur de lecture du fichier CSV' });
      };
      reader.readAsText(file);
    };

    input.click();
  });
}

/**
 * Exporte du contenu HTML en fichier
 */
export function exportHTML(content: string, fileName: string): void {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
  <style>
    body { 
      font-family: 'Calibri', 'Arial', sans-serif; 
      max-width: 800px; 
      margin: 40px auto; 
      padding: 20px; 
      line-height: 1.6; 
    }
  </style>
</head>
<body>
${content}
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  downloadBlob(blob, `${fileName}.html`);
}

/**
 * Exporte du texte brut en fichier
 */
export function exportText(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, `${fileName}.txt`);
}

/**
 * Exporte du CSV en fichier
 */
export function exportCSV(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  downloadBlob(blob, `${fileName}.csv`);
}

/**
 * Exporte en format JSON (pour sauvegarde complète)
 */
export function exportJSON(data: any, fileName: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  downloadBlob(blob, `${fileName}.json`);
}

/**
 * Importe un fichier JSON
 */
export function importJSONFile(): Promise<ImportResult> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve({ success: false, error: 'Aucun fichier sélectionné' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const data = JSON.parse(content);
          resolve({
            success: true,
            data: JSON.stringify(data),
            fileName: file.name
          });
        } catch (error) {
          resolve({ success: false, error: 'Fichier JSON invalide' });
        }
      };
      reader.onerror = () => {
        resolve({ success: false, error: 'Erreur de lecture du fichier' });
      };
      reader.readAsText(file);
    };

    input.click();
  });
}

/**
 * Télécharge un blob
 */
function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parse un CSV en tableau de cellules
 */
export function parseCSV(csvContent: string): string[][] {
  const lines = csvContent.split('\n');
  return lines.map(line => {
    // Gestion simple des CSV (sans gestion des guillemets complexes)
    return line.split(',').map(cell => cell.trim());
  }).filter(row => row.length > 0 && row.some(cell => cell !== ''));
}

/**
 * Convertit un tableau de cellules en CSV
 */
export function toCSV(data: string[][]): string {
  return data.map(row => row.join(',')).join('\n');
}

/**
 * Vérifie si localStorage est disponible
 */
export function isLocalStorageAvailable(): boolean {
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
 * Sauvegarde sécurisée dans localStorage
 */
export function safeLocalStorageSet(key: string, value: any): boolean {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage n\'est pas disponible');
      return false;
    }
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Erreur de sauvegarde:', e);
    return false;
  }
}

/**
 * Lecture sécurisée depuis localStorage
 */
export function safeLocalStorageGet(key: string): any {
  try {
    if (!isLocalStorageAvailable()) {
      console.error('localStorage n\'est pas disponible');
      return null;
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Erreur de lecture:', e);
    return null;
  }
}
