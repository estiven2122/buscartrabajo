import React from 'react';
import { cn } from '../../utils/cn';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Target, 
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useDashboardStats } from '../../stores/useAppStore';
import { ApplicationStatus } from '../../types';

// Componente de gráfico de barras simple
interface SimpleBarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  maxValue?: number;
  height?: number;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  maxValue, 
  height = 200 
}) => {
  const max = maxValue || Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between" style={{ height }}>
        {data.map((item, index) => {
          const percentage = max > 0 ? (item.value / max) * 100 : 0;
          const barHeight = (percentage / 100) * (height - 40);
          
          return (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div className="text-xs font-medium text-desert-900">
                {item.value}
              </div>
              <div 
                className={cn(
                  'w-8 rounded-t transition-all duration-500 ease-out',
                  item.color || 'bg-desert-400'
                )}
                style={{ height: `${barHeight}px` }}
              />
              <div className="text-xs text-desert-600 text-center max-w-16 truncate">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente de gráfico circular simple
interface SimplePieChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
}

const SimplePieChart: React.FC<SimplePieChartProps> = ({ data, size = 120 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return (
      <div 
        className="rounded-full bg-desert-100 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-desert-500 text-sm">Sin datos</span>
      </div>
    );
  }
  
  let cumulativePercentage = 0;
  
  return (
    <div className="flex items-center space-x-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -cumulativePercentage;
            
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - 10}
                fill="transparent"
                stroke={item.color}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-desert-900">{total}</div>
            <div className="text-xs text-desert-600">Total</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-desert-700">{item.label}</span>
            <span className="text-sm font-medium text-desert-900">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente de tendencias mensuales
const MonthlyTrends: React.FC = () => {
  const { stats } = useDashboardStats();
  
  // Generar datos de ejemplo para tendencias mensuales
  const monthlyData = React.useMemo(() => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    return months.map(month => ({
      label: month,
      value: Math.floor(Math.random() * 20) + 5,
      color: 'bg-desert-400'
    }));
  }, []);
  
  if (!stats) return null;
  
  return (
    <Card variant="desert">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Tendencias Mensuales</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SimpleBarChart data={monthlyData} height={150} />
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>+12% vs mes anterior</span>
          </div>
          <Badge variant="outline" size="sm">
            Últimos 6 meses
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de distribución por estado (gráfico circular)
const StatusPieChart: React.FC = () => {
  const { stats } = useDashboardStats();
  
  if (!stats || stats.statusDistribution.length === 0) {
    return (
      <Card variant="desert">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Distribución por Estado</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <PieChart className="h-12 w-12 text-desert-300 mx-auto mb-4" />
            <p className="text-desert-600">No hay datos para mostrar</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const statusColors: Record<ApplicationStatus, string> = {
    draft: '#f59e0b',
    applied: '#3b82f6',
    under_review: '#8b5cf6',
    interview_scheduled: '#10b981',
    interview_completed: '#06b6d4',
    second_round: '#f97316',
    final_round: '#ef4444',
    offer_received: '#22c55e',
    accepted: '#16a34a',
    rejected: '#dc2626',
    withdrawn: '#6b7280'
  };
  
  const statusLabels: Record<ApplicationStatus, string> = {
    draft: 'Borrador',
    applied: 'Aplicado',
    under_review: 'En Revisión',
    interview_scheduled: 'Entrevista',
    interview_completed: 'Completada',
    second_round: '2da Ronda',
    final_round: 'Final',
    offer_received: 'Oferta',
    accepted: 'Aceptado',
    rejected: 'Rechazado',
    withdrawn: 'Retirado'
  };
  
  const pieData = stats.statusDistribution.map(item => ({
    label: statusLabels[item.status],
    value: item.count,
    color: statusColors[item.status]
  }));
  
  return (
    <Card variant="desert">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PieChart className="h-5 w-5" />
          <span>Distribución por Estado</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <SimplePieChart data={pieData} size={160} />
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de métricas de rendimiento
const PerformanceMetrics: React.FC = () => {
  const { stats } = useDashboardStats();
  
  if (!stats) return null;
  
  const metrics = [
    {
      label: 'Tasa de Conversión',
      value: `${((stats.offersReceived / Math.max(stats.totalApplications, 1)) * 100).toFixed(1)}%`,
      trend: 'positive',
      icon: <Target className="h-4 w-4" />,
      description: 'Ofertas / Aplicaciones'
    },
    {
      label: 'Tiempo Promedio',
      value: `${Math.round(stats.averageResponseTime)} días`,
      trend: stats.averageResponseTime < 7 ? 'positive' : stats.averageResponseTime < 14 ? 'neutral' : 'negative',
      icon: <Clock className="h-4 w-4" />,
      description: 'Hasta primera respuesta'
    },
    {
      label: 'Actividad Semanal',
      value: `${Math.round(stats.totalApplications / 4)} apps`,
      trend: 'neutral',
      icon: <Activity className="h-4 w-4" />,
      description: 'Promedio por semana'
    },
    {
      label: 'Entrevistas/Aplicaciones',
      value: `${((stats.interviewsScheduled / Math.max(stats.totalApplications, 1)) * 100).toFixed(1)}%`,
      trend: stats.interviewsScheduled > stats.totalApplications * 0.2 ? 'positive' : 'neutral',
      icon: <Calendar className="h-4 w-4" />,
      description: 'Ratio de entrevistas'
    }
  ];
  
  const trendColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-desert-600 bg-desert-50'
  };
  
  const trendIcons = {
    positive: <TrendingUp className="h-3 w-3" />,
    negative: <TrendingDown className="h-3 w-3" />,
    neutral: <Activity className="h-3 w-3" />
  };
  
  return (
    <Card variant="desert">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Métricas de Rendimiento</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 bg-white/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-desert-600">{metric.icon}</div>
                  <span className="text-sm font-medium text-desert-700">
                    {metric.label}
                  </span>
                </div>
                <div className={cn(
                  'flex items-center space-x-1 px-2 py-1 rounded-full text-xs',
                  trendColors[metric.trend as keyof typeof trendColors]
                )}>
                  {trendIcons[metric.trend as keyof typeof trendIcons]}
                </div>
              </div>
              <div className="text-lg font-bold text-desert-900 mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-desert-500">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Componente principal de estadísticas del dashboard
const DashboardStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrends />
        <StatusPieChart />
      </div>
      <PerformanceMetrics />
    </div>
  );
};

export { DashboardStats, SimpleBarChart, SimplePieChart };