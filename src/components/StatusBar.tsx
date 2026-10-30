interface StatusBarProps {
  wordCount: number;
  charCount: number;
  fileName: string;
}

export default function StatusBar({ wordCount, charCount, fileName }: StatusBarProps) {
  return (
    <div className="bg-blue-600 text-white px-4 py-1.5 flex items-center justify-between text-xs">
      <div className="flex items-center gap-4">
        <span>
          <i className="fas fa-file-alt mr-1"></i> {fileName}
        </span>
        <span>
          <i className="fas fa-font mr-1"></i> {wordCount} mot{wordCount !== 1 ? 's' : ''}
        </span>
        <span>
          <i className="fas fa-text-width mr-1"></i> {charCount} caractère{charCount !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>
          <i className="fas fa-clock mr-1"></i> {new Date().toLocaleDateString('fr-FR')}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Prêt
        </span>
      </div>
    </div>
  );
}
