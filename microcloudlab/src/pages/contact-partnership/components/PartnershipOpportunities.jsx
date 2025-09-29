import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

/**
 * @module PartnershipOpportunities
 */

/**
 * A component that details various partnership opportunities and special programs.
 * It presents information in an expandable, accordion-style format for different
 * partnership types and showcases special initiatives like startup and open-source programs.
 *
 * @returns {JSX.Element} The rendered partnership opportunities section.
 */
const PartnershipOpportunities = () => {
  const [selectedPartnership, setSelectedPartnership] = useState(null);

  const partnerships = [
    {
      id: 'hardware-vendors',
      title: 'Hardware Manufacturers',
      icon: 'Cpu',
      description: 'Partner with us to integrate your microcontrollers into our cloud platform',
      benefits: [
        'Expanded market reach to global developer community',
        'Reduced support burden through cloud-based development',
        'Enhanced product visibility and adoption',
        'Co-marketing opportunities and joint case studies'
      ],
      requirements: [
        'Established microcontroller product line',
        'Technical documentation and SDK availability',
        'Commitment to long-term partnership',
        'Willingness to provide hardware samples for integration'
      ],
      process: 'Technical evaluation → Integration planning → Pilot program → Full partnership',
      contact: 'hardware-partnerships@microcloudlab.com'
    },
    {
      id: 'education-tech',
      title: 'Educational Technology',
      icon: 'GraduationCap',
      description: 'Collaborate to enhance embedded systems education worldwide',
      benefits: [
        'Access to cutting-edge embedded development platform',
        'Joint curriculum development opportunities',
        'Shared educational resources and content',
        'Co-branded educational programs and certifications'
      ],
      requirements: [
        'Focus on STEM or engineering education',
        'Existing educational content or platform',
        'Commitment to educational excellence',
        'Ability to reach educational institutions'
      ],
      process: 'Partnership inquiry → Educational alignment review → Pilot program → Strategic partnership',
      contact: 'education-partnerships@microcloudlab.com'
    },
    {
      id: 'training-orgs',
      title: 'Training Organizations',
      icon: 'BookOpen',
      description: 'Deliver world-class embedded systems training using our platform',
      benefits: [
        'Access to comprehensive training platform',
        'Reduced infrastructure and hardware costs',
        'Scalable training delivery capabilities',
        'Revenue sharing opportunities'
      ],
      requirements: [
        'Proven track record in technical training',
        'Certified instructors and curriculum developers',
        'Commitment to quality training delivery',
        'Ability to market and deliver training programs'
      ],
      process: 'Application → Instructor certification → Content development → Program launch',
      contact: 'training-partnerships@microcloudlab.com'
    },
    {
      id: 'system-integrators',
      title: 'System Integrators',
      icon: 'Settings',
      description: 'Leverage our platform for rapid IoT solution development and deployment',
      benefits: [
        'Faster project delivery and prototyping',
        'Reduced development infrastructure costs',
        'Access to diverse microcontroller platforms',
        'Enhanced client solution capabilities'
      ],
      requirements: [
        'Established IoT or embedded systems practice',
        'Technical team with embedded development expertise',
        'Client base requiring embedded solutions',
        'Commitment to platform adoption and training'
      ],
      process: 'Partnership application → Technical assessment → Pilot project → Strategic partnership',
      contact: 'integrator-partnerships@microcloudlab.com'
    }
  ];

  const programs = [
    {
      id: 'startup-program',
      title: 'Startup Accelerator Program',
      icon: 'Rocket',
      description: 'Supporting innovative startups building the future of IoT and embedded systems',
      benefits: [
        'Up to 12 months of free platform access',
        'Priority technical support and mentorship',
        'Access to investor network and funding opportunities',
        'Co-marketing and PR support'
      ],
      eligibility: [
        'Early-stage startup (pre-Series A)',
        'Building IoT or embedded systems products',
        'Less than 50 employees',
        'Committed to using MicroCloudLab as primary development platform'
      ],
      applicationProcess: 'Online application → Review process → Interview → Program acceptance',
      contact: 'startups@microcloudlab.com'
    },
    {
      id: 'opensource-program',
      title: 'Open Source Initiative',
      icon: 'Code',
      description: 'Empowering open source projects that advance embedded systems development',
      benefits: [
        'Free platform access for qualifying projects',
        'Technical support and platform credits',
        'Community showcase and promotion',
        'Collaboration opportunities with other projects'
      ],
      eligibility: [
        'Open source project with embedded systems focus',
        'Active development and community engagement',
        'Commitment to sharing knowledge and resources',
        'Alignment with MicroCloudLab mission and values'
      ],
      applicationProcess: 'Project submission → Community review → Technical evaluation → Program acceptance',
      contact: 'opensource@microcloudlab.com'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Partnership Opportunities */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline text-text-primary mb-4">
            Partnership Opportunities
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Join us in revolutionizing embedded systems development. We're actively seeking strategic partnerships 
            that align with our mission to democratize hardware innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {partnerships.map((partnership) => (
            <div
              key={partnership.id}
              className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                selectedPartnership === partnership.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary/50 hover:bg-surface'
              }`}
              onClick={() => setSelectedPartnership(
                selectedPartnership === partnership.id ? null : partnership.id
              )}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  selectedPartnership === partnership.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-text-secondary'
                }`}>
                  <Icon name={partnership.icon} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {partnership.title}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {partnership.description}
                  </p>
                  
                  {selectedPartnership === partnership.id && (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2">Benefits:</h4>
                        <ul className="space-y-1">
                          {partnership.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                              <Icon name="Check" size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-text-primary mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {partnership.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                              <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-background rounded-lg p-4">
                        <h4 className="font-semibold text-text-primary mb-2">Partnership Process:</h4>
                        <p className="text-sm text-text-secondary mb-3">{partnership.process}</p>
                        <div className="flex items-center justify-between">
                          <a 
                            href={`mailto:${partnership.contact}`}
                            className="text-sm text-primary hover:text-primary-700 font-medium"
                          >
                            {partnership.contact}
                          </a>
                          <Button
                            variant="primary"
                            size="sm"
                            iconName="Mail"
                            iconPosition="left"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${partnership.contact}?subject=Partnership Inquiry - ${partnership.title}`;
                            }}
                          >
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Icon 
                  name={selectedPartnership === partnership.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-text-secondary" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Programs */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline text-text-primary mb-4">
            Special Programs
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            We believe in supporting innovation at every stage. Apply for our special programs designed 
            to accelerate development and foster community growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-surface rounded-xl p-8 border border-border">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-accent rounded-lg">
                  <Icon name={program.icon} size={32} className="text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary">
                    {program.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-text-secondary mb-6">
                {program.description}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Program Benefits:</h4>
                  <ul className="space-y-2">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                        <Icon name="Star" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Eligibility Criteria:</h4>
                  <ul className="space-y-2">
                    {program.eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                        <Icon name="CheckCircle" size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-2">Application Process:</h4>
                  <p className="text-sm text-text-secondary mb-4">{program.applicationProcess}</p>
                  <div className="flex items-center justify-between">
                    <a 
                      href={`mailto:${program.contact}`}
                      className="text-sm text-primary hover:text-primary-700 font-medium"
                    >
                      {program.contact}
                    </a>
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="FileText"
                      iconPosition="left"
                      onClick={() => {
                        window.location.href = `mailto:${program.contact}?subject=Application - ${program.title}`;
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnershipOpportunities;