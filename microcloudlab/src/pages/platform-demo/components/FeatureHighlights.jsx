import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module FeatureHighlights
 */

/**
 * A component that highlights the key features of the MicroCloudLab platform.
 * It uses a tabbed or carousel-like interface to present features one by one,
 * comparing the traditional approach with the MicroCloudLab way.
 *
 * @param {object} props - The properties for the component.
 * @param {Function} props.onStartTrial - A callback function to be executed when the "Start Free Trial" button is clicked.
 * @returns {JSX.Element} The rendered feature highlights component.
 */
const FeatureHighlights = ({ onStartTrial }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'no-hardware',
      icon: 'CloudOff',
      title: 'No Hardware Setup Required',
      description: 'Access real microcontrollers instantly without purchasing, wiring, or maintaining physical hardware.',
      benefits: [
        'Instant access to 50+ microcontroller models',
        'No shipping delays or hardware costs',
        'Always up-to-date firmware and tools',
        'Zero maintenance or troubleshooting'
      ],
      comparison: {
        traditional: 'Order hardware → Wait for delivery → Wire components → Debug connections → Start coding',
        microcloudlab: 'Select microcontroller → Start coding immediately'
      }
    },
    {
      id: 'real-time-collaboration',
      icon: 'Users',
      title: 'Real-Time Collaboration',
      description: 'Work together on embedded projects with live code sharing, synchronized debugging, and team workspaces.',
      benefits: [
        'Live code editing with multiple developers',
        'Shared debugging sessions and breakpoints',
        'Team project management and version control',
        'Real-time chat and code comments'
      ],
      comparison: {
        traditional: 'Email code files → Merge conflicts → Hardware sharing issues → Async debugging',
        microcloudlab: 'Instant collaboration → Live debugging → Shared hardware access'
      }
    },
    {
      id: 'instant-access',
      icon: 'Zap',
      title: 'Instant Microcontroller Access',
      description: 'Switch between different microcontrollers instantly without rewiring or reconfiguring your setup.',
      benefits: [
        'Arduino, ESP32, Raspberry Pi Pico, and more',
        'Instant switching between platforms',
        'Pre-configured development environments',
        'Cloud-hosted compilation and deployment'
      ],
      comparison: {
        traditional: 'Buy each microcontroller → Learn different toolchains → Manage multiple setups',
        microcloudlab: 'One platform → All microcontrollers → Unified development experience'
      }
    },
    {
      id: 'cloud-power',
      icon: 'Cloud',
      title: 'Cloud-Native Development',
      description: 'Leverage cloud computing power for faster compilation, unlimited storage, and global accessibility.',
      benefits: [
        'Lightning-fast cloud compilation',
        'Unlimited project storage and backups',
        'Access from any device, anywhere',
        'Automatic scaling and performance optimization'
      ],
      comparison: {
        traditional: 'Local compilation → Limited storage → Device-dependent → Manual backups',
        microcloudlab: 'Cloud compilation → Unlimited storage → Universal access → Auto-backup'
      }
    }
  ];

  const currentFeature = features[activeFeature];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-primary/10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-headline font-bold text-text-primary mb-3">
          Why MicroCloudLab Changes Everything
        </h2>
        <p className="text-text-secondary text-lg max-w-3xl mx-auto">
          Experience the future of embedded development with features that eliminate traditional barriers and unlock new possibilities.
        </p>
      </div>

      {/* Feature Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {features.map((feature, index) => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(index)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
              activeFeature === index
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={feature.icon} size={16} />
            <span className="hidden sm:inline">{feature.title}</span>
          </button>
        ))}
      </div>

      {/* Active Feature Display */}
      <div className="bg-background rounded-lg p-8 shadow-brand">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Feature Details */}
          <div>
            <div className="flex items-center space-x-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
                <Icon name={currentFeature.icon} size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">{currentFeature.title}</h3>
                <p className="text-text-secondary">Revolutionary capability</p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">{currentFeature.description}</p>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-text-primary">Key Benefits:</h4>
              {currentFeature.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2.5">
                  <Icon name="CheckCircle" size={18} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-text-secondary">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Traditional vs MicroCloudLab</h4>
            
            <div className="space-y-4">
              {/* Traditional Approach */}
              <div className="bg-error/5 border-l-4 border-error/50 rounded-r-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="XCircle" size={18} className="text-error" />
                  <span className="font-semibold text-error">Traditional Approach</span>
                </div>
                <p className="text-text-secondary text-sm">{currentFeature.comparison.traditional}</p>
              </div>
              
              {/* MicroCloudLab Approach */}
              <div className="bg-success/5 border-l-4 border-success/50 rounded-r-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={18} className="text-success" />
                  <span className="font-semibold text-success">MicroCloudLab Way</span>
                </div>
                <p className="text-text-secondary text-sm">{currentFeature.comparison.microcloudlab}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 p-5 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20 text-center">
              <p className="text-text-primary font-semibold mb-3">Ready to experience the difference?</p>
              <Button
                variant="primary"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                onClick={onStartTrial}
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-brand"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Dots */}
      <div className="flex justify-center space-x-2.5 mt-8">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveFeature(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeFeature === index ? 'bg-primary w-10' : 'bg-border hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;