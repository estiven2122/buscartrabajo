import { CoverLetterTemplate } from '../types';

// Plantillas predefinidas de cartas de presentación
export const defaultTemplates: CoverLetterTemplate[] = [
  {
    id: 'tech-general',
    name: 'Tecnología - General',
    subject: 'Aplicación para {{job_title}} - {{your_name}}',
    category: 'tech',
    content: `Estimado/a {{hiring_manager}},

Me dirijo a usted para expresar mi interés en la posición de {{job_title}} en {{company_name}}. Con {{years_experience}} años de experiencia en desarrollo de software y una sólida formación en {{main_skills}}, estoy convencido/a de que puedo contribuir significativamente al éxito de su equipo.

En mi rol anterior como {{previous_position}} en {{previous_company}}, logré:
• {{achievement_1}}
• {{achievement_2}}
• {{achievement_3}}

Mis habilidades técnicas incluyen {{technical_skills}}, y tengo experiencia trabajando con metodologías ágiles y en equipos multidisciplinarios. Me apasiona mantenerme actualizado/a con las últimas tecnologías y mejores prácticas de la industria.

Estoy particularmente interesado/a en esta oportunidad porque {{why_company}}. Creo que mi experiencia en {{relevant_experience}} sería valiosa para los proyectos que maneja su equipo.

Adjunto mi currículum para su revisión y estaría encantado/a de discutir cómo mis habilidades pueden beneficiar a {{company_name}}. Quedo a la espera de su respuesta.

Atentamente,
{{your_name}}`,
    variables: [
      'hiring_manager',
      'job_title',
      'company_name',
      'years_experience',
      'main_skills',
      'previous_position',
      'previous_company',
      'achievement_1',
      'achievement_2',
      'achievement_3',
      'technical_skills',
      'why_company',
      'relevant_experience',
      'your_name'
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: true,
  },
  {
    id: 'marketing-general',
    name: 'Marketing - General',
    subject: 'Aplicación para {{job_title}} - {{your_name}}',
    category: 'creative',
    content: `Estimado/a {{hiring_manager}},

Espero que este mensaje le encuentre bien. Me pongo en contacto con usted para expresar mi interés en la posición de {{job_title}} en {{company_name}}. Con {{years_experience}} años de experiencia en marketing digital y una pasión por crear estrategias que generen resultados medibles, estoy emocionado/a por la oportunidad de contribuir al crecimiento de su empresa.

En mi experiencia como {{previous_position}} en {{previous_company}}, he desarrollado y ejecutado campañas exitosas que han logrado:
• {{achievement_1}}
• {{achievement_2}}
• {{achievement_3}}

Mi experiencia abarca {{marketing_channels}}, y tengo un sólido conocimiento de herramientas como {{marketing_tools}}. Me especializo en {{specialization}} y siempre busco maneras innovadoras de conectar con las audiencias objetivo.

Lo que más me atrae de {{company_name}} es {{why_company}}. Creo que mi experiencia en {{relevant_experience}} y mi enfoque orientado a datos pueden ayudar a impulsar sus objetivos de marketing.

Estaría encantado/a de discutir cómo mis habilidades en {{key_skills}} pueden contribuir al éxito continuo de su equipo. Adjunto mi currículum y portafolio para su consideración.

Quedo a la espera de su respuesta.

Saludos cordiales,
{{your_name}}`,
    variables: [
      'hiring_manager',
      'job_title',
      'company_name',
      'years_experience',
      'previous_position',
      'previous_company',
      'achievement_1',
      'achievement_2',
      'achievement_3',
      'marketing_channels',
      'marketing_tools',
      'specialization',
      'why_company',
      'relevant_experience',
      'key_skills',
      'your_name'
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: true,
  },
  {
    id: 'sales-general',
    name: 'Ventas - General',
    subject: 'Aplicación para {{job_title}} - {{your_name}}',
    category: 'sales',
    content: `Estimado/a {{hiring_manager}},

Me dirijo a usted con gran entusiasmo para postularme a la posición de {{job_title}} en {{company_name}}. Con {{years_experience}} años de experiencia en ventas y un historial comprobado de superación de objetivos, estoy seguro/a de que puedo contribuir significativamente al crecimiento de su equipo comercial.

En mi rol como {{previous_position}} en {{previous_company}}, he logrado:
• {{achievement_1}}
• {{achievement_2}}
• {{achievement_3}}

Mi enfoque se basa en {{sales_approach}}, y tengo experiencia en {{sales_type}}. Utilizo herramientas como {{sales_tools}} para optimizar mi proceso de ventas y mantener relaciones sólidas con los clientes.

Lo que me motiva de {{company_name}} es {{why_company}}. Creo que mi experiencia en {{relevant_experience}} y mi capacidad para {{key_strength}} serían valiosas para alcanzar los objetivos comerciales de su empresa.

Me encantaría tener la oportunidad de discutir cómo mis habilidades en {{sales_skills}} pueden impulsar el crecimiento de ventas en {{company_name}}. Estoy disponible para una entrevista en el momento que considere conveniente.

Gracias por su tiempo y consideración.

Atentamente,
{{your_name}}`,
    variables: [
      'hiring_manager',
      'job_title',
      'company_name',
      'years_experience',
      'previous_position',
      'previous_company',
      'achievement_1',
      'achievement_2',
      'achievement_3',
      'sales_approach',
      'sales_type',
      'sales_tools',
      'why_company',
      'relevant_experience',
      'key_strength',
      'sales_skills',
      'your_name'
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: true,
  },
  {
    id: 'finance-general',
    name: 'Finanzas - General',
    subject: 'Aplicación para {{job_title}} - {{your_name}}',
    category: 'management',
    content: `Estimado/a {{hiring_manager}},

Tengo el honor de dirigirme a usted para expresar mi interés en la posición de {{job_title}} en {{company_name}}. Con {{years_experience}} años de experiencia en el sector financiero y una sólida formación en {{education_background}}, estoy preparado/a para contribuir al éxito financiero de su organización.

En mi experiencia como {{previous_position}} en {{previous_company}}, he demostrado mi capacidad para:
• {{achievement_1}}
• {{achievement_2}}
• {{achievement_3}}

Mi experiencia incluye {{finance_areas}}, y tengo competencia avanzada en {{finance_tools}}. Poseo certificaciones en {{certifications}} y mantengo un enfoque riguroso en el cumplimiento normativo y la precisión analítica.

Lo que me atrae de {{company_name}} es {{why_company}}. Estoy convencido/a de que mi experiencia en {{relevant_experience}} y mi capacidad para {{key_skill}} pueden agregar valor significativo a su equipo financiero.

Estaría muy interesado/a en discutir cómo mis habilidades en {{finance_skills}} pueden contribuir a los objetivos estratégicos de {{company_name}}. Adjunto mi currículum para su revisión.

Quedo a la espera de su respuesta.

Cordialmente,
{{your_name}}`,
    variables: [
      'hiring_manager',
      'job_title',
      'company_name',
      'years_experience',
      'education_background',
      'previous_position',
      'previous_company',
      'achievement_1',
      'achievement_2',
      'achievement_3',
      'finance_areas',
      'finance_tools',
      'certifications',
      'why_company',
      'relevant_experience',
      'key_skill',
      'finance_skills',
      'your_name'
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: true,
  },
];

// Función para obtener plantilla por categoría
export const getTemplatesByCategory = (category: string) => {
  return defaultTemplates.filter(template => template.category === category);
};

// Categorías disponibles
export const categories = [
  { value: 'general', label: 'General' },
  { value: 'tech', label: 'Tecnología' },
  { value: 'creative', label: 'Creativo' },
  { value: 'sales', label: 'Ventas' },
  { value: 'management', label: 'Gerencial' },
  { value: 'custom', label: 'Personalizado' },
];

// Función para obtener todas las variables únicas
export const getAllVariables = () => {
  const allVariables = new Set<string>();
  defaultTemplates.forEach(template => {
    template.variables.forEach(variable => allVariables.add(variable));
  });
  return Array.from(allVariables).sort();
};