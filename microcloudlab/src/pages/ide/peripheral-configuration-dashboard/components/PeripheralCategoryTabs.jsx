import React from 'react';
import Icon from '../../../../components/AppIcon';

/**
 * @module PeripheralCategoryTabs
 */

/**
 * A component that displays a set of tabs for filtering peripherals by category.
 * Each tab shows the category name, an icon, a count of peripherals, and a description.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.activeCategory - The ID of the currently active category tab.
 * @param {Function} props.onCategoryChange - A callback function to be executed when a category tab is clicked. It receives the category ID as an argument.
 * @returns {JSX.Element} The rendered peripheral category tabs component.
 */
const PeripheralCategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'communication',
      name: 'Communication',
      icon: 'Radio',
      count: 8,
      description: 'UART, SPI, I2C, CAN protocols'
    },
    {
      id: 'gpio',
      name: 'GPIO',
      icon: 'Zap',
      count: 16,
      description: 'Digital I/O pins and ports'
    },
    {
      id: 'timers',
      name: 'Timers',
      icon: 'Clock',
      count: 12,
      description: 'PWM, counters, watchdog'
    },
    {
      id: 'analog',
      name: 'Analog',
      icon: 'Activity',
      count: 6,
      description: 'ADC, DAC, comparators'
    },
    {
      id: 'system',
      name: 'System',
      icon: 'Settings',
      count: 10,
      description: 'Clock, power, interrupts'
    }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-3 px-4 py-4 border-b-2 transition-micro whitespace-nowrap ${
                activeCategory === category.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={category.icon} size={18} />
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <span className="text-body-sm font-medium">{category.name}</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-muted text-muted-foreground rounded-full">
                    {category.count}
                  </span>
                </div>
                <span className="text-caption text-muted-foreground hidden sm:block">
                  {category.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeripheralCategoryTabs;