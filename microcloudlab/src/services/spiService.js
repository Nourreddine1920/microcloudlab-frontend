// spiService.js

import { peripheralService } from './peripheralService';

/**
 * Send SPI configuration to backend
 * @param {Object} config - The SPI configuration object
 * @param {string} mcuId - MCU identifier
 * @returns {Promise} - Resolution/rejection of the send operation
 */
export async function sendConfiguration(config, mcuId = 'unknown') {
    try {
        return await peripheralService.sendPeripheralConfiguration(
            'SPI', 
            config.instance, 
            mcuId, 
            config
        );
    } catch (error) {
        console.error('Failed to send SPI configuration:', error);
        throw error;
    }
}

export const spiService = {
    sendConfiguration
};
