import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SolutionCard = ({ 
  title, 
  description, 
  features, 
  icon, 
  gradient, 
  ctaText, 
  onCtaClick,
  stats,
  isHighlighted = false 
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      isHighlighted 
        ? 'border-primary bg-gradient-to-br from-primary/5 to-accent/5 shadow-brand' 
        : 'border-border bg-surface hover:bg-surface-hover'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-30"></div>
      
      {/* Gradient Overlay */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-3 rounded-xl ${
            isHighlighted 
              ? 'bg-primary/10 text-primary' :'bg-secondary/10 text-secondary'
          }`}>
            <Icon name={icon} size={32} />
          </div>
          
          {isHighlighted && (
            <div className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
              Most Popular
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mb-8">
          <h3 className="text-2xl font-headline text-text-primary mb-4">{title}</h3>
          <p className="text-text-secondary leading-relaxed mb-6">{description}</p>
          
          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Icon 
                  name="Check" 
                  size={16} 
                  className={isHighlighted ? 'text-accent mt-1' : 'text-success mt-1'} 
                />
                <span className="text-sm text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-background/50 rounded-lg">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-lg font-semibold ${
                  isHighlighted ? 'text-primary' : 'text-text-primary'
                }`}>
                  {stat.value}
                </div>
                <div className="text-xs text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Button
          variant={isHighlighted ? "primary" : "outline"}
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={onCtaClick}
          className={isHighlighted ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default SolutionCard;