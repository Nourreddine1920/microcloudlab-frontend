import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const ConfigurationPreview = ({ 
  selectedConfig, 
  onExport, 
  onEdit, 
  onCompare,
  isCompareMode,
  selectedForComparison 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedConfig) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-card text-center p-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-heading-sm font-heading mb-2">No Configuration Selected</h3>
        <p className="text-body-sm text-muted-foreground mb-4">
          Select a configuration from the file browser to view its details and preview the generated code.
        </p>
        <Button variant="outline" iconName="Upload">
          Import Configuration
        </Button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'peripherals', label: 'Peripherals', icon: 'Cpu' },
    { id: 'pins', label: 'Pin Assignment', icon: 'Map' },
    { id: 'code', label: 'Generated Code', icon: 'Code' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Configuration Info */}
      <div className="bg-muted rounded-lg p-4">
        <h3 className="text-heading-sm font-heading mb-3">Configuration Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-caption text-muted-foreground">Name</label>
            <p className="text-body-sm font-medium">{selectedConfig.name}</p>
          </div>
          <div>
            <label className="text-caption text-muted-foreground">Target Chip</label>
            <p className="text-body-sm font-medium">{selectedConfig.chipType}</p>
          </div>
          <div>
            <label className="text-caption text-muted-foreground">Created</label>
            <p className="text-body-sm">{new Date(selectedConfig.createdDate).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-caption text-muted-foreground">Last Modified</label>
            <p className="text-body-sm">{new Date(selectedConfig.lastModified).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-caption text-muted-foreground">Project</label>
            <p className="text-body-sm">{selectedConfig.projectName || 'None'}</p>
          </div>
          <div>
            <label className="text-caption text-muted-foreground">Version</label>
            <p className="text-body-sm">{selectedConfig.version}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      {selectedConfig.description && (
        <div>
          <h4 className="text-body-sm font-medium mb-2">Description</h4>
          <p className="text-body-sm text-muted-foreground">{selectedConfig.description}</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-heading-lg font-heading text-primary">{selectedConfig.peripherals.length}</div>
          <div className="text-caption text-muted-foreground">Peripherals</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-heading-lg font-heading text-accent">{selectedConfig.pinCount}</div>
          <div className="text-caption text-muted-foreground">Pins Used</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-heading-lg font-heading text-success">{selectedConfig.codeLines}</div>
          <div className="text-caption text-muted-foreground">Lines of Code</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-heading-lg font-heading text-warning">{selectedConfig.memoryUsage}KB</div>
          <div className="text-caption text-muted-foreground">Memory Usage</div>
        </div>
      </div>
    </div>
  );

  const renderPeripherals = () => (
    <div className="space-y-4">
      <h3 className="text-heading-sm font-heading">Configured Peripherals</h3>
      <div className="space-y-3">
        {selectedConfig.peripheralDetails.map((peripheral, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Cpu" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-body-sm font-medium">{peripheral.name}</h4>
                  <p className="text-caption text-muted-foreground">{peripheral.instance}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                peripheral.status === 'configured' ? 'bg-success/10 text-success' :
                peripheral.status === 'warning'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
              }`}>
                {peripheral.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(peripheral.settings).map(([key, value]) => (
                <div key={key}>
                  <label className="text-caption text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <p className="text-body-sm font-mono">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPinAssignment = () => (
    <div className="space-y-4">
      <h3 className="text-heading-sm font-heading">Pin Assignment Overview</h3>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">Pin</th>
                <th className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">Function</th>
                <th className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">Peripheral</th>
                <th className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">Mode</th>
                <th className="px-4 py-3 text-left text-caption font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {selectedConfig.pinAssignments.map((pin, index) => (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-body-sm font-mono">{pin.name}</td>
                  <td className="px-4 py-3 text-body-sm">{pin.function}</td>
                  <td className="px-4 py-3 text-body-sm">{pin.peripheral}</td>
                  <td className="px-4 py-3 text-body-sm">{pin.mode}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      pin.status === 'ok' ? 'bg-success/10 text-success' :
                      pin.status === 'conflict'? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                    }`}>
                      {pin.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCode = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-heading-sm font-heading">Generated Code</h3>
        <Button variant="outline" size="sm" iconName="Copy">
          Copy Code
        </Button>
      </div>
      
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-body-sm text-slate-300">main.c</span>
          <div className="flex items-center space-x-2">
            <span className="text-caption text-slate-400">{selectedConfig.codeLines} lines</span>
            <Button variant="ghost" size="sm" iconName="Download" className="text-slate-300 hover:text-white">
              Download
            </Button>
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm text-slate-300 font-mono">
            <code>{selectedConfig.generatedCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-heading-sm font-heading">{selectedConfig.name}</h2>
              <p className="text-caption text-muted-foreground">{selectedConfig.chipType}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isCompareMode && (
              <Button
                variant={selectedForComparison.includes(selectedConfig.id) ? "default" : "outline"}
                size="sm"
                iconName="GitCompare"
                onClick={() => onCompare(selectedConfig)}
              >
                Compare
              </Button>
            )}
            <Button variant="outline" size="sm" iconName="Edit2" onClick={() => onEdit(selectedConfig)}>
              Edit
            </Button>
            <Button variant="default" size="sm" iconName="Download" onClick={() => onExport(selectedConfig)}>
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-body-sm transition-micro ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'peripherals' && renderPeripherals()}
        {activeTab === 'pins' && renderPinAssignment()}
        {activeTab === 'code' && renderCode()}
      </div>
    </div>
  );
};

export default ConfigurationPreview;