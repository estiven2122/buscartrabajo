import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { 
  Home, 
  Briefcase, 
  MapPin, 
  FileText, 
  User, 
  Settings, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard del Desierto',
    icon: <Home className="h-5 w-5" />,
    path: '/dashboard'
  },
  {
    id: 'applications',
    label: 'Diario de Travesía',
    icon: <Briefcase className="h-5 w-5" />,
    path: '/applications'
  },
  {
    id: 'job-sites',
    label: 'Rutas de Empleo',
    icon: <MapPin className="h-5 w-5" />,
    path: '/job-sites'
  },
  {
    id: 'cover-letters',
    label: 'Cartas del Camello',
    icon: <FileText className="h-5 w-5" />,
    path: '/cover-letters'
  },
  {
    id: 'profile',
    label: 'Mochila Digital',
    icon: <User className="h-5 w-5" />,
    path: '/profile'
  }
];

export interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { 
    currentView, 
    setCurrentView, 
    sidebarCollapsed, 
    toggleSidebar,
    notifications,
    userProfile
  } = useAppStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const unreadNotifications = notifications.filter(n => !n.id.includes('read')).length;
  
  const handleNavClick = (itemId: string, path: string) => {
    setCurrentView(itemId);
    setMobileMenuOpen(false);
    // En una aplicación real, aquí usarías el router
    // navigate(path);
  };
  
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-72 transition-all duration-300',
        sidebarCollapsed && 'lg:w-20',
        className
      )}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto desert-gradient px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🐪</div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-desert-900">BuscaCamello</h1>
                  <p className="text-xs text-desert-600">Tu compañero de búsqueda</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleNavClick(item.id, item.path)}
                          className={cn(
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full transition-all duration-200',
                            isActive
                              ? 'bg-desert-200 text-desert-900 shadow-sm'
                              : 'text-desert-700 hover:text-desert-900 hover:bg-desert-100'
                          )}
                        >
                          <span className={cn(
                            'flex h-6 w-6 shrink-0 items-center justify-center',
                            isActive ? 'text-desert-900' : 'text-desert-600 group-hover:text-desert-900'
                          )}>
                            {item.icon}
                          </span>
                          {!sidebarCollapsed && (
                            <span className="truncate">{item.label}</span>
                          )}
                          {item.badge && item.badge > 0 && !sidebarCollapsed && (
                            <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-medium leading-none text-white bg-desert-500 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
              
              {/* User Profile Section */}
              <li className="mt-auto">
                {!sidebarCollapsed && userProfile && (
                  <div className="bg-white/50 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-desert-200 flex items-center justify-center">
                        <User className="h-4 w-4 text-desert-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-desert-900 truncate">
                          {userProfile.personalInfo.fullName || 'Usuario'}
                        </p>
                        <p className="text-xs text-desert-600 truncate">
                          {userProfile.personalInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => handleNavClick('settings', '/settings')}
                  className={cn(
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full transition-all duration-200',
                    currentView === 'settings'
                      ? 'bg-desert-200 text-desert-900 shadow-sm'
                      : 'text-desert-700 hover:text-desert-900 hover:bg-desert-100'
                  )}
                >
                  <Settings className="h-5 w-5" />
                  {!sidebarCollapsed && <span>Configuración</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-desert-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-desert-700 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🐪</span>
            <h1 className="text-lg font-bold text-desert-900">BuscaCamello</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🐪</span>
                <h1 className="text-lg font-bold text-desert-900">BuscaCamello</h1>
              </div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-desert-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-desert-200">
                <div className="space-y-2 py-6">
                  {navItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id, item.path)}
                        className={cn(
                          'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full transition-all duration-200',
                          isActive
                            ? 'bg-desert-100 text-desert-900'
                            : 'text-desert-700 hover:text-desert-900 hover:bg-desert-50'
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && item.badge > 0 && (
                          <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-medium leading-none text-white bg-desert-500 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                <div className="py-6">
                  <button
                    onClick={() => handleNavClick('settings', '/settings')}
                    className={cn(
                      'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full transition-all duration-200',
                      currentView === 'settings'
                        ? 'bg-desert-100 text-desert-900'
                        : 'text-desert-700 hover:text-desert-900 hover:bg-desert-50'
                    )}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Configuración</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Toggle Button */}
      <div className="hidden lg:block">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            'fixed top-4 z-50 transition-all duration-300',
            sidebarCollapsed ? 'left-24' : 'left-80'
          )}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export { Navbar };