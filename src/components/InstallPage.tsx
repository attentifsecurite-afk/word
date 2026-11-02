interface InstallPageProps {
  onClose: () => void;
}

export default function InstallPage({ onClose }: InstallPageProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center text-white max-w-md">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1 p-2">
            <div className="bg-blue-700 rounded text-xs font-bold flex items-center justify-center w-6 h-6">W</div>
            <div className="bg-green-700 rounded text-xs font-bold flex items-center justify-center w-6 h-6">X</div>
            <div className="bg-orange-700 rounded text-xs font-bold flex items-center justify-center w-6 h-6">P</div>
            <div className="bg-blue-500 rounded text-xs font-bold flex items-center justify-center w-6 h-6">O</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">OfficeRapide</h1>
        <p className="text-blue-200 mb-6">Suite bureautique complète</p>
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="bg-white/10 rounded p-2">
            <i className="fas fa-file-word text-blue-300 text-lg"></i>
            <p className="text-xs mt-1">Word</p>
          </div>
          <div className="bg-white/10 rounded p-2">
            <i className="fas fa-file-excel text-green-300 text-lg"></i>
            <p className="text-xs mt-1">Excel</p>
          </div>
          <div className="bg-white/10 rounded p-2">
            <i className="fas fa-file-powerpoint text-orange-300 text-lg"></i>
            <p className="text-xs mt-1">PowerPoint</p>
          </div>
          <div className="bg-white/10 rounded p-2">
            <i className="fas fa-envelope text-blue-300 text-lg"></i>
            <p className="text-xs mt-1">Outlook</p>
          </div>
        </div>
        <button onClick={onClose} className="w-full py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50">
          Fermer
        </button>
      </div>
    </div>
  );
}
