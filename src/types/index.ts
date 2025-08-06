// Tipos principales para BuscaCamello

// Perfil de usuario
export interface UserProfile {
  id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    portfolio?: string;
  };
  professionalSummary: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
  preferences: {
    desiredPosition: string;
    salaryRange: {
      min: number;
      max: number;
      currency: string;
    };
    workMode: 'remote' | 'hybrid' | 'onsite' | 'any';
    availability: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Experiencia laboral
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

// Educación
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: number;
  description?: string;
}

// Idiomas
export interface Language {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
  certifications?: string[];
}

// Certificaciones
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  url?: string;
}

// Aplicación de trabajo
export interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  jobUrl: string;
  platform: string;
  status: ApplicationStatus;
  appliedDate: Date;
  salary?: {
    min?: number;
    max?: number;
    currency: string;
  };
  location: string;
  workMode: 'remote' | 'hybrid' | 'onsite';
  description: string;
  requirements: string[];
  notes: string;
  followUpDate?: Date;
  interviewDates: Date[];
  documents: {
    cvUsed: string;
    coverLetterUsed?: string;
    additionalDocs: string[];
  };
  contacts: Contact[];
  timeline: ApplicationEvent[];
  createdAt: Date;
  updatedAt: Date;
}

// Estados de aplicación
export type ApplicationStatus = 
  | 'draft'
  | 'applied'
  | 'under_review'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'second_round'
  | 'final_round'
  | 'offer_received'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

// Contactos
export interface Contact {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  notes: string;
}

// Eventos de aplicación
export interface ApplicationEvent {
  id: string;
  type: 'applied' | 'response' | 'interview' | 'follow_up' | 'status_change' | 'note';
  date: Date;
  description: string;
  details?: any;
}

// Versión de CV
export interface CVVersion {
  id: string;
  name: string;
  template: string;
  content: UserProfile;
  customizations: {
    theme: string;
    layout: string;
    sections: string[];
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  isDefault: boolean;
}

// Plantilla de carta de presentación
export interface CoverLetterTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  category: 'general' | 'tech' | 'creative' | 'sales' | 'management' | 'custom';
  createdAt: Date;
  updatedAt: Date;
  isDefault: boolean;
}

// Sitio web de empleo
export interface JobSite {
  id: string;
  name: string;
  url: string;
  category: 'general' | 'tech' | 'remote' | 'freelance' | 'startup' | 'corporate';
  description: string;
  features: string[];
  isActive: boolean;
  lastVisited?: Date;
  notes: string;
  rating: number;
}

// Configuración de la aplicación
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'es' | 'en';
  notifications: {
    followUps: boolean;
    deadlines: boolean;
    interviews: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReports: boolean;
  };
  backup: {
    autoBackup: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    lastBackup?: Date;
  };
}

// Estadísticas del dashboard
export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  interviewsScheduled: number;
  offersReceived: number;
  responseRate: number;
  averageResponseTime: number;
  topPlatforms: Array<{
    platform: string;
    count: number;
  }>;
  monthlyActivity: Array<{
    month: string;
    applications: number;
    interviews: number;
    offers: number;
  }>;
  statusDistribution: Array<{
    status: ApplicationStatus;
    count: number;
    percentage: number;
  }>;
}

// Filtros de búsqueda
export interface SearchFilters {
  status?: ApplicationStatus[];
  platforms?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  salaryRange?: {
    min: number;
    max: number;
  };
  workMode?: ('remote' | 'hybrid' | 'onsite')[];
  location?: string[];
  keywords?: string;
}

// Tipos de utilidad
export type SortOrder = 'asc' | 'desc';
export type SortField = 'appliedDate' | 'company' | 'jobTitle' | 'status' | 'salary';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
}

// Respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Estados de carga
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Notificaciones
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
  createdAt: Date;
}