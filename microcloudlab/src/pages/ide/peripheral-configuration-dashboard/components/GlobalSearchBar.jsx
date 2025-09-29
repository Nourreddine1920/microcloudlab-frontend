import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../../components/AppIcon';
import Input from '../../../../components/ui/Input';

/**
 * @module GlobalSearchBar
 */

/**
 * A global search bar component with an expandable UI and a dropdown for search results.
 * It allows users to search for peripherals and filters them based on mock data.
 *
 * @param {object} props - The properties for the component.
 * @param {Function} [props.onSearch] - A callback function to be executed when the search query changes.
 * @param {Function} [props.onFilterChange] - A callback function to be executed when a search result is selected.
 * @returns {JSX.Element} The rendered global search bar component.
 */
const GlobalSearchBar = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const mockSearchResults = [
    {
      id: 1,
      name: 'UART1',
      category: 'Communication',
      description: 'Universal Asynchronous Receiver Transmitter',
      status: 'configured',
      pins: ['PA9', 'PA10']
    },
    {
      id: 2,
      name: 'SPI1',
      category: 'Communication',
      description: 'Serial Peripheral Interface',
      status: 'partial',
      pins: ['PA5', 'PA6', 'PA7']
    },
    {
      id: 3,
      name: 'GPIO Port A',
      category: 'GPIO',
      description: 'General Purpose Input/Output',
      status: 'configured',
      pins: ['PA0', 'PA1', 'PA2']
    },
    {
      id: 4,
      name: 'Timer 1',
      category: 'Timers',
      description: 'Advanced Control Timer',
      status: 'not_configured',
      pins: []
    },
    {
      id: 5,
      name: 'ADC1',
      category: 'Analog',
      description: 'Analog to Digital Converter',
      status: 'conflict',
      pins: ['PA0', 'PA1']
    }
  ];

  const filteredResults = mockSearchResults.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
    onSearch?.(value);
  };

  const handleResultClick = (result) => {
    setSearchQuery(result.name);
    setShowResults(false);
    onFilterChange?.(result);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    onSearch?.('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'configured': return 'text-success';
      case 'partial': return 'text-warning';
      case 'conflict': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'configured': return 'CheckCircle';
      case 'partial': return 'AlertTriangle';
      case 'conflict': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className={`relative transition-all duration-200 ${
        isExpanded ? 'w-80' : 'w-64'
      }`}>
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search peripherals..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsExpanded(true)}
            className="w-full pl-10 pr-10 py-2 bg-muted border border-border rounded-md text-body-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-micro"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-micro"
            >
              <Icon name="X" size={14} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && filteredResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal z-50 max-h-80 overflow-y-auto animate-fade-in">
            <div className="p-2">
              <div className="text-caption text-muted-foreground px-2 py-1 mb-1">
                {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
              </div>
              
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-micro text-left"
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded ${
                    result.status === 'configured' ? 'bg-success/10 text-success' :
                    result.status === 'partial' ? 'bg-warning/10 text-warning' :
                    result.status === 'conflict'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={getStatusIcon(result.status)} size={14} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-body-sm font-medium">{result.name}</span>
                      <span className="text-caption text-muted-foreground">
                        {result.category}
                      </span>
                    </div>
                    <p className="text-caption text-muted-foreground truncate">
                      {result.description}
                    </p>
                    {result.pins.length > 0 && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Zap" size={10} className="text-muted-foreground" />
                        <span className="text-caption text-muted-foreground">
                          {result.pins.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {showResults && filteredResults.length === 0 && searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal z-50 animate-fade-in">
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-body-sm text-muted-foreground">
                No peripherals found for "{searchQuery}"
              </p>
              <p className="text-caption text-muted-foreground mt-1">
                Try searching for UART, SPI, GPIO, Timer, or ADC
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchBar;