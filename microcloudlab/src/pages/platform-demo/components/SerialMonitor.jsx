import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SerialMonitor = ({ isRunning, selectedProject }) => {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [baudRate, setBaudRate] = useState(9600);
  const outputRef = useRef(null);

  const mockOutputs = {
    'led-blink': [
      { timestamp: new Date(), type: 'info', message: 'Initializing LED Blink Project...' },
      { timestamp: new Date(Date.now() + 1000), type: 'success', message: 'Setup complete. Starting main loop.' },
      { timestamp: new Date(Date.now() + 2000), type: 'data', message: 'LED ON' },
      { timestamp: new Date(Date.now() + 3000), type: 'data', message: 'LED OFF' },
      { timestamp: new Date(Date.now() + 4000), type: 'data', message: 'LED ON' },
      { timestamp: new Date(Date.now() + 5000), type: 'data', message: 'LED OFF' }
    ],
    'sensor-reading': [
      { timestamp: new Date(), type: 'info', message: 'Temperature Sensor Reading Started...' },
      { timestamp: new Date(Date.now() + 1000), type: 'success', message: 'DHT22 sensor initialized' },
      { timestamp: new Date(Date.now() + 2000), type: 'data', message: 'Temperature: 23.5°C, Humidity: 45.2%' },
      { timestamp: new Date(Date.now() + 5000), type: 'data', message: 'Temperature: 23.7°C, Humidity: 45.8%' },
      { timestamp: new Date(Date.now() + 8000), type: 'data', message: 'Temperature: 23.4°C, Humidity: 44.9%' }
    ],
    'iot-connectivity': [
      { timestamp: new Date(), type: 'info', message: 'IoT Connectivity Demo Starting...' },
      { timestamp: new Date(Date.now() + 1000), type: 'info', message: 'Connecting to WiFi...' },
      { timestamp: new Date(Date.now() + 3000), type: 'success', message: 'WiFi connected! IP: 192.168.1.100' },
      { timestamp: new Date(Date.now() + 4000), type: 'info', message: 'Connecting to MQTT broker...' },
      { timestamp: new Date(Date.now() + 6000), type: 'success', message: 'MQTT connected successfully' },
      { timestamp: new Date(Date.now() + 7000), type: 'data', message: 'Publishing sensor data: {"temp":24.1,"humidity":46.3}' },
      { timestamp: new Date(Date.now() + 10000), type: 'data', message: 'Message published to topic: sensors/data' }
    ]
  };

  useEffect(() => {
    if (isRunning && selectedProject) {
      setIsConnected(true);
      setOutput([]);
      
      const projectOutputs = mockOutputs[selectedProject.id] || mockOutputs['led-blink'];
      
      projectOutputs.forEach((outputItem, index) => {
        setTimeout(() => {
          setOutput(prev => [...prev, {
            ...outputItem,
            timestamp: new Date(),
            id: Date.now() + index
          }]);
        }, index * 2000);
      });
    } else {
      setIsConnected(false);
    }
  }, [isRunning, selectedProject]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleSendCommand = () => {
    if (input.trim() && isConnected) {
      setOutput(prev => [...prev, {
        id: Date.now(),
        timestamp: new Date(),
        type: 'command',
        message: `> ${input}`
      }]);
      
      // Mock response
      setTimeout(() => {
        setOutput(prev => [...prev, {
          id: Date.now() + 1,
          timestamp: new Date(),
          type: 'response',
          message: `Command received: ${input}`
        }]);
      }, 500);
      
      setInput('');
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'command': return 'text-accent';
      case 'response': return 'text-primary';
      case 'data': return 'text-text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'command': return 'Terminal';
      case 'response': return 'ArrowLeft';
      case 'data': return 'Activity';
      default: return 'Info';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Terminal" size={18} className="text-primary" />
          <div>
            <h3 className="font-semibold text-text-primary">Serial Monitor</h3>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-error'}`}></div>
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              <span>•</span>
              <span>{baudRate} baud</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={baudRate} 
            onChange={(e) => setBaudRate(Number(e.target.value))}
            className="text-xs bg-background border border-border rounded px-2 py-1 text-text-primary"
          >
            <option value={9600}>9600</option>
            <option value={19200}>19200</option>
            <option value={38400}>38400</option>
            <option value={57600}>57600</option>
            <option value={115200}>115200</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            onClick={clearOutput}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Output Area */}
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 bg-background/50 font-code text-sm"
      >
        {output.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text-secondary">
            <div className="text-center">
              <Icon name="Terminal" size={32} className="mx-auto mb-2 opacity-50" />
              <p>Serial monitor ready</p>
              <p className="text-xs mt-1">Run your code to see output here</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {output.map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <span className="text-xs text-text-secondary font-mono">
                  {item.timestamp.toLocaleTimeString()}
                </span>
                <Icon 
                  name={getMessageIcon(item.type)} 
                  size={12} 
                  className={`mt-0.5 ${getMessageColor(item.type)}`} 
                />
                <span className={`flex-1 ${getMessageColor(item.type)}`}>
                  {item.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
            placeholder={isConnected ? "Send command to device..." : "Connect to device first"}
            disabled={!isConnected}
            className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-code"
          />
          <Button
            variant="primary"
            size="sm"
            iconName="Send"
            onClick={handleSendCommand}
            disabled={!isConnected || !input.trim()}
            className="bg-accent hover:bg-accent/90"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SerialMonitor;