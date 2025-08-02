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
          I2C1: { sda: 'GPIO33', scl: 'GPIO32' }
        }
      },
      WiFi: {
        instances: ['WiFi0'],
        pins: {}
      },
      Bluetooth: {
        instances: ['BT0'],
        pins: {}
      }
    }
  },
  'raspberry-pi-pico': {
    id: 'raspberry-pi-pico',
    name: 'Raspberry Pi Pico',
    description: 'RP2040 dual-core ARM Cortex-M0+ microcontroller',
    specs: '133MHz • 2MB Flash • 264KB SRAM',
    image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=100&h=100&fit=crop',
    status: 'available',
    difficulty: 'Intermediate',
    peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM', 'PIO'],
    price: 'Free',
    pinout: {
      gpio: Array.from({length: 29}, (_, i) => ({
        pin: i,
        name: `GP${i}`,
        type: 'GPIO',
        functions: ['GPIO', 'PWM', 'SPI', 'I2C', 'UART']
      }))
    },
    supportedPeripherals: {
      UART: {
        instances: ['UART0', 'UART1'],
        pins: {
          UART0: { tx: 'GP0', rx: 'GP1' },
          UART1: { tx: 'GP4', rx: 'GP5' }
        }
      },
      SPI: {
        instances: ['SPI0', 'SPI1'],
        pins: {
          SPI0: { mosi: 'GP3', miso: 'GP4', sck: 'GP2', ss: 'GP5' },
          SPI1: { mosi: 'GP11', miso: 'GP12', sck: 'GP10', ss: 'GP13' }
        }
      },
      I2C: {
        instances: ['I2C0', 'I2C1'],
        pins: {
          I2C0: { sda: 'GP0', scl: 'GP1' },
          I2C1: { sda: 'GP2', scl: 'GP3' }
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
    peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'DAC', 'PWM', 'Timer'],
    price: 'Free',
    pinout: {
      gpio: [
        ...Array.from({length: 16}, (_, i) => ({
          pin: i,
          name: `PA${i}`,
          type: 'GPIO',
          functions: ['GPIO', 'ADC', 'Timer', 'UART', 'SPI']
        })),
        ...Array.from({length: 16}, (_, i) => ({
          pin: i + 16,
          name: `PB${i}`,
          type: 'GPIO',
          functions: ['GPIO', 'Timer', 'I2C', 'SPI']
        })),
        ...Array.from({length: 16}, (_, i) => ({
          pin: i + 32,
          name: `PC${i}`,
          type: 'GPIO',
          functions: ['GPIO', 'ADC']
        }))
      ]
    },
    supportedPeripherals: {
      UART: {
        instances: ['USART1', 'USART2', 'USART3'],
        pins: {
          USART1: { tx: 'PA9', rx: 'PA10' },
          USART2: { tx: 'PA2', rx: 'PA3' },
          USART3: { tx: 'PB10', rx: 'PB11' }
        }
      },
      SPI: {
        instances: ['SPI1', 'SPI2'],
        pins: {
          SPI1: { mosi: 'PA7', miso: 'PA6', sck: 'PA5', nss: 'PA4' },
          SPI2: { mosi: 'PB15', miso: 'PB14', sck: 'PB13', nss: 'PB12' }
        }
      },
      I2C: {
        instances: ['I2C1', 'I2C2'],
        pins: {
          I2C1: { sda: 'PB7', scl: 'PB6' },
          I2C2: { sda: 'PB11', scl: 'PB10' }
        }
      }
    }
  }
};

export const McuProvider = ({ children }) => {
  const [selectedMcu, setSelectedMcu] = useState(null);
  const [mcuConfigurations, setMcuConfigurations] = useState({});

  // Load selected MCU from localStorage on mount
  useEffect(() => {
    const savedMcu = localStorage.getItem('selectedMcu');
    if (savedMcu) {
      const mcuData = JSON.parse(savedMcu);
      setSelectedMcu(mcuData);
    }
  }, []);

  // Save selected MCU to localStorage when it changes
  useEffect(() => {
    if (selectedMcu) {
      localStorage.setItem('selectedMcu', JSON.stringify(selectedMcu));
    }
  }, [selectedMcu]);

  const selectMcu = (mcuId) => {
    const mcuSpec = MCU_SPECIFICATIONS[mcuId];
    if (mcuSpec) {
      setSelectedMcu(mcuSpec);
      // Initialize default configuration for this MCU if not exists
      if (!mcuConfigurations[mcuId]) {
        setMcuConfigurations(prev => ({
          ...prev,
          [mcuId]: {
            peripherals: {},
            pinAssignments: {},
            globalSettings: {}
          }
        }));
      }
    }
  };

  const updateMcuConfiguration = (configUpdate) => {
    if (!selectedMcu) return;
    
    setMcuConfigurations(prev => ({
      ...prev,
      [selectedMcu.id]: {
        ...prev[selectedMcu.id],
        ...configUpdate
      }
    }));
  };

  const getCurrentConfiguration = () => {
    if (!selectedMcu) return null;
    return mcuConfigurations[selectedMcu.id] || {
      peripherals: {},
      pinAssignments: {},
      globalSettings: {}
    };
  };

  const getAvailablePeripheralInstances = (peripheralType) => {
    if (!selectedMcu || !selectedMcu.supportedPeripherals[peripheralType]) {
      return [];
    }
    return selectedMcu.supportedPeripherals[peripheralType].instances || [];
  };

  const getPeripheralPins = (peripheralType, instance) => {
    if (!selectedMcu || !selectedMcu.supportedPeripherals[peripheralType]) {
      return {};
    }
    return selectedMcu.supportedPeripherals[peripheralType].pins[instance] || {};
  };

  const getAvailablePins = () => {
    if (!selectedMcu || !selectedMcu.pinout) {
      return [];
    }
    // Combine all pin arrays from the pinout
    return Object.values(selectedMcu.pinout).flat();
  };

  const isPinAvailable = (pinName) => {
    const currentConfig = getCurrentConfiguration();
    if (!currentConfig) return true;
    
    // Check if pin is already assigned to another peripheral
    return !Object.values(currentConfig.pinAssignments || {}).some(assignment => 
      Object.values(assignment).includes(pinName)
    );
  };

  const assignPinToPeripheral = (peripheralType, instance, pinFunction, pinName) => {
    updateMcuConfiguration({
      pinAssignments: {
        ...getCurrentConfiguration().pinAssignments,
        [`${peripheralType}_${instance}`]: {
          ...getCurrentConfiguration().pinAssignments?.[`${peripheralType}_${instance}`],
          [pinFunction]: pinName
        }
      }
    });
  };

  const value = {
    selectedMcu,
    selectMcu,
    mcuConfigurations,
    updateMcuConfiguration,
    getCurrentConfiguration,
    getAvailablePeripheralInstances,
    getPeripheralPins,
    getAvailablePins,
    isPinAvailable,
    assignPinToPeripheral,
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
  if (context === undefined) {
    throw new Error('useMcu must be used within a McuProvider');
  }
  return context;
};

export default McuContext;