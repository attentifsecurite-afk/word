interface InstallPageProps {
  onClose: () => void;
}

export default function InstallPage({ onClose }: InstallPageProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center text-white max-w-md">
        <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-4xl">W</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">WordRapide</h1>
        <p className="text-blue-200 mb-6">Éditeur de texte professionnel</p>
        <button onClick={onClose} className="w-full py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50">
          Fermer
        </button>
      </div>
    </div>
  );
}
