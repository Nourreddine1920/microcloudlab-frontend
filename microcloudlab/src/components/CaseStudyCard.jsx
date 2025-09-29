import React from 'react';
import Icon from './AppIcon';

/**
 * @module CaseStudyCard
 */

/**
 * A card component to display a summary of a case study.
 * It shows the title, subtitle, industry, description, challenge, solution, results, and technologies used.
 *
 * @param {object} props - The properties for the component.
 * @param {object} props.caseStudy - The case study object to display.
 * @returns {JSX.Element|null} The rendered case study card, or null if no case study is provided.
 */
const CaseStudyCard = ({ caseStudy }) => {
  if (!caseStudy) return null;

  return (
    <div className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-text-secondary mb-2">
            {caseStudy.subtitle}
          </p>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {caseStudy.industry}
            </span>
            {caseStudy.company_name && (
              <span className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-full">
                {caseStudy.company_name}
              </span>
            )}
          </div>
        </div>
        {caseStudy.is_featured && (
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Star" size={16} className="text-accent" />
          </div>
        )}
      </div>

      <p className="text-text-secondary text-sm mb-4 line-clamp-3">
        {caseStudy.description}
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-1">Challenge</h4>
          <p className="text-xs text-text-secondary line-clamp-2">
            {caseStudy.challenge}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-1">Solution</h4>
          <p className="text-xs text-text-secondary line-clamp-2">
            {caseStudy.solution}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-1">Results</h4>
          <p className="text-xs text-text-secondary line-clamp-2">
            {caseStudy.results}
          </p>
        </div>
      </div>

      {/* Technologies Used */}
      {caseStudy.technologies_used && caseStudy.technologies_used.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-1">
            {caseStudy.technologies_used.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        {caseStudy.roi_percentage && (
          <div className="text-center">
            <div className="text-lg font-semibold text-success">
              {caseStudy.roi_percentage}%
            </div>
            <div className="text-xs text-text-secondary">ROI</div>
          </div>
        )}
        {caseStudy.time_saved && (
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {caseStudy.time_saved}
            </div>
            <div className="text-xs text-text-secondary">Time Saved</div>
          </div>
        )}
        {caseStudy.cost_savings && (
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">
              {caseStudy.cost_savings}
            </div>
            <div className="text-xs text-text-secondary">Cost Savings</div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Case Study</span>
          <span>{new Date(caseStudy.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard; 