import React, { useState, useMemo } from 'react';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import Icon from '../../../../components/AppIcon';

const PinListSidebar = ({ 
  pins, 
  selectedPin, 
  onPinSelect, 
  onPinFilter,
  isOpen,
  onToggle,
  className = "" 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPorts, setExpandedPorts] = useState({ PA: true, PB: true, PC: true, PD: true });
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPins = useMemo(() => {
    return pins.filter(pin => {
      const matchesSearch = pin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pin.alternativeFunctions.some(func => 
                             func.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesFilter = filterStatus === 'all' || pin.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [pins, searchTerm, filterStatus]);

  const groupedPins = useMemo(() => {
    const groups = {};
    filteredPins.forEach(pin => {
      const port = pin.name.substring(0, 2); // PA, PB, PC, etc.
      if (!groups[port]) groups[port] = [];
      groups[port].push(pin);
    });
    return groups;
  }, [filteredPins]);

  const togglePort = (port) => {
    setExpandedPorts(prev => ({
      ...prev,
      [port]: !prev[port]
    }));
  };

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

  const filterOptions = [
    { key: 'all', label: 'All Pins', count: pins.length },
    { key: 'configured', label: 'Configured', count: pins.filter(p => p.status === 'configured').length },
    { key: 'conflict', label: 'Conflicts', count: pins.filter(p => p.status === 'conflict').length },
    { key: 'available', label: 'Available', count: pins.filter(p => p.status === 'available').length },
    { key: 'reserved', label: 'Reserved', count: pins.filter(p => p.status === 'reserved').length }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col w-80 bg-card border-r border-border ${className}`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-heading-sm font-heading">Pin List</h3>
            <span className="text-caption text-muted-foreground">
              {filteredPins.length} of {pins.length}
            </span>
          </div>

          <div className="space-y-3">
            <Input
              type="search"
              placeholder="Search pins or functions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />

            <div className="flex flex-wrap gap-1">
              {filterOptions.map((option) => (
                <Button
                  key={option.key}
                  variant={filterStatus === option.key ? 'default' : 'ghost'}
                  size="xs"
                  onClick={() => setFilterStatus(option.key)}
                  className="text-xs"
                >
                  {option.label} ({option.count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedPins).map(([port, portPins]) => (
            <div key={port} className="border-b border-border">
              <button
                onClick={() => togglePort(port)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted transition-micro"
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={expandedPorts[port] ? 'ChevronDown' : 'ChevronRight'} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                  <span className="text-body-sm font-medium">{port}</span>
                  <span className="text-caption text-muted-foreground">
                    ({portPins.length})
                  </span>
                </div>
              </button>

              {expandedPorts[port] && (
                <div className="pb-2">
                  {portPins.map((pin) => (
                    <button
                      key={pin.id}
                      onClick={() => onPinSelect(pin)}
                      className={`w-full flex items-center space-x-3 px-6 py-2 hover:bg-muted transition-micro ${
                        selectedPin?.id === pin.id ? 'bg-primary/10 border-r-2 border-primary' : ''
                      }`}
                    >
                      <Icon 
                        name={getStatusIcon(pin.status)} 
                        size={14} 
                        className={getStatusColor(pin.status)}
                      />
                      <div className="flex-1 text-left">
                        <div className="text-body-sm font-medium">{pin.name}</div>
                        {pin.currentAssignment && (
                          <div className="text-caption text-muted-foreground">
                            {pin.currentAssignment}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Slide-out Panel */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-1020 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="w-80 h-full bg-card border-r border-border shadow-modal">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-heading-sm font-heading">Pin List</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onToggle}
              />
            </div>

            <div className="space-y-3">
              <Input
                type="search"
                placeholder="Search pins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="flex flex-wrap gap-1">
                {filterOptions.slice(0, 3).map((option) => (
                  <Button
                    key={option.key}
                    variant={filterStatus === option.key ? 'default' : 'ghost'}
                    size="xs"
                    onClick={() => setFilterStatus(option.key)}
                  >
                    {option.label} ({option.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {Object.entries(groupedPins).map(([port, portPins]) => (
              <div key={port} className="border-b border-border">
                <button
                  onClick={() => togglePort(port)}
                  className="w-full flex items-center justify-between p-3 hover:bg-muted"
                >
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={expandedPorts[port] ? 'ChevronDown' : 'ChevronRight'} 
                      size={16} 
                    />
                    <span className="text-body-sm font-medium">{port}</span>
                    <span className="text-caption text-muted-foreground">
                      ({portPins.length})
                    </span>
                  </div>
                </button>

                {expandedPorts[port] && (
                  <div className="pb-2">
                    {portPins.map((pin) => (
                      <button
                        key={pin.id}
                        onClick={() => {
                          onPinSelect(pin);
                          onToggle();
                        }}
                        className={`w-full flex items-center space-x-3 px-6 py-2 hover:bg-muted ${
                          selectedPin?.id === pin.id ? 'bg-primary/10' : ''
                        }`}
                      >
                        <Icon 
                          name={getStatusIcon(pin.status)} 
                          size={14} 
                          className={getStatusColor(pin.status)}
                        />
                        <div className="flex-1 text-left">
                          <div className="text-body-sm font-medium">{pin.name}</div>
                          {pin.currentAssignment && (
                            <div className="text-caption text-muted-foreground">
                              {pin.currentAssignment}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
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

export default PinListSidebar;