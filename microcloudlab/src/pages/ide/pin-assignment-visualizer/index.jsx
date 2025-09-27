import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import ConfigurationContextHeader from '../../../components/ui/ConfigurationContextHeader';
import QuickActionToolbar from '../../../components/ui/QuickActionToolbar';
import ValidationStatusIndicator from '../../../components/ui/ValidationStatusIndicator';
import ChipSelector from './components/ChipSelector';
import ViewModeToggle from './components/ViewModeToggle';
import ZoomControls from './components/ZoomControls';
import PinListSidebar from './components/PinListSidebar';
import PinDetailsSidebar from './components/PinDetailsSidebar';
import MicrocontrollerDiagram from './components/MicrocontrollerDiagram';
import ConflictWarningOverlay from './components/ConflictWarningOverlay';
import PinConfigurationPopover from './components/PinConfigurationPopover';
import Button from '../../../components/ui/Button';
import { useMcu } from '../context/McuContext';


const PinAssignmentVisualizer = () => {
  const navigate = useNavigate();
  const { selectedMcu, selectMcu, getAvailablePins, getCurrentConfiguration, isPinAvailable } = useMcu();
  const [selectedChip, setSelectedChip] = useState(selectedMcu?.id || 'stm32f103c8t6');
  const [viewMode, setViewMode] = useState('package');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPin, setSelectedPin] = useState(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [showConflictOverlay, setShowConflictOverlay] = useState(false);
  const [showConfigPopover, setShowConfigPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Update selected chip when MCU changes
  useEffect(() => {
    if (selectedMcu && selectedMcu.id !== selectedChip) {
      setSelectedChip(selectedMcu.id);
    }
  }, [selectedMcu, selectedChip]);

  // Update pins when MCU changes
  useEffect(() => {
    if (selectedMcu) {
      const availablePins = getAvailablePins();
      const newPins = availablePins.map(pin => ({
        id: pin.name,
        name: pin.name,
        status: isPinAvailable(pin.name) ? 'available' : 'configured',
        currentAssignment: null,
        alternativeFunctions: pin.functions || ['GPIO'],
        maxCurrent: '25mA',
        voltageLevel: '3.3V',
        fiveTolerant: true,
        relatedPins: []
      }));
      setPins(newPins);
    }
  }, [selectedMcu, getAvailablePins, isPinAvailable]);

  // Get pins from MCU context
  const [pins, setPins] = useState(() => {
    if (selectedMcu) {
      const availablePins = getAvailablePins();
      return availablePins.map(pin => ({
        id: pin.name,
        name: pin.name,
        status: isPinAvailable(pin.name) ? 'available' : 'configured',
        currentAssignment: null,
        alternativeFunctions: pin.functions || ['GPIO'],
        maxCurrent: '25mA',
        voltageLevel: '3.3V',
        fiveTolerant: true,
        relatedPins: []
      }));
    }
    // Fallback pins for when no MCU is selected
    return [
      {
        id: 'PA0',
        name: 'PA0',
        status: 'available',
        currentAssignment: null,
        alternativeFunctions: ['GPIO', 'ADC'],
        maxCurrent: '25mA',
        voltageLevel: '3.3V',
        fiveTolerant: true,
        relatedPins: []
      }
    ];
  });

  // Mock conflict data
  const conflicts = [
    {
      pinId: 'PA1',
      pinName: 'PA1',
      description: 'Pin PA1 is assigned to both USART2_RTS and TIM2_CH2, causing a configuration conflict.',
      assignments: [
        { id: 'uart2_rts', peripheral: 'USART2', function: 'RTS' },
        { id: 'tim2_ch2', peripheral: 'TIM2', function: 'Channel 2' }
      ],
      suggestions: [
        {
          description: 'Use PA3 for USART2_RTS instead',
          action: { type: 'reassign', fromPin: 'PA1', toPin: 'PA3', function: 'USART2_RTS' }
        },
        {
          description: 'Use PB3 for TIM2_CH2 instead',
          action: { type: 'reassign', fromPin: 'PA1', toPin: 'PB3', function: 'TIM2_CH2' }
        }
      ]
    }
  ];

  const validationErrors = conflicts.length;
  const validationWarnings = pins.filter(p => p.status === 'conflict').length;

  const handleChipChange = (chip) => {
    setSelectedChip(chip);
    setSelectedPin(null);
    setHasUnsavedChanges(true);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(3, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.5, prev - 0.25));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  const handlePinSelect = (pin) => {
    setSelectedPin(pin);
    setIsRightSidebarOpen(true);
  };

  const handlePinAssign = (pinId, functionName) => {
    setPins(prev => prev.map(pin => 
      pin.id === pinId 
        ? { 
            ...pin, 
            currentAssignment: functionName,
            status: functionName ? 'configured' : 'available'
          }
        : pin
    ));
    setHasUnsavedChanges(true);
  };

  const handlePinClear = (pinId) => {
    setPins(prev => prev.map(pin => 
      pin.id === pinId 
        ? { 
            ...pin, 
            currentAssignment: null,
            status: 'available'
          }
        : pin
    ));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log('Saving pin configuration...');
    setHasUnsavedChanges(false);
  };

  const handleExport = () => {
    console.log('Exporting pin configuration...');
  };

  const handleImport = () => {
    console.log('Importing pin configuration...');
  };

  const handleValidate = () => {
    console.log('Validating pin configuration...');
    if (conflicts.length > 0) {
      setShowConflictOverlay(true);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all pin assignments?')) {
      setPins(prev => prev.map(pin => ({
        ...pin,
        currentAssignment: null,
        status: pin.status === 'reserved' ? 'reserved' : 'available'
      })));
      setSelectedPin(null);
      setHasUnsavedChanges(true);
    }
  };

  const handleResolveConflict = (pinId, assignmentId, action) => {
    if (action) {
      // Apply suggested action
      console.log('Applying conflict resolution:', action);
    } else if (assignmentId) {
      // Remove specific assignment
      console.log('Removing assignment:', assignmentId, 'from pin:', pinId);
    }
    setHasUnsavedChanges(true);
  };

  const handleConfigurationSave = (configuration) => {
    console.log('Saving pin configuration:', configuration);
    handlePinAssign(configuration.pinId, configuration.function);
  };

  // Check for conflicts on pin changes
  useEffect(() => {
    const conflictPins = pins.filter(pin => 
      pins.some(otherPin => 
        otherPin.id !== pin.id && 
        otherPin.currentAssignment === pin.currentAssignment &&
        pin.currentAssignment !== null
      )
    );
    
    setPins(prev => prev.map(pin => ({
      ...pin,
      status: conflictPins.some(cp => cp.id === pin.id) ? 'conflict' : pin.currentAssignment ?'configured' : 
              pin.status === 'reserved' ? 'reserved' : 'available'
    })));
  }, []);

  return (
    <>
      <Helmet>
        <title>Pin Assignment Visualizer - MicroCloudLab</title>
        <meta name="description" content="Interactive STM32 pin assignment visualizer with conflict detection and resolution" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <ConfigurationContextHeader
          peripheralType="Pin Assignment"
          peripheralInstance={selectedChip?.toUpperCase()}
          configurationStatus={validationErrors > 0 ? 'invalid' : validationWarnings > 0 ? 'warning' : 'valid'}
          validationErrors={validationErrors}
          onSave={handleSave}
          onValidate={handleValidate}
          onExport={handleExport}
        />

        <main className="pt-28 lg:pt-32">
          {/* Navigation Bar */}
          <div className="sticky top-28 lg:top-32 bg-background border-b border-border z-[998] p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowLeft"
                  onClick={() => navigate('/ide/integrated')}
                >
                  Back to IDE
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Layout"
                  onClick={() => navigate('/ide/peripheral-configuration-dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="CheckCircle"
                  onClick={() => navigate('/ide/configuration-validation-conflicts')}
                >
                  Validate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Activity"
                  onClick={() => navigate('/ide/peripheral-communication-dashboard')}
                >
                  Monitor
                </Button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="sticky top-40 lg:top-44 bg-background border-b border-border z-[998] p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <ChipSelector
                  selectedChip={selectedChip}
                  onChipChange={handleChipChange}
                />
                
                <div className="flex items-center space-x-3">
                  <ViewModeToggle
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                  />
                  
                  <ZoomControls
                    zoomLevel={zoomLevel}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onZoomReset={handleZoomReset}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <ValidationStatusIndicator
                  totalErrors={validationErrors}
                  totalWarnings={validationWarnings}
                  lastValidated={new Date()}
                  onValidate={handleValidate}
                />

                {/* Mobile Sidebar Toggles */}
                <div className="lg:hidden flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="List"
                    onClick={() => setIsLeftSidebarOpen(true)}
                  >
                    Pins
                  </Button>
                  
                  {selectedPin && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Settings"
                      onClick={() => setIsRightSidebarOpen(true)}
                    >
                      Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex h-[calc(100vh-200px)]">
            <PinListSidebar
              pins={pins}
              selectedPin={selectedPin}
              onPinSelect={handlePinSelect}
              isOpen={isLeftSidebarOpen}
              onToggle={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
            />

            <MicrocontrollerDiagram
              selectedChip={selectedChip}
              pins={pins}
              selectedPin={selectedPin}
              onPinSelect={handlePinSelect}
              viewMode={viewMode}
              zoomLevel={zoomLevel}
              onZoomChange={setZoomLevel}
              className="flex-1"
            />

            <PinDetailsSidebar
              selectedPin={selectedPin}
              onPinAssign={handlePinAssign}
              onPinClear={handlePinClear}
              isOpen={isRightSidebarOpen}
              onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            />
          </div>

          {/* Quick Action Toolbar */}
          <QuickActionToolbar
            onSave={handleSave}
            onExport={handleExport}
            onImport={handleImport}
            onValidate={handleValidate}
            onReset={handleReset}
            hasUnsavedChanges={hasUnsavedChanges}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:block"
          />
        </main>

        {/* Overlays */}
        <ConflictWarningOverlay
          conflicts={conflicts}
          onResolveConflict={handleResolveConflict}
          onDismiss={() => setShowConflictOverlay(false)}
          isVisible={showConflictOverlay}
        />

        <PinConfigurationPopover
          pin={selectedPin}
          isVisible={showConfigPopover}
          position={popoverPosition}
          onClose={() => setShowConfigPopover(false)}
          onSave={handleConfigurationSave}
        />
      </div>
    </>
  );
};

export default PinAssignmentVisualizer;