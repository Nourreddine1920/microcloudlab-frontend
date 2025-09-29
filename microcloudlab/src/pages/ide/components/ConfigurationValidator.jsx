import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useMcu } from '../context/McuContext';

/**
 * @module ConfigurationValidator
 */

/**
 * A component that validates the current microcontroller configuration against a set of predefined rules.
 * It checks for missing fields, pin conflicts, and invalid values, then presents a detailed report
 * of errors, warnings, and conflicts.
 *
 * @param {object} props - The properties for the component.
 * @param {Function} [props.onValidationComplete] - A callback function that is executed when the validation process is complete. It receives the validation results object as an argument.
 * @returns {JSX.Element} The rendered configuration validator component.
 */
const ConfigurationValidator = ({ onValidationComplete }) => {
  const { selectedMcu, getCurrentConfiguration, getAvailablePins } = useMcu();
  const [validationResults, setValidationResults] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationHistory, setValidationHistory] = useState([]);

  // Validation rules for different peripheral types
  const validationRules = {
    UART: {
      required: ['instance', 'baudRate', 'txPin', 'rxPin'],
      optional: ['dataBits', 'parity', 'stopBits', 'flowControl'],
      pinConflicts: ['txPin', 'rxPin'],
      baudRateRange: [1200, 115200],
      dataBitsOptions: [5, 6, 7, 8],
      parityOptions: ['none', 'odd', 'even'],
      stopBitsOptions: [1, 2]
    },
    SPI: {
      required: ['instance', 'mosiPin', 'misoPin', 'sckPin', 'ssPin'],
      optional: ['clockSpeed', 'bitOrder', 'mode'],
      pinConflicts: ['mosiPin', 'misoPin', 'sckPin', 'ssPin'],
      clockSpeedRange: [100000, 10000000],
      bitOrderOptions: ['msb', 'lsb'],
      modeOptions: [0, 1, 2, 3]
    },
    I2C: {
      required: ['instance', 'sdaPin', 'sclPin'],
      optional: ['clockSpeed', 'pullupResistors'],
      pinConflicts: ['sdaPin', 'sclPin'],
      clockSpeedRange: [100000, 400000]
    },
    PWM: {
      required: ['instance', 'outputPin', 'frequency'],
      optional: ['dutyCycle', 'resolution'],
      pinConflicts: ['outputPin'],
      frequencyRange: [1, 1000000],
      dutyCycleRange: [0, 100]
    },
    GPIO: {
      required: ['instance', 'pin', 'mode'],
      optional: ['pullup', 'pulldown', 'speed'],
      pinConflicts: ['pin'],
      modeOptions: ['input', 'output', 'input_pullup', 'input_pulldown'],
      speedOptions: ['low', 'medium', 'high']
    },
    ADC: {
      required: ['instance', 'pin', 'resolution'],
      optional: ['reference', 'samplingTime'],
      pinConflicts: ['pin'],
      resolutionOptions: [8, 10, 12, 16],
      referenceOptions: ['internal', 'external', 'vcc']
    }
  };

  // Validate configuration
  const validateConfiguration = useMemo(() => {
    if (!selectedMcu) return null;

    const config = getCurrentConfiguration();
    const availablePins = getAvailablePins();
    const errors = [];
    const warnings = [];
    const conflicts = [];
    const pinUsage = {};

    // Track pin usage across all peripherals
    Object.entries(config).forEach(([peripheralType, instances]) => {
      Object.entries(instances).forEach(([instance, instanceConfig]) => {
        const rules = validationRules[peripheralType];
        if (!rules) return;

        // Check required fields
        rules.required.forEach(field => {
          if (!instanceConfig[field] || instanceConfig[field] === '') {
            errors.push({
              type: 'error',
              category: 'missing_field',
              peripheral: `${peripheralType}_${instance}`,
              field,
              message: `Required field '${field}' is missing for ${peripheralType} ${instance}`
            });
          }
        });

        // Check pin conflicts
        rules.pinConflicts?.forEach(pinField => {
          const pinName = instanceConfig[pinField];
          if (pinName) {
            if (pinUsage[pinName]) {
              conflicts.push({
                type: 'conflict',
                category: 'pin_conflict',
                peripheral: `${peripheralType}_${instance}`,
                field: pinField,
                pin: pinName,
                message: `Pin ${pinName} is already used by ${pinUsage[pinName].peripheral}`,
                conflictingPeripheral: pinUsage[pinName].peripheral
              });
            } else {
              pinUsage[pinName] = {
                peripheral: `${peripheralType}_${instance}`,
                field: pinField
              };
            }
          }
        });

        // Validate field values
        Object.entries(instanceConfig).forEach(([field, value]) => {
          if (value === '' || value === null || value === undefined) return;

          // Baud rate validation
          if (field === 'baudRate' && rules.baudRateRange) {
            const baudRate = parseInt(value);
            if (isNaN(baudRate) || baudRate < rules.baudRateRange[0] || baudRate > rules.baudRateRange[1]) {
              errors.push({
                type: 'error',
                category: 'invalid_value',
                peripheral: `${peripheralType}_${instance}`,
                field,
                value,
                message: `Invalid baud rate: ${value}. Must be between ${rules.baudRateRange[0]} and ${rules.baudRateRange[1]}`
              });
            }
          }

          // Clock speed validation
          if (field === 'clockSpeed' && rules.clockSpeedRange) {
            const clockSpeed = parseInt(value);
            if (isNaN(clockSpeed) || clockSpeed < rules.clockSpeedRange[0] || clockSpeed > rules.clockSpeedRange[1]) {
              errors.push({
                type: 'error',
                category: 'invalid_value',
                peripheral: `${peripheralType}_${instance}`,
                field,
                value,
                message: `Invalid clock speed: ${value}. Must be between ${rules.clockSpeedRange[0]} and ${rules.clockSpeedRange[1]}`
              });
            }
          }

          // Frequency validation
          if (field === 'frequency' && rules.frequencyRange) {
            const frequency = parseInt(value);
            if (isNaN(frequency) || frequency < rules.frequencyRange[0] || frequency > rules.frequencyRange[1]) {
              errors.push({
                type: 'error',
                category: 'invalid_value',
                peripheral: `${peripheralType}_${instance}`,
                field,
                value,
                message: `Invalid frequency: ${value}. Must be between ${rules.frequencyRange[0]} and ${rules.frequencyRange[1]}`
              });
            }
          }

          // Duty cycle validation
          if (field === 'dutyCycle' && rules.dutyCycleRange) {
            const dutyCycle = parseInt(value);
            if (isNaN(dutyCycle) || dutyCycle < rules.dutyCycleRange[0] || dutyCycle > rules.dutyCycleRange[1]) {
              errors.push({
                type: 'error',
                category: 'invalid_value',
                peripheral: `${peripheralType}_${instance}`,
                field,
                value,
                message: `Invalid duty cycle: ${value}. Must be between ${rules.dutyCycleRange[0]} and ${rules.dutyCycleRange[1]}`
              });
            }
          }

          // Options validation
          const optionsField = `${field}Options`;
          if (rules[optionsField] && !rules[optionsField].includes(value)) {
            warnings.push({
              type: 'warning',
              category: 'invalid_option',
              peripheral: `${peripheralType}_${instance}`,
              field,
              value,
              message: `Unusual value for ${field}: ${value}. Consider using: ${rules[optionsField].join(', ')}`
            });
          }
        });
      });
    });

    // Check for unused pins
    const usedPins = Object.keys(pinUsage);
    const availablePinNames = availablePins.map(pin => pin.name);
    const unusedPins = availablePinNames.filter(pin => !usedPins.includes(pin));
    
    if (unusedPins.length > 0) {
      warnings.push({
        type: 'warning',
        category: 'unused_pins',
        message: `${unusedPins.length} pins are available but not configured: ${unusedPins.slice(0, 5).join(', ')}${unusedPins.length > 5 ? '...' : ''}`
      });
    }

    // Calculate overall status
    const hasErrors = errors.length > 0 || conflicts.length > 0;
    const hasWarnings = warnings.length > 0;
    const status = hasErrors ? 'error' : hasWarnings ? 'warning' : 'success';

    return {
      status,
      errors,
      warnings,
      conflicts,
      pinUsage,
      unusedPins,
      summary: {
        totalErrors: errors.length,
        totalWarnings: warnings.length,
        totalConflicts: conflicts.length,
        configuredPeripherals: Object.keys(config).length,
        usedPins: usedPins.length,
        availablePins: availablePinNames.length
      }
    };
  }, [selectedMcu, getCurrentConfiguration, getAvailablePins]);

  const runValidation = async () => {
    setIsValidating(true);
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const results = validateConfiguration;
    setValidationResults(results);
    
    // Add to history
    setValidationHistory(prev => [{
      timestamp: new Date().toISOString(),
      results: results,
      mcu: selectedMcu?.name
    }, ...prev.slice(0, 9)]); // Keep last 10 validations
    
    setIsValidating(false);
    
    if (onValidationComplete) {
      onValidationComplete(results);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'success': return 'bg-success/10 border-success/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'error': return 'bg-error/10 border-error/20';
      default: return 'bg-muted/10 border-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Validation Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Configuration Validation</h3>
          <p className="text-sm text-text-secondary">
            Validate your peripheral configurations and detect conflicts
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          iconName="CheckCircle"
          iconPosition="left"
          onClick={runValidation}
          disabled={isValidating || !selectedMcu}
          className="bg-primary hover:bg-primary/90"
        >
          {isValidating ? 'Validating...' : 'Run Validation'}
        </Button>
      </div>

      {/* Current Status */}
      {validationResults && (
        <div className={`p-4 rounded-lg border ${getStatusBgColor(validationResults.status)}`}>
          <div className="flex items-center space-x-3">
            <Icon 
              name={getStatusIcon(validationResults.status)} 
              size={24} 
              className={getStatusColor(validationResults.status)} 
            />
            <div>
              <h4 className={`font-semibold ${getStatusColor(validationResults.status)}`}>
                {validationResults.status === 'success' ? 'Configuration Valid' : 
                 validationResults.status === 'warning' ? 'Configuration Has Warnings' : 
                 'Configuration Has Errors'}
              </h4>
              <p className="text-sm text-text-secondary">
                {validationResults.summary.totalErrors} errors, {validationResults.summary.totalWarnings} warnings, {validationResults.summary.totalConflicts} conflicts
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Validation Results */}
      {validationResults && (
        <div className="space-y-4">
          {/* Errors */}
          {validationResults.errors.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-error flex items-center space-x-2">
                <Icon name="XCircle" size={16} />
                <span>Errors ({validationResults.errors.length})</span>
              </h4>
              <div className="space-y-2">
                {validationResults.errors.map((error, index) => (
                  <div key={index} className="p-3 bg-error/5 border border-error/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="XCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-error font-medium">{error.message}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          {error.peripheral} • {error.field}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conflicts */}
          {validationResults.conflicts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-warning flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} />
                <span>Pin Conflicts ({validationResults.conflicts.length})</span>
              </h4>
              <div className="space-y-2">
                {validationResults.conflicts.map((conflict, index) => (
                  <div key={index} className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-warning font-medium">{conflict.message}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          Pin {conflict.pin} • {conflict.peripheral} vs {conflict.conflictingPeripheral}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {validationResults.warnings.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-warning flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} />
                <span>Warnings ({validationResults.warnings.length})</span>
              </h4>
              <div className="space-y-2">
                {validationResults.warnings.map((warning, index) => (
                  <div key={index} className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-warning font-medium">{warning.message}</p>
                        {warning.peripheral && (
                          <p className="text-xs text-text-secondary mt-1">
                            {warning.peripheral} • {warning.field}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/10 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{validationResults.summary.configuredPeripherals}</div>
              <div className="text-xs text-text-secondary">Peripherals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{validationResults.summary.usedPins}</div>
              <div className="text-xs text-text-secondary">Used Pins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{validationResults.summary.availablePins}</div>
              <div className="text-xs text-text-secondary">Total Pins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{validationResults.summary.unusedPins.length}</div>
              <div className="text-xs text-text-secondary">Unused Pins</div>
            </div>
          </div>
        </div>
      )}

      {/* Validation History */}
      {validationHistory.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-text-primary">Recent Validations</h4>
          <div className="space-y-1">
            {validationHistory.slice(0, 5).map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(entry.results.status)} 
                    size={14} 
                    className={getStatusColor(entry.results.status)} 
                  />
                  <span className="text-sm text-text-primary">{entry.mcu}</span>
                </div>
                <div className="text-xs text-text-secondary">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationValidator;
