import React from 'react';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';
import Icon from '../../../../components/AppIcon';

/**
 * @module PinDetailsSidebar
 */

/**
 * A sidebar component that displays detailed information about a selected pin.
 * It allows users to view and modify the pin's assignment, function, and other properties.
 * It is designed to be a persistent sidebar on desktop and a slide-out panel on mobile.
 *
 * @param {object} props - The properties for the component.
 * @param {object|null} props.selectedPin - The pin object to display details for. If null, a placeholder is shown.
 * @param {Function} props.onPinAssign - A callback function to assign a function to the selected pin.
 * @param {Function} props.onPinClear - A callback function to clear the assignment of the selected pin.
 * @param {boolean} props.isOpen - Controls the visibility of the sidebar on mobile views.
 * @param {Function} props.onToggle - A callback function to toggle the sidebar's visibility on mobile.
 * @param {string} [props.className=""] - Additional CSS classes for the component's container.
 * @returns {JSX.Element} The rendered pin details sidebar component.
 */
const PinDetailsSidebar = ({ 
  selectedPin, 
  onPinAssign, 
  onPinClear,
  isOpen,
  onToggle,
  className = "" 
}) => {
  if (!selectedPin) {
    return (
      <div className={`hidden lg:flex flex-col w-80 bg-card border-l border-border ${className}`}>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-heading-sm text-muted-foreground mb-2">No Pin Selected</h3>
            <p className="text-body-sm text-muted-foreground">
              Click on a pin in the diagram or select from the pin list to view details
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'configured': return 'text-success';
      case 'conflict': return 'text-error';
      case 'available': return 'text-muted-foreground';
      case 'reserved': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'configured': return 'CheckCircle';
      case 'conflict': return 'AlertTriangle';
      case 'available': return 'Circle';
      case 'reserved': return 'Lock';
      default: return 'Circle';
    }
  };

  const functionOptions = selectedPin.alternativeFunctions.map(func => ({
    value: func,
    label: func,
    description: `Configure as ${func}`
  }));

  const PinDetailsContent = () => (
    <>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-heading-sm font-heading">Pin Details</h3>
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onToggle}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <span className="text-heading-sm font-heading text-primary">
                {selectedPin.name}
              </span>
            </div>
            <div>
              <div className="text-body-sm font-medium">{selectedPin.name}</div>
              <div className={`flex items-center space-x-1 ${getStatusColor(selectedPin.status)}`}>
                <Icon name={getStatusIcon(selectedPin.status)} size={12} />
                <span className="text-caption capitalize">{selectedPin.status}</span>
              </div>
            </div>
          </div>

          {selectedPin.currentAssignment && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-caption text-muted-foreground mb-1">Current Assignment</div>
              <div className="text-body-sm font-medium">{selectedPin.currentAssignment}</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Pin Configuration */}
        <div>
          <h4 className="text-body-sm font-medium mb-3">Configuration</h4>
          <div className="space-y-3">
            <Select
              label="Function"
              options={[
                { value: '', label: 'GPIO (Default)', description: 'General Purpose I/O' },
                ...functionOptions
              ]}
              value={selectedPin.currentAssignment || ''}
              onChange={(value) => onPinAssign(selectedPin.id, value)}
              placeholder="Select function"
            />

            {selectedPin.status === 'conflict' && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                  <div>
                    <div className="text-body-sm font-medium text-error mb-1">Pin Conflict</div>
                    <div className="text-caption text-error">
                      This pin is already assigned to UART1_TX. Clear the existing assignment or choose a different pin.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alternative Functions */}
        <div>
          <h4 className="text-body-sm font-medium mb-3">Alternative Functions</h4>
          <div className="space-y-2">
            {selectedPin.alternativeFunctions.map((func, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-micro"
              >
                <span className="text-body-sm">{func}</span>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ArrowRight"
                  onClick={() => onPinAssign(selectedPin.id, func)}
                >
                  Assign
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Electrical Characteristics */}
        <div>
          <h4 className="text-body-sm font-medium mb-3">Electrical Characteristics</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-caption text-muted-foreground">Max Current</span>
              <span className="text-caption">{selectedPin.maxCurrent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-caption text-muted-foreground">Voltage Level</span>
              <span className="text-caption">{selectedPin.voltageLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-caption text-muted-foreground">5V Tolerant</span>
              <span className="text-caption">{selectedPin.fiveTolerant ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Related Pins */}
        {selectedPin.relatedPins && selectedPin.relatedPins.length > 0 && (
          <div>
            <h4 className="text-body-sm font-medium mb-3">Related Pins</h4>
            <div className="space-y-1">
              {selectedPin.relatedPins.map((relatedPin, index) => (
                <div key={index} className="text-caption text-muted-foreground">
                  {relatedPin}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          {selectedPin.currentAssignment && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              onClick={() => onPinClear(selectedPin.id)}
              className="flex-1"
            >
              Clear
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            className="flex-1"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col w-80 bg-card border-l border-border ${className}`}>
        <PinDetailsContent />
      </div>

      {/* Mobile/Tablet Slide-out Panel */}
      <div className={`lg:hidden fixed inset-y-0 right-0 z-1020 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="w-80 h-full bg-card border-l border-border shadow-modal flex flex-col">
          <PinDetailsContent />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-1010"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default PinDetailsSidebar;