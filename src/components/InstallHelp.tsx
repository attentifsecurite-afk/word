import { useState, useEffect } from 'react';

interface InstallHelpProps {
  onClose: () => void;
}

export default function InstallHelp({ onClose }: InstallHelpProps) {
  const [platform, setPlatform] = useState<'auto' | 'mac' | 'windows'>('auto');
  const [detectedOS, setDetectedOS] = useState('');

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) {
      setDetectedOS('mac');
    } else if (ua.includes('win')) {
      setDetectedOS('windows');
    }
  }, []);

  const currentOS = platform === 'auto' ? detectedOS : platform;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-desktop text-2xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold">Installer WordRapide</h2>
                <p className="text-blue-100 text-sm">Application de bureau pour {detectedOS === 'mac' ? 'macOS' : detectedOS === 'windows' ? 'Windows' : 'votre ordinateur'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* OS Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setPlatform('auto')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                platform === 'auto' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
            >
              <i className="fas fa-magic mr-1"></i> Auto
            </button>
            <button
              onClick={() => setPlatform('mac')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                platform === 'mac' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
            >
              <i className="fab fa-apple mr-1"></i> macOS
            </button>
            <button
              onClick={() => setPlatform('windows')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                platform === 'windows' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
            >
              <i className="fab fa-windows mr-1"></i> Windows
            </button>
          </div>

          {/* Instructions */}
          {currentOS === 'mac' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  <i className="fab fa-chrome mr-2"></i> Avec Google Chrome
                </h3>
                <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                  <li>Cliquez sur l'icône <strong>d'installation</strong> dans la barre d'adresse (⊕)</li>
                  <li>Ou allez dans <strong>Menu → Plus d'outils → Créer un raccourci</strong></li>
                  <li>Cochez <strong>"Ouvrir dans une fenêtre"</strong></li>
                  <li>Cliquez sur <strong>Créer</strong></li>
                </ol>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  <i className="fab fa-edge mr-2"></i> Avec Microsoft Edge
                </h3>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Cliquez sur <strong>...</strong> (menu) dans la barre d'outils</li>
                  <li>Allez dans <strong>Applications → Installer ce site en tant qu'application</strong></li>
                  <li>Cliquez sur <strong>Installer</strong></li>
                </ol>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  <i className="fab fa-safari mr-2"></i> Avec Safari
                </h3>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Cliquez sur <strong>Fichier → Ajouter au Dock</strong></li>
                  <li>L'application sera disponible dans votre Dock</li>
                </ol>
              </div>
            </div>
          )}

          {currentOS === 'windows' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  <i className="fab fa-chrome mr-2"></i> Avec Google Chrome
                </h3>
                <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                  <li>Cliquez sur l'icône <strong>d'installation</strong> dans la barre d'adresse (⊕)</li>
                  <li>Ou allez dans <strong>Menu → Installer WordRapide</strong></li>
                  <li>Cliquez sur <strong>Installer</strong> dans la fenêtre popup</li>
                </ol>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  <i className="fab fa-edge mr-2"></i> Avec Microsoft Edge
                </h3>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Cliquez sur <strong>...</strong> (menu) dans la barre d'outils</li>
                  <li>Allez dans <strong>Applications → Installer ce site en tant qu'application</strong></li>
                  <li>Cliquez sur <strong>Installer</strong></li>
                  <li>L'application apparaîtra dans le menu Démarrer</li>
                </ol>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                  <i className="fas fa-info-circle mr-2"></i> Astuce
                </h3>
                <p className="text-sm text-green-700">
                  Une fois installée, WordRapide s'ouvre comme une application native avec sa propre fenêtre, 
                  sans la barre d'adresse du navigateur. Vous pouvez la retrouver dans le menu Démarrer.
                </p>
              </div>
            </div>
          )}

          {!currentOS && (
            <div className="text-center py-8">
              <i className="fas fa-globe text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Sélectionnez votre système d'exploitation ci-dessus pour voir les instructions d'installation.</p>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-700 mb-3">Avantages de l'installation :</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-check text-green-500"></i>
                <span>Fonctionne hors ligne</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-check text-green-500"></i>
                <span>Fenêtre dédiée</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-check text-green-500"></i>
                <span>Raccourci bureau</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <i className="fas fa-check text-green-500"></i>
                <span>Lancement rapide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Compris !
          </button>
        </div>
      </div>
    </div>
  );
}
