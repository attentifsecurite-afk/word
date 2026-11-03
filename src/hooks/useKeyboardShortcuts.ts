import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.forEach(shortcut => {
        const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : true;
        const altMatch = shortcut.alt ? e.altKey : true;

        if (e.key.toLowerCase() === shortcut.key.toLowerCase() && 
            ctrlMatch && shiftMatch && altMatch) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

export const globalShortcuts: KeyboardShortcut[] = [
  {
    key: 's',
    ctrl: true,
    action: () => console.log('Save'),
    description: 'Sauvegarder'
  },
  {
    key: 'z',
    ctrl: true,
    action: () => console.log('Undo'),
    description: 'Annuler'
  },
  {
    key: 'y',
    ctrl: true,
    action: () => console.log('Redo'),
    description: 'Rétablir'
  }
];
