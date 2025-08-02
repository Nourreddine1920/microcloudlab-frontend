import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

import Icon from '../../../components/AppIcon';

const PinConfigurationPopover = ({ 
  pin, 
  isVisible, 
  position, 
  onClose, 
  onSave,
  className = "" 
}) => {
  const [selectedFunction, setSelectedFunction] = useState(pin?.currentAssignment || '');
  const [pinMode, setPinMode] = useState('input');
  const [pullResistor, setPullResistor] = useState('none');
  const [outputSpeed, setOutputSpeed] = useState('medium');
  const [outputType, setOutputType] = useState('push-pull');

  if (!isVisible || !pin) {
    return null;
  }

  const functionOptions = [
    { value: '', label: 'GPIO (Default)', description: 'General Purpose I/O' },
    ...pin.alternativeFunctions.map(func => ({
      value: func,
      label: func,
      description: `Configure as ${func}`
    }))
  ];

  const modeOptions = [
    { value: 'input', label: 'Input', description: 'Digital input pin' },
    { value: 'output', label: 'Output', description: 'Digital output pin' },
    { value: 'analog', label: 'Analog', description: 'Analog input/output' },
    { value: 'alternate', label: 'Alternate Function', description: 'Peripheral function' }
  ];

  const pullOptions = [
    { value: 'none', label: 'No Pull', description: 'Floating input' },
    { value: 'up', label: 'Pull-up', description: 'Internal pull-up resistor' },
    { value: 'down', label: 'Pull-down', description: 'Internal pull-down resistor' }
  ];

  const speedOptions = [
    { value: 'low', label: 'Low Speed', description: '2 MHz' },
    { value: 'medium', label: 'Medium Speed', description: '25 MHz' },
    { value: 'high', label: 'High Speed', description: '50 MHz' },
    { value: 'very-high', label: 'Very High Speed', description: '100 MHz' }
  ];

  const typeOptions = [
    { value: 'push-pull', label: 'Push-Pull', description: 'Standard output' },
    { value: 'open-drain', label: 'Open Drain', description: 'Open drain output' }
  ];

  const handleSave = () => {
    const configuration = {
      pinId: pin.id,
      function: selectedFunction,
      mode: pinMode,
      pull: pullResistor,
      speed: outputSpeed,
      type: outputType
    };
    onSave(configuration);
    onClose();
  };

  return (
    <div 
      className={`fixed bg-popover border border-border rounded-lg shadow-modal z-1040 w-80 ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <span className="text-body-sm font-heading text-primary">
                {pin.name}
              </span>
            </div>
            <div>
              <h3 className="text-body-sm font-medium">Configure Pin</h3>
              <p className="text-caption text-muted-foreground">{pin.name}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="space-y-4">
          <Select
            label="Function"
            options={functionOptions}
            value={selectedFunction}
            onChange={setSelectedFunction}
            placeholder="Select function"
          />

          <Select
            label="Mode"
            options={modeOptions}
            value={pinMode}
            onChange={setPinMode}
          />

          {pinMode === 'input' && (
            <Select
              label="Pull Resistor"
              options={pullOptions}
              value={pullResistor}
              onChange={setPullResistor}
            />
          )}

          {pinMode === 'output' && (
            <>
              <Select
                label="Output Speed"
                options={speedOptions}
                value={outputSpeed}
                onChange={setOutputSpeed}
              />

              <Select
                label="Output Type"
                options={typeOptions}
                value={outputType}
                onChange={setOutputType}
              />
            </>
          )}

          {pin.status === 'conflict' && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                <div>
                  <div className="text-body-sm font-medium text-error mb-1">Configuration Conflict</div>
                  <div className="text-caption text-error">
                    This pin is already assigned to another peripheral. Save will override the existing assignment.
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-3 bg-muted rounded-lg">
            <div className="text-caption font-medium mb-2">Pin Characteristics</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-caption text-muted-foreground">Max Current:</span>
                <span className="text-caption">{pin.maxCurrent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-caption text-muted-foreground">Voltage Level:</span>
                <span className="text-caption">{pin.voltageLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-caption text-muted-foreground">5V Tolerant:</span>
                <span className="text-caption">{pin.fiveTolerant ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            onClick={handleSave}
            className="flex-1"
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PinConfigurationPopover;