import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ValidationStatusIndicator = ({ 
  totalErrors = 0,
  totalWarnings = 0,
  isValidating = false,
  lastValidated = null,
  onValidate,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasIssues = totalErrors > 0 || totalWarnings > 0;
  const isValid = !hasIssues && !isValidating;

  const getStatusColor = () => {
    if (isValidating) return 'text-accent';
    if (totalErrors > 0) return 'text-error';
    if (totalWarnings > 0) return 'text-warning';
    return 'text-success';
  };

  const getStatusIcon = () => {
    if (isValidating) return 'Loader2';
    if (totalErrors > 0) return 'XCircle';
    if (totalWarnings > 0) return 'AlertTriangle';
    return 'CheckCircle';
  };

  const getStatusText = () => {
    if (isValidating) return 'Validating...';
    if (totalErrors > 0) return `${totalErrors} error${totalErrors > 1 ? 's' : ''}`;
    if (totalWarnings > 0) return `${totalWarnings} warning${totalWarnings > 1 ? 's' : ''}`;
    return 'Valid';
  };

  const formatLastValidated = (timestamp) => {
    if (!timestamp) return 'Never validated';
    const now = new Date();
    const validated = new Date(timestamp);
    const diffMinutes = Math.floor((now - validated) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return validated.toLocaleDateString();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Status Indicator */}
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
          <Icon 
            name={getStatusIcon()} 
            size={16} 
            className={isValidating ? 'animate-spin' : ''}
          />
          <span className="text-body-sm font-medium">
            {getStatusText()}
          </span>
        </div>
        
        {hasIssues && (
          <div className="flex items-center space-x-1">
            {totalWarnings > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-warning text-warning-foreground rounded-full">
                {totalWarnings}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Expanded Status Panel */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-1010 animate-fade-in">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-heading-sm">Configuration Status</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setIsExpanded(false)}
              />
            </div>

            {/* Status Summary */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-muted-foreground">Overall Status</span>
                <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
                  <Icon name={getStatusIcon()} size={14} />
                  <span className="text-body-sm font-medium">
                    {isValid ? 'Configuration Valid' : hasIssues ? 'Issues Found' : 'Validating'}
                  </span>
                </div>
              </div>

              {totalErrors > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-muted-foreground">Errors</span>
                  <span className="text-body-sm text-error font-medium">{totalErrors}</span>
                </div>
              )}

              {totalWarnings > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-muted-foreground">Warnings</span>
                  <span className="text-body-sm text-warning font-medium">{totalWarnings}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-body-sm text-muted-foreground">Last Validated</span>
                <span className="text-body-sm">{formatLastValidated(lastValidated)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                onClick={onValidate}
                disabled={isValidating}
                className="flex-1"
              >
                {isValidating ? 'Validating...' : 'Validate Now'}
              </Button>
              
              {hasIssues && (
                <Link to="/configuration-validation-conflicts" className="flex-1">
                  <Button variant="default" size="sm" iconName="AlertTriangle" fullWidth>
                    View Issues
                  </Button>
                </Link>
              )}
            </div>

            {/* Quick Issue Preview */}
            {hasIssues && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-caption text-muted-foreground mb-2">Recent Issues:</div>
                <div className="space-y-1">
                  {totalErrors > 0 && (
                    <div className="flex items-start space-x-2 text-body-sm">
                      <Icon name="XCircle" size={12} className="text-error mt-0.5" />
                      <span className="text-error">Pin conflict detected on PA0</span>
                    </div>
                  )}
                  {totalWarnings > 0 && (
                    <div className="flex items-start space-x-2 text-body-sm">
                      <Icon name="AlertTriangle" size={12} className="text-warning mt-0.5" />
                      <span className="text-warning">Clock speed may affect performance</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationStatusIndicator;