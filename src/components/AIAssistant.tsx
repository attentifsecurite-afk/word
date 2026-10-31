import { RefObject } from 'react';

interface AIAssistantProps {
  editorRef: RefObject<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 flex flex-col z-40">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fas fa-robot text-xl"></i>
          <div>
            <h3 className="font-semibold text-sm">Assistant IA</h3>
            <p className="text-xs text-white/70">Propulsé par Gemini</p>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="flex-1 p-4 text-center text-gray-400 mt-12">
        <i className="fas fa-robot text-4xl mb-3"></i>
        <p className="text-sm">Configurez votre clé API Gemini dans les paramètres</p>
      </div>
    </div>
  );
}
