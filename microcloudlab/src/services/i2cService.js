// i2cService.js

import { peripheralService } from './peripheralService';

/**
 * Send I2C configuration to backend
 * @param {Object} config - The I2C configuration object
 * @param {string} mcuId - MCU identifier
 * @returns {Promise} - Resolution/rejection of the send operation
 */
export async function sendConfiguration(config, mcuId = 'unknown') {
    try {
        return await peripheralService.sendPeripheralConfiguration(
            'I2C', 
            config.instance, 
            mcuId, 
            config
        );
    } catch (error) {
        console.error('Failed to send I2C configuration:', error);
        throw error;
    }
}

export const i2cService = {
    sendConfiguration
};
