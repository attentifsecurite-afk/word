import { useInstallPrompt } from '../hooks/useInstallPrompt';

interface InstallPageProps {
  onClose: () => void;
}

export default function InstallPage({ onClose }: InstallPageProps) {
  const { isInstallable, isInstalled, install } = useInstallPrompt();

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center z-50 p-4 overflow-y-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        {/* Main card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center text-white">
          {/* App icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <span className="text-white font-bold text-5xl">W</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">WordRapide</h1>
          <p className="text-blue-200 text-lg mb-8">Éditeur de texte professionnel</p>

          {/* Install button */}
          {isInstalled ? (
            <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-6 mb-8">
              <i className="fas fa-check-circle text-4xl text-green-400 mb-3"></i>
              <p className="text-lg font-medium text-green-200">Application déjà installée !</p>
              <p className="text-sm text-green-300 mt-1">WordRapide est disponible sur votre ordinateur</p>
            </div>
          ) : (
            <>
              <button
                onClick={handleInstall}
                disabled={!isInstallable}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl mb-6 ${
                  isInstallable
                    ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-white/20'
                    : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
              >
                <i className="fas fa-download mr-3"></i>
                {isInstallable ? 'Installer sur mon ordinateur' : 'Installation en cours...'}
              </button>

              {!isInstallable && (
                <p className="text-sm text-blue-200 mb-6">
                  <i className="fas fa-info-circle mr-1"></i>
                  Le bouton d'installation apparaîtra automatiquement quand votre navigateur le supporte
                </p>
              )}
            </>
          )}

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            <div className="bg-white/5 rounded-xl p-3">
              <i className="fas fa-wifi text-blue-300 text-xl mb-2"></i>
              <p className="text-xs text-blue-200">Mode hors-ligne</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <i className="fas fa-bolt text-yellow-300 text-xl mb-2"></i>
              <p className="text-xs text-blue-200">Ultra rapide</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <i className="fas fa-lock text-green-300 text-xl mb-2"></i>
              <p className="text-xs text-blue-200">100% privé</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <i className="fas fa-desktop text-purple-300 text-xl mb-2"></i>
              <p className="text-xs text-blue-200">Mac & Windows</p>
            </div>
          </div>

          {/* Manual install instructions */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-blue-200 mb-4">Installation manuelle :</p>
            <div className="grid md:grid-cols-2 gap-3 text-left">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-300 mb-1">
                  <i className="fab fa-chrome mr-1"></i> Chrome
                </p>
                <p className="text-xs text-blue-200">Cliquez sur l'icône ⊕ dans la barre d'adresse</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-300 mb-1">
                  <i className="fab fa-edge mr-1"></i> Edge
                </p>
                <p className="text-xs text-blue-200">Menu → Applications → Installer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-300/50 text-xs mt-6">
          WordRapide v1.0 — Application web progressive (PWA)
        </p>
      </div>
    </div>
  );
}
