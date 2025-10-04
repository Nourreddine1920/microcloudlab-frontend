import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMcu } from '../context/McuContext';
import Header from '../../../components/ui/Header';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module IntegratedIDE
 */

/**
 * A top-level component that provides a guided, step-by-step workflow for the entire
 * embedded development process. It integrates various IDE components like MCU selection,
 * configuration, validation, pin mapping, and simulation into a cohesive user experience.
 *
 * @returns {JSX.Element} The rendered integrated IDE component.
 */
const IntegratedIDE = () => {
  const { selectedMcu, selectMcu } = useMcu();
  const navigate = useNavigate();

  const [availableMcus, setAvailableMcus] = useState([]);
  const [loadingMcus, setLoadingMcus] = useState(true);
  const [mcuError, setMcuError] = useState(null);

  // Fetch MCUs from backend on mount
  useEffect(() => {
    setLoadingMcus(true);
    setMcuError(null);

    // Mock data to use when API is not available
    const mockMcus = [
      {
        id: 1,
        name: "STM32F401RE",
        manufacturer: "STMicroelectronics",
        architecture: "ARM Cortex-M4",
        maxFrequency: "84 MHz",
        flash: "512 KB",
        ram: "96 KB",
        pins: 64,
        description: "High-performance MCU with DSP and FPU instructions"
      },
      {
        id: 2,
        name: "ATMEGA328P",
        manufacturer: "Microchip",
        architecture: "AVR",
        maxFrequency: "20 MHz",
        flash: "32 KB",
        ram: "2 KB",
        pins: 28,
        description: "Popular MCU used in Arduino boards"
      }
    ];

    fetch("http://127.0.0.1:8000/api/microcontrollers/")
      .then((res) => {
        if (!res.ok) {
          throw new Error('API not available');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched MCUs:", data);
        if (!Array.isArray(data)) {
          throw new Error('API did not return a list of microcontrollers');
        }
        setAvailableMcus(data);
        setLoadingMcus(false);
      })
      .catch((err) => {
        console.log("Using mock data due to API error:", err.message);
        setAvailableMcus(mockMcus); // Use mock data when API fails
        setLoadingMcus(false);
      });
  }, []);

  // Handle MCU selection
  const handleMcuSelect = async (mcu) => {
    console.log("Selecting MCU:", mcu);
    if (!mcu || !mcu.id) {
      console.error("Invalid MCU object:", mcu);
      return;
    }

    try {
      // Add default supported peripherals if not specified
      const mcuWithPeripherals = {
        ...mcu,
        supportedPeripherals: mcu.supportedPeripherals || {
          'UART': {
            instances: ['UART1', 'UART2'],
            pins: {
              'UART1': { tx: 'TX1', rx: 'RX1' },
              'UART2': { tx: 'TX2', rx: 'RX2' }
            }
          },
          'SPI': {
            instances: ['SPI1'],
            pins: {
              'SPI1': { mosi: 'MOSI', miso: 'MISO', sck: 'SCK' }
            }
          },
          'I2C': {
            instances: ['I2C1'],
            pins: {
              'I2C1': { sda: 'SDA', scl: 'SCL' }
            }
          },
          'PWM': {
            instances: ['PWM1', 'PWM2', 'PWM3', 'PWM4'],
            pins: {
              'PWM1': { output: 'PWM1' },
              'PWM2': { output: 'PWM2' },
              'PWM3': { output: 'PWM3' },
              'PWM4': { output: 'PWM4' }
            }
          },
          'ADC': {
            instances: ['ADC1'],
            pins: {
              'ADC1': { input: 'ADC1' }
            }
          },
          'GPIO': {
            instances: ['PORTA', 'PORTB', 'PORTC'],
            pins: {
              'PORTA': { pin: 'PA' },
              'PORTB': { pin: 'PB' },
              'PORTC': { pin: 'PC' }
            }
          }
        }
      };
      
      selectMcu(mcuWithPeripherals);
      // Navigate to peripheral configuration dashboard with the selected board
      navigate('/ide/peripheral-configuration-dashboard?board=' + encodeURIComponent(mcu.id));
    } catch (error) {
      console.error("Error selecting MCU:", error);
      setMcuError(error.message);
    }
  };

  // Render loading state
  if (loadingMcus) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header title="Select MCU" />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Icon name="Loader" className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading microcontrollers...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (mcuError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header title="Select MCU" />
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-error">
            <Icon name="AlertTriangle" className="w-8 h-8 mx-auto mb-4" />
            <p>{mcuError}</p>
          </div>
        </div>
      </div>
    );
  }

  // Render empty state
  if (availableMcus.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header title="Select MCU" />
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-warning">
            <Icon name="AlertCircle" className="w-8 h-8 mx-auto mb-4" />
            <p>No microcontrollers available.</p>
          </div>
        </div>
      </div>
    );
  }

  // Render MCU selection grid
  return (
    <div className="container mx-auto px-4 py-8">
      <Header title="Select MCU" />
      <div className="text-center mb-8">
        <h2 className="text-3xl font-headline text-text-primary mb-4">
          Choose Your Microcontroller
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Select a microcontroller board to start your embedded development journey.
          All boards are available for free with full IDE access.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableMcus.map((mcu) => (
          <div
            key={mcu.id}
            className={`p-6 border rounded-lg transition-all ${
              selectedMcu?.id === mcu.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg border border-border overflow-hidden flex items-center justify-center bg-muted">
                {mcu.image ? (
                  <img
                    src={mcu.image}
                    alt={mcu.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="Cpu" size={32} className="text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{mcu.name}</h3>
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    {mcu.manufacturer}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 mb-4">{mcu.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>Architecture: {mcu.architecture}</div>
                  <div>Max Frequency: {mcu.maxFrequency}</div>
                  <div>Flash: {mcu.flash}</div>
                  <div>RAM: {mcu.ram}</div>
                </div>
                <Button
                  onClick={() => handleMcuSelect(mcu)}
                  variant="primary"
                  className="w-full mt-4"
                >
                  {selectedMcu?.id === mcu.id ? 'Selected' : 'Select MCU'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegratedIDE;
