import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ParameterAccordion = ({ sections, activeSection, onSectionChange, validationErrors = {} }) => {
  const [expandedSections, setExpandedSections] = useState(new Set([activeSection]));

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
    onSectionChange(sectionId);
  };

  const getSectionErrorCount = (sectionId) => {
    return Object.keys(validationErrors).filter(key => 
      key.startsWith(sectionId)
    ).length;
  };

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        const isActive = activeSection === section.id;
        const errorCount = getSectionErrorCount(section.id);
        
        return (
          <div key={section.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full px-4 py-3 flex items-center justify-between text-left transition-micro ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={section.icon} 
                  size={18} 
                  className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
                />
                <div>
                  <div className="text-body-sm font-medium">{section.title}</div>
                  <div className={`text-caption ${
                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    {section.description}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {errorCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-error text-error-foreground rounded-full">
                    {errorCount}
                  </span>
                )}
                <Icon 
                  name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                  size={16}
                  className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
                />
              </div>
            </button>
            
            {isExpanded && (
              <div className="px-4 py-3 bg-background border-t border-border">
                <div className="space-y-2">
                  {section.parameters.map((param) => (
                    <div 
                      key={param.id}
                      className={`flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-micro ${
                        param.id === activeSection 
                          ? 'bg-accent text-accent-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => onSectionChange(param.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon name={param.icon} size={14} />
                        <span className="text-body-sm">{param.name}</span>
                      </div>
                      
                      {validationErrors[param.id] && (
                        <Icon name="AlertCircle" size={14} className="text-error" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ParameterAccordion;