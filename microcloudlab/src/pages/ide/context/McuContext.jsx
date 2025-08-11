import React, { createContext, useContext, useState, useEffect } from 'react';

const McuContext = createContext(undefined);

// MCU specifications and configurations
export const MCU_SPECIFICATIONS = {
  'arduino-uno': {
    id: 'arduino-uno',
    name: 'Arduino Uno',
    description: 'ATmega328P microcontroller, perfect for beginners',
    specs: '16MHz • 32KB Flash • 2KB SRAM',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop',
    status: 'available',
    difficulty: 'Beginner',
    peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM'],
    price: 'Free',
    pinout: {
      digital: Array.from({length: 14}, (_, i) => ({
        pin: i,
        name: `D${i}`,
        type: 'Digital',
        functions: i < 2 ? ['GPIO', 'UART'] : ['GPIO', 'PWM']
      })),
      analog: Array.from({length: 6}, (_, i) => ({
        pin: i + 14,
        name: `A${i}`,
        type: 'Analog',
        functions: ['GPIO', 'ADC']
      }))
    },
    supportedPeripherals: {
      UART: {
        instances: ['UART0'],
        pins: {
          UART0: { tx: 'D1', rx: 'D0' }
        }
      },
      SPI: {
        instances: ['SPI0'],
        pins: {
          SPI0: { mosi: 'D11', miso: 'D12', sck: 'D13', ss: 'D10' }
        }
      },
      I2C: {
        instances: ['I2C0'],
        pins: {
          I2C0: { sda: 'A4', scl: 'A5' }
        }
      },
      PWM: {
        instances: ['PWM0', 'PWM1', 'PWM2', 'PWM3', 'PWM4', 'PWM5'],
        pins: {
          PWM0: { output: 'D3' },
          PWM1: { output: 'D5' },
          PWM2: { output: 'D6' },
          PWM3: { output: 'D9' },
          PWM4: { output: 'D10' },
          PWM5: { output: 'D11' }
        }
      }
    }
  },
  'esp32-devkit': {
    id: 'esp32-devkit',
    name: 'ESP32 DevKit',
    description: 'Dual-core WiFi/BT microcontroller with rich peripherals',
    specs: '240MHz • 4MB Flash • 520KB SRAM',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop',
    status: 'available',
    difficulty: 'Intermediate',
    peripherals: ['WiFi', 'Bluetooth', 'GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'DAC', 'PWM'],
    price: 'Free',
    pinout: {
      gpio: Array.from({length: 40}, (_, i) => ({
        pin: i,
        name: `GPIO${i}`,
        type: 'GPIO',
        functions: ['GPIO', 'ADC', 'PWM', 'Touch']
      }))
    },
    supportedPeripherals: {
      UART: {
        instances: ['UART0', 'UART1', 'UART2'],
        pins: {
          UART0: { tx: 'GPIO1', rx: 'GPIO3' },
          UART1: { tx: 'GPIO10', rx: 'GPIO9' },
          UART2: { tx: 'GPIO17', rx: 'GPIO16' }
        }
      },
      SPI: {
        instances: ['SPI2', 'SPI3'],
        pins: {
          SPI2: { mosi: 'GPIO23', miso: 'GPIO19', sck: 'GPIO18', ss: 'GPIO5' },
          SPI3: { mosi: 'GPIO13', miso: 'GPIO12', sck: 'GPIO14', ss: 'GPIO15' }
        }
      },
      I2C: {
        instances: ['I2C0', 'I2C1'],
        pins: {
          I2C0: { sda: 'GPIO21', scl: 'GPIO22' },
          I2C1: { sda: 'GPIO25', scl: 'GPIO26' }
        }
      },
      PWM: {
        instances: ['PWM0', 'PWM1', 'PWM2', 'PWM3', 'PWM4', 'PWM5', 'PWM6', 'PWM7'],
        pins: {
          PWM0: { output: 'GPIO2' },
          PWM1: { output: 'GPIO4' },
          PWM2: { output: 'GPIO5' },
          PWM3: { output: 'GPIO12' },
          PWM4: { output: 'GPIO13' },
          PWM5: { output: 'GPIO14' },
          PWM6: { output: 'GPIO15' },
          PWM7: { output: 'GPIO16' }
        }
      }
    }
  },
  'stm32f103-blue-pill': {
    id: 'stm32f103-blue-pill',
    name: 'STM32F103 Blue Pill',
    description: 'ARM Cortex-M3 microcontroller with extensive peripherals',
    specs: '72MHz • 128KB Flash • 20KB SRAM',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
    status: 'available',
    difficulty: 'Advanced',
    peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'DAC', 'PWM', 'CAN', 'USB'],
    price: 'Free',
    pinout: {
      gpio: Array.from({length: 80}, (_, i) => ({
        pin: i,
        name: `PA${i}`,
        type: 'GPIO',
        functions: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM', 'CAN']
      }))
    },
    supportedPeripherals: {
      UART: {
        instances: ['UART1', 'UART2', 'UART3'],
        pins: {
          UART1: { tx: 'PA9', rx: 'PA10' },
          UART2: { tx: 'PA2', rx: 'PA3' },
          UART3: { tx: 'PB10', rx: 'PB11' }
        }
      },
      SPI: {
        instances: ['SPI1', 'SPI2'],
        pins: {
          SPI1: { mosi: 'PA7', miso: 'PA6', sck: 'PA5', ss: 'PA4' },
          SPI2: { mosi: 'PB15', miso: 'PB14', sck: 'PB13', ss: 'PB12' }
        }
      },
      I2C: {
        instances: ['I2C1', 'I2C2'],
        pins: {
          I2C1: { sda: 'PB7', scl: 'PB6' },
          I2C2: { sda: 'PB11', scl: 'PB10' }
        }
      },
      PWM: {
        instances: ['TIM1', 'TIM2', 'TIM3', 'TIM4'],
        pins: {
          TIM1: { ch1: 'PA8', ch2: 'PA9', ch3: 'PA10', ch4: 'PA11' },
          TIM2: { ch1: 'PA0', ch2: 'PA1', ch3: 'PA2', ch4: 'PA3' },
          TIM3: { ch1: 'PA6', ch2: 'PA7', ch3: 'PB0', ch4: 'PB1' },
          TIM4: { ch1: 'PB6', ch2: 'PB7', ch3: 'PB8', ch4: 'PB9' }
        }
      }
    }
  }
};

export const McuProvider = ({ children }) => {
  const [selectedMcu, setSelectedMcu] = useState(null);
  const [mcuConfigurations, setMcuConfigurations] = useState({});
  const [peripheralStatus, setPeripheralStatus] = useState({});

  // Load configurations from localStorage on mount
  useEffect(() => {
    const savedConfigs = localStorage.getItem('mcuConfigurations');
    if (savedConfigs) {
      try {
        setMcuConfigurations(JSON.parse(savedConfigs));
      } catch (error) {
        console.error('Failed to load MCU configurations:', error);
      }
    }

    const savedStatus = localStorage.getItem('peripheralStatus');
    if (savedStatus) {
      try {
        setPeripheralStatus(JSON.parse(savedStatus));
      } catch (error) {
        console.error('Failed to load peripheral status:', error);
      }
    }
  }, []);

  // Save configurations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('mcuConfigurations', JSON.stringify(mcuConfigurations));
  }, [mcuConfigurations]);

  // Save peripheral status to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('peripheralStatus', JSON.stringify(peripheralStatus));
  }, [peripheralStatus]);

  const selectMcu = (mcuId) => {
    const mcu = MCU_SPECIFICATIONS[mcuId];
    if (mcu) {
      setSelectedMcu(mcu);
    }
  };

  const updateMcuConfiguration = (configUpdate) => {
    setMcuConfigurations(prev => ({
      ...prev,
      [selectedMcu.id]: {
        ...prev[selectedMcu.id],
        ...configUpdate
      }
    }));
  };

  const getCurrentConfiguration = () => {
    return mcuConfigurations[selectedMcu?.id] || {};
  };

  const getAvailablePeripheralInstances = (peripheralType) => {
    if (!selectedMcu?.supportedPeripherals?.[peripheralType]) return [];
    return selectedMcu.supportedPeripherals[peripheralType].instances || [];
  };

  const getPeripheralPins = (peripheralType, instance) => {
    if (!selectedMcu?.supportedPeripherals?.[peripheralType]?.pins?.[instance]) return {};
    return selectedMcu.supportedPeripherals[peripheralType].pins[instance] || {};
  };

  const getAvailablePins = () => {
    if (!selectedMcu?.pinout) return [];
    return Object.values(selectedMcu.pinout).flat();
  };

  const isPinAvailable = (pinName) => {
    // Check if pin is already assigned to another peripheral
    const currentConfig = getCurrentConfiguration();
    for (const [peripheralType, configs] of Object.entries(currentConfig)) {
      for (const [instance, config] of Object.entries(configs)) {
        if (config.pins && Object.values(config.pins).includes(pinName)) {
          return false;
        }
      }
    }
    return true;
  };

  const assignPinToPeripheral = (peripheralType, instance, pinFunction, pinName) => {
    const currentConfig = getCurrentConfiguration();
    const peripheralConfig = currentConfig[peripheralType] || {};
    const instanceConfig = peripheralConfig[instance] || {};
    
    const updatedConfig = {
      ...currentConfig,
      [peripheralType]: {
        ...peripheralConfig,
        [instance]: {
          ...instanceConfig,
          pins: {
            ...instanceConfig.pins,
            [pinFunction]: pinName
          }
        }
      }
    };

    updateMcuConfiguration(updatedConfig);
  };

  // New functions for dynamic peripheral management
  const savePeripheralConfiguration = (peripheralType, instance, configuration) => {
    const currentConfig = getCurrentConfiguration();
    const peripheralConfig = currentConfig[peripheralType] || {};
    
    const updatedConfig = {
      ...currentConfig,
      [peripheralType]: {
        ...peripheralConfig,
        [instance]: {
          ...configuration,
          lastModified: new Date().toISOString(),
          status: 'configured'
        }
      }
    };

    updateMcuConfiguration(updatedConfig);
    
    // Update peripheral status
    const statusKey = `${peripheralType}_${instance}`;
    setPeripheralStatus(prev => ({
      ...prev,
      [statusKey]: {
        status: 'configured',
        lastModified: new Date().toISOString(),
        completeness: calculateCompleteness(configuration)
      }
    }));
  };

  const deletePeripheralConfiguration = (peripheralType, instance) => {
    const currentConfig = getCurrentConfiguration();
    const peripheralConfig = currentConfig[peripheralType] || {};
    const { [instance]: deleted, ...remainingInstances } = peripheralConfig;
    
    const updatedConfig = {
      ...currentConfig,
      [peripheralType]: remainingInstances
    };

    updateMcuConfiguration(updatedConfig);
    
    // Update peripheral status
    const statusKey = `${peripheralType}_${instance}`;
    setPeripheralStatus(prev => ({
      ...prev,
      [statusKey]: {
        status: 'available',
        lastModified: null,
        completeness: 0
      }
    }));
  };

  const getPeripheralConfiguration = (peripheralType, instance) => {
    const currentConfig = getCurrentConfiguration();
    return currentConfig[peripheralType]?.[instance] || null;
  };

  const getPeripheralStatus = (peripheralType, instance) => {
    const statusKey = `${peripheralType}_${instance}`;
    return peripheralStatus[statusKey] || {
      status: 'available',
      lastModified: null,
      completeness: 0
    };
  };

  const calculateCompleteness = (configuration) => {
    if (!configuration) return 0;
    
    const requiredFields = ['instance', 'baudRate', 'txPin', 'rxPin'];
    const optionalFields = ['dataBits', 'parity', 'stopBits', 'flowControl'];
    
    let score = 0;
    const totalFields = requiredFields.length + optionalFields.length;
    
    // Required fields are worth more
    requiredFields.forEach(field => {
      if (configuration[field] && configuration[field] !== '') {
        score += 2; // Required fields worth 2 points
      }
    });
    
    optionalFields.forEach(field => {
      if (configuration[field] && configuration[field] !== '') {
        score += 1; // Optional fields worth 1 point
      }
    });
    
    return Math.min(100, Math.round((score / (requiredFields.length * 2 + optionalFields.length)) * 100));
  };

  const getAllPeripheralStatuses = () => {
    const statuses = {};
    if (!selectedMcu) return statuses;

    Object.keys(selectedMcu.supportedPeripherals).forEach(peripheralType => {
      const instances = getAvailablePeripheralInstances(peripheralType);
      instances.forEach(instance => {
        const statusKey = `${peripheralType}_${instance}`;
        statuses[statusKey] = getPeripheralStatus(peripheralType, instance);
      });
    });

    return statuses;
  };

  const value = {
    selectedMcu,
    selectMcu,
    updateMcuConfiguration,
    getCurrentConfiguration,
    getAvailablePeripheralInstances,
    getPeripheralPins,
    getAvailablePins,
    isPinAvailable,
    assignPinToPeripheral,
    savePeripheralConfiguration,
    deletePeripheralConfiguration,
    getPeripheralConfiguration,
    getPeripheralStatus,
    getAllPeripheralStatuses,
    MCU_SPECIFICATIONS
  };

  return (
    <McuContext.Provider value={value}>
      {children}
    </McuContext.Provider>
  );
};

export const useMcu = () => {
  const context = useContext(McuContext);
  if (!context) {
    throw new Error('useMcu must be used within a McuProvider');
  }
  return context;
};