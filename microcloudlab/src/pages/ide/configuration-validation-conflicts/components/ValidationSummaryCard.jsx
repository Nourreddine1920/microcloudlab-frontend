import React from 'react';
import Icon from '../../../../components/AppIcon';

/**
 * @module ValidationSummaryCard
 */

/**
 * A card component that displays a summary of a specific type of validation issue.
 * It shows a count, title, description, and an optional trend indicator, with styling
 * based on the issue type (error, warning, success, info).
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.title - The title of the summary card (e.g., "Critical Errors").
 * @param {number} props.count - The number of issues for this category.
 * @param {('error'|'warning'|'success'|'info')} props.type - The type of summary, which determines the styling.
 * @param {string} props.description - A short description of the summary category.
 * @param {number|null} [props.trend=null] - The trend of the issue count compared to the last validation run.
 * @param {Function} [props.onClick] - A callback function to be executed when the card is clicked.
 * @returns {JSX.Element} The rendered validation summary card component.
 */
const ValidationSummaryCard = ({ 
  title, 
  count, 
  type, 
  description, 
  trend = null,
  onClick 
}) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-error/10',
          border: 'border-error/20',
          icon: 'XCircle',
          iconColor: 'text-error',
          countColor: 'text-error'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          icon: 'AlertTriangle',
          iconColor: 'text-warning',
          countColor: 'text-warning'
        };
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success/20',
          icon: 'CheckCircle',
          iconColor: 'text-success',
          countColor: 'text-success'
        };
      case 'info':
        return {
          bg: 'bg-accent/10',
          border: 'border-accent/20',
          icon: 'Info',
          iconColor: 'text-accent',
          countColor: 'text-accent'
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          icon: 'Circle',
          iconColor: 'text-muted-foreground',
          countColor: 'text-foreground'
        };
    }
  };

  const styles = getTypeStyles(type);

  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-error' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-success' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const trendInfo = trend !== null ? getTrendIcon(trend) : null;

  return (
    <div 
      className={`${styles.bg} ${styles.border} border rounded-lg p-4 cursor-pointer hover:shadow-card transition-micro`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-background/50`}>
            <Icon name={styles.icon} size={20} className={styles.iconColor} />
          </div>
          <div>
            <h3 className="text-heading-sm font-medium text-foreground">{title}</h3>
            <p className="text-caption text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${styles.countColor}`}>
            {count}
          </div>
          {trendInfo && (
            <div className={`flex items-center space-x-1 mt-1 ${trendInfo.color}`}>
              <Icon name={trendInfo.icon} size={12} />
              <span className="text-caption">
                {Math.abs(trend)} from last run
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationSummaryCard;