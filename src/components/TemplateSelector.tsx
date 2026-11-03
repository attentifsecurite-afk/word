import { useState } from 'react';
import { wordTemplates, DocumentTemplate } from '../utils/templates';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: DocumentTemplate) => void;
}

export default function TemplateSelector({ isOpen, onClose, onSelect }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tous', icon: 'fas fa-th' },
    { id: 'business', name: 'Business', icon: 'fas fa-briefcase' },
    { id: 'personal', name: 'Personnel', icon: 'fas fa-user' },
    { id: 'academic', name: 'Académique', icon: 'fas fa-graduation-cap' },
    { id: 'creative', name: 'Créatif', icon: 'fas fa-paint-brush' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? wordTemplates 
    : wordTemplates.filter(t => t.category === selectedCategory);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              <i className="fas fa-file-alt mr-2 text-blue-600"></i>
              Choisir un modèle
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Commencez avec un modèle professionnel
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
          >
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        {/* Categories */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <i className={`${cat.icon} mr-2`}></i>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => {
                  onSelect(template);
                  onClose();
                }}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition">
                    <i className={`${template.icon} text-xl text-blue-600 dark:text-blue-400`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-900 rounded-b-xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <i className="fas fa-info-circle mr-1"></i>
            Cliquez sur un modèle pour commencer
          </p>
        </div>
      </div>
    </div>
  );
}
