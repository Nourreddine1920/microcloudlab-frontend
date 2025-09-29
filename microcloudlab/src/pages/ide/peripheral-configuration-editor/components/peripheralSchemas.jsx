// peripheralSchemas.js

/**
 * @module peripheralSchemas
 */

/**
 * An object that defines the configuration form schemas for various peripherals.
 * Each key in the object represents a peripheral type (e.g., 'UART', 'SPI').
 * The value is an object containing `sections`, which are further divided into categories
 * like 'basic', 'advanced', and 'pins'. Each section contains an array of field
 * definition objects that describe the UI and properties for each configuration parameter.
 *
 * @property {object} UART - The schema definition for the UART peripheral.
 * @property {object} SPI - The schema definition for the SPI peripheral.
 * @property {object} I2C - The schema definition for the I2C peripheral.
 * @property {object} sections - Contains the different configuration sections.
 * @property {Array<object>} sections.basic - Fields for basic configuration.
 * @property {Array<object>} sections.advanced - Fields for advanced configuration.
 * @property {Array<object>} sections.pins - Fields for pin configuration.
 */
const peripheralSchemas = {
  UART: {
    sections: {
      basic: [
        {
          type: "select",
          name: "instance",
          label: "UART Instance",
          description: "Select the UART peripheral instance",
          options: [
            { value: "UART1", label: "UART1 - Primary Interface" },
            { value: "UART2", label: "UART2 - Secondary Interface" },
            { value: "UART3", label: "UART3 - Debug Interface" },
            { value: "UART4", label: "UART4 - Auxiliary Interface" },
          ],
          default: "UART1",
          required: true,
        },
        {
          type: "select",
          name: "baudRate",
          label: "Baud Rate",
          description: "Communication speed in bits per second",
          options: [
            { value: "9600", label: "9600 bps - Standard" },
            { value: "19200", label: "19200 bps - Fast" },
            { value: "38400", label: "38400 bps - High Speed" },
            { value: "57600", label: "57600 bps - Very Fast" },
            { value: "115200", label: "115200 bps - Maximum" },
          ],
          default: "115200",
          required: true,
        },
        {
          type: "select",
          name: "dataBits",
          label: "Data Bits",
          description: "Number of data bits per frame",
          options: [
            { value: "7", label: "7 bits" },
            { value: "8", label: "8 bits (Standard)" },
            { value: "9", label: "9 bits" },
          ],
          default: "8",
        },
        {
          type: "select",
          name: "parity",
          label: "Parity",
          description: "Error detection method",
          options: [
            { value: "none", label: "None - No parity check" },
            { value: "even", label: "Even - Even parity" },
            { value: "odd", label: "Odd - Odd parity" },
          ],
          default: "none",
        },
        {
          type: "select",
          name: "stopBits",
          label: "Stop Bits",
          description: "Number of stop bits",
          options: [
            { value: "1", label: "1 bit (Standard)" },
            { value: "1.5", label: "1.5 bits" },
            { value: "2", label: "2 bits" },
          ],
          default: "1",
        },
      ],
      advanced: [
        {
          type: "select",
          name: "flowControl",
          label: "Flow Control",
          description: "Hardware flow control method",
          options: [
            { value: "none", label: "None - No flow control" },
            { value: "rts", label: "RTS - Request to Send" },
            { value: "cts", label: "CTS - Clear to Send" },
            { value: "rts_cts", label: "RTS/CTS - Full duplex" },
          ],
          default: "none",
        },
        {
          type: "input",
          name: "txBufferSize",
          label: "TX Buffer Size",
          description: "Transmit buffer size in bytes",
          inputType: "number",
          min: 64,
          max: 2048,
          default: 256,
        },
        {
          type: "input",
          name: "rxBufferSize",
          label: "RX Buffer Size",
          description: "Receive buffer size in bytes",
          inputType: "number",
          min: 64,
          max: 2048,
          default: 256,
        },
        {
          type: "checkbox",
          name: "dmaEnable",
          label: "DMA Enable",
          description: "Use Direct Memory Access for data transfer",
          default: false,
        },
        {
          type: "checkbox",
          name: "interruptEnable",
          label: "Interrupt Enable",
          description: "Enable UART interrupts",
          default: true,
        },
        {
          type: "checkbox",
          name: "autoBaud",
          label: "Auto Baud Detection",
          description: "Automatically detect baud rate",
          default: false,
        },
        {
          type: "select",
          name: "oversampling",
          label: "Oversampling",
          description: "Oversampling rate for better noise immunity",
          options: [
            { value: "8", label: "8x Oversampling" },
            { value: "16", label: "16x Oversampling (Default)" },
          ],
          default: "16",
        },
      ],
      pins: [
        {
          type: "select",
          name: "txPin",
          label: "TX Pin",
          description: "Transmit data pin",
          options: [
            { value: "PA9", label: "PA9 - Port A Pin 9" },
            { value: "PB6", label: "PB6 - Port B Pin 6" },
            { value: "PC6", label: "PC6 - Port C Pin 6" },
            { value: "PD5", label: "PD5 - Port D Pin 5" },
          ],
          default: "PA9",
        },
        {
          type: "select",
          name: "rxPin",
          label: "RX Pin",
          description: "Receive data pin",
          options: [
            { value: "PA10", label: "PA10 - Port A Pin 10" },
            { value: "PB7", label: "PB7 - Port B Pin 7" },
            { value: "PC7", label: "PC7 - Port C Pin 7" },
            { value: "PD6", label: "PD6 - Port D Pin 6" },
          ],
          default: "PA10",
        },
        {
          type: "select",
          name: "rtsPin",
          label: "RTS Pin",
          description: "Request to Send pin (optional)",
          options: [
            { value: "", label: "Not used" },
            { value: "PA12", label: "PA12 - Port A Pin 12" },
            { value: "PB8", label: "PB8 - Port B Pin 8" },
            { value: "PC8", label: "PC8 - Port C Pin 8" },
          ],
          default: "",
        },
        {
          type: "select",
          name: "ctsPin",
          label: "CTS Pin",
          description: "Clear to Send pin (optional)",
          options: [
            { value: "", label: "Not used" },
            { value: "PA11", label: "PA11 - Port A Pin 11" },
            { value: "PB9", label: "PB9 - Port B Pin 9" },
            { value: "PC9", label: "PC9 - Port C Pin 9" },
          ],
          default: "",
        },
        {
          type: "select",
          name: "gpioSpeed",
          label: "GPIO Speed",
          description: "GPIO output speed setting",
          options: [
            { value: "low", label: "Low - 2MHz" },
            { value: "medium", label: "Medium - 10MHz" },
            { value: "high", label: "High - 50MHz (Default)" },
          ],
          default: "high",
        },
        {
          type: "select",
          name: "pullResistor",
          label: "Pull Resistor",
          description: "Internal pull-up/pull-down resistor",
          options: [
            { value: "none", label: "None - No pull resistor" },
            { value: "up", label: "Pull-up - Internal pull-up" },
            { value: "down", label: "Pull-down - Internal pull-down" },
          ],
          default: "none",
        },
      ],
    },
  },
  // Add more peripherals (SPI, I2C, etc.) in the same format
  SPI: {
    sections: {
      basic: [
        {
          type: "select",
          name: "instance",
          label: "SPI Instance",
          description: "Select the SPI peripheral instance",
          options: [
            { value: "SPI1", label: "SPI1 - Primary Interface" },
            { value: "SPI2", label: "SPI2 - Secondary Interface" },
            { value: "SPI3", label: "SPI3 - Auxiliary Interface" },
          ],
          default: "SPI1",
          required: true,
        },
        {
          type: "select",
          name: "mode",
          label: "Mode",
          description: "Master or Slave operation",
          options: [
            { value: "master", label: "Master" },
            { value: "slave", label: "Slave" },
          ],
          default: "master",
        },
        {
          type: "select",
          name: "dataSize",
          label: "Data Size",
          description: "Number of bits per transfer",
          options: [
            { value: "8", label: "8 bits (Standard)" },
            { value: "16", label: "16 bits" },
          ],
          default: "8",
        },
        {
          type: "select",
          name: "clockPolarity",
          label: "Clock Polarity",
          description: "Idle state of clock",
          options: [
            { value: "low", label: "Low (Idle 0)" },
            { value: "high", label: "High (Idle 1)" },
          ],
          default: "low",
        },
        {
          type: "select",
          name: "clockPhase",
          label: "Clock Phase",
          description: "Data sampling edge",
          options: [
            { value: "first", label: "First Edge" },
            { value: "second", label: "Second Edge" },
          ],
          default: "first",
        },
        {
          type: "select",
          name: "baudRatePrescaler",
          label: "Baud Rate Prescaler",
          description: "SPI clock divider",
          options: [
            { value: "2", label: "/2" },
            { value: "4", label: "/4" },
            { value: "8", label: "/8" },
            { value: "16", label: "/16" },
            { value: "32", label: "/32" },
            { value: "64", label: "/64" },
            { value: "128", label: "/128" },
            { value: "256", label: "/256" },
          ],
          default: "16",
        },
      ],
      advanced: [
        {
          type: "checkbox",
          name: "crcEnable",
          label: "CRC Enable",
          description: "Enable hardware CRC calculation",
          default: false,
        },
        {
          type: "checkbox",
          name: "nssPulse",
          label: "NSS Pulse",
          description: "Enable NSS pulse management",
          default: true,
        },
        {
          type: "select",
          name: "direction",
          label: "Transfer Direction",
          description: "Full or half duplex",
          options: [
            { value: "2lines", label: "2 Lines (Full Duplex)" },
            { value: "1line", label: "1 Line (Half Duplex)" },
          ],
          default: "2lines",
        },
        {
          type: "checkbox",
          name: "dmaEnable",
          label: "DMA Enable",
          description: "Use DMA for SPI transfers",
          default: false,
        },
        {
          type: "checkbox",
          name: "interruptEnable",
          label: "Interrupt Enable",
          description: "Enable SPI interrupts",
          default: true,
        },
      ],
      pins: [
        {
          type: "select",
          name: "mosiPin",
          label: "MOSI Pin",
          description: "Master Out Slave In pin",
          options: [
            { value: "PA7", label: "PA7" },
            { value: "PB5", label: "PB5" },
            { value: "PC3", label: "PC3" },
          ],
          default: "PA7",
        },
        {
          type: "select",
          name: "misoPin",
          label: "MISO Pin",
          description: "Master In Slave Out pin",
          options: [
            { value: "PA6", label: "PA6" },
            { value: "PB4", label: "PB4" },
            { value: "PC2", label: "PC2" },
          ],
          default: "PA6",
        },
        {
          type: "select",
          name: "sckPin",
          label: "SCK Pin",
          description: "Serial Clock pin",
          options: [
            { value: "PA5", label: "PA5" },
            { value: "PB3", label: "PB3" },
            { value: "PC10", label: "PC10" },
          ],
          default: "PA5",
        },
        {
          type: "select",
          name: "nssPin",
          label: "NSS Pin",
          description: "Slave Select pin",
          options: [
            { value: "PA4", label: "PA4" },
            { value: "PB2", label: "PB2" },
            { value: "PC11", label: "PC11" },
          ],
          default: "PA4",
        },
        {
          type: "select",
          name: "gpioSpeed",
          label: "GPIO Speed",
          description: "GPIO output speed setting",
          options: [
            { value: "low", label: "Low - 2MHz" },
            { value: "medium", label: "Medium - 10MHz" },
            { value: "high", label: "High - 50MHz (Default)" },
          ],
          default: "high",
        },
        {
          type: "select",
          name: "pullResistor",
          label: "Pull Resistor",
          description: "Internal pull-up/pull-down resistor",
          options: [
            { value: "none", label: "None - No pull resistor" },
            { value: "up", label: "Pull-up - Internal pull-up" },
            { value: "down", label: "Pull-down - Internal pull-down" },
          ],
          default: "none",
        },
      ],
    },
  },
  I2C: {
    sections: {
      basic: [
        {
          type: "select",
          name: "instance",
          label: "I2C Instance",
          description: "Select the I2C peripheral instance",
          options: [
            { value: "I2C1", label: "I2C1 - Primary Interface" },
            { value: "I2C2", label: "I2C2 - Secondary Interface" },
            { value: "I2C3", label: "I2C3 - Auxiliary Interface" },
          ],
          default: "I2C1",
          required: true,
        },
        {
          type: "input",
          name: "address",
          label: "Device Address",
          description: "7-bit device address",
          inputType: "number",
          min: 0,
          max: 127,
          default: 8,
        },
        {
          type: "select",
          name: "clockSpeed",
          label: "Clock Speed",
          description: "I2C bus speed",
          options: [
            { value: "100000", label: "100kHz (Standard)" },
            { value: "400000", label: "400kHz (Fast)" },
            { value: "1000000", label: "1MHz (High Speed)" },
          ],
          default: "100000",
        },
        {
          type: "select",
          name: "dutyCycle",
          label: "Duty Cycle",
          description: "Fast mode duty cycle",
          options: [
            { value: "2", label: "2 (Standard)" },
            { value: "16_9", label: "16/9" },
          ],
          default: "2",
        },
      ],
      advanced: [
        {
          type: "checkbox",
          name: "generalCall",
          label: "General Call Enable",
          description: "Enable response to general call address",
          default: false,
        },
        {
          type: "checkbox",
          name: "noStretch",
          label: "No Stretch Mode",
          description: "Disable clock stretching",
          default: false,
        },
        {
          type: "checkbox",
          name: "dmaEnable",
          label: "DMA Enable",
          description: "Use DMA for I2C transfers",
          default: false,
        },
        {
          type: "checkbox",
          name: "interruptEnable",
          label: "Interrupt Enable",
          description: "Enable I2C interrupts",
          default: true,
        },
      ],
      pins: [
        {
          type: "select",
          name: "sdaPin",
          label: "SDA Pin",
          description: "Serial Data pin",
          options: [
            { value: "PB7", label: "PB7" },
            { value: "PB9", label: "PB9" },
            { value: "PC9", label: "PC9" },
          ],
          default: "PB7",
        },
        {
          type: "select",
          name: "sclPin",
          label: "SCL Pin",
          description: "Serial Clock pin",
          options: [
            { value: "PB6", label: "PB6" },
            { value: "PB8", label: "PB8" },
            { value: "PC8", label: "PC8" },
          ],
          default: "PB6",
        },
        {
          type: "select",
          name: "gpioSpeed",
          label: "GPIO Speed",
          description: "GPIO output speed setting",
          options: [
            { value: "low", label: "Low - 2MHz" },
            { value: "medium", label: "Medium - 10MHz" },
            { value: "high", label: "High - 50MHz (Default)" },
          ],
          default: "high",
        },
        {
          type: "select",
          name: "pullResistor",
          label: "Pull Resistor",
          description: "Internal pull-up/pull-down resistor",
          options: [
            { value: "none", label: "None - No pull resistor" },
            { value: "up", label: "Pull-up - Internal pull-up" },
            { value: "down", label: "Pull-down - Internal pull-down" },
          ],
          default: "up",
        },
      ],
    },
  },
};

export default peripheralSchemas;
