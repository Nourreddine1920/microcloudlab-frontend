import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      id: 'import',
      label: 'Import Config',
      icon: 'Upload',
      path: '/configuration-import-export-manager',
      color: 'bg-accent text-accent-foreground'
    },
    {
      id: 'export',
      label: 'Export Config',
      icon: 'Download',
      path: '/configuration-import-export-manager',
      color: 'bg-success text-success-foreground'
    },
    {
      id: 'validate',
      label: 'Validate All',
      icon: 'CheckSquare',
      path: '/configuration-validation-conflicts',
      color: 'bg-warning text-warning-foreground'
    },
    {
      id: 'pinmap',
      label: 'Pin Visualizer',
      icon: 'Map',
      path: '/pin-assignment-visualizer',
      color: 'bg-secondary text-secondary-foreground'
    }
  ];

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <div className="relative">
        {/* Expanded Actions */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
            {actions.map((action, index) => (
              <div
                key={action.id}
                className="flex items-center space-x-3"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <span className="bg-popover text-popover-foreground px-3 py-2 rounded-lg text-body-sm whitespace-nowrap shadow-modal border border-border">
                  {action.label}
                </span>
                <Link to={action.path}>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className={`flex items-center justify-center w-12 h-12 rounded-full shadow-modal transition-hover ${action.color}`}
                  >
                    <Icon name={action.icon} size={20} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <Button
          variant="default"
          size="lg"
          iconName={isExpanded ? 'X' : 'Plus'}
          onClick={toggleMenu}
          className="rounded-full w-14 h-14 shadow-modal"
        />

        {/* Backdrop */}
        {isExpanded && (
          <div 
            className="fixed inset-0 bg-background/20 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FloatingActionMenu;