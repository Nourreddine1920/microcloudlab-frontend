import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module VirtualOscilloscope
 */

/**
 * A component that simulates a virtual oscilloscope to visualize waveforms from a running project.
 * It uses the HTML5 Canvas API to draw a grid and the waveform, which is generated based on the selected project.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isRunning - A flag indicating if a project is currently running, which activates the oscilloscope.
 * @param {object|null} props.selectedProject - The currently selected project object, used to determine the type of waveform to display.
 * @returns {JSX.Element} The rendered virtual oscilloscope component.
 */
const VirtualOscilloscope = ({ isRunning, selectedProject }) => {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [voltage, setVoltage] = useState(0);
  const [frequency, setFrequency] = useState(1);
  const [timeScale, setTimeScale] = useState(1);
  const [voltageScale, setVoltageScale] = useState(5);
  const animationRef = useRef(null);
  const dataPoints = useRef([]);

  useEffect(() => {
    if (isRunning && selectedProject) {
      setIsActive(true);
      startOscilloscope();
    } else {
      setIsActive(false);
      stopOscilloscope();
    }
    
    return () => stopOscilloscope();
  }, [isRunning, selectedProject]);

  const startOscilloscope = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let time = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      drawGrid(ctx, width, height);

      // Generate waveform based on selected project
      const waveform = generateWaveform(selectedProject?.id || 'led-blink', time);
      
      // Draw waveform
      drawWaveform(ctx, waveform, width, height);
      
      // Update voltage display
      setVoltage(waveform[waveform.length - 1] || 0);
      
      time += 0.1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const stopOscilloscope = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas.width, canvas.height);
    }
  };

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= width; x += width / 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += height / 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Center lines (brighter)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    
    // Center horizontal
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Center vertical
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
  };

  const generateWaveform = (projectId, time) => {
    const points = [];
    const numPoints = 200;
    
    for (let i = 0; i < numPoints; i++) {
      const t = (time + i * 0.05) * frequency;
      let value = 0;
      
      switch (projectId) {
        case 'led-blink':
          // Square wave for LED blinking
          value = Math.sin(t) > 0 ? 5 : 0;
          break;
        case 'sensor-reading':
          // Noisy sine wave for sensor data
          value = 2.5 + 2 * Math.sin(t) + 0.3 * Math.sin(t * 5) + 0.1 * (Math.random() - 0.5);
          break;
        case 'iot-connectivity':
          // Complex waveform for IoT data transmission
          value = 2.5 + 1.5 * Math.sin(t) + 0.8 * Math.sin(t * 3) + 0.4 * Math.sin(t * 7);
          break;
        default:
          value = 2.5 + 2 * Math.sin(t);
      }
      
      points.push(Math.max(0, Math.min(5, value)));
    }
    
    return points;
  };

  const drawWaveform = (ctx, waveform, width, height) => {
    if (waveform.length === 0) return;

    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    
    waveform.forEach((value, index) => {
      const x = (index / waveform.length) * width;
      const y = height - (value / voltageScale) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const getProjectWaveformInfo = (projectId) => {
    switch (projectId) {
      case 'led-blink':
        return {
          signal: 'Digital Output (Pin 13)',
          type: 'Square Wave',
          description: 'LED switching between HIGH (5V) and LOW (0V)'
        };
      case 'sensor-reading':
        return {
          signal: 'Analog Input (Pin A0)',
          type: 'Analog Signal',
          description: 'Temperature sensor voltage output with noise'
        };
      case 'iot-connectivity':
        return {
          signal: 'Communication Bus',
          type: 'Complex Waveform',
          description: 'WiFi/MQTT data transmission patterns'
        };
      default:
        return {
          signal: 'No Signal',
          type: 'Idle',
          description: 'Select and run a project to see waveforms'
        };
    }
  };

  const waveformInfo = getProjectWaveformInfo(selectedProject?.id);

  return (
    <div className="bg-surface rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={18} className="text-accent" />
          <div>
            <h3 className="font-semibold text-text-primary">Virtual Oscilloscope</h3>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-accent pulse-glow' : 'bg-text-secondary'}`}></div>
              <span>{isActive ? 'Active' : 'Standby'}</span>
              <span>•</span>
              <span>{waveformInfo.signal}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            className="text-xs"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Oscilloscope Display */}
      <div className="flex-1 p-4">
        <div className="bg-black rounded-lg border-2 border-accent/20 h-full relative overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="w-full h-full"
            style={{ imageRendering: 'pixelated' }}
          />
          
          {/* Voltage Indicator */}
          <div className="absolute top-4 right-4 bg-black/80 rounded px-3 py-2 border border-accent/30">
            <div className="text-accent font-code text-lg font-bold">
              {voltage.toFixed(2)}V
            </div>
            <div className="text-xs text-text-secondary">Current</div>
          </div>
          
          {/* Signal Info */}
          <div className="absolute bottom-4 left-4 bg-black/80 rounded px-3 py-2 border border-accent/30">
            <div className="text-accent text-sm font-medium">{waveformInfo.type}</div>
            <div className="text-xs text-text-secondary">{waveformInfo.description}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-border bg-background/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Time Scale</label>
            <select 
              value={timeScale}
              onChange={(e) => setTimeScale(Number(e.target.value))}
              className="w-full text-xs bg-background border border-border rounded px-2 py-1 text-text-primary"
            >
              <option value={0.5}>0.5s/div</option>
              <option value={1}>1s/div</option>
              <option value={2}>2s/div</option>
              <option value={5}>5s/div</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-text-secondary mb-1">Voltage Scale</label>
            <select 
              value={voltageScale}
              onChange={(e) => setVoltageScale(Number(e.target.value))}
              className="w-full text-xs bg-background border border-border rounded px-2 py-1 text-text-primary"
            >
              <option value={1}>1V/div</option>
              <option value={2}>2V/div</option>
              <option value={5}>5V/div</option>
              <option value={10}>10V/div</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-text-secondary mb-1">Frequency</label>
            <select 
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full text-xs bg-background border border-border rounded px-2 py-1 text-text-primary"
            >
              <option value={0.5}>0.5 Hz</option>
              <option value={1}>1 Hz</option>
              <option value={2}>2 Hz</option>
              <option value={5}>5 Hz</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button
              variant={isActive ? "primary" : "outline"}
              size="sm"
              iconName={isActive ? "Pause" : "Play"}
              iconPosition="left"
              fullWidth
              onClick={() => isActive ? stopOscilloscope() : startOscilloscope()}
              className="text-xs"
            >
              {isActive ? 'Pause' : 'Start'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualOscilloscope;