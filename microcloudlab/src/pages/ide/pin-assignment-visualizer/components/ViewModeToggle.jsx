import React from 'react';
import Button from '../../../../components/ui/Button';


const ViewModeToggle = ({ viewMode, onViewModeChange, className = "" }) => {
  const viewModes = [
    {
      key: 'package',
      label: 'Package View',
      icon: 'Square',
      description: 'Physical pin layout'
    },
    {
      key: 'functional',
      label: 'Functional View',
      icon: 'GitBranch',
      description: 'Grouped by function'
    }
  ];

  return (
    <div className={`flex items-center space-x-1 bg-muted rounded-lg p-1 ${className}`}>
      {viewModes.map((mode) => (
        <Button
          key={mode.key}
          variant={viewMode === mode.key ? 'default' : 'ghost'}
          size="sm"
          iconName={mode.icon}
          onClick={() => onViewModeChange(mode.key)}
          className="relative"
          title={mode.description}
        >
          {mode.label}
        </Button>
      ))}
    </div>
  );
};

export default ViewModeToggle;