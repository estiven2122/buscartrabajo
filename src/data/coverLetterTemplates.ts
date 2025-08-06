import { CoverLetterTemplate } from '../types';

// Plantillas de cartas de presentación predefinidas para BuscaCamello
export const defaultCoverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'general-professional',
    name: 'Profesional General',
    subject: 'Aplicación para el puesto de {{jobTitle}} en {{company}}',
    content: `Estimado/a {{recruiterName}},

Me dirijo a usted con gran interés en la posición de {{jobTitle}} que han publicado en {{platform}}. Con {{yearsExperience}} años de experiencia en {{field}}, creo que puedo aportar valor significativo a {{company}}.

En mi rol anterior como {{previousRole}} en {{previousCompany}}, logré:
• {{achievement1}}
• {{achievement2}}
• {{achievement3}}

Mis habilidades en {{keySkills}} y mi experiencia con {{technologies}} me posicionan como un candidato ideal para este rol. Estoy particularmente atraído/a por {{companyValues}} y la oportunidad de {{growthOpportunity}}.

Adjunto mi currículum para su revisión y estaría encantado/a de discutir cómo puedo contribuir al éxito de {{company}}. Quedo a su disposición para una entrevista en el momento que considere conveniente.

Atentamente,
{{fullName}}
{{phone}} | {{email}}`,
    variables: [
      'recruiterName', 'jobTitle', 'company', 'platform', 'yearsExperience', 'field',
      'previousRole', 'previousCompany', 'achievement1', 'achievement2', 'achievement3',
      'keySkills', 'technologies', 'companyValues', 'growthOpportunity', 'fullName', 'phone', 'email'
    ],
    category: 'general',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: true
  },
  {
    id: 'tech-developer',
    name: 'Desarrollador de Software',
    subject: 'Desarrollador {{techStack}} - {{jobTitle}} en {{company}}',
    content: `Hola {{recruiterName}},

Soy {{fullName}}, desarrollador de software con {{yearsExperience}} años de experiencia especializado en {{techStack}}. Me emociona la oportunidad de unirme a {{company}} como {{jobTitle}}.

🚀 Experiencia técnica relevante:
• Desarrollo con {{primaryTech}} durante {{techYears}} años
• Proyectos destacados: {{project1}}, {{project2}}
• Metodologías: {{methodologies}}
• Bases de datos: {{databases}}

💡 Logros recientes:
• {{technicalAchievement1}}
• {{technicalAchievement2}}
• Contribuciones open source: {{openSourceContributions}}

He revisado los requisitos del puesto y mi experiencia con {{requiredTech}} y {{additionalSkills}} me permite abordar los desafíos técnicos que mencionan. Estoy especialmente interesado en {{projectType}} y la oportunidad de trabajar con {{teamStructure}}.

Mi GitHub ({{githubUrl}}) muestra ejemplos de mi trabajo. Me encantaría discutir cómo puedo contribuir a {{company}} y sus proyectos innovadores.

¡Espero su respuesta!

Saludos,
{{fullName}}
{{email}} | {{linkedinUrl}}`,
    variables: [
      'recruiterName', 'fullName', 'yearsExperience', 'techStack', 'company', 'jobTitle',
      'primaryTech', 'techYears', 'project1', 'project2', 'methodologies', 'databases',
      'technicalAchievement1', 'technicalAchievement2', 'openSourceContributions',
      'requiredTech', 'additionalSkills', 'projectType', 'teamStructure', 'githubUrl',
      'email', 'linkedinUrl'
    ],
    category: 'tech',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: false
  },
  {
    id: 'creative-designer',
    name: 'Diseñador Creativo',
    subject: 'Portfolio de {{designSpecialty}} - {{jobTitle}} en {{company}}',
    content: `¡Hola {{recruiterName}}!

Soy {{fullName}}, {{designSpecialty}} con pasión por crear experiencias visuales impactantes. La posición de {{jobTitle}} en {{company}} representa exactamente el tipo de desafío creativo que busco.

🎨 Mi enfoque creativo:
• Especialización en {{designTools}} y {{designMethodology}}
• {{yearsExperience}} años creando {{designType}}
• Portfolio: {{portfolioUrl}}

✨ Proyectos destacados:
• {{project1}}: {{projectDescription1}}
• {{project2}}: {{projectDescription2}}
• Reconocimientos: {{awards}}

🎯 Por qué {{company}}:
Me inspira {{companyMission}} y creo que mi estilo {{designStyle}} complementaría perfectamente {{brandVision}}. Mi experiencia en {{industryExperience}} me ha enseñado la importancia de {{designPrinciple}}.

Adjunto mi portfolio y estaría emocionado/a de mostrarle cómo mi creatividad puede impulsar los objetivos visuales de {{company}}.

¡Espero poder colaborar pronto!

Creativamente,
{{fullName}}
{{email}} | {{portfolioUrl}}`,
    variables: [
      'recruiterName', 'fullName', 'designSpecialty', 'jobTitle', 'company',
      'designTools', 'designMethodology', 'yearsExperience', 'designType', 'portfolioUrl',
      'project1', 'projectDescription1', 'project2', 'projectDescription2', 'awards',
      'companyMission', 'designStyle', 'brandVision', 'industryExperience',
      'designPrinciple', 'email'
    ],
    category: 'creative',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: false
  },
  {
    id: 'sales-commercial',
    name: 'Ventas y Comercial',
    subject: 'Impulsar ventas en {{company}} - {{jobTitle}}',
    content: `Estimado/a {{recruiterName}},

¡Los números hablan por sí solos! Como profesional de ventas con {{yearsExperience}} años de experiencia, he generado más de {{totalRevenue}} en ingresos y superado mis objetivos en un {{performancePercentage}}%.

📈 Resultados que entregan valor:
• {{salesAchievement1}}
• {{salesAchievement2}}
• Crecimiento de cartera: {{portfolioGrowth}}
• Retención de clientes: {{retentionRate}}

🎯 Mi enfoque de ventas:
• Metodología {{salesMethodology}}
• CRM: {{crmExperience}}
• Especialización en {{salesSpecialty}}
• Mercados: {{targetMarkets}}

{{company}} tiene una reputación excepcional en {{industryReputation}}, y estoy convencido/a de que mi experiencia en {{relevantExperience}} puede contribuir significativamente a {{salesGoals}}.

Me encantaría discutir cómo puedo ayudar a {{company}} a alcanzar y superar sus objetivos de ventas para {{timeFrame}}.

¡Hagamos que los números crezcan juntos!

Saludos comerciales,
{{fullName}}
{{phone}} | {{email}}`,
    variables: [
      'recruiterName', 'yearsExperience', 'totalRevenue', 'performancePercentage',
      'salesAchievement1', 'salesAchievement2', 'portfolioGrowth', 'retentionRate',
      'salesMethodology', 'crmExperience', 'salesSpecialty', 'targetMarkets',
      'company', 'industryReputation', 'relevantExperience', 'salesGoals',
      'timeFrame', 'fullName', 'phone', 'email', 'jobTitle'
    ],
    category: 'sales',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: false
  },
  {
    id: 'management-leadership',
    name: 'Liderazgo y Gestión',
    subject: 'Liderazgo estratégico para {{jobTitle}} en {{company}}',
    content: `Estimado/a {{recruiterName}},

Como líder con {{yearsExperience}} años de experiencia gestionando equipos de {{teamSize}} personas y presupuestos de {{budgetSize}}, estoy emocionado/a por la oportunidad de liderar como {{jobTitle}} en {{company}}.

🏆 Liderazgo que transforma:
• Crecimiento de equipos: {{teamGrowth}}
• Mejora de productividad: {{productivityImprovement}}
• Implementación exitosa de {{strategicInitiative}}
• Reducción de costos: {{costReduction}}

💼 Mi filosofía de liderazgo:
• Enfoque en {{leadershipStyle}}
• Desarrollo de talento a través de {{developmentApproach}}
• Toma de decisiones basada en {{decisionFramework}}
• Comunicación {{communicationStyle}}

🎯 Visión para {{company}}:
Veo una oportunidad única de {{strategicVision}} y aplicar mi experiencia en {{industryExpertise}} para {{businessObjective}}. Mi historial en {{previousSuccess}} demuestra mi capacidad para {{keyCapability}}.

Me encantaría discutir cómo mi liderazgo puede impulsar el crecimiento y la innovación en {{company}}.

Atentamente,
{{fullName}}
{{email}} | {{linkedinUrl}}`,
    variables: [
      'recruiterName', 'yearsExperience', 'teamSize', 'budgetSize', 'jobTitle', 'company',
      'teamGrowth', 'productivityImprovement', 'strategicInitiative', 'costReduction',
      'leadershipStyle', 'developmentApproach', 'decisionFramework', 'communicationStyle',
      'strategicVision', 'industryExpertise', 'businessObjective', 'previousSuccess',
      'keyCapability', 'fullName', 'email', 'linkedinUrl'
    ],
    category: 'management',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: false
  },
  {
    id: 'entry-level',
    name: 'Nivel de Entrada',
    subject: 'Candidato motivado para {{jobTitle}} - {{fullName}}',
    content: `Estimado/a {{recruiterName}},

Como recién graduado/a en {{degree}} de {{university}}, estoy emocionado/a de comenzar mi carrera profesional en {{company}} como {{jobTitle}}.

🎓 Preparación académica:
• Graduado/a con {{gpa}} en {{degree}}
• Proyectos relevantes: {{academicProject1}}, {{academicProject2}}
• Cursos especializados: {{relevantCourses}}
• Certificaciones: {{certifications}}

💪 Experiencia práctica:
• {{internshipExperience}}
• Proyectos personales: {{personalProjects}}
• Voluntariado: {{volunteerWork}}
• Habilidades técnicas: {{technicalSkills}}

🚀 Mi motivación:
Aunque soy nuevo/a en el campo profesional, mi {{personalQuality1}} y {{personalQuality2}} me han permitido {{achievement}}. Estoy especialmente interesado/a en {{careerInterest}} y veo en {{company}} la oportunidad perfecta para {{careerGoal}}.

Estoy ansioso/a por aprender, contribuir y crecer junto con el equipo de {{company}}. Mi energía, dedicación y perspectiva fresca pueden aportar valor desde el primer día.

¡Espero la oportunidad de demostrar mi potencial!

Atentamente,
{{fullName}}
{{email}} | {{phone}}`,
    variables: [
      'recruiterName', 'degree', 'university', 'company', 'jobTitle', 'gpa',
      'academicProject1', 'academicProject2', 'relevantCourses', 'certifications',
      'internshipExperience', 'personalProjects', 'volunteerWork', 'technicalSkills',
      'personalQuality1', 'personalQuality2', 'achievement', 'careerInterest',
      'careerGoal', 'fullName', 'email', 'phone'
    ],
    category: 'general',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: false
  }
];

// Categorías de plantillas
export const templateCategories = [
  { id: 'general', name: 'General', description: 'Plantillas versátiles para cualquier industria' },
  { id: 'tech', name: 'Tecnología', description: 'Especializadas para roles técnicos' },
  { id: 'creative', name: 'Creativo', description: 'Para diseñadores y profesionales creativos' },
  { id: 'sales', name: 'Ventas', description: 'Enfocadas en resultados comerciales' },
  { id: 'management', name: 'Gestión', description: 'Para roles de liderazgo y dirección' },
  { id: 'custom', name: 'Personalizada', description: 'Plantillas creadas por el usuario' }
];

// Función para obtener plantillas por categoría
export const getTemplatesByCategory = (category: string): CoverLetterTemplate[] => {
  return defaultCoverLetterTemplates.filter(template => template.category === category);
};

// Función para obtener plantilla por defecto
export const getDefaultTemplate = (): CoverLetterTemplate | undefined => {
  return defaultCoverLetterTemplates.find(template => template.isDefault);
};

// Función para reemplazar variables en plantilla
export const replaceTemplateVariables = (
  template: string, 
  variables: Record<string, string>
): string => {
  let result = template;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value || `[${key}]`);
  });
  return result;
};

// Función para extraer variables de una plantilla
export const extractTemplateVariables = (template: string): string[] => {
  const regex = /{{(.*?)}}/g;
  const variables: string[] = [];
  let match;
  
  while ((match = regex.exec(template)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  
  return variables;
};