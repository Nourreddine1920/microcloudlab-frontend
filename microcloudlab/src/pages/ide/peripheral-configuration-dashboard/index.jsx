import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PeripheralCategoryTabs from './components/PeripheralCategoryTabs';
import PeripheralCard from './components/PeripheralCard';
import ConfigurationPreviewPanel from './components/ConfigurationPreviewPanel';
import GlobalSearchBar from './components/GlobalSearchBar';
import QuickStatsOverview from './components/QuickStatsOverview';
import FloatingActionMenu from './components/FloatingActionMenu';
import { useMcu } from '../context/McuContext';

/**
 * @module PeripheralConfigurationDashboard
 */

/**
 * The main dashboard for viewing and managing peripheral configurations for a selected microcontroller.
 * It dynamically displays peripherals grouped by category and allows users to search and filter them.
 * The dashboard integrates various components to provide a comprehensive overview, including
 * quick stats, category tabs, and a configuration preview panel.
 *
 * @returns {JSX.Element} The rendered peripheral configuration dashboard page.
 */
const PeripheralConfigurationDashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { 
    selectedMcu, 
    selectMcu, 
    getAvailablePeripheralInstances, 
    getPeripheralStatus,
    getAllPeripheralStatuses,
    getPeripheralConfiguration
  } = useMcu();
  
  // Get board from URL params and set it in MCU context if not already selected
  const boardParam = searchParams.get('board');
  useEffect(() => {
    if (boardParam && (!selectedMcu || selectedMcu.id !== boardParam)) {
      selectMcu(boardParam);
    }
  }, [boardParam, selectedMcu, selectMcu]);
  
  const [activeCategory, setActiveCategory] = useState('communication');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const [filteredPeripherals, setFilteredPeripherals] = useState([]);

  // Generate dynamic peripheral data based on selected MCU and current status
  const getPeripheralDataForMcu = () => {
    if (!selectedMcu) return { communication: [], timing: [], analog: [], power: [], connectivity: [] };
    
    const peripheralCategories = {
      communication: [],
      timing: [],
      analog: [],
      power: [],
      connectivity: []
    };

    const allStatuses = getAllPeripheralStatuses();

    // Process MCU peripherals with dynamic status
    Object.keys(selectedMcu.supportedPeripherals).forEach(peripheralType => {
      const instances = getAvailablePeripheralInstances(peripheralType);
      const category = getPeripheralCategory(peripheralType);
      
      instances.forEach(instance => {
        const statusKey = `${peripheralType}_${instance}`;
        const status = allStatuses[statusKey] || { status: 'available', completeness: 0, lastModified: null };
        const configuration = getPeripheralConfiguration(peripheralType, instance);
        
        peripheralCategories[category].push({
          id: `${peripheralType.toLowerCase()}_${instance.toLowerCase()}`,
          name: instance,
          description: getPeripheralDescription(peripheralType),
          icon: getPeripheralIcon(peripheralType),
          status: status.status,
          instances: { active: status.status === 'configured' ? 1 : 0, total: instances.length },
          pins: { 
            used: configuration?.pins ? Object.keys(configuration.pins).length : 0, 
            available: selectedMcu.pinout ? Object.values(selectedMcu.pinout).flat().length : 0 
          },
          completeness: status.completeness,
          lastModified: status.lastModified,
          peripheralType: peripheralType,
          configuration: configuration
        });
      });
    });

    return peripheralCategories;
  };

  const getPeripheralCategory = (type) => {
    const categoryMap = {
      'UART': 'communication',
      'SPI': 'communication', 
      'I2C': 'communication',
      'WiFi': 'connectivity',
      'Bluetooth': 'connectivity',
      'PWM': 'timing',
      'Timer': 'timing',
      'ADC': 'analog',
      'DAC': 'analog',
      'GPIO': 'power'
    };
    return categoryMap[type] || 'power';
  };

  const getPeripheralDescription = (type) => {
    const descriptions = {
      'UART': 'Universal Asynchronous Receiver Transmitter',
      'SPI': 'Serial Peripheral Interface',
      'I2C': 'Inter-Integrated Circuit',
      'WiFi': 'Wireless Local Area Network',
      'Bluetooth': 'Short-range wireless communication',
      'PWM': 'Pulse Width Modulation',
      'Timer': 'Hardware Timer',
      'ADC': 'Analog to Digital Converter',
      'DAC': 'Digital to Analog Converter',
      'GPIO': 'General Purpose Input/Output'
    };
    return descriptions[type] || 'General peripheral';
  };

  const getPeripheralIcon = (type) => {
    const iconMap = {
      'UART': 'Radio',
      'SPI': 'Zap',
      'I2C': 'Link',
      'WiFi': 'Wifi',
      'Bluetooth': 'Bluetooth',
      'PWM': 'Activity',
      'Timer': 'Clock',
      'ADC': 'TrendingUp',
      'DAC': 'TrendingDown',
      'GPIO': 'Cpu'
    };
    return iconMap[type] || 'Settings';
  };

  // Get dynamic peripheral data
  const peripheralData = getPeripheralDataForMcu();

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
  }, [activeCategory, searchQuery, selectedMcu, peripheralData]);

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

  // Calculate overall statistics
  const getOverallStats = () => {
    const allPeripherals = Object.values(peripheralData).flat();
    const configured = allPeripherals.filter(p => p.status === 'configured').length;
    const total = allPeripherals.length;
    const avgCompleteness = allPeripherals.length > 0 
      ? Math.round(allPeripherals.reduce((sum, p) => sum + p.completeness, 0) / allPeripherals.length)
      : 0;

    return {
      total,
      configured,
      available: total - configured,
      avgCompleteness
    };
  };

  const stats = getOverallStats();

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
                      {selectedMcu ? `${selectedMcu.name} Configuration Dashboard` : 'MCU Configuration Dashboard'}
                    </h1>
                    <p className="text-body-sm text-muted-foreground">
                      {selectedMcu 
                        ? `Configure and manage ${selectedMcu.name} peripherals`
                        : 'Select an MCU to configure peripherals'
                      }
                    </p>
                    {selectedMcu && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
                          <Icon name="Cpu" size={12} />
                          <span>Selected MCU: {selectedMcu.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          <Icon name="Zap" size={12} />
                          <span>{stats.configured}/{stats.total} Configured</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-medium">
                          <Icon name="TrendingUp" size={12} />
                          <span>{stats.avgCompleteness}% Complete</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Navigation Buttons */}
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
                      iconName="CheckCircle"
                      onClick={() => navigate('/ide/configuration-validation-conflicts')}
                    >
                      Validate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Cpu"
                      onClick={() => navigate('/ide/pin-assignment-visualizer')}
                    >
                      Pin Mapping
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
                  
                  <GlobalSearchBar 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                  
                  <div className="hidden lg:flex items-center space-x-2">
                    <Link to="/ide/configuration-validation-conflicts">
                      <Button variant="outline" size="sm" iconName="AlertTriangle">
                        Validate
                      </Button>
                    </Link>
                    <Link to="/ide/configuration-import-export-manager">
                      <Button variant="outline" size="sm" iconName="Upload">
                        Import
                      </Button>
                    </Link>
                    <Link to="/ide/configuration-import-export-manager">
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
            <QuickStatsOverview stats={stats} />

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
                <Link to="/ide/pin-assignment-visualizer">
                  <Button variant="outline" size="sm" iconName="Map" fullWidth>
                    Pin Visualizer
                  </Button>
                </Link>
                <Link to="/ide/configuration-validation-conflicts">
                  <Button variant="outline" size="sm" iconName="CheckSquare" fullWidth>
                    Validate Config
                  </Button>
                </Link>
                <Link to="/ide/configuration-import-export-manager">
                  <Button variant="outline" size="sm" iconName="FileText" fullWidth>
                    Manage Files
                  </Button>
                </Link>
                <Link to="/ide/peripheral-configuration-editor">
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