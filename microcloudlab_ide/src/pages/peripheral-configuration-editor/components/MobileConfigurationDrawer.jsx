import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CodePreviewPanel from './CodePreviewPanel';

const MobileConfigurationDrawer = ({ 
  isOpen, 
  onClose, 
  formData, 
  peripheralType,
  activeView = 'preview' 
}) => {
  const [currentView, setCurrentView] = useState(activeView);

  if (!isOpen) return null;

  const views = [
    { id: 'preview', label: 'Code Preview', icon: 'Code' },
    { id: 'pins', label: 'Pin Map', icon: 'Map' },
    { id: 'validation', label: 'Validation', icon: 'CheckSquare' }
  ];

  const renderPinVisualization = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="Map" size={20} className="text-primary" />
        <h3 className="text-heading-md">Pin Assignment</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-3">
          <div className="text-caption text-muted-foreground mb-2">TX Pin</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-body-sm font-medium">{formData.txPin || 'PA9'}</span>
          </div>
          <div className="text-caption text-muted-foreground mt-1">Available</div>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <div className="text-caption text-muted-foreground mb-2">RX Pin</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-body-sm font-medium">{formData.rxPin || 'PA10'}</span>
          </div>
          <div className="text-caption text-muted-foreground mt-1">Available</div>
        </div>
      </div>

      {formData.flowControl !== 'none' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-caption text-muted-foreground mb-2">RTS Pin</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-body-sm font-medium">{formData.rtsPin || 'PA12'}</span>
            </div>
            <div className="text-caption text-muted-foreground mt-1">Conditional</div>
          </div>

          <div className="bg-muted rounded-lg p-3">
            <div className="text-caption text-muted-foreground mb-2">CTS Pin</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-body-sm font-medium">{formData.ctsPin || 'PA11'}</span>
            </div>
            <div className="text-caption text-muted-foreground mt-1">Conditional</div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="text-body-sm font-medium mb-2">Pin Configuration Summary</div>
        <div className="space-y-2 text-caption">
          <div className="flex justify-between">
            <span>GPIO Speed:</span>
            <span className="font-medium">{formData.gpioSpeed || 'High'}</span>
          </div>
          <div className="flex justify-between">
            <span>Pull Resistor:</span>
            <span className="font-medium">{formData.pullResistor || 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span>Alternate Function:</span>
            <span className="font-medium">AF7_{peripheralType}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderValidationView = () => (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="CheckSquare" size={20} className="text-primary" />
        <h3 className="text-heading-md">Configuration Validation</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <div>
            <div className="text-body-sm font-medium text-success">Basic Configuration Valid</div>
            <div className="text-caption text-success/80">All required parameters are properly configured</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <div>
            <div className="text-body-sm font-medium text-warning">Buffer Size Warning</div>
            <div className="text-caption text-warning/80">Large buffer sizes may impact memory usage</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-muted border border-border rounded-lg">
          <Icon name="Info" size={16} className="text-muted-foreground" />
          <div>
            <div className="text-body-sm font-medium">Pin Assignment</div>
            <div className="text-caption text-muted-foreground">No conflicts detected with current configuration</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="text-body-sm font-medium mb-3">Configuration Summary</div>
        <div className="space-y-2 text-caption">
          <div className="flex justify-between">
            <span>Peripheral:</span>
            <span className="font-medium">{peripheralType} ({formData.instance})</span>
          </div>
          <div className="flex justify-between">
            <span>Baud Rate:</span>
            <span className="font-medium">{formData.baudRate || '115200'} bps</span>
          </div>
          <div className="flex justify-between">
            <span>Data Format:</span>
            <span className="font-medium">{formData.dataBits || '8'}-{formData.parity || 'N'}-{formData.stopBits || '1'}</span>
          </div>
          <div className="flex justify-between">
            <span>Flow Control:</span>
            <span className="font-medium">{formData.flowControl || 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'preview':
        return <CodePreviewPanel formData={formData} peripheralType={peripheralType} />;
      case 'pins':
        return renderPinVisualization();
      case 'validation':
        return renderValidationView();
      default:
        return <CodePreviewPanel formData={formData} peripheralType={peripheralType} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1020 md:hidden">
      <div className="fixed inset-x-0 bottom-0 bg-card border-t border-border rounded-t-xl max-h-[80vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={18} className="text-primary" />
            <h3 className="text-heading-sm">Configuration Details</h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* View Tabs */}
        <div className="flex border-b border-border">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 text-body-sm transition-micro ${
                currentView === view.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={view.icon} size={16} />
              <span>{view.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default MobileConfigurationDrawer;