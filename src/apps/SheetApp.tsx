import { useState, useCallback } from 'react';
import ToastContainer, { showToast } from '../components/Toast';

interface SheetAppProps {
  onBack: () => void;
}

interface CellData {
  value: string;
  formula?: string;
}

export default function SheetApp({ onBack }: SheetAppProps) {
  const ROWS = 50;
  const COLS = 26;
  const [fileName, setFileName] = useState('Feuil1');
  const [isEditing, setIsEditing] = useState(false);
  const [cells, setCells] = useState<Record<string, CellData>>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const getCellKey = (row: number, col: number): string => {
    const colLetter = String.fromCharCode(65 + col);
    return `${colLetter}${row + 1}`;
  };

  const getCellValue = useCallback((key: string): string => {
    const cell = cells[key];
    if (!cell) return '';
    
    if (cell.formula) {
      try {
        return evaluateFormula(cell.formula);
      } catch {
        return '#ERROR';
      }
    }
    return cell.value;
  }, [cells]);

  const evaluateFormula = (formula: string): string => {
    if (!formula.startsWith('=')) return formula;
    
    const expr = formula.substring(1);
    
    const sumMatch = expr.match(/^SUM\(([A-Z])(\d+):([A-Z])(\d+)\)$/);
    if (sumMatch) {
      const [, startCol, startRow, endCol, endRow] = sumMatch;
      let sum = 0;
      for (let c = startCol.charCodeAt(0); c <= endCol.charCodeAt(0); c++) {
        for (let r = parseInt(startRow); r <= parseInt(endRow); r++) {
          const key = `${String.fromCharCode(c)}${r}`;
          const val = parseFloat(getCellValue(key));
          if (!isNaN(val)) sum += val;
        }
      }
      return sum.toString();
    }

    const avgMatch = expr.match(/^AVG\(([A-Z])(\d+):([A-Z])(\d+)\)$/);
    if (avgMatch) {
      const [, startCol, startRow, endCol, endRow] = avgMatch;
      let sum = 0;
      let count = 0;
      for (let c = startCol.charCodeAt(0); c <= endCol.charCodeAt(0); c++) {
        for (let r = parseInt(startRow); r <= parseInt(endRow); r++) {
          const key = `${String.fromCharCode(c)}${r}`;
          const val = parseFloat(getCellValue(key));
          if (!isNaN(val)) {
            sum += val;
            count++;
          }
        }
      }
      return count > 0 ? (sum / count).toString() : '0';
    }

    const cellRef = expr.match(/^([A-Z])(\d+)$/);
    if (cellRef) {
      return getCellValue(expr);
    }

    try {
      const replaced = expr.replace(/([A-Z])(\d+)/g, (match) => {
        const val = parseFloat(getCellValue(match));
        return isNaN(val) ? '0' : val.toString();
      });
      const result = Function(`"use strict"; return (${replaced})`)();
      return result.toString();
    } catch {
      return '#ERROR';
    }
  };

  const handleCellClick = (key: string) => {
    setSelectedCell(key);
    setEditValue(cells[key]?.formula || cells[key]?.value || '');
  };

  const handleCellChange = (value: string) => {
    if (!selectedCell) return;
    setEditValue(value);
  };

  const handleCellBlur = () => {
    if (!selectedCell) return;
    
    const newCells = { ...cells };
    if (editValue.startsWith('=')) {
      newCells[selectedCell] = { value: '', formula: editValue };
    } else {
      newCells[selectedCell] = { value: editValue };
    }
    setCells(newCells);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellBlur();
      if (selectedCell) {
        const col = selectedCell.charAt(0);
        const row = parseInt(selectedCell.substring(1));
        if (row < ROWS) {
          const nextKey = `${col}${row + 1}`;
          handleCellClick(nextKey);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleCellBlur();
      if (selectedCell) {
        const col = selectedCell.charCodeAt(0);
        const row = selectedCell.substring(1);
        if (col < 90 + COLS - 1) {
          const nextKey = `${String.fromCharCode(col + 1)}${row}`;
          handleCellClick(nextKey);
        }
      }
    }
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setIsEditing(false);
  };

  const handleSave = () => {
    const data = { fileName, cells };
    localStorage.setItem('sheetrapide_doc', JSON.stringify(data));
    showToast('Tableur sauvegardé !', 'success');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('sheetrapide_doc');
    if (saved) {
      const data = JSON.parse(saved);
      setFileName(data.fileName);
      setCells(data.cells);
      showToast('Tableur chargé !', 'success');
    } else {
      showToast('Aucun tableur sauvegardé', 'warning');
    }
  };

  const handleExport = () => {
    let csv = '';
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        const key = getCellKey(r, c);
        row.push(getCellValue(key));
      }
      csv += row.join(',') + '\n';
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Tableur exporté en CSV', 'success');
  };

  const tabs = [
    { id: 'home', label: 'Accueil', icon: 'fas fa-home' },
    { id: 'insert', label: 'Insertion', icon: 'fas fa-plus' },
    { id: 'formulas', label: 'Formules', icon: 'fas fa-function' },
    { id: 'data', label: 'Données', icon: 'fas fa-database' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Title Bar */}
      <div className="bg-[#217346] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-white/10 p-1 rounded transition">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <i className="fas fa-file-excel text-sm"></i>
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
              {fileName} - Excel
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="hover:bg-white/10 p-1.5 rounded transition" title="Sauvegarder">
            <i className="fas fa-save text-sm"></i>
          </button>
          <button onClick={handleExport} className="hover:bg-white/10 p-1.5 rounded transition" title="Exporter">
            <i className="fas fa-download text-sm"></i>
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
                  ? 'text-[#217346] border-b-2 border-[#217346]'
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
            <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
              <button onClick={() => document.execCommand('cut')} className="toolbar-btn" title="Couper">
                <i className="fas fa-cut"></i>
              </button>
              <button onClick={() => document.execCommand('copy')} className="toolbar-btn" title="Copier">
                <i className="fas fa-copy"></i>
              </button>
              <button onClick={() => document.execCommand('paste')} className="toolbar-btn" title="Coller">
                <i className="fas fa-paste"></i>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select className="toolbar-select" defaultValue="Calibri">
                <option>Calibri</option>
                <option>Arial</option>
                <option>Times New Roman</option>
              </select>
              <select className="toolbar-select w-16" defaultValue="11">
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>14</option>
              </select>
              <button className="toolbar-btn font-bold" title="Gras">
                <i className="fas fa-bold"></i>
              </button>
              <button className="toolbar-btn italic" title="Italique">
                <i className="fas fa-italic"></i>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'formulas' && (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (selectedCell) {
                  const range = prompt('Plage (ex: A1:A10) :', 'A1:A10');
                  if (range) {
                    setEditValue(`=SUM(${range})`);
                    handleCellBlur();
                  }
                }
              }}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              <i className="fas fa-calculator text-xl text-[#217346]"></i>
              <span className="text-xs">Somme</span>
            </button>
            <button 
              onClick={() => {
                if (selectedCell) {
                  const range = prompt('Plage (ex: A1:A10) :', 'A1:A10');
                  if (range) {
                    setEditValue(`=AVG(${range})`);
                    handleCellBlur();
                  }
                }
              }}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              <i className="fas fa-chart-line text-xl text-[#217346]"></i>
              <span className="text-xs">Moyenne</span>
            </button>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => showToast('Fonction de tri à venir', 'info')}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              <i className="fas fa-sort text-xl text-[#217346]"></i>
              <span className="text-xs">Trier</span>
            </button>
            <button 
              onClick={() => showToast('Fonction de filtre à venir', 'info')}
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              <i className="fas fa-filter text-xl text-[#217346]"></i>
              <span className="text-xs">Filtrer</span>
            </button>
          </div>
        )}
      </div>

      {/* Formula Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="w-16 text-center font-mono text-sm font-semibold bg-gray-100 py-1 rounded border border-gray-300">
          {selectedCell || '-'}
        </div>
        <span className="text-gray-400 font-semibold">fx</span>
        <input
          type="text"
          value={editValue}
          onChange={(e) => handleCellChange(e.target.value)}
          onBlur={handleCellBlur}
          onKeyDown={handleKeyDown}
          placeholder="Entrez une valeur ou formule (=SUM(A1:A10))"
          className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm font-mono focus:ring-2 focus:ring-[#217346] focus:border-transparent"
        />
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="border-collapse w-full">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="border border-gray-300 px-2 py-1 w-12 text-xs font-semibold text-gray-600 bg-gray-200"></th>
              {Array.from({ length: COLS }, (_, i) => (
                <th key={i} className="border border-gray-300 px-2 py-1 w-24 text-xs font-semibold text-gray-600 bg-gray-200">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }, (_, row) => (
              <tr key={row}>
                <td className="border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-600 text-center bg-gray-200">
                  {row + 1}
                </td>
                {Array.from({ length: COLS }, (_, col) => {
                  const key = getCellKey(row, col);
                  const isSelected = selectedCell === key;
                  const value = getCellValue(key);
                  return (
                    <td
                      key={col}
                      onClick={() => handleCellClick(key)}
                      className={`border border-gray-300 px-2 py-1 text-sm cursor-cell min-w-[100px] ${
                        isSelected ? 'bg-blue-50 ring-2 ring-[#217346] ring-inset' : 'hover:bg-gray-50'
                      }`}
                    >
                      {isSelected ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => handleCellChange(e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={handleKeyDown}
                          className="w-full outline-none bg-transparent"
                          autoFocus
                        />
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="bg-[#217346] text-white px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span>Prêt</span>
          <span>Calculé</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{ROWS} lignes × {COLS} colonnes</span>
          <div className="flex items-center gap-2">
            <button className="hover:bg-white/10 p-1 rounded transition">
              <i className="fas fa-th"></i>
            </button>
            <button className="hover:bg-white/10 p-1 rounded transition">
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
