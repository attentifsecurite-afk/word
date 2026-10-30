import { useState, useEffect } from 'react';
import { DocumentManager, SavedDocument } from '../utils/DocumentManager';

interface DocumentListProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadDocument: (doc: SavedDocument) => void;
}

export default function DocumentList({ isOpen, onClose, onLoadDocument }: DocumentListProps) {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDocuments(DocumentManager.getAllDocuments());
    }
  }, [isOpen]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Supprimer ce document ?')) {
      DocumentManager.deleteDocument(id);
      setDocuments(DocumentManager.getAllDocuments());
    }
  };

  const handleLoad = (doc: SavedDocument) => {
    onLoadDocument(doc);
    onClose();
  };

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              <i className="fas fa-folder-open mr-2 text-blue-600"></i>
              Documents sauvegardés
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {documents.length} document{documents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
          >
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        {/* Search */}
        {documents.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-200">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un document..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Document List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-folder-open text-5xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">
                {documents.length === 0
                  ? 'Aucun document sauvegardé'
                  : 'Aucun résultat trouvé'}
              </p>
              {documents.length === 0 && (
                <p className="text-sm text-gray-400 mt-2">
                  Cliquez sur "Sauvegarder" pour enregistrer votre premier document
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleLoad(doc)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                        <i className="fas fa-file-alt mr-2 text-gray-400 group-hover:text-blue-500"></i>
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>
                          <i className="fas fa-clock mr-1"></i>
                          {formatDate(doc.timestamp)}
                        </span>
                        <span>
                          <i className="fas fa-font mr-1"></i>
                          {doc.wordCount} mot{doc.wordCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDelete(doc.id, e)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition opacity-0 group-hover:opacity-100"
                      title="Supprimer"
                    >
                      <i className="fas fa-trash text-red-500"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {documents.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 rounded-b-xl">
            <p className="text-xs text-gray-500 text-center">
              <i className="fas fa-info-circle mr-1"></i>
              Cliquez sur un document pour le charger
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
