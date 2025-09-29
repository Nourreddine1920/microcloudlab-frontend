import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useMcu } from '../context/McuContext';
import ConfigurationValidator from './ConfigurationValidator';
import PinMappingVisualizer from './PinMappingVisualizer';
import BoardSimulator from './BoardSimulator';

/**
 * @module ComprehensivePeripheralDashboard
 */

/**
 * A comprehensive dashboard for managing all peripherals of a selected microcontroller.
 * It provides a detailed view of all available and configured peripherals, with options
 * for searching, filtering, and inspecting individual components. The dashboard integrates
 * several key tools in a tabbed interface: an overview, a configuration validator,
 * a pin mapping visualizer, and a board simulator.
 *
 * @returns {JSX.Element} The rendered comprehensive peripheral dashboard, or a prompt to select an MCU if none is chosen.
 */
const ComprehensivePeripheralDashboard = () => {
  const { 
    selectedMcu, 
    getCurrentConfiguration, 
    getAllPeripheralStatuses,
    getAvailablePeripheralInstances 
  } = useMcu();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeripheral, setFilterPeripheral] = useState('all');
  const [selectedPeripheral, setSelectedPeripheral] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);

  // Get current configuration and statuses
  const configuration = getCurrentConfiguration();
  const peripheralStatuses = getAllPeripheralStatuses();

  // Generate comprehensive peripheral data
  const peripheralData = useMemo(() => {
    if (!selectedMcu) return [];

    const data = [];
    Object.entries(selectedMcu.supportedPeripherals || {}).forEach(([peripheralType, peripheralInfo]) => {
      const instances = peripheralInfo.instances || [];
      instances.forEach(instance => {
        const statusKey = `${peripheralType}_${instance}`;
        const status = peripheralStatuses[statusKey] || { status: 'available', completeness: 0 };
        const config = configuration[peripheralType]?.[instance] || null;
        
        data.push({
          id: statusKey,
          type: peripheralType,
          instance,
          name: `${peripheralType} ${instance}`,
          status: config ? 'configured' : status.status,
          completeness: status.completeness || 0,
          lastModified: status.lastModified,
          configuration: config,
          pins: peripheralInfo.pins?.[instance] || {},
          icon: getPeripheralIcon(peripheralType),
          color: getPeripheralColor(peripheralType),
          description: getPeripheralDescription(peripheralType),
          category: getPeripheralCategory(peripheralType)
        });
      });
    });

    return data;
  }, [selectedMcu, configuration, peripheralStatuses]);

  // Filter peripherals
  const filteredPeripherals = useMemo(() => {
    return peripheralData.filter(peripheral => {
      const matchesSearch = peripheral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           peripheral.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || peripheral.status === filterStatus;
      const matchesPeripheral = filterPeripheral === 'all' || peripheral.type === filterPeripheral;
      
      return matchesSearch && matchesStatus && matchesPeripheral;
    });
  }, [peripheralData, searchQuery, filterStatus, filterPeripheral]);

  // Get unique peripheral types for filter
  const peripheralTypes = useMemo(() => {
    const types = [...new Set(peripheralData.map(p => p.type))];
    return types;
  }, [peripheralData]);

  // Get status counts
  const statusCounts = useMemo(() => {
    const counts = {
      configured: 0,
      partial: 0,
      available: 0,
      conflict: 0
    };
    
    peripheralData.forEach(peripheral => {
      counts[peripheral.status] = (counts[peripheral.status] || 0) + 1;
    });
    
    return counts;
  }, [peripheralData]);

  // Helper functions
  const getPeripheralIcon = (type) => {
    const icons = {
      'UART': 'Wifi',
      'SPI': 'Zap',
      'I2C': 'Link',
      'PWM': 'Activity',
      'GPIO': 'Circle',
      'ADC': 'TrendingUp',
      'DAC': 'TrendingDown',
      'CAN': 'Truck',
      'USB': 'Usb',
      'TIMER': 'Clock'
    };
    return icons[type] || 'Settings';
  };

  const getPeripheralColor = (type) => {
    const colors = {
      'UART': 'text-blue-500',
      'SPI': 'text-green-500',
      'I2C': 'text-purple-500',
      'PWM': 'text-orange-500',
      'GPIO': 'text-gray-500',
      'ADC': 'text-red-500',
      'DAC': 'text-pink-500',
      'CAN': 'text-indigo-500',
      'USB': 'text-cyan-500',
      'TIMER': 'text-yellow-500'
    };
    return colors[type] || 'text-gray-500';
  };

  const getPeripheralDescription = (type) => {
    const descriptions = {
      'UART': 'Universal Asynchronous Receiver-Transmitter for serial communication',
      'SPI': 'Serial Peripheral Interface for high-speed communication',
      'I2C': 'Inter-Integrated Circuit for multi-master communication',
      'PWM': 'Pulse Width Modulation for analog output control',
      'GPIO': 'General Purpose Input/Output pins for digital I/O',
      'ADC': 'Analog-to-Digital Converter for sensor readings',
      'DAC': 'Digital-to-Analog Converter for analog output',
      'CAN': 'Controller Area Network for automotive communication',
      'USB': 'Universal Serial Bus for device connectivity',
      'TIMER': 'Hardware timers for precise timing control'
    };
    return descriptions[type] || 'Peripheral configuration';
  };

  const getPeripheralCategory = (type) => {
    const categories = {
      'UART': 'Communication',
      'SPI': 'Communication',
      'I2C': 'Communication',
      'PWM': 'Control',
      'GPIO': 'General',
      'ADC': 'Sensors',
      'DAC': 'Sensors',
      'CAN': 'Communication',
      'USB': 'Communication',
      'TIMER': 'Control'
    };
    return categories[type] || 'General';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'configured': return 'text-success';
      case 'partial': return 'text-warning';
      case 'conflict': return 'text-error';
      case 'available': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'configured': return 'bg-success/10 border-success/20';
      case 'partial': return 'bg-warning/10 border-warning/20';
      case 'conflict': return 'bg-error/10 border-error/20';
      case 'available': return 'bg-muted/10 border-muted/20';
      default: return 'bg-muted/10 border-muted/20';
    }
  };

  const getCompletenessColor = (completeness) => {
    if (completeness >= 80) return 'bg-success';
    if (completeness >= 40) return 'bg-warning';
    return 'bg-error';
  };

  // Handle validation completion
  const handleValidationComplete = (results) => {
    setValidationResults(results);
  };

  // Handle simulation completion
  const handleSimulationComplete = (results) => {
    setSimulationResults(results);
  };

  if (!selectedMcu) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Cpu" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-headline text-text-primary mb-2">No MCU Selected</h2>
          <p className="text-text-secondary mb-6">Please select a microcontroller to configure peripherals</p>
          <Link to="/ide">
            <Button variant="primary" size="lg" iconName="ArrowLeft" iconPosition="left">
              Back to IDE
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-headline text-text-primary">
                {selectedMcu.name} - Peripheral Dashboard
              </h1>
              <p className="text-text-secondary">
                Configure and manage all peripherals for your {selectedMcu.type} microcontroller
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => {/* Export configuration */}}
              >
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Upload"
                onClick={() => {/* Import configuration */}}
              >
                Import
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-80 bg-card border-r border-border overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search peripherals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-border rounded-lg bg-background text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Status</option>
                  <option value="configured">Configured</option>
                  <option value="partial">Partial</option>
                  <option value="available">Available</option>
                  <option value="conflict">Conflict</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Peripheral Type</label>
                <select
                  value={filterPeripheral}
                  onChange={(e) => setFilterPeripheral(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Types</option>
                  {peripheralTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Overview */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-primary">Status Overview</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div key={status} className="text-center p-2 bg-muted/10 rounded-lg">
                    <div className={`text-lg font-bold ${getStatusColor(status)}`}>{count}</div>
                    <div className="text-xs text-text-secondary capitalize">{status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peripheral List */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-text-primary">Peripherals</h3>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredPeripherals.map((peripheral) => (
                  <div
                    key={peripheral.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedPeripheral?.id === peripheral.id ? 'ring-2 ring-primary' : ''
                    } ${getStatusBgColor(peripheral.status)}`}
                    onClick={() => setSelectedPeripheral(peripheral)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={peripheral.icon} size={16} className={peripheral.color} />
                        <span className="text-sm font-medium text-text-primary">{peripheral.name}</span>
                      </div>
                      <Icon 
                        name={peripheral.status === 'configured' ? 'CheckCircle' : 
                             peripheral.status === 'partial' ? 'AlertTriangle' :
                             peripheral.status === 'conflict' ? 'XCircle' : 'Circle'} 
                        size={14} 
                        className={getStatusColor(peripheral.status)} 
                      />
                    </div>
                    <div className="text-xs text-text-secondary mb-2">{peripheral.description}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-text-secondary">
                        {peripheral.completeness}% complete
                      </div>
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all ${getCompletenessColor(peripheral.completeness)}`}
                          style={{ width: `${peripheral.completeness}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
              {[
                { id: 'overview', name: 'Overview', icon: 'Layout' },
                { id: 'validation', name: 'Validation', icon: 'CheckCircle' },
                { id: 'mapping', name: 'Pin Mapping', icon: 'MapPin' },
                { id: 'simulation', name: 'Simulation', icon: 'Play' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Selected Peripheral Details */}
                {selectedPeripheral ? (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedPeripheral.status === 'configured' ? 'bg-success/10' :
                          selectedPeripheral.status === 'partial' ? 'bg-warning/10' :
                          selectedPeripheral.status === 'conflict' ? 'bg-error/10' :
                          'bg-muted/10'
                        }`}>
                          <Icon name={selectedPeripheral.icon} size={24} className={selectedPeripheral.color} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-text-primary">{selectedPeripheral.name}</h3>
                          <p className="text-text-secondary">{selectedPeripheral.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedPeripheral.status === 'configured' ? 'bg-success/20 text-success' :
                          selectedPeripheral.status === 'partial' ? 'bg-warning/20 text-warning' :
                          selectedPeripheral.status === 'conflict' ? 'bg-error/20 text-error' :
                          'bg-muted/20 text-muted-foreground'
                        }`}>
                          {selectedPeripheral.status}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Settings"
                          onClick={() => {/* Open configuration editor */}}
                        >
                          Configure
                        </Button>
                      </div>
                    </div>

                    {/* Configuration Details */}
                    {selectedPeripheral.configuration && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-text-primary">Configuration</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(selectedPeripheral.configuration).map(([key, value]) => (
                            <div key={key} className="p-3 bg-muted/10 rounded-lg">
                              <div className="text-xs text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                              <div className="text-sm font-medium text-text-primary">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pin Assignments */}
                    {Object.keys(selectedPeripheral.pins).length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-text-primary">Pin Assignments</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {Object.entries(selectedPeripheral.pins).map(([functionName, pinName]) => (
                            <div key={functionName} className="p-2 bg-muted/10 rounded-lg text-center">
                              <div className="text-xs text-text-secondary">{functionName}</div>
                              <div className="text-sm font-mono font-medium text-text-primary">{pinName}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Settings" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Select a Peripheral</h3>
                    <p className="text-text-secondary">Choose a peripheral from the sidebar to view its details</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'validation' && (
              <ConfigurationValidator onValidationComplete={handleValidationComplete} />
            )}

            {activeTab === 'mapping' && (
              <PinMappingVisualizer />
            )}

            {activeTab === 'simulation' && (
              <BoardSimulator onSimulationComplete={handleSimulationComplete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensivePeripheralDashboard;
