import React from 'react';
import Button from '../../../components/ui/Button';


const ZoomControls = ({ zoomLevel, onZoomIn, onZoomOut, onZoomReset, className = "" }) => {
  const zoomPercentage = Math.round(zoomLevel * 100);

  return (
    <div className={`flex items-center space-x-1 bg-card border border-border rounded-lg p-1 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        iconName="ZoomOut"
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.5}
        title="Zoom out"
      />
      
      <div className="flex items-center justify-center min-w-16 px-2">
        <span className="text-body-sm font-medium text-foreground">
          {zoomPercentage}%
        </span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        iconName="ZoomIn"
        onClick={onZoomIn}
        disabled={zoomLevel >= 3}
        title="Zoom in"
      />
      
      <div className="w-px h-6 bg-border mx-1" />
      
      <Button
        variant="ghost"
        size="sm"
        iconName="RotateCcw"
        onClick={onZoomReset}
        title="Reset zoom"
      />
    </div>
  );
};

export default ZoomControls;