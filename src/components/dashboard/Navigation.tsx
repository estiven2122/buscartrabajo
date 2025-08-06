import React from 'react';
import { 
  Home, 
  User, 
  FileText, 
  Briefcase, 
  Globe, 
  Settings,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui';
import { cn } from '../../utils';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Oasis Principal',
    icon: Home,
    description: 'Panel de control'
  },
  {
    id: 'profile',
    label: 'Perfil del Viajero',
    icon: User,
    description: 'Gestiona tu información'
  },
  {
    id: 'applications',
    label: 'Expediciones',
    icon: FileText,
    description: 'Seguimiento de aplicaciones'
  },
  {
    id: 'sites',
    label: 'Rutas del Desierto',
    icon: Globe,
    description: 'Sitios de empleo'
  },
  {
    id: 'templates',
    label: 'Pergaminos',
    icon: Briefcase,
    description: 'Plantillas y CV'
  },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  isMobileMenuOpen,
  onMobileMenuToggle,
}) => {
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-amber-600" />
          </div>
          <h1 className="text-xl font-bold">BuscaCamello</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={onMobileMenuToggle}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gradient-to-b from-amber-50 to-orange-50 border-r border-amber-200">
        {/* Logo */}
        <div className="flex items-center space-x-3 p-6 border-b border-amber-200">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-amber-900">BuscaCamello</h1>
            <p className="text-xs text-amber-600">Tu guía en el desierto laboral</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'
                )}
              >
                <Icon className={cn(
                  'w-5 h-5 transition-transform group-hover:scale-110',
                  isActive ? 'text-white' : 'text-amber-600'
                )} />
                <div className="flex-1">
                  <div className={cn(
                    'font-medium',
                    isActive ? 'text-white' : 'text-amber-900'
                  )}>
                    {item.label}
                  </div>
                  <div className={cn(
                    'text-xs',
                    isActive ? 'text-amber-100' : 'text-amber-600'
                  )}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-amber-200">
          <button
            onClick={() => onSectionChange('settings')}
            className={cn(
              'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group',
              activeSection === 'settings'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'
            )}
          >
            <Settings className={cn(
              'w-5 h-5 transition-transform group-hover:scale-110',
              activeSection === 'settings' ? 'text-white' : 'text-amber-600'
            )} />
            <div className="flex-1">
              <div className={cn(
                'font-medium',
                activeSection === 'settings' ? 'text-white' : 'text-amber-900'
              )}>
                Configuración
              </div>
              <div className={cn(
                'text-xs',
                activeSection === 'settings' ? 'text-amber-100' : 'text-amber-600'
              )}>
                Ajustes de la aplicación
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onMobileMenuToggle}>
          <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-amber-50 to-orange-50 shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Navigation Items */}
            <nav className="p-4 space-y-2 mt-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      onMobileMenuToggle();
                    }}
                    className={cn(
                      'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group',
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'
                    )}
                  >
                    <Icon className={cn(
                      'w-5 h-5 transition-transform group-hover:scale-110',
                      isActive ? 'text-white' : 'text-amber-600'
                    )} />
                    <div className="flex-1">
                      <div className={cn(
                        'font-medium',
                        isActive ? 'text-white' : 'text-amber-900'
                      )}>
                        {item.label}
                      </div>
                      <div className={cn(
                        'text-xs',
                        isActive ? 'text-amber-100' : 'text-amber-600'
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Settings */}
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={() => {
                  onSectionChange('settings');
                  onMobileMenuToggle();
                }}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group',
                  activeSection === 'settings'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-amber-700 hover:bg-amber-100 hover:text-amber-900'
                )}
              >
                <Settings className={cn(
                  'w-5 h-5 transition-transform group-hover:scale-110',
                  activeSection === 'settings' ? 'text-white' : 'text-amber-600'
                )} />
                <div className="flex-1">
                  <div className={cn(
                    'font-medium',
                    activeSection === 'settings' ? 'text-white' : 'text-amber-900'
                  )}>
                    Configuración
                  </div>
                  <div className={cn(
                    'text-xs',
                    activeSection === 'settings' ? 'text-amber-100' : 'text-amber-600'
                  )}>
                    Ajustes de la aplicación
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};