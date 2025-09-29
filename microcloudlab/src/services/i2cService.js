// i2cService.js

import { peripheralService } from './peripheralService';

/**
 * @module i2cService
 * This module provides services for interacting with I2C peripherals.
 */

/**
 * Sends an I2C configuration to the backend API.
 * This function wraps the generic `sendPeripheralConfiguration` method from the
 * peripheral service, specifying 'I2C' as the peripheral type.
 *
 * @param {object} config - The I2C configuration object. This should include details like the instance, clock speed, and pin assignments.
 * @param {string} [mcuId='unknown'] - The identifier of the target microcontroller.
 * @returns {Promise<any>} A promise that resolves with the response from the API.
 * @throws {Error} If the API request fails.
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

/**
 * An object containing all I2C-related service functions.
 * @type {{sendConfiguration: function(object, string=): Promise<any>}}
 */
export const i2cService = {
    sendConfiguration
};