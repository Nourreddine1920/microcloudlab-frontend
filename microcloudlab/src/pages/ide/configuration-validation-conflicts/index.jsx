import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/ui/Header';
import ConfigurationContextHeader from '../../../components/ui/ConfigurationContextHeader';
import ValidationStatusIndicator from '../../../components/ui/ValidationStatusIndicator';
import QuickActionToolbar from '../../../components/ui/QuickActionToolbar';
import ValidationStatusHeader from './components/ValidationStatusHeader';
import ValidationSummaryCard from './components/ValidationSummaryCard';
import ValidationFilters from './components/ValidationFilters';
import IssueListItem from './components/IssueListItem';
import BulkActionsPanel from './components/BulkActionsPanel';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module ConfigurationValidationConflicts
 */

/**
 * A comprehensive page for displaying and managing configuration validation issues and conflicts.
 * It provides a dashboard view with summaries, filtering capabilities, a detailed issue list,
 * and bulk action controls to help users identify and resolve problems in their
 * microcontroller configuration.
 *
 * @returns {JSX.Element} The rendered configuration validation and conflicts page.
 */
const ConfigurationValidationConflicts = () => {
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [expandedIssues, setExpandedIssues] = useState(new Set());
  const [filters, setFilters] = useState({
    search: '',
    severity: 'all',
    peripheral: 'all',
    status: 'all',
    showResolved: false,
    autoFixable: false
  });

  // Mock validation data
  const mockIssues = [
    {
      id: 'VAL_001',
      title: 'GPIO Pin Conflict on PA0',
      description: 'Pin PA0 is configured for both UART1_TX and ADC1_IN0, causing a hardware conflict.',
      severity: 'critical',
      peripheral: 'GPIO',
      affectedPin: 'PA0',
      status: 'unresolved',
      autoFixable: false,
      lastDetected: new Date(Date.now() - 300000),
      impact: 'UART communication will fail and ADC readings will be unreliable. This conflict prevents proper hardware initialization.',
      configurationLink: '/peripheral-configuration-editor?peripheral=GPIO&pin=PA0',
      details: {
        register: 'GPIOA_MODER',
        expected: '0x00000001',
        current: '0x00000003'
      },
      resolution: {
        description: 'Reassign either UART1_TX or ADC1_IN0 to a different pin to resolve the conflict.',
        steps: [
          'Review pin assignment requirements for both peripherals',
          'Select alternative pins from the STM32 datasheet',
          'Update peripheral configuration to use non-conflicting pins',
          'Verify no new conflicts are introduced'
        ]
      }
    },
    {
      id: 'VAL_002',
      title: 'SPI Clock Speed Warning',
      description: 'SPI1 clock frequency (42MHz) exceeds recommended maximum for selected slave device.',
      severity: 'warning',
      peripheral: 'SPI',
      affectedPin: 'PA5',
      status: 'unresolved',
      autoFixable: true,
      lastDetected: new Date(Date.now() - 600000),
      impact: 'Communication errors may occur at high frequencies. Data integrity could be compromised.',
      configurationLink: '/peripheral-configuration-editor?peripheral=SPI&instance=SPI1',
      details: {
        register: 'SPI1_CR1',
        expected: '≤21MHz',
        current: '42MHz'
      },
      resolution: {
        description: 'Reduce SPI clock frequency to match slave device specifications.',
        steps: [
          'Check slave device datasheet for maximum clock frequency',
          'Adjust SPI prescaler to reduce clock speed',
          'Test communication at reduced frequency'
        ]
      }
    },
    {
      id: 'VAL_003',
      title: 'I2C Pull-up Resistor Missing',
      description: 'I2C1 pins (PB6, PB7) are configured without external pull-up resistors.',
      severity: 'warning',
      peripheral: 'I2C',
      affectedPin: 'PB6, PB7',
      status: 'unresolved',
      autoFixable: false,
      lastDetected: new Date(Date.now() - 900000),
      impact: 'I2C communication may be unreliable or fail completely without proper pull-up resistors.',
      configurationLink: '/peripheral-configuration-editor?peripheral=I2C&instance=I2C1',
      details: {
        register: 'I2C1_CR1',
        expected: 'External pull-ups required',
        current: 'No pull-ups detected'
      },
      resolution: {
        description: 'Add external pull-up resistors (typically 4.7kΩ) to I2C lines or enable internal pull-ups.',
        steps: [
          'Add 4.7kΩ resistors from SDA/SCL to VCC',
          'Or enable internal pull-ups in GPIO configuration',
          'Verify I2C signal integrity with oscilloscope'
        ]
      }
    },
    {
      id: 'VAL_004',
      title: 'Timer Overflow Risk',
      description: 'Timer2 configuration may cause overflow with current prescaler and period settings.',
      severity: 'info',
      peripheral: 'Timer',
      affectedPin: 'N/A',
      status: 'unresolved',
      autoFixable: true,
      lastDetected: new Date(Date.now() - 1200000),
      impact: 'Timer may not achieve desired timing accuracy. Overflow interrupts may occur unexpectedly.',
      configurationLink: '/peripheral-configuration-editor?peripheral=Timer&instance=TIM2',
      details: {
        register: 'TIM2_ARR',
        expected: '< 65535',
        current: '72000'
      },
      resolution: {
        description: 'Adjust prescaler value to prevent overflow while maintaining timing accuracy.',
        steps: [
          'Calculate required timer frequency',
          'Adjust prescaler to fit within 16-bit range',
          'Verify timing accuracy meets requirements'
        ]
      }
    },
    {
      id: 'VAL_005',
      title: 'ADC Reference Voltage Mismatch',
      description: 'ADC1 reference voltage (3.3V) does not match configured input range (0-5V).',
      severity: 'critical',
      peripheral: 'ADC',
      affectedPin: 'PA1',
      status: 'unresolved',
      autoFixable: false,
      lastDetected: new Date(Date.now() - 1500000),
      impact: 'ADC readings will be inaccurate and may damage the microcontroller if input exceeds 3.3V.',
      configurationLink: '/peripheral-configuration-editor?peripheral=ADC&instance=ADC1',
      details: {
        register: 'ADC1_CR2',
        expected: 'VREF = Input Range',
        current: 'VREF=3.3V, Input=5V'
      },
      resolution: {
        description: 'Either reduce input voltage range or use external voltage divider to scale inputs.',
        steps: [
          'Add voltage divider circuit (R1=1kΩ, R2=2kΩ)',
          'Or change input signal range to 0-3.3V',
          'Update software scaling factors accordingly'
        ]
      }
    },
    {
      id: 'VAL_006',
      title: 'UART Baud Rate Accuracy',
      description: 'UART2 baud rate error (2.1%) exceeds recommended tolerance for reliable communication.',
      severity: 'warning',
      peripheral: 'UART',
      affectedPin: 'PA2, PA3',
      status: 'resolved',
      autoFixable: true,
      lastDetected: new Date(Date.now() - 1800000),
      impact: 'Communication errors may occur, especially with longer data transmissions.',
      configurationLink: '/peripheral-configuration-editor?peripheral=UART&instance=UART2',
      details: {
        register: 'USART2_BRR',
        expected: '±1% error',
        current: '2.1% error'
      },
      resolution: {
        description: 'Adjust system clock or use different baud rate to achieve better accuracy.',
        steps: [
          'Try standard baud rates (9600, 115200)',
          'Adjust HSE crystal frequency if possible',
          'Use fractional baud rate generation'
        ]
      }
    }
  ];

  // Filter issues based on current filters
  const filteredIssues = useMemo(() => {
    return mockIssues.filter(issue => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          issue.title.toLowerCase().includes(searchTerm) ||
          issue.description.toLowerCase().includes(searchTerm) ||
          issue.peripheral.toLowerCase().includes(searchTerm) ||
          issue.affectedPin.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Severity filter
      if (filters.severity !== 'all' && issue.severity !== filters.severity) {
        return false;
      }

      // Peripheral filter
      if (filters.peripheral !== 'all' && issue.peripheral !== filters.peripheral) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && issue.status !== filters.status) {
        return false;
      }

      // Show resolved filter
      if (!filters.showResolved && issue.status === 'resolved') {
        return false;
      }

      // Auto-fixable filter
      if (filters.autoFixable && !issue.autoFixable) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const all = filters.showResolved ? mockIssues : mockIssues.filter(i => i.status !== 'resolved');
    return {
      total: all.length,
      critical: all.filter(i => i.severity === 'critical').length,
      warning: all.filter(i => i.severity === 'warning').length,
      info: all.filter(i => i.severity === 'info').length,
      resolved: mockIssues.filter(i => i.status === 'resolved').length,
      autoFixable: all.filter(i => i.autoFixable).length
    };
  }, [filters.showResolved]);

  const handleValidation = async () => {
    setIsValidating(true);
    // Simulate validation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsValidating(false);
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGeneratingReport(false);
    
    // Create and download mock report
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: summaryStats,
      issues: filteredIssues
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `validation-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleIssueSelection = (issueId, selected) => {
    if (selected) {
      setSelectedIssues(prev => [...prev, issueId]);
    } else {
      setSelectedIssues(prev => prev.filter(id => id !== issueId));
    }
  };

  const handleToggleExpand = (issueId) => {
    setExpandedIssues(prev => {
      const newSet = new Set(prev);
      if (newSet.has(issueId)) {
        newSet.delete(issueId);
      } else {
        newSet.add(issueId);
      }
      return newSet;
    });
  };

  const handleBulkResolve = (issueIds) => {
    console.log('Bulk resolving issues:', issueIds);
    setSelectedIssues([]);
  };

  const handleBulkIgnore = (issueIds) => {
    console.log('Bulk ignoring issues:', issueIds);
    setSelectedIssues([]);
  };

  const handleAutoFixSafe = () => {
    console.log('Auto-fixing safe issues');
  };

  const handleResolveIssue = (issueId) => {
    console.log('Resolving issue:', issueId);
  };

  const handleIgnoreIssue = (issueId) => {
    console.log('Ignoring issue:', issueId);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      severity: 'all',
      peripheral: 'all',
      status: 'all',
      showResolved: false,
      autoFixable: false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Configuration Validation & Conflicts - MicroCloudLab</title>
        <meta name="description" content="Identify and resolve STM32 configuration conflicts and validation issues" />
      </Helmet>

      <Header />
      
      <ConfigurationContextHeader
        peripheralType="Validation"
        peripheralInstance="System-wide"
        configurationStatus={summaryStats.critical > 0 ? 'invalid' : summaryStats.warning > 0 ? 'warning' : 'valid'}
        validationErrors={summaryStats.critical + summaryStats.warning}
        onSave={() => console.log('Save validation results')}
        onValidate={handleValidation}
        onExport={handleGenerateReport}
      />

      <main className="pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Navigation Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
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
                  iconName="Cpu"
                  onClick={() => navigate('/ide/pin-assignment-visualizer')}
                >
                  Pin Mapping
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Activity"
                  onClick={() => navigate('/ide/peripheral-communication-dashboard')}
                >
                  Monitor
                </Button>
              </div>
            </div>
          </div>

          {/* Validation Status Header */}
          <ValidationStatusHeader
            lastValidated={new Date(Date.now() - 1800000)}
            totalIssues={summaryStats.total}
            criticalCount={summaryStats.critical}
            warningCount={summaryStats.warning}
            isValidating={isValidating}
          />

          {/* Summary Cards Section (30%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <ValidationSummaryCard
              title="Critical Errors"
              count={summaryStats.critical}
              type="error"
              description="Issues requiring immediate attention"
              trend={-2}
              onClick={() => setFilters(prev => ({ ...prev, severity: 'critical' }))}
            />
            <ValidationSummaryCard
              title="Warnings"
              count={summaryStats.warning}
              type="warning"
              description="Potential issues to review"
              trend={1}
              onClick={() => setFilters(prev => ({ ...prev, severity: 'warning' }))}
            />
            <ValidationSummaryCard
              title="Information"
              count={summaryStats.info}
              type="info"
              description="Optimization suggestions"
              trend={0}
              onClick={() => setFilters(prev => ({ ...prev, severity: 'info' }))}
            />
            <ValidationSummaryCard
              title="Auto-fixable"
              count={summaryStats.autoFixable}
              type="success"
              description="Issues that can be resolved automatically"
              onClick={() => setFilters(prev => ({ ...prev, autoFixable: true }))}
            />
          </div>

          {/* Filters */}
          <ValidationFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            issueCount={filteredIssues.length}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Issues List Section (50%) */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-heading-sm font-medium">Configuration Issues</h2>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={selectedIssues.length === filteredIssues.length ? 'Square' : 'CheckSquare'}
                        onClick={() => {
                          if (selectedIssues.length === filteredIssues.length) {
                            setSelectedIssues([]);
                          } else {
                            setSelectedIssues(filteredIssues.map(i => i.id));
                          }
                        }}
                      >
                        Select All
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {filteredIssues.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                      <h3 className="text-heading-sm font-medium mb-2">No Issues Found</h3>
                      <p className="text-body-sm text-muted-foreground">
                        {filters.search || filters.severity !== 'all' || filters.peripheral !== 'all' ?'No issues match your current filters.' :'Your configuration is valid and ready for code generation.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredIssues.map((issue) => (
                        <div key={issue.id} className="relative">
                          <div className="absolute left-2 top-4 z-10">
                            <input
                              type="checkbox"
                              checked={selectedIssues.includes(issue.id)}
                              onChange={(e) => handleIssueSelection(issue.id, e.target.checked)}
                              className="rounded border-border"
                            />
                          </div>
                          <div className="pl-8">
                            <IssueListItem
                              issue={issue}
                              isExpanded={expandedIssues.has(issue.id)}
                              onToggleExpand={() => handleToggleExpand(issue.id)}
                              onResolve={handleResolveIssue}
                              onIgnore={handleIgnoreIssue}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bulk Actions Panel (20%) */}
            <div className="lg:col-span-1">
              <BulkActionsPanel
                selectedIssues={selectedIssues}
                onBulkResolve={handleBulkResolve}
                onBulkIgnore={handleBulkIgnore}
                onRunValidation={handleValidation}
                onGenerateReport={handleGenerateReport}
                onAutoFixSafe={handleAutoFixSafe}
                isValidating={isValidating}
                isGeneratingReport={isGeneratingReport}
                autoFixableCount={summaryStats.autoFixable}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Quick Action Toolbar */}
      <QuickActionToolbar
        onSave={() => console.log('Save validation state')}
        onExport={handleGenerateReport}
        onValidate={handleValidation}
        isExporting={isGeneratingReport}
        isValidating={isValidating}
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8"
      />

      {/* Floating Validation Status */}
      <div className="fixed top-20 right-6 z-50">
        <ValidationStatusIndicator
          totalErrors={summaryStats.critical}
          totalWarnings={summaryStats.warning}
          isValidating={isValidating}
          lastValidated={new Date(Date.now() - 1800000)}
          onValidate={handleValidation}
        />
      </div>
    </div>
  );
};

export default ConfigurationValidationConflicts;