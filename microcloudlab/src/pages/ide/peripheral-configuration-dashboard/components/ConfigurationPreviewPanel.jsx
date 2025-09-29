import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

/**
 * @module ConfigurationPreviewPanel
 */

/**
 * A collapsible side panel that provides a preview of the current microcontroller configuration.
 * It includes tabs to display the configuration in different formats like JSON,
 * generated C code, and a pin map.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isCollapsed - A flag indicating whether the panel is collapsed.
 * @param {Function} props.onToggle - A callback function to toggle the collapsed state of the panel.
 * @returns {JSX.Element} The rendered configuration preview panel.
 */
const ConfigurationPreviewPanel = ({ isCollapsed, onToggle }) => {
  const [activeTab, setActiveTab] = useState('json');

  const mockConfiguration = {
    "stm32_config": {
      "mcu": "STM32F407VGT6",
      "clock": {
        "hse": "8MHz",
        "pll": {
          "m": 8,
          "n": 336,
          "p": 2,
          "q": 7
        },
        "sysclk": "168MHz"
      },
      "peripherals": {
        "UART1": {
          "baud_rate": 115200,
          "data_bits": 8,
          "parity": "none",
          "stop_bits": 1,
          "flow_control": "none",
          "pins": {
            "tx": "PA9",
            "rx": "PA10"
          }
        },
        "SPI1": {
          "mode": "master",
          "clock_polarity": "low",
          "clock_phase": "1edge",
          "data_size": "8bit",
          "pins": {
            "sck": "PA5",
            "miso": "PA6",
            "mosi": "PA7",
            "nss": "PA4"
          }
        },
        "GPIO": {
          "PA0": {
            "mode": "input",
            "pull": "pullup",
            "speed": "low"
          },
          "PC13": {
            "mode": "output",
            "type": "push_pull",
            "speed": "medium"
          }
        }
      },
      "generated_at": "2025-07-30T13:52:51.684Z"
    }
  };

  const codeSnippet = `/* STM32F407VGT6 Configuration */
#include "stm32f4xx_hal.h"

/* UART1 Configuration */
UART_HandleTypeDef huart1;

void MX_UART1_Init(void) {
  huart1.Instance = USART1;
  huart1.Init.BaudRate = 115200;
  huart1.Init.WordLength = UART_WORDLENGTH_8B;
  huart1.Init.StopBits = UART_STOPBITS_1;
  huart1.Init.Parity = UART_PARITY_NONE;
  huart1.Init.Mode = UART_MODE_TX_RX;
  huart1.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  
  if (HAL_UART_Init(&huart1) != HAL_OK) {
    Error_Handler();
  }
}

/* SPI1 Configuration */
SPI_HandleTypeDef hspi1;

void MX_SPI1_Init(void) {
  hspi1.Instance = SPI1;
  hspi1.Init.Mode = SPI_MODE_MASTER;
  hspi1.Init.Direction = SPI_DIRECTION_2LINES;
  hspi1.Init.DataSize = SPI_DATASIZE_8BIT;
  hspi1.Init.CLKPolarity = SPI_POLARITY_LOW;
  hspi1.Init.CLKPhase = SPI_PHASE_1EDGE;
  hspi1.Init.NSS = SPI_NSS_SOFT;
  
  if (HAL_SPI_Init(&hspi1) != HAL_OK) {
    Error_Handler();
  }
}`;

  const tabs = [
    { id: 'json', label: 'JSON Config', icon: 'FileText' },
    { id: 'code', label: 'C Code', icon: 'Code' },
    { id: 'pinout', label: 'Pin Map', icon: 'Map' }
  ];

  if (isCollapsed) {
    return (
      <div className="fixed top-20 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronLeft"
          onClick={onToggle}
          className="bg-card shadow-card"
        >
          Preview
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-16 right-0 w-96 h-full bg-card border-l border-border z-40 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-heading-sm font-heading">Configuration Preview</h2>
        <Button variant="ghost" size="sm" iconName="ChevronRight" onClick={onToggle} />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 py-2 text-body-sm transition-micro ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={14} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'json' && (
          <div className="h-full overflow-y-auto">
            <pre className="p-4 text-data text-xs text-foreground bg-muted/30 h-full overflow-auto">
              {JSON.stringify(mockConfiguration, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="h-full overflow-y-auto">
            <pre className="p-4 text-data text-xs text-foreground bg-muted/30 h-full overflow-auto">
              {codeSnippet}
            </pre>
          </div>
        )}

        {activeTab === 'pinout' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="space-y-3">
              <div className="text-body-sm font-medium mb-3">Active Pin Assignments</div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-body-sm font-medium">PA9</span>
                  <span className="text-caption text-muted-foreground">UART1_TX</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-body-sm font-medium">PA10</span>
                  <span className="text-caption text-muted-foreground">UART1_RX</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-body-sm font-medium">PA5</span>
                  <span className="text-caption text-muted-foreground">SPI1_SCK</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-body-sm font-medium">PA6</span>
                  <span className="text-caption text-muted-foreground">SPI1_MISO</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-body-sm font-medium">PA7</span>
                  <span className="text-caption text-muted-foreground">SPI1_MOSI</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" iconName="Map" fullWidth>
                  View Full Pin Map
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="default" size="sm" iconName="Download" fullWidth>
          Export Configuration
        </Button>
        <Button variant="outline" size="sm" iconName="Copy" fullWidth>
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
};

export default ConfigurationPreviewPanel;