import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { useBoard } from '../../contexts/BoardContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PeripheralCategoryTabs from './components/PeripheralCategoryTabs';
import PeripheralCard from './components/PeripheralCard';
import ConfigurationPreviewPanel from './components/ConfigurationPreviewPanel';
import GlobalSearchBar from './components/GlobalSearchBar';
import QuickStatsOverview from './components/QuickStatsOverview';
import FloatingActionMenu from './components/FloatingActionMenu';

const PeripheralConfigurationDashboard = () => {
  const { selectedBoard } = useBoard();
  const [activeCategory, setActiveCategory] = useState('communication');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const [filteredPeripherals, setFilteredPeripherals] = useState([]);

  // Generate board-specific peripheral data
  const getBoardSpecificPeripherals = () => {
    if (!selectedBoard) {
      return defaultPeripheralData;
    }

    const boardCategories = selectedBoard.peripheralCategories || {};
    const specificData = {};

    // Map board-specific peripheral categories to detailed configurations
    Object.keys(boardCategories).forEach(category => {
      specificData[category] = boardCategories[category].map((peripheralName, index) => ({
        id: `${peripheralName.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        name: peripheralName,
        description: getPeripheralDescription(peripheralName),
        icon: getPeripheralIcon(peripheralName),
        status: Math.random() > 0.5 ? 'configured' : Math.random() > 0.3 ? 'partial' : 'not_configured',
        instances: { 
          active: Math.floor(Math.random() * 3), 
          total: Math.floor(Math.random() * 8) + 1 
        },
        pins: { 
          used: Math.floor(Math.random() * 8), 
          available: selectedBoard.id === 'arduino-uno' ? 20 : 144 
        },
        completeness: Math.floor(Math.random() * 101),
        lastModified: Math.random() > 0.3 ? new Date().toISOString() : null
      }));
    });

    return specificData;
  };

  const getPeripheralDescription = (name) => {
    const descriptions = {
      'UART': 'Universal Asynchronous Receiver Transmitter',
      'UART1': 'Universal Asynchronous Receiver Transmitter 1',
      'UART2': 'Universal Asynchronous Receiver Transmitter 2',
      'SPI': 'Serial Peripheral Interface',
      'SPI1': 'Serial Peripheral Interface 1',
      'SPI2': 'Serial Peripheral Interface 2',
      'I2C': 'Inter-Integrated Circuit',
      'I2C1': 'Inter-Integrated Circuit 1',
      'I2C2': 'Inter-Integrated Circuit 2',
      'WiFi': 'Wireless Network Interface',
      'Bluetooth': 'Bluetooth Low Energy Interface',
      'Bluetooth LE': 'Bluetooth Low Energy Interface',
      'CAN1': 'Controller Area Network 1',
      'USB OTG': 'Universal Serial Bus On-The-Go',
      'GPIO Port A': 'General Purpose Input/Output Port A',
      'GPIO Port B': 'General Purpose Input/Output Port B',
      'GPIO Port C': 'General Purpose Input/Output Port C',
      'GPIO Port D': 'General Purpose Input/Output Port D',
      'Timer 1': 'Advanced Control Timer 1',
      'Timer 2': 'General Purpose Timer 2',
      'Timer 3': 'General Purpose Timer 3',
      'PWM Channel 1': 'Pulse Width Modulation Channel 1',
      'PWM Channel 2': 'Pulse Width Modulation Channel 2',
      'Watchdog Timer': 'Independent Watchdog Timer',
      'ADC1': 'Analog to Digital Converter 1',
      'ADC2': 'Analog to Digital Converter 2',
      'DAC1': 'Digital to Analog Converter 1',
      'Comparator 1': 'Analog Comparator 1',
      'RCC': 'Reset and Clock Control',
      'Power Management': 'Power Control Unit',
      'NVIC': 'Nested Vector Interrupt Controller',
      'DMA1': 'Direct Memory Access Controller 1',
      'DMA2': 'Direct Memory Access Controller 2',
      'RTC': 'Real Time Clock',
      'Clock Control': 'System Clock Controller',
      'PIO': 'Programmable Input/Output'
    };
    return descriptions[name] || `${name} peripheral interface`;
  };

  const getPeripheralIcon = (name) => {
    if (name.includes('UART') || name.includes('SPI') || name.includes('I2C') || name.includes('CAN') || name.includes('USB')) {
      return 'Radio';
    }
    if (name.includes('WiFi') || name.includes('Bluetooth')) {
      return 'Wifi';
    }
    if (name.includes('GPIO')) {
      return 'Zap';
    }
    if (name.includes('Timer') || name.includes('PWM') || name.includes('Watchdog')) {
      return 'Clock';
    }
    if (name.includes('ADC') || name.includes('DAC') || name.includes('Comparator')) {
      return 'Activity';
    }
    if (name.includes('Power') || name.includes('RCC') || name.includes('NVIC') || name.includes('DMA') || name.includes('RTC') || name.includes('Clock')) {
      return 'Settings';
    }
    return 'Settings';
  };

  const defaultPeripheralData = {
    communication: [
      {
        id: 'uart1',
        name: 'UART1',
        description: 'Universal Asynchronous Receiver Transmitter',
        icon: 'Radio',
        status: 'configured',
        instances: { active: 1, total: 6 },
        pins: { used: 2, available: 144 },
        completeness: 100,
        lastModified: '2025-07-30T10:30:00Z'
      },
      {
        id: 'uart2',
        name: 'UART2',
        description: 'Universal Asynchronous Receiver Transmitter',
        icon: 'Radio',
        status: 'partial',
        instances: { active: 1, total: 6 },
        pins: { used: 1, available: 144 },
        completeness: 65,
        lastModified: '2025-07-29T15:45:00Z'
      },
      {
        id: 'spi1',
        name: 'SPI1',
        description: 'Serial Peripheral Interface',
        icon: 'Wifi',
        status: 'configured',
        instances: { active: 1, total: 3 },
        pins: { used: 4, available: 144 },
        completeness: 100,
        lastModified: '2025-07-30T09:15:00Z'
      },
      {
        id: 'spi2',
        name: 'SPI2',
        description: 'Serial Peripheral Interface',
        icon: 'Wifi',
        status: 'not_configured',
        instances: { active: 0, total: 3 },
        pins: { used: 0, available: 144 },
        completeness: 0,
        lastModified: null
      },
      {
        id: 'i2c1',
        name: 'I2C1',
        description: 'Inter-Integrated Circuit',
        icon: 'Link',
        status: 'conflict',
        instances: { active: 1, total: 3 },
        pins: { used: 2, available: 144 },
        completeness: 80,
        lastModified: '2025-07-30T11:20:00Z'
      },
      {
        id: 'i2c2',
        name: 'I2C2',
        description: 'Inter-Integrated Circuit',
        icon: 'Link',
        status: 'not_configured',
        instances: { active: 0, total: 3 },
        pins: { used: 0, available: 144 },
        completeness: 0,
        lastModified: null
      },
      {
        id: 'can1',
        name: 'CAN1',
        description: 'Controller Area Network',
        icon: 'Network',
        status: 'partial',
        instances: { active: 1, total: 2 },
        pins: { used: 2, available: 144 },
        completeness: 45,
        lastModified: '2025-07-28T14:30:00Z'
      },
      {
        id: 'usb',
        name: 'USB OTG',
        description: 'Universal Serial Bus On-The-Go',
        icon: 'Usb',
        status: 'not_configured',
        instances: { active: 0, total: 1 },
        pins: { used: 0, available: 144 },
        completeness: 0,
        lastModified: null
      }
    ],
    gpio: [
      {
        id: 'gpioa',
        name: 'GPIO Port A',
        description: 'General Purpose Input/Output Port A',
        icon: 'Zap',
        status: 'configured',
        instances: { active: 8, total: 16 },
        pins: { used: 8, available: 16 },
        completeness: 85,
        lastModified: '2025-07-30T12:00:00Z'
      },
      {
        id: 'gpiob',
        name: 'GPIO Port B',
        description: 'General Purpose Input/Output Port B',
        icon: 'Zap',
        status: 'partial',
        instances: { active: 4, total: 16 },
        pins: { used: 4, available: 16 },
        completeness: 60,
        lastModified: '2025-07-30T08:45:00Z'
      },
      {
        id: 'gpioc',
        name: 'GPIO Port C',
        description: 'General Purpose Input/Output Port C',
        icon: 'Zap',
        status: 'configured',
        instances: { active: 6, total: 16 },
        pins: { used: 6, available: 16 },
        completeness: 90,
        lastModified: '2025-07-29T16:30:00Z'
      },
      {
        id: 'gpiod',
        name: 'GPIO Port D',
        description: 'General Purpose Input/Output Port D',
        icon: 'Zap',
        status: 'not_configured',
        instances: { active: 0, total: 16 },
        pins: { used: 0, available: 16 },
        completeness: 0,
        lastModified: null
      }
    ],
    timers: [
      {
        id: 'tim1',
        name: 'Timer 1',
        description: 'Advanced Control Timer',
        icon: 'Clock',
        status: 'configured',
        instances: { active: 1, total: 1 },
        pins: { used: 4, available: 144 },
        completeness: 95,
        lastModified: '2025-07-30T07:20:00Z'
      },
      {
        id: 'tim2',
        name: 'Timer 2',
        description: 'General Purpose Timer',
        icon: 'Clock',
        status: 'partial',
        instances: { active: 1, total: 1 },
        pins: { used: 2, available: 144 },
        completeness: 70,
        lastModified: '2025-07-29T13:15:00Z'
      },
      {
        id: 'tim3',
        name: 'Timer 3',
        description: 'General Purpose Timer',
        icon: 'Clock',
        status: 'not_configured',
        instances: { active: 0, total: 1 },
        pins: { used: 0, available: 144 },
        completeness: 0,
        lastModified: null
      },
      {
        id: 'pwm1',
        name: 'PWM Channel 1',
        description: 'Pulse Width Modulation',
        icon: 'Waves',
        status: 'configured',
        instances: { active: 2, total: 4 },
        pins: { used: 2, available: 144 },
        completeness: 100,
        lastModified: '2025-07-30T06:45:00Z'
      },
      {
        id: 'watchdog',
        name: 'Watchdog Timer',
        description: 'Independent Watchdog Timer',
        icon: 'Shield',
        status: 'partial',
        instances: { active: 1, total: 1 },
        pins: { used: 0, available: 144 },
        completeness: 40,
        lastModified: '2025-07-28T10:30:00Z'
      }
    ],
    analog: [
      {
        id: 'adc1',
        name: 'ADC1',
        description: 'Analog to Digital Converter',
        icon: 'Activity',
        status: 'conflict',
        instances: { active: 3, total: 16 },
        pins: { used: 3, available: 144 },
        completeness: 75,
        lastModified: '2025-07-30T11:10:00Z'
      },
      {
        id: 'adc2',
        name: 'ADC2',
        description: 'Analog to Digital Converter',
        icon: 'Activity',
        status: 'not_configured',
        instances: { active: 0, total: 16 },
        pins: { used: 0, available: 144 },
        completeness: 0,
        lastModified: null
      },
      {
        id: 'dac1',
        name: 'DAC1',
        description: 'Digital to Analog Converter',
        icon: 'TrendingUp',
        status: 'configured',
        instances: { active: 1, total: 2 },
        pins: { used: 1, available: 144 },
        completeness: 100,
        lastModified: '2025-07-29T14:20:00Z'
      },
      {
        id: 'comp1',
        name: 'Comparator 1',
        description: 'Analog Comparator',
        icon: 'GitCompare',
        status: 'partial',
        instances: { active: 1, total: 2 },
        pins: { used: 2, available: 144 },
        completeness: 55,
        lastModified: '2025-07-28T16:45:00Z'
      }
    ],
    system: [
      {
        id: 'rcc',
        name: 'RCC',
        description: 'Reset and Clock Control',
        icon: 'Settings',
        status: 'configured',
        instances: { active: 1, total: 1 },
        pins: { used: 0, available: 144 },
        completeness: 100,
        lastModified: '2025-07-30T13:00:00Z'
      },
      {
        id: 'pwr',
        name: 'Power Management',
        description: 'Power Control Unit',
        icon: 'Battery',
        status: 'configured',
        instances: { active: 1, total: 1 },
        pins: { used: 0, available: 144 },
        completeness: 90,
        lastModified: '2025-07-30T12:30:00Z'
      },
      {
        id: 'nvic',
        name: 'NVIC',
        description: 'Nested Vector Interrupt Controller',
        icon: 'Zap',
        status: 'partial',
        instances: { active: 5, total: 82 },
        pins: { used: 0, available: 144 },
        completeness: 60,
        lastModified: '2025-07-29T17:15:00Z'
      },
      {
        id: 'dma1',
        name: 'DMA1',
        description: 'Direct Memory Access Controller',
        icon: 'ArrowRightLeft',
        status: 'configured',
        instances: { active: 3, total: 8 },
        pins: { used: 0, available: 144 },
        completeness: 85,
        lastModified: '2025-07-30T09:45:00Z'
      },
      {
        id: 'dma2',
        name: 'DMA2',
        description: 'Direct Memory Access Controller',
        icon: 'ArrowRightLeft',
        status: 'not_configured',
        instances: { active: 0, total: 8 },
        pins: { used: 0, available: 144 },
        completeness: 0,
        lastModified: null
      },
      {
        id: 'rtc',
        name: 'RTC',
        description: 'Real Time Clock',
        icon: 'Calendar',
        status: 'partial',
        instances: { active: 1, total: 1 },
        pins: { used: 0, available: 144 },
        completeness: 30,
        lastModified: '2025-07-27T12:00:00Z'
      }
    ]
  };

  const peripheralData = getBoardSpecificPeripherals();

  useEffect(() => {
    const currentPeripherals = peripheralData[activeCategory] || [];
    if (searchQuery) {
      const filtered = currentPeripherals.filter(peripheral =>
        peripheral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        peripheral.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPeripherals(filtered);
    } else {
      setFilteredPeripherals(currentPeripherals);
    }
  }, [activeCategory, searchQuery, selectedBoard]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (result) => {
    // Find the category that contains this peripheral
    for (const [category, peripherals] of Object.entries(peripheralData)) {
      if (peripherals.some(p => p.name === result.name)) {
        setActiveCategory(category);
        break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className={`transition-all duration-300 ${
        isPreviewCollapsed ? 'mr-0' : 'mr-96'
      }`}>
        <main className="pt-16">
          {/* Top Bar with Search and Actions */}
          <div className="bg-card border-b border-border sticky top-16 z-30">
            <div className="px-4 lg:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-heading-lg font-heading">
                        {selectedBoard ? `${selectedBoard.name} Configuration Dashboard` : 'Configuration Dashboard'}
                      </h1>
                      {selectedBoard && (
                        <Link to="/ide">
                          <Button variant="outline" size="sm" iconName="ArrowLeftRight">
                            Change Board
                          </Button>
                        </Link>
                      )}
                    </div>
                    <p className="text-body-sm text-muted-foreground">
                      {selectedBoard 
                        ? `Configure and manage ${selectedBoard.name} peripherals`
                        : 'Configure and manage microcontroller peripherals'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <GlobalSearchBar 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                  
                  <div className="hidden lg:flex items-center space-x-2">
                    <Link to="/configuration-validation-conflicts">
                      <Button variant="outline" size="sm" iconName="AlertTriangle">
                        Validate
                      </Button>
                    </Link>
                    <Link to="/configuration-import-export-manager">
                      <Button variant="outline" size="sm" iconName="Upload">
                        Import
                      </Button>
                    </Link>
                    <Link to="/configuration-import-export-manager">
                      <Button variant="default" size="sm" iconName="Download">
                        Export
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <PeripheralCategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Main Content */}
          <div className="px-4 lg:px-6 py-6 space-y-6">
            {/* Quick Stats Overview */}
            <QuickStatsOverview />

            {/* Peripheral Cards Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-heading-md font-heading capitalize">
                  {activeCategory} Peripherals
                </h2>
                <div className="flex items-center space-x-2 text-body-sm text-muted-foreground">
                  <span>{filteredPeripherals.length} peripherals</span>
                  {searchQuery && (
                    <>
                      <span>•</span>
                      <span>filtered by "{searchQuery}"</span>
                    </>
                  )}
                </div>
              </div>

              {filteredPeripherals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPeripherals.map((peripheral) => (
                    <PeripheralCard key={peripheral.id} peripheral={peripheral} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-heading-sm font-heading mb-2">No peripherals found</h3>
                  <p className="text-body-sm text-muted-foreground mb-4">
                    {searchQuery 
                      ? `No peripherals match "${searchQuery}" in the ${activeCategory} category.`
                      : `No peripherals available in the ${activeCategory} category.`
                    }
                  </p>
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="X"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-heading-sm font-heading mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/pin-assignment-visualizer">
                  <Button variant="outline" size="sm" iconName="Map" fullWidth>
                    Pin Visualizer
                  </Button>
                </Link>
                <Link to="/configuration-validation-conflicts">
                  <Button variant="outline" size="sm" iconName="CheckSquare" fullWidth>
                    Validate Config
                  </Button>
                </Link>
                <Link to="/configuration-import-export-manager">
                  <Button variant="outline" size="sm" iconName="FileText" fullWidth>
                    Manage Files
                  </Button>
                </Link>
                <Link to="/peripheral-configuration-editor">
                  <Button variant="default" size="sm" iconName="Settings" fullWidth>
                    New Config
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Configuration Preview Panel */}
      <ConfigurationPreviewPanel 
        isCollapsed={isPreviewCollapsed}
        onToggle={() => setIsPreviewCollapsed(!isPreviewCollapsed)}
      />

      {/* Floating Action Menu (Mobile) */}
      <FloatingActionMenu />
    </div>
  );
};

export default PeripheralConfigurationDashboard;