import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FoundingStory = () => {
  const challenges = [
    {
      icon: "DollarSign",
      title: "Expensive Hardware",
      description: "Development boards costing hundreds of dollars, creating financial barriers for students and hobbyists."
    },
    {
      icon: "Settings",
      title: "Complex Setup",
      description: "Hours spent configuring toolchains, drivers, and development environments before writing a single line of code."
    },
    {
      icon: "MapPin",
      title: "Geographic Limitations",
      description: "Limited access to specialized hardware in remote areas, creating educational and innovation gaps."
    },
    {
      icon: "Clock",
      title: "Time Constraints",
      description: "Lengthy procurement processes and shipping delays slowing down innovation and learning."
    }
  ];

  const solutions = [
    {
      icon: "Cloud",
      title: "Cloud-Native Access",
      description: "Instant access to any microcontroller from any device with an internet connection."
    },
    {
      icon: "Zap",
      title: "Zero Setup",
      description: "Start coding immediately with pre-configured environments and instant deployment."
    },
    {
      icon: "Globe",
      title: "Universal Availability",
      description: "Equal access for developers worldwide, regardless of location or economic status."
    },
    {
      icon: "Rocket",
      title: "Rapid Innovation",
      description: "From idea to prototype in minutes, not weeks or months."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-headline text-text-primary mb-6">
            The Story Behind the Revolution
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Born from frustration with traditional embedded development barriers, 
            MicroCloudLab emerged as the solution the industry desperately needed.
          </p>
        </div>

        {/* Founding Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="bg-surface rounded-2xl p-8 shadow-brand">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Icon name="Lightbulb" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary">The Eureka Moment</h3>
                  <p className="text-text-secondary">Silicon Valley, 2021</p>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6">
                "I was teaching embedded systems at Stanford when I realized that half my students 
                couldn't afford the development boards, and the other half spent more time fighting 
                with toolchains than actually learning. That's when it hit me - what if we could 
                make embedded development as accessible as web development?"
              </p>
              <div className="flex items-center space-x-3">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Dr. Sarah Chen, Founder & CEO"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-text-primary">Dr. Sarah Chen</div>
                  <div className="text-sm text-text-secondary">Founder & CEO</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-error/5 border border-error/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-error mb-4 flex items-center">
                <Icon name="AlertTriangle" size={20} className="mr-2" />
                The Problem We Solved
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name={challenge.icon} size={16} className="text-error" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary text-sm">{challenge.title}</div>
                      <div className="text-xs text-text-secondary mt-1">{challenge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-success/5 border border-success/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-success mb-4 flex items-center">
                <Icon name="CheckCircle" size={20} className="mr-2" />
                Our Revolutionary Solution
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name={solution.icon} size={16} className="text-success" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary text-sm">{solution.title}</div>
                      <div className="text-xs text-text-secondary mt-1">{solution.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12 text-center">
          <Icon name="Eye" size={48} className="text-primary mx-auto mb-6" />
          <h3 className="text-2xl sm:text-3xl font-headline text-text-primary mb-6">
            Our Vision for the Future
          </h3>
          <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
            We envision a world where innovation knows no boundaries - where a student in rural India 
            has the same access to cutting-edge microcontrollers as an engineer in Silicon Valley. 
            Where ideas can be prototyped instantly, collaboration happens seamlessly across continents, 
            and the next breakthrough in IoT comes from the most unexpected places.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundingStory;