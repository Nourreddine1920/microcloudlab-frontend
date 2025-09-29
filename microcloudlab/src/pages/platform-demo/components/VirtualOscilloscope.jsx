import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

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
      ctx.fillStyle = '#0f172a'; // slate-900
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
      ctx.fillStyle = '#0f172a'; // slate-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas.width, canvas.height);
    }
  };

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
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
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
    ctx.lineWidth = 1;
    
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
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
    ctx.shadowBlur = 12;

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
    <div className="bg-gray-900 rounded-lg border border-border h-full flex flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800/50 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={20} className="text-accent" />
          <div>
            <h3 className="font-semibold text-white">Virtual Oscilloscope</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-accent pulse-glow' : 'bg-gray-500'}`}></div>
              <span>{isActive ? 'Active' : 'Standby'}</span>
              <span>•</span>
              <span className="truncate max-w-[150px]">{waveformInfo.signal}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            className="text-xs !border-gray-600 hover:!bg-gray-700"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Oscilloscope Display */}
      <div className="flex-1 p-4 bg-black/30">
        <div className="bg-slate-900 rounded-md h-full relative overflow-hidden border border-gray-700">
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="w-full h-full"
            style={{ imageRendering: 'pixelated' }}
          />
          
          {/* Voltage Indicator */}
          <div className="absolute top-3 right-3 bg-slate-800/70 backdrop-blur-sm rounded-md px-3 py-1.5 border border-accent/20">
            <div className="text-accent font-mono text-xl font-bold tracking-wider">
              {voltage.toFixed(2)}V
            </div>
            <div className="text-xs text-gray-400 text-right">Live</div>
          </div>
          
          {/* Signal Info */}
          <div className="absolute bottom-3 left-3 bg-slate-800/70 backdrop-blur-sm rounded-md px-3 py-1.5 border border-accent/20">
            <div className="text-accent text-sm font-semibold">{waveformInfo.type}</div>
            <div className="text-xs text-gray-400 truncate max-w-[250px]">{waveformInfo.description}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 border-t border-gray-700 bg-gray-800/50 rounded-b-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Time Scale</label>
            <select 
              value={timeScale}
              onChange={(e) => setTimeScale(Number(e.target.value))}
              className="w-full text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-white focus:ring-primary focus:border-primary"
            >
              <option value={0.5}>0.5s/div</option>
              <option value={1}>1s/div</option>
              <option value={2}>2s/div</option>
              <option value={5}>5s/div</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-1">Voltage Scale</label>
            <select 
              value={voltageScale}
              onChange={(e) => setVoltageScale(Number(e.target.value))}
              className="w-full text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-white focus:ring-primary focus:border-primary"
            >
              <option value={1}>1V/div</option>
              <option value={2}>2V/div</option>
              <option value={5}>5V/div</option>
              <option value={10}>10V/div</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-1">Frequency</label>
            <select 
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full text-xs bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-white focus:ring-primary focus:border-primary"
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
              iconName={isActive ? "PauseCircle" : "PlayCircle"}
              iconPosition="left"
              fullWidth
              onClick={() => isActive ? stopOscilloscope() : startOscilloscope()}
              className={`text-xs ${isActive ? 'bg-accent hover:bg-accent/90 text-black' : '!border-gray-600 hover:!bg-gray-700'}`}
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