import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module DocumentationSection
 */

/**
 * A component that displays technical documentation, organized into categories.
 * It allows users to switch between different documentation sections like API Reference,
 * Hardware Specifications, and Integration Guides using a tabbed interface.
 *
 * @returns {JSX.Element} The rendered documentation section component.
 */
const DocumentationSection = () => {
  const [activeCategory, setActiveCategory] = useState('api-reference');

  const documentationCategories = [
    {
      id: 'api-reference',
      name: 'API Reference',
      icon: 'Code',
      description: 'Complete API documentation with examples',
      items: [
        {
          title: 'Authentication & Authorization',
          description: 'Secure access to MicroCloudLab APIs',
          endpoint: '/api/auth',
          methods: ['POST', 'GET'],
          lastUpdated: '2024-01-15'
        },
        {
          title: 'Microcontroller Management',
          description: 'Control and configure remote microcontrollers',
          endpoint: '/api/devices',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          lastUpdated: '2024-01-12'
        },
        {
          title: 'Code Compilation & Deployment',
          description: 'Compile and deploy code to target devices',
          endpoint: '/api/compile',
          methods: ['POST'],
          lastUpdated: '2024-01-10'
        },
        {
          title: 'Real-time Debugging',
          description: 'Debug applications running on remote hardware',
          endpoint: '/api/debug',
          methods: ['GET', 'POST', 'WebSocket'],
          lastUpdated: '2024-01-08'
        }
      ]
    },
    {
      id: 'hardware-specs',
      name: 'Hardware Specifications',
      icon: 'Cpu',
      description: 'Supported microcontrollers and their capabilities',
      items: [
        {
          title: 'Arduino Uno R3',
          description: 'ATmega328P-based development board',
          specs: 'Flash: 32KB, SRAM: 2KB, EEPROM: 1KB',
          pins: '14 Digital I/O, 6 Analog inputs',
          lastUpdated: '2024-01-14'
        },
        {
          title: 'ESP32 DevKit V1',
          description: 'WiFi & Bluetooth enabled microcontroller',
          specs: 'Flash: 4MB, SRAM: 520KB, Dual-core',
          pins: '30 GPIO pins, 18 ADC channels',
          lastUpdated: '2024-01-13'
        },
        {
          title: 'Raspberry Pi Pico',
          description: 'RP2040 microcontroller board',
          specs: 'Flash: 2MB, SRAM: 264KB, Dual-core ARM',
          pins: '26 GPIO pins, 3 ADC inputs',
          lastUpdated: '2024-01-11'
        },
        {
          title: 'STM32 Nucleo-64',
          description: 'ARM Cortex-M4 development board',
          specs: 'Flash: 512KB, SRAM: 128KB, FPU',
          pins: '64 pins, multiple communication interfaces',
          lastUpdated: '2024-01-09'
        }
      ]
    },
    {
      id: 'integration-guides',
      name: 'Integration Guides',
      icon: 'Puzzle',
      description: 'Framework integrations and third-party tools',
      items: [
        {
          title: 'Arduino IDE Integration',
          description: 'Connect Arduino IDE to MicroCloudLab platform',
          framework: 'Arduino IDE',
          difficulty: 'Beginner',
          lastUpdated: '2024-01-16'
        },
        {
          title: 'PlatformIO Integration',
          description: 'Use PlatformIO with cloud-based hardware',
          framework: 'PlatformIO',
          difficulty: 'Intermediate',
          lastUpdated: '2024-01-14'
        },
        {
          title: 'FreeRTOS Development',
          description: 'Real-time operating system development guide',
          framework: 'FreeRTOS',
          difficulty: 'Advanced',
          lastUpdated: '2024-01-12'
        },
        {
          title: 'MicroPython Setup',
          description: 'Python programming for microcontrollers',
          framework: 'MicroPython',
          difficulty: 'Beginner',
          lastUpdated: '2024-01-10'
        }
      ]
    },
    {
      id: 'advanced-topics',
      name: 'Advanced Topics',
      icon: 'Zap',
      description: 'Performance optimization and advanced techniques',
      items: [
        {
          title: 'Real-time Debugging Techniques',
          description: 'Advanced debugging strategies for embedded systems',
          topics: ['GDB Integration', 'Hardware Breakpoints', 'Memory Analysis'],
          lastUpdated: '2024-01-15'
        },
        {
          title: 'Performance Optimization',
          description: 'Optimize code for memory and processing constraints',
          topics: ['Memory Management', 'Power Optimization', 'Code Profiling'],
          lastUpdated: '2024-01-13'
        },
        {
          title: 'Collaborative Development',
          description: 'Team workflows for embedded development',
          topics: ['Version Control', 'Code Review', 'Continuous Integration'],
          lastUpdated: '2024-01-11'
        },
        {
          title: 'Security Best Practices',
          description: 'Secure coding for IoT and embedded devices',
          topics: ['Encryption', 'Secure Boot', 'OTA Updates'],
          lastUpdated: '2024-01-09'
        }
      ]
    }
  ];

  const activeData = documentationCategories.find(cat => cat.id === activeCategory);

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-success text-success-foreground';
      case 'POST': return 'bg-primary text-primary-foreground';
      case 'PUT': return 'bg-warning text-warning-foreground';
      case 'DELETE': return 'bg-error text-error-foreground';
      case 'WebSocket': return 'bg-accent text-accent-foreground';
      default: return 'bg-surface text-text-secondary';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success-50';
      case 'Intermediate': return 'text-warning bg-warning-50';
      case 'Advanced': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-surface';
    }
  };

  return (
    <div className="bg-background">
      {/* Category Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {documentationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-smooth ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              }`}
            >
              <Icon name={category.icon} size={18} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        <p className="text-text-secondary mt-3">{activeData?.description}</p>
      </div>

      {/* Documentation Content */}
      <div className="grid gap-6">
        {activeData?.items.map((item, index) => (
          <div key={index} className="bg-surface/50 border border-border rounded-xl p-6 hover:shadow-brand transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-xs text-text-muted">Updated {item.lastUpdated}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="text-primary hover:text-primary-700"
                >
                  View
                </Button>
              </div>
            </div>

            {/* API Reference specific content */}
            {activeCategory === 'api-reference' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-secondary">Endpoint:</span>
                  <code className="px-2 py-1 bg-background text-primary font-code text-sm rounded border">
                    {item.endpoint}
                  </code>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-secondary">Methods:</span>
                  <div className="flex space-x-2">
                    {item.methods?.map((method, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(method)}`}
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Hardware Specs specific content */}
            {activeCategory === 'hardware-specs' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-text-secondary">Specifications:</span>
                    <p className="text-sm text-text-primary mt-1">{item.specs}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text-secondary">I/O Pins:</span>
                    <p className="text-sm text-text-primary mt-1">{item.pins}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Integration Guides specific content */}
            {activeCategory === 'integration-guides' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-text-secondary">Framework:</span>
                    <span className="text-sm font-medium text-primary">{item.framework}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>
              </div>
            )}

            {/* Advanced Topics specific content */}
            {activeCategory === 'advanced-topics' && (
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-text-secondary mb-2 block">Covered Topics:</span>
                  <div className="flex flex-wrap gap-2">
                    {item.topics?.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded border border-primary/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentationSection;