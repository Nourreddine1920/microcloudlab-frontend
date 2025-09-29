import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module ComparisonTable
 */

/**
 * A component that displays a comparison table between the traditional
 * development approach and the MicroCloudLab platform. It uses tabs to
 * switch between comparing features, pricing, and support.
 *
 * @returns {JSX.Element} The rendered comparison table component.
 */
const ComparisonTable = () => {
  const [activeTab, setActiveTab] = useState('features');

  const tabs = [
    { id: 'features', label: 'Features', icon: 'Settings' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
    { id: 'support', label: 'Support', icon: 'HeadphonesIcon' }
  ];

  const featureComparison = [
    {
      category: 'Development Environment',
      features: [
        { name: 'Cloud-based IDE', traditional: false, microcloud: true },
        { name: 'Real Hardware Access', traditional: true, microcloud: true },
        { name: 'Multi-platform Support', traditional: false, microcloud: true },
        { name: 'Collaborative Coding', traditional: false, microcloud: true },
        { name: 'Version Control Integration', traditional: 'Limited', microcloud: true }
      ]
    },
    {
      category: 'Hardware Management',
      features: [
        { name: 'Physical Inventory Required', traditional: true, microcloud: false },
        { name: 'Hardware Maintenance', traditional: 'Required', microcloud: 'Managed' },
        { name: 'Instant Platform Switching', traditional: false, microcloud: true },
        { name: 'Remote Access', traditional: false, microcloud: true },
        { name: 'Scalable Resources', traditional: 'Limited', microcloud: true }
      ]
    },
    {
      category: 'Team Collaboration',
      features: [
        { name: 'Real-time Collaboration', traditional: false, microcloud: true },
        { name: 'Project Sharing', traditional: 'Manual', microcloud: 'Instant' },
        { name: 'Code Review Tools', traditional: 'External', microcloud: 'Built-in' },
        { name: 'Team Management', traditional: 'Basic', microcloud: 'Advanced' },
        { name: 'Access Control', traditional: 'Limited', microcloud: 'Granular' }
      ]
    }
  ];

  const pricingComparison = [
    {
      aspect: 'Initial Setup Cost',
      traditional: '$5,000 - $50,000',
      microcloud: '$0',
      advantage: 'microcloud'
    },
    {
      aspect: 'Monthly Per Developer',
      traditional: '$200 - $500',
      microcloud: '$49',
      advantage: 'microcloud'
    },
    {
      aspect: 'Hardware Maintenance',
      traditional: '$1,000 - $5,000/year',
      microcloud: 'Included',
      advantage: 'microcloud'
    },
    {
      aspect: 'Scaling Costs',
      traditional: 'Linear increase',
      microcloud: 'Optimized pricing',
      advantage: 'microcloud'
    },
    {
      aspect: 'Training & Onboarding',
      traditional: '$2,000 - $10,000',
      microcloud: 'Free resources',
      advantage: 'microcloud'
    }
  ];

  const supportComparison = [
    {
      aspect: 'Technical Support',
      traditional: 'Vendor dependent',
      microcloud: '24/7 Expert support',
      advantage: 'microcloud'
    },
    {
      aspect: 'Documentation',
      traditional: 'Scattered sources',
      microcloud: 'Comprehensive hub',
      advantage: 'microcloud'
    },
    {
      aspect: 'Community',
      traditional: 'Limited forums',
      microcloud: 'Active community',
      advantage: 'microcloud'
    },
    {
      aspect: 'Training Materials',
      traditional: 'Basic tutorials',
      microcloud: 'Interactive courses',
      advantage: 'microcloud'
    },
    {
      aspect: 'Response Time',
      traditional: '24-48 hours',
      microcloud: '< 4 hours',
      advantage: 'microcloud'
    }
  ];

  const renderFeatureValue = (value) => {
    if (value === true) {
      return <Icon name="Check" size={20} className="text-success" />;
    } else if (value === false) {
      return <Icon name="X" size={20} className="text-error" />;
    } else {
      return <span className="text-sm text-text-secondary">{value}</span>;
    }
  };

  const renderAdvantage = (advantage) => {
    return advantage === 'microcloud' ? (
      <div className="flex items-center justify-center">
        <div className="w-2 h-2 bg-accent rounded-full pulse-glow"></div>
      </div>
    ) : null;
  };

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-headline text-text-primary mb-2">
            Traditional vs MicroCloudLab
          </h3>
          <p className="text-text-secondary">
            See how MicroCloudLab transforms embedded development
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="flex bg-background rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'features' && (
          <div className="space-y-8">
            {featureComparison.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  {category.category}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                          Feature
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">
                          Traditional
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-text-secondary">
                          MicroCloudLab
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-border/50">
                          <td className="py-3 px-4 text-sm text-text-primary">
                            {feature.name}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {renderFeatureValue(feature.traditional)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {renderFeatureValue(feature.microcloud)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-text-secondary">
                    Cost Factor
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-text-secondary">
                    Traditional Approach
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-text-secondary">
                    MicroCloudLab
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-text-secondary">
                    Advantage
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingComparison.map((item, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-4 text-sm font-medium text-text-primary">
                      {item.aspect}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-text-secondary">
                      {item.traditional}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-primary font-medium">
                      {item.microcloud}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderAdvantage(item.advantage)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-text-secondary">
                    Support Aspect
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-text-secondary">
                    Traditional
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-text-secondary">
                    MicroCloudLab
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-text-secondary">
                    Advantage
                  </th>
                </tr>
              </thead>
              <tbody>
                {supportComparison.map((item, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-4 text-sm font-medium text-text-primary">
                      {item.aspect}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-text-secondary">
                      {item.traditional}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-primary font-medium">
                      {item.microcloud}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderAdvantage(item.advantage)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-text-secondary mb-4">
            Ready to experience the MicroCloudLab advantage?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              iconName="Play"
              iconPosition="left"
            >
              Watch Demo
            </Button>
            <Button
              variant="primary"
              iconName="Zap"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;