import React from 'react';
import Button from '../../../../components/ui/Button';

/**
 * @module ZoomControls
 */

/**
 * A set of controls for managing the zoom level of a view.
 * It includes buttons for zooming in, zooming out, and resetting the zoom.
 *
 * @param {object} props - The properties for the component.
 * @param {number} props.zoomLevel - The current zoom level.
 * @param {Function} props.onZoomIn - Callback function to handle zooming in.
 * @param {Function} props.onZoomOut - Callback function to handle zooming out.
 * @param {Function} props.onZoomReset - Callback function to reset the zoom level.
 * @param {string} [props.className=""] - Additional CSS classes for the component's container.
 * @returns {JSX.Element} The rendered zoom controls component.
 */
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