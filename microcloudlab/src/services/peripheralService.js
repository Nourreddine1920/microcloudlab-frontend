// peripheralService.js - Generic peripheral communication service

import { apiRequest } from './api';

/**
 * @module peripheralService
 * This module provides generic services for handling peripheral communication,
 * including packing configuration data into frames and sending it to the backend.
 */


// Packet structure constants
const PACKET_START = 0xAA;
const PACKET_END = 0x55;

// Command codes for different peripheral types
const PERIPHERAL_COMMANDS = {
  UART: 0x01,
  SPI: 0x02,
  I2C: 0x03,
  PWM: 0x04,
  GPIO: 0x05,
  ADC: 0x06,
  DAC: 0x07,
  CAN: 0x08,
  USB: 0x09,
  WIFI: 0x0A,
  BLUETOOTH: 0x0B,
  CONFIG: 0x0C, // General configuration
};

/**
 * Converts a byte array to a hex string for display purposes.
 * Each byte is converted to a two-digit uppercase hex representation.
 * @param {Uint8Array} bytes - The byte array to convert.
 * @returns {string} The hex string representation of the byte array.
 */
function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0').toUpperCase())
    .join(' ');
}

/**
 * Formats a raw data frame into a structured object for display.
 * It breaks the frame down into its constituent parts: start, command, length, data, and end.
 * @param {Uint8Array} frame - The raw configuration frame.
 * @returns {object} An object with formatted frame sections.
 */
export function formatFrame(frame) {
  return {
    start: bytesToHex(frame.slice(0, 1)),
    command: bytesToHex(frame.slice(1, 2)),
    length: bytesToHex(frame.slice(2, 3)),
    data: bytesToHex(frame.slice(3, -1)),
    end: bytesToHex(frame.slice(-1)),
    full: bytesToHex(frame)
  };
}

/**
 * Packs a UART configuration object into a binary data frame.
 * @param {object} config - The UART configuration object.
 * @returns {Uint8Array} The packed binary data frame.
 */
function packUARTConfiguration(config) {
  const dataSize = 32;
  const buffer = new Uint8Array(dataSize + 4);
  let index = 0;

  // Start byte
  buffer[index++] = PACKET_START;
  // Command byte (UART)
  buffer[index++] = PERIPHERAL_COMMANDS.UART;
  // Length byte
  buffer[index++] = dataSize;

  // Pack UART configuration data
  buffer[index++] = parseInt(config.instance.replace(/[^\d]/g, ''));
  
  // Pack baud rate (4 bytes)
  const baudRate = parseInt(config.baudRate);
  buffer[index++] = (baudRate >> 24) & 0xFF;
  buffer[index++] = (baudRate >> 16) & 0xFF;
  buffer[index++] = (baudRate >> 8) & 0xFF;
  buffer[index++] = baudRate & 0xFF;

  // Pack data format
  buffer[index++] = parseInt(config.dataBits);
  buffer[index++] = config.parity === 'none' ? 0 : config.parity === 'even' ? 1 : 2;
  buffer[index++] = parseFloat(config.stopBits) * 10;

  // Pack flow control
  buffer[index++] = config.flowControl === 'none' ? 0 : 
                    config.flowControl === 'rts' ? 1 : 
                    config.flowControl === 'cts' ? 2 : 3;

  // Pack advanced settings
  buffer[index++] = (config.dmaEnable ? 0x80 : 0) | 
                    (config.interruptEnable ? 0x40 : 0) |
                    (config.autoBaud ? 0x20 : 0);
  
  buffer[index++] = parseInt(config.oversampling);

  // Pack buffer sizes (2 bytes each)
  buffer[index++] = (parseInt(config.txBufferSize) >> 8) & 0xFF;
  buffer[index++] = parseInt(config.txBufferSize) & 0xFF;
  buffer[index++] = (parseInt(config.rxBufferSize) >> 8) & 0xFF;
  buffer[index++] = parseInt(config.rxBufferSize) & 0xFF;

  // Add pin assignments
  buffer[index++] = parseInt(config.txPin.slice(-1));
  buffer[index++] = parseInt(config.rxPin.slice(-1));
  
  if (config.rtsPin) {
    buffer[index++] = parseInt(config.rtsPin.slice(-1));
  } else {
    buffer[index++] = 0xFF;
  }
  
  if (config.ctsPin) {
    buffer[index++] = parseInt(config.ctsPin.slice(-1));
  } else {
    buffer[index++] = 0xFF;
  }

  // Fill remaining bytes with 0
  while (index < buffer.length - 1) {
    buffer[index++] = 0;
  }

  // End byte
  buffer[index] = PACKET_END;

  return buffer;
}

/**
 * Packs an SPI configuration object into a binary data frame.
 * @param {object} config - The SPI configuration object.
 * @returns {Uint8Array} The packed binary data frame.
 */
function packSPIConfiguration(config) {
  const dataSize = 24;
  const buffer = new Uint8Array(dataSize + 4);
  let index = 0;

  // Start byte
  buffer[index++] = PACKET_START;
  // Command byte (SPI)
  buffer[index++] = PERIPHERAL_COMMANDS.SPI;
  // Length byte
  buffer[index++] = dataSize;

  // Pack SPI configuration
  buffer[index++] = parseInt(config.instance.replace(/[^\d]/g, ''));
  
  // Mode and data size
  buffer[index++] = config.mode === 'master' ? 0 : 1;
  buffer[index++] = parseInt(config.dataSize);
  
  // Clock polarity and phase
  buffer[index++] = config.clockPolarity === 'low' ? 0 : 1;
  buffer[index++] = config.clockPhase === 'first' ? 0 : 1;
  
  // Baud rate prescaler
  buffer[index++] = parseInt(config.baudRatePrescaler);

  // Advanced settings
  buffer[index++] = (config.crcEnable ? 0x80 : 0) | 
                    (config.nssPulse ? 0x40 : 0) |
                    (config.dmaEnable ? 0x20 : 0) |
                    (config.interruptEnable ? 0x10 : 0);
  
  buffer[index++] = config.direction === '2lines' ? 0 : 1;

  // Pin assignments
  buffer[index++] = parseInt(config.mosiPin.slice(-1));
  buffer[index++] = parseInt(config.misoPin.slice(-1));
  buffer[index++] = parseInt(config.sckPin.slice(-1));
  buffer[index++] = parseInt(config.nssPin.slice(-1));

  // Fill remaining bytes
  while (index < buffer.length - 1) {
    buffer[index++] = 0;
  }

  // End byte
  buffer[index] = PACKET_END;

  return buffer;
}

/**
 * Packs an I2C configuration object into a binary data frame.
 * @param {object} config - The I2C configuration object.
 * @returns {Uint8Array} The packed binary data frame.
 */
function packI2CConfiguration(config) {
  const dataSize = 20;
  const buffer = new Uint8Array(dataSize + 4);
  let index = 0;

  // Start byte
  buffer[index++] = PACKET_START;
  // Command byte (I2C)
  buffer[index++] = PERIPHERAL_COMMANDS.I2C;
  // Length byte
  buffer[index++] = dataSize;

  // Pack I2C configuration
  buffer[index++] = parseInt(config.instance.replace(/[^\d]/g, ''));
  
  // Device address
  buffer[index++] = parseInt(config.address);
  
  // Clock speed (4 bytes)
  const clockSpeed = parseInt(config.clockSpeed);
  buffer[index++] = (clockSpeed >> 24) & 0xFF;
  buffer[index++] = (clockSpeed >> 16) & 0xFF;
  buffer[index++] = (clockSpeed >> 8) & 0xFF;
  buffer[index++] = clockSpeed & 0xFF;

  // Duty cycle
  buffer[index++] = config.dutyCycle === '2' ? 0 : 1;

  // Advanced settings
  buffer[index++] = (config.generalCall ? 0x80 : 0) | 
                    (config.noStretch ? 0x40 : 0) |
                    (config.dmaEnable ? 0x20 : 0) |
                    (config.interruptEnable ? 0x10 : 0);

  // Pin assignments
  buffer[index++] = parseInt(config.sdaPin.slice(-1));
  buffer[index++] = parseInt(config.sclPin.slice(-1));

  // Fill remaining bytes
  while (index < buffer.length - 1) {
    buffer[index++] = 0;
  }

  // End byte
  buffer[index] = PACKET_END;

  return buffer;
}

/**
 * Packs a PWM configuration object into a binary data frame.
 * @param {object} config - The PWM configuration object.
 * @returns {Uint8Array} The packed binary data frame.
 */
function packPWMConfiguration(config) {
  const dataSize = 20;
  const buffer = new Uint8Array(dataSize + 4);
  let index = 0;

  // Start byte
  buffer[index++] = PACKET_START;
  // Command byte (PWM)
  buffer[index++] = PERIPHERAL_COMMANDS.PWM;
  // Length byte
  buffer[index++] = dataSize;

  // Pack PWM configuration
  buffer[index++] = parseInt(config.instance.replace(/[^\d]/g, ''));
  
  // Frequency (4 bytes)
  const frequency = parseInt(config.frequency);
  buffer[index++] = (frequency >> 24) & 0xFF;
  buffer[index++] = (frequency >> 16) & 0xFF;
  buffer[index++] = (frequency >> 8) & 0xFF;
  buffer[index++] = frequency & 0xFF;

  // Duty cycle (2 bytes)
  const dutyCycle = parseInt(config.dutyCycle * 100);
  buffer[index++] = (dutyCycle >> 8) & 0xFF;
  buffer[index++] = dutyCycle & 0xFF;

  // Pin assignment
  buffer[index++] = parseInt(config.outputPin.slice(-1));

  // Fill remaining bytes
  while (index < buffer.length - 1) {
    buffer[index++] = 0;
  }

  // End byte
  buffer[index] = PACKET_END;

  return buffer;
}

/**
 * Packs a GPIO configuration object into a binary data frame.
 * @param {object} config - The GPIO configuration object.
 * @returns {Uint8Array} The packed binary data frame.
 */
function packGPIOConfiguration(config) {
  const dataSize = 12;
  const buffer = new Uint8Array(dataSize + 4);
  let index = 0;

  // Start byte
  buffer[index++] = PACKET_START;
  // Command byte (GPIO)
  buffer[index++] = PERIPHERAL_COMMANDS.GPIO;
  // Length byte
  buffer[index++] = dataSize;

  // Pack GPIO configuration
  buffer[index++] = parseInt(config.pin.replace(/[^\d]/g, ''));
  buffer[index++] = config.direction === 'input' ? 0 : 1;
  buffer[index++] = config.pullUp ? 1 : 0;
  buffer[index++] = config.pullDown ? 1 : 0;

  // Fill remaining bytes
  while (index < buffer.length - 1) {
    buffer[index++] = 0;
  }

  // End byte
  buffer[index] = PACKET_END;

  return buffer;
}

/**
 * A generic function to pack a peripheral configuration based on its type.
 * It dispatches to the appropriate packing function.
 * @param {string} peripheralType - The type of peripheral (e.g., 'UART', 'SPI').
 * @param {object} config - The configuration object for the peripheral.
 * @returns {Uint8Array} The packed binary data frame.
 * @throws {Error} If the peripheral type is unsupported.
 */
export function packPeripheralConfiguration(peripheralType, config) {
  switch (peripheralType.toUpperCase()) {
    case 'UART':
      return packUARTConfiguration(config);
    case 'SPI':
      return packSPIConfiguration(config);
    case 'I2C':
      return packI2CConfiguration(config);
    case 'PWM':
      return packPWMConfiguration(config);
    case 'GPIO':
      return packGPIOConfiguration(config);
    default:
      throw new Error(`Unsupported peripheral type: ${peripheralType}`);
  }
}

/**
 * Sends a packed peripheral configuration to the backend API.
 * @param {string} peripheralType - The type of peripheral.
 * @param {string} instance - The specific instance of the peripheral.
 * @param {string} mcuId - The identifier of the target microcontroller.
 * @param {object} config - The configuration object to send.
 * @returns {Promise<any>} A promise that resolves with the API response.
 * @throws {Error} If the API request fails.
 */
export async function sendPeripheralConfiguration(peripheralType, instance, mcuId, config) {
  try {
    const packedData = packPeripheralConfiguration(peripheralType, config);
    
    // Send configuration to backend
    const response = await apiRequest('/peripheral/send/', {
      method: 'POST',
      body: JSON.stringify({
        peripheral_type: peripheralType,
        instance: instance,
        mcu_id: mcuId,
        configuration: config,
        data: Array.from(packedData), // Convert Uint8Array to regular array for JSON
        timestamp: new Date().toISOString()
      })
    });
    
    return response;
  } catch (error) {
    console.error(`Failed to send ${peripheralType} configuration:`, error);
    throw error;
  }
}

/**
 * Fetches the last received peripheral data from the backend.
 * @returns {Promise<any>} A promise that resolves with the last peripheral data.
 * @throws {Error} If the API request fails.
 */
export async function getLastPeripheralData() {
  try {
    const response = await apiRequest('/peripheral/view/');
    return response;
  } catch (error) {
    console.error('Failed to get last peripheral data:', error);
    throw error;
  }
}

/**
 * Fetches the history of all peripheral communications from the backend.
 * @returns {Promise<any>} A promise that resolves with the communication history.
 * @throws {Error} If the API request fails.
 */
export async function getPeripheralHistory() {
  try {
    const response = await apiRequest('/peripheral/history/');
    return response;
  } catch (error) {
    console.error('Failed to get peripheral history:', error);
    throw error;
  }
}

/**
 * Fetches peripheral data filtered by a specific type from the backend.
 * @param {string} peripheralType - The type of peripheral to filter by.
 * @returns {Promise<any>} A promise that resolves with the filtered data.
 * @throws {Error} If the API request fails.
 */
export async function getPeripheralDataByType(peripheralType) {
  try {
    const response = await apiRequest(`/peripheral/view/${peripheralType}/`);
    return response;
  } catch (error) {
    console.error(`Failed to get ${peripheralType} data:`, error);
    throw error;
  }
}

/**
 * An object containing all peripheral-related service functions.
 * @type {object}
 */
export const peripheralService = {
  packPeripheralConfiguration,
  sendPeripheralConfiguration,
  getLastPeripheralData,
  getPeripheralHistory,
  getPeripheralDataByType,
  formatFrame
};