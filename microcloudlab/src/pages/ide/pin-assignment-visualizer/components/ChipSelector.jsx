import React, { useState } from 'react';
import Select from '../../../../components/ui/Select';
import Icon from '../../../../components/AppIcon';

const ChipSelector = ({ selectedChip, onChipChange, className = "" }) => {
  const chipOptions = [
    { 
      value: 'stm32f103c8t6', 
      label: 'STM32F103C8T6',
      description: '48-pin LQFP, ARM Cortex-M3, 64KB Flash'
    },
    { 
      value: 'stm32f407vgt6', 
      label: 'STM32F407VGT6',
      description: '100-pin LQFP, ARM Cortex-M4, 1MB Flash'
    },
    { 
      value: 'stm32f429zit6', 
      label: 'STM32F429ZIT6',
      description: '144-pin LQFP, ARM Cortex-M4, 2MB Flash'
    },
    { 
      value: 'stm32l476rgt6', 
      label: 'STM32L476RGT6',
      description: '64-pin LQFP, ARM Cortex-M4, 1MB Flash, Ultra-low-power'
    },
    { 
      value: 'stm32h743vit6', 
      label: 'STM32H743VIT6',
      description: '100-pin LQFP, ARM Cortex-M7, 2MB Flash, High Performance'
    }
  ];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <Icon name="Cpu" size={20} className="text-primary" />
        <span className="text-body-sm font-medium text-foreground">Chip:</span>
      </div>
      
      <div className="min-w-80">
        <Select
          options={chipOptions}
          value={selectedChip}
          onChange={onChipChange}
          placeholder="Select STM32 chip"
          searchable
          className="w-full"
        />
      </div>
      
      <div className="flex items-center space-x-1 text-muted-foreground">
        <Icon name="Info" size={16} />
        <span className="text-caption">Package view available</span>
      </div>
    </div>
  );
};

export default ChipSelector;