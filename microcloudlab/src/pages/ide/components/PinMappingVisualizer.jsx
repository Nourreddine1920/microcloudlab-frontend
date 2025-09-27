import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useMcu } from '../context/McuContext';

const PinMappingVisualizer = ({ onPinSelect, selectedPin }) => {
  const { selectedMcu, getCurrentConfiguration, getAvailablePins } = useMcu();
  const [viewMode, setViewMode] = useState('physical'); // 'physical', 'logical', 'functional'
  const [showUnusedPins, setShowUnusedPins] = useState(true);
  const [filterPeripheral, setFilterPeripheral] = useState('all');

  // Get current configuration and available pins
  const configuration = getCurrentConfiguration();
  const availablePins = getAvailablePins();

  // Process pin assignments
  const pinAssignments = useMemo(() => {
    if (!selectedMcu || !configuration) return {};

    const assignments = {};
    const pinUsage = {};

    // Initialize all pins as unused
    availablePins.forEach(pin => {
      assignments[pin.name] = {
        pin: pin,
        peripheral: null,
        function: null,
        status: 'unused',
        conflicts: []
      };
    });

    // Process each peripheral configuration
    Object.entries(configuration).forEach(([peripheralType, instances]) => {
      Object.entries(instances).forEach(([instance, config]) => {
        // Map pin fields to their values
        const pinFields = {
          'txPin': 'TX',
          'rxPin': 'RX',
          'mosiPin': 'MOSI',
          'misoPin': 'MISO',
          'sckPin': 'SCK',
          'ssPin': 'SS',
          'sdaPin': 'SDA',
          'sclPin': 'SCL',
          'outputPin': 'OUT',
          'pin': 'GPIO',
          'ch1': 'CH1',
          'ch2': 'CH2',
          'ch3': 'CH3',
          'ch4': 'CH4'
        };

        Object.entries(pinFields).forEach(([field, functionName]) => {
          const pinName = config[field];
          if (pinName && assignments[pinName]) {
            // Check for conflicts
            if (assignments[pinName].peripheral) {
              assignments[pinName].conflicts.push({
                peripheral: `${peripheralType}_${instance}`,
                function: functionName
              });
              assignments[pinName].status = 'conflict';
            } else {
              assignments[pinName].peripheral = `${peripheralType}_${instance}`;
              assignments[pinName].function = functionName;
              assignments[pinName].status = 'assigned';
            }
          }
        });
      });
    });

    return assignments;
  }, [selectedMcu, configuration, availablePins]);

  // Filter pins based on current filters
  const filteredPins = useMemo(() => {
    return Object.values(pinAssignments).filter(assignment => {
      if (!showUnusedPins && assignment.status === 'unused') return false;
      if (filterPeripheral !== 'all' && assignment.peripheral !== filterPeripheral) return false;
      return true;
    });
  }, [pinAssignments, showUnusedPins, filterPeripheral]);

  // Get peripheral types for filter
  const peripheralTypes = useMemo(() => {
    const types = new Set();
    Object.values(pinAssignments).forEach(assignment => {
      if (assignment.peripheral) {
        const peripheralType = assignment.peripheral.split('_')[0];
        types.add(peripheralType);
      }
    });
    return Array.from(types);
  }, [pinAssignments]);

  // Get pin status color
  const getPinStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'bg-success/20 text-success border-success/30';
      case 'conflict': return 'bg-error/20 text-error border-error/30';
      case 'unused': return 'bg-muted/20 text-muted-foreground border-muted/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  // Get pin status icon
  const getPinStatusIcon = (status) => {
    switch (status) {
      case 'assigned': return 'CheckCircle';
      case 'conflict': return 'XCircle';
      case 'unused': return 'Circle';
      default: return 'Circle';
    }
  };

  // Get peripheral color
  const getPeripheralColor = (peripheralType) => {
    const colors = {
      'UART': 'bg-blue-500',
      'SPI': 'bg-green-500',
      'I2C': 'bg-purple-500',
      'PWM': 'bg-orange-500',
      'GPIO': 'bg-gray-500',
      'ADC': 'bg-red-500',
      'DAC': 'bg-pink-500',
      'CAN': 'bg-indigo-500',
      'USB': 'bg-cyan-500'
    };
    return colors[peripheralType] || 'bg-gray-500';
  };

  // Render physical pin layout
  const renderPhysicalLayout = () => {
    if (!selectedMcu) return null;

    // Group pins by side (simplified layout)
    const leftPins = filteredPins.slice(0, Math.ceil(filteredPins.length / 2));
    const rightPins = filteredPins.slice(Math.ceil(filteredPins.length / 2));

    return (
      <div className="flex items-center space-x-8">
        {/* Left side pins */}
        <div className="space-y-2">
          {leftPins.map((assignment, index) => (
            <div
              key={assignment.pin.name}
              className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedPin === assignment.pin.name ? 'ring-2 ring-primary' : ''
              } ${getPinStatusColor(assignment.status)}`}
              onClick={() => onPinSelect && onPinSelect(assignment.pin.name)}
            >
              <div className="w-3 h-3 rounded-full bg-current"></div>
              <span className="text-sm font-mono">{assignment.pin.name}</span>
              {assignment.peripheral && (
                <div className={`w-2 h-2 rounded-full ${getPeripheralColor(assignment.peripheral.split('_')[0])}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* MCU Body */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-24 bg-card border-2 border-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs font-semibold text-text-primary">{selectedMcu.name}</div>
              <div className="text-xs text-text-secondary">{selectedMcu.type}</div>
            </div>
          </div>
        </div>

        {/* Right side pins */}
        <div className="space-y-2">
          {rightPins.map((assignment, index) => (
            <div
              key={assignment.pin.name}
              className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedPin === assignment.pin.name ? 'ring-2 ring-primary' : ''
              } ${getPinStatusColor(assignment.status)}`}
              onClick={() => onPinSelect && onPinSelect(assignment.pin.name)}
            >
              {assignment.peripheral && (
                <div className={`w-2 h-2 rounded-full ${getPeripheralColor(assignment.peripheral.split('_')[0])}`}></div>
              )}
              <span className="text-sm font-mono">{assignment.pin.name}</span>
              <div className="w-3 h-3 rounded-full bg-current"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render logical pin layout
  const renderLogicalLayout = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredPins.map((assignment) => (
          <div
            key={assignment.pin.name}
            className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
              selectedPin === assignment.pin.name ? 'ring-2 ring-primary' : ''
            } ${getPinStatusColor(assignment.status)}`}
            onClick={() => onPinSelect && onPinSelect(assignment.pin.name)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono font-semibold">{assignment.pin.name}</span>
              <Icon 
                name={getPinStatusIcon(assignment.status)} 
                size={16} 
                className={assignment.status === 'assigned' ? 'text-success' : 
                         assignment.status === 'conflict' ? 'text-error' : 'text-muted-foreground'} 
              />
            </div>
            
            {assignment.peripheral && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getPeripheralColor(assignment.peripheral.split('_')[0])}`}></div>
                  <span className="text-xs text-text-secondary">{assignment.peripheral}</span>
                </div>
                <div className="text-xs text-text-secondary">{assignment.function}</div>
              </div>
            )}
            
            {assignment.conflicts.length > 0 && (
              <div className="mt-2 text-xs text-error">
                Conflicts: {assignment.conflicts.length}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render functional pin layout
  const renderFunctionalLayout = () => {
    const peripheralGroups = {};
    
    Object.values(pinAssignments).forEach(assignment => {
      if (assignment.peripheral) {
        const peripheralType = assignment.peripheral.split('_')[0];
        if (!peripheralGroups[peripheralType]) {
          peripheralGroups[peripheralType] = [];
        }
        peripheralGroups[peripheralType].push(assignment);
      }
    });

    return (
      <div className="space-y-6">
        {Object.entries(peripheralGroups).map(([peripheralType, assignments]) => (
          <div key={peripheralType} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getPeripheralColor(peripheralType)}`}></div>
              <h4 className="text-sm font-semibold text-text-primary">{peripheralType}</h4>
              <span className="text-xs text-text-secondary">({assignments.length} pins)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {assignments.map((assignment) => (
                <div
                  key={assignment.pin.name}
                  className={`p-2 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedPin === assignment.pin.name ? 'ring-2 ring-primary' : ''
                  } ${getPinStatusColor(assignment.status)}`}
                  onClick={() => onPinSelect && onPinSelect(assignment.pin.name)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono">{assignment.pin.name}</span>
                    <Icon 
                      name={getPinStatusIcon(assignment.status)} 
                      size={12} 
                      className={assignment.status === 'assigned' ? 'text-success' : 
                               assignment.status === 'conflict' ? 'text-error' : 'text-muted-foreground'} 
                    />
                  </div>
                  <div className="text-xs text-text-secondary mt-1">{assignment.function}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!selectedMcu) {
    return (
      <div className="text-center py-12">
        <Icon name="Cpu" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">No MCU Selected</h3>
        <p className="text-text-secondary">Select a microcontroller to view pin mappings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Pin Mapping</h3>
          <p className="text-sm text-text-secondary">
            Visualize pin assignments and detect conflicts for {selectedMcu.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => {/* Export pin mapping */}}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* View Mode */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-text-secondary">View:</span>
          <div className="flex space-x-1">
            {[
              { id: 'physical', name: 'Physical', icon: 'Cpu' },
              { id: 'logical', name: 'Logical', icon: 'Grid' },
              { id: 'functional', name: 'Functional', icon: 'Layers' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon name={mode.icon} size={14} />
                <span>{mode.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showUnusedPins}
              onChange={(e) => setShowUnusedPins(e.target.checked)}
              className="rounded border-border"
            />
            <span>Show unused pins</span>
          </label>
        </div>

        {/* Peripheral Filter */}
        {peripheralTypes.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary">Peripheral:</span>
            <select
              value={filterPeripheral}
              onChange={(e) => setFilterPeripheral(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-background border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All</option>
              {peripheralTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Pin Layout */}
      <div className="bg-card border border-border rounded-lg p-6">
        {viewMode === 'physical' && renderPhysicalLayout()}
        {viewMode === 'logical' && renderLogicalLayout()}
        {viewMode === 'functional' && renderFunctionalLayout()}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/10 rounded-lg">
          <div className="text-2xl font-bold text-text-primary">
            {Object.values(pinAssignments).filter(a => a.status === 'assigned').length}
          </div>
          <div className="text-xs text-text-secondary">Assigned Pins</div>
        </div>
        <div className="text-center p-4 bg-muted/10 rounded-lg">
          <div className="text-2xl font-bold text-text-primary">
            {Object.values(pinAssignments).filter(a => a.status === 'conflict').length}
          </div>
          <div className="text-xs text-text-secondary">Conflicts</div>
        </div>
        <div className="text-center p-4 bg-muted/10 rounded-lg">
          <div className="text-2xl font-bold text-text-primary">
            {Object.values(pinAssignments).filter(a => a.status === 'unused').length}
          </div>
          <div className="text-xs text-text-secondary">Unused Pins</div>
        </div>
        <div className="text-center p-4 bg-muted/10 rounded-lg">
          <div className="text-2xl font-bold text-text-primary">
            {peripheralTypes.length}
          </div>
          <div className="text-xs text-text-secondary">Peripheral Types</div>
        </div>
      </div>
    </div>
  );
};

export default PinMappingVisualizer;
