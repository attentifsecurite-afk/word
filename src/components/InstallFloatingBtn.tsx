import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { useEffect, useState } from 'react';

export default function InstallFloatingBtn() {
  const { isInstallable, isInstalled, install } = useInstallPrompt();
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Show button after 2 seconds if installable
  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled]);

  // Auto-trigger after showing
  useEffect(() => {
    if (show && !clicked) {
      const timer = setTimeout(() => {
        install();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [show, clicked, install]);

  if (isInstalled || !show) return null;

  const handleClick = async () => {
    setClicked(true);
    await install();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 font-semibold animate-bounce-slow"
      style={{
        animation: 'bounce-slow 2s ease-in-out infinite',
      }}
    >
      <i className="fas fa-download"></i>
      <span>Installer l'app</span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></span>
    </button>
  );
}
