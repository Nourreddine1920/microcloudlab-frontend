import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useApiState } from '../../../hooks/useApiState';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Since we don't have a specific features endpoint, let's create a features service
  // that combines data from our existing endpoints
  const { data: microcontrollers, loading: mcuLoading } = useApiState(
    () => fetch('http://localhost:8000/api/microcontrollers/').then(res => res.json()),
    []
  );

  const { data: projects, loading: projectsLoading } = useApiState(
    () => fetch('http://localhost:8000/api/projects/').then(res => res.json()),
    []
  );

  const { data: caseStudies, loading: caseStudiesLoading } = useApiState(
    () => fetch('http://localhost:8000/api/casestudies/').then(res => res.json()),
    []
  );

  // Create features data from our API responses
  const features = [
    {
      id: "cloud-hardware",
      title: "Cloud-Based Hardware Access",
      subtitle: "Real microcontrollers in the cloud",
      icon: "Cloud",
      color: "primary",
      bgColor: "primary/10",
      description: "Access real ESP32, Arduino, Raspberry Pi, and other microcontrollers instantly through your browser. No physical hardware required.",
      benefits: [
        `Instant access to ${microcontrollers?.length || 24}+ microcontroller types`,
        "No hardware procurement or maintenance",
        "Always up-to-date firmware and tools",
        "Scalable from 1 to 1000+ concurrent users"
      ],
      demo: {
        title: "Live Hardware Connection",
        content: `Connected to ESP32 DevKit v1\nStatus: Online\nFirmware: v4.4.2\nMemory: 520KB SRAM, 4MB Flash\nGPIO Pins: 30 available\nSensors: Temperature, Humidity, Motion`
      }
    },
    {
      id: "collaborative-coding",
      title: "Collaborative Development",
      subtitle: "GitHub for embedded systems",
      icon: "Users",
      color: "accent",
      bgColor: "accent/10",
      description: "Work together on embedded projects with real-time collaboration, version control, and team management features.",
      benefits: [
        "Real-time collaborative coding",
        "Git integration for embedded projects",
        "Team workspaces and permissions",
        "Code review and merge workflows"
      ],
      demo: {
        title: "Team Collaboration",
        content: `Active Collaborators: 3\n- Sarah Chen (Lead Developer)\n- Mike Rodriguez (Hardware Engineer)  \n- Alex Kim (Firmware Specialist)\n\nRecent Activity:\n✓ Sarah updated sensor calibration\n✓ Mike added WiFi connectivity\n✓ Alex optimized power management`
      }
    },
    {
      id: "instant-deployment",
      title: "Instant Deployment",
      subtitle: "From code to hardware in seconds",
      icon: "Zap",
      color: "conversion",
      bgColor: "conversion/10",
      description: "Deploy your code to real hardware instantly. No flashing, no cables, no setup time. Just click and run.",
      benefits: [
        "One-click deployment to hardware",
        "Automatic compilation and optimization",
        "Real-time debugging and monitoring",
        "Rollback and version management"
      ],
      demo: {
        title: "Deployment Pipeline",
        content: `Deployment Status: Success ✓\nBuild Time: 2.3 seconds\nUpload Time: 0.8 seconds\nTotal Time: 3.1 seconds\n\nHardware Response:\n> Program started successfully\n> WiFi connected: 192.168.1.42\n> Sensors initialized\n> Ready for commands`
      }
    },
    {
      id: "educational-tools",
      title: "Educational Excellence",
      subtitle: "Built for learning and teaching",
      icon: "GraduationCap",
      color: "success",
      bgColor: "success/10",
      description: "Comprehensive educational tools including curriculum integration, progress tracking, and assignment management.",
      benefits: [
        "Curriculum-aligned learning paths",
        "Automated grading and feedback",
        "Student progress analytics",
        "Classroom management tools"
      ],
      demo: {
        title: "Classroom Dashboard",
        content: `Class: Embedded Systems 101\nStudents: 45 active\nCurrent Assignment: IoT Sensor Project\n\nProgress Overview:\n✓ Completed: 32 students (71%)\n⏳ In Progress: 10 students (22%)\n❌ Not Started: 3 students (7%)\n\nAverage Score: 87%`
      }
    }
  ];

  const loading = mcuLoading || projectsLoading || caseStudiesLoading;

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-surface to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-10">
            <div className="inline-flex items-center space-x-2 text-text-secondary">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span>Loading features...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Sparkles" size={16} />
            <span>Platform Features</span>
          </div>
          <h2 className="text-4xl font-headline text-text-primary mb-4">
            The GitHub of Hardware
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Revolutionary features that transform embedded development from hardware-dependent to cloud-native, making it accessible to everyone, everywhere.
          </p>
        </div>

        {/* Features Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-smooth ${
                activeFeature === index
                  ? `bg-${feature.color} text-white shadow-md`
                  : 'bg-background text-text-secondary hover:text-text-primary hover:bg-surface border border-border'
              }`}
            >
              <Icon 
                name={feature.icon} 
                size={16} 
                className={activeFeature === index ? 'text-white' : `text-${feature.color}`}
              />
              <span className="font-medium">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Content */}
        <div className="bg-background rounded-3xl shadow-brand border border-border overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Feature Details */}
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-${features[activeFeature].bgColor} rounded-2xl flex items-center justify-center`}>
                    <Icon 
                      name={features[activeFeature].icon} 
                      size={28} 
                      className={`text-${features[activeFeature].color}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline text-text-primary">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-text-secondary">
                      {features[activeFeature].subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-text-secondary leading-relaxed">
                  {features[activeFeature].description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-text-primary">Key Benefits:</h4>
                  <div className="space-y-2">
                    {features[activeFeature].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 bg-${features[activeFeature].bgColor} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Icon 
                            name="Check" 
                            size={12} 
                            className={`text-${features[activeFeature].color}`}
                          />
                        </div>
                        <span className="text-text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button 
                    variant="primary"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className={`bg-${features[activeFeature].color} hover:bg-${features[activeFeature].color}/90`}
                  >
                    Try This Feature
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Demo/Visualization */}
            <div className="bg-gradient-to-br from-surface to-background p-8 lg:p-12 border-l border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-text-primary">
                    {features[activeFeature].demo.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 bg-${features[activeFeature].color} rounded-full pulse-glow`}></div>
                    <span className={`text-sm text-${features[activeFeature].color} font-medium`}>
                      Live Demo
                    </span>
                  </div>
                </div>

                {/* Demo Content */}
                <div className="bg-secondary-900 rounded-xl p-6 font-code text-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-error rounded-full"></div>
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                    </div>
                    <span className="text-secondary-300 text-xs">MicroCloudLab Terminal</span>
                  </div>
                  <pre className="text-secondary-100 whitespace-pre-wrap">
                    {features[activeFeature].demo.content}
                  </pre>
                </div>

                {/* Feature Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <div className={`text-2xl font-semibold text-${features[activeFeature].color} mb-1`}>
                      {activeFeature === 0 ? `${microcontrollers?.length || 24}+` : activeFeature === 1 ? `${projects?.length || 2400}+` : activeFeature === 2 ? '3.1s' : '89'}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {activeFeature === 0 ? 'Hardware Types' : activeFeature === 1 ? 'Active Teams' : activeFeature === 2 ? 'Avg Deploy Time' : 'Partner Schools'}
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <div className={`text-2xl font-semibold text-${features[activeFeature].color} mb-1`}>
                      {activeFeature === 0 ? '99.9%' : activeFeature === 1 ? `${caseStudies?.length || 15}K+` : activeFeature === 2 ? '156' : '12K+'}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {activeFeature === 0 ? 'Uptime' : activeFeature === 1 ? 'Projects' : activeFeature === 2 ? 'Daily Deploys' : 'Students'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-background rounded-2xl p-6 shadow-brand border border-border text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={24} className="text-primary" />
            </div>
            <h4 className="font-semibold text-text-primary mb-2">Enterprise Security</h4>
            <p className="text-sm text-text-secondary">
              SOC 2 compliant with enterprise-grade security and privacy controls.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-6 shadow-brand border border-border text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Globe" size={24} className="text-accent" />
            </div>
            <h4 className="font-semibold text-text-primary mb-2">Global Access</h4>
            <p className="text-sm text-text-secondary">
              Available worldwide with low-latency connections and 24/7 support.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-6 shadow-brand border border-border text-center">
            <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={24} className="text-success" />
            </div>
            <h4 className="font-semibold text-text-primary mb-2">Lightning Fast</h4>
            <p className="text-sm text-text-secondary">
              Sub-second compilation and deployment with optimized cloud infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;