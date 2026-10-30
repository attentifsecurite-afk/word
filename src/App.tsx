import { useState, useRef, useCallback, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import PageArea from './components/PageArea';
import StatusBar from './components/StatusBar';
import InstallBanner from './components/InstallBanner';
import InstallHelp from './components/InstallHelp';
import InstallPage from './components/InstallPage';
import InstallFloatingBtn from './components/InstallFloatingBtn';
import AIAssistant from './components/AIAssistant';
import ToastContainer, { showToast } from './components/Toast';
import DocumentList from './components/DocumentList';
import { DocumentManager, SavedDocument } from './utils/DocumentManager';
import './styles/editor.css';

function App() {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [fileName, setFileName] = useState('Sans titre');
  const [isEditing, setIsEditing] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [showInstallPage, setShowInstallPage] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showDocumentList, setShowDocumentList] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Check if URL has /install or ?install=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('install') === 'true' || window.location.hash === '#install') {
      setShowInstallPage(true);
    }
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
      setCharCount(text.length);
    }
  }, []);

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

  const handleLoadLocal = () => {
    setShowDocumentList(true);
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
      if (window.confirm('Créer un nouveau document ? Les modifications non sauvegardées seront perdues.')) {
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
      } else {
        showToast('Impossible d\'ouvrir la fenêtre d\'impression', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Install Banner */}
      <InstallBanner />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
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
          <button
            onClick={handleNewDocument}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
            title="Nouveau document"
          >
            <i className="fas fa-file-alt mr-1"></i> Nouveau
          </button>
          <button
            onClick={handleSaveLocal}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
            title="Sauvegarder"
          >
            <i className="fas fa-save mr-1"></i> Sauvegarder
          </button>
          <button
            onClick={handleLoadLocal}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
            title="Charger"
          >
            <i className="fas fa-folder-open mr-1"></i> Charger
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
            title="Imprimer"
          >
            <i className="fas fa-print mr-1"></i> Imprimer
          </button>
          <div className="relative group">
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
              <i className="fas fa-download mr-1"></i> Exporter
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:block z-50 min-w-[140px]">
              <button
                onClick={handleExportHTML}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <i className="fas fa-code mr-2"></i> HTML
              </button>
              <button
                onClick={handleExportTXT}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                <i className="fas fa-file-alt mr-2"></i> Texte (.txt)
              </button>
            </div>
          </div>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className={`px-3 py-1.5 text-sm rounded-lg transition font-medium ${
              showAIAssistant
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
            }`}
            title="Assistant IA Gemini"
          >
            <i className="fas fa-robot mr-1"></i> Assistant IA
          </button>
          <a
            href={`${window.location.origin}${window.location.pathname}?install=true`}
            onClick={(e) => { e.preventDefault(); setShowInstallPage(true); }}
            className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg transition shadow-sm font-medium"
            title="Installer l'application"
          >
            <i className="fas fa-download mr-1"></i> Installer l'app
          </a>
          <button
            onClick={() => setShowInstallHelp(true)}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition"
            title="Aide à l'installation"
          >
            <i className="fas fa-question-circle"></i>
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <Toolbar editorRef={editorRef} />

      {/* Editor Area */}
      <PageArea editorRef={editorRef} onInput={handleInput} />

      {/* Status Bar */}
      <StatusBar wordCount={wordCount} charCount={charCount} fileName={fileName} />

      {/* Install Help Modal */}
      {showInstallHelp && (
        <InstallHelp onClose={() => setShowInstallHelp(false)} />
      )}

      {/* Install Page */}
      {showInstallPage && (
        <InstallPage onClose={() => {
          setShowInstallPage(false);
          // Clean URL
          const url = new URL(window.location.href);
          url.searchParams.delete('install');
          window.history.replaceState({}, '', url.pathname);
        }} />
      )}

      {/* Floating Install Button */}
      <InstallFloatingBtn />

      {/* AI Assistant */}
      <AIAssistant
        editorRef={editorRef}
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
      />

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

export default App;
