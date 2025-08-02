import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionToolbar = ({
  onSave,
  onExport,
  onImport,
  onValidate,
  onReset,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  isSaving = false,
  isExporting = false,
  isValidating = false,
  hasUnsavedChanges = false,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryActions = [
    {
      key: 'save',
      label: 'Save',
      icon: 'Save',
      onClick: onSave,
      loading: isSaving,
      variant: hasUnsavedChanges ? 'default' : 'outline',
      shortcut: 'Ctrl+S'
    },
    {
      key: 'validate',
      label: 'Validate',
      icon: 'CheckSquare',
      onClick: onValidate,
      loading: isValidating,
      variant: 'outline',
      shortcut: 'Ctrl+V'
    },
    {
      key: 'export',
      label: 'Export',
      icon: 'Download',
      onClick: onExport,
      loading: isExporting,
      variant: 'outline',
      shortcut: 'Ctrl+E'
    }
  ];

  const secondaryActions = [
    {
      key: 'import',
      label: 'Import',
      icon: 'Upload',
      onClick: onImport,
      variant: 'ghost'
    },
    {
      key: 'undo',
      label: 'Undo',
      icon: 'Undo2',
      onClick: onUndo,
      disabled: !canUndo,
      variant: 'ghost',
      shortcut: 'Ctrl+Z'
    },
    {
      key: 'redo',
      label: 'Redo',
      icon: 'Redo2',
      onClick: onRedo,
      disabled: !canRedo,
      variant: 'ghost',
      shortcut: 'Ctrl+Y'
    },
    {
      key: 'reset',
      label: 'Reset',
      icon: 'RotateCcw',
      onClick: onReset,
      variant: 'ghost'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Desktop Toolbar */}
      <div className="hidden lg:flex items-center space-x-2 bg-card border border-border rounded-lg p-2 shadow-card">
        {/* Primary Actions */}
        <div className="flex items-center space-x-1">
          {primaryActions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant}
              size="sm"
              iconName={action.icon}
              onClick={action.onClick}
              loading={action.loading}
              disabled={action.disabled}
              title={`${action.label} ${action.shortcut ? `(${action.shortcut})` : ''}`}
            >
              {action.label}
            </Button>
          ))}
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Secondary Actions */}
        <div className="flex items-center space-x-1">
          {secondaryActions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant}
              size="sm"
              iconName={action.icon}
              onClick={action.onClick}
              disabled={action.disabled}
              title={`${action.label} ${action.shortcut ? `(${action.shortcut})` : ''}`}
            />
          ))}
        </div>

        {/* Unsaved Changes Indicator */}
        {hasUnsavedChanges && (
          <div className="flex items-center space-x-1 text-warning ml-2">
            <Icon name="Circle" size={8} className="fill-current" />
            <span className="text-caption">Unsaved changes</span>
          </div>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-1000">
        <div className="relative">
          {/* Main FAB */}
          <Button
            variant="default"
            size="lg"
            iconName={isExpanded ? 'X' : 'Plus'}
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full w-14 h-14 shadow-modal"
          />

          {/* Expanded Actions */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-2 animate-fade-in">
              {[...primaryActions, ...secondaryActions].map((action, index) => (
                <div
                  key={action.key}
                  className="flex items-center space-x-3"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="bg-popover text-popover-foreground px-2 py-1 rounded text-caption whitespace-nowrap shadow-card">
                    {action.label}
                  </span>
                  <Button
                    variant={action.variant}
                    size="lg"
                    iconName={action.icon}
                    onClick={() => {
                      action.onClick?.();
                      setIsExpanded(false);
                    }}
                    loading={action.loading}
                    disabled={action.disabled}
                    className="rounded-full w-12 h-12 shadow-card"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unsaved Changes Badge */}
        {hasUnsavedChanges && !isExpanded && (
          <div className="absolute -top-1 -left-1 w-4 h-4 bg-warning rounded-full border-2 border-background" />
        )}
      </div>

      {/* Tablet Toolbar */}
      <div className="hidden md:flex lg:hidden items-center justify-center space-x-2 fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-2 shadow-modal z-1000">
        {primaryActions.map((action) => (
          <Button
            key={action.key}
            variant={action.variant}
            size="sm"
            iconName={action.icon}
            onClick={action.onClick}
            loading={action.loading}
            disabled={action.disabled}
          />
        ))}
        
        <div className="w-px h-6 bg-border" />
        
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          onClick={() => setIsExpanded(!isExpanded)}
        />

        {/* Tablet Expanded Menu */}
        {isExpanded && (
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-popover border border-border rounded-lg p-2 shadow-modal animate-fade-in">
            <div className="grid grid-cols-2 gap-1">
              {secondaryActions.map((action) => (
                <Button
                  key={action.key}
                  variant="ghost"
                  size="sm"
                  iconName={action.icon}
                  onClick={() => {
                    action.onClick?.();
                    setIsExpanded(false);
                  }}
                  disabled={action.disabled}
                  fullWidth
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionToolbar;