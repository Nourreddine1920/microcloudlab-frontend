import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [features, setFeatures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/features/')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched features:', data);
        setFeatures(data.features || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching features:', err);
        setError('Failed to load features.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading features...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!features || features.length === 0) return <div className="text-center py-10">No features available.</div>;

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Sparkles" size={16} />
            <span>Platform Features</span>
          </div>
          <h2 className="text-4xl font-headline text-text-primary mb-4">
            The GitHub of Hardware
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Revolutionary features that transform embedded development from hardware-dependent to cloud-native, making it accessible to everyone, everywhere.
          </p>
        </div>

        {/* Features Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-smooth ${
                activeFeature === index
                  ? `bg-${feature.color} text-white shadow-md`
                  : 'bg-background text-text-secondary hover:text-text-primary hover:bg-surface border border-border'
              }`}
            >
              <Icon 
                name={feature.icon} 
                size={16} 
                className={activeFeature === index ? 'text-white' : `text-${feature.color}`}
              />
              <span className="font-medium">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Content */}
        <div className="bg-background rounded-3xl shadow-brand border border-border overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Feature Details */}
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-${features[activeFeature].bgColor} rounded-2xl flex items-center justify-center`}>
                    <Icon 
                      name={features[activeFeature].icon} 
                      size={28} 
                      className={`text-${features[activeFeature].color}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline text-text-primary">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-text-secondary">
                      {features[activeFeature].subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-text-secondary leading-relaxed">
                  {features[activeFeature].description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-text-primary">Key Benefits:</h4>
                  <div className="space-y-2">
                    {features[activeFeature].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 bg-${features[activeFeature].bgColor} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Icon 
                            name="Check" 
                            size={12} 
                            className={`text-${features[activeFeature].color}`}
                          />
                        </div>
                        <span className="text-text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button 
                    variant="primary"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className={`bg-${features[activeFeature].color} hover:bg-${features[activeFeature].color}/90`}
                  >
                    Try This Feature
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Demo/Visualization */}
            <div className="bg-gradient-to-br from-surface to-background p-8 lg:p-12 border-l border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-text-primary">
                    {features[activeFeature].demo.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 bg-${features[activeFeature].color} rounded-full pulse-glow`}></div>
                    <span className={`text-sm text-${features[activeFeature].color} font-medium`}>
                      Live Demo
                    </span>
                  </div>
                </div>

                {/* Demo Content */}
                <div className="bg-secondary-900 rounded-xl p-6 font-code text-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-error rounded-full"></div>
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                    </div>
                    <span className="text-secondary-300 text-xs">MicroCloudLab Terminal</span>
                  </div>
                  <pre className="text-secondary-100 whitespace-pre-wrap">
                    {features[activeFeature].demo.content}
                  </pre>
                </div>

                {/* Feature Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <div className={`text-2xl font-semibold text-${features[activeFeature].color} mb-1`}>
                      {activeFeature === 0 ? '24+' : activeFeature === 1 ? '2.4K+' : activeFeature === 2 ? '3.1s' : '89'}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {activeFeature === 0 ? 'Hardware Types' : activeFeature === 1 ? 'Active Teams' : activeFeature === 2 ? 'Avg Deploy Time' : 'Partner Schools'}
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <div className={`text-2xl font-semibold text-${features[activeFeature].color} mb-1`}>
                      {activeFeature === 0 ? '99.9%' : activeFeature === 1 ? '15K+' : activeFeature === 2 ? '156' : '12K+'}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {activeFeature === 0 ? 'Uptime' : activeFeature === 1 ? 'Projects' : activeFeature === 2 ? 'Daily Deploys' : 'Students'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-background rounded-2xl p-6 shadow-brand border border-border text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={24} className="text-primary" />
            </div>
            <h4 className="font-semibold text-text-primary mb-2">Enterprise Security</h4>
            <p className="text-sm text-text-secondary">
              SOC 2 compliant with enterprise-grade security and privacy controls.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-6 shadow-brand border border-border text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Globe" size={24} className="text-accent" />
            </div>
            <h4 className="font-semibold text-text-primary mb-2">Global Access</h4>
            <p className="text-sm text-text-secondary">
              Available worldwide with low-latency connections and 24/7 support.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-6 shadow-brand border border-border text-center">
            <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={24} className="text-success" />
            </div>
            <h4 className="font-semibold text-text-primary mb-2">Lightning Fast</h4>
            <p className="text-sm text-text-secondary">
              Sub-second compilation and deployment with optimized cloud infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;