// gpioService.js

import { peripheralService } from './peripheralService';

/**
 * Send GPIO configuration to backend
 * @param {Object} config - The GPIO configuration object
 * @param {string} mcuId - MCU identifier
 * @returns {Promise} - Resolution/rejection of the send operation
 */
export async function sendConfiguration(config, mcuId = 'unknown') {
    try {
        return await peripheralService.sendPeripheralConfiguration(
            'GPIO', 
            config.pin, 
            mcuId, 
            config
        );
    } catch (error) {
        console.error('Failed to send GPIO configuration:', error);
        throw error;
    }
}

export const gpioService = {
    sendConfiguration
};
