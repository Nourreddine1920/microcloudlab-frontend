import React, { useState, useRef, useEffect } from 'react';


/**
 * @module MicrocontrollerDiagram
 */

/**
 * A component that renders an interactive SVG diagram of a microcontroller.
 * It visualizes the chip, its pins, their status, and assignments. It supports
 * panning and zooming for easier navigation.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.selectedChip - The ID of the currently selected chip.
 * @param {Array<object>} props.pins - An array of pin objects to be rendered on the diagram.
 * @param {object|null} props.selectedPin - The currently selected pin object.
 * @param {Function} props.onPinSelect - A callback function to be executed when a pin is selected.
 * @param {string} props.viewMode - The current view mode (not directly used in this component but passed for context).
 * @param {number} props.zoomLevel - The current zoom level of the diagram.
 * @param {Function} props.onZoomChange - A callback function to update the zoom level.
 * @param {string} [props.className=""] - Additional CSS classes for the component's container.
 * @returns {JSX.Element} The rendered interactive microcontroller diagram.
 */
const MicrocontrollerDiagram = ({ 
  selectedChip, 
  pins, 
  selectedPin, 
  onPinSelect, 
  viewMode,
  zoomLevel,
  onZoomChange,
  className = "" 
}) => {
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const getChipDimensions = (chip) => {
    switch (chip) {
      case 'stm32f103c8t6': return { width: 400, height: 300, pins: 48 };
      case 'stm32f407vgt6': return { width: 500, height: 400, pins: 100 };
      case 'stm32f429zit6': return { width: 600, height: 500, pins: 144 };
      case 'stm32l476rgt6': return { width: 450, height: 350, pins: 64 };
      case 'stm32h743vit6': return { width: 500, height: 400, pins: 100 };
      default: return { width: 400, height: 300, pins: 48 };
    }
  };

  const chipDimensions = getChipDimensions(selectedChip);

  const getPinColor = (pin) => {
    switch (pin.status) {
      case 'configured': return '#059669'; // success
      case 'conflict': return '#DC2626'; // error
      case 'available': return '#64748B'; // muted
      case 'reserved': return '#0EA5E9'; // accent
      default: return '#64748B';
    }
  };

  const generatePinLayout = (totalPins, width, height) => {
    const pinsPerSide = Math.ceil(totalPins / 4);
    const pinSpacing = Math.min(width / (pinsPerSide + 1), height / (pinsPerSide + 1));
    const pinSize = Math.min(pinSpacing * 0.6, 12);
    const layout = [];

    // Top side
    for (let i = 0; i < pinsPerSide && layout.length < totalPins; i++) {
      layout.push({
        x: (width / (pinsPerSide + 1)) * (i + 1),
        y: 0,
        side: 'top',
        pinSize
      });
    }

    // Right side
    for (let i = 0; i < pinsPerSide && layout.length < totalPins; i++) {
      layout.push({
        x: width,
        y: (height / (pinsPerSide + 1)) * (i + 1),
        side: 'right',
        pinSize
      });
    }

    // Bottom side
    for (let i = pinsPerSide - 1; i >= 0 && layout.length < totalPins; i--) {
      layout.push({
        x: (width / (pinsPerSide + 1)) * (i + 1),
        y: height,
        side: 'bottom',
        pinSize
      });
    }

    // Left side
    for (let i = pinsPerSide - 1; i >= 0 && layout.length < totalPins; i--) {
      layout.push({
        x: 0,
        y: (height / (pinsPerSide + 1)) * (i + 1),
        side: 'left',
        pinSize
      });
    }

    return layout;
  };

  const pinLayout = generatePinLayout(chipDimensions.pins, chipDimensions.width, chipDimensions.height);

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'circle') return; // Don't pan when clicking pins
    setIsPanning(true);
    setLastPanPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    
    const deltaX = e.clientX - lastPanPoint.x;
    const deltaY = e.clientY - lastPanPoint.y;
    
    setPanOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setLastPanPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(3, zoomLevel + delta));
    onZoomChange(newZoom);
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('wheel', handleWheel, { passive: false });
      return () => svg.removeEventListener('wheel', handleWheel);
    }
  }, [zoomLevel]);

  const viewBoxWidth = chipDimensions.width + 100;
  const viewBoxHeight = chipDimensions.height + 100;

  return (
    <div className={`flex-1 bg-background border border-border rounded-lg overflow-hidden ${className}`}>
      <div className="h-full flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-4xl max-h-3xl">
          <svg
            ref={svgRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            viewBox={`${-50 + panOffset.x / zoomLevel} ${-50 + panOffset.y / zoomLevel} ${viewBoxWidth / zoomLevel} ${viewBoxHeight / zoomLevel}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Chip Body */}
            <rect
              x="0"
              y="0"
              width={chipDimensions.width}
              height={chipDimensions.height}
              fill="var(--color-card)"
              stroke="var(--color-border)"
              strokeWidth="2"
              rx="8"
            />

            {/* Chip Label */}
            <text
              x={chipDimensions.width / 2}
              y={chipDimensions.height / 2 - 10}
              textAnchor="middle"
              className="fill-foreground text-lg font-heading"
            >
              {selectedChip?.toUpperCase() || 'STM32'}
            </text>

            <text
              x={chipDimensions.width / 2}
              y={chipDimensions.height / 2 + 10}
              textAnchor="middle"
              className="fill-muted-foreground text-sm"
            >
              {chipDimensions.pins} pins
            </text>

            {/* Pin 1 Indicator */}
            <circle
              cx="20"
              cy="20"
              r="4"
              fill="var(--color-warning)"
              stroke="var(--color-card)"
              strokeWidth="1"
            />

            {/* Pins */}
            {pins.slice(0, chipDimensions.pins).map((pin, index) => {
              const layout = pinLayout[index];
              if (!layout) return null;

              const isSelected = selectedPin?.id === pin.id;
              const pinColor = getPinColor(pin);

              return (
                <g key={pin.id}>
                  {/* Pin Circle */}
                  <circle
                    cx={layout.x}
                    cy={layout.y}
                    r={layout.pinSize}
                    fill={pinColor}
                    stroke={isSelected ? 'var(--color-primary)' : 'var(--color-card)'}
                    strokeWidth={isSelected ? 3 : 1}
                    className="cursor-pointer hover:stroke-primary transition-all duration-200"
                    onClick={() => onPinSelect(pin)}
                  />

                  {/* Pin Label */}
                  <text
                    x={layout.x + (layout.side === 'left' ? -layout.pinSize - 5 : 
                                   layout.side === 'right' ? layout.pinSize + 5 : 0)}
                    y={layout.y + (layout.side === 'top' ? -layout.pinSize - 5 : 
                                   layout.side === 'bottom' ? layout.pinSize + 15 : 4)}
                    textAnchor={layout.side === 'left' ? 'end' : 
                               layout.side === 'right' ? 'start' : 'middle'}
                    className="fill-foreground text-xs font-medium pointer-events-none"
                  >
                    {pin.name}
                  </text>

                  {/* Assignment Label */}
                  {pin.currentAssignment && (
                    <text
                      x={layout.x + (layout.side === 'left' ? -layout.pinSize - 5 : 
                                     layout.side === 'right' ? layout.pinSize + 5 : 0)}
                      y={layout.y + (layout.side === 'top' ? -layout.pinSize - 15 : 
                                     layout.side === 'bottom' ? layout.pinSize + 25 : 12)}
                      textAnchor={layout.side === 'left' ? 'end' : 
                                 layout.side === 'right' ? 'start' : 'middle'}
                      className="fill-muted-foreground text-xs pointer-events-none"
                    >
                      {pin.currentAssignment}
                    </text>
                  )}

                  {/* Conflict Indicator */}
                  {pin.status === 'conflict' && (
                    <circle
                      cx={layout.x + layout.pinSize * 0.7}
                      cy={layout.y - layout.pinSize * 0.7}
                      r="3"
                      fill="var(--color-error)"
                      stroke="var(--color-card)"
                      strokeWidth="1"
                      className="pointer-events-none"
                    />
                  )}
                </g>
              );
            })}

            {/* Grid (optional, for alignment) */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.1" />
          </svg>

          {/* Zoom Level Indicator */}
          <div className="absolute top-4 left-4 bg-card border border-border rounded-lg px-3 py-1">
            <span className="text-caption text-muted-foreground">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3">
            <div className="text-caption font-medium mb-2">Pin Status</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-caption">Configured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <span className="text-caption">Conflict</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                <span className="text-caption">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-caption">Reserved</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 max-w-xs">
            <div className="text-caption font-medium mb-1">Instructions</div>
            <div className="text-caption text-muted-foreground space-y-1">
              <div>• Click pins to select and configure</div>
              <div>• Drag to pan, scroll to zoom</div>
              <div>• Red pins indicate conflicts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicrocontrollerDiagram;