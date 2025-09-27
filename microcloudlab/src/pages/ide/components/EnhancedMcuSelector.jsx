import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useMcu } from '../context/McuContext';

const EnhancedMcuSelector = ({ onMcuSelect, currentMcu, showBackendMcus = true }) => {
  const { MCU_SPECIFICATIONS } = useMcu();
  const [backendMcus, setBackendMcus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Fetch microcontrollers from backend
  useEffect(() => {
    if (showBackendMcus) {
      fetchBackendMcus();
    }
  }, [showBackendMcus]);

  const fetchBackendMcus = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/microcontrollers/');
      if (response.ok) {
        const data = await response.json();
        setBackendMcus(data);
      }
    } catch (error) {
      console.error('Failed to fetch microcontrollers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Combine frontend and backend MCUs
  const allMcus = [
    ...Object.values(MCU_SPECIFICATIONS).map(mcu => ({ ...mcu, source: 'frontend' })),
    ...backendMcus.map(mcu => ({ ...mcu, source: 'backend' }))
  ];

  // Filter MCUs based on search and filters
  const filteredMcus = allMcus.filter(mcu => {
    const matchesSearch = mcu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mcu.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mcu.type?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'communication' && mcu.peripherals?.some(p => ['UART', 'SPI', 'I2C', 'WiFi', 'Bluetooth'].includes(p))) ||
                           (selectedCategory === 'sensors' && mcu.peripherals?.some(p => ['ADC', 'DAC', 'GPIO'].includes(p))) ||
                           (selectedCategory === 'control' && mcu.peripherals?.some(p => ['PWM', 'GPIO', 'Timers'].includes(p)));
    
    const matchesDifficulty = selectedDifficulty === 'all' || mcu.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = [
    { id: 'all', name: 'All', icon: 'Grid' },
    { id: 'communication', name: 'Communication', icon: 'Wifi' },
    { id: 'sensors', name: 'Sensors', icon: 'Activity' },
    { id: 'control', name: 'Control', icon: 'Settings' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const handleMcuSelect = async (mcu) => {
    setLoading(true);
    try {
      await onMcuSelect(mcu);
    } finally {
      setLoading(false);
    }
  };

  const getMcuImage = (mcu) => {
    if (mcu.image) return mcu.image;
    
    const typeImages = {
      'ESP32': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      'ESP8266': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      'ARDUINO_UNO': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
      'ARDUINO_NANO': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop',
      'RASPBERRY_PI_PICO': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop',
      'STM32': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      'PIC': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      'AVR': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
    };
    return typeImages[mcu.type] || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop';
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search microcontrollers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Category and Difficulty Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary">Category:</span>
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={category.icon} size={14} />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-secondary">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-background border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MCU Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredMcus.map((mcu) => (
            <div
              key={`${mcu.source}-${mcu.id}`}
              className={`relative bg-card border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                currentMcu?.id === mcu.id
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary/30'
              }`}
              onClick={() => handleMcuSelect(mcu)}
            >
              {/* Selection Indicator */}
              {currentMcu?.id === mcu.id && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} />
                  </div>
                </div>
              )}

              {/* Source Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  mcu.source === 'backend' 
                    ? 'bg-accent/20 text-accent border border-accent/30' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {mcu.source === 'backend' ? 'Backend' : 'Built-in'}
                </span>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={getMcuImage(mcu)}
                    alt={mcu.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-text-primary truncate">
                      {mcu.name}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      mcu.is_available === false 
                        ? 'bg-warning/20 text-warning border border-warning/30'
                        : 'bg-success/20 text-success border border-success/30'
                    }`}>
                      {mcu.is_available === false ? 'In Use' : 'Available'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {mcu.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-text-secondary">
                      <span className="font-medium">Type:</span> {mcu.type || 'Unknown'}
                    </div>
                    
                    {mcu.specs && (
                      <div className="text-xs text-text-secondary">
                        <span className="font-medium">Specs:</span> {mcu.specs}
                      </div>
                    )}
                    
                    {mcu.difficulty && (
                      <div className="text-xs text-text-secondary">
                        <span className="font-medium">Difficulty:</span> {mcu.difficulty}
                      </div>
                    )}
                    
                    {mcu.peripherals && (
                      <div className="flex flex-wrap gap-1">
                        {mcu.peripherals.slice(0, 4).map((peripheral, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-surface text-text-secondary px-2 py-1 rounded"
                          >
                            {peripheral}
                          </span>
                        ))}
                        {mcu.peripherals.length > 4 && (
                          <span className="text-xs bg-surface text-text-secondary px-2 py-1 rounded">
                            +{mcu.peripherals.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                <Button
                  variant="primary"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-primary/90 hover:bg-primary"
                >
                  Select MCU
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* No Results */}
      {!loading && filteredMcus.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No microcontrollers found</h3>
          <p className="text-text-secondary">
            Try adjusting your search criteria or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnhancedMcuSelector;
