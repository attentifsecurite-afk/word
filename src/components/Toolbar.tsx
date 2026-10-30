import { RefObject, useState } from 'react';

interface ToolbarProps {
  editorRef: RefObject<HTMLDivElement>;
}

const FONT_FAMILIES = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Segoe UI',
  'Comic Sans MS',
  'Impact',
  'Trebuchet MS',
  'Palatino Linotype',
];

const FONT_SIZES = ['1', '2', '3', '4', '5', '6', '7'];

const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#cccccc',
  '#ffffff', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71',
  '#1abc9c', '#3498db', '#9b59b6', '#e91e63', '#795548',
];

export default function Toolbar({ editorRef }: ToolbarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const execCmd = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    execCmd('fontName', e.target.value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    execCmd('fontSize', e.target.value);
  };

  const handleInsertLink = () => {
    const url = prompt('Entrez l\'URL :');
    if (url) {
      execCmd('createLink', url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt('Entrez l\'URL de l\'image :');
    if (url) {
      execCmd('insertImage', url);
    }
  };

  const handleInsertTable = () => {
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
  };

  const handleUndo = () => execCmd('undo');
  const handleRedo = () => execCmd('redo');

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-1.5 flex flex-wrap items-center gap-1">
      {/* Undo/Redo */}
      <div className="flex items-center gap-0.5 border-r border-gray-200 pr-2 mr-1">
        <button onClick={handleUndo} className="toolbar-btn" title="Annuler (Ctrl+Z)">
          <i className="fas fa-undo"></i>
        </button>
        <button onClick={handleRedo} className="toolbar-btn" title="Rétablir (Ctrl+Y)">
          <i className="fas fa-redo"></i>
        </button>
      </div>

      {/* Font Family */}
      <select
        onChange={handleFontChange}
        className="toolbar-select"
        defaultValue="Arial"
        title="Police"
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>

      {/* Font Size */}
      <select
        onChange={handleSizeChange}
        className="toolbar-select w-16"
        defaultValue="3"
        title="Taille"
      >
        {FONT_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* Text Formatting */}
      <div className="flex items-center gap-0.5">
        <button onClick={() => execCmd('bold')} className="toolbar-btn font-bold" title="Gras (Ctrl+B)">
          <i className="fas fa-bold"></i>
        </button>
        <button onClick={() => execCmd('italic')} className="toolbar-btn italic" title="Italique (Ctrl+I)">
          <i className="fas fa-italic"></i>
        </button>
        <button onClick={() => execCmd('underline')} className="toolbar-btn underline" title="Souligné (Ctrl+U)">
          <i className="fas fa-underline"></i>
        </button>
        <button onClick={() => execCmd('strikeThrough')} className="toolbar-btn line-through" title="Barré">
          <i className="fas fa-strikethrough"></i>
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* Colors */}
      <div className="relative">
        <button
          onClick={() => { setShowColorPicker(!showColorPicker); setShowBgColorPicker(false); }}
          className="toolbar-btn"
          title="Couleur du texte"
        >
          <i className="fas fa-font" style={{ color: '#e74c3c' }}></i>
        </button>
        {showColorPicker && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg p-2 z-50">
            <div className="grid grid-cols-5 gap-1">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition"
                  style={{ backgroundColor: color }}
                  onClick={() => { execCmd('foreColor', color); setShowColorPicker(false); }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => { setShowBgColorPicker(!showBgColorPicker); setShowColorPicker(false); }}
          className="toolbar-btn"
          title="Couleur de fond"
        >
          <i className="fas fa-highlighter" style={{ color: '#f1c40f' }}></i>
        </button>
        {showBgColorPicker && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg p-2 z-50">
            <div className="grid grid-cols-5 gap-1">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition"
                  style={{ backgroundColor: color }}
                  onClick={() => { execCmd('hiliteColor', color); setShowBgColorPicker(false); }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* Alignment */}
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
        <button onClick={() => execCmd('justifyFull')} className="toolbar-btn" title="Justifier">
          <i className="fas fa-align-justify"></i>
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* Lists */}
      <div className="flex items-center gap-0.5">
        <button onClick={() => execCmd('insertUnorderedList')} className="toolbar-btn" title="Liste à puces">
          <i className="fas fa-list-ul"></i>
        </button>
        <button onClick={() => execCmd('insertOrderedList')} className="toolbar-btn" title="Liste numérotée">
          <i className="fas fa-list-ol"></i>
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* Insert */}
      <div className="flex items-center gap-0.5">
        <button onClick={handleInsertLink} className="toolbar-btn" title="Insérer un lien">
          <i className="fas fa-link"></i>
        </button>
        <button onClick={handleInsertImage} className="toolbar-btn" title="Insérer une image">
          <i className="fas fa-image"></i>
        </button>
        <button onClick={handleInsertTable} className="toolbar-btn" title="Insérer un tableau">
          <i className="fas fa-table"></i>
        </button>
        <button onClick={() => execCmd('insertHorizontalRule')} className="toolbar-btn" title="Ligne horizontale">
          <i className="fas fa-minus"></i>
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* Indent */}
      <div className="flex items-center gap-0.5">
        <button onClick={() => execCmd('outdent')} className="toolbar-btn" title="Diminuer le retrait">
          <i className="fas fa-outdent"></i>
        </button>
        <button onClick={() => execCmd('indent')} className="toolbar-btn" title="Augmenter le retrait">
          <i className="fas fa-indent"></i>
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* Clear formatting */}
      <button onClick={() => execCmd('removeFormat')} className="toolbar-btn" title="Effacer la mise en forme">
        <i className="fas fa-eraser"></i>
      </button>
    </div>
  );
}
