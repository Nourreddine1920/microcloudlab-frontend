import React, { createContext, useContext, useState, useEffect } from 'react';

const BoardContext = createContext();

/**
 * @module BoardContext
 */

/**
 * Custom hook for accessing the board context.
 * Provides state and functions for managing microcontroller board selection.
 *
 * @returns {{
 *   selectedBoard: object | null,
 *   availableBoards: object[],
 *   isLoading: boolean,
 *   selectBoard: (board: object) => void,
 *   clearBoard: () => void,
 *   getBoardById: (id: string) => object | undefined,
 *   isAnyBoardSelected: boolean
 * }} The board context.
 * @throws {Error} If used outside of a `BoardProvider`.
 */
export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};

/**
 * Provides board selection state to its children components.
 * It manages the currently selected board, the list of available boards,
 * and persists the selection to localStorage.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to which the context will be provided.
 * @returns {JSX.Element} The BoardContext provider.
 */
export const BoardProvider = ({ children }) => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Available boards configuration
  const availableBoards = [
    {
      id: 'arduino-uno',
      name: 'Arduino Uno',
      description: 'ATmega328P microcontroller, perfect for beginners',
      specs: '16MHz • 32KB Flash • 2KB SRAM',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Beginner',
      peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM'],
      price: 'Free',
      peripheralCategories: {
        communication: ['UART', 'SPI', 'I2C'],
        gpio: ['GPIO Port A', 'GPIO Port B'],
        timers: ['Timer 1', 'Timer 2', 'PWM Channel 1'],
        analog: ['ADC1'],
        system: ['Power Management', 'Clock Control']
      }
    },
    {
      id: 'esp32-devkit',
      name: 'ESP32 DevKit',
      description: 'Dual-core WiFi/BT microcontroller with rich peripherals',
      specs: '240MHz • 4MB Flash • 520KB SRAM',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Intermediate',
      peripherals: ['WiFi', 'Bluetooth', 'GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'DAC', 'PWM'],
      price: 'Free',
      peripheralCategories: {
        communication: ['UART1', 'UART2', 'SPI1', 'SPI2', 'I2C1', 'I2C2', 'WiFi', 'Bluetooth'],
        gpio: ['GPIO Port A', 'GPIO Port B', 'GPIO Port C'],
        timers: ['Timer 1', 'Timer 2', 'Timer 3', 'PWM Channel 1', 'PWM Channel 2'],
        analog: ['ADC1', 'ADC2', 'DAC1'],
        system: ['RCC', 'Power Management', 'NVIC', 'DMA1']
      }
    },
    {
      id: 'raspberry-pi-pico',
      name: 'Raspberry Pi Pico',
      description: 'RP2040 dual-core ARM Cortex-M0+ microcontroller',
      specs: '133MHz • 2MB Flash • 264KB SRAM',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Intermediate',
      peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM', 'PIO'],
      price: 'Free',
      peripheralCategories: {
        communication: ['UART1', 'SPI1', 'I2C1'],
        gpio: ['GPIO Port A', 'GPIO Port B'],
        timers: ['Timer 1', 'PWM Channel 1'],
        analog: ['ADC1'],
        system: ['Clock Control', 'Power Management', 'PIO']
      }
    },
    {
      id: 'stm32f103-blue-pill',
      name: 'STM32F103 Blue Pill',
      description: 'ARM Cortex-M3 microcontroller with extensive peripherals',
      specs: '72MHz • 128KB Flash • 20KB SRAM',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Advanced',
      peripherals: ['GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'DAC', 'PWM', 'CAN', 'USB'],
      price: 'Free',
      peripheralCategories: {
        communication: ['UART1', 'UART2', 'SPI1', 'SPI2', 'I2C1', 'I2C2', 'CAN1', 'USB OTG'],
        gpio: ['GPIO Port A', 'GPIO Port B', 'GPIO Port C', 'GPIO Port D'],
        timers: ['Timer 1', 'Timer 2', 'Timer 3', 'PWM Channel 1', 'Watchdog Timer'],
        analog: ['ADC1', 'ADC2', 'DAC1', 'Comparator 1'],
        system: ['RCC', 'Power Management', 'NVIC', 'DMA1', 'DMA2', 'RTC']
      }
    },
    {
      id: 'nordic-nrf52',
      name: 'Nordic nRF52',
      description: 'ARM Cortex-M4 with Bluetooth Low Energy',
      specs: '64MHz • 512KB Flash • 64KB SRAM',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Advanced',
      peripherals: ['Bluetooth LE', 'GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM'],
      price: 'Free',
      peripheralCategories: {
        communication: ['Bluetooth LE', 'UART1', 'SPI1', 'I2C1'],
        gpio: ['GPIO Port A', 'GPIO Port B'],
        timers: ['Timer 1', 'PWM Channel 1'],
        analog: ['ADC1'],
        system: ['Power Management', 'Clock Control']
      }
    },
    {
      id: 'ti-cc3200',
      name: 'TI CC3200',
      description: 'WiFi-enabled ARM Cortex-M4 microcontroller',
      specs: '80MHz • 256KB Flash • 64KB SRAM',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      status: 'available',
      difficulty: 'Advanced',
      peripherals: ['WiFi', 'GPIO', 'UART', 'SPI', 'I2C', 'ADC', 'PWM'],
      price: 'Free',
      peripheralCategories: {
        communication: ['WiFi', 'UART1', 'SPI1', 'I2C1'],
        gpio: ['GPIO Port A', 'GPIO Port B'],
        timers: ['Timer 1', 'PWM Channel 1'],
        analog: ['ADC1'],
        system: ['Power Management', 'Clock Control']
      }
    }
  ];

  // Load selected board from localStorage on component mount
  useEffect(() => {
    const savedBoardId = localStorage.getItem('selectedBoardId');
    if (savedBoardId) {
      const board = availableBoards.find(b => b.id === savedBoardId);
      if (board) {
        setSelectedBoard(board);
      }
    }
    setIsLoading(false);
  }, []);

  // Save selected board to localStorage whenever it changes
  useEffect(() => {
    if (selectedBoard) {
      localStorage.setItem('selectedBoardId', selectedBoard.id);
    } else {
      localStorage.removeItem('selectedBoardId');
    }
  }, [selectedBoard]);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const clearBoard = () => {
    setSelectedBoard(null);
  };

  const getBoardById = (id) => {
    return availableBoards.find(board => board.id === id);
  };

  const value = {
    selectedBoard,
    availableBoards,
    isLoading,
    selectBoard,
    clearBoard,
    getBoardById,
    isAnyBoardSelected: !!selectedBoard
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};