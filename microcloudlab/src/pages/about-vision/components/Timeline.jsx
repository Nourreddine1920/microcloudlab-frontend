import React from 'react';
import Icon from '../../../components/AppIcon';

const Timeline = () => {
  const milestones = [
    {
      year: "2021",
      quarter: "Q1",
      title: "The Spark",
      description: "Concept born from Stanford classroom frustrations with embedded development barriers.",
      icon: "Lightbulb",
      color: "accent",
      achievements: ["Initial research", "Market validation", "Team formation"]
    },
    {
      year: "2021",
      quarter: "Q3",
      title: "First Cloud MCU",
      description: "Successfully hosted first microcontroller in the cloud with remote access capabilities.",
      icon: "Cpu",
      color: "primary",
      achievements: ["ESP32 cloud hosting", "Remote programming", "Real-time debugging"]
    },
    {
      year: "2022",
      quarter: "Q1",
      title: "Beta Launch",
      description: "Private beta with 100 selected developers and 5 educational institutions.",
      icon: "Rocket",
      color: "success",
      achievements: ["100 beta users", "5 university partners", "Core platform features"]
    },
    {
      year: "2022",
      quarter: "Q3",
      title: "Educational Breakthrough",
      description: "Partnership with 50+ universities, reaching 10,000 students worldwide.",
      icon: "GraduationCap",
      color: "conversion",
      achievements: ["50+ university partners", "10K+ students", "Curriculum integration"]
    },
    {
      year: "2023",
      quarter: "Q1",
      title: "Public Launch",
      description: "Official public launch with multi-MCU support and collaborative features.",
      icon: "Globe",
      color: "primary",
      achievements: ["Public availability", "15 MCU types", "Team collaboration"]
    },
    {
      year: "2023",
      quarter: "Q4",
      title: "Community Milestone",
      description: "Reached 50,000 developers and 1 million projects created on the platform.",
      icon: "Users",
      color: "accent",
      achievements: ["50K developers", "1M projects", "Global community"]
    },
    {
      year: "2024",
      quarter: "Q2",
      title: "Enterprise Adoption",
      description: "Major corporations adopt MicroCloudLab for IoT prototyping and development.",
      icon: "Building",
      color: "success",
      achievements: ["Enterprise features", "Fortune 500 clients", "Advanced security"]
    },
    {
      year: "2024",
      quarter: "Q4",
      title: "AI Integration",
      description: "Launch of AI-assisted embedded development and intelligent code suggestions.",
      icon: "Brain",
      color: "conversion",
      achievements: ["AI code assistant", "Smart debugging", "Predictive analytics"]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "bg-primary text-primary-foreground",
      accent: "bg-accent text-accent-foreground",
      success: "bg-success text-success-foreground",
      conversion: "bg-conversion text-conversion-foreground"
    };
    return colorMap[color] || colorMap.primary;
  };

  const getBorderColor = (color) => {
    const colorMap = {
      primary: "border-primary",
      accent: "border-accent",
      success: "border-success",
      conversion: "border-conversion"
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-headline text-text-primary mb-6">
            Our Journey to Revolution
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From a classroom frustration to a global platform transforming embedded development. 
            Here's how we've grown and what's coming next.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-background transform md:-translate-x-2 z-10 ${getColorClasses(milestone.color)}`}></div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`ml-12 md:ml-0 bg-background rounded-xl p-6 shadow-brand border-l-4 ${getBorderColor(milestone.color)}`}>
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(milestone.color)}`}>
                        <Icon name={milestone.icon} size={24} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-text-secondary">{milestone.year}</span>
                          <span className="text-xs bg-surface px-2 py-1 rounded text-text-secondary">{milestone.quarter}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary">{milestone.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2">
                      {milestone.achievements.map((achievement, achievementIndex) => (
                        <span 
                          key={achievementIndex}
                          className="text-xs bg-surface px-3 py-1 rounded-full text-text-secondary border"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Roadmap Teaser */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12">
            <Icon name="Telescope" size={48} className="text-primary mx-auto mb-6" />
            <h3 className="text-2xl sm:text-3xl font-headline text-text-primary mb-6">
              What's Next?
            </h3>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
              We're just getting started. The future holds quantum computing integration, 
              advanced AI collaboration, and even more revolutionary ways to democratize innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg">
                <Icon name="Atom" size={16} className="text-primary" />
                <span className="text-sm text-text-secondary">Quantum Integration</span>
              </div>
              <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg">
                <Icon name="Brain" size={16} className="text-accent" />
                <span className="text-sm text-text-secondary">Advanced AI</span>
              </div>
              <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg">
                <Icon name="Network" size={16} className="text-success" />
                <span className="text-sm text-text-secondary">Global Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;