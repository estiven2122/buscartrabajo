import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  UserProfile, 
  JobApplication, 
  CVVersion, 
  CoverLetterTemplate, 
  JobSite, 
  AppSettings, 
  DashboardStats,
  SearchFilters,
  SortConfig,
  Notification
} from '../types';
import { defaultJobSites } from '../data/jobSites';
import { defaultCoverLetterTemplates } from '../data/coverLetterTemplates';

// Estado de la aplicación
interface AppState {
  // Usuario y perfil
  userProfile: UserProfile | null;
  isProfileComplete: boolean;
  
  // Aplicaciones de trabajo
  jobApplications: JobApplication[];
  filteredApplications: JobApplication[];
  searchFilters: SearchFilters;
  sortConfig: SortConfig;
  
  // CVs y plantillas
  cvVersions: CVVersion[];
  activeCVId: string | null;
  
  // Cartas de presentación
  coverLetterTemplates: CoverLetterTemplate[];
  
  // Sitios web de empleo
  jobSites: JobSite[];
  
  // Configuración
  settings: AppSettings;
  
  // UI State
  notifications: Notification[];
  isLoading: boolean;
  currentView: string;
  sidebarCollapsed: boolean;
  
  // Estadísticas
  dashboardStats: DashboardStats | null;
}

// Acciones de la aplicación
interface AppActions {
  // Perfil de usuario
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  checkProfileCompleteness: () => void;
  
  // Aplicaciones de trabajo
  addJobApplication: (application: JobApplication) => void;
  updateJobApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteJobApplication: (id: string) => void;
  getJobApplication: (id: string) => JobApplication | undefined;
  
  // Filtros y búsqueda
  setSearchFilters: (filters: SearchFilters) => void;
  setSortConfig: (config: SortConfig) => void;
  applyFiltersAndSort: () => void;
  clearFilters: () => void;
  
  // CVs
  addCVVersion: (cv: CVVersion) => void;
  updateCVVersion: (id: string, updates: Partial<CVVersion>) => void;
  deleteCVVersion: (id: string) => void;
  setActiveCVId: (id: string | null) => void;
  getActiveCVVersion: () => CVVersion | null;
  
  // Cartas de presentación
  addCoverLetterTemplate: (template: CoverLetterTemplate) => void;
  updateCoverLetterTemplate: (id: string, updates: Partial<CoverLetterTemplate>) => void;
  deleteCoverLetterTemplate: (id: string) => void;
  
  // Sitios web
  updateJobSite: (id: string, updates: Partial<JobSite>) => void;
  toggleJobSiteActive: (id: string) => void;
  addCustomJobSite: (site: JobSite) => void;
  
  // Configuración
  updateSettings: (updates: Partial<AppSettings>) => void;
  
  // Notificaciones
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // UI
  setCurrentView: (view: string) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  
  // Estadísticas
  calculateDashboardStats: () => void;
  
  // Utilidades
  exportData: () => string;
  importData: (data: string) => void;
  resetApp: () => void;
  initializeApp: () => void;
}

type AppStore = AppState & AppActions;

// Estado inicial
const initialState: AppState = {
  userProfile: null,
  isProfileComplete: false,
  jobApplications: [],
  filteredApplications: [],
  searchFilters: {},
  sortConfig: { field: 'appliedDate', order: 'desc' },
  cvVersions: [],
  activeCVId: null,
  coverLetterTemplates: defaultCoverLetterTemplates,
  jobSites: defaultJobSites,
  settings: {
    theme: 'light',
    language: 'es',
    notifications: {
      followUps: true,
      deadlines: true,
      interviews: true
    },
    privacy: {
      analytics: false,
      crashReports: false
    },
    backup: {
      autoBackup: true,
      frequency: 'weekly'
    }
  },
  notifications: [],
  isLoading: false,
  currentView: 'dashboard',
  sidebarCollapsed: false,
  dashboardStats: null
};

// Función para generar ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Función para calcular estadísticas
const calculateStats = (applications: JobApplication[]): DashboardStats => {
  const now = new Date();
  
  const totalApplications = applications.length;
  const activeApplications = applications.filter(app => 
    !['rejected', 'withdrawn', 'accepted'].includes(app.status)
  ).length;
  
  const interviewsScheduled = applications.filter(app => 
    ['interview_scheduled', 'interview_completed', 'second_round', 'final_round'].includes(app.status)
  ).length;
  
  const offersReceived = applications.filter(app => 
    app.status === 'offer_received'
  ).length;
  
  const responseRate = totalApplications > 0 
    ? (applications.filter(app => app.status !== 'applied').length / totalApplications) * 100 
    : 0;
  
  // Calcular tiempo promedio de respuesta
  const responseTimes = applications
    .filter(app => app.timeline.length > 1)
    .map(app => {
      const applied = new Date(app.appliedDate);
      const firstResponse = app.timeline.find(event => event.type === 'response');
      if (firstResponse) {
        return (new Date(firstResponse.date).getTime() - applied.getTime()) / (1000 * 60 * 60 * 24);
      }
      return null;
    })
    .filter(time => time !== null) as number[];
  
  const averageResponseTime = responseTimes.length > 0 
    ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
    : 0;
  
  // Top plataformas
  const platformCounts = applications.reduce((acc, app) => {
    acc[app.platform] = (acc[app.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topPlatforms = Object.entries(platformCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([platform, count]) => ({ platform, count }));
  
  // Actividad mensual
  const monthlyActivity = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthApps = applications.filter(app => {
      const appDate = new Date(app.appliedDate);
      return appDate.getMonth() === date.getMonth() && appDate.getFullYear() === date.getFullYear();
    });
    
    return {
      month: date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
      applications: monthApps.length,
      interviews: monthApps.filter(app => 
        ['interview_scheduled', 'interview_completed', 'second_round', 'final_round'].includes(app.status)
      ).length,
      offers: monthApps.filter(app => app.status === 'offer_received').length
    };
  }).reverse();
  
  // Distribución de estados
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const statusDistribution = Object.entries(statusCounts).map(([status, count]) => ({
    status: status as any,
    count,
    percentage: totalApplications > 0 ? (count / totalApplications) * 100 : 0
  }));
  
  return {
    totalApplications,
    activeApplications,
    interviewsScheduled,
    offersReceived,
    responseRate,
    averageResponseTime,
    topPlatforms,
    monthlyActivity,
    statusDistribution
  };
};

// Store principal
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Perfil de usuario
      setUserProfile: (profile) => {
        set({ userProfile: profile });
        get().checkProfileCompleteness();
      },
      
      updateUserProfile: (updates) => {
        const currentProfile = get().userProfile;
        if (currentProfile) {
          const updatedProfile = { ...currentProfile, ...updates, updatedAt: new Date() };
          set({ userProfile: updatedProfile });
          get().checkProfileCompleteness();
        }
      },
      
      checkProfileCompleteness: () => {
        const profile = get().userProfile;
        if (!profile) {
          set({ isProfileComplete: false });
          return;
        }
        
        const required = [
          profile.personalInfo.fullName,
          profile.personalInfo.email,
          profile.personalInfo.phone,
          profile.professionalSummary,
          profile.skills.length > 0,
          profile.experience.length > 0
        ];
        
        const isComplete = required.every(Boolean);
        set({ isProfileComplete: isComplete });
      },
      
      // Aplicaciones de trabajo
      addJobApplication: (application) => {
        const applications = [...get().jobApplications, application];
        set({ jobApplications: applications });
        get().applyFiltersAndSort();
        get().calculateDashboardStats();
      },
      
      updateJobApplication: (id, updates) => {
        const applications = get().jobApplications.map(app => 
          app.id === id ? { ...app, ...updates, updatedAt: new Date() } : app
        );
        set({ jobApplications: applications });
        get().applyFiltersAndSort();
        get().calculateDashboardStats();
      },
      
      deleteJobApplication: (id) => {
        const applications = get().jobApplications.filter(app => app.id !== id);
        set({ jobApplications: applications });
        get().applyFiltersAndSort();
        get().calculateDashboardStats();
      },
      
      getJobApplication: (id) => {
        return get().jobApplications.find(app => app.id === id);
      },
      
      // Filtros y ordenamiento
      setSearchFilters: (filters) => {
        set({ searchFilters: filters });
        get().applyFiltersAndSort();
      },
      
      setSortConfig: (config) => {
        set({ sortConfig: config });
        get().applyFiltersAndSort();
      },
      
      applyFiltersAndSort: () => {
        const { jobApplications, searchFilters, sortConfig } = get();
        let filtered = [...jobApplications];
        
        // Aplicar filtros
        if (searchFilters.status?.length) {
          filtered = filtered.filter(app => searchFilters.status!.includes(app.status));
        }
        
        if (searchFilters.platforms?.length) {
          filtered = filtered.filter(app => searchFilters.platforms!.includes(app.platform));
        }
        
        if (searchFilters.keywords) {
          const keywords = searchFilters.keywords.toLowerCase();
          filtered = filtered.filter(app => 
            app.jobTitle.toLowerCase().includes(keywords) ||
            app.company.toLowerCase().includes(keywords) ||
            app.description.toLowerCase().includes(keywords)
          );
        }
        
        if (searchFilters.dateRange) {
          filtered = filtered.filter(app => {
            const appDate = new Date(app.appliedDate);
            return appDate >= searchFilters.dateRange!.start && 
                   appDate <= searchFilters.dateRange!.end;
          });
        }
        
        // Aplicar ordenamiento
        filtered.sort((a, b) => {
          let aValue: any, bValue: any;
          
          switch (sortConfig.field) {
            case 'appliedDate':
              aValue = new Date(a.appliedDate);
              bValue = new Date(b.appliedDate);
              break;
            case 'company':
              aValue = a.company.toLowerCase();
              bValue = b.company.toLowerCase();
              break;
            case 'jobTitle':
              aValue = a.jobTitle.toLowerCase();
              bValue = b.jobTitle.toLowerCase();
              break;
            case 'status':
              aValue = a.status;
              bValue = b.status;
              break;
            case 'salary':
              aValue = a.salary?.min || 0;
              bValue = b.salary?.min || 0;
              break;
            default:
              return 0;
          }
          
          if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
          return 0;
        });
        
        set({ filteredApplications: filtered });
      },
      
      clearFilters: () => {
        set({ searchFilters: {} });
        get().applyFiltersAndSort();
      },
      
      // CVs
      addCVVersion: (cv) => {
        const cvs = [...get().cvVersions, cv];
        set({ cvVersions: cvs });
        if (cv.isDefault) {
          set({ activeCVId: cv.id });
        }
      },
      
      updateCVVersion: (id, updates) => {
        const cvs = get().cvVersions.map(cv => 
          cv.id === id ? { ...cv, ...updates, updatedAt: new Date() } : cv
        );
        set({ cvVersions: cvs });
      },
      
      deleteCVVersion: (id) => {
        const cvs = get().cvVersions.filter(cv => cv.id !== id);
        set({ cvVersions: cvs });
        if (get().activeCVId === id) {
          set({ activeCVId: cvs.length > 0 ? cvs[0].id : null });
        }
      },
      
      setActiveCVId: (id) => {
        set({ activeCVId: id });
      },
      
      getActiveCVVersion: () => {
        const { cvVersions, activeCVId } = get();
        return cvVersions.find(cv => cv.id === activeCVId) || null;
      },
      
      // Cartas de presentación
      addCoverLetterTemplate: (template) => {
        const templates = [...get().coverLetterTemplates, template];
        set({ coverLetterTemplates: templates });
      },
      
      updateCoverLetterTemplate: (id, updates) => {
        const templates = get().coverLetterTemplates.map(template => 
          template.id === id ? { ...template, ...updates, updatedAt: new Date() } : template
        );
        set({ coverLetterTemplates: templates });
      },
      
      deleteCoverLetterTemplate: (id) => {
        const templates = get().coverLetterTemplates.filter(template => template.id !== id);
        set({ coverLetterTemplates: templates });
      },
      
      // Sitios web
      updateJobSite: (id, updates) => {
        const sites = get().jobSites.map(site => 
          site.id === id ? { ...site, ...updates } : site
        );
        set({ jobSites: sites });
      },
      
      toggleJobSiteActive: (id) => {
        const sites = get().jobSites.map(site => 
          site.id === id ? { ...site, isActive: !site.isActive } : site
        );
        set({ jobSites: sites });
      },
      
      addCustomJobSite: (site) => {
        const sites = [...get().jobSites, site];
        set({ jobSites: sites });
      },
      
      // Configuración
      updateSettings: (updates) => {
        const settings = { ...get().settings, ...updates };
        set({ settings });
      },
      
      // Notificaciones
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: generateId(),
          createdAt: new Date()
        };
        const notifications = [...get().notifications, newNotification];
        set({ notifications });
        
        // Auto-remove después del duration
        if (notification.duration) {
          setTimeout(() => {
            get().removeNotification(newNotification.id);
          }, notification.duration);
        }
      },
      
      removeNotification: (id) => {
        const notifications = get().notifications.filter(n => n.id !== id);
        set({ notifications });
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
      
      // UI
      setCurrentView: (view) => {
        set({ currentView: view });
      },
      
      toggleSidebar: () => {
        set({ sidebarCollapsed: !get().sidebarCollapsed });
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
      
      // Estadísticas
      calculateDashboardStats: () => {
        const stats = calculateStats(get().jobApplications);
        set({ dashboardStats: stats });
      },
      
      // Utilidades
      exportData: () => {
        const { userProfile, jobApplications, cvVersions, coverLetterTemplates, settings } = get();
        const exportData = {
          userProfile,
          jobApplications,
          cvVersions,
          coverLetterTemplates: coverLetterTemplates.filter(t => t.category === 'custom'),
          settings,
          exportDate: new Date().toISOString()
        };
        return JSON.stringify(exportData, null, 2);
      },
      
      importData: (data) => {
        try {
          const importedData = JSON.parse(data);
          set({
            userProfile: importedData.userProfile || null,
            jobApplications: importedData.jobApplications || [],
            cvVersions: importedData.cvVersions || [],
            coverLetterTemplates: [
              ...defaultCoverLetterTemplates,
              ...(importedData.coverLetterTemplates || [])
            ],
            settings: { ...initialState.settings, ...importedData.settings }
          });
          get().applyFiltersAndSort();
          get().calculateDashboardStats();
          get().checkProfileCompleteness();
        } catch (error) {
          console.error('Error importing data:', error);
        }
      },
      
      resetApp: () => {
        set(initialState);
      },
      
      initializeApp: () => {
        get().applyFiltersAndSort();
        get().calculateDashboardStats();
        get().checkProfileCompleteness();
      }
    }),
    {
      name: 'buscacamello-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userProfile: state.userProfile,
        jobApplications: state.jobApplications,
        cvVersions: state.cvVersions,
        coverLetterTemplates: state.coverLetterTemplates.filter(t => t.category === 'custom'),
        jobSites: state.jobSites.filter(s => !defaultJobSites.find(ds => ds.id === s.id)),
        settings: state.settings
      })
    }
  ));

// Hooks especializados
export const useUserProfile = () => useAppStore(state => ({
  profile: state.userProfile,
  isComplete: state.isProfileComplete,
  setProfile: state.setUserProfile,
  updateProfile: state.updateUserProfile
}));

export const useJobApplications = () => {
  const applications = useAppStore(state => state.filteredApplications);
  const allApplications = useAppStore(state => state.jobApplications);
  const filters = useAppStore(state => state.searchFilters);
  const sortConfig = useAppStore(state => state.sortConfig);
  const addApplication = useAppStore(state => state.addJobApplication);
  const updateApplication = useAppStore(state => state.updateJobApplication);
  const deleteApplication = useAppStore(state => state.deleteJobApplication);
  const getApplication = useAppStore(state => state.getJobApplication);
  const setFilters = useAppStore(state => state.setSearchFilters);
  const setSortConfig = useAppStore(state => state.setSortConfig);
  const clearFilters = useAppStore(state => state.clearFilters);
  
  return {
    applications,
    allApplications,
    filters,
    sortConfig,
    addApplication,
    updateApplication,
    deleteApplication,
    getApplication,
    setFilters,
    setSortConfig,
    clearFilters
  };
};

export const useDashboardStats = () => {
  const stats = useAppStore(state => state.dashboardStats);
  const calculateStats = useAppStore(state => state.calculateDashboardStats);
  return { stats, calculateStats };
};

export const useNotifications = () => useAppStore(state => ({
  notifications: state.notifications,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications
}));