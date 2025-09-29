import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Select from '../../../../components/ui/Select';

/**
 * @module ValidationFilters
 */

/**
 * A component that provides a set of filters for validation issues.
 * It allows users to filter issues by search query, severity, peripheral,
 * status, and other attributes.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.filters - An object containing the current filter values.
 * @param {Function} props.onFiltersChange - Callback function to update the filters.
 * @param {Function} props.onClearFilters - Callback function to clear all active filters.
 * @param {number} props.issueCount - The number of issues found with the current filters.
 * @returns {JSX.Element} The rendered validation filters component.
 */
const ValidationFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  issueCount 
}) => {
  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical Errors' },
    { value: 'warning', label: 'Warnings' },
    { value: 'info', label: 'Information' }
  ];

  const peripheralOptions = [
    { value: 'all', label: 'All Peripherals' },
    { value: 'GPIO', label: 'GPIO' },
    { value: 'UART', label: 'UART' },
    { value: 'SPI', label: 'SPI' },
    { value: 'I2C', label: 'I2C' },
    { value: 'Timer', label: 'Timer' },
    { value: 'ADC', label: 'ADC' },
    { value: 'PWM', label: 'PWM' },
    { value: 'CAN', label: 'CAN' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'unresolved', label: 'Unresolved' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'ignored', label: 'Ignored' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = filters.search || 
    filters.severity !== 'all' || 
    filters.peripheral !== 'all' || 
    filters.status !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="text-heading-sm font-medium">Filter Issues</h3>
          <span className="text-caption text-muted-foreground">
            ({issueCount} issues found)
          </span>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search issues by description, peripheral, or pin..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Severity Filter */}
        <Select
          options={severityOptions}
          value={filters.severity}
          onChange={(value) => handleFilterChange('severity', value)}
          placeholder="Filter by severity"
        />

        {/* Peripheral Filter */}
        <Select
          options={peripheralOptions}
          value={filters.peripheral}
          onChange={(value) => handleFilterChange('peripheral', value)}
          placeholder="Filter by peripheral"
        />
      </div>

      {/* Secondary Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Filter by status"
        />

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-body-sm">
            <input
              type="checkbox"
              checked={filters.showResolved}
              onChange={(e) => handleFilterChange('showResolved', e.target.checked)}
              className="rounded border-border"
            />
            <span>Show resolved issues</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-body-sm">
            <input
              type="checkbox"
              checked={filters.autoFixable}
              onChange={(e) => handleFilterChange('autoFixable', e.target.checked)}
              className="rounded border-border"
            />
            <span>Auto-fixable only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ValidationFilters;