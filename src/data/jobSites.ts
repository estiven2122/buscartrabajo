import { JobSite } from '../types';

// Sitios web de empleo predefinidos para BuscaCamello
export const defaultJobSites: JobSite[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/jobs',
    category: 'general',
    description: 'La red profesional más grande del mundo con millones de ofertas de trabajo.',
    features: ['Red profesional', 'Aplicación directa', 'Insights de empresa', 'Recomendaciones'],
    isActive: true,
    notes: 'Ideal para networking y posiciones corporativas.',
    rating: 5
  },
  {
    id: 'indeed',
    name: 'Indeed',
    url: 'https://www.indeed.com',
    category: 'general',
    description: 'Uno de los motores de búsqueda de empleo más populares del mundo.',
    features: ['Búsqueda amplia', 'Alertas de trabajo', 'Reviews de empresas', 'Calculadora de salarios'],
    isActive: true,
    notes: 'Gran variedad de ofertas en todos los sectores.',
    rating: 4
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    url: 'https://www.glassdoor.com',
    category: 'general',
    description: 'Plataforma que combina búsqueda de empleo con reviews de empresas.',
    features: ['Reviews de empresas', 'Información salarial', 'Entrevistas', 'Cultura empresarial'],
    isActive: true,
    notes: 'Excelente para investigar empresas antes de aplicar.',
    rating: 4
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow Jobs',
    url: 'https://stackoverflow.com/jobs',
    category: 'tech',
    description: 'Plataforma especializada en trabajos de tecnología y desarrollo.',
    features: ['Enfoque técnico', 'Stack tecnológico', 'Comunidad de desarrolladores', 'Perfiles técnicos'],
    isActive: true,
    notes: 'Ideal para desarrolladores y profesionales de IT.',
    rating: 5
  },
  {
    id: 'github-jobs',
    name: 'GitHub Jobs',
    url: 'https://jobs.github.com',
    category: 'tech',
    description: 'Trabajos de tecnología directamente desde GitHub.',
    features: ['Integración con GitHub', 'Proyectos open source', 'Desarrolladores', 'Startups tech'],
    isActive: true,
    notes: 'Perfecto para mostrar tu código y proyectos.',
    rating: 4
  },
  {
    id: 'remote-ok',
    name: 'Remote OK',
    url: 'https://remoteok.io',
    category: 'remote',
    description: 'La mayor plataforma de trabajos remotos del mundo.',
    features: ['100% remoto', 'Filtros avanzados', 'Salarios transparentes', 'Global'],
    isActive: true,
    notes: 'Especializado exclusivamente en trabajo remoto.',
    rating: 5
  },
  {
    id: 'weworkremotely',
    name: 'We Work Remotely',
    url: 'https://weworkremotely.com',
    category: 'remote',
    description: 'Comunidad de trabajo remoto con ofertas de calidad.',
    features: ['Trabajo remoto', 'Comunidad activa', 'Empresas verificadas', 'Categorías variadas'],
    isActive: true,
    notes: 'Enfoque en calidad sobre cantidad.',
    rating: 4
  },
  {
    id: 'upwork',
    name: 'Upwork',
    url: 'https://www.upwork.com',
    category: 'freelance',
    description: 'Plataforma líder para trabajo freelance y proyectos.',
    features: ['Freelance', 'Proyectos cortos/largos', 'Pagos seguros', 'Perfiles especializados'],
    isActive: true,
    notes: 'Ideal para freelancers y consultores independientes.',
    rating: 4
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    url: 'https://www.fiverr.com',
    category: 'freelance',
    description: 'Marketplace para servicios digitales y creativos.',
    features: ['Servicios digitales', 'Creatividad', 'Proyectos pequeños', 'Gigs personalizados'],
    isActive: true,
    notes: 'Perfecto para servicios creativos y digitales.',
    rating: 3
  },
  {
    id: 'angellist',
    name: 'AngelList',
    url: 'https://angel.co/jobs',
    category: 'startup',
    description: 'Plataforma especializada en startups y empresas emergentes.',
    features: ['Startups', 'Equity options', 'Innovación', 'Crecimiento rápido'],
    isActive: true,
    notes: 'Ideal para unirse a startups en crecimiento.',
    rating: 4
  },
  {
    id: 'monster',
    name: 'Monster',
    url: 'https://www.monster.com',
    category: 'general',
    description: 'Una de las plataformas de empleo más establecidas.',
    features: ['Búsqueda tradicional', 'CV builder', 'Consejos de carrera', 'Alertas'],
    isActive: true,
    notes: 'Plataforma tradicional con amplia base de datos.',
    rating: 3
  },
  {
    id: 'ziprecruiter',
    name: 'ZipRecruiter',
    url: 'https://www.ziprecruiter.com',
    category: 'general',
    description: 'Plataforma que conecta candidatos con empleadores rápidamente.',
    features: ['Aplicación rápida', 'Matching inteligente', 'Alertas móviles', 'Respuestas rápidas'],
    isActive: true,
    notes: 'Enfoque en velocidad y eficiencia.',
    rating: 4
  },
  {
    id: 'dice',
    name: 'Dice',
    url: 'https://www.dice.com',
    category: 'tech',
    description: 'Especializado en trabajos de tecnología e ingeniería.',
    features: ['Tecnología', 'Ingeniería', 'Salarios competitivos', 'Skills matching'],
    isActive: true,
    notes: 'Enfoque específico en roles técnicos.',
    rating: 4
  },
  {
    id: 'flexjobs',
    name: 'FlexJobs',
    url: 'https://www.flexjobs.com',
    category: 'remote',
    description: 'Trabajos flexibles, remotos y de medio tiempo.',
    features: ['Flexibilidad', 'Trabajo remoto', 'Medio tiempo', 'Trabajos verificados'],
    isActive: true,
    notes: 'Ideal para balance trabajo-vida.',
    rating: 4
  },
  {
    id: 'craigslist',
    name: 'Craigslist',
    url: 'https://craigslist.org',
    category: 'general',
    description: 'Clasificados locales incluyendo ofertas de trabajo.',
    features: ['Local', 'Variedad', 'Directo', 'Sin intermediarios'],
    isActive: true,
    notes: 'Bueno para trabajos locales y temporales.',
    rating: 2
  }
];

// Categorías de sitios web
export const jobSiteCategories = [
  { id: 'general', name: 'General', description: 'Sitios de empleo generales' },
  { id: 'tech', name: 'Tecnología', description: 'Especializados en IT y desarrollo' },
  { id: 'remote', name: 'Remoto', description: 'Enfocados en trabajo remoto' },
  { id: 'freelance', name: 'Freelance', description: 'Proyectos independientes' },
  { id: 'startup', name: 'Startups', description: 'Empresas emergentes' },
  { id: 'corporate', name: 'Corporativo', description: 'Grandes empresas' }
];

// Función para obtener sitios por categoría
export const getJobSitesByCategory = (category: string): JobSite[] => {
  return defaultJobSites.filter(site => site.category === category);
};

// Función para obtener sitios activos
export const getActiveJobSites = (): JobSite[] => {
  return defaultJobSites.filter(site => site.isActive);
};

// Función para buscar sitios
export const searchJobSites = (query: string): JobSite[] => {
  const lowercaseQuery = query.toLowerCase();
  return defaultJobSites.filter(site => 
    site.name.toLowerCase().includes(lowercaseQuery) ||
    site.description.toLowerCase().includes(lowercaseQuery) ||
    site.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};