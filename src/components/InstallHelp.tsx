interface InstallHelpProps {
  onClose: () => void;
}

export default function InstallHelp({ onClose }: InstallHelpProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Comment installer ?</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold text-blue-800">Chrome</p>
            <p className="text-sm text-blue-700">Cliquez sur ⊕ dans la barre d'adresse</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-800">Edge</p>
            <p className="text-sm text-gray-700">Menu → Applications → Installer</p>
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
          Compris !
        </button>
      </div>
    </div>
  );
}
