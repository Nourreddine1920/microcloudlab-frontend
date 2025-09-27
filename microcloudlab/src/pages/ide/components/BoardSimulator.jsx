import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useMcu } from '../context/McuContext';

const BoardSimulator = ({ onSimulationComplete }) => {
  const { selectedMcu, getCurrentConfiguration } = useMcu();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1); // 1x, 2x, 4x, 8x
  const [showDetails, setShowDetails] = useState(true);
  const [simulationHistory, setSimulationHistory] = useState([]);

  // Simulation steps
  const simulationSteps = [
    { id: 'init', name: 'Initialization', description: 'Initializing MCU and peripherals' },
    { id: 'config', name: 'Configuration', description: 'Applying peripheral configurations' },
    { id: 'pinmap', name: 'Pin Mapping', description: 'Mapping pins to peripherals' },
    { id: 'validate', name: 'Validation', description: 'Validating configuration' },
    { id: 'test', name: 'Testing', description: 'Testing peripheral functionality' },
    { id: 'complete', name: 'Complete', description: 'Simulation completed successfully' }
  ];

  // Simulate board behavior
  const runSimulation = async () => {
    if (!selectedMcu) return;

    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationResults(null);

    const config = getCurrentConfiguration();
    const results = {
      mcu: selectedMcu.name,
      timestamp: new Date().toISOString(),
      steps: [],
      peripherals: {},
      pinStates: {},
      resourceUsage: {},
      errors: [],
      warnings: []
    };

    try {
      // Step 1: Initialization
      await simulateStep('init', 'Initializing MCU...', 1000);
      results.steps.push({
        step: 'init',
        status: 'success',
        message: 'MCU initialized successfully',
        details: {
          clockSpeed: '168MHz',
          memory: '128KB Flash, 20KB SRAM',
          voltage: '3.3V'
        }
      });

      // Step 2: Configuration
      await simulateStep('config', 'Applying configurations...', 1500);
      const configResults = await simulateConfiguration(config);
      results.steps.push({
        step: 'config',
        status: configResults.errors.length > 0 ? 'error' : 'success',
        message: configResults.errors.length > 0 ? 'Configuration errors detected' : 'All configurations applied successfully',
        details: configResults
      });

      // Step 3: Pin Mapping
      await simulateStep('pinmap', 'Mapping pins...', 800);
      const pinMapResults = await simulatePinMapping(config);
      results.steps.push({
        step: 'pinmap',
        status: pinMapResults.conflicts.length > 0 ? 'warning' : 'success',
        message: pinMapResults.conflicts.length > 0 ? 'Pin conflicts detected' : 'Pin mapping completed',
        details: pinMapResults
      });

      // Step 4: Validation
      await simulateStep('validate', 'Validating configuration...', 600);
      const validationResults = await simulateValidation(config);
      results.steps.push({
        step: 'validate',
        status: validationResults.isValid ? 'success' : 'error',
        message: validationResults.isValid ? 'Configuration is valid' : 'Validation failed',
        details: validationResults
      });

      // Step 5: Testing
      await simulateStep('test', 'Testing peripherals...', 2000);
      const testResults = await simulatePeripheralTesting(config);
      results.steps.push({
        step: 'test',
        status: testResults.failedTests.length > 0 ? 'warning' : 'success',
        message: testResults.failedTests.length > 0 ? 'Some tests failed' : 'All tests passed',
        details: testResults
      });

      // Step 6: Complete
      await simulateStep('complete', 'Simulation complete!', 500);
      results.steps.push({
        step: 'complete',
        status: 'success',
        message: 'Board simulation completed successfully',
        details: {
          totalPeripherals: Object.keys(config).length,
          totalPins: Object.values(pinMapResults.pinAssignments).length,
          resourceUsage: calculateResourceUsage(config),
          performance: 'Excellent'
        }
      });

      setSimulationResults(results);
      setSimulationHistory(prev => [results, ...prev.slice(0, 9)]); // Keep last 10 simulations

      if (onSimulationComplete) {
        onSimulationComplete(results);
      }

    } catch (error) {
      results.errors.push({
        step: 'error',
        message: error.message,
        details: { error: error.toString() }
      });
      setSimulationResults(results);
    } finally {
      setIsSimulating(false);
    }
  };

  const simulateStep = async (stepId, message, duration) => {
    const step = simulationSteps.find(s => s.id === stepId);
    setSimulationStep(simulationSteps.findIndex(s => s.id === stepId));
    
    // Simulate step duration based on speed
    await new Promise(resolve => setTimeout(resolve, duration / simulationSpeed));
  };

  const simulateConfiguration = async (config) => {
    const results = { peripherals: {}, errors: [], warnings: [] };

    Object.entries(config).forEach(([peripheralType, instances]) => {
      Object.entries(instances).forEach(([instance, instanceConfig]) => {
        const peripheralKey = `${peripheralType}_${instance}`;
        
        try {
          // Simulate peripheral configuration
          results.peripherals[peripheralKey] = {
            status: 'configured',
            clockSpeed: instanceConfig.clockSpeed || 'default',
            pins: Object.entries(instanceConfig).filter(([key, value]) => 
              key.includes('Pin') && value
            ).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
            configuration: instanceConfig
          };
        } catch (error) {
          results.errors.push({
            peripheral: peripheralKey,
            message: `Failed to configure ${peripheralType} ${instance}`,
            error: error.message
          });
        }
      });
    });

    return results;
  };

  const simulatePinMapping = async (config) => {
    const pinAssignments = {};
    const conflicts = [];

    Object.entries(config).forEach(([peripheralType, instances]) => {
      Object.entries(instances).forEach(([instance, instanceConfig]) => {
        Object.entries(instanceConfig).forEach(([field, pinName]) => {
          if (field.includes('Pin') && pinName) {
            if (pinAssignments[pinName]) {
              conflicts.push({
                pin: pinName,
                peripheral1: pinAssignments[pinName].peripheral,
                peripheral2: `${peripheralType}_${instance}`,
                function1: pinAssignments[pinName].function,
                function2: field
              });
            } else {
              pinAssignments[pinName] = {
                peripheral: `${peripheralType}_${instance}`,
                function: field,
                status: 'assigned'
              };
            }
          }
        });
      });
    });

    return { pinAssignments, conflicts };
  };

  const simulateValidation = async (config) => {
    // Simulate validation logic
    const errors = [];
    const warnings = [];

    // Check for required fields
    Object.entries(config).forEach(([peripheralType, instances]) => {
      Object.entries(instances).forEach(([instance, instanceConfig]) => {
        if (!instanceConfig.instance) {
          errors.push({
            peripheral: `${peripheralType}_${instance}`,
            message: 'Missing instance identifier'
          });
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      totalPeripherals: Object.keys(config).length,
      configuredPins: Object.values(config).reduce((acc, instances) => 
        acc + Object.keys(instances).length, 0
      )
    };
  };

  const simulatePeripheralTesting = async (config) => {
    const testResults = {
      passed: [],
      failed: [],
      failedTests: []
    };

    Object.entries(config).forEach(([peripheralType, instances]) => {
      Object.entries(instances).forEach(([instance, instanceConfig]) => {
        const testName = `${peripheralType}_${instance}`;
        
        // Simulate test with 90% success rate
        const success = Math.random() > 0.1;
        
        if (success) {
          testResults.passed.push({
            name: testName,
            message: `${peripheralType} ${instance} test passed`,
            duration: Math.random() * 100 + 50 // 50-150ms
          });
        } else {
          const error = `Test failed: ${peripheralType} ${instance} configuration error`;
          testResults.failed.push({
            name: testName,
            message: error,
            duration: Math.random() * 200 + 100
          });
          testResults.failedTests.push({
            peripheral: testName,
            error: error,
            suggestion: `Check ${peripheralType} configuration parameters`
          });
        }
      });
    });

    return testResults;
  };

  const calculateResourceUsage = (config) => {
    const totalPeripherals = Object.keys(config).length;
    const totalPins = Object.values(config).reduce((acc, instances) => 
      acc + Object.values(instances).reduce((pinAcc, instance) => 
        pinAcc + Object.values(instance).filter(value => 
          typeof value === 'string' && value.includes('Pin')
        ).length, 0
      ), 0
    );

    return {
      peripherals: totalPeripherals,
      pins: totalPins,
      memory: Math.round(totalPeripherals * 0.5), // Simulated memory usage
      cpu: Math.round(totalPeripherals * 2.5) // Simulated CPU usage
    };
  };

  const getStepStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getStepStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getOverallStatus = () => {
    if (!simulationResults) return 'idle';
    
    const hasErrors = simulationResults.steps.some(step => step.status === 'error');
    const hasWarnings = simulationResults.steps.some(step => step.status === 'warning');
    
    if (hasErrors) return 'error';
    if (hasWarnings) return 'warning';
    return 'success';
  };

  if (!selectedMcu) {
    return (
      <div className="text-center py-12">
        <Icon name="Cpu" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">No MCU Selected</h3>
        <p className="text-text-secondary">Select a microcontroller to run simulation</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Board Simulation</h3>
          <p className="text-sm text-text-secondary">
            Simulate board behavior and test your configuration
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg bg-background border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isSimulating}
          >
            <option value={1}>1x Speed</option>
            <option value={2}>2x Speed</option>
            <option value={4}>4x Speed</option>
            <option value={8}>8x Speed</option>
          </select>
          <Button
            variant="primary"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={runSimulation}
            disabled={isSimulating}
            className="bg-primary hover:bg-primary/90"
          >
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </Button>
        </div>
      </div>

      {/* Simulation Progress */}
      {isSimulating && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">
              {simulationSteps[simulationStep]?.name || 'Running...'}
            </span>
            <span className="text-sm text-text-secondary">
              Step {simulationStep + 1} of {simulationSteps.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((simulationStep + 1) / simulationSteps.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-text-secondary">
            {simulationSteps[simulationStep]?.description || 'Processing...'}
          </p>
        </div>
      )}

      {/* Simulation Results */}
      {simulationResults && (
        <div className="space-y-6">
          {/* Overall Status */}
          <div className={`p-4 rounded-lg border ${
            getOverallStatus() === 'success' ? 'bg-success/10 border-success/20' :
            getOverallStatus() === 'warning' ? 'bg-warning/10 border-warning/20' :
            getOverallStatus() === 'error' ? 'bg-error/10 border-error/20' :
            'bg-muted/10 border-muted/20'
          }`}>
            <div className="flex items-center space-x-3">
              <Icon 
                name={getStepStatusIcon(getOverallStatus())} 
                size={24} 
                className={getStepStatusColor(getOverallStatus())} 
              />
              <div>
                <h4 className={`font-semibold ${getStepStatusColor(getOverallStatus())}`}>
                  {getOverallStatus() === 'success' ? 'Simulation Successful' : 
                   getOverallStatus() === 'warning' ? 'Simulation Completed with Warnings' : 
                   'Simulation Failed'}
                </h4>
                <p className="text-sm text-text-secondary">
                  {simulationResults.mcu} • {new Date(simulationResults.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Step Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-text-primary">Simulation Steps</h4>
              <Button
                variant="outline"
                size="sm"
                iconName={showDetails ? 'ChevronUp' : 'ChevronDown'}
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>
            
            {showDetails && (
              <div className="space-y-2">
                {simulationResults.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/5 rounded-lg">
                    <Icon 
                      name={getStepStatusIcon(step.status)} 
                      size={16} 
                      className={`mt-0.5 flex-shrink-0 ${getStepStatusColor(step.status)}`} 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-primary">
                          {simulationSteps.find(s => s.id === step.step)?.name || step.step}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          step.status === 'success' ? 'bg-success/20 text-success' :
                          step.status === 'error' ? 'bg-error/20 text-error' :
                          'bg-warning/20 text-warning'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{step.message}</p>
                      {step.details && (
                        <div className="mt-2 text-xs text-text-secondary">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(step.details, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resource Usage */}
          {simulationResults.steps[simulationResults.steps.length - 1]?.details?.resourceUsage && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(simulationResults.steps[simulationResults.steps.length - 1].details.resourceUsage).map(([key, value]) => (
                <div key={key} className="text-center p-4 bg-muted/10 rounded-lg">
                  <div className="text-2xl font-bold text-text-primary">{value}</div>
                  <div className="text-xs text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Simulation History */}
      {simulationHistory.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-text-primary">Recent Simulations</h4>
          <div className="space-y-1">
            {simulationHistory.slice(0, 5).map((simulation, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStepStatusIcon(getOverallStatus())} 
                    size={14} 
                    className={getStepStatusColor(getOverallStatus())} 
                  />
                  <span className="text-sm text-text-primary">{simulation.mcu}</span>
                </div>
                <div className="text-xs text-text-secondary">
                  {new Date(simulation.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardSimulator;
