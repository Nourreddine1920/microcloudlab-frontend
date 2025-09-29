import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

/**
 * @module ROICalculator
 */

/**
 * An interactive calculator to estimate the Return on Investment (ROI)
 * when using the MicroCloudLab platform compared to a traditional development approach.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.title - The title of the calculator.
 * @param {string} props.description - A short description of the calculator.
 * @param {string} [props.calculationType="developer"] - The type of calculation to perform (not currently used).
 * @returns {JSX.Element} The rendered ROI calculator component.
 */
const ROICalculator = ({ title, description, calculationType = "developer" }) => {
  const [inputs, setInputs] = useState({
    teamSize: 5,
    projectsPerYear: 12,
    hardwareCostPerProject: 500,
    developmentTimeWeeks: 8,
    hourlyRate: 75
  });

  const [results, setResults] = useState({
    traditionalCost: 0,
    cloudCost: 0,
    savings: 0,
    timeReduction: 0,
    roiPercentage: 0
  });

  const calculateROI = () => {
    const { teamSize, projectsPerYear, hardwareCostPerProject, developmentTimeWeeks, hourlyRate } = inputs;
    
    // Traditional approach costs
    const hardwareCosts = projectsPerYear * hardwareCostPerProject;
    const developmentCosts = teamSize * developmentTimeWeeks * 40 * hourlyRate * projectsPerYear;
    const maintenanceCosts = hardwareCosts * 0.2; // 20% maintenance
    const traditionalTotal = hardwareCosts + developmentCosts + maintenanceCosts;
    
    // Cloud approach costs
    const cloudSubscription = teamSize * 49 * 12; // $49/month per developer
    const reducedDevTime = developmentTimeWeeks * 0.6; // 40% time reduction
    const cloudDevelopmentCosts = teamSize * reducedDevTime * 40 * hourlyRate * projectsPerYear;
    const cloudTotal = cloudSubscription + cloudDevelopmentCosts;
    
    // Calculate savings and ROI
    const totalSavings = traditionalTotal - cloudTotal;
    const timeReductionHours = teamSize * (developmentTimeWeeks - reducedDevTime) * 40 * projectsPerYear;
    const roiPercent = ((totalSavings / cloudTotal) * 100);
    
    setResults({
      traditionalCost: traditionalTotal,
      cloudCost: cloudTotal,
      savings: totalSavings,
      timeReduction: timeReductionHours,
      roiPercentage: roiPercent
    });
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
          <Icon name="Calculator" size={32} className="text-accent" />
        </div>
        <h3 className="text-2xl font-headline text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Your Current Setup</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Team Size (Developers)
              </label>
              <Input
                type="number"
                value={inputs.teamSize}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                className="w-full"
                min="1"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Projects Per Year
              </label>
              <Input
                type="number"
                value={inputs.projectsPerYear}
                onChange={(e) => handleInputChange('projectsPerYear', e.target.value)}
                className="w-full"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Hardware Cost Per Project
              </label>
              <Input
                type="number"
                value={inputs.hardwareCostPerProject}
                onChange={(e) => handleInputChange('hardwareCostPerProject', e.target.value)}
                className="w-full"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Development Time (Weeks)
              </label>
              <Input
                type="number"
                value={inputs.developmentTimeWeeks}
                onChange={(e) => handleInputChange('developmentTimeWeeks', e.target.value)}
                className="w-full"
                min="1"
                max="52"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Developer Hourly Rate ($)
              </label>
              <Input
                type="number"
                value={inputs.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                className="w-full"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Annual Cost Comparison</h4>
          
          {/* Cost Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-error/5 border border-error/20 rounded-lg">
              <div>
                <div className="text-sm text-text-secondary">Traditional Approach</div>
                <div className="text-lg font-semibold text-error">
                  {formatCurrency(results.traditionalCost)}
                </div>
              </div>
              <Icon name="TrendingUp" size={24} className="text-error" />
            </div>

            <div className="flex justify-between items-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div>
                <div className="text-sm text-text-secondary">MicroCloudLab</div>
                <div className="text-lg font-semibold text-primary">
                  {formatCurrency(results.cloudCost)}
                </div>
              </div>
              <Icon name="TrendingDown" size={24} className="text-primary" />
            </div>

            <div className="flex justify-between items-center p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div>
                <div className="text-sm text-text-secondary">Annual Savings</div>
                <div className="text-xl font-bold text-accent">
                  {formatCurrency(results.savings)}
                </div>
              </div>
              <Icon name="DollarSign" size={24} className="text-accent" />
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-success">
                {Math.round(results.timeReduction).toLocaleString()}
              </div>
              <div className="text-xs text-text-secondary">Hours Saved</div>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {Math.round(results.roiPercentage)}%
              </div>
              <div className="text-xs text-text-secondary">ROI</div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="primary"
              fullWidth
              iconName="Zap"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Start Free Trial
            </Button>
            <p className="text-xs text-text-secondary text-center mt-2">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;