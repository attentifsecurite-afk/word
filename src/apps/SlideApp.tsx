import { useState } from 'react';
import ToastContainer, { showToast } from '../components/Toast';
import { importJSONFile, exportJSON, isLocalStorageAvailable } from '../utils/FileHandler';

interface SlideAppProps {
  onBack: () => void;
}

interface Slide {
  id: number;
  title: string;
  content: string;
  background: string;
}

export default function SlideApp({ onBack }: SlideAppProps) {
  const [fileName, setFileName] = useState('Présentation1');
  const [isEditing, setIsEditing] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, title: 'Titre de la présentation', content: 'Sous-titre ou description', background: 'from-blue-500 to-purple-600' }
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const backgrounds = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-gray-700 to-gray-900',
    'from-white to-gray-100',
  ];

  const currentSlide = slides[currentSlideIndex];

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now(),
      title: 'Nouvelle diapositive',
      content: 'Contenu...',
      background: 'from-blue-500 to-purple-600'
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
    showToast('Diapositive ajoutée', 'success');
  };

  const deleteSlide = (index: number) => {
    if (slides.length === 1) {
      showToast('Impossible de supprimer la dernière diapositive', 'warning');
      return;
    }
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
    showToast('Diapositive supprimée', 'info');
  };

  const updateSlide = (field: 'title' | 'content' | 'background', value: string) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = { ...currentSlide, [field]: value };
    setSlides(newSlides);
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!isLocalStorageAvailable()) {
      showToast('Stockage local non disponible. Utilisez Export à la place.', 'error');
      return;
    }
    const data = { fileName, slides };
    localStorage.setItem('sliderapide_doc', JSON.stringify(data));
    showToast('Présentation sauvegardée !', 'success');
  };

  const handleLoad = () => {
    if (!isLocalStorageAvailable()) {
      showToast('Stockage local non disponible', 'error');
      return;
    }
    const saved = localStorage.getItem('sliderapide_doc');
    if (saved) {
      const data = JSON.parse(saved);
      setFileName(data.fileName);
      setSlides(data.slides);
      setCurrentSlideIndex(0);
      showToast('Présentation chargée !', 'success');
    } else {
      showToast('Aucune présentation sauvegardée', 'warning');
    }
  };

  const handleImportJSON = async () => {
    const result = await importJSONFile();
    if (result.success && result.data) {
      try {
        const data = JSON.parse(result.data);
        if (data.fileName && data.slides) {
          setFileName(data.fileName);
          setSlides(data.slides);
          setCurrentSlideIndex(0);
          showToast('Présentation importée avec succès', 'success');
        } else {
          showToast('Format de fichier invalide', 'error');
        }
      } catch (error) {
        showToast('Erreur lors de l\'import', 'error');
      }
    } else if (result.error) {
      showToast(result.error, 'error');
    }
  };

  const handleExportJSON = () => {
    const data = { fileName, slides };
    exportJSON(data, fileName);
    showToast('Présentation exportée', 'success');
  };

  const handleExport = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
  <style>
    body { margin: 0; font-family: 'Calibri', sans-serif; }
    .slide { width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; box-sizing: border-box; }
    .slide h1 { font-size: 3em; margin-bottom: 20px; }
    .slide p { font-size: 1.5em; }
  </style>
</head>
<body>
${slides.map((slide) => `
  <div class="slide" style="background: linear-gradient(135deg, ${getGradientColors(slide.background)}); color: white;">
    <h1>${slide.title}</h1>
    <p>${slide.content}</p>
  </div>
`).join('')}
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Présentation exportée', 'success');
  };

  const getGradientColors = (gradient: string): string => {
    const colors: Record<string, string> = {
      'from-blue-500 to-purple-600': '#3b82f6, #9333ea',
      'from-green-500 to-teal-600': '#22c55e, #0d9488',
      'from-orange-500 to-red-600': '#f97316, #dc2626',
      'from-pink-500 to-rose-600': '#ec4899, #e11d48',
      'from-indigo-500 to-blue-600': '#6366f1, #2563eb',
      'from-gray-700 to-gray-900': '#374151, #111827',
      'from-white to-gray-100': '#ffffff, #f3f4f6',
    };
    return colors[gradient] || '#3b82f6, #9333ea';
  };

  if (isPresenting) {
    return (
      <div className="h-screen w-screen relative bg-black">
        <div className={`h-full w-full bg-gradient-to-br ${currentSlide.background} flex flex-col items-center justify-center p-12`}>
          <h1 className="text-6xl font-bold text-white mb-8 text-center">{currentSlide.title}</h1>
          <p className="text-3xl text-white/90 text-center">{currentSlide.content}</p>
          <div className="absolute bottom-8 right-8 flex gap-4">
            <button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 disabled:opacity-30 transition"
            >
              <i className="fas fa-arrow-left"></i> Précédent
            </button>
            <button
              onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 disabled:opacity-30 transition"
            >
              Suivant <i className="fas fa-arrow-right"></i>
            </button>
            <button
              onClick={() => setIsPresenting(false)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <i className="fas fa-times"></i> Quitter
            </button>
          </div>
          <div className="absolute bottom-8 left-8 text-white/70 text-sm">
            {currentSlideIndex + 1} / {slides.length}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'home', label: 'Accueil', icon: 'fas fa-home' },
    { id: 'insert', label: 'Insertion', icon: 'fas fa-plus' },
    { id: 'design', label: 'Création', icon: 'fas fa-paint-brush' },
    { id: 'transitions', label: 'Transitions', icon: 'fas fa-exchange-alt' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Title Bar */}
      <div className="bg-[#d24726] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-white/10 p-1 rounded transition">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <i className="fas fa-file-powerpoint text-sm"></i>
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
              {fileName} - PowerPoint
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="hover:bg-white/10 p-1.5 rounded transition" title="Sauvegarder">
            <i className="fas fa-save text-sm"></i>
          </button>
          <button onClick={handleLoad} className="hover:bg-white/10 p-1.5 rounded transition" title="Charger">
            <i className="fas fa-folder-open text-sm"></i>
          </button>
          <button onClick={handleImportJSON} className="hover:bg-white/10 p-1.5 rounded transition" title="Importer">
            <i className="fas fa-file-import text-sm"></i>
          </button>
          <button onClick={handleExportJSON} className="hover:bg-white/10 p-1.5 rounded transition" title="Exporter">
            <i className="fas fa-file-export text-sm"></i>
          </button>
          <button 
            onClick={() => setIsPresenting(true)}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition"
            title="Présenter"
          >
            <i className="fas fa-play text-sm"></i>
          </button>
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
                  ? 'text-[#d24726] border-b-2 border-[#d24726]'
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
            <button 
              onClick={addSlide}
              className="flex flex-col items-center gap-1 px-4 py-2 hover:bg-gray-100 rounded transition"
            >
              <i className="fas fa-plus-circle text-xl text-[#d24726]"></i>
              <span className="text-xs">Nouvelle diapo</span>
            </button>
            <div className="border-l border-gray-200 h-12"></div>
            <div className="flex items-center gap-2">
              <select className="toolbar-select" defaultValue="Titre et contenu">
                <option>Diapositive vierge</option>
                <option>Titre et contenu</option>
                <option>Titre seulement</option>
                <option>Deux colonnes</option>
              </select>
            </div>
            <div className="border-l border-gray-200 h-12"></div>
            <div className="flex items-center gap-2">
              <button className="toolbar-btn" title="Coupe">
                <i className="fas fa-cut"></i>
              </button>
              <button className="toolbar-btn" title="Copier">
                <i className="fas fa-copy"></i>
              </button>
              <button className="toolbar-btn" title="Coller">
                <i className="fas fa-paste"></i>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">Thèmes:</span>
            <div className="flex gap-2">
              {backgrounds.map((bg) => (
                <button
                  key={bg}
                  onClick={() => updateSlide('background', bg)}
                  className={`w-16 h-12 rounded bg-gradient-to-br ${bg} border-2 ${
                    currentSlide.background === bg ? 'border-[#d24726]' : 'border-transparent'
                  } hover:scale-110 transition`}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insert' && (
          <div className="flex items-center gap-4">
            <button className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition">
              <i className="fas fa-image text-xl text-[#d24726]"></i>
              <span className="text-xs">Image</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition">
              <i className="fas fa-shapes text-xl text-[#d24726]"></i>
              <span className="text-xs">Formes</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition">
              <i className="fas fa-chart-bar text-xl text-[#d24726]"></i>
              <span className="text-xs">Graphique</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition">
              <i className="fas fa-video text-xl text-[#d24726]"></i>
              <span className="text-xs">Vidéo</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Thumbnails */}
        <div className="w-56 bg-gray-50 border-r border-gray-200 overflow-y-auto p-3 space-y-2">
          <div className="text-xs font-semibold text-gray-600 mb-2 px-1">Diapositives</div>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => setCurrentSlideIndex(index)}
              className={`relative bg-gradient-to-br ${slide.background} rounded-lg p-3 cursor-pointer transition-all ${
                index === currentSlideIndex ? 'ring-2 ring-[#d24726] scale-105' : 'hover:scale-102'
              }`}
              style={{ aspectRatio: '16/9' }}
            >
              <div className="text-white text-xs">
                <p className="font-bold truncate">{slide.title}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteSlide(index); }}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 opacity-0 hover:opacity-100 transition"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="absolute bottom-1 left-1 text-white/70 text-xs font-semibold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Slide Editor */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-200">
          {/* Preview */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div
              className={`w-full max-w-4xl bg-gradient-to-br ${currentSlide.background} rounded-lg shadow-2xl p-12`}
              style={{ aspectRatio: '16/9' }}
            >
              <input
                type="text"
                value={currentSlide.title}
                onChange={(e) => updateSlide('title', e.target.value)}
                className="w-full text-4xl font-bold text-white bg-transparent border-none outline-none mb-6 text-center"
                placeholder="Titre"
              />
              <textarea
                value={currentSlide.content}
                onChange={(e) => updateSlide('content', e.target.value)}
                className="w-full text-xl text-white/90 bg-transparent border-none outline-none resize-none text-center"
                placeholder="Contenu"
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#d24726] text-white px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span>Diapositive {currentSlideIndex + 1} sur {slides.length}</span>
          <span>{slides.length} diapositive{slides.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPresenting(true)}
            className="hover:bg-white/10 px-2 py-0.5 rounded transition"
          >
            <i className="fas fa-play"></i> Diaporama
          </button>
          <div className="flex items-center gap-2">
            <button className="hover:bg-white/10 p-1 rounded transition">
              <i className="fas fa-search-minus"></i>
            </button>
            <span>100%</span>
            <button className="hover:bg-white/10 p-1 rounded transition">
              <i className="fas fa-search-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
