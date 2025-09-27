import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMcu } from '../context/McuContext';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import EnhancedMcuSelector from './EnhancedMcuSelector';
import ConfigurationValidator from './ConfigurationValidator';
import PinMappingVisualizer from './PinMappingVisualizer';
import BoardSimulator from './BoardSimulator';

const IntegratedIDE = () => {
  const { selectedMcu, selectMcu } = useMcu();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection', 'configuration', 'validation', 'mapping', 'simulation'
  const [selectedPin, setSelectedPin] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Workflow steps
  const workflowSteps = [
    { id: 'selection', name: 'MCU Selection', icon: 'Cpu', description: 'Choose your microcontroller' },
    { id: 'configuration', name: 'Configuration', icon: 'Settings', description: 'Configure peripherals' },
    { id: 'validation', name: 'Validation', icon: 'CheckCircle', description: 'Validate configuration' },
    { id: 'mapping', name: 'Pin Mapping', icon: 'MapPin', description: 'Visualize pin assignments' },
    { id: 'simulation', name: 'Simulation', icon: 'Play', description: 'Test board behavior' }
  ];

  // Handle MCU selection
  const handleMcuSelect = async (mcu) => {
    await selectMcu(mcu.id);
    setCurrentStep('configuration');
  };

  // Handle validation completion
  const handleValidationComplete = (results) => {
    setValidationResults(results);
    if (results.status === 'success') {
      setCurrentStep('mapping');
    }
  };

  // Handle simulation completion
  const handleSimulationComplete = (results) => {
    setSimulationResults(results);
  };

  // Navigation functions
  const goToStep = (stepId) => {
    if (stepId === 'configuration' && !selectedMcu) {
      return; // Can't go to configuration without MCU
    }
    setCurrentStep(stepId);
  };

  const nextStep = () => {
    const currentIndex = workflowSteps.findIndex(step => step.id === currentStep);
    if (currentIndex < workflowSteps.length - 1) {
      setCurrentStep(workflowSteps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = workflowSteps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(workflowSteps[currentIndex - 1].id);
    }
  };

  // Get current step info
  const currentStepInfo = workflowSteps.find(step => step.id === currentStep);
  const currentStepIndex = workflowSteps.findIndex(step => step.id === currentStep);

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'selection':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-headline text-text-primary mb-4">
                Choose Your Microcontroller
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Select a microcontroller board to start your embedded development journey. 
                All boards are available for free with full IDE access.
              </p>
            </div>
            <EnhancedMcuSelector onMcuSelect={handleMcuSelect} currentMcu={selectedMcu} />
          </div>
        );

      case 'configuration':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-headline text-text-primary mb-4">
                Configure Peripherals
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Configure your peripheral settings for {selectedMcu?.name}. 
                Set up UART, SPI, I2C, GPIO, and other peripherals.
              </p>
            </div>
            
            {/* Quick Access to Existing Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                   onClick={() => navigate('/ide/peripheral-configuration-dashboard')}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Layout" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Peripheral Dashboard</h3>
                    <p className="text-sm text-text-secondary">Manage all peripherals</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  Central dashboard for configuring and managing all your peripheral configurations.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                   onClick={() => navigate('/ide/peripheral-configuration-editor')}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Settings" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Configuration Editor</h3>
                    <p className="text-sm text-text-secondary">Advanced editor</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  Advanced editor for configuring individual peripherals with real-time validation.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                   onClick={() => navigate('/ide/pin-assignment-visualizer')}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Cpu" size={24} className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Pin Visualizer</h3>
                    <p className="text-sm text-text-secondary">Visual pin mapping</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  Visualize pin assignments and detect conflicts with interactive diagrams.
                </p>
              </div>
            </div>

            {/* MCU Info Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Selected MCU: {selectedMcu?.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-text-secondary">Type:</span>
                  <p className="font-medium">{selectedMcu?.type}</p>
                </div>
                <div>
                  <span className="text-sm text-text-secondary">Specifications:</span>
                  <p className="font-medium">{selectedMcu?.specs}</p>
                </div>
                <div>
                  <span className="text-sm text-text-secondary">Available Peripherals:</span>
                  <p className="font-medium">{selectedMcu?.peripherals?.length || 0} types</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'validation':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-headline text-text-primary mb-4">
                Validate Configuration
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Validate your peripheral configurations and detect any conflicts or errors.
              </p>
            </div>
            
            {/* Quick Access to Validation Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                   onClick={() => navigate('/ide/configuration-validation-conflicts')}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={24} className="text-error" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Validation & Conflicts</h3>
                    <p className="text-sm text-text-secondary">Advanced validation</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  Comprehensive validation system with conflict detection and resolution suggestions.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={24} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Quick Validation</h3>
                    <p className="text-sm text-text-secondary">Basic validation</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  Run a quick validation check on your current configuration.
                </p>
                <ConfigurationValidator onValidationComplete={handleValidationComplete} />
              </div>
            </div>
          </div>
        );

      case 'mapping':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-headline text-text-primary mb-4">
                Pin Mapping Visualization
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Visualize how your peripherals are mapped to physical pins on the {selectedMcu?.name}.
              </p>
            </div>
            
            {/* Quick Access to Pin Mapping Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                   onClick={() => navigate('/ide/pin-assignment-visualizer')}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Cpu" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Pin Assignment Visualizer</h3>
                    <p className="text-sm text-text-secondary">Interactive diagrams</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  Interactive microcontroller diagrams with pin conflict detection and assignment tools.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Quick Pin Mapping</h3>
                    <p className="text-sm text-text-secondary">Basic visualization</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  Quick overview of pin assignments and conflicts.
                </p>
                <PinMappingVisualizer onPinSelect={setSelectedPin} selectedPin={selectedPin} />
              </div>
            </div>
          </div>
        );

      case 'simulation':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-headline text-text-primary mb-4">
                Board Simulation
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Simulate your board's behavior and test your configuration in a virtual environment.
              </p>
            </div>
            
            {/* Quick Access to Simulation Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                   onClick={() => navigate('/ide/peripheral-communication-dashboard')}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Communication Dashboard</h3>
                    <p className="text-sm text-text-secondary">Monitor communications</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  Monitor peripheral communications and data transmission in real-time.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Play" size={24} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Board Simulator</h3>
                    <p className="text-sm text-text-secondary">Test configuration</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  Simulate board behavior and test your configuration.
                </p>
                <BoardSimulator onSimulationComplete={handleSimulationComplete} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className={`bg-card border-r border-border transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-80'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className={`font-headline text-text-primary transition-opacity duration-300 ${
                sidebarCollapsed ? 'opacity-0' : 'opacity-100'
              }`}>
                IDE Workflow
              </h1>
              <Button
                variant="outline"
                size="sm"
                iconName={sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
            </div>

            {/* Workflow Steps */}
            <div className="space-y-2">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                    currentStep === step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  onClick={() => goToStep(step.id)}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                    currentStep === step.id
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted'
                  }`}>
                    <Icon 
                      name={step.icon} 
                      size={16} 
                      className={currentStep === step.id ? 'text-primary-foreground' : 'text-muted-foreground'} 
                    />
                  </div>
                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{step.name}</div>
                      <div className="text-xs opacity-75">{step.description}</div>
                    </div>
                  )}
                  {!sidebarCollapsed && currentStep === step.id && (
                    <Icon name="Check" size={16} className="text-primary-foreground" />
                  )}
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            {!sidebarCollapsed && (
              <div className="mt-8">
                <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((currentStepIndex + 1) / workflowSteps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / workflowSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* MCU Info */}
            {!sidebarCollapsed && selectedMcu && (
              <div className="mt-8 p-4 bg-muted/10 rounded-lg">
                <h3 className="text-sm font-semibold text-text-primary mb-2">Selected MCU</h3>
                <div className="space-y-2">
                  <div className="text-sm text-text-primary">{selectedMcu.name}</div>
                  <div className="text-xs text-text-secondary">{selectedMcu.type}</div>
                  <div className="text-xs text-text-secondary">{selectedMcu.specs}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowLeft"
                  onClick={() => navigate('/ide/integrated')}
                >
                  Back to IDE
                </Button>
                <div>
                  <h2 className="text-xl font-headline text-text-primary">
                    {currentStepInfo?.name}
                  </h2>
                  <p className="text-sm text-text-secondary">
                    {currentStepInfo?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronLeft"
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="ChevronRight"
                  iconPosition="right"
                  onClick={nextStep}
                  disabled={currentStepIndex === workflowSteps.length - 1 || 
                           (currentStep === 'configuration' && !selectedMcu)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-card border-t border-border px-6 py-2">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <span>MCU: {selectedMcu?.name || 'None selected'}</span>
            <span>Step: {currentStepIndex + 1} of {workflowSteps.length}</span>
            {validationResults && (
              <span className={`flex items-center space-x-1 ${
                validationResults.status === 'success' ? 'text-success' :
                validationResults.status === 'warning' ? 'text-warning' :
                'text-error'
              }`}>
                <Icon name="CheckCircle" size={14} />
                <span>Validation: {validationResults.status}</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Circle" size={8} className="text-success" />
            <span>IDE Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedIDE;
