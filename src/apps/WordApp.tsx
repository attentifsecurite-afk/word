import { useState, useRef, useCallback } from 'react';
import ToastContainer, { showToast } from '../components/Toast';
import { DocumentManager, SavedDocument } from '../utils/DocumentManager';
import DocumentList from '../components/DocumentList';

interface WordAppProps {
  onBack: () => void;
}

export default function WordApp({ onBack }: WordAppProps) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [fileName, setFileName] = useState('Sans titre');
  const [isEditing, setIsEditing] = useState(false);
  const [showDocumentList, setShowDocumentList] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
      setCharCount(text.length);
    }
  }, []);

  const execCmd = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setIsEditing(false);
  };

  const handleExportHTML = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
  </style>
</head>
<body>
${content}
</body>
</html>`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.html`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Document exporté en HTML', 'success');
    }
  };

  const handleExportTXT = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Document exporté en TXT', 'success');
    }
  };

  const handleSaveLocal = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const doc = DocumentManager.saveDocument(fileName, content, wordCount);
      showToast(`"${doc.name}" sauvegardé avec succès !`, 'success');
    }
  };

  const handleLoadDocument = (doc: SavedDocument) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = doc.content;
      setFileName(doc.name);
      handleInput();
      showToast(`"${doc.name}" chargé !`, 'success');
    }
  };

  const handleNewDocument = () => {
    if (editorRef.current) {
      if (window.confirm('Créer un nouveau document ?')) {
        editorRef.current.innerHTML = '';
        setFileName('Sans titre');
        setWordCount(0);
        setCharCount(0);
        showToast('Nouveau document créé', 'info');
      }
    }
  };

  const handlePrint = () => {
    if (editorRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${fileName}</title>
            <style>
              body { font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
            </style>
          </head>
          <body>${editorRef.current.innerHTML}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        showToast('Fenêtre d\'impression ouverte', 'info');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3 shadow-sm">
        <button
          onClick={onBack}
          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
          title="Retour"
        >
          <i className="fas fa-arrow-left mr-1"></i> Retour
        </button>
        <div className="w-px h-6 bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <i className="fas fa-file-word text-white"></i>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              className="text-lg font-medium border-b-2 border-blue-500 outline-none px-1"
              autoFocus
            />
          ) : (
            <h1
              className="text-lg font-medium text-gray-700 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => setIsEditing(true)}
            >
              {fileName}
            </h1>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={handleNewDocument} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-file-alt mr-1"></i> Nouveau
          </button>
          <button onClick={handleSaveLocal} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-save mr-1"></i> Sauvegarder
          </button>
          <button onClick={() => setShowDocumentList(true)} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-folder-open mr-1"></i> Charger
          </button>
          <button onClick={handlePrint} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-print mr-1"></i> Imprimer
          </button>
          <div className="relative group">
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
              <i className="fas fa-download mr-1"></i> Exporter
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-50 min-w-[140px]">
              <button onClick={handleExportHTML} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <i className="fas fa-code mr-2"></i> HTML
              </button>
              <button onClick={handleExportTXT} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                <i className="fas fa-file-alt mr-2"></i> Texte (.txt)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-1.5 flex flex-wrap items-center gap-1">
        <div className="flex items-center gap-0.5 border-r border-gray-200 pr-2 mr-1">
          <button onClick={() => execCmd('undo')} className="toolbar-btn" title="Annuler">
            <i className="fas fa-undo"></i>
          </button>
          <button onClick={() => execCmd('redo')} className="toolbar-btn" title="Rétablir">
            <i className="fas fa-redo"></i>
          </button>
        </div>

        <select onChange={(e) => execCmd('fontName', e.target.value)} className="toolbar-select" defaultValue="Arial">
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>

        <select onChange={(e) => execCmd('fontSize', e.target.value)} className="toolbar-select w-16" defaultValue="3">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-0.5">
          <button onClick={() => execCmd('bold')} className="toolbar-btn font-bold" title="Gras">
            <i className="fas fa-bold"></i>
          </button>
          <button onClick={() => execCmd('italic')} className="toolbar-btn italic" title="Italique">
            <i className="fas fa-italic"></i>
          </button>
          <button onClick={() => execCmd('underline')} className="toolbar-btn underline" title="Souligné">
            <i className="fas fa-underline"></i>
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-0.5">
          <button onClick={() => execCmd('justifyLeft')} className="toolbar-btn" title="Aligner à gauche">
            <i className="fas fa-align-left"></i>
          </button>
          <button onClick={() => execCmd('justifyCenter')} className="toolbar-btn" title="Centrer">
            <i className="fas fa-align-center"></i>
          </button>
          <button onClick={() => execCmd('justifyRight')} className="toolbar-btn" title="Aligner à droite">
            <i className="fas fa-align-right"></i>
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-0.5">
          <button onClick={() => execCmd('insertUnorderedList')} className="toolbar-btn" title="Liste à puces">
            <i className="fas fa-list-ul"></i>
          </button>
          <button onClick={() => execCmd('insertOrderedList')} className="toolbar-btn" title="Liste numérotée">
            <i className="fas fa-list-ol"></i>
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-auto bg-gray-200 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-sm min-h-[1100px] p-16 page-area">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="editor-content w-full h-full min-h-[1000px] outline-none text-gray-800 leading-relaxed"
              onInput={handleInput}
              spellCheck
            >
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Commencez à écrire votre document ici...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-blue-600 text-white px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span><i className="fas fa-file-alt mr-1"></i> {fileName}</span>
          <span><i className="fas fa-font mr-1"></i> {wordCount} mot{wordCount !== 1 ? 's' : ''}</span>
          <span><i className="fas fa-text-width mr-1"></i> {charCount} caractère{charCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-4">
          <span><i className="fas fa-clock mr-1"></i> {new Date().toLocaleDateString('fr-FR')}</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Prêt
          </span>
        </div>
      </div>

      {/* Document List */}
      <DocumentList
        isOpen={showDocumentList}
        onClose={() => setShowDocumentList(false)}
        onLoadDocument={handleLoadDocument}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
