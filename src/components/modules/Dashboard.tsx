import React from 'react';
import { cn } from '../../utils/cn';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge, StatusBadge } from '../ui/Badge';
import { 
  Briefcase, 
  TrendingUp, 
  Calendar, 
  Target, 
  MapPin, 
  Clock,
  Plus,
  Eye,
  BarChart3,
  Users,
  Award
} from 'lucide-react';
import { useAppStore, useDashboardStats, useJobApplications } from '../../stores/useAppStore';
import { ApplicationStatus } from '../../types';

// Componente de estadística individual
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  description,
  className
}) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-desert-600'
  };
  
  return (
    <Card variant="desert" className={cn('hover:shadow-lg transition-all duration-300', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-desert-600">{title}</p>
            <p className="text-2xl font-bold text-desert-900">{value}</p>
            {change && (
              <p className={cn('text-sm font-medium', changeColors[changeType])}>
                {change}
              </p>
            )}
            {description && (
              <p className="text-xs text-desert-500">{description}</p>
            )}
          </div>
          <div className="h-12 w-12 rounded-full bg-desert-100 flex items-center justify-center">
            <div className="text-desert-600">{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de aplicaciones recientes
const RecentApplications: React.FC = () => {
  const { applications } = useJobApplications();
  const recentApps = applications.slice(0, 5);
  
  return (
    <Card variant="desert">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Aplicaciones Recientes</span>
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Ver todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {recentApps.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 text-desert-300 mx-auto mb-4" />
            <p className="text-desert-600 mb-4">No hay aplicaciones registradas</p>
            <Button variant="desert" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Agregar primera aplicación
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {recentApps.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-medium text-desert-900">{app.jobTitle}</h4>
                      <p className="text-sm text-desert-600">{app.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <StatusBadge status={app.status} size="sm" />
                    <span className="text-xs text-desert-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(app.appliedDate).toLocaleDateString('es-ES')}
                    </span>
                    <span className="text-xs text-desert-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {app.platform}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Componente de distribución de estados
const StatusDistribution: React.FC = () => {
  const { stats } = useDashboardStats();
  
  if (!stats) return null;
  
  const statusLabels: Record<ApplicationStatus, string> = {
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
    withdrawn: 'Retirado'
  };
  
  return (
    <Card variant="desert">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Distribución de Estados</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stats.statusDistribution.map((item) => (
            <div key={item.status} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <StatusBadge status={item.status} size="sm" />
                <span className="text-sm text-desert-700">
                  {statusLabels[item.status]}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-desert-900">
                  {item.count}
                </span>
                <span className="text-xs text-desert-500">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de plataformas principales
const TopPlatforms: React.FC = () => {
  const { stats } = useDashboardStats();
  
  if (!stats) return null;
  
  return (
    <Card variant="desert">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Plataformas Principales</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stats.topPlatforms.length === 0 ? (
          <p className="text-center text-desert-600 py-4">No hay datos disponibles</p>
        ) : (
          <div className="space-y-3">
            {stats.topPlatforms.map((platform, index) => (
              <div key={platform.platform} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white',
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-600' : 'bg-desert-400'
                  )}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-desert-900">
                    {platform.platform}
                  </span>
                </div>
                <Badge variant="outline" size="sm">
                  {platform.count} aplicaciones
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Componente de acciones rápidas
const QuickActions: React.FC = () => {
  const { setCurrentView } = useAppStore();
  
  const actions = [
    {
      title: 'Nueva Aplicación',
      description: 'Registrar una nueva aplicación de trabajo',
      icon: <Plus className="h-5 w-5" />,
      action: () => setCurrentView('applications'),
      variant: 'desert' as const
    },
    {
      title: 'Actualizar Perfil',
      description: 'Editar información personal y profesional',
      icon: <Users className="h-5 w-5" />,
      action: () => setCurrentView('profile'),
      variant: 'oasis' as const
    },
    {
      title: 'Explorar Sitios',
      description: 'Descubrir nuevas plataformas de empleo',
      icon: <MapPin className="h-5 w-5" />,
      action: () => setCurrentView('job-sites'),
      variant: 'outline' as const
    },
    {
      title: 'Generar CV',
      description: 'Crear o actualizar tu currículum',
      icon: <Award className="h-5 w-5" />,
      action: () => setCurrentView('cv-generator'),
      variant: 'ghost' as const
    }
  ];
  
  return (
    <Card variant="desert">
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onClick={action.action}
              className="h-auto p-4 flex flex-col items-start space-y-2 text-left"
            >
              <div className="flex items-center space-x-2">
                {action.icon}
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-xs opacity-80">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Componente principal del Dashboard
const Dashboard: React.FC = () => {
  const { stats, calculateStats } = useDashboardStats();
  const { applications } = useJobApplications();
  
  React.useEffect(() => {
    calculateStats();
  }, [applications.length, calculateStats]);
  
  if (!stats) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-desert-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-desert-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-desert-900 flex items-center space-x-3">
            <span className="text-4xl">🐪</span>
            <span>Dashboard del Desierto</span>
          </h1>
          <p className="text-desert-600 mt-2">
            Bienvenido a tu centro de control para la búsqueda de empleo
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-oasis-50 border-oasis-200 text-oasis-700">
            <Clock className="h-3 w-3 mr-1" />
            Última actualización: {new Date().toLocaleTimeString('es-ES')}
          </Badge>
        </div>
      </div>
      
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Aplicaciones"
          value={stats.totalApplications}
          icon={<Briefcase className="h-6 w-6" />}
          description="Aplicaciones registradas"
        />
        <StatCard
          title="Aplicaciones Activas"
          value={stats.activeApplications}
          icon={<TrendingUp className="h-6 w-6" />}
          description="En proceso de selección"
        />
        <StatCard
          title="Entrevistas Programadas"
          value={stats.interviewsScheduled}
          icon={<Calendar className="h-6 w-6" />}
          description="Próximas entrevistas"
        />
        <StatCard
          title="Ofertas Recibidas"
          value={stats.offersReceived}
          icon={<Award className="h-6 w-6" />}
          description="Ofertas de trabajo"
        />
      </div>
      
      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Tasa de Respuesta"
          value={`${stats.responseRate.toFixed(1)}%`}
          changeType={stats.responseRate > 20 ? 'positive' : stats.responseRate > 10 ? 'neutral' : 'negative'}
          icon={<Target className="h-6 w-6" />}
          description="Porcentaje de respuestas"
        />
        <StatCard
          title="Tiempo Promedio de Respuesta"
          value={`${Math.round(stats.averageResponseTime)} días`}
          icon={<Clock className="h-6 w-6" />}
          description="Tiempo hasta primera respuesta"
        />
        <StatCard
          title="Plataformas Activas"
          value={stats.topPlatforms.length}
          icon={<MapPin className="h-6 w-6" />}
          description="Sitios web utilizados"
        />
      </div>
      
      {/* Secciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <RecentApplications />
          <QuickActions />
        </div>
        <div className="space-y-6">
          <StatusDistribution />
          <TopPlatforms />
        </div>
      </div>
    </div>
  );
};

export { Dashboard };