# BuscaCamello - Arquitectura Técnica

## 1. Diseño de Arquitectura

```mermaid
graph TD
    A[Navegador del Usuario] --> B[Aplicación React Frontend]
    B --> C[Zustand Store]
    B --> D[LocalStorage]
    B --> E[IndexedDB]
    
    subgraph "Capa Frontend"
        B
        C
    end
    
    subgraph "Capa de Almacenamiento Local"
        D
        E
    end
    
    subgraph "Servicios Externos"
        F[APIs de Sitios de Empleo]
        G[Servicios de Exportación PDF]
    end
    
    B -.-> F
    B -.-> G
```

## 2. Descripción de Tecnologías

- **Frontend**: React@18 + TypeScript + Vite
- **Styling**: Tailwind CSS@3 + Shadcn/ui
- **Estado**: Zustand para gestión de estado global
- **Formularios**: React Hook Form + Zod para validación
- **Almacenamiento**: LocalStorage + IndexedDB para persistencia
- **Iconos**: Lucide React con temática del desierto
- **Utilidades**: date-fns para manejo de fechas, clsx para clases condicionales

## 3. Definiciones de Rutas

| Ruta | Propósito |
|------|----------|
| / | Dashboard principal - vista general de la búsqueda de empleo |
| /profile | Mochila Digital - gestión de perfil personal y datos |
| /sites | Rutas de Empleo - organizador de sitios web de trabajo |
| /applications | Diario de Travesía - tracker de aplicaciones enviadas |
| /letters | Cartas del Camello - generador de cartas de presentación |
| /cv-builder | Oasis de CV - constructor de currículum adaptable |
| /settings | Configuración general de la aplicación |

## 4. Definiciones de API

### 4.1 API Principal

**Gestión de Perfil de Usuario**
```typescript
// Tipos de datos principales
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  createdAt: Date;
  updatedAt: Date;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  skills: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}
```

**Gestión de Aplicaciones**
```typescript
interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  jobUrl: string;
  appliedDate: Date;
  status: ApplicationStatus;
  source: string; // LinkedIn, Indeed, etc.
  salary?: string;
  location: string;
  notes: string;
  followUpDate?: Date;
  interviewDates: Date[];
  documents: ApplicationDocument[];
}

type ApplicationStatus = 
  | 'applied'
  | 'under_review'
  | 'interview_scheduled'
  | 'interviewed'
  | 'rejected'
  | 'offer_received'
  | 'accepted';

interface ApplicationDocument {
  id: string;
  type: 'cv' | 'cover_letter' | 'portfolio';
  name: string;
  url: string;
  createdAt: Date;
}
```

**Plantillas de Cartas**
```typescript
interface CoverLetterTemplate {
  id: string;
  name: string;
  industry: string;
  content: string;
  variables: TemplateVariable[];
  createdAt: Date;
  lastUsed?: Date;
}

interface TemplateVariable {
  key: string;
  label: string;
  type: 'text' | 'date' | 'list';
  required: boolean;
  defaultValue?: string;
}
```

## 5. Arquitectura del Servidor

```mermaid
graph TD
    A[Cliente React] --> B[Capa de Presentación]
    B --> C[Capa de Lógica de Negocio]
    C --> D[Capa de Almacenamiento]
    
    subgraph "Frontend"
        B[Componentes React]
        E[Zustand Stores]
        F[Custom Hooks]
    end
    
    subgraph "Lógica de Negocio"
        C[Servicios de Aplicación]
        G[Validadores]
        H[Utilidades]
    end
    
    subgraph "Almacenamiento"
        D[LocalStorage API]
        I[IndexedDB API]
        J[File System API]
    end
```

## 6. Modelo de Datos

### 6.1 Definición del Modelo de Datos

```mermaid
erDiagram
    USER_PROFILE ||--o{ JOB_APPLICATION : creates
    USER_PROFILE ||--o{ COVER_LETTER_TEMPLATE : owns
    USER_PROFILE ||--o{ CV_VERSION : has
    JOB_APPLICATION ||--o{ APPLICATION_DOCUMENT : contains
    JOB_APPLICATION ||--o{ INTERVIEW_NOTE : has
    COVER_LETTER_TEMPLATE ||--o{ TEMPLATE_VARIABLE : includes
    
    USER_PROFILE {
        string id PK
        string name
        string email
        string phone
        string address
        string linkedin
        string github
        json skills
        json experience
        json education
        datetime createdAt
        datetime updatedAt
    }
    
    JOB_APPLICATION {
        string id PK
        string userId FK
        string jobTitle
        string company
        string jobUrl
        datetime appliedDate
        string status
        string source
        string salary
        string location
        text notes
        datetime followUpDate
        json interviewDates
    }
    
    CV_VERSION {
        string id PK
        string userId FK
        string name
        string industry
        json content
        string format
        datetime createdAt
        datetime lastModified
    }
    
    COVER_LETTER_TEMPLATE {
        string id PK
        string userId FK
        string name
        string industry
        text content
        json variables
        datetime createdAt
        datetime lastUsed
    }
```

### 6.2 Lenguaje de Definición de Datos

**Almacenamiento LocalStorage**
```typescript
// Configuración de almacenamiento local
const STORAGE_KEYS = {
  USER_PROFILE: 'buscacamello_user_profile',
  APPLICATIONS: 'buscacamello_applications',
  TEMPLATES: 'buscacamello_templates',
  CV_VERSIONS: 'buscacamello_cv_versions',
  SETTINGS: 'buscacamello_settings'
} as const;

// Inicialización de datos por defecto
const DEFAULT_PROFILE: Partial<UserProfile> = {
  skills: [],
  experience: [],
  education: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

const DEFAULT_SETTINGS = {
  theme: 'desert',
  language: 'es',
  notifications: true,
  autoSave: true,
  reminderDays: 7
};
```

**Configuración IndexedDB**
```typescript
// Configuración de base de datos IndexedDB
const DB_CONFIG = {
  name: 'BuscaCamelloDB',
  version: 1,
  stores: {
    applications: {
      keyPath: 'id',
      indexes: [
        { name: 'company', keyPath: 'company' },
        { name: 'status', keyPath: 'status' },
        { name: 'appliedDate', keyPath: 'appliedDate' },
        { name: 'followUpDate', keyPath: 'followUpDate' }
      ]
    },
    documents: {
      keyPath: 'id',
      indexes: [
        { name: 'applicationId', keyPath: 'applicationId' },
        { name: 'type', keyPath: 'type' }
      ]
    },
    templates: {
      keyPath: 'id',
      indexes: [
        { name: 'industry', keyPath: 'industry' },
        { name: 'lastUsed', keyPath: 'lastUsed' }
      ]
    }
  }
};
```

**Datos de Inicialización**
```typescript
// Sitios de empleo predefinidos
const JOB_SITES = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/jobs/',
    category: 'professional',
    logo: '/logos/linkedin.svg',
    description: 'Red profesional líder mundial'
  },
  {
    id: 'indeed',
    name: 'Indeed',
    url: 'https://www.indeed.com/',
    category: 'general',
    logo: '/logos/indeed.svg',
    description: 'Motor de búsqueda de empleos'
  },
  {
    id: 'computrabajo',
    name: 'Computrabajo',
    url: 'https://www.computrabajo.com/',
    category: 'latam',
    logo: '/logos/computrabajo.svg',
    description: 'Portal de empleos de Latinoamérica'
  }
];

// Plantillas de cartas predefinidas
const DEFAULT_TEMPLATES = [
  {
    id: 'tech-general',
    name: 'Tecnología - General',
    industry: 'technology',
    content: `Estimado/a {{hiring_manager}},\n\nMe dirijo a usted para expresar mi interés en la posición de {{job_title}} en {{company_name}}...`
  }
];
```