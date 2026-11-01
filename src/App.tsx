import { useState } from 'react';
import Home from './apps/Home';
import WordApp from './apps/WordApp';
import SheetApp from './apps/SheetApp';
import SlideApp from './apps/SlideApp';

export type AppType = 'home' | 'word' | 'sheet' | 'slide';

function App() {
  const [currentApp, setCurrentApp] = useState<AppType>('home');

  const renderApp = () => {
    switch (currentApp) {
      case 'home':
        return <Home onNavigate={setCurrentApp} />;
      case 'word':
        return <WordApp onBack={() => setCurrentApp('home')} />;
      case 'sheet':
        return <SheetApp onBack={() => setCurrentApp('home')} />;
      case 'slide':
        return <SlideApp onBack={() => setCurrentApp('home')} />;
      default:
        return <Home onNavigate={setCurrentApp} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {renderApp()}
    </div>
  );
}

export default App;
