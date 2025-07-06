import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';

const UserJourneySection = () => {
  const [activeJourney, setActiveJourney] = useState(0);

  const journeys = [
    {
      id: 'developers',
      title: 'For Developers',
      subtitle: 'Professional Development',
      icon: 'Code',
      color: 'primary',
      bgColor: 'primary/10',
      description: 'Build IoT prototypes without buying hardware. Access real microcontrollers instantly.',
      features: [
        'Instant hardware access',
        'Team collaboration tools',
        'Version control for embedded',
        'Cloud-based debugging'
      ],
      useCases: [
        {
          title: 'Rapid Prototyping',
          description: 'Test your IoT ideas on real hardware without upfront investment',
          icon: 'Zap'
        },
        {
          title: 'Remote Development',
          description: 'Code embedded systems from anywhere with internet access',
          icon: 'Wifi'
        },
        {
          title: 'Hardware Testing',
          description: 'Validate designs across multiple microcontroller platforms',
          icon: 'TestTube'
        }
      ],
      cta: {
        primary: 'Start Free Trial',
        secondary: 'View Developer Docs'
      },
      stats: {
        users: '2,400+',
        projects: '15,000+',
        satisfaction: '4.9/5'
      }
    },
    {
      id: 'educators',
      title: 'For Educators',
      subtitle: 'Educational Excellence',
      icon: 'GraduationCap',
      color: 'success',
      bgColor: 'success/10',
      description: 'Teach embedded systems to 200 students with zero setup time. Equal access for all.',
      features: [
        'Classroom management',
        'Assignment tracking',
        'Progress monitoring',
        'Curriculum integration'
      ],
      useCases: [
        {
          title: 'Scalable Learning',
          description: 'Teach hundreds of students without hardware limitations',
          icon: 'Users'
        },
        {
          title: 'Cost Effective',
          description: 'Eliminate hardware procurement and maintenance costs',
          icon: 'DollarSign'
        },
        {
          title: 'Equal Access',
          description: 'Every student gets the same high-quality hardware experience',
          icon: 'Heart'
        }
      ],
      cta: {
        primary: 'Request Demo',
        secondary: 'Education Pricing'
      },
      stats: {
        users: '89',
        projects: '5,200+',
        satisfaction: '4.8/5'
      }
    },
    {
      id: 'students',
      title: 'For Students',
      subtitle: 'Learning & Innovation',
      icon: 'BookOpen',
      color: 'accent',
      bgColor: 'accent/10',
      description: 'Learn embedded programming without expensive hardware. Build your portfolio.',
      features: [
        'Free tier access',
        'Learning resources',
        'Community support',
        'Project showcase'
      ],
      useCases: [
        {
          title: 'Skill Building',
          description: 'Master embedded development with hands-on practice',
          icon: 'TrendingUp'
        },
        {
          title: 'Portfolio Projects',
          description: 'Create impressive projects to showcase to employers',
          icon: 'Star'
        },
        {
          title: 'Career Preparation',
          description: 'Gain industry-relevant experience with modern tools',
          icon: 'Target'
        }
      ],
      cta: {
        primary: 'Start Learning',
        secondary: 'Student Resources'
      },
      stats: {
        users: '12,000+',
        projects: '28,000+',
        satisfaction: '4.7/5'
      }
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-conversion/10 text-conversion px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Users" size={16} />
            <span>Choose Your Path</span>
          </div>
          <h2 className="text-4xl font-headline text-text-primary mb-4">
            Your Journey Starts Here
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Whether you're a professional developer, educator, or student, MicroCloudLab adapts to your needs and accelerates your embedded development journey.
          </p>
        </div>

        {/* Journey Selector */}
        <div className="flex flex-col lg:flex-row justify-center mb-12">
          <div className="flex flex-col sm:flex-row lg:flex-col bg-surface rounded-2xl p-2 space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-0 lg:space-y-2 lg:mr-8">
            {journeys.map((journey, index) => (
              <button
                key={journey.id}
                onClick={() => setActiveJourney(index)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-smooth text-left ${
                  activeJourney === index
                    ? `bg-${journey.color} text-white shadow-md`
                    : 'text-text-secondary hover:text-text-primary hover:bg-background'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeJourney === index
                    ? 'bg-white/20'
                    : `bg-${journey.bgColor}`
                }`}>
                  <Icon 
                    name={journey.icon} 
                    size={16} 
                    className={activeJourney === index ? 'text-white' : `text-${journey.color}`}
                  />
                </div>
                <div>
                  <div className="font-semibold">{journey.title}</div>
                  <div className={`text-sm ${
                    activeJourney === index ? 'text-white/80' : 'text-text-secondary'
                  }`}>
                    {journey.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Journey Content */}
          <div className="flex-1 mt-8 lg:mt-0">
            <div className="bg-background rounded-2xl shadow-brand border border-border p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-${journeys[activeJourney].bgColor} rounded-2xl flex items-center justify-center`}>
                        <Icon 
                          name={journeys[activeJourney].icon} 
                          size={24} 
                          className={`text-${journeys[activeJourney].color}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-headline text-text-primary">
                          {journeys[activeJourney].title}
                        </h3>
                        <p className="text-text-secondary">
                          {journeys[activeJourney].subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-text-secondary">
                      {journeys[activeJourney].description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-primary">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {journeys[activeJourney].features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className={`text-${journeys[activeJourney].color}`} />
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className={`text-lg font-semibold text-${journeys[activeJourney].color}`}>
                        {journeys[activeJourney].stats.users}
                      </div>
                      <div className="text-xs text-text-secondary">Users</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-semibold text-${journeys[activeJourney].color}`}>
                        {journeys[activeJourney].stats.projects}
                      </div>
                      <div className="text-xs text-text-secondary">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-semibold text-${journeys[activeJourney].color}`}>
                        {journeys[activeJourney].stats.satisfaction}
                      </div>
                      <div className="text-xs text-text-secondary">Rating</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      variant="primary"
                      size="md"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className={`bg-${journeys[activeJourney].color} hover:bg-${journeys[activeJourney].color}/90`}
                    >
                      {journeys[activeJourney].cta.primary}
                    </Button>
                    <Button 
                      variant="outline"
                      size="md"
                      iconName="ExternalLink"
                      iconPosition="right"
                      className={`border-${journeys[activeJourney].color} text-${journeys[activeJourney].color} hover:bg-${journeys[activeJourney].bgColor}`}
                    >
                      {journeys[activeJourney].cta.secondary}
                    </Button>
                  </div>
                </div>

                {/* Right Column - Use Cases */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-text-primary mb-4">Popular Use Cases:</h4>
                  {journeys[activeJourney].useCases.map((useCase, index) => (
                    <div key={index} className="bg-surface rounded-xl p-4 hover:shadow-md transition-smooth">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 bg-${journeys[activeJourney].bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                          <Icon 
                            name={useCase.icon} 
                            size={16} 
                            className={`text-${journeys[activeJourney].color}`}
                          />
                        </div>
                        <div>
                          <h5 className="font-semibold text-text-primary mb-1">
                            {useCase.title}
                          </h5>
                          <p className="text-sm text-text-secondary">
                            {useCase.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-surface rounded-full px-6 py-3">
            <span className="text-sm text-text-secondary">Not sure which path fits you?</span>
            <Link 
              to="/solutions-hub"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
            >
              Explore All Solutions →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourneySection;