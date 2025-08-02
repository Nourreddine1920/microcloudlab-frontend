import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PeripheralCategoryTabs from './components/PeripheralCategoryTabs';
import PeripheralCard from './components/PeripheralCard';
import ConfigurationPreviewPanel from './components/ConfigurationPreviewPanel';
import GlobalSearchBar from './components/GlobalSearchBar';
import QuickStatsOverview from './components/QuickStatsOverview';
import FloatingActionMenu from './components/FloatingActionMenu';

const PeripheralConfigurationDashboard = () => {
  const [searchParams] = useSearchParams();
  const selectedBoard = searchParams.get('board');
  
  const [activeCategory, setActiveCategory] = useState('communication');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const [filteredPeripherals, setFilteredPeripherals] = useState([]);

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

  const peripheralData = {
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
  }, [activeCategory, searchQuery]);

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
                    <h1 className="text-heading-lg font-heading">
                      {selectedBoard ? `${getBoardDisplayName(selectedBoard)} Configuration Dashboard` : 'STM32 Configuration Dashboard'}
                    </h1>
                    <p className="text-body-sm text-muted-foreground">
                      {selectedBoard 
                        ? `Configure and manage ${getBoardDisplayName(selectedBoard)} peripherals`
                        : 'Configure and manage STM32F407VGT6 peripherals'
                      }
                    </p>
                    {selectedBoard && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
                          <Icon name="Cpu" size={12} />
                          <span>Selected Board: {getBoardDisplayName(selectedBoard)}</span>
                        </div>
                      </div>
                    )}
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