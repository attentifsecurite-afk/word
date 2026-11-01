import { AppType } from '../App';

interface HomeProps {
  onNavigate: (app: AppType) => void;
  onOpenStorage?: () => void;
}

export default function Home({ onNavigate, onOpenStorage }: HomeProps) {
  const apps = [
    {
      id: 'word' as AppType,
      name: 'Word',
      description: 'Documents',
      icon: 'fas fa-file-word',
      color: '#2b579a',
      bgColor: 'bg-blue-600'
    },
    {
      id: 'sheet' as AppType,
      name: 'Excel',
      description: 'Feuilles de calcul',
      icon: 'fas fa-file-excel',
      color: '#217346',
      bgColor: 'bg-green-600'
    },
    {
      id: 'slide' as AppType,
      name: 'PowerPoint',
      description: 'Présentations',
      icon: 'fas fa-file-powerpoint',
      color: '#d24726',
      bgColor: 'bg-orange-600'
    },
    {
      id: 'mail' as AppType,
      name: 'Outlook',
      description: 'Messagerie',
      icon: 'fas fa-envelope',
      color: '#0078d4',
      bgColor: 'bg-blue-500'
    }
  ];

  const recentDocs = [
    { name: 'Rapport_Q1_2024.docx', app: 'word', time: 'Il y a 2h' },
    { name: 'Budget_2024.xlsx', app: 'sheet', time: 'Il y a 5h' },
    { name: 'Présentation_Client.pptx', app: 'slide', time: 'Hier' },
  ];

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Top Bar - Microsoft Style */}
      <header className="bg-[#2b579a] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
            <i className="fas fa-th text-xl"></i>
          </div>
          <h1 className="text-lg font-semibold">OfficeRapide</h1>
        </div>
        <div className="flex items-center gap-4">
          {onOpenStorage && (
            <button onClick={onOpenStorage} className="text-sm hover:bg-white/10 px-3 py-1 rounded transition">
              <i className="fas fa-database mr-1"></i> Stockage
            </button>
          )}
          <button className="text-sm hover:bg-white/10 px-3 py-1 rounded transition">
            <i className="fas fa-user-circle mr-1"></i> Utilisateur
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">Bienvenue</h2>
            <p className="text-gray-600">Créez, modifiez et partagez vos documents</p>
          </div>

          {/* Apps Grid - Microsoft Style */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Applications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => onNavigate(app.id)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 text-left group"
                >
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: app.color }}
                    >
                      <i className={`${app.icon} text-white text-3xl`}></i>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">{app.name}</h4>
                    <p className="text-sm text-gray-500">{app.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Documents */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Documents récents</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Voir tout <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {recentDocs.map((doc, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded flex items-center justify-center ${
                      doc.app === 'word' ? 'bg-blue-100 text-blue-600' :
                      doc.app === 'sheet' ? 'bg-green-100 text-green-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <i className={`fas ${
                        doc.app === 'word' ? 'fa-file-word' :
                        doc.app === 'sheet' ? 'fa-file-excel' :
                        'fa-file-powerpoint'
                      }`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.time}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Démarrer rapidement</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => onNavigate('word')}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition text-left"
              >
                <i className="fas fa-plus text-blue-600 mb-2"></i>
                <p className="text-sm font-medium text-gray-800">Nouveau document</p>
              </button>
              <button 
                onClick={() => onNavigate('sheet')}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition text-left"
              >
                <i className="fas fa-table text-green-600 mb-2"></i>
                <p className="text-sm font-medium text-gray-800">Nouveau tableur</p>
              </button>
              <button 
                onClick={() => onNavigate('slide')}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition text-left"
              >
                <i className="fas fa-images text-orange-600 mb-2"></i>
                <p className="text-sm font-medium text-gray-800">Nouvelle présentation</p>
              </button>
              <button 
                onClick={() => onNavigate('mail')}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition text-left"
              >
                <i className="fas fa-envelope text-blue-500 mb-2"></i>
                <p className="text-sm font-medium text-gray-800">Nouveau message</p>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-3 px-8">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>© 2024 OfficeRapide</span>
            <a href="#" className="hover:text-gray-700">Confidentialité</a>
            <a href="#" className="hover:text-gray-700">Conditions</a>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-globe"></i>
            <span>Français (France)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
