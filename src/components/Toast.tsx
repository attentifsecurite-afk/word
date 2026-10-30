import { useState, useEffect } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  icon: string;
}

let toastId = 0;
let addToastFn: ((message: string, type: Toast['type'], icon: string) => void) | null = null;

export function showToast(message: string, type: Toast['type'] = 'info', icon?: string) {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle',
  };
  if (addToastFn) {
    addToastFn(message, type, icon || icons[type]);
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (message: string, type: Toast['type'], icon: string) => {
      const id = ++toastId;
      setToasts(prev => [...prev, { id, message, type, icon }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3000);
    };
    return () => { addToastFn = null; };
  }, []);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${colors[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[250px] animate-slide-in`}
          style={{ animation: 'slide-in 0.3s ease-out' }}
        >
          <i className={toast.icon}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
