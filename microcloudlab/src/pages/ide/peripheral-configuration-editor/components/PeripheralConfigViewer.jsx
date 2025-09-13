import React, { useState, useEffect } from 'react';
import { peripheralService } from '../../../../services/peripheralService';
import { useMcu } from '../../context/McuContext';
import Button from '../../../../components/ui/Button';

const PeripheralConfigViewer = ({ peripheralType, config, instance }) => {
    const { selectedMcu } = useMcu();
    const [frameData, setFrameData] = useState(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (config && peripheralType) {
            try {
                const frame = peripheralService.packPeripheralConfiguration(peripheralType, config);
                setFrameData(peripheralService.formatFrame(frame));
            } catch (err) {
                console.error(`Failed to pack ${peripheralType} configuration:`, err);
                setError(`Failed to pack ${peripheralType} configuration: ${err.message}`);
            }
        }
    }, [config, peripheralType]);

    const handleSend = async () => {
        setSending(true);
        setError(null);
        try {
            const mcuId = selectedMcu?.id || 'unknown';
            await peripheralService.sendPeripheralConfiguration(
                peripheralType, 
                instance, 
                mcuId, 
                config
            );
            console.log(`${peripheralType} configuration sent successfully`);
        } catch (err) {
            setError(err.message);
            console.error(`Failed to send ${peripheralType} configuration:`, err);
        } finally {
            setSending(false);
        }
    };

    if (!frameData) return null;

    return (
        <div className="space-y-4 p-4 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{peripheralType} Configuration Frame</h3>
            
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground w-24">Start:</span>
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{frameData.start}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground w-24">Command:</span>
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{frameData.command}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground w-24">Length:</span>
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{frameData.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground w-24">Data:</span>
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded break-all">{frameData.data}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground w-24">End:</span>
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{frameData.end}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
                <div className="text-sm font-medium mb-2">Complete Frame:</div>
                <div className="text-sm font-mono bg-muted p-2 rounded break-all">
                    {frameData.full}
                </div>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded text-sm text-error">
                    {error}
                </div>
            )}

            <div className="mt-4 flex justify-end">
                <Button 
                    onClick={handleSend}
                    disabled={sending}
                    variant="primary"
                    size="lg"
                    className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    {sending ? (
                        <>
                            <span className="animate-spin">⟳</span>
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <span>📡</span>
                            <span>Send to Board</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default PeripheralConfigViewer;
