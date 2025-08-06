import React from 'react';
import { cn } from '../../utils/cn';
import { Navbar } from './Navbar';
import { useAppStore } from '../../stores/useAppStore';
import { Dashboard } from '../modules/Dashboard';
import { DashboardStats } from '../modules/DashboardStats';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { 
  Home,
  User,
  Briefcase,
  MapPin,
  BookOpen,
  FileText,
  Settings,
  BarChart3,
  Construction
} from 'lucide-react';

// Componente de página en construcción
const UnderConstruction: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ 
  title, 
  description, 
  icon 
}) => {
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card variant="desert" className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-desert-100 flex items-center justify-center">
              {icon}
            </div>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Construction className="h-12 w-12 text-desert-400" />
            </div>
            <p className="text-desert-600">{description}</p>
            <p className="text-sm text-desert-500">
              Esta sección estará disponible próximamente.
            </p>
            <Button 
              variant="desert" 
              onClick={() => setCurrentView('dashboard')}
              className="mt-4"
            >
              <Home className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente de contenido principal
const MainContent: React.FC = () => {
  const currentView = useAppStore((state) => state.currentView);
  
  switch (currentView) {
    case 'dashboard':
      return <Dashboard />;
    
    case 'dashboard-stats':
      return (
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-desert-900 flex items-center space-x-3">
              <BarChart3 className="h-8 w-8" />
              <span>Estadísticas Detalladas</span>
            </h1>
            <p className="text-desert-600 mt-2">
              Análisis profundo de tu progreso en la búsqueda de empleo
            </p>
          </div>
          <DashboardStats />
        </div>
      );
    
    case 'profile':
      return (
        <UnderConstruction
          title="Mochila Digital"
          description="Gestiona tu perfil personal y profesional"
          icon={<User className="h-8 w-8 text-desert-600" />}
        />
      );
    
    case 'applications':
      return (
        <UnderConstruction
          title="Diario de Travesía"
          description="Registra y da seguimiento a tus aplicaciones de trabajo"
          icon={<Briefcase className="h-8 w-8 text-desert-600" />}
        />
      );
    
    case 'job-sites':
      return (
        <UnderConstruction
          title="Rutas de Empleo"
          description="Explora y organiza sitios web de búsqueda de empleo"
          icon={<MapPin className="h-8 w-8 text-desert-600" />}
        />
      );
    
    case 'cover-letters':
      return (
        <UnderConstruction
          title="Cartas del Camello"
          description="Crea y gestiona plantillas de cartas de presentación"
          icon={<BookOpen className="h-8 w-8 text-desert-600" />}
        />
      );
    
    case 'cv-generator':
      return (
        <UnderConstruction
          title="Oasis de CV"
          description="Genera y personaliza tu currículum vitae"
          icon={<FileText className="h-8 w-8 text-desert-600" />}
        />
      );
    
    case 'settings':
      return (
        <UnderConstruction
          title="Configuración"
          description="Personaliza tu experiencia en BuscaCamello"
          icon={<Settings className="h-8 w-8 text-desert-600" />}
        />
      );
    
    default:
      return <Dashboard />;
  }
};

// Componente de breadcrumb
const Breadcrumb: React.FC = () => {
  const currentView = useAppStore((state) => state.currentView);
  
  const viewTitles: Record<string, string> = {
    dashboard: 'Dashboard del Desierto',
    'dashboard-stats': 'Estadísticas Detalladas',
    profile: 'Mochila Digital',
    applications: 'Diario de Travesía',
    'job-sites': 'Rutas de Empleo',
    'cover-letters': 'Cartas del Camello',
    'cv-generator': 'Oasis de CV',
    settings: 'Configuración'
  };
  
  const currentTitle = viewTitles[currentView] || 'Dashboard del Desierto';
  
  return (
    <div className="bg-white border-b border-desert-200 px-6 py-3">
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-desert-500">BuscaCamello</span>
        <span className="text-desert-300">/</span>
        <span className="text-desert-900 font-medium">{currentTitle}</span>
      </div>
    </div>
  );
};

// Componente de layout principal
const MainLayout: React.FC = () => {
  const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-desert-50 to-oasis-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Contenido principal */}
      <div className={cn(
        'transition-all duration-300 ease-in-out',
        !sidebarCollapsed ? 'lg:ml-64' : 'lg:ml-16'
      )}>
        {/* Breadcrumb */}
        <Breadcrumb />
        
        {/* Contenido */}
        <main className="min-h-[calc(100vh-120px)]">
          <MainContent />
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-desert-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-desert-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2">
                <span className="text-lg">🐪</span>
                <span>BuscaCamello</span>
              </span>
              <span>v1.0.0</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>© 2024 BuscaCamello</span>
              <span>•</span>
              <span>Tu compañero en la búsqueda de empleo</span>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Overlay para móvil cuando el sidebar está abierto */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => useAppStore.getState().toggleSidebar()}
        />
      )}
    </div>
  );
};

export { MainLayout };