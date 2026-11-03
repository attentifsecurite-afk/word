import { useState, useRef, useCallback } from 'react';
import ToastContainer, { showToast } from '../components/Toast';
import { DocumentManager, SavedDocument } from '../utils/DocumentManager';
import DocumentList from '../components/DocumentList';
import { importTextFile, exportHTML, exportText, isLocalStorageAvailable } from '../utils/FileHandler';
import TemplateSelector from '../components/TemplateSelector';
import ThemeToggle from '../components/ThemeToggle';
import { DocumentTemplate } from '../utils/templates';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface WordAppProps {
  onBack: () => void;
  onOpenStorage?: () => void;
}

export default function WordApp({ onBack, onOpenStorage }: WordAppProps) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [fileName, setFileName] = useState('Document1');
  const [isEditing, setIsEditing] = useState(false);
  const [showDocumentList, setShowDocumentList] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
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

  const handleImport = async () => {
    const result = await importTextFile();
    if (result.success && result.data && editorRef.current) {
      editorRef.current.innerHTML = result.data;
      if (result.fileName) {
        setFileName(result.fileName.replace(/\.(txt|html|htm|rtf|md)$/, ''));
      }
      handleInput();
      showToast('Document importé avec succès', 'success');
    } else if (result.error) {
      showToast(result.error, 'error');
    }
  };

  const handleExportHTML = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      exportHTML(content, fileName);
      showToast('Document exporté en HTML', 'success');
    }
  };

  const handleExportTXT = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      exportText(text, fileName);
      showToast('Document exporté en TXT', 'success');
    }
  };

  const handleSaveLocal = () => {
    if (editorRef.current) {
      if (!isLocalStorageAvailable()) {
        showToast('Stockage local non disponible. Utilisez Export à la place.', 'error');
        return;
      }
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
        setFileName('Document1');
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
              body { font-family: 'Calibri', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
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

  const handleTemplateSelect = (template: DocumentTemplate) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = template.content;
      setFileName(template.name);
      handleInput();
      showToast(`Modèle "${template.name}" appliqué`, 'success');
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      action: handleSaveLocal,
      description: 'Sauvegarder'
    },
    {
      key: 'p',
      ctrl: true,
      action: handlePrint,
      description: 'Imprimer'
    },
    {
      key: 'n',
      ctrl: true,
      action: handleNewDocument,
      description: 'Nouveau document'
    }
  ]);

  const tabs = [
    { id: 'file', label: 'Fichier', icon: 'fas fa-file' },
    { id: 'home', label: 'Accueil', icon: 'fas fa-home' },
    { id: 'insert', label: 'Insertion', icon: 'fas fa-plus' },
    { id: 'layout', label: 'Mise en page', icon: 'fas fa-columns' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Title Bar - Microsoft Style */}
      <div className="bg-[#2b579a] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-white/10 p-1 rounded transition">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <i className="fas fa-file-word text-sm"></i>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              className="bg-white/10 border border-white/30 rounded px-2 py-0.5 text-sm outline-none"
              autoFocus
            />
          ) : (
            <span 
              className="text-sm cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded"
              onClick={() => setIsEditing(true)}
            >
              {fileName} - Word
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSaveLocal} className="hover:bg-white/10 p-1.5 rounded transition" title="Sauvegarder (Ctrl+S)">
            <i className="fas fa-save text-sm"></i>
          </button>
          <button onClick={handlePrint} className="hover:bg-white/10 p-1.5 rounded transition" title="Imprimer (Ctrl+P)">
            <i className="fas fa-print text-sm"></i>
          </button>
          <ThemeToggle />
          {onOpenStorage && (
            <button onClick={onOpenStorage} className="hover:bg-white/10 p-1.5 rounded transition" title="Gestionnaire de stockage">
              <i className="fas fa-database text-sm"></i>
            </button>
          )}
        </div>
      </div>

      {/* Ribbon Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-1 px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'text-[#2b579a] border-b-2 border-[#2b579a]'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ribbon Content */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        {activeTab === 'home' && (
          <div className="flex items-center gap-4">
            {/* Clipboard */}
            <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
              <button onClick={() => execCmd('cut')} className="toolbar-btn" title="Couper">
                <i className="fas fa-cut"></i>
              </button>
              <button onClick={() => execCmd('copy')} className="toolbar-btn" title="Copier">
                <i className="fas fa-copy"></i>
              </button>
              <button onClick={() => execCmd('paste')} className="toolbar-btn" title="Coller">
                <i className="fas fa-paste"></i>
              </button>
            </div>

            {/* Font */}
            <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
              <select onChange={(e) => execCmd('fontName', e.target.value)} className="toolbar-select" defaultValue="Calibri">
                <option value="Calibri">Calibri</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
              <select onChange={(e) => execCmd('fontSize', e.target.value)} className="toolbar-select w-16" defaultValue="3">
                <option value="1">8</option>
                <option value="2">10</option>
                <option value="3">12</option>
                <option value="4">14</option>
                <option value="5">18</option>
                <option value="6">24</option>
                <option value="7">36</option>
              </select>
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

            {/* Paragraph */}
            <div className="flex items-center gap-2">
              <button onClick={() => execCmd('justifyLeft')} className="toolbar-btn" title="Aligner à gauche">
                <i className="fas fa-align-left"></i>
              </button>
              <button onClick={() => execCmd('justifyCenter')} className="toolbar-btn" title="Centrer">
                <i className="fas fa-align-center"></i>
              </button>
              <button onClick={() => execCmd('justifyRight')} className="toolbar-btn" title="Aligner à droite">
                <i className="fas fa-align-right"></i>
              </button>
              <button onClick={() => execCmd('justifyFull')} className="toolbar-btn" title="Justifier">
                <i className="fas fa-align-justify"></i>
              </button>
              <button onClick={() => execCmd('insertUnorderedList')} className="toolbar-btn" title="Liste à puces">
                <i className="fas fa-list-ul"></i>
              </button>
              <button onClick={() => execCmd('insertOrderedList')} className="toolbar-btn" title="Liste numérotée">
                <i className="fas fa-list-ol"></i>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'insert' && (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                const url = prompt('URL de l\'image :');
                if (url) execCmd('insertImage', url);
              }}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              <i className="fas fa-image text-xl text-[#2b579a]"></i>
              <span className="text-xs">Image</span>
            </button>
            <button 
              onClick={() => {
                const url = prompt('URL du lien :');
                if (url) execCmd('createLink', url);
              }}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              <i className="fas fa-link text-xl text-[#2b579a]"></i>
              <span className="text-xs">Lien</span>
            </button>
            <button 
              onClick={() => {
                const rows = prompt('Nombre de lignes :', '3');
                const cols = prompt('Nombre de colonnes :', '3');
                if (rows && cols) {
                  const r = parseInt(rows);
                  const c = parseInt(cols);
                  let table = '<table border="1" style="border-collapse: collapse; width: 100%;">';
                  for (let i = 0; i < r; i++) {
                    table += '<tr>';
                    for (let j = 0; j < c; j++) {
                      table += '<td style="padding: 8px; min-width: 50px;">&nbsp;</td>';
                    }
                    table += '</tr>';
                  }
                  table += '</table><p><br></p>';
                  execCmd('insertHTML', table);
                }
              }}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              <i className="fas fa-table text-xl text-[#2b579a]"></i>
              <span className="text-xs">Tableau</span>
            </button>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Marges:</span>
              <select className="toolbar-select">
                <option>Normal</option>
                <option>Étroit</option>
                <option>Large</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Orientation:</span>
              <select className="toolbar-select">
                <option>Portrait</option>
                <option>Paysage</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'file' && (
          <div className="flex items-center gap-4">
            <button onClick={handleNewDocument} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              <i className="fas fa-file-alt text-xl text-[#2b579a]"></i>
              <span className="text-xs">Nouveau</span>
            </button>
            <button onClick={() => setShowTemplateSelector(true)} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              <i className="fas fa-copy text-xl text-[#2b579a]"></i>
              <span className="text-xs">Modèles</span>
            </button>
            <button onClick={handleSaveLocal} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              <i className="fas fa-save text-xl text-[#2b579a]"></i>
              <span className="text-xs">Sauvegarder</span>
            </button>
            <button onClick={() => setShowDocumentList(true)} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              <i className="fas fa-folder-open text-xl text-[#2b579a]"></i>
              <span className="text-xs">Ouvrir</span>
            </button>
            <button onClick={handleImport} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              <i className="fas fa-upload text-xl text-[#2b579a]"></i>
              <span className="text-xs">Importer</span>
            </button>
            <button onClick={handlePrint} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              <i className="fas fa-print text-xl text-[#2b579a]"></i>
              <span className="text-xs">Imprimer</span>
            </button>
            <button onClick={handleExportHTML} className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              <i className="fas fa-download text-xl text-[#2b579a]"></i>
              <span className="text-xs">Exporter</span>
            </button>
          </div>
        )}
      </div>

      {/* Ruler */}
      <div className="bg-white border-b border-gray-200 h-6 flex items-center px-4">
        <div className="flex-1 h-px bg-gray-300 relative">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="absolute top-0 w-px h-2 bg-gray-400" style={{ left: `${i * 5}%` }}></div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-auto bg-gray-200 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg min-h-[1100px] p-16">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="editor-content w-full h-full min-h-[1000px] outline-none text-gray-800 leading-relaxed"
              onInput={handleInput}
              spellCheck
              style={{ fontFamily: 'Calibri, sans-serif' }}
            >
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Commencez à écrire votre document ici...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#2b579a] text-white px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span>Page 1 sur 1</span>
          <span>{wordCount} mot{wordCount !== 1 ? 's' : ''}</span>
          <span>Français (France)</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:bg-white/10 px-2 py-0.5 rounded transition">
            <i className="fas fa-search"></i>
          </button>
          <div className="flex items-center gap-2">
            <button className="hover:bg-white/10 p-1 rounded transition">
              <i className="fas fa-minus"></i>
            </button>
            <span>100%</span>
            <button className="hover:bg-white/10 p-1 rounded transition">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Document List */}
      <DocumentList
        isOpen={showDocumentList}
        onClose={() => setShowDocumentList(false)}
        onLoadDocument={handleLoadDocument}
      />

      {/* Template Selector */}
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelect={handleTemplateSelect}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
