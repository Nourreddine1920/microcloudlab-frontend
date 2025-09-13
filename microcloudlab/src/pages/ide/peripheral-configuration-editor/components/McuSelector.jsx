import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { MCU_SPECIFICATIONS } from '../../context/McuContext';

const McuSelector = ({ onSelect, currentMcu }) => {
    const [loading, setLoading] = useState(false);
    
    const mcuList = Object.values(MCU_SPECIFICATIONS);

    const handleSelect = async (mcu) => {
        setLoading(true);
        try {
            await onSelect(mcu);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {mcuList.map((mcu) => (
                <div
                    key={mcu.id}
                    className={`p-4 border rounded-lg transition-all ${
                        currentMcu?.id === mcu.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-card hover:border-primary/50'
                    }`}
                >
                    <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-lg border border-border overflow-hidden">
                            <img
                                src={mcu.image}
                                alt={mcu.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">{mcu.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                {mcu.specs}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {mcu.peripherals.slice(0, 3).map((peripheral) => (
                                    <span
                                        key={peripheral}
                                        className="px-2 py-0.5 text-xs bg-muted rounded-full"
                                    >
                                        {peripheral}
                                    </span>
                                ))}
                                {mcu.peripherals.length > 3 && (
                                    <span className="px-2 py-0.5 text-xs bg-muted rounded-full">
                                        +{mcu.peripherals.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button
                            onClick={() => handleSelect(mcu)}
                            disabled={loading}
                            variant={currentMcu?.id === mcu.id ? "secondary" : "default"}
                            fullWidth
                        >
                            {currentMcu?.id === mcu.id ? 'Selected' : 'Select MCU'}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default McuSelector;
