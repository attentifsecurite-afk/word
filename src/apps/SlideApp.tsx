import { useState } from 'react';
import ToastContainer, { showToast } from '../components/Toast';

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
  const [fileName, setFileName] = useState('Présentation sans titre');
  const [isEditing, setIsEditing] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, title: 'Titre de la présentation', content: 'Sous-titre ou description', background: 'from-blue-500 to-purple-600' }
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);

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
    const data = { fileName, slides };
    localStorage.setItem('sliderapide_doc', JSON.stringify(data));
    showToast('Présentation sauvegardée !', 'success');
  };

  const handleLoad = () => {
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

  const handleExport = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
  <style>
    body { margin: 0; font-family: 'Segoe UI', sans-serif; }
    .slide { width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; box-sizing: border-box; }
    .slide h1 { font-size: 3em; margin-bottom: 20px; }
    .slide p { font-size: 1.5em; }
  </style>
</head>
<body>
${slides.map((slide, i) => `
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
      <div className="h-screen w-screen relative">
        <div className={`h-full w-full bg-gradient-to-br ${currentSlide.background} flex flex-col items-center justify-center p-12`}>
          <h1 className="text-6xl font-bold text-white mb-8 text-center">{currentSlide.title}</h1>
          <p className="text-3xl text-white/90 text-center">{currentSlide.content}</p>
          <div className="absolute bottom-8 right-8 flex gap-4">
            <button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 disabled:opacity-30"
            >
              <i className="fas fa-arrow-left"></i> Précédent
            </button>
            <button
              onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 disabled:opacity-30"
            >
              Suivant <i className="fas fa-arrow-right"></i>
            </button>
            <button
              onClick={() => setIsPresenting(false)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <i className="fas fa-times"></i> Quitter
            </button>
          </div>
          <div className="absolute bottom-8 left-8 text-white/70">
            {currentSlideIndex + 1} / {slides.length}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
          <i className="fas fa-arrow-left mr-1"></i> Retour
        </button>
        <div className="w-px h-6 bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
            <i className="fas fa-file-powerpoint text-white"></i>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              className="text-lg font-medium border-b-2 border-orange-500 outline-none px-1"
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
          <button onClick={addSlide} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-plus mr-1"></i> Ajouter
          </button>
          <button onClick={handleSave} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-save mr-1"></i> Sauvegarder
          </button>
          <button onClick={handleLoad} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-folder-open mr-1"></i> Charger
          </button>
          <button onClick={handleExport} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-download mr-1"></i> Exporter
          </button>
          <button
            onClick={() => setIsPresenting(true)}
            className="px-4 py-1.5 text-sm bg-orange-600 text-white hover:bg-orange-700 rounded transition"
          >
            <i className="fas fa-play mr-1"></i> Présenter
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Thumbnails */}
        <div className="w-48 bg-gray-200 overflow-y-auto p-2 space-y-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => setCurrentSlideIndex(index)}
              className={`relative bg-gradient-to-br ${slide.background} rounded-lg p-3 cursor-pointer transition-all ${
                index === currentSlideIndex ? 'ring-2 ring-orange-500 scale-105' : 'hover:scale-102'
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
              <div className="absolute bottom-1 left-1 text-white/70 text-xs">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Slide Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Preview */}
          <div className="flex-1 flex items-center justify-center p-8 bg-gray-300">
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

          {/* Background Selector */}
          <div className="bg-white border-t border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Arrière-plan :</p>
            <div className="flex gap-2">
              {backgrounds.map((bg) => (
                <button
                  key={bg}
                  onClick={() => updateSlide('background', bg)}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bg} border-2 ${
                    currentSlide.background === bg ? 'border-orange-500' : 'border-transparent'
                  } hover:scale-110 transition`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-orange-600 text-white px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span><i className="fas fa-file-powerpoint mr-1"></i> {fileName}</span>
          <span><i className="fas fa-images mr-1"></i> {slides.length} diapositive{slides.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Diapositive {currentSlideIndex + 1} / {slides.length}</span>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
