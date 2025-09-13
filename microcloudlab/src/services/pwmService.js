// pwmService.js

import { peripheralService } from './peripheralService';

/**
 * Send PWM configuration to backend
 * @param {Object} config - The PWM configuration object
 * @param {string} mcuId - MCU identifier
 * @returns {Promise} - Resolution/rejection of the send operation
 */
export async function sendConfiguration(config, mcuId = 'unknown') {
    try {
        return await peripheralService.sendPeripheralConfiguration(
            'PWM', 
            config.instance, 
            mcuId, 
            config
        );
    } catch (error) {
        console.error('Failed to send PWM configuration:', error);
        throw error;
    }
}

export const pwmService = {
    sendConfiguration
};
