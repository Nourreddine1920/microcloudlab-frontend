import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import { useBoard } from '../../contexts/BoardContext';

const IDEHome = () => {
  const { selectedBoard: contextSelectedBoard, availableBoards, selectBoard } = useBoard();
  const [localSelectedBoard, setLocalSelectedBoard] = useState(contextSelectedBoard);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Show message if user was redirected due to missing board selection
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setShowRedirectMessage(true);
      // Clear the message after showing it
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    setLocalSelectedBoard(contextSelectedBoard);
  }, [contextSelectedBoard]);

  // This is now provided by the context, but we'll keep the static data as fallback
  const fallbackBoards = [
    {
      id: 'arduino-uno',
      name: 'Arduino Uno',
      description: 'ATmega328P microcontroller, perfect for beginners',
      specs: '16MHz • 32KB Flash • 2KB SRAM',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Beginner',
      peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM'],
      price: 'Free'
    },
    {
      id: 'esp32-devkit',
      name: 'ESP32 DevKit',
      description: 'Dual-core WiFi/BT microcontroller with rich peripherals',
      specs: '240MHz • 4MB Flash • 520KB SRAM',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Intermediate',
      peripherals: ['WiFi', 'Bluetooth', 'GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'DAC', 'PWM'],
      price: 'Free'
    },
    {
      id: 'raspberry-pi-pico',
      name: 'Raspberry Pi Pico',
      description: 'RP2040 dual-core ARM Cortex-M0+ microcontroller',
      specs: '133MHz • 2MB Flash • 264KB SRAM',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Intermediate',
      peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM', 'PIO'],
      price: 'Free'
    },
    {
      id: 'stm32f103-blue-pill',
      name: 'STM32F103 Blue Pill',
      description: 'ARM Cortex-M3 microcontroller with extensive peripherals',
      specs: '72MHz • 128KB Flash • 20KB SRAM',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Advanced',
      peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'DAC', 'PWM', 'CAN', 'USB'],
      price: 'Free'
    },
    {
      id: 'nordic-nrf52',
      name: 'Nordic nRF52',
      description: 'ARM Cortex-M4 with Bluetooth Low Energy',
      specs: '64MHz • 512KB Flash • 64KB SRAM',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Advanced',
      peripherals: ['Bluetooth LE', 'GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM'],
      price: 'Free'
    },
    {
      id: 'ti-cc3200',
      name: 'TI CC3200',
      description: 'WiFi-enabled ARM Cortex-M4 microcontroller',
      specs: '80MHz • 256KB Flash • 64KB SRAM',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Advanced',
      peripherals: ['WiFi', 'GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM'],
      price: 'Free'
    }
  ];

  const ideFeatures = [
    {
      title: 'Configuration Import/Export Manager',
      description: 'Import and export configuration files with ease. Manage your peripheral configurations across projects.',
      icon: 'Upload',
      path: '/ide/configuration-import-export-manager',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Configuration Validation & Conflicts',
      description: 'Validate your configurations and resolve conflicts automatically. Ensure your setups are error-free.',
      icon: 'CheckCircle',
      path: '/ide/configuration-validation-conflicts',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Peripheral Configuration Editor',
      description: 'Advanced editor for configuring peripherals. Real-time syntax highlighting and validation.',
      icon: 'Settings',
      path: '/ide/peripheral-configuration-editor',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Pin Assignment Visualizer',
      description: 'Visualize pin assignments and detect conflicts. Interactive microcontroller diagrams.',
      icon: 'Cpu',
      path: '/ide/pin-assignment-visualizer',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Peripheral Configuration Dashboard',
      description: 'Central dashboard for managing all your peripheral configurations in one place.',
      icon: 'Layout',
      path: '/ide/peripheral-configuration-dashboard',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const handleBoardSelect = (board) => {
    setLocalSelectedBoard(board);
    selectBoard(board); // Update the global context
  };

  const handleStartWithBoard = () => {
    if (localSelectedBoard) {
      // Navigate to the configuration dashboard - the board is now stored in context
      navigate('/ide/peripheral-configuration-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-accent rounded-full pulse-glow"></div>
              <span className="text-accent font-medium text-sm">MICROCLOUDLAB IDE</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-headline text-text-primary mb-4">
              Advanced Embedded
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Development Tools
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Professional-grade tools for configuring, validating, and managing your embedded system configurations. 
              Everything you need for advanced embedded development in one integrated environment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="primary"
                size="lg"
                iconName="Code"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
              >
                Start Coding
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
              >
                View Documentation
              </Button>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-background/50 rounded-lg border border-border">
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-sm text-text-secondary">Microcontrollers</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg border border-border">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-sm text-text-secondary">Peripherals</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg border border-border">
              <div className="text-2xl font-bold text-success">99.9%</div>
              <div className="text-sm text-text-secondary">Uptime</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg border border-border">
              <div className="text-2xl font-bold text-warning">10K+</div>
              <div className="text-sm text-text-secondary">Configurations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Board Selection Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Redirect Message */}
          {showRedirectMessage && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0" />
                <div>
                  <p className="text-warning font-medium">Board Selection Required</p>
                  <p className="text-text-secondary text-sm">
                    {location.state?.message || "Please select a board first to access peripheral configuration tools."}
                  </p>
                </div>
                <button 
                  onClick={() => setShowRedirectMessage(false)}
                  className="text-warning hover:text-warning/80"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-headline text-text-primary mb-4">
              Choose Your Development Board
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Select a microcontroller board to start your embedded development journey. 
              All boards are available for free trial with full IDE access.
            </p>
            {contextSelectedBoard && (
              <div className="mt-4">
                <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm">
                  <Icon name="Check" size={16} />
                  <span>Currently selected: <strong>{contextSelectedBoard.name}</strong></span>
                </div>
              </div>
            )}
        </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableBoards.map((board) => (
              <div 
                key={board.id}
                className={`relative bg-card border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  localSelectedBoard?.id === board.id
                    ? 'border-accent shadow-lg scale-105'
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => handleBoardSelect(board)}
              >
                {localSelectedBoard?.id === board.id && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} />
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={board.image} 
                      alt={board.name}
                      className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-text-primary truncate">
                        {board.name}
                      </h3>
                      <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                        {board.price}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-3">
                      {board.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-xs text-text-secondary">
                        <span className="font-medium">Specs:</span> {board.specs}
                      </div>
                      
                      <div className="text-xs text-text-secondary">
                        <span className="font-medium">Difficulty:</span> {board.difficulty}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {board.peripherals.slice(0, 4).map((peripheral, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-surface text-text-secondary px-2 py-1 rounded"
                          >
                            {peripheral}
                          </span>
                        ))}
                        {board.peripherals.length > 4 && (
                          <span className="text-xs bg-surface text-text-secondary px-2 py-1 rounded">
                            +{board.peripherals.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {localSelectedBoard && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-4 bg-accent/10 border border-accent/20 rounded-xl px-6 py-4 mb-6">
                <Icon name="Cpu" size={20} className="text-accent" />
                <span className="text-accent font-medium">
                  Selected: {localSelectedBoard.name}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="primary"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  onClick={handleStartWithBoard}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
                >
                  Start with {selectedBoard.name}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => window.location.href = `/ide/peripheral-configuration-editor?board=${selectedBoard.id}`}
                >
                  Configure Peripherals
                </Button>
              </div>
            </div>
        )}
      </div>
      </section>

      {/* IDE Features Grid */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-headline text-text-primary mb-4">
              Professional Development Tools
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Choose the tool that fits your current development needs. All tools are seamlessly integrated 
              and share the same configuration format.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideFeatures.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.path}
                className="group block"
              >
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon name={feature.icon} size={24} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-accent font-medium text-sm">
                    <span>Open Tool</span>
                    <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-headline text-text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Choose your preferred board or start with the configuration editor for a guided experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/ide/peripheral-configuration-editor">
              <Button
                variant="primary"
                size="lg"
                iconName="Settings"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
              >
                Start with Editor
              </Button>
            </Link>
            
            <Link to="/ide/pin-assignment-visualizer">
              <Button
                variant="outline"
                size="lg"
                iconName="Cpu"
                iconPosition="left"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Visualize Pins
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IDEHome;