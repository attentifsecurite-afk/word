import { useState, useEffect } from 'react';
import { LocalStorageManager } from '../utils/StorageManager';
import { DocumentManager } from '../utils/DocumentManager';

interface StorageManagerUIProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StorageManagerUI({ isOpen, onClose }: StorageManagerUIProps) {
  const [stats, setStats] = useState(LocalStorageManager.getStats());
  const [docStats, setDocStats] = useState(DocumentManager.getStats());
  const [backups, setBackups] = useState(LocalStorageManager.listBackups());
  const [activeTab, setActiveTab] = useState<'overview' | 'backups' | 'export'>('overview');

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = () => {
    setStats(LocalStorageManager.getStats());
    setDocStats(DocumentManager.getStats());
    setBackups(LocalStorageManager.listBackups());
  };

  const handleCreateBackup = () => {
    const backup = LocalStorageManager.createBackup('Sauvegarde manuelle');
    if (backup) {
      alert('Sauvegarde créée avec succès !');
      refreshData();
    } else {
      alert('Erreur lors de la création de la sauvegarde');
    }
  };

  const handleRestoreBackup = (index: number) => {
    if (confirm('Êtes-vous sûr de vouloir restaurer cette sauvegarde ? Toutes les données actuelles seront remplacées.')) {
      const success = LocalStorageManager.restoreBackup(index);
      if (success) {
        alert('Sauvegarde restaurée avec succès !');
        refreshData();
      } else {
        alert('Erreur lors de la restauration');
      }
    }
  };

  const handleDeleteBackup = (index: number) => {
    if (confirm('Supprimer cette sauvegarde ?')) {
      LocalStorageManager.deleteBackup(index);
      refreshData();
    }
  };

  const handleExportAll = () => {
    const data = LocalStorageManager.exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `officerapide_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportAll = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (confirm('Importer ces données ? Toutes les données actuelles seront remplacées.')) {
          const success = LocalStorageManager.importAllData(content);
          if (success) {
            alert('Données importées avec succès !');
            refreshData();
          } else {
            alert('Erreur lors de l\'import');
          }
        }
      };
      reader.readAsText(file);
    };

    input.click();
  };

  const handleClearAll = () => {
    if (confirm('ATTENTION : Cette action va supprimer TOUTES les données. Êtes-vous sûr ?')) {
      if (confirm('Dernière confirmation : Toutes vos données seront perdues définitivement.')) {
        LocalStorageManager.clearAll();
        alert('Toutes les données ont été supprimées');
        refreshData();
      }
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              <i className="fas fa-database mr-2 text-blue-600"></i>
              Gestionnaire de Stockage
            </h2>
            <p className="text-sm text-gray-500 mt-1">Gérez vos données et sauvegardes</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
          >
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="fas fa-chart-bar mr-2"></i>
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('backups')}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === 'backups'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="fas fa-history mr-2"></i>
              Sauvegardes ({backups.length})
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === 'export'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className="fas fa-file-export mr-2"></i>
              Import/Export
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Storage Stats */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <i className="fas fa-hdd mr-2"></i>
                  Stockage Local
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-800">{formatSize(stats.totalSize)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Utilisé</p>
                    <p className="text-2xl font-bold text-blue-600">{formatSize(stats.usedSize)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Disponible</p>
                    <p className="text-2xl font-bold text-green-600">{formatSize(stats.availableSize)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Éléments</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.itemCount}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Utilisation</span>
                    <span>{Math.round((stats.usedSize / stats.totalSize) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(stats.usedSize / stats.totalSize) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Document Stats */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <i className="fas fa-file-alt mr-2"></i>
                  Documents
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-800">{docStats.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Word</p>
                    <p className="text-2xl font-bold text-blue-600">{docStats.byType.word}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Excel</p>
                    <p className="text-2xl font-bold text-green-600">{docStats.byType.excel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">PowerPoint</p>
                    <p className="text-2xl font-bold text-orange-600">{docStats.byType.powerpoint}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mail</p>
                    <p className="text-2xl font-bold text-red-600">{docStats.byType.mail}</p>
                  </div>
                </div>
                {docStats.lastModified && (
                  <p className="text-sm text-gray-600 mt-4">
                    <i className="fas fa-clock mr-1"></i>
                    Dernière modification : {formatDate(docStats.lastModified)}
                  </p>
                )}
              </div>

              {/* Last Backup */}
              {stats.lastBackup && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    <i className="fas fa-shield-alt mr-2"></i>
                    Dernière Sauvegarde
                  </h3>
                  <p className="text-gray-600">{formatDate(stats.lastBackup)}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'backups' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Sauvegardes Automatiques
                </h3>
                <button
                  onClick={handleCreateBackup}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Nouvelle Sauvegarde
                </button>
              </div>

              {backups.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <i className="fas fa-inbox text-5xl mb-4"></i>
                  <p>Aucune sauvegarde</p>
                  <p className="text-sm mt-2">Créez votre première sauvegarde</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {backups.map((backup, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">
                            Sauvegarde #{index + 1}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <i className="fas fa-calendar mr-1"></i>
                            {formatDate(backup.timestamp)}
                          </p>
                          <p className="text-sm text-gray-600">
                            <i className="fas fa-code-branch mr-1"></i>
                            Version {backup.version}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRestoreBackup(index)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                          >
                            <i className="fas fa-undo mr-1"></i>
                            Restaurer
                          </button>
                          <button
                            onClick={() => handleDeleteBackup(index)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <i className="fas fa-file-export mr-2"></i>
                  Exporter Toutes les Données
                </h3>
                <p className="text-gray-600 mb-4">
                  Exportez toutes vos données (documents, emails, paramètres) dans un fichier JSON
                </p>
                <button
                  onClick={handleExportAll}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <i className="fas fa-download mr-2"></i>
                  Exporter en JSON
                </button>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <i className="fas fa-file-import mr-2"></i>
                  Importer des Données
                </h3>
                <p className="text-gray-600 mb-4">
                  Importez des données depuis un fichier JSON de sauvegarde
                </p>
                <button
                  onClick={handleImportAll}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <i className="fas fa-upload mr-2"></i>
                  Importer depuis JSON
                </button>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Zone de Danger
                </h3>
                <p className="text-gray-600 mb-4">
                  Supprimer définitivement toutes les données
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Supprimer Toutes les Données
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 rounded-b-xl">
          <p className="text-xs text-gray-500 text-center">
            <i className="fas fa-info-circle mr-1"></i>
            Les données sont stockées localement dans votre navigateur (localStorage)
          </p>
        </div>
      </div>
    </div>
  );
}
