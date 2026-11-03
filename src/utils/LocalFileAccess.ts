/**
 * Gestionnaire d'accès aux fichiers locaux
 * Utilise l'API File System Access pour Chrome/Edge
 * Fallback sur input/output classiques pour Safari/Firefox
 */

export interface FileResult {
  success: boolean;
  content?: string;
  fileName?: string;
  handle?: any;
  error?: string;
}

/**
 * Vérifie si l'API File System Access est disponible
 */
export function isFileSystemAccessSupported(): boolean {
  return 'showOpenFilePicker' in window;
}

/**
 * Ouvre un fichier depuis l'ordinateur
 */
export async function openFileFromComputer(acceptTypes?: string[]): Promise<FileResult> {
  // Utiliser File System Access API si disponible
  if (isFileSystemAccessSupported()) {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: 'Documents',
            accept: {
              'text/html': ['.html', '.htm'],
              'text/plain': ['.txt', '.md', '.rtf'],
              'text/csv': ['.csv'],
              'application/json': ['.json']
            }
          }
        ],
        multiple: false
      });

      const file = await fileHandle.getFile();
      const content = await file.text();

      return {
        success: true,
        content,
        fileName: file.name,
        handle: fileHandle
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return { success: false, error: 'Annulé par l\'utilisateur' };
      }
      return { success: false, error: error.message };
    }
  } else {
    // Fallback pour Safari/Firefox
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = acceptTypes?.join(',') || '.txt,.html,.htm,.md,.rtf,.csv,.json';

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve({ success: false, error: 'Aucun fichier sélectionné' });
          return;
        }

        try {
          const content = await file.text();
          resolve({
            success: true,
            content,
            fileName: file.name
          });
        } catch (error: any) {
          resolve({ success: false, error: error.message });
        }
      };

      input.click();
    });
  }
}

/**
 * Sauvegarde un fichier sur l'ordinateur
 */
export async function saveFileToComputer(
  content: string,
  fileName: string,
  suggestedName?: string
): Promise<FileResult> {
  // Utiliser File System Access API si disponible
  if (isFileSystemAccessSupported()) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: suggestedName || fileName,
        types: [
          {
            description: 'Document HTML',
            accept: { 'text/html': ['.html'] }
          },
          {
            description: 'Document Texte',
            accept: { 'text/plain': ['.txt'] }
          }
        ]
      });

      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();

      return {
        success: true,
        fileName: fileHandle.name,
        handle: fileHandle
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return { success: false, error: 'Annulé par l\'utilisateur' };
      }
      return { success: false, error: error.message };
    }
  } else {
    // Fallback pour Safari/Firefox
    try {
      const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = suggestedName || fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        fileName: suggestedName || fileName
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

/**
 * Sauvegarde un fichier texte sur l'ordinateur
 */
export async function saveTextFileToComputer(
  content: string,
  fileName: string
): Promise<FileResult> {
  if (isFileSystemAccessSupported()) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: fileName.endsWith('.txt') ? fileName : `${fileName}.txt`,
        types: [
          {
            description: 'Document Texte',
            accept: { 'text/plain': ['.txt'] }
          }
        ]
      });

      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();

      return {
        success: true,
        fileName: fileHandle.name,
        handle: fileHandle
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return { success: false, error: 'Annulé par l\'utilisateur' };
      }
      return { success: false, error: error.message };
    }
  } else {
    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.endsWith('.txt') ? fileName : `${fileName}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        fileName: fileName.endsWith('.txt') ? fileName : `${fileName}.txt`
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

/**
 * Sauvegarde un fichier CSV sur l'ordinateur
 */
export async function saveCSVFileToComputer(
  content: string,
  fileName: string
): Promise<FileResult> {
  if (isFileSystemAccessSupported()) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: fileName.endsWith('.csv') ? fileName : `${fileName}.csv`,
        types: [
          {
            description: 'Fichier CSV',
            accept: { 'text/csv': ['.csv'] }
          }
        ]
      });

      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();

      return {
        success: true,
        fileName: fileHandle.name,
        handle: fileHandle
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return { success: false, error: 'Annulé par l\'utilisateur' };
      }
      return { success: false, error: error.message };
    }
  } else {
    try {
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        fileName: fileName.endsWith('.csv') ? fileName : `${fileName}.csv`
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

/**
 * Sauvegarde un fichier JSON sur l'ordinateur
 */
export async function saveJSONFileToComputer(
  data: any,
  fileName: string
): Promise<FileResult> {
  const content = JSON.stringify(data, null, 2);
  
  if (isFileSystemAccessSupported()) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: fileName.endsWith('.json') ? fileName : `${fileName}.json`,
        types: [
          {
            description: 'Fichier JSON',
            accept: { 'application/json': ['.json'] }
          }
        ]
      });

      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();

      return {
        success: true,
        fileName: fileHandle.name,
        handle: fileHandle
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return { success: false, error: 'Annulé par l\'utilisateur' };
      }
      return { success: false, error: error.message };
    }
  } else {
    try {
      const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        fileName: fileName.endsWith('.json') ? fileName : `${fileName}.json`
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
