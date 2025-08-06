import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { useAppStore } from './stores/useAppStore';
import './App.css';

function App() {
  const initializeApp = useAppStore((state) => state.initializeApp);
  
  // Inicializar la aplicación al montar
  React.useEffect(() => {
    initializeApp();
  }, [initializeApp]);
  
  return (
    <div className="App">
      <MainLayout />
    </div>
  );
}

export default App;