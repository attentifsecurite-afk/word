import { AppType } from '../App';

interface HomeProps {
  onNavigate: (app: AppType) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const apps = [
    {
      id: 'word' as AppType,
      name: 'WordRapide',
      description: 'Traitement de texte',
      icon: 'fas fa-file-word',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'sheet' as AppType,
      name: 'SheetRapide',
      description: 'Tableur',
      icon: 'fas fa-file-excel',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      id: 'slide' as AppType,
      name: 'SlideRapide',
      description: 'Présentations',
      icon: 'fas fa-file-powerpoint',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-briefcase text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">OfficeRapide</h1>
                <p className="text-sm text-gray-500">Suite bureautique complète</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Bienvenue dans OfficeRapide
            </h2>
            <p className="text-lg text-gray-600">
              Votre suite bureautique complète, rapide et intuitive
            </p>
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => onNavigate(app.id)}
                className={`bg-gradient-to-br ${app.color} ${app.hoverColor} text-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-left`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <i className={`${app.icon} text-5xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{app.name}</h3>
                  <p className="text-white/90">{app.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm">
                    <span>Ouvrir</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Pourquoi choisir OfficeRapide ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-bolt text-blue-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Ultra Rapide</h4>
                <p className="text-sm text-gray-600">
                  Démarrage instantané et performances optimales
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-cloud text-green-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">100% Local</h4>
                <p className="text-sm text-gray-600">
                  Vos données restent sur votre ordinateur
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-gift text-purple-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Gratuit</h4>
                <p className="text-sm text-gray-600">
                  Toutes les fonctionnalités sans abonnement
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>OfficeRapide v1.0 — Suite bureautique professionnelle</p>
        </div>
      </footer>
    </div>
  );
}
