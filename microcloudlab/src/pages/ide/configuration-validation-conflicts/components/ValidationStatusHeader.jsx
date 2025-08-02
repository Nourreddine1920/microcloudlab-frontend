import React from 'react';
import Icon from '../../../../components/AppIcon';

const ValidationStatusHeader = ({ 
  lastValidated, 
  totalIssues, 
  criticalCount, 
  warningCount, 
  isValidating = false 
}) => {
  const getOverallStatus = () => {
    if (isValidating) return { status: 'validating', color: 'text-accent', icon: 'Loader2' };
    if (criticalCount > 0) return { status: 'critical', color: 'text-error', icon: 'XCircle' };
    if (warningCount > 0) return { status: 'warning', color: 'text-warning', icon: 'AlertTriangle' };
    if (totalIssues === 0) return { status: 'valid', color: 'text-success', icon: 'CheckCircle' };
    return { status: 'unknown', color: 'text-muted-foreground', icon: 'HelpCircle' };
  };

  const statusInfo = getOverallStatus();

  const formatLastValidated = (timestamp) => {
    if (!timestamp) return 'Never validated';
    const now = new Date();
    const validated = new Date(timestamp);
    const diffMinutes = Math.floor((now - validated) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just validated';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`;
    return validated.toLocaleDateString();
  };

  const getStatusMessage = () => {
    if (isValidating) return 'Running validation checks...';
    if (criticalCount > 0) return `${criticalCount} critical issues require immediate attention`;
    if (warningCount > 0) return `${warningCount} warnings found - review recommended`;
    if (totalIssues === 0) return 'All configurations are valid';
    return 'Configuration status unknown';
  };

  return (
    <div className="bg-gradient-to-r from-card to-muted/20 border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg bg-background/50 ${statusInfo.color}`}>
            <Icon 
              name={statusInfo.icon} 
              size={24} 
              className={isValidating ? 'animate-spin' : ''}
            />
          </div>
          
          <div>
            <h1 className="text-heading-lg font-bold text-foreground mb-2">
              Configuration Validation
            </h1>
            <p className={`text-body ${statusInfo.color} font-medium mb-1`}>
              {getStatusMessage()}
            </p>
            <p className="text-body-sm text-muted-foreground">
              Last validated: {formatLastValidated(lastValidated)}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-error">{criticalCount}</div>
            <div className="text-caption text-muted-foreground">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{warningCount}</div>
            <div className="text-caption text-muted-foreground">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalIssues}</div>
            <div className="text-caption text-muted-foreground">Total Issues</div>
          </div>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="md:hidden mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-error">{criticalCount}</div>
            <div className="text-caption text-muted-foreground">Critical</div>
          </div>
          <div>
            <div className="text-xl font-bold text-warning">{warningCount}</div>
            <div className="text-caption text-muted-foreground">Warnings</div>
          </div>
          <div>
            <div className="text-xl font-bold text-foreground">{totalIssues}</div>
            <div className="text-caption text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationStatusHeader;