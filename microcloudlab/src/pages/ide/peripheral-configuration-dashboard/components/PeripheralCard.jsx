import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

/**
 * @module PeripheralCard
 */

/**
 * A card component that displays a summary of a single peripheral's configuration status.
 * It shows the peripheral's name, description, status, and provides actions to configure or edit it.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.peripheral - The peripheral object containing its details and status.
 * @returns {JSX.Element} The rendered peripheral card component.
 */
const PeripheralCard = ({ peripheral }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'configured': return 'text-success';
      case 'partial': return 'text-warning';
      case 'conflict': return 'text-error';
      case 'available': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'configured': return 'CheckCircle';
      case 'partial': return 'AlertTriangle';
      case 'conflict': return 'XCircle';
      case 'available': return 'Circle';
      default: return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'configured': return 'Configured';
      case 'partial': return 'Partial';
      case 'conflict': return 'Conflict';
      case 'available': return 'Available';
      default: return 'Not configured';
    }
  };

  const getCompletenessColor = (completeness) => {
    if (completeness >= 80) return 'bg-success';
    if (completeness >= 40) return 'bg-warning';
    return 'bg-error';
  };

  const getCompletenessText = (completeness) => {
    if (completeness >= 80) return 'Excellent';
    if (completeness >= 40) return 'Good';
    return 'Needs work';
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
          <span className="text-muted-foreground">Status</span>
          <span className={`font-medium ${getStatusColor(peripheral.status)}`}>
            {getStatusText(peripheral.status)}
          </span>
        </div>
        
        {peripheral.pins && (
          <div className="flex items-center justify-between text-body-sm">
            <span className="text-muted-foreground">Pins Used</span>
            <span className="font-medium">{peripheral.pins.used}/{peripheral.pins.available}</span>
          </div>
        )}

        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${getCompletenessColor(peripheral.completeness)}`}
            style={{ width: `${peripheral.completeness}%` }}
          />
        </div>
        <div className="flex justify-between text-caption text-muted-foreground">
          <span>Configuration</span>
          <span>{peripheral.completeness}% complete</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Link 
          to={`/ide/peripheral-configuration-editor?type=${peripheral.peripheralType}&instance=${peripheral.name}`} 
          className="flex-1"
        >
          <Button 
            variant={peripheral.status === 'configured' ? 'outline' : 'default'} 
            size="sm" 
            iconName={peripheral.status === 'configured' ? 'Edit' : 'Settings'} 
            fullWidth
          >
            {peripheral.status === 'configured' ? 'Edit' : 'Configure'}
          </Button>
        </Link>
        {peripheral.status === 'configured' && (
          <Button variant="outline" size="sm" iconName="Eye">
            Preview
          </Button>
        )}
      </div>

      {peripheral.lastModified && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-caption text-muted-foreground">
            <span>Last modified</span>
            <span>{new Date(peripheral.lastModified).toLocaleDateString()}</span>
          </div>
        </div>
      )}

      {/* Configuration summary for configured peripherals */}
      {peripheral.status === 'configured' && peripheral.configuration && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-caption">
              <span className="text-muted-foreground">Baud Rate</span>
              <span className="font-medium">{peripheral.configuration.baudRate || 'N/A'}</span>
            </div>
            {peripheral.configuration.txPin && (
              <div className="flex items-center justify-between text-caption">
                <span className="text-muted-foreground">TX Pin</span>
                <span className="font-medium">{peripheral.configuration.txPin}</span>
              </div>
            )}
            {peripheral.configuration.rxPin && (
              <div className="flex items-center justify-between text-caption">
                <span className="text-muted-foreground">RX Pin</span>
                <span className="font-medium">{peripheral.configuration.rxPin}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeripheralCard;