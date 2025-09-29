import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

/**
 * @module CaseStudyCard
 */

/**
 * A card component for displaying a single case study.
 * It shows the case study's title, company, industry, challenge, solution,
 * results, and an optional testimonial.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.study - The case study object to display.
 * @returns {JSX.Element} The rendered case study card component.
 */
const CaseStudyCard = ({ study }) => {
  const {
    title,
    company,
    industry,
    challenge,
    solution,
    results,
    image,
    company_logo,
    testimonial,
    author
  } = study || {};

  // Parse results if it's a JSON string, or use empty array if not available
  const parsedResults = React.useMemo(() => {
    if (!results) return [];
    if (Array.isArray(results)) return results;
    try {
      return typeof results === 'string' ? JSON.parse(results) : results;
    } catch (error) {
      console.warn('Failed to parse results:', error);
      return [];
    }
  }, [results]);

  // Default images based on industry
  const getDefaultImage = (industry) => {
    const industryImages = {
      'IoT & Smart Cities': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      'Industrial Automation': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      'Healthcare & Medical': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
      'Agriculture & Precision Farming': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=400&fit=crop',
      'Energy & Sustainability': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
      'Transportation & Logistics': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop',
    };
    return industryImages[industry] || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop';
  };

  const getDefaultCompanyLogo = (company) => {
    return company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(company || 'Company')}&background=random&size=64`;
  };

  const displayImage = image || getDefaultImage(industry);
  const displayCompanyLogo = getDefaultCompanyLogo(company);
  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={displayImage} 
          alt={`${company} case study`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Company Logo */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg p-2 flex items-center justify-center">
            <Image 
              src={displayCompanyLogo} 
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
        <h3 className="text-xl font-headline text-text-primary mb-4">{title || 'Case Study'}</h3>
        
        {/* Challenge & Solution */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-semibold text-text-primary">Challenge</span>
            </div>
            <p className="text-sm text-text-secondary pl-6">{challenge || 'Challenge details not available'}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={16} className="text-accent" />
              <span className="text-sm font-semibold text-text-primary">Solution</span>
            </div>
            <p className="text-sm text-text-secondary pl-6">{solution || 'Solution details not available'}</p>
          </div>
        </div>

        {/* Results */}
        {parsedResults && parsedResults.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background rounded-lg">
            {parsedResults.map((result, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-semibold text-primary">{result.value}</div>
                <div className="text-xs text-text-secondary">{result.metric}</div>
              </div>
            ))}
          </div>
        )}

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