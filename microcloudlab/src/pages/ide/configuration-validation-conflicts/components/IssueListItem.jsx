import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

/**
 * @module IssueListItem
 */

/**
 * A component that displays a single validation issue in a list.
 * It shows the issue's severity, title, description, and provides actions to resolve,
 * ignore, or navigate to the related configuration. It can be expanded to show more detailed information.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.issue - The issue object to display.
 * @param {Function} props.onResolve - Callback function to resolve the issue.
 * @param {Function} props.onIgnore - Callback function to ignore the issue.
 * @param {boolean} props.isExpanded - Whether the detailed view of the issue is expanded.
 * @param {Function} props.onToggleExpand - Callback function to toggle the expanded state.
 * @returns {JSX.Element} The rendered issue list item component.
 */
const IssueListItem = ({ 
  issue, 
  onResolve, 
  onIgnore, 
  isExpanded, 
  onToggleExpand 
}) => {
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-error/5',
          border: 'border-l-error',
          icon: 'AlertCircle',
          iconColor: 'text-error',
          badge: 'bg-error text-error-foreground'
        };
      case 'warning':
        return {
          bg: 'bg-warning/5',
          border: 'border-l-warning',
          icon: 'AlertTriangle',
          iconColor: 'text-warning',
          badge: 'bg-warning text-warning-foreground'
        };
      case 'info':
        return {
          bg: 'bg-accent/5',
          border: 'border-l-accent',
          icon: 'Info',
          iconColor: 'text-accent',
          badge: 'bg-accent text-accent-foreground'
        };
      default:
        return {
          bg: 'bg-muted/5',
          border: 'border-l-muted-foreground',
          icon: 'Circle',
          iconColor: 'text-muted-foreground',
          badge: 'bg-muted text-muted-foreground'
        };
    }
  };

  const styles = getSeverityStyles(issue.severity);

  return (
    <div className={`${styles.bg} border-l-4 ${styles.border} bg-card rounded-r-lg mb-3 transition-micro`}>
      <div 
        className="p-4 cursor-pointer hover:bg-muted/20"
        onClick={onToggleExpand}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Icon name={styles.icon} size={20} className={styles.iconColor} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-body font-medium text-foreground">{issue.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${styles.badge}`}>
                  {issue.severity.toUpperCase()}
                </span>
              </div>
              
              <p className="text-body-sm text-muted-foreground mb-2">
                {issue.description}
              </p>
              
              <div className="flex items-center space-x-4 text-caption text-muted-foreground">
                <span>Peripheral: {issue.peripheral}</span>
                <span>•</span>
                <span>Pin: {issue.affectedPin}</span>
                <span>•</span>
                <span>ID: {issue.id}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border/50 animate-fade-in">
          <div className="pt-4 space-y-4">
            {/* Detailed Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-body-sm font-medium text-foreground mb-2">Technical Details</h4>
                <div className="space-y-1 text-body-sm text-muted-foreground">
                  <div>Register: {issue.details.register}</div>
                  <div>Expected: {issue.details.expected}</div>
                  <div>Current: {issue.details.current}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-body-sm font-medium text-foreground mb-2">Impact</h4>
                <p className="text-body-sm text-muted-foreground">
                  {issue.impact}
                </p>
              </div>
            </div>

            {/* Suggested Resolution */}
            <div>
              <h4 className="text-body-sm font-medium text-foreground mb-2">Suggested Resolution</h4>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-body-sm text-foreground mb-3">
                  {issue.resolution.description}
                </p>
                
                {issue.resolution.steps && (
                  <ol className="list-decimal list-inside space-y-1 text-body-sm text-muted-foreground">
                    {issue.resolution.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  iconName="CheckCircle"
                  onClick={() => onResolve(issue.id)}
                >
                  Auto-Fix
                </Button>
                
                <Link to={issue.configurationLink}>
                  <Button variant="outline" size="sm" iconName="ExternalLink">
                    Go to Config
                  </Button>
                </Link>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="EyeOff"
                  onClick={() => onIgnore(issue.id)}
                >
                  Ignore
                </Button>
              </div>
              
              <div className="text-caption text-muted-foreground">
                Last detected: {new Date(issue.lastDetected).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueListItem;