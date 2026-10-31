import { RefObject } from 'react';

interface ToolbarProps {
  editorRef: RefObject<HTMLDivElement>;
}

export default function Toolbar({ editorRef }: ToolbarProps) {
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

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-1.5 flex flex-wrap items-center gap-1">
      {/* Undo/Redo */}
      <div className="flex items-center gap-0.5 border-r border-gray-200 pr-2 mr-1">
        <button onClick={() => execCmd('undo')} className="toolbar-btn" title="Annuler">
          <i className="fas fa-undo"></i>
        </button>
        <button onClick={() => execCmd('redo')} className="toolbar-btn" title="Rétablir">
          <i className="fas fa-redo"></i>
        </button>
      </div>

      {/* Font Family */}
      <select onChange={handleFontChange} className="toolbar-select" defaultValue="Arial">
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
      </select>

      {/* Font Size */}
      <select onChange={handleSizeChange} className="toolbar-select w-16" defaultValue="3">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>

      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      {/* Text Formatting */}
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
      </div>

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
    </div>
  );
}
