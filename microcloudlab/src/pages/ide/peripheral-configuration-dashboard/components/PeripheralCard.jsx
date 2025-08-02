import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const PeripheralCard = ({ peripheral }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'configured': return 'text-success';
      case 'partial': return 'text-warning';
      case 'conflict': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'configured': return 'CheckCircle';
      case 'partial': return 'AlertTriangle';
      case 'conflict': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'configured': return 'Configured';
      case 'partial': return 'Partial';
      case 'conflict': return 'Conflict';
      default: return 'Not configured';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-hover group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            peripheral.status === 'configured' ? 'bg-success/10 text-success' :
            peripheral.status === 'partial' ? 'bg-warning/10 text-warning' :
            peripheral.status === 'conflict'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name={peripheral.icon} size={20} />
          </div>
          <div>
            <h3 className="text-heading-sm font-heading">{peripheral.name}</h3>
            <p className="text-caption text-muted-foreground">{peripheral.description}</p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-1 ${getStatusColor(peripheral.status)}`}>
          <Icon name={getStatusIcon(peripheral.status)} size={14} />
          <span className="text-caption font-medium">{getStatusText(peripheral.status)}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-body-sm">
          <span className="text-muted-foreground">Instances</span>
          <span className="font-medium">{peripheral.instances.active}/{peripheral.instances.total}</span>
        </div>
        
        {peripheral.pins && (
          <div className="flex items-center justify-between text-body-sm">
            <span className="text-muted-foreground">Pins Used</span>
            <span className="font-medium">{peripheral.pins.used}/{peripheral.pins.available}</span>
          </div>
        )}

        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              peripheral.completeness > 80 ? 'bg-success' :
              peripheral.completeness > 40 ? 'bg-warning': 'bg-error'
            }`}
            style={{ width: `${peripheral.completeness}%` }}
          />
        </div>
        <div className="flex justify-between text-caption text-muted-foreground">
          <span>Configuration</span>
          <span>{peripheral.completeness}% complete</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Link to="/peripheral-configuration-editor" className="flex-1">
          <Button variant="default" size="sm" iconName="Settings" fullWidth>
            Configure
          </Button>
        </Link>
        <Button variant="outline" size="sm" iconName="Eye">
          Preview
        </Button>
      </div>

      {peripheral.lastModified && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-caption text-muted-foreground">
            <span>Last modified</span>
            <span>{new Date(peripheral.lastModified).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeripheralCard;