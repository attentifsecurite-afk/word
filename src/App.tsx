import { useState } from 'react';
import Home from './apps/Home';
import WordApp from './apps/WordApp';
import SheetApp from './apps/SheetApp';
import SlideApp from './apps/SlideApp';
import MailApp from './apps/MailApp';
import StorageManagerUI from './components/StorageManagerUI';

export type AppType = 'home' | 'word' | 'sheet' | 'slide' | 'mail';

function App() {
  const [currentApp, setCurrentApp] = useState<AppType>('home');
  const [showStorageManager, setShowStorageManager] = useState(false);

  const renderApp = () => {
    switch (currentApp) {
      case 'home':
        return <Home onNavigate={setCurrentApp} onOpenStorage={() => setShowStorageManager(true)} />;
      case 'word':
        return <WordApp onBack={() => setCurrentApp('home')} onOpenStorage={() => setShowStorageManager(true)} />;
      case 'sheet':
        return <SheetApp onBack={() => setCurrentApp('home')} onOpenStorage={() => setShowStorageManager(true)} />;
      case 'slide':
        return <SlideApp onBack={() => setCurrentApp('home')} onOpenStorage={() => setShowStorageManager(true)} />;
      case 'mail':
        return <MailApp onBack={() => setCurrentApp('home')} onOpenStorage={() => setShowStorageManager(true)} />;
      default:
        return <Home onNavigate={setCurrentApp} onOpenStorage={() => setShowStorageManager(true)} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {renderApp()}
      
      {/* Storage Manager Modal */}
      <StorageManagerUI 
        isOpen={showStorageManager} 
        onClose={() => setShowStorageManager(false)} 
      />
    </div>
  );
}

export default App;
