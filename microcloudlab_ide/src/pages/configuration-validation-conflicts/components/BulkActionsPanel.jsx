import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsPanel = ({ 
  selectedIssues, 
  onBulkResolve, 
  onBulkIgnore, 
  onRunValidation, 
  onGenerateReport,
  onAutoFixSafe,
  isValidating = false,
  isGeneratingReport = false,
  autoFixableCount = 0
}) => {
  const [showConfirmation, setShowConfirmation] = useState(null);

  const handleBulkAction = (action) => {
    if (selectedIssues.length === 0) return;
    
    setShowConfirmation(action);
  };

  const confirmAction = (action) => {
    switch (action) {
      case 'resolve':
        onBulkResolve(selectedIssues);
        break;
      case 'ignore':
        onBulkIgnore(selectedIssues);
        break;
      case 'autofix':
        onAutoFixSafe();
        break;
    }
    setShowConfirmation(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-sm font-medium">Validation Actions</h3>
        <div className="text-caption text-muted-foreground">
          {selectedIssues.length} issues selected
        </div>
      </div>

      {/* Primary Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Button
          variant="default"
          iconName="RefreshCw"
          onClick={onRunValidation}
          loading={isValidating}
          fullWidth
        >
          {isValidating ? 'Validating...' : 'Run Full Validation'}
        </Button>

        <Button
          variant="outline"
          iconName="Zap"
          onClick={() => handleBulkAction('autofix')}
          disabled={autoFixableCount === 0}
          fullWidth
        >
          Auto-Fix Safe Issues ({autoFixableCount})
        </Button>

        <Button
          variant="secondary"
          iconName="FileText"
          onClick={onGenerateReport}
          loading={isGeneratingReport}
          fullWidth
        >
          {isGeneratingReport ? 'Generating...' : 'Generate Report'}
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedIssues.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-body-sm font-medium">
              Bulk Actions ({selectedIssues.length} selected)
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="CheckCircle"
              onClick={() => handleBulkAction('resolve')}
            >
              Mark as Resolved
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="EyeOff"
              onClick={() => handleBulkAction('ignore')}
            >
              Ignore Selected
            </Button>
          </div>
        </div>
      )}

      {/* Validation Statistics */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-error">12</div>
            <div className="text-caption text-muted-foreground">Critical</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">8</div>
            <div className="text-caption text-muted-foreground">Warnings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">15</div>
            <div className="text-caption text-muted-foreground">Resolved</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">6</div>
            <div className="text-caption text-muted-foreground">Auto-fixable</div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full shadow-modal">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
              <h3 className="text-heading-sm font-medium">Confirm Action</h3>
            </div>
            
            <p className="text-body-sm text-muted-foreground mb-6">
              {showConfirmation === 'resolve' && 
                `Are you sure you want to mark ${selectedIssues.length} issues as resolved? This action cannot be undone.`}
              {showConfirmation === 'ignore' && 
                `Are you sure you want to ignore ${selectedIssues.length} issues? They will be hidden from future validations.`}
              {showConfirmation === 'autofix' && 
                `Are you sure you want to automatically fix ${autoFixableCount} safe issues? This will modify your configuration.`}
            </p>
            
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                onClick={() => setShowConfirmation(null)}
              >
                Cancel
              </Button>
              <Button
                variant={showConfirmation === 'ignore' ? 'destructive' : 'default'}
                onClick={() => confirmAction(showConfirmation)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsPanel;