import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

/**
 * @module CTASection
 */

/**
 * A call-to-action section for the homepage.
 * It encourages users to sign up, showcases pricing tiers,
 * and reinforces trust with security and reliability signals.
 *
 * @returns {JSX.Element} The rendered CTA section component.
 */
const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const features = [
    {
      icon: "Zap",
      title: "Instant Access",
      description: "Start coding in 30 seconds"
    },
    {
      icon: "CreditCard",
      title: "No Credit Card",
      description: "Free tier with full features"
    },
    {
      icon: "Users",
      title: "Team Collaboration",
      description: "Invite unlimited team members"
    },
    {
      icon: "Shield",
      title: "Enterprise Security",
      description: "SOC 2 compliant platform"
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for students and hobbyists",
      features: [
        "5 hours/month hardware access",
        "3 concurrent projects",
        "Community support",
        "Basic microcontrollers"
      ],
      cta: "Start Free",
      popular: false,
      color: "success"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for professional developers",
      features: [
        "Unlimited hardware access",
        "Unlimited projects",
        "Priority support",
        "All microcontroller types",
        "Team collaboration",
        "Advanced debugging"
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "primary"
    },
    {
      name: "Education",
      price: "$199",
      period: "per classroom/month",
      description: "Built for educational institutions",
      features: [
        "Up to 50 students",
        "Classroom management",
        "Progress tracking",
        "Curriculum integration",
        "Dedicated support",
        "Custom hardware configs"
      ],
      cta: "Request Demo",
      popular: false,
      color: "accent"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Rocket" size={16} />
            <span>Ready to Get Started?</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-headline text-text-primary mb-6">
            Start Building Today
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Join thousands of developers who have revolutionized their embedded development workflow. 
            No credit card required, no setup time, no hardware investment.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto mb-8">
            {!isSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit"
                  variant="primary"
                  size="md"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Start Free
                </Button>
              </form>
            ) : (
              <div className="bg-success/10 text-success px-6 py-4 rounded-xl flex items-center justify-center space-x-2">
                <Icon name="CheckCircle" size={20} />
                <span className="font-medium">Thanks! Check your email for next steps.</span>
              </div>
            )}
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-background rounded-xl p-4 shadow-sm border border-border">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} size={16} className="text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-text-primary text-sm">{feature.title}</div>
                  <div className="text-xs text-text-secondary">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-headline text-text-primary mb-2">
              Choose Your Plan
            </h3>
            <p className="text-text-secondary">
              Start free, upgrade when you need more power
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative bg-background rounded-2xl shadow-brand border-2 p-8 ${
                  tier.popular 
                    ? 'border-primary shadow-xl scale-105' 
                    : 'border-border hover:border-primary/30'
                } transition-smooth`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold text-text-primary mb-2">{tier.name}</h4>
                  <div className="mb-2">
                    <span className="text-3xl font-headline text-text-primary">{tier.price}</span>
                    <span className="text-text-secondary">/{tier.period}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{tier.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className={`text-${tier.color} flex-shrink-0 mt-0.5`} />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={tier.popular ? "primary" : "outline"}
                  size="lg"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  className={tier.popular ? `bg-${tier.color} hover:bg-${tier.color}/90` : `border-${tier.color} text-${tier.color} hover:bg-${tier.color}/10`}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-8 bg-background rounded-2xl px-8 py-4 shadow-brand border border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm text-text-secondary">SOC 2 Certified</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-primary" />
              <span className="text-sm text-text-secondary">Enterprise Security</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} className="text-accent" />
              <span className="text-sm text-text-secondary">99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-headline mb-4">
              Ready to revolutionize your embedded development?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join the cloud-native embedded development revolution. Start building without barriers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Watch 2-Min Demo
              </Button>
              <Button 
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="border-white text-white hover:bg-white/10"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;