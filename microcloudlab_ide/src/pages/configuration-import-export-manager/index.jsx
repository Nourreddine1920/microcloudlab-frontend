import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ConfigurationContextHeader from '../../components/ui/ConfigurationContextHeader';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import FileTreeBrowser from './components/FileTreeBrowser';
import ConfigurationPreview from './components/ConfigurationPreview';
import ImportExportToolbar from './components/ImportExportToolbar';
import ConfigurationComparison from './components/ConfigurationComparison';
import Button from '../../components/ui/Button';


const ConfigurationImportExportManager = () => {
  const navigate = useNavigate();
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [configurations, setConfigurations] = useState([]);

  // Mock configuration data
  useEffect(() => {
    const mockConfigurations = [
      {
        id: 'config-001',
        name: 'UART_SPI_Basic_Setup',
        chipType: 'STM32F407VG',
        projectName: 'IoT Sensor Hub',
        description: 'Basic UART and SPI configuration for sensor communication with optimized power settings.',
        version: '1.2.0',
        createdDate: '2025-01-15T10:30:00Z',
        lastModified: '2025-01-28T14:22:00Z',
        isTemplate: false,
        isArchived: false,
        peripherals: ['UART1', 'SPI2', 'GPIO', 'TIM2'],
        pinCount: 12,
        codeLines: 245,
        memoryUsage: 18.5,
        peripheralDetails: [
          {
            name: 'UART1',
            instance: 'USART1',
            status: 'configured',
            settings: {
              baudRate: '115200',
              parity: 'None',
              stopBits: '1',
              dataSize: '8 bits',
              flowControl: 'None'
            }
          },
          {
            name: 'SPI2',
            instance: 'SPI2',
            status: 'configured',
            settings: {
              mode: 'Master',
              clockPolarity: 'Low',
              clockPhase: '1 Edge',
              dataSize: '8 bits',
              nssMode: 'Software'
            }
          }
        ],
        pinAssignments: [
          { name: 'PA9', function: 'UART1_TX', peripheral: 'UART1', mode: 'Alternate Function', status: 'ok' },
          { name: 'PA10', function: 'UART1_RX', peripheral: 'UART1', mode: 'Alternate Function', status: 'ok' },
          { name: 'PB13', function: 'SPI2_SCK', peripheral: 'SPI2', mode: 'Alternate Function', status: 'ok' },
          { name: 'PB14', function: 'SPI2_MISO', peripheral: 'SPI2', mode: 'Alternate Function', status: 'ok' },
          { name: 'PB15', function: 'SPI2_MOSI', peripheral: 'SPI2', mode: 'Alternate Function', status: 'ok' }
        ],
        generatedCode: `/* USER CODE BEGIN Includes */\n#include "main.h"\n/* USER CODE END Includes */\n\n/* Private variables */\nUART_HandleTypeDef huart1;\nSPI_HandleTypeDef hspi2;\n\n/* USER CODE BEGIN PV */\n/* USER CODE END PV */\n\nvoid SystemClock_Config(void);\nstatic void MX_GPIO_Init(void);\nstatic void MX_USART1_UART_Init(void);\nstatic void MX_SPI2_Init(void);\n\nint main(void)\n{\n  /* USER CODE BEGIN 1 */\n  /* USER CODE END 1 */\n\n  HAL_Init();\n  SystemClock_Config();\n  MX_GPIO_Init();\n  MX_USART1_UART_Init();\n  MX_SPI2_Init();\n\n  /* USER CODE BEGIN 2 */\n  /* USER CODE END 2 */\n\n  while (1)\n  {\n    /* USER CODE BEGIN 3 */\n    /* USER CODE END 3 */\n  }\n}`
      },
      {
        id: 'config-002',
        name: 'ADC_PWM_Motor_Control',
        chipType: 'STM32F103C8',
        projectName: 'Motor Controller',
        description: 'Advanced motor control configuration with ADC feedback and PWM generation for precise speed control.',
        version: '2.1.3',
        createdDate: '2025-01-10T09:15:00Z',
        lastModified: '2025-01-29T16:45:00Z',
        isTemplate: true,
        isArchived: false,
        peripherals: ['ADC1', 'TIM1', 'TIM3', 'GPIO'],
        pinCount: 8,
        codeLines: 312,
        memoryUsage: 24.2,
        peripheralDetails: [
          {
            name: 'ADC1',
            instance: 'ADC1',
            status: 'configured',
            settings: {
              resolution: '12 bits',
              samplingTime: '55.5 cycles',
              conversionMode: 'Continuous',
              channels: '3'
            }
          },
          {
            name: 'TIM1',
            instance: 'TIM1',
            status: 'warning',
            settings: {
              prescaler: '72',
              period: '1000',
              mode: 'PWM Generation',
              channels: '2'
            }
          }
        ],
        pinAssignments: [
          { name: 'PA0', function: 'ADC1_IN0', peripheral: 'ADC1', mode: 'Analog', status: 'ok' },
          { name: 'PA1', function: 'ADC1_IN1', peripheral: 'ADC1', mode: 'Analog', status: 'ok' },
          { name: 'PA8', function: 'TIM1_CH1', peripheral: 'TIM1', mode: 'Alternate Function', status: 'ok' },
          { name: 'PA9', function: 'TIM1_CH2', peripheral: 'TIM1', mode: 'Alternate Function', status: 'conflict' }
        ],
        generatedCode: `/* USER CODE BEGIN Includes */\n#include "main.h"\n/* USER CODE END Includes */\n\n/* Private variables */\nADC_HandleTypeDef hadc1;\nTIM_HandleTypeDef htim1;\nTIM_HandleTypeDef htim3;\n\n/* USER CODE BEGIN PV */\nuint16_t adc_values[3];\nfloat motor_speed = 0.0f;\n/* USER CODE END PV */\n\nvoid SystemClock_Config(void);\nstatic void MX_GPIO_Init(void);\nstatic void MX_ADC1_Init(void);\nstatic void MX_TIM1_Init(void);\nstatic void MX_TIM3_Init(void);\n\nint main(void)\n{\n  HAL_Init();\n  SystemClock_Config();\n  MX_GPIO_Init();\n  MX_ADC1_Init();\n  MX_TIM1_Init();\n  MX_TIM3_Init();\n\n  HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adc_values, 3);\n  HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);\n  HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_2);\n\n  while (1)\n  {\n    motor_speed = (float)adc_values[0] / 4095.0f * 100.0f;\n    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, (uint16_t)(motor_speed * 10));\n    HAL_Delay(10);\n  }\n}`
      },
      {
        id: 'config-003',
        name: 'I2C_RTC_Display_System',
        chipType: 'STM32L476RG',
        projectName: 'Smart Clock',
        description: 'Low-power I2C configuration for RTC and OLED display with battery backup support.',
        version: '1.0.5',
        createdDate: '2025-01-20T11:00:00Z',
        lastModified: '2025-01-30T08:30:00Z',
        isTemplate: false,
        isArchived: false,
        peripherals: ['I2C1', 'RTC', 'GPIO', 'PWR'],
        pinCount: 6,
        codeLines: 189,
        memoryUsage: 12.8,
        peripheralDetails: [
          {
            name: 'I2C1',
            instance: 'I2C1',
            status: 'configured',
            settings: {
              clockSpeed: '400000',
              addressingMode: '7-bit',
              dutyCycle: '2',
              ownAddress: '0x00'
            }
          },
          {
            name: 'RTC',
            instance: 'RTC',
            status: 'configured',
            settings: {
              clockSource: 'LSE',
              format: '24 Hour',
              asyncPrediv: '127',
              syncPrediv: '255'
            }
          }
        ],
        pinAssignments: [
          { name: 'PB8', function: 'I2C1_SCL', peripheral: 'I2C1', mode: 'Alternate Function', status: 'ok' },
          { name: 'PB9', function: 'I2C1_SDA', peripheral: 'I2C1', mode: 'Alternate Function', status: 'ok' },
          { name: 'PC13', function: 'GPIO_Output', peripheral: 'GPIO', mode: 'Output', status: 'ok' }
        ],
        generatedCode: `/* USER CODE BEGIN Includes */\n#include "main.h"\n#include "rtc.h"\n/* USER CODE END Includes */\n\n/* Private variables */\nI2C_HandleTypeDef hi2c1;\nRTC_HandleTypeDef hrtc;\n\n/* USER CODE BEGIN PV */\nRTC_TimeTypeDef sTime = {0};\nRTC_DateTypeDef sDate = {0};\n/* USER CODE END PV */\n\nvoid SystemClock_Config(void);\nstatic void MX_GPIO_Init(void);\nstatic void MX_I2C1_Init(void);\nstatic void MX_RTC_Init(void);\n\nint main(void)\n{\n  HAL_Init();\n  SystemClock_Config();\n  MX_GPIO_Init();\n  MX_I2C1_Init();\n  MX_RTC_Init();\n\n  while (1)\n  {\n    HAL_RTC_GetTime(&hrtc, &sTime, RTC_FORMAT_BIN);\n    HAL_RTC_GetDate(&hrtc, &sDate, RTC_FORMAT_BIN);\n    \n    // Display time on OLED via I2C\n    HAL_Delay(1000);\n  }\n}`
      },
      {
        id: 'config-004',
        name: 'CAN_USB_Gateway',
        chipType: 'STM32F407VG',
        projectName: 'Vehicle Gateway',
        description: 'CAN to USB gateway configuration for automotive diagnostics and data logging applications.',
        version: '3.0.1',
        createdDate: '2025-01-05T14:20:00Z',
        lastModified: '2025-01-25T12:15:00Z',
        isTemplate: true,
        isArchived: false,
        peripherals: ['CAN1', 'USB_OTG_FS', 'GPIO', 'TIM4'],
        pinCount: 10,
        codeLines: 428,
        memoryUsage: 32.1,
        peripheralDetails: [
          {
            name: 'CAN1',
            instance: 'CAN1',
            status: 'configured',
            settings: {
              baudRate: '500000',
              mode: 'Normal',
              sjw: '1',
              bs1: '6',
              bs2: '1'
            }
          },
          {
            name: 'USB_OTG_FS',
            instance: 'USB_OTG_FS',
            status: 'configured',
            settings: {
              deviceClass: 'CDC',
              speed: 'Full Speed',
              vbusDetection: 'Enabled',
              sofOutput: 'Disabled'
            }
          }
        ],
        pinAssignments: [
          { name: 'PD0', function: 'CAN1_RX', peripheral: 'CAN1', mode: 'Alternate Function', status: 'ok' },
          { name: 'PD1', function: 'CAN1_TX', peripheral: 'CAN1', mode: 'Alternate Function', status: 'ok' },
          { name: 'PA11', function: 'USB_OTG_FS_DM', peripheral: 'USB_OTG_FS', mode: 'Alternate Function', status: 'ok' },
          { name: 'PA12', function: 'USB_OTG_FS_DP', peripheral: 'USB_OTG_FS', mode: 'Alternate Function', status: 'ok' }
        ],
        generatedCode: `/* USER CODE BEGIN Includes */\n#include "main.h"\n#include "usb_device.h"\n#include "usbd_cdc_if.h"\n/* USER CODE END Includes */\n\n/* Private variables */\nCAN_HandleTypeDef hcan1;\nCAN_TxHeaderTypeDef TxHeader;\nCAN_RxHeaderTypeDef RxHeader;\nuint32_t TxMailbox;\nuint8_t TxData[8];\nuint8_t RxData[8];\n\n/* USER CODE BEGIN PV */\n/* USER CODE END PV */\n\nvoid SystemClock_Config(void);\nstatic void MX_GPIO_Init(void);\nstatic void MX_CAN1_Init(void);\n\nint main(void)\n{\n  HAL_Init();\n  SystemClock_Config();\n  MX_GPIO_Init();\n  MX_CAN1_Init();\n  MX_USB_DEVICE_Init();\n\n  HAL_CAN_Start(&hcan1);\n  HAL_CAN_ActivateNotification(&hcan1, CAN_IT_RX_FIFO0_MSG_PENDING);\n\n  while (1)\n  {\n    // CAN to USB gateway logic\n    HAL_Delay(1);\n  }\n}`
      },
      {
        id: 'config-005',
        name: 'DMA_Multi_Channel_ADC',
        chipType: 'STM32H743VI',
        projectName: 'Data Acquisition',
        description: 'High-speed multi-channel ADC with DMA for data acquisition system with circular buffer.',
        version: '1.5.2',
        createdDate: '2025-01-12T16:45:00Z',
        lastModified: '2025-01-29T10:20:00Z',
        isTemplate: false,
        isArchived: true,
        peripherals: ['ADC1', 'ADC2', 'DMA1', 'TIM6', 'GPIO'],
        pinCount: 16,
        codeLines: 356,
        memoryUsage: 45.7,
        peripheralDetails: [
          {
            name: 'ADC1',
            instance: 'ADC1',
            status: 'configured',
            settings: {
              resolution: '16 bits',
              samplingTime: '2.5 cycles',
              conversionMode: 'Continuous',
              channels: '8'
            }
          },
          {
            name: 'DMA1',
            instance: 'DMA1_Stream0',
            status: 'configured',
            settings: {
              direction: 'Peripheral to Memory',
              mode: 'Circular',
              dataWidth: '16 bits',
              priority: 'High'
            }
          }
        ],
        pinAssignments: [
          { name: 'PA0', function: 'ADC1_INP16', peripheral: 'ADC1', mode: 'Analog', status: 'ok' },
          { name: 'PA1', function: 'ADC1_INP17', peripheral: 'ADC1', mode: 'Analog', status: 'ok' },
          { name: 'PA2', function: 'ADC1_INP14', peripheral: 'ADC1', mode: 'Analog', status: 'ok' },
          { name: 'PA3', function: 'ADC1_INP15', peripheral: 'ADC1', mode: 'Analog', status: 'ok' }
        ],
        generatedCode: `/* USER CODE BEGIN Includes */\n#include "main.h"\n/* USER CODE END Includes */\n\n/* Private variables */\nADC_HandleTypeDef hadc1;\nADC_HandleTypeDef hadc2;\nDMA_HandleTypeDef hdma_adc1;\nTIM_HandleTypeDef htim6;\n\n/* USER CODE BEGIN PV */\n#define ADC_BUFFER_SIZE 1024\nuint16_t adc_buffer[ADC_BUFFER_SIZE];\nvolatile uint8_t adc_conversion_complete = 0;\n/* USER CODE END PV */\n\nvoid SystemClock_Config(void);\nstatic void MX_GPIO_Init(void);\nstatic void MX_DMA_Init(void);\nstatic void MX_ADC1_Init(void);\nstatic void MX_ADC2_Init(void);\nstatic void MX_TIM6_Init(void);\n\nint main(void)\n{\n  HAL_Init();\n  SystemClock_Config();\n  MX_GPIO_Init();\n  MX_DMA_Init();\n  MX_ADC1_Init();\n  MX_ADC2_Init();\n  MX_TIM6_Init();\n\n  HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adc_buffer, ADC_BUFFER_SIZE);\n  HAL_TIM_Base_Start(&htim6);\n\n  while (1)\n  {\n    if (adc_conversion_complete)\n    {\n      // Process ADC data\n      adc_conversion_complete = 0;\n    }\n    HAL_Delay(1);\n  }\n}`
      }
    ];

    setConfigurations(mockConfigurations);
    // Auto-select first configuration for demo
    setSelectedConfig(mockConfigurations[0]);
  }, []);

  const handleSelectConfig = (config) => {
    setSelectedConfig(config);
    if (isCompareMode) {
      handleCompareToggle(config);
    }
  };

  const handleCompareToggle = (config) => {
    setSelectedForComparison(prev => {
      if (prev.includes(config.id)) {
        return prev.filter(id => id !== config.id);
      } else if (prev.length < 4) { // Limit to 4 configurations for comparison
        return [...prev, config.id];
      }
      return prev;
    });
  };

  const handleCompareConfigurations = () => {
    const configsToCompare = configurations.filter(config => 
      selectedForComparison.includes(config.id)
    );
    setShowComparison(true);
  };

  const handleDeleteConfig = (config) => {
    if (window.confirm(`Are you sure you want to delete "${config.name}"?`)) {
      setConfigurations(prev => prev.filter(c => c.id !== config.id));
      if (selectedConfig?.id === config.id) {
        setSelectedConfig(null);
      }
    }
  };

  const handleDuplicateConfig = (config) => {
    const duplicatedConfig = {
      ...config,
      id: `${config.id}-copy-${Date.now()}`,
      name: `${config.name} (Copy)`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    setConfigurations(prev => [duplicatedConfig, ...prev]);
  };

  const handleRenameConfig = (config) => {
    const newName = prompt('Enter new name:', config.name);
    if (newName && newName.trim()) {
      setConfigurations(prev => prev.map(c => 
        c.id === config.id 
          ? { ...c, name: newName.trim(), lastModified: new Date().toISOString() }
          : c
      ));
      if (selectedConfig?.id === config.id) {
        setSelectedConfig(prev => ({ ...prev, name: newName.trim() }));
      }
    }
  };

  const handleImport = (source) => {
    if (source instanceof File) {
      // Handle file upload
      console.log('Importing file:', source.name);
    } else {
      // Handle other import sources
      console.log('Importing from:', source);
    }
    // Mock import success
    alert('Configuration imported successfully!');
  };

  const handleExport = (format) => {
    console.log('Exporting as:', format);
    // Mock export
    alert(`Configuration exported as ${format.toUpperCase()}!`);
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName && folderName.trim()) {
      console.log('Creating folder:', folderName);
      alert(`Folder "${folderName}" created successfully!`);
    }
  };

  const handleEditConfig = (config) => {
    navigate('/peripheral-configuration-editor', { 
      state: { configurationId: config.id } 
    });
  };

  const handleSave = () => {
    console.log('Saving current state...');
    alert('Configuration saved successfully!');
  };

  const handleValidate = () => {
    console.log('Validating configurations...');
    alert('Validation completed - 2 warnings found');
  };

  const handleExportCurrent = () => {
    if (selectedConfig) {
      handleExport('json');
    } else {
      alert('Please select a configuration to export');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <ConfigurationContextHeader
        peripheralType="Configuration Manager"
        peripheralInstance="Import/Export"
        configurationStatus="ready"
        validationErrors={0}
        onSave={handleSave}
        onValidate={handleValidate}
        onExport={handleExportCurrent}
      />

      <div className="pt-28">
        <ImportExportToolbar
          onImport={handleImport}
          onExport={handleExport}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          isCompareMode={isCompareMode}
          onToggleCompareMode={() => setIsCompareMode(!isCompareMode)}
          selectedForComparison={selectedForComparison}
          onCompareConfigurations={handleCompareConfigurations}
          onCreateFolder={handleCreateFolder}
        />

        <div className="flex h-[calc(100vh-200px)]">
          {/* Left Pane - File Browser */}
          <div className="w-full lg:w-2/5 border-r border-border">
            <FileTreeBrowser
              configurations={configurations}
              selectedConfig={selectedConfig}
              onSelectConfig={handleSelectConfig}
              onDeleteConfig={handleDeleteConfig}
              onDuplicateConfig={handleDuplicateConfig}
              onRenameConfig={handleRenameConfig}
              searchQuery={searchQuery}
              onCreateFolder={handleCreateFolder}
            />
          </div>

          {/* Right Pane - Configuration Preview */}
          <div className="hidden lg:block lg:w-3/5">
            <ConfigurationPreview
              selectedConfig={selectedConfig}
              onExport={handleExportCurrent}
              onEdit={handleEditConfig}
              onCompare={handleCompareToggle}
              isCompareMode={isCompareMode}
              selectedForComparison={selectedForComparison}
            />
          </div>
        </div>

        {/* Mobile Preview - Overlay */}
        {selectedConfig && (
          <div className="lg:hidden fixed inset-0 bg-background z-1010 pt-28">
            <div className="h-full">
              <ConfigurationPreview
                selectedConfig={selectedConfig}
                onExport={handleExportCurrent}
                onEdit={handleEditConfig}
                onCompare={handleCompareToggle}
                isCompareMode={isCompareMode}
                selectedForComparison={selectedForComparison}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              onClick={() => setSelectedConfig(null)}
              className="fixed top-32 left-4 z-1020"
            >
              Back to Files
            </Button>
          </div>
        )}

        {/* Quick Action Toolbar */}
        <QuickActionToolbar
          onSave={handleSave}
          onExport={handleExportCurrent}
          onImport={() => document.getElementById('file-upload')?.click()}
          onValidate={handleValidate}
          onReset={() => console.log('Reset')}
          onUndo={() => console.log('Undo')}
          onRedo={() => console.log('Redo')}
          canUndo={false}
          canRedo={false}
          isSaving={false}
          isExporting={false}
          isValidating={false}
          hasUnsavedChanges={false}
          className="hidden lg:block fixed bottom-6 left-1/2 transform -translate-x-1/2"
        />

        {/* Configuration Comparison Modal */}
        {showComparison && (
          <ConfigurationComparison
            configurations={configurations.filter(config => 
              selectedForComparison.includes(config.id)
            )}
            onClose={() => setShowComparison(false)}
            onSelectForEdit={handleEditConfig}
          />
        )}
      </div>
    </div>
  );
};

export default ConfigurationImportExportManager;