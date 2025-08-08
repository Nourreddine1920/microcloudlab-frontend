import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import ConfigurationToolbar from './components/ConfigurationToolbar';
import ParameterAccordion from './components/ParameterAccordion';
import ConfigurationForm from './components/ConfigurationForm';
import CodePreviewPanel from './components/CodePreviewPanel';
import MobileConfigurationDrawer from './components/MobileConfigurationDrawer';
import QuickActionToolbar from '../../../components/ui/QuickActionToolbar';
import { useMcu } from '../context/McuContext';

const PeripheralConfigurationEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedMcu, selectMcu, getAvailablePeripheralInstances, getPeripheralPins } = useMcu();
  
  // Get board from URL params and set it in MCU context if not already selected
  const boardParam = searchParams.get('board');
  useEffect(() => {
    if (boardParam && (!selectedMcu || selectedMcu.id !== boardParam)) {
      selectMcu(boardParam);
    }
  }, [boardParam, selectedMcu, selectMcu]);
  
  // Get peripheral info from URL parameters, navigation state, or default to UART
  const peripheralTypeParam = searchParams.get('peripheral');
  const peripheralInstanceParam = searchParams.get('instance');
  const peripheralInfo = {
    type: peripheralTypeParam || location.state?.type || 'UART',
    instance: peripheralInstanceParam || location.state?.instance || 'UART1'
  };

  // Board display name mapping
  const getBoardDisplayName = (boardId) => {
    const boardNames = {
      'arduino-uno': 'Arduino Uno',
      'esp32-devkit': 'ESP32 DevKit',
      'raspberry-pi-pico': 'Raspberry Pi Pico',
      'stm32f103-blue-pill': 'STM32F103 Blue Pill',
      'nordic-nrf52': 'Nordic nRF52',
      'ti-cc3200': 'TI CC3200'
    };
    return boardNames[boardId] || boardId;
  };
  
  const [activeSection, setActiveSection] = useState('basic');
  const [formData, setFormData] = useState(() => {
    // Get default pins for the selected MCU and peripheral type
    const defaultPins = selectedMcu ? getPeripheralPins(peripheralInfo.type, peripheralInfo.instance) : {};
    const availableInstances = selectedMcu ? getAvailablePeripheralInstances(peripheralInfo.type) : [];
    const defaultInstance = peripheralInfo.instance || availableInstances[0] || 'UART1';
    
    return {
      instance: defaultInstance,
      baudRate: '115200',
      dataBits: '8',
      parity: 'none',
      stopBits: '1',
      flowControl: 'none',
      txBufferSize: '256',
      rxBufferSize: '256',
      dmaEnable: false,
      interruptEnable: true,
      autoBaud: false,
      oversampling: '16',
      txPin: defaultPins.tx || 'N/A',
      rxPin: defaultPins.rx || 'N/A',
      rtsPin: defaultPins.rts || 'N/A',
      ctsPin: defaultPins.cts || 'N/A',
      gpioSpeed: 'high',
      pullResistor: 'none'
    };
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState(null);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [mobileDrawerView, setMobileDrawerView] = useState('preview');

  // Update form data when MCU or peripheral info changes
  useEffect(() => {
    if (selectedMcu) {
      const defaultPins = getPeripheralPins(peripheralInfo.type, peripheralInfo.instance);
      const availableInstances = getAvailablePeripheralInstances(peripheralInfo.type);
      const targetInstance = peripheralInfo.instance && availableInstances.includes(peripheralInfo.instance) 
        ? peripheralInfo.instance 
        : availableInstances[0] || 'UART1';
      
      // Update form data to match the selected MCU's pinout and peripheral info
      setFormData(prevData => ({
        ...prevData,
        instance: targetInstance,
        txPin: defaultPins.tx || 'N/A',
        rxPin: defaultPins.rx || 'N/A',
        rtsPin: defaultPins.rts || 'N/A',
        ctsPin: defaultPins.cts || 'N/A'
      }));
    }
  }, [selectedMcu, peripheralInfo.type, peripheralInfo.instance, getPeripheralPins, getAvailablePeripheralInstances]);

  // Configuration sections for accordion
  const configurationSections = [
    {
      id: 'basic',
      title: 'Basic Settings',
      description: 'Core peripheral configuration',
      icon: 'Settings',
      parameters: [
        { id: 'instance', name: 'Instance Selection', icon: 'Cpu' },
        { id: 'baudrate', name: 'Baud Rate', icon: 'Zap' },
        { id: 'format', name: 'Data Format', icon: 'FileText' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Options',
      description: 'Buffer, DMA, and interrupt settings',
      icon: 'Sliders',
      parameters: [
        { id: 'buffers', name: 'Buffer Configuration', icon: 'Database' },
        { id: 'features', name: 'Feature Enables', icon: 'ToggleLeft' },
        { id: 'timing', name: 'Timing Settings', icon: 'Clock' }
      ]
    },
    {
      id: 'pins',
      title: 'Pin Configuration',
      description: 'GPIO pin assignment and properties',
      icon: 'Zap',
      parameters: [
        { id: 'assignment', name: 'Pin Assignment', icon: 'MapPin' },
        { id: 'properties', name: 'Pin Properties', icon: 'Settings2' },
        { id: 'conflicts', name: 'Conflict Detection', icon: 'AlertTriangle' }
      ]
    }
  ];

  // Handle form data changes
  const handleFormChange = (newData) => {
    setFormData(newData);
    setHasUnsavedChanges(true);
  };

  // Validation logic
  const validateConfiguration = async () => {
    setIsValidating(true);
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const errors = {};
    
    // Basic validation rules
    if (!formData.instance) {
      errors.instance = 'Instance selection is required';
    }
    
    if (parseInt(formData.baudRate) < 9600 || parseInt(formData.baudRate) > 115200) {
      errors.baudRate = 'Baud rate must be between 9600 and 115200';
    }
    
    // Pin conflict simulation
    if (formData.txPin === formData.rxPin) {
      errors.txPin = 'TX and RX pins cannot be the same';
      errors.rxPin = 'TX and RX pins cannot be the same';
    }
    
    // Buffer size validation
    if (parseInt(formData.txBufferSize) < 64) {
      errors.txBufferSize = 'Buffer size must be at least 64 bytes';
    }
    
    setValidationErrors(errors);
    setLastValidated(new Date());
    setIsValidating(false);
    
    return Object.keys(errors).length === 0;
  };

  // Save configuration
  const handleSave = async () => {
    const isValid = await validateConfiguration();
    if (isValid) {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUnsavedChanges(false);
      
      // Show success notification (you could add a toast here)
      console.log('Configuration saved successfully');
    }
  };

  // Reset configuration
  const handleReset = () => {
    setFormData({
      instance: peripheralInfo.instance || 'UART1',
      baudRate: '115200',
      dataBits: '8',
      parity: 'none',
      stopBits: '1',
      flowControl: 'none',
      txBufferSize: '256',
      rxBufferSize: '256',
      dmaEnable: false,
      interruptEnable: true,
      autoBaud: false,
      oversampling: '16',
      txPin: 'PA9',
      rxPin: 'PA10',
      rtsPin: 'PA12',
      ctsPin: 'PA11',
      gpioSpeed: 'high',
      pullResistor: 'none'
    });
    setValidationErrors({});
    setHasUnsavedChanges(false);
  };

  // Export configuration
  const handleExport = () => {
    const config = {
      peripheral: peripheralInfo.type,
      instance: formData.instance,
      timestamp: new Date().toISOString(),
      configuration: formData
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${peripheralInfo.type.toLowerCase()}_config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import configuration
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const config = JSON.parse(e.target.result);
            if (config.configuration) {
              setFormData(config.configuration);
              setHasUnsavedChanges(true);
            }
          } catch (error) {
            console.error('Invalid configuration file:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Mobile drawer handlers
  const openMobileDrawer = (view = 'preview') => {
    setMobileDrawerView(view);
    setShowMobileDrawer(true);
  };

  // Redirect if no peripheral selected
  useEffect(() => {
    if (!peripheralInfo.type) {
      navigate('/ide/peripheral-configuration-dashboard');
    }
  }, [peripheralInfo, navigate]);

  // Auto-validate on form changes (debounced)
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        validateConfiguration();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [formData, hasUnsavedChanges]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <ConfigurationToolbar
        peripheralType={peripheralInfo.type}
        peripheralInstance={formData.instance}
        selectedBoard={selectedMcu?.name || null}
        hasUnsavedChanges={hasUnsavedChanges}
        validationErrors={Object.keys(validationErrors).length}
        validationWarnings={0}
        isValidating={isValidating}
        lastValidated={lastValidated}
        onSave={handleSave}
        onReset={handleReset}
        onValidate={validateConfiguration}
        onExport={handleExport}
        onImport={handleImport}
        selectedMcu={selectedMcu}
        availableInstances={selectedMcu ? getAvailablePeripheralInstances(peripheralInfo.type) : []}
      />

      {/* Main Content Area */}
      <div className="pt-28 lg:pt-32">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-[calc(100vh-8rem)]">
          {/* Left Panel - Parameter Accordion */}
          <div className="w-1/4 border-r border-border bg-card overflow-y-auto">
            <div className="p-4">
              <h2 className="text-heading-md mb-4">Configuration Sections</h2>
              <ParameterAccordion
                sections={configurationSections}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                validationErrors={validationErrors}
              />
            </div>
          </div>

          {/* Center Panel - Configuration Form */}
          <div className="w-1/2 bg-background">
            <ConfigurationForm
              activeSection={activeSection}
              formData={formData}
              onFormChange={handleFormChange}
              validationErrors={validationErrors}
              peripheralType={peripheralInfo.type}
            />
          </div>

          {/* Right Panel - Code Preview */}
          <div className="w-1/4">
            <CodePreviewPanel
              formData={formData}
              peripheralType={peripheralInfo.type}
            />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:flex lg:hidden flex-col h-[calc(100vh-8rem)]">
          {/* Top Section - Form and Accordion */}
          <div className="flex flex-1">
            <div className="w-1/3 border-r border-border bg-card overflow-y-auto">
              <div className="p-4">
                <h2 className="text-heading-md mb-4">Sections</h2>
                <ParameterAccordion
                  sections={configurationSections}
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                  validationErrors={validationErrors}
                />
              </div>
            </div>
            
            <div className="flex-1 bg-background">
              <ConfigurationForm
                activeSection={activeSection}
                formData={formData}
                onFormChange={handleFormChange}
                validationErrors={validationErrors}
                peripheralType={peripheralInfo.type}
              />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t border-border bg-card p-4">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => openMobileDrawer('preview')}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-micro hover:bg-primary/90"
              >
                <span>View Code</span>
              </button>
              <button
                onClick={() => openMobileDrawer('pins')}
                className="flex items-center space-x-2 px-4 py-2 bg-outline text-foreground border border-border rounded-lg transition-micro hover:bg-muted"
              >
                <span>Pin Map</span>
              </button>
              <button
                onClick={() => openMobileDrawer('validation')}
                className="flex items-center space-x-2 px-4 py-2 bg-outline text-foreground border border-border rounded-lg transition-micro hover:bg-muted"
              >
                <span>Validate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-heading-lg mb-2">{peripheralInfo.type} Configuration</h2>
              <p className="text-body-sm text-muted-foreground">Instance: {formData.instance}</p>
            </div>

            {/* Mobile Section Navigation */}
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              {configurationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-body-sm transition-micro ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {/* Mobile Form */}
            <ConfigurationForm
              activeSection={activeSection}
              formData={formData}
              onFormChange={handleFormChange}
              validationErrors={validationErrors}
              peripheralType={peripheralInfo.type}
            />

            {/* Mobile Action Buttons */}
            <div className="fixed bottom-6 left-4 right-4 grid grid-cols-3 gap-3">
              <button
                onClick={() => openMobileDrawer('preview')}
                className="flex flex-col items-center justify-center p-3 bg-card border border-border rounded-lg shadow-card transition-micro hover:bg-muted"
              >
                <span className="text-caption">Code</span>
              </button>
              <button
                onClick={() => openMobileDrawer('pins')}
                className="flex flex-col items-center justify-center p-3 bg-card border border-border rounded-lg shadow-card transition-micro hover:bg-muted"
              >
                <span className="text-caption">Pins</span>
              </button>
              <button
                onClick={() => openMobileDrawer('validation')}
                className="flex flex-col items-center justify-center p-3 bg-card border border-border rounded-lg shadow-card transition-micro hover:bg-muted"
              >
                <span className="text-caption">Check</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar for Desktop */}
      <QuickActionToolbar
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onValidate={validateConfiguration}
        onReset={handleReset}
        hasUnsavedChanges={hasUnsavedChanges}
        isValidating={isValidating}
        className="hidden lg:block fixed bottom-6 left-1/2 transform -translate-x-1/2"
      />

      {/* Mobile Configuration Drawer */}
      <MobileConfigurationDrawer
        isOpen={showMobileDrawer}
        onClose={() => setShowMobileDrawer(false)}
        formData={formData}
        peripheralType={peripheralInfo.type}
        activeView={mobileDrawerView}
      />
    </div>
  );
};

export default PeripheralConfigurationEditor;