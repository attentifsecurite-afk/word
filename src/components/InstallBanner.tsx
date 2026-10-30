import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { useEffect, useState } from 'react';

export default function InstallBanner() {
  const { isInstallable, isInstalled, install } = useInstallPrompt();
  const [autoTriggered, setAutoTriggered] = useState(false);
  const isInIframe = window.self !== window.top;

  // Auto-trigger install prompt when banner appears (sauf dans iframe)
  useEffect(() => {
    if (isInstallable && !isInstalled && !autoTriggered && !isInIframe) {
      const timer = setTimeout(() => {
        install();
        setAutoTriggered(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, autoTriggered, install, isInIframe]);

  // Ne pas afficher dans un iframe ou si déjà installé
  if (isInstalled || !isInstallable || isInIframe) return null;

  return (
    <div className="install-banner bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 flex items-center justify-between text-sm shadow-md">
      <div className="flex items-center gap-2">
        <i className="fas fa-download animate-pulse"></i>
        <span>Installez <strong>WordRapide</strong> sur votre ordinateur !</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => install()}
          className="bg-white text-blue-600 px-3 py-1 rounded font-medium hover:bg-blue-50 transition text-xs"
        >
          <i className="fas fa-desktop mr-1"></i> Installer
        </button>
      </div>
    </div>
  );
}
