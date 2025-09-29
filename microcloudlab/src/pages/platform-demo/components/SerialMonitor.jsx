import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module SerialMonitor
 */

/**
 * A component that simulates a serial monitor for viewing output from and sending commands to a running project.
 * It displays timestamped messages with different types (info, success, error, data, command, response)
 * and provides an input field for sending commands.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isRunning - A flag indicating if a project is currently running, which activates the monitor.
 * @param {object|null} props.selectedProject - The currently selected project object, used to source the appropriate mock output.
 * @returns {JSX.Element} The rendered serial monitor component.
 */
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
      case 'success': return 'text-success-400';
      case 'error': return 'text-error-400';
      case 'warning': return 'text-warning-400';
      case 'command': return 'text-accent-400';
      case 'response': return 'text-primary-400';
      case 'data': return 'text-gray-200';
      default: return 'text-gray-400';
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'command': return 'ChevronsRight';
      case 'response': return 'ChevronsLeft';
      case 'data': return 'Code';
      default: return 'Info';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-border h-full flex flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800/50 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Terminal" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-white">Serial Monitor</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
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
            className="text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white focus:ring-primary focus:border-primary"
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
            className="text-xs !border-gray-600 hover:!bg-gray-700"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Output Area */}
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 bg-black/30 font-mono text-sm"
      >
        {output.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Icon name="Terminal" size={32} className="mx-auto mb-2 opacity-50" />
              <p>Serial monitor ready</p>
              <p className="text-xs mt-1">Run your code to see output here</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            {output.map((item) => (
              <div key={item.id} className="flex items-start space-x-3">
                <span className="text-xs text-gray-600">
                  {item.timestamp.toLocaleTimeString()}
                </span>
                <Icon 
                  name={getMessageIcon(item.type)} 
                  size={14}
                  className={`mt-0.5 ${getMessageColor(item.type)}`} 
                />
                <span className={`flex-1 ${getMessageColor(item.type)} whitespace-pre-wrap`}>
                  {item.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-700 bg-gray-800/50 rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
            placeholder={isConnected ? "Send command to device..." : "Connect to device first"}
            disabled={!isConnected}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-mono"
          />
          <Button
            variant="primary"
            size="sm"
            iconName="Send"
            onClick={handleSendCommand}
            disabled={!isConnected || !input.trim()}
            className="bg-accent hover:bg-accent/90 text-black"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SerialMonitor;