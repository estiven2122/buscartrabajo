import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { JobApplication, ApplicationStatus, UserProfile } from '../types';

// Utility para combinar clases de Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formateo de fechas
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Formateo de texto
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatCurrency = (amount: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Validaciones
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-\(\)]{9,}$/;
  return phoneRegex.test(phone);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Funciones de estado de aplicaciones
export const getStatusColor = (status: ApplicationStatus): string => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800 border-gray-200',
    applied: 'bg-blue-100 text-blue-800 border-blue-200',
    under_review: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    interview_scheduled: 'bg-purple-100 text-purple-800 border-purple-200',
    interview_completed: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    second_round: 'bg-orange-100 text-orange-800 border-orange-200',
    final_round: 'bg-red-100 text-red-800 border-red-200',
    offer_received: 'bg-green-100 text-green-800 border-green-200',
    accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    withdrawn: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[status] || colors.applied;
};

export const getStatusLabel = (status: ApplicationStatus): string => {
  const labels = {
    draft: 'Borrador',
    applied: 'Aplicado',
    under_review: 'En Revisión',
    interview_scheduled: 'Entrevista Programada',
    interview_completed: 'Entrevista Completada',
    second_round: 'Segunda Ronda',
    final_round: 'Ronda Final',
    offer_received: 'Oferta Recibida',
    accepted: 'Aceptado',
    rejected: 'Rechazado',
    withdrawn: 'Retirado',
  };
  return labels[status] || 'Desconocido';
};

// Funciones de filtrado y búsqueda
export const filterApplications = (
  applications: JobApplication[],
  filters: {
    status?: ApplicationStatus[];
    company?: string;
    position?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }
): JobApplication[] => {
  return applications.filter((app) => {
    if (filters.status && filters.status.length > 0 && !filters.status.includes(app.status)) {
      return false;
    }
    if (filters.company && !app.company.toLowerCase().includes(filters.company.toLowerCase())) {
      return false;
    }
    if (filters.position && !app.jobTitle.toLowerCase().includes(filters.position.toLowerCase())) {
      return false;
    }
    if (filters.dateFrom && new Date(app.appliedDate) < filters.dateFrom) {
      return false;
    }
    if (filters.dateTo && new Date(app.appliedDate) > filters.dateTo) {
      return false;
    }
    return true;
  });
};

export const searchApplications = (applications: JobApplication[], query: string): JobApplication[] => {
  if (!query.trim()) return applications;
  
  const searchTerm = query.toLowerCase();
  return applications.filter(
    (app) =>
      app.company.toLowerCase().includes(searchTerm) ||
      app.jobTitle.toLowerCase().includes(searchTerm) ||
      app.description?.toLowerCase().includes(searchTerm) ||
      app.notes?.toLowerCase().includes(searchTerm)
  );
};

// Funciones de ordenamiento
export const sortApplications = (
  applications: JobApplication[],
  sortBy: 'date' | 'company' | 'position' | 'status',
  order: 'asc' | 'desc' = 'desc'
): JobApplication[] => {
  return [...applications].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime();
        break;
      case 'company':
        comparison = a.company.localeCompare(b.company);
        break;
      case 'position':
        comparison = a.jobTitle.localeCompare(b.jobTitle);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
};

// Funciones de generación de IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Funciones de localStorage
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Funciones de validación de perfil
export const validateProfile = (profile: Partial<UserProfile>): string[] => {
  const errors: string[] = [];
  
  if (!profile.personalInfo?.fullName?.trim()) {
    errors.push('El nombre completo es requerido');
  }
  
  if (!profile.personalInfo?.email?.trim()) {
    errors.push('El email es requerido');
  } else if (!isValidEmail(profile.personalInfo.email)) {
    errors.push('El email no es válido');
  }
  
  if (profile.personalInfo?.phone && !isValidPhone(profile.personalInfo.phone)) {
    errors.push('El teléfono no es válido');
  }
  
  if (profile.personalInfo?.portfolio && !isValidURL(profile.personalInfo.portfolio)) {
    errors.push('La URL del portafolio no es válida');
  }
  
  if (profile.personalInfo?.linkedIn && !isValidURL(profile.personalInfo.linkedIn)) {
    errors.push('La URL de LinkedIn no es válida');
  }
  
  return errors;
};

// Funciones de exportación
export const exportToJSON = <T>(data: T, filename: string): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escapar comillas y envolver en comillas si contiene comas
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Función para calcular días transcurridos
export const daysSince = (date: Date | string): number => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Función para obtener el saludo según la hora
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
};

// Función para generar colores aleatorios para avatares
export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

// Función para obtener iniciales
export const getInitials = (fullName: string): string => {
  const names = fullName.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
};

// Función para obtener iniciales desde UserProfile
export const getInitialsFromProfile = (profile: UserProfile): string => {
  return getInitials(profile.personalInfo.fullName);
};