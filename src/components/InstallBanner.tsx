import { useInstallPrompt } from '../hooks/useInstallPrompt';

export default function InstallBanner() {
  const { isInstallable, isInstalled, install } = useInstallPrompt();

  if (isInstalled || !isInstallable) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 flex items-center justify-between text-sm shadow-md">
      <div className="flex items-center gap-2">
        <i className="fas fa-download"></i>
        <span>Installez <strong>WordRapide</strong> sur votre ordinateur pour une meilleure expérience !</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={install}
          className="bg-white text-blue-600 px-3 py-1 rounded font-medium hover:bg-blue-50 transition text-xs"
        >
          <i className="fas fa-desktop mr-1"></i> Installer
        </button>
        <span className="text-xs opacity-70 hidden sm:inline">
          (Mac & Windows)
        </span>
      </div>
    </div>
  );
}
