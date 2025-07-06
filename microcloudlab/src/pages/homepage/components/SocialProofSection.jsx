import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SocialProofSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Professor of Computer Engineering",
      institution: "Stanford University",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `MicroCloudLab has revolutionized how we teach embedded systems. Our students can now access real hardware from anywhere, and we've eliminated the $50,000 annual hardware budget while improving learning outcomes.`,
      rating: 5,
      category: "Education",
      stats: {
        students: "200+",
        courses: "3",
        satisfaction: "96%"
      }
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Senior IoT Developer",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `We prototyped our entire IoT product line using MicroCloudLab before investing in physical hardware. It saved us 6 months of development time and reduced our hardware costs by 80% during the design phase.`,
      rating: 5,
      category: "Enterprise",
      stats: {
        projects: "12",
        timeSaved: "6 months",
        costReduction: "80%"
      }
    },
    {
      id: 3,
      name: "Alex Kim",
      role: "Computer Science Student",
      institution: "University of California, Berkeley",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `As a student without access to expensive hardware, MicroCloudLab gave me the opportunity to build real embedded projects. I landed my dream job at a robotics company thanks to the portfolio I built on the platform.`,
      rating: 5,
      category: "Student",
      stats: {
        projects: "8",
        skills: "15+",
        jobOffer: "Yes"
      }
    },
    {
      id: 4,
      name: "Dr. Priya Patel",
      role: "Research Director",
      company: "Innovation Labs",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `Our research team collaborates across 5 countries. MicroCloudLab enables us to work on the same embedded systems simultaneously, accelerating our research timeline by 40% and improving reproducibility.`,
      rating: 5,
      category: "Research",
      stats: {
        countries: "5",
        researchers: "12",
        acceleration: "40%"
      }
    }
  ];

  const partners = [
    {
      name: "Stanford University",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=60&fit=crop",
      category: "Education"
    },
    {
      name: "MIT",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=60&fit=crop",
      category: "Education"
    },
    {
      name: "UC Berkeley",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=60&fit=crop",
      category: "Education"
    },
    {
      name: "Carnegie Mellon",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=60&fit=crop",
      category: "Education"
    },
    {
      name: "Georgia Tech",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=60&fit=crop",
      category: "Education"
    },
    {
      name: "University of Texas",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=60&fit=crop",
      category: "Education"
    }
  ];

  const achievements = [
    {
      icon: "Award",
      title: "Best EdTech Innovation 2024",
      organization: "IEEE Education Society",
      color: "warning"
    },
    {
      icon: "Star",
      title: "Top 10 Developer Tools",
      organization: "Developer Weekly",
      color: "accent"
    },
    {
      icon: "Shield",
      title: "SOC 2 Type II Certified",
      organization: "Security Compliance",
      color: "success"
    },
    {
      icon: "Users",
      title: "Community Choice Award",
      organization: "Embedded Systems Conference",
      color: "primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Heart" size={16} />
            <span>Trusted Worldwide</span>
          </div>
          <h2 className="text-4xl font-headline text-text-primary mb-4">
            Loved by Developers, Educators & Students
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Join thousands of professionals and institutions who have transformed their embedded development workflow with MicroCloudLab.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Testimonial Navigation */}
            <div className="space-y-3">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-full text-left p-4 rounded-xl transition-smooth ${
                    activeTestimonial === index
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-surface hover:bg-background border border-border'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold truncate ${
                        activeTestimonial === index ? 'text-white' : 'text-text-primary'
                      }`}>
                        {testimonial.name}
                      </div>
                      <div className={`text-sm truncate ${
                        activeTestimonial === index ? 'text-white/80' : 'text-text-secondary'
                      }`}>
                        {testimonial.role}
                      </div>
                      <div className={`text-xs truncate ${
                        activeTestimonial === index ? 'text-white/60' : 'text-text-secondary'
                      }`}>
                        {testimonial.institution || testimonial.company}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Testimonial */}
            <div className="lg:col-span-2">
              <div className="bg-surface rounded-2xl p-8 shadow-brand border border-border">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xl font-semibold text-text-primary">
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className="text-text-secondary">
                          {testimonials[activeTestimonial].role}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {testimonials[activeTestimonial].institution || testimonials[activeTestimonial].company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg text-text-secondary leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    {Object.entries(testimonials[activeTestimonial].stats).map(([key, value], index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-semibold text-primary">{value}</div>
                        <div className="text-xs text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Category Badge */}
                  <div className="flex justify-end">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {testimonials[activeTestimonial].category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Institutions */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-headline text-text-primary mb-2">
              Trusted by Leading Institutions
            </h3>
            <p className="text-text-secondary">
              89 universities and schools worldwide use MicroCloudLab
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-surface rounded-xl p-4 flex items-center justify-center hover:shadow-md transition-smooth border border-border">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-smooth"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Recognition */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-headline text-text-primary mb-2">
              Awards & Recognition
            </h3>
            <p className="text-text-secondary">
              Recognized by industry leaders and organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-background rounded-2xl p-6 shadow-brand border border-border text-center">
                <div className={`w-12 h-12 bg-${achievement.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={achievement.icon} size={24} className={`text-${achievement.color}`} />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">
                  {achievement.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {achievement.organization}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-headline text-primary mb-2">2,847</div>
              <div className="text-sm text-text-secondary">Active Developers</div>
            </div>
            <div>
              <div className="text-3xl font-headline text-accent mb-2">15,234</div>
              <div className="text-sm text-text-secondary">Projects Created</div>
            </div>
            <div>
              <div className="text-3xl font-headline text-success mb-2">89</div>
              <div className="text-sm text-text-secondary">Partner Institutions</div>
            </div>
            <div>
              <div className="text-3xl font-headline text-conversion mb-2">47</div>
              <div className="text-sm text-text-secondary">Countries</div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              variant="primary"
              size="lg"
              iconName="Users"
              iconPosition="left"
              className="bg-primary hover:bg-primary/90"
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;