import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module HeroSection
 */

/**
 * The hero section for the "About & Vision" page.
 * It features a prominent headline, a mission statement, key company statistics,
 * and call-to-action buttons to engage the user.
 *
 * @returns {JSX.Element} The rendered hero section component.
 */
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full floating-animation"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary/10 rounded-full floating-animation" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent/20 rounded-full floating-animation" style={{animationDelay: '2s'}}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Mission Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Icon name="Zap" size={16} />
            <span>Democratizing Innovation Since 2021</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline text-text-primary mb-6">
            Transforming
            <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              Embedded Development
            </span>
            <span className="block">Forever</span>
          </h1>

          {/* Mission Statement */}
          <p className="text-xl sm:text-2xl text-text-secondary max-w-4xl mx-auto mb-8 leading-relaxed">
            Making microcontroller access as universal as web development. Breaking down barriers, 
            eliminating constraints, and empowering creators worldwide to build the future of IoT.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">50K+</div>
              <div className="text-sm text-text-secondary">Developers Empowered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-text-secondary">Educational Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">1M+</div>
              <div className="text-sm text-text-secondary">Projects Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-conversion mb-2">85%</div>
              <div className="text-sm text-text-secondary">Cost Reduction</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              variant="primary" 
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
            >
              Watch Our Story
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="Users"
              iconPosition="left"
            >
              Meet the Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;