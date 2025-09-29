import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

/**
 * @module ConfigurationContextHeader
 */

/**
 * A fixed header component that displays the context of the current peripheral configuration.
 * It shows the peripheral type, instance, status, and provides quick actions like saving, validating, and exporting.
 *
 * @param {object} props - The properties for the component.
 * @param {string|null} [props.peripheralType=null] - The type of the peripheral being configured (e.g., "UART").
 * @param {string|null} [props.peripheralInstance=null] - The specific instance of the peripheral (e.g., "UART0").
 * @param {('draft'|'valid'|'invalid'|'warning')} [props.configurationStatus='draft'] - The current status of the configuration.
 * @param {number} [props.validationErrors=0] - The number of validation errors.
 * @param {Function} props.onSave - Callback function to be executed when the save button is clicked.
 * @param {Function} props.onValidate - Callback function to be executed when the validate button is clicked.
 * @param {Function} props.onExport - Callback function to be executed when the export button is clicked.
 * @returns {JSX.Element|null} The rendered header component, or null if no configuration is active.
 */
const ConfigurationContextHeader = ({ 
  peripheralType = null, 
  peripheralInstance = null, 
  configurationStatus = 'draft',
  validationErrors = 0,
  onSave,
  onValidate,
  onExport 
}) => {
  const location = useLocation();
  
  const isConfigurationActive = peripheralType && peripheralInstance;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return 'text-success';
      case 'invalid': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return 'CheckCircle';
      case 'invalid': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Clock';
    }
  };

  if (!isConfigurationActive) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 bg-muted border-b border-border z-[999]">
      <div className="flex items-center justify-between h-12 px-4 lg:px-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-body-sm">
          <Link 
            to="/peripheral-configuration-dashboard" 
            className="text-muted-foreground hover:text-foreground transition-micro"
          >
            Dashboard
          </Link>
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          <span className="text-foreground font-medium">{peripheralType}</span>
          {peripheralInstance && (
            <>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">{peripheralInstance}</span>
            </>
          )}
        </div>

        {/* Configuration Status */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(configurationStatus)} 
              size={16} 
              className={getStatusColor(configurationStatus)} 
            />
            <span className={`text-body-sm capitalize ${getStatusColor(configurationStatus)}`}>
              {configurationStatus}
            </span>
          </div>

          {validationErrors > 0 && (
            <div className="flex items-center space-x-1 text-error">
              <Icon name="AlertCircle" size={16} />
              <span className="text-body-sm">{validationErrors} issues</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="Save"
            onClick={onSave}
            className="hidden sm:flex"
          >
            Save
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            iconName="CheckSquare"
            onClick={onValidate}
          >
            <span className="hidden sm:inline">Validate</span>
            <span className="sm:hidden">Check</span>
          </Button>

          <Button 
            variant="secondary" 
            size="sm" 
            iconName="Download"
            onClick={onExport}
            className="hidden md:flex"
          >
            Export
          </Button>

          {/* Mobile Actions Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" iconName="MoreVertical" />
          </div>
        </div>
      </div>

      {/* Mobile Status Bar */}
      <div className="md:hidden px-4 py-2 bg-background border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(configurationStatus)} 
              size={14} 
              className={getStatusColor(configurationStatus)} 
            />
            <span className={`text-body-sm capitalize ${getStatusColor(configurationStatus)}`}>
              {configurationStatus}
            </span>
          </div>

          {validationErrors > 0 && (
            <div className="flex items-center space-x-1 text-error">
              <Icon name="AlertCircle" size={14} />
              <span className="text-caption">{validationErrors} issues</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationContextHeader;