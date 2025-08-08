import React from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with core IDE tools',
    features: [
      'Board selection & dashboards',
      'Pin visualizer (basic)',
      'Import/export manager',
      'Community support',
      'Basic validation tools',
      'Up to 3 projects'
    ],
    cta: 'Start free',
    popular: false,
    icon: 'Zap'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'Advanced validation and codegen',
    features: [
      'All Free features',
      'Advanced validation & conflict auto-fix',
      'Code preview & export templates',
      'Priority support',
      'Unlimited projects',
      'Custom board configurations',
      'Advanced debugging tools',
      'Team collaboration'
    ],
    highlight: true,
    cta: 'Upgrade to Pro',
    popular: true,
    icon: 'Crown'
  },
  {
    id: 'team',
    name: 'Team',
    price: 'Custom',
    period: 'enterprise',
    description: 'Collaboration & governance',
    features: [
      'All Pro features',
      'Team workspaces & roles',
      'SSO / SAML integration',
      'SLAs & onboarding',
      'Dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'White-label options'
    ],
    cta: 'Contact sales',
    popular: false,
    icon: 'Building'
  }
];

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-accent rounded-full pulse-glow"></div>
              <span className="text-accent font-medium text-sm">PRICING</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-headline text-text-primary mb-4">
              Choose Your
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Development Plan
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Scale from hobby project to production with the right tools. 
              All plans include our core IDE features with advanced capabilities for professional teams.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div 
                key={tier.id} 
                className={`relative bg-card border rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
                  tier.highlight 
                    ? 'border-accent shadow-oscilloscope scale-105' 
                    : 'border-border hover:border-primary/30'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    tier.highlight 
                      ? 'bg-gradient-to-br from-primary to-accent' 
                      : 'bg-surface'
                  }`}>
                    <Icon name={tier.icon} size={32} className={tier.highlight ? 'text-white' : 'text-accent'} />
                  </div>
                  
                  <h2 className="text-2xl font-headline text-text-primary mb-2">{tier.name}</h2>
                  <p className="text-text-secondary mb-6">{tier.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold text-text-primary">{tier.price}</span>
                      {tier.period !== 'forever' && tier.period !== 'enterprise' && (
                        <span className="text-text-secondary">/{tier.period}</span>
                      )}
                    </div>
                    {tier.period === 'forever' && (
                      <span className="text-sm text-text-secondary">Free forever</span>
                    )}
                    {tier.period === 'enterprise' && (
                      <span className="text-sm text-text-secondary">Enterprise pricing</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={tier.highlight ? 'primary' : 'outline'} 
                  size="lg"
                  className={`w-full ${
                    tier.highlight 
                      ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg' 
                      : 'border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-headline text-text-primary mb-4">Frequently Asked Questions</h2>
              <p className="text-text-secondary">Everything you need to know about our pricing</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Can I upgrade or downgrade anytime?</h3>
                  <p className="text-text-secondary text-sm">Yes, you can change your plan at any time. Changes take effect immediately.</p>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">What payment methods do you accept?</h3>
                  <p className="text-text-secondary text-sm">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Is there a free trial?</h3>
                  <p className="text-text-secondary text-sm">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Do you offer refunds?</h3>
                  <p className="text-text-secondary text-sm">We offer a 30-day money-back guarantee for all paid plans.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
              <h2 className="text-2xl font-headline text-text-primary mb-4">Ready to get started?</h2>
              <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                Join thousands of developers who are already building amazing embedded projects with MicroCloudLab.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
                >
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;

