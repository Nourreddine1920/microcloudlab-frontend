// gpioService.js

import { peripheralService } from './peripheralService';

/**
 * @module gpioService
 * This module provides services for interacting with GPIO peripherals.
 */

/**
 * Sends a GPIO configuration to the backend API.
 * This function wraps the generic `sendPeripheralConfiguration` method from the
 * peripheral service, specifying 'GPIO' as the peripheral type.
 *
 * @param {object} config - The GPIO configuration object. This should include details like the pin number and mode.
 * @param {string} [mcuId='unknown'] - The identifier of the target microcontroller.
 * @returns {Promise<any>} A promise that resolves with the response from the API.
 * @throws {Error} If the API request fails.
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

/**
 * An object containing all GPIO-related service functions.
 * @type {{sendConfiguration: function(object, string=): Promise<any>}}
 */
export const gpioService = {
    sendConfiguration
};