import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { peripheralService } from '../../../services/peripheralService';
import Button from '../../../components/ui/Button';

/**
 * @module PeripheralCommunicationDashboard
 */

/**
 * A dashboard for monitoring and viewing peripheral communication data.
 * It displays the most recent communication event and a history of communications,
 * which can be filtered by peripheral type.
 *
 * @returns {JSX.Element} The rendered peripheral communication dashboard.
 */
const PeripheralCommunicationDashboard = () => {
    const navigate = useNavigate();
    const [lastData, setLastData] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('all');

    const peripheralTypes = ['UART', 'SPI', 'I2C', 'PWM', 'GPIO', 'ADC', 'DAC', 'CAN', 'USB', 'WIFI', 'BLUETOOTH'];

    const loadLastData = async () => {
        try {
            setLoading(true);
            const response = await peripheralService.getLastPeripheralData();
            setLastData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load last peripheral data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadHistory = async () => {
        try {
            setLoading(true);
            const response = await peripheralService.getPeripheralHistory();
            setHistory(response.data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load peripheral history');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadFilteredData = async (type) => {
        if (type === 'all') {
            loadHistory();
        } else {
            try {
                setLoading(true);
                const response = await peripheralService.getPeripheralDataByType(type);
                setHistory(response.data || []);
                setError(null);
            } catch (err) {
                setError(`Failed to load ${type} data`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadLastData();
        loadHistory();
    }, []);

    const formatTimestamp = (timestamp) => {
        try {
            const date = new Date(JSON.parse(timestamp));
            return date.toLocaleString();
        } catch {
            return timestamp;
        }
    };

    const getPeripheralIcon = (type) => {
        const icons = {
            UART: '📡',
            SPI: '🔄',
            I2C: '🔗',
            PWM: '📊',
            GPIO: '📌',
            ADC: '📈',
            DAC: '📉',
            CAN: '🚗',
            USB: '🔌',
            WIFI: '📶',
            BLUETOOTH: '🔵'
        };
        return icons[type] || '⚙️';
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Peripheral Communication Dashboard</h1>
                <div className="flex space-x-2">
                    <Button onClick={loadLastData} disabled={loading}>
                        {loading ? 'Loading...' : 'Refresh Last'}
                    </Button>
                    <Button onClick={loadHistory} disabled={loading}>
                        {loading ? 'Loading...' : 'Refresh History'}
                    </Button>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowLeft"
                    onClick={() => navigate('/ide/integrated')}
                >
                    Back to IDE
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    iconName="Layout"
                    onClick={() => navigate('/ide/peripheral-configuration-dashboard')}
                >
                    Dashboard
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    iconName="CheckCircle"
                    onClick={() => navigate('/ide/configuration-validation-conflicts')}
                >
                    Validate
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    iconName="Cpu"
                    onClick={() => navigate('/ide/pin-assignment-visualizer')}
                >
                    Pin Mapping
                </Button>
            </div>

            {/* Filter by peripheral type */}
            <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Filter by type:</label>
                <select
                    value={selectedType}
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                        loadFilteredData(e.target.value);
                    }}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                >
                    <option value="all">All Types</option>
                    {peripheralTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded text-sm text-error">
                    {error}
                </div>
            )}

            {/* Last peripheral data */}
            {lastData && (
                <div className="bg-card border border-border rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                        {getPeripheralIcon(lastData.peripheral_type)} Last Communication
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Type:</p>
                            <p className="font-medium">{lastData.peripheral_type}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Instance:</p>
                            <p className="font-medium">{lastData.instance}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">MCU:</p>
                            <p className="font-medium">{lastData.mcu_id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Data Length:</p>
                            <p className="font-medium">{lastData.data_length} bytes</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm text-muted-foreground">Timestamp:</p>
                            <p className="font-medium">{formatTimestamp(lastData.timestamp)}</p>
                        </div>
                    </div>
                    {lastData.hex_data && lastData.hex_data !== 'No raw data' && (
                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">Hex Data:</p>
                            <div className="font-mono text-sm bg-muted p-2 rounded break-all">
                                {lastData.hex_data}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Communication history */}
            <div className="bg-card border border-border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Communication History ({history.length} entries)</h2>
                {history.length === 0 ? (
                    <p className="text-muted-foreground">No communication history available.</p>
                ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {history.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded border">
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">{getPeripheralIcon(entry.peripheral_type)}</span>
                                    <div>
                                        <p className="font-medium">{entry.peripheral_type} - {entry.instance}</p>
                                        <p className="text-sm text-muted-foreground">
                                            MCU: {entry.mcu_id} • {entry.data_length} bytes • {formatTimestamp(entry.timestamp)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-mono text-muted-foreground">
                                        {entry.hex_data && entry.hex_data !== 'No raw data' 
                                            ? entry.hex_data.substring(0, 20) + '...'
                                            : 'No raw data'
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PeripheralCommunicationDashboard;
