import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ValidationStatusIndicator from '../../../components/ui/ValidationStatusIndicator';

const ConfigurationToolbar = ({
  peripheralType = 'UART',
  peripheralInstance = 'UART1',
  hasUnsavedChanges = false,
  validationErrors = 0,
  validationWarnings = 0,
  isValidating = false,
  lastValidated = null,
  onSave,
  onReset,
  onValidate,
  onExport,
  onImport
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (hasUnsavedChanges) {
      setShowResetConfirm(true);
    } else {
      onReset();
    }
  };

  const confirmReset = () => {
    onReset();
    setShowResetConfirm(false);
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="flex items-center justify-between h-14 px-6">
        {/* Left Section - Breadcrumb */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/peripheral-configuration-dashboard"
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-micro"
          >
            <Icon name="ArrowLeft" size={16} />
            <span className="text-body-sm">Dashboard</span>
          </Link>
          
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={16} className="text-primary" />
            <span className="text-heading-sm font-medium">{peripheralType}</span>
            <span className="text-body-sm text-muted-foreground">({peripheralInstance})</span>
          </div>
        </div>

        {/* Center Section - Status */}
        <div className="hidden md:flex items-center space-x-4">
          <ValidationStatusIndicator
            totalErrors={validationErrors}
            totalWarnings={validationWarnings}
            isValidating={isValidating}
            lastValidated={lastValidated}
            onValidate={onValidate}
          />
          
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="Circle" size={8} className="fill-current" />
              <span className="text-caption">Unsaved changes</span>
            </div>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Upload"
              onClick={onImport}
            >
              Import
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={handleReset}
            >
              Reset
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="CheckSquare"
              onClick={onValidate}
              loading={isValidating}
            >
              Validate
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={onExport}
            >
              Export
            </Button>
            
            <Button
              variant={hasUnsavedChanges ? 'default' : 'outline'}
              size="sm"
              iconName="Save"
              onClick={onSave}
            >
              Save
            </Button>
          </div>

          {/* Tablet Actions */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="CheckSquare"
              onClick={onValidate}
              loading={isValidating}
            />
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={onExport}
            />
            
            <Button
              variant={hasUnsavedChanges ? 'default' : 'outline'}
              size="sm"
              iconName="Save"
              onClick={onSave}
            />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
            />
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant={hasUnsavedChanges ? 'default' : 'outline'}
              size="sm"
              iconName="Save"
              onClick={onSave}
            />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
            />
          </div>
        </div>
      </div>

      {/* Mobile Status Bar */}
      <div className="md:hidden px-6 py-2 bg-muted border-t border-border">
        <div className="flex items-center justify-between">
          <ValidationStatusIndicator
            totalErrors={validationErrors}
            totalWarnings={validationWarnings}
            isValidating={isValidating}
            lastValidated={lastValidated}
            onValidate={onValidate}
          />
          
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-1 text-warning">
              <Icon name="Circle" size={6} className="fill-current" />
              <span className="text-caption">Unsaved</span>
            </div>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1020 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-modal max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <h3 className="text-heading-sm">Confirm Reset</h3>
            </div>
            
            <p className="text-body-sm text-muted-foreground mb-6">
              You have unsaved changes. Resetting will discard all current modifications. This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmReset}
                className="flex-1"
              >
                Reset Configuration
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationToolbar;