import React from 'react';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';
import { Checkbox } from '../../../../components/ui/Checkbox';

import Icon from '../../../../components/AppIcon';

const ConfigurationForm = ({ 
  activeSection, 
  formData, 
  onFormChange, 
  validationErrors = {},
  peripheralType = 'UART'
}) => {
  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const renderBasicSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="Settings" size={20} className="text-primary" />
        <h3 className="text-heading-md">Basic Configuration</h3>
      </div>

      <Select
        label="UART Instance"
        description="Select the UART peripheral instance"
        options={[
          { value: 'UART1', label: 'UART1 - Primary Interface' },
          { value: 'UART2', label: 'UART2 - Secondary Interface' },
          { value: 'UART3', label: 'UART3 - Debug Interface' },
          { value: 'UART4', label: 'UART4 - Auxiliary Interface' }
        ]}
        value={formData.instance || 'UART1'}
        onChange={(value) => handleInputChange('instance', value)}
        error={validationErrors.instance}
        required
      />

      <Select
        label="Baud Rate"
        description="Communication speed in bits per second"
        options={[
          { value: '9600', label: '9600 bps - Standard' },
          { value: '19200', label: '19200 bps - Fast' },
          { value: '38400', label: '38400 bps - High Speed' },
          { value: '57600', label: '57600 bps - Very Fast' },
          { value: '115200', label: '115200 bps - Maximum' }
        ]}
        value={formData.baudRate || '115200'}
        onChange={(value) => handleInputChange('baudRate', value)}
        error={validationErrors.baudRate}
        required
      />

      <Select
        label="Data Bits"
        description="Number of data bits per frame"
        options={[
          { value: '7', label: '7 bits' },
          { value: '8', label: '8 bits (Standard)' },
          { value: '9', label: '9 bits' }
        ]}
        value={formData.dataBits || '8'}
        onChange={(value) => handleInputChange('dataBits', value)}
      />

      <Select
        label="Parity"
        description="Error detection method"
        options={[
          { value: 'none', label: 'None - No parity check' },
          { value: 'even', label: 'Even - Even parity' },
          { value: 'odd', label: 'Odd - Odd parity' }
        ]}
        value={formData.parity || 'none'}
        onChange={(value) => handleInputChange('parity', value)}
      />

      <Select
        label="Stop Bits"
        description="Number of stop bits"
        options={[
          { value: '1', label: '1 bit (Standard)' },
          { value: '1.5', label: '1.5 bits' },
          { value: '2', label: '2 bits' }
        ]}
        value={formData.stopBits || '1'}
        onChange={(value) => handleInputChange('stopBits', value)}
      />
    </div>
  );

  const renderAdvancedOptions = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="Sliders" size={20} className="text-primary" />
        <h3 className="text-heading-md">Advanced Options</h3>
      </div>

      <Select
        label="Flow Control"
        description="Hardware flow control method"
        options={[
          { value: 'none', label: 'None - No flow control' },
          { value: 'rts', label: 'RTS - Request to Send' },
          { value: 'cts', label: 'CTS - Clear to Send' },
          { value: 'rts_cts', label: 'RTS/CTS - Full duplex' }
        ]}
        value={formData.flowControl || 'none'}
        onChange={(value) => handleInputChange('flowControl', value)}
      />

      <div className="space-y-4">
        <label className="text-body-sm font-medium">Buffer Settings</label>
        
        <Input
          label="TX Buffer Size"
          type="number"
          description="Transmit buffer size in bytes"
          value={formData.txBufferSize || '256'}
          onChange={(e) => handleInputChange('txBufferSize', e.target.value)}
          min="64"
          max="2048"
          error={validationErrors.txBufferSize}
        />

        <Input
          label="RX Buffer Size"
          type="number"
          description="Receive buffer size in bytes"
          value={formData.rxBufferSize || '256'}
          onChange={(e) => handleInputChange('rxBufferSize', e.target.value)}
          min="64"
          max="2048"
          error={validationErrors.rxBufferSize}
        />
      </div>

      <div className="space-y-3">
        <label className="text-body-sm font-medium">Feature Enables</label>
        
        <Checkbox
          label="DMA Enable"
          description="Use Direct Memory Access for data transfer"
          checked={formData.dmaEnable || false}
          onChange={(e) => handleInputChange('dmaEnable', e.target.checked)}
        />

        <Checkbox
          label="Interrupt Enable"
          description="Enable UART interrupts"
          checked={formData.interruptEnable || true}
          onChange={(e) => handleInputChange('interruptEnable', e.target.checked)}
        />

        <Checkbox
          label="Auto Baud Detection"
          description="Automatically detect baud rate"
          checked={formData.autoBaud || false}
          onChange={(e) => handleInputChange('autoBaud', e.target.checked)}
        />
      </div>

      <Select
        label="Oversampling"
        description="Oversampling rate for better noise immunity"
        options={[
          { value: '8', label: '8x Oversampling' },
          { value: '16', label: '16x Oversampling (Default)' }
        ]}
        value={formData.oversampling || '16'}
        onChange={(value) => handleInputChange('oversampling', value)}
      />
    </div>
  );

  const renderPinConfiguration = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-heading-md">Pin Configuration</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="TX Pin"
          description="Transmit data pin"
          options={[
            { value: 'PA9', label: 'PA9 - Port A Pin 9' },
            { value: 'PB6', label: 'PB6 - Port B Pin 6' },
            { value: 'PC6', label: 'PC6 - Port C Pin 6' },
            { value: 'PD5', label: 'PD5 - Port D Pin 5' }
          ]}
          value={formData.txPin || 'PA9'}
          onChange={(value) => handleInputChange('txPin', value)}
          error={validationErrors.txPin}
          required
        />

        <Select
          label="RX Pin"
          description="Receive data pin"
          options={[
            { value: 'PA10', label: 'PA10 - Port A Pin 10' },
            { value: 'PB7', label: 'PB7 - Port B Pin 7' },
            { value: 'PC7', label: 'PC7 - Port C Pin 7' },
            { value: 'PD6', label: 'PD6 - Port D Pin 6' }
          ]}
          value={formData.rxPin || 'PA10'}
          onChange={(value) => handleInputChange('rxPin', value)}
          error={validationErrors.rxPin}
          required
        />
      </div>

      {formData.flowControl !== 'none' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="RTS Pin"
            description="Request to Send pin"
            options={[
              { value: 'PA12', label: 'PA12 - Port A Pin 12' },
              { value: 'PB14', label: 'PB14 - Port B Pin 14' },
              { value: 'PC8', label: 'PC8 - Port C Pin 8' }
            ]}
            value={formData.rtsPin || 'PA12'}
            onChange={(value) => handleInputChange('rtsPin', value)}
            disabled={!formData.flowControl?.includes('rts')}
          />

          <Select
            label="CTS Pin"
            description="Clear to Send pin"
            options={[
              { value: 'PA11', label: 'PA11 - Port A Pin 11' },
              { value: 'PB13', label: 'PB13 - Port B Pin 13' },
              { value: 'PC9', label: 'PC9 - Port C Pin 9' }
            ]}
            value={formData.ctsPin || 'PA11'}
            onChange={(value) => handleInputChange('ctsPin', value)}
            disabled={!formData.flowControl?.includes('cts')}
          />
        </div>
      )}

      <div className="space-y-4">
        <label className="text-body-sm font-medium">Pin Properties</label>
        
        <Select
          label="GPIO Speed"
          description="Pin switching speed"
          options={[
            { value: 'low', label: 'Low Speed - 2 MHz' },
            { value: 'medium', label: 'Medium Speed - 25 MHz' },
            { value: 'high', label: 'High Speed - 50 MHz' },
            { value: 'very_high', label: 'Very High Speed - 100 MHz' }
          ]}
          value={formData.gpioSpeed || 'high'}
          onChange={(value) => handleInputChange('gpioSpeed', value)}
        />

        <Select
          label="Pull Resistor"
          description="Internal pull-up/pull-down configuration"
          options={[
            { value: 'none', label: 'No Pull' },
            { value: 'up', label: 'Pull-up' },
            { value: 'down', label: 'Pull-down' }
          ]}
          value={formData.pullResistor || 'none'}
          onChange={(value) => handleInputChange('pullResistor', value)}
        />
      </div>

      {(validationErrors.txPin || validationErrors.rxPin) && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
            <div>
              <div className="text-body-sm font-medium text-error">Pin Conflict Detected</div>
              <div className="text-caption text-error/80 mt-1">
                The selected pins are already in use by another peripheral. Please choose different pins.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'basic':
        return renderBasicSettings();
      case 'advanced':
        return renderAdvancedOptions();
      case 'pins':
        return renderPinConfiguration();
      default:
        return renderBasicSettings();
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default ConfigurationForm;