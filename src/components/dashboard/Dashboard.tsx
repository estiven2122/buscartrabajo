import React from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  Plus,
  Eye,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '../ui';
import { useAppStore } from '../../stores/useAppStore';
import { formatDate, getStatusLabel, daysSince, getGreeting } from '../../utils';
import { defaultJobSites } from '../../data/jobSites';

export const Dashboard: React.FC = () => {
  const { userProfile, jobApplications, dashboardStats } = useAppStore((state) => ({
    userProfile: state.userProfile,
    jobApplications: state.jobApplications,
    dashboardStats: state.dashboardStats
  }));
  
  // Obtener aplicaciones recientes (últimas 5)
  const recentApplications = jobApplications
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 5);

  // Obtener próximas entrevistas
  const upcomingInterviews = jobApplications
    .filter(app => app.status === 'interview_scheduled' && app.interviewDates.length > 0)
    .sort((a, b) => new Date(a.interviewDates[0]).getTime() - new Date(b.interviewDates[0]).getTime())
    .slice(0, 3);

  const statCards = [
    {
      title: 'Total Expediciones',
      value: dashboardStats?.totalApplications || 0,
      description: 'Aplicaciones enviadas',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'En Proceso',
      value: dashboardStats?.activeApplications || 0,
      description: 'Esperando respuesta',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Entrevistas',
      value: dashboardStats?.interviewsScheduled || 0,
      description: 'Oportunidades activas',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Ofertas',
      value: dashboardStats?.offersReceived || 0,
      description: 'Ofertas recibidas',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header de bienvenida */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {getGreeting()}, {userProfile?.personalInfo?.fullName?.split(' ')[0] || 'Viajero'}! 🐪
            </h1>
            <p className="text-amber-100">
              Bienvenido a tu oasis personal. Aquí tienes un resumen de tu travesía laboral.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-20">🏜️</div>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-amber-900">{stat.value}</p>
                    <p className="text-xs text-amber-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aplicaciones recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>Expediciones Recientes</span>
            </CardTitle>
            <CardDescription>
              Tus últimas aplicaciones enviadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-amber-900">{app.jobTitle}</h4>
                      <p className="text-sm text-amber-600">{app.company}</p>
                      <p className="text-xs text-amber-500">
                        Hace {daysSince(app.appliedDate)} días
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={app.status as any}>
                        {getStatusLabel(app.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver todas las expediciones
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-amber-300 mx-auto mb-4" />
                <p className="text-amber-600 mb-4">No has iniciado ninguna expedición aún</p>
                <Button variant="desert">
                  <Plus className="w-4 h-4 mr-2" />
                  Comenzar primera expedición
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Próximas entrevistas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>Próximas Citas</span>
            </CardTitle>
            <CardDescription>
              Entrevistas y eventos programados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map((app) => (
                  <div key={app.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900">{app.jobTitle}</h4>
                      <p className="text-sm text-green-600">{app.company}</p>
                      <p className="text-xs text-green-500">
                        {formatDate(app.interviewDates[0])}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-amber-300 mx-auto mb-4" />
                <p className="text-amber-600">No tienes entrevistas programadas</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rutas populares del desierto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <span>Rutas Populares del Desierto</span>
          </CardTitle>
          <CardDescription>
            Sitios de empleo más visitados por otros viajeros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {defaultJobSites.slice(0, 6).map((site) => (
              <div key={site.id} className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Globe className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-amber-900">{site.name}</h4>
                  <p className="text-xs text-amber-600">{site.category}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-amber-600">Popular</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <MapPin className="w-4 h-4 mr-2" />
            Explorar todas las rutas
          </Button>
        </CardContent>
      </Card>

      {/* Progreso semanal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span>Progreso de la Semana</span>
          </CardTitle>
          <CardDescription>
            Tu actividad en los últimos 7 días
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-amber-600 mb-2">Gráfico de progreso próximamente</p>
              <p className="text-sm text-amber-500">
                Aquí podrás ver tu actividad semanal y tendencias
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};