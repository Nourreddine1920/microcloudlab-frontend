import React, { useState, useEffect } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const CodePreviewPanel = ({ formData, peripheralType = 'UART' }) => {
  const [activeTab, setActiveTab] = useState('config');
  const [copied, setCopied] = useState(false);

  const generateConfigCode = () => {
    return `/* STM32 ${peripheralType} Configuration */
#include "stm32f4xx_hal.h"

${peripheralType}_HandleTypeDef h${formData.instance?.toLowerCase() || 'uart1'};

void ${peripheralType}_Init(void)
{
  h${formData.instance?.toLowerCase() || 'uart1'}.Instance = ${formData.instance || 'UART1'};
  h${formData.instance?.toLowerCase() || 'uart1'}.Init.BaudRate = ${formData.baudRate || '115200'};
  h${formData.instance?.toLowerCase() || 'uart1'}.Init.WordLength = UART_WORDLENGTH_${formData.dataBits || '8'}B;
  h${formData.instance?.toLowerCase() || 'uart1'}.Init.StopBits = UART_STOPBITS_${formData.stopBits === '2' ? '2' : '1'};
  h${formData.instance?.toLowerCase() || 'uart1'}.Init.Parity = UART_PARITY_${formData.parity?.toUpperCase() || 'NONE'};
  h${formData.instance?.toLowerCase() || 'uart1'}.Init.Mode = UART_MODE_TX_RX;
  h${formData.instance?.toLowerCase() || 'uart1'}.Init.HwFlowCtl = UART_HWCONTROL_${formData.flowControl?.toUpperCase().replace('_', '_') || 'NONE'};
  h${formData.instance?.toLowerCase() || 'uart1'}.Init.OverSampling = UART_OVERSAMPLING_${formData.oversampling || '16'};
  
  if (HAL_UART_Init(&h${formData.instance?.toLowerCase() || 'uart1'}) != HAL_OK)
  {
    Error_Handler();
  }
}

void HAL_UART_MspInit(UART_HandleTypeDef* huart)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};
  
  if(huart->Instance == ${formData.instance || 'UART1'})
  {
    /* Peripheral clock enable */
    __HAL_RCC_${formData.instance || 'UART1'}_CLK_ENABLE();
    __HAL_RCC_GPIOA_CLK_ENABLE();
    
    /* GPIO Configuration */
    GPIO_InitStruct.Pin = GPIO_PIN_${formData.txPin?.slice(-1) || '9'}|GPIO_PIN_${formData.rxPin?.slice(-1) || '10'};
    GPIO_InitStruct.Mode = GPIO_MODE_AF_PP;
    GPIO_InitStruct.Pull = GPIO_${formData.pullResistor?.toUpperCase() || 'NOPULL'};
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_${formData.gpioSpeed?.toUpperCase() || 'HIGH'};
    GPIO_InitStruct.Alternate = GPIO_AF7_${formData.instance || 'UART1'};
    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
    
    ${formData.interruptEnable ? `/* UART interrupt Init */
    HAL_NVIC_SetPriority(${formData.instance || 'UART1'}_IRQn, 0, 0);
    HAL_NVIC_EnableIRQ(${formData.instance || 'UART1'}_IRQn);` : ''}
  }
}`;
  };

  const generateJsonConfig = () => {
    const config = {
      peripheral: peripheralType,
      instance: formData.instance || 'UART1',
      timestamp: new Date().toISOString(),
      configuration: {
        basic: {
          baudRate: parseInt(formData.baudRate) || 115200,
          dataBits: parseInt(formData.dataBits) || 8,
          parity: formData.parity || 'none',
          stopBits: parseFloat(formData.stopBits) || 1,
          flowControl: formData.flowControl || 'none'
        },
        advanced: {
          txBufferSize: parseInt(formData.txBufferSize) || 256,
          rxBufferSize: parseInt(formData.rxBufferSize) || 256,
          dmaEnable: formData.dmaEnable || false,
          interruptEnable: formData.interruptEnable !== false,
          autoBaud: formData.autoBaud || false,
          oversampling: parseInt(formData.oversampling) || 16
        },
        pins: {
          tx: formData.txPin || 'PA9',
          rx: formData.rxPin || 'PA10',
          rts: formData.rtsPin || null,
          cts: formData.ctsPin || null,
          gpioSpeed: formData.gpioSpeed || 'high',
          pullResistor: formData.pullResistor || 'none'
        }
      }
    };

    return JSON.stringify(config, null, 2);
  };

  const generateMakefileConfig = () => {
    return `# STM32 ${peripheralType} Makefile Configuration
# Generated on ${new Date().toLocaleDateString()}

# Peripheral Configuration
PERIPHERAL_${peripheralType} = 1
${formData.instance || 'UART1'}_ENABLED = 1

# Baud Rate Configuration
${formData.instance || 'UART1'}_BAUD_RATE = ${formData.baudRate || '115200'}

# Feature Flags
${formData.dmaEnable ? `${formData.instance || 'UART1'}_DMA_ENABLED = 1` : ''}
${formData.interruptEnable !== false ? `${formData.instance || 'UART1'}_IRQ_ENABLED = 1` : ''}

# Pin Definitions
${formData.instance || 'UART1'}_TX_PIN = ${formData.txPin || 'PA9'}
${formData.instance || 'UART1'}_RX_PIN = ${formData.rxPin || 'PA10'}

# Compiler Flags
CFLAGS += -DUSE_${formData.instance || 'UART1'}
CFLAGS += -D${formData.instance || 'UART1'}_BAUD=${formData.baudRate || '115200'}

# Source Files
SOURCES += src/uart_config.c
SOURCES += src/uart_driver.c

# Include Paths
INCLUDES += -Iinc/uart`;
  };

  const tabs = [
    { id: 'config', label: 'C Code', icon: 'Code' },
    { id: 'json', label: 'JSON', icon: 'FileText' },
    { id: 'makefile', label: 'Makefile', icon: 'Settings' }
  ];

  const getActiveContent = () => {
    switch (activeTab) {
      case 'config':
        return generateConfigCode();
      case 'json':
        return generateJsonConfig();
      case 'makefile':
        return generateMakefileConfig();
      default:
        return generateConfigCode();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getActiveContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadFile = () => {
    const content = getActiveContent();
    const extensions = { config: 'c', json: 'json', makefile: 'mk' };
    const filename = `${peripheralType.toLowerCase()}_config.${extensions[activeTab]}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={18} className="text-primary" />
          <h3 className="text-heading-sm">Code Preview</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={copied ? 'Check' : 'Copy'}
            onClick={copyToClipboard}
            className={copied ? 'text-success' : ''}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            onClick={downloadFile}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 text-body-sm transition-micro ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={14} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-hidden">
        <pre className="h-full overflow-auto p-4 text-data text-sm bg-muted/30 text-foreground">
          <code>{getActiveContent()}</code>
        </pre>
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-2 bg-muted border-t border-border">
        <div className="flex items-center justify-between text-caption text-muted-foreground">
          <span>Lines: {getActiveContent().split('\n').length}</span>
          <span>Size: {new Blob([getActiveContent()]).size} bytes</span>
          <span>Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CodePreviewPanel;