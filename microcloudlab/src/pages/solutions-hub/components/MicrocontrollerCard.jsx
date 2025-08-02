import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MicrocontrollerCard = ({ microcontroller }) => {
  const {
    name,
    type,
    description,
    specifications,
    is_available,
    current_user
  } = microcontroller || {};

  // Default image based on microcontroller type
  const getDefaultImage = (type) => {
    const typeImages = {
      'ESP32': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      'ESP8266': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      'ARDUINO_UNO': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      'ARDUINO_NANO': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      'RASPBERRY_PI_PICO': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop',
      'STM32': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      'PIC': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      'AVR': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    };
    return typeImages[type] || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop';
  };

  const displayImage = getDefaultImage(type);

  // Parse specifications if it's a JSON string
  const parsedSpecs = React.useMemo(() => {
    if (!specifications) return {};
    if (typeof specifications === 'object') return specifications;
    try {
      return typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
    } catch (error) {
      console.warn('Failed to parse specifications:', error);
      return {};
    }
  }, [specifications]);

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={displayImage} 
          alt={`${name} microcontroller`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            is_available 
              ? 'bg-success/20 text-success border border-success/30' 
              : 'bg-warning/20 text-warning border border-warning/30'
          }`}>
            {is_available ? 'Available' : 'In Use'}
          </span>
        </div>

        {/* Microcontroller Info */}
        <div className="absolute bottom-4 left-4">
          <div className="text-white">
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-white/80 text-sm">{type}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-headline text-text-primary mb-4">{name}</h3>
        
        {/* Description */}
        <p className="text-sm text-text-secondary mb-6 line-clamp-3">
          {description || 'No description available'}
        </p>

        {/* Specifications */}
        {parsedSpecs && Object.keys(parsedSpecs).length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background rounded-lg">
            {Object.entries(parsedSpecs).slice(0, 4).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-semibold text-primary">{value}</div>
                <div className="text-xs text-text-secondary capitalize">{key.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
        )}

        {/* Type Badge */}
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Cpu" size={16} className="text-primary" />
          <span className="text-sm font-medium text-text-primary">{type}</span>
        </div>

        {/* Current User */}
        {current_user && (
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="User" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              Currently used by {current_user.username}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-text-secondary">Microcontroller</span>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors">
              <span>View Details</span>
              <Icon name="ExternalLink" size={14} />
            </button>
            {is_available && (
              <button className="flex items-center space-x-1 text-sm text-success hover:text-success/80 transition-colors">
                <span>Reserve</span>
                <Icon name="Check" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicrocontrollerCard; 