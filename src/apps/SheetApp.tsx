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
  const [fileName, setFileName] = useState('Tableur sans titre');
  const [isEditing, setIsEditing] = useState(false);
  const [cells, setCells] = useState<Record<string, CellData>>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

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
    
    // Handle SUM function
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

    // Handle AVG function
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

    // Handle simple cell references
    const cellRef = expr.match(/^([A-Z])(\d+)$/);
    if (cellRef) {
      return getCellValue(expr);
    }

    // Handle basic arithmetic
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
      // Move to next row
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
      // Move to next column
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
          <i className="fas fa-arrow-left mr-1"></i> Retour
        </button>
        <div className="w-px h-6 bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
            <i className="fas fa-file-excel text-white"></i>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              className="text-lg font-medium border-b-2 border-green-500 outline-none px-1"
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
          <button onClick={handleSave} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-save mr-1"></i> Sauvegarder
          </button>
          <button onClick={handleLoad} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-folder-open mr-1"></i> Charger
          </button>
          <button onClick={handleExport} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition">
            <i className="fas fa-download mr-1"></i> Exporter CSV
          </button>
        </div>
      </header>

      {/* Formula Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2">
        <div className="w-16 text-center font-mono text-sm font-semibold bg-gray-100 py-1 rounded">
          {selectedCell || '-'}
        </div>
        <span className="text-gray-400">fx</span>
        <input
          type="text"
          value={editValue}
          onChange={(e) => handleCellChange(e.target.value)}
          onBlur={handleCellBlur}
          onKeyDown={handleKeyDown}
          placeholder="Entrez une valeur ou formule (=SUM(A1:A10))"
          className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="border-collapse w-full">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="border border-gray-300 px-2 py-1 w-12 text-xs font-semibold text-gray-600"></th>
              {Array.from({ length: COLS }, (_, i) => (
                <th key={i} className="border border-gray-300 px-2 py-1 w-24 text-xs font-semibold text-gray-600">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }, (_, row) => (
              <tr key={row}>
                <td className="border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-600 text-center bg-gray-50">
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
                        isSelected ? 'bg-blue-50 ring-2 ring-blue-500 ring-inset' : 'hover:bg-gray-50'
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
      <div className="bg-green-600 text-white px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span><i className="fas fa-table mr-1"></i> {fileName}</span>
          <span><i className="fas fa-th mr-1"></i> {ROWS} × {COLS} cellules</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/70">Formules: =SUM(), =AVG(), =A1+B1</span>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
