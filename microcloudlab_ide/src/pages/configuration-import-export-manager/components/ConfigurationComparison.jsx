import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationComparison = ({ 
  configurations, 
  onClose, 
  onSelectForEdit 
}) => {
  const [activeSection, setActiveSection] = useState('overview');

  if (!configurations || configurations.length < 2) {
    return null;
  }

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'peripherals', label: 'Peripherals', icon: 'Cpu' },
    { id: 'pins', label: 'Pin Assignment', icon: 'Map' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const renderOverviewComparison = () => (
    <div className="space-y-6">
      {/* Basic Info Comparison */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <h3 className="text-heading-sm font-heading">Configuration Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-caption font-medium text-muted-foreground w-32">Property</th>
                {configurations.map((config, index) => (
                  <th key={index} className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">
                    {config.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-body-sm font-medium">Target Chip</td>
                {configurations.map((config, index) => (
                  <td key={index} className="px-4 py-3 text-body-sm">{config.chipType}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-body-sm font-medium">Version</td>
                {configurations.map((config, index) => (
                  <td key={index} className="px-4 py-3 text-body-sm">{config.version}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-body-sm font-medium">Peripherals</td>
                {configurations.map((config, index) => (
                  <td key={index} className="px-4 py-3 text-body-sm">{config.peripherals.length}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-body-sm font-medium">Pins Used</td>
                {configurations.map((config, index) => (
                  <td key={index} className="px-4 py-3 text-body-sm">{config.pinCount}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-body-sm font-medium">Memory Usage</td>
                {configurations.map((config, index) => (
                  <td key={index} className="px-4 py-3 text-body-sm">{config.memoryUsage}KB</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Differences Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-body-sm font-medium text-success">Common Features</span>
          </div>
          <div className="text-heading-lg font-heading text-success">12</div>
          <div className="text-caption text-success/80">Shared peripherals</div>
        </div>
        
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-body-sm font-medium text-warning">Differences</span>
          </div>
          <div className="text-heading-lg font-heading text-warning">8</div>
          <div className="text-caption text-warning/80">Configuration differences</div>
        </div>
        
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="XCircle" size={16} className="text-error" />
            <span className="text-body-sm font-medium text-error">Conflicts</span>
          </div>
          <div className="text-heading-lg font-heading text-error">3</div>
          <div className="text-caption text-error/80">Pin conflicts detected</div>
        </div>
      </div>
    </div>
  );

  const renderPeripheralComparison = () => (
    <div className="space-y-4">
      <h3 className="text-heading-sm font-heading">Peripheral Configuration Comparison</h3>
      
      {/* Get all unique peripherals */}
      {Array.from(new Set(configurations.flatMap(config => config.peripherals))).map((peripheral) => (
        <div key={peripheral} className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Cpu" size={16} className="text-primary" />
              <h4 className="text-body-sm font-medium">{peripheral}</h4>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {configurations.map((config, index) => {
                const peripheralConfig = config.peripheralDetails.find(p => p.name === peripheral);
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm font-medium">{config.name}</span>
                      {peripheralConfig ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-success/10 text-success">
                          Configured
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                          Not Used
                        </span>
                      )}
                    </div>
                    
                    {peripheralConfig && (
                      <div className="space-y-1">
                        {Object.entries(peripheralConfig.settings).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-body-sm">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-mono">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPinComparison = () => (
    <div className="space-y-4">
      <h3 className="text-heading-sm font-heading">Pin Assignment Comparison</h3>
      
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">Pin</th>
                {configurations.map((config, index) => (
                  <th key={index} className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">
                    {config.name}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Array.from(new Set(configurations.flatMap(config => config.pinAssignments.map(pin => pin.name)))).map((pinName) => {
                const pinConfigs = configurations.map(config => 
                  config.pinAssignments.find(pin => pin.name === pinName)
                );
                const hasConflict = pinConfigs.filter(Boolean).length > 1 && 
                  new Set(pinConfigs.filter(Boolean).map(pin => pin.function)).size > 1;
                
                return (
                  <tr key={pinName} className={hasConflict ? 'bg-error/5' : ''}>
                    <td className="px-4 py-3 text-body-sm font-mono">{pinName}</td>
                    {pinConfigs.map((pin, index) => (
                      <td key={index} className="px-4 py-3 text-body-sm">
                        {pin ? (
                          <div>
                            <div className="font-medium">{pin.function}</div>
                            <div className="text-caption text-muted-foreground">{pin.peripheral}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unused</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      {hasConflict ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-error/10 text-error">
                          <Icon name="AlertTriangle" size={12} className="mr-1" />
                          Conflict
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-success/10 text-success">
                          <Icon name="CheckCircle" size={12} className="mr-1" />
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1020 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="GitCompare" size={20} className="text-primary" />
              <div>
                <h2 className="text-heading-sm font-heading">Configuration Comparison</h2>
                <p className="text-caption text-muted-foreground">
                  Comparing {configurations.length} configurations
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Export Comparison
              </Button>
              <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1 mt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-body-sm transition-micro ${
                  activeSection === section.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon name={section.icon} size={16} />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeSection === 'overview' && renderOverviewComparison()}
          {activeSection === 'peripherals' && renderPeripheralComparison()}
          {activeSection === 'pins' && renderPinComparison()}
          {activeSection === 'settings' && (
            <div className="text-center py-8">
              <Icon name="Settings" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-body-sm text-muted-foreground">Settings comparison coming soon</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-caption text-muted-foreground">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex space-x-2">
              {configurations.map((config, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  iconName="Edit2"
                  onClick={() => onSelectForEdit(config)}
                >
                  Edit {config.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationComparison;