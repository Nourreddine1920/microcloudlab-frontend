import React from 'react';
import Button from '../../../../components/ui/Button';

/**
 * @module ViewModeToggle
 */

/**
 * A toggle component for switching between different view modes, such as 'Package' and 'Functional'.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.viewMode - The currently active view mode.
 * @param {Function} props.onViewModeChange - A callback function to be executed when the view mode changes. It receives the new view mode key as an argument.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the component's container.
 * @returns {JSX.Element} The rendered view mode toggle component.
 */
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