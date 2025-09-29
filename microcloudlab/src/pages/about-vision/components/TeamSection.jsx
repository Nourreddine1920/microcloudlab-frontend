import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

/**
 * @module TeamSection
 */

/**
 * A section component for the "About & Vision" page that introduces the MicroCloudLab team.
 * It showcases the founding members with detailed profiles, the leadership team,
 * and includes a call to action for joining the team.
 *
 * @returns {JSX.Element} The rendered TeamSection component.
 */
const TeamSection = () => {
  const founders = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Former Stanford professor with 15+ years in embedded systems. Led research on distributed computing and IoT architectures.",
      credentials: ["PhD Computer Engineering, MIT", "Former Principal Engineer, Intel", "Author of \'Embedded Systems Revolution'"],
      vision: "Making embedded development as accessible as web development, breaking down every barrier to innovation.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Marcus Rodriguez",
      role: "Co-Founder & CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Cloud infrastructure expert who architected systems for millions of users. Passionate about democratizing technology access.",
      credentials: ["MS Computer Science, Stanford", "Former Senior Architect, Google Cloud", "Kubernetes Core Contributor"],
      vision: "Building the most reliable and scalable embedded development platform the world has ever seen.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Dr. Priya Patel",
      role: "VP of Education",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Educational technology pioneer who transformed STEM learning at scale. Expert in curriculum design and student engagement.",
      credentials: ["PhD Educational Technology, Berkeley", "Former Director, Khan Academy", "UNESCO Education Innovation Award"],
      vision: "Ensuring every student, regardless of background, has access to world-class embedded systems education.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  const keyTeam = [
    {
      name: "Alex Kim",
      role: "Head of Engineering",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      expertise: "Real-time Systems & Hardware Abstraction"
    },
    {
      name: "Lisa Thompson",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
      expertise: "User Experience & Developer Tools"
    },
    {
      name: "David Park",
      role: "Head of Security",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      expertise: "Cloud Security & Compliance"
    },
    {
      name: "Emma Wilson",
      role: "Head of Community",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      expertise: "Developer Relations & Education"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-headline text-text-primary mb-6">
            Meet the Visionaries
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A team of passionate innovators, educators, and engineers united by the mission 
            to democratize embedded development for everyone, everywhere.
          </p>
        </div>

        {/* Founders */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-12">Founding Team</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="bg-surface rounded-2xl p-8 shadow-brand hover:shadow-lg transition-smooth">
                {/* Profile Image */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Image 
                      src={founder.image}
                      alt={founder.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Zap" size={16} className="text-accent-foreground" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-text-primary">{founder.name}</h4>
                  <p className="text-primary font-medium">{founder.role}</p>
                </div>

                {/* Bio */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {founder.bio}
                </p>

                {/* Credentials */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-text-primary mb-3">Credentials</h5>
                  <div className="space-y-2">
                    {founder.credentials.map((credential, credIndex) => (
                      <div key={credIndex} className="flex items-start space-x-2">
                        <Icon name="Award" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-text-secondary">{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vision */}
                <div className="mb-6">
                  <h5 className="text-sm font-semibold text-text-primary mb-2">Vision</h5>
                  <p className="text-xs text-text-secondary italic leading-relaxed">
                    "{founder.vision}"
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <a href={founder.social.linkedin} className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-smooth">
                    <Icon name="Linkedin" size={16} className="text-primary" />
                  </a>
                  <a href={founder.social.twitter} className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-smooth">
                    <Icon name="Twitter" size={16} className="text-primary" />
                  </a>
                  <a href={founder.social.github} className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-smooth">
                    <Icon name="Github" size={16} className="text-primary" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Team Members */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-12">Leadership Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyTeam.map((member, index) => (
              <div key={index} className="bg-surface rounded-xl p-6 text-center shadow-brand hover:shadow-lg transition-smooth">
                <Image 
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20"
                />
                <h4 className="text-lg font-semibold text-text-primary mb-1">{member.name}</h4>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-xs text-text-secondary">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-8">Our Global Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">45+</div>
              <div className="text-sm text-text-secondary">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">12</div>
              <div className="text-sm text-text-secondary">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">8</div>
              <div className="text-sm text-text-secondary">Time Zones</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-conversion mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Global Support</div>
            </div>
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-text-primary mb-4">Join Our Mission</h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our vision of democratizing 
            embedded development. Help us build the future of IoT innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#careers" 
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-smooth"
            >
              <Icon name="Users" size={20} />
              <span>View Open Positions</span>
            </a>
            <a 
              href="#culture" 
              className="inline-flex items-center space-x-2 border border-border text-text-primary px-6 py-3 rounded-lg hover:bg-surface transition-smooth"
            >
              <Icon name="Heart" size={20} />
              <span>Our Culture</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;