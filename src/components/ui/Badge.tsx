import React from 'react';
import { cn } from '../../utils/cn';
import { ApplicationStatus } from '../../types';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    
    const variants = {
      default: 'border-transparent bg-primary text-primary-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground',
      destructive: 'border-transparent bg-destructive text-destructive-foreground',
      outline: 'text-foreground border-border',
      success: 'border-transparent bg-green-100 text-green-800 border-green-200',
      warning: 'border-transparent bg-yellow-100 text-yellow-800 border-yellow-200',
      info: 'border-transparent bg-blue-100 text-blue-800 border-blue-200'
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base'
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge específico para aplicaciones de trabajo
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  status: ApplicationStatus;
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const statusConfig = {
      draft: {
        variant: 'outline' as const,
        label: 'Borrador',
        className: 'border-gray-300 text-gray-600 bg-gray-50'
      },
      applied: {
        variant: 'info' as const,
        label: 'Aplicado',
        className: 'border-blue-200 text-blue-700 bg-blue-50'
      },
      under_review: {
        variant: 'warning' as const,
        label: 'En Revisión',
        className: 'border-yellow-200 text-yellow-700 bg-yellow-50'
      },
      interview_scheduled: {
        variant: 'info' as const,
        label: 'Entrevista Programada',
        className: 'border-purple-200 text-purple-700 bg-purple-50'
      },
      interview_completed: {
        variant: 'info' as const,
        label: 'Entrevista Completada',
        className: 'border-indigo-200 text-indigo-700 bg-indigo-50'
      },
      second_round: {
        variant: 'warning' as const,
        label: 'Segunda Ronda',
        className: 'border-orange-200 text-orange-700 bg-orange-50'
      },
      final_round: {
        variant: 'warning' as const,
        label: 'Ronda Final',
        className: 'border-red-200 text-red-700 bg-red-50'
      },
      offer_received: {
        variant: 'success' as const,
        label: 'Oferta Recibida',
        className: 'border-green-200 text-green-700 bg-green-50'
      },
      accepted: {
        variant: 'success' as const,
        label: 'Aceptado',
        className: 'border-emerald-200 text-emerald-700 bg-emerald-50'
      },
      rejected: {
        variant: 'destructive' as const,
        label: 'Rechazado',
        className: 'border-red-200 text-red-700 bg-red-50'
      },
      withdrawn: {
        variant: 'outline' as const,
        label: 'Retirado',
        className: 'border-gray-300 text-gray-600 bg-gray-50'
      }
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge
        ref={ref}
        className={cn(config.className, className)}
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

// Priority Badge para tareas y seguimientos
export interface PriorityBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const PriorityBadge = React.forwardRef<HTMLDivElement, PriorityBadgeProps>(
  ({ priority, className, ...props }, ref) => {
    const priorityConfig = {
      low: {
        variant: 'outline' as const,
        label: 'Baja',
        className: 'border-green-300 text-green-600 bg-green-50'
      },
      medium: {
        variant: 'warning' as const,
        label: 'Media',
        className: 'border-yellow-300 text-yellow-600 bg-yellow-50'
      },
      high: {
        variant: 'warning' as const,
        label: 'Alta',
        className: 'border-orange-300 text-orange-600 bg-orange-50'
      },
      urgent: {
        variant: 'destructive' as const,
        label: 'Urgente',
        className: 'border-red-300 text-red-600 bg-red-50'
      }
    };
    
    const config = priorityConfig[priority];
    
    return (
      <Badge
        ref={ref}
        className={cn(config.className, className)}
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

PriorityBadge.displayName = 'PriorityBadge';

// Category Badge para sitios web y plantillas
export interface CategoryBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  category: string;
  colorScheme?: 'desert' | 'oasis' | 'neutral';
}

const CategoryBadge = React.forwardRef<HTMLDivElement, CategoryBadgeProps>(
  ({ category, colorScheme = 'desert', className, ...props }, ref) => {
    const colorSchemes = {
      desert: 'border-desert-200 text-desert-700 bg-desert-50',
      oasis: 'border-oasis-200 text-oasis-700 bg-oasis-50',
      neutral: 'border-gray-200 text-gray-700 bg-gray-50'
    };
    
    return (
      <Badge
        ref={ref}
        variant="outline"
        className={cn(colorSchemes[colorScheme], className)}
        {...props}
      >
        {category}
      </Badge>
    );
  }
);

CategoryBadge.displayName = 'CategoryBadge';

export { Badge, StatusBadge, PriorityBadge, CategoryBadge };