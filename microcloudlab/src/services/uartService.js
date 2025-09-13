// uartService.js

import { peripheralService } from './peripheralService';

// Packet structure constants
const PACKET_START = 0xAA;
const PACKET_END = 0x55;
const CMD_CONFIG = 0x01;

/**
 * Convert byte array to hex string for display
 * @param {Uint8Array} bytes - The byte array to convert
 * @returns {string} - Hex string representation
 */
function bytesToHex(bytes) {
    return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0').toUpperCase())
        .join(' ');
}

/**
 * Format configuration frame for display
 * @param {Uint8Array} frame - The configuration frame
 * @returns {Object} - Formatted frame sections
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
 * Pack peripheral configuration into a byte array for UART transmission
 * @param {Object} config - The peripheral configuration object
 * @returns {Uint8Array} - Packed configuration data
 */
export function packConfiguration(config) {
    // Calculate total length needed
    const dataSize = 32; // Fixed size for now, adjust based on your needs
    const buffer = new Uint8Array(dataSize + 4); // +4 for start, cmd, length, end
    let index = 0;

    // Start byte
    buffer[index++] = PACKET_START;

    // Command byte (configuration)
    buffer[index++] = CMD_CONFIG;

    // Length byte
    buffer[index++] = dataSize;

    // Pack configuration data
    // Basic configuration
    buffer[index++] = parseInt(config.instance.replace(/[^\d]/g, '')); // UART instance number
    
    // Pack baud rate (4 bytes)
    const baudRate = parseInt(config.baudRate);
    buffer[index++] = (baudRate >> 24) & 0xFF;
    buffer[index++] = (baudRate >> 16) & 0xFF;
    buffer[index++] = (baudRate >> 8) & 0xFF;
    buffer[index++] = baudRate & 0xFF;

    // Pack data format
    buffer[index++] = parseInt(config.dataBits);
    buffer[index++] = config.parity === 'none' ? 0 : config.parity === 'even' ? 1 : 2;
    buffer[index++] = parseFloat(config.stopBits) * 10; // 1 -> 10, 1.5 -> 15, 2 -> 20

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

    // Add pin assignments (assuming 8-bit pin numbers)
    buffer[index++] = parseInt(config.txPin.slice(-1));
    buffer[index++] = parseInt(config.rxPin.slice(-1));
    
    if (config.rtsPin) {
        buffer[index++] = parseInt(config.rtsPin.slice(-1));
    } else {
        buffer[index++] = 0xFF; // No pin assigned
    }
    
    if (config.ctsPin) {
        buffer[index++] = parseInt(config.ctsPin.slice(-1));
    } else {
        buffer[index++] = 0xFF; // No pin assigned
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
 * Send configuration through UART
 * @param {Object} config - The peripheral configuration object
 * @param {string} mcuId - MCU identifier
 * @returns {Promise} - Resolution/rejection of the send operation
 */
export async function sendConfiguration(config, mcuId = 'unknown') {
    try {
        return await peripheralService.sendPeripheralConfiguration(
            'UART', 
            config.instance, 
            mcuId, 
            config
        );
    } catch (error) {
        console.error('Failed to send UART configuration:', error);
        throw error;
    }
}

export const uartService = {
    sendConfiguration
};
