import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CaseStudyCard = ({ 
  title, 
  company, 
  industry, 
  challenge, 
  solution, 
  results, 
  image, 
  companyLogo,
  testimonial,
  author 
}) => {
  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={image} 
          alt={`${company} case study`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Company Logo */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg p-2 flex items-center justify-center">
            <Image 
              src={companyLogo} 
              alt={`${company} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-white font-semibold">{company}</div>
            <div className="text-white/80 text-sm">{industry}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-headline text-text-primary mb-4">{title}</h3>
        
        {/* Challenge & Solution */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-semibold text-text-primary">Challenge</span>
            </div>
            <p className="text-sm text-text-secondary pl-6">{challenge}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={16} className="text-accent" />
              <span className="text-sm font-semibold text-text-primary">Solution</span>
            </div>
            <p className="text-sm text-text-secondary pl-6">{solution}</p>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background rounded-lg">
          {results.map((result, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-semibold text-primary">{result.value}</div>
              <div className="text-xs text-text-secondary">{result.metric}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        {testimonial && (
          <div className="border-l-4 border-accent pl-4 mb-4">
            <p className="text-sm text-text-secondary italic mb-2">"{testimonial}"</p>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={12} className="text-accent" />
              </div>
              <span className="text-xs font-medium text-text-primary">{author}</span>
            </div>
          </div>
        )}

        {/* Read More Link */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-text-secondary">Case Study</span>
          <button className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors">
            <span>Read Full Story</span>
            <Icon name="ExternalLink" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;