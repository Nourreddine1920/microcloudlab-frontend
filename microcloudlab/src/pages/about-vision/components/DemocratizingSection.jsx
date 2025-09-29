import React from 'react';
import Icon from '../../../components/AppIcon';

/**
 * @module DemocratizingSection
 */

/**
 * A section component for the "About & Vision" page that details how MicroCloudLab
 * is democratizing innovation in embedded systems. It includes impact statistics,
 * before-and-after comparisons, success stories, and a call to action.
 *
 * @returns {JSX.Element} The rendered DemocratizingSection component.
 */
const DemocratizingSection = () => {
  const impactStats = [
    {
      icon: "Users",
      value: "50,000+",
      label: "Students Empowered",
      description: "From rural villages to urban centers, students worldwide now have access to the same embedded development tools.",
      color: "accent"
    },
    {
      icon: "DollarSign",
      value: "85%",
      label: "Cost Reduction",
      description: "Educational institutions save thousands on hardware while providing better learning experiences.",
      color: "success"
    },
    {
      icon: "Clock",
      value: "90%",
      label: "Faster Prototyping",
      description: "From weeks to hours - revolutionary speed in IoT development and testing cycles.",
      color: "primary"
    },
    {
      icon: "Globe",
      value: "120+",
      label: "Countries Reached",
      description: "Breaking geographical barriers, enabling innovation in every corner of the world.",
      color: "conversion"
    }
  ];

  const beforeAfter = [
    {
      category: "Hardware Access",
      before: {
        icon: "AlertTriangle",
        title: "Limited & Expensive",
        points: [
          "Development boards cost $50-500 each",
          "Limited variety available locally",
          "Shipping delays and import duties",
          "Hardware becomes obsolete quickly"
        ]
      },
      after: {
        icon: "CheckCircle",
        title: "Unlimited & Affordable",
        points: [
          "Access to 50+ microcontroller types",
          "Instant availability 24/7",
          "No shipping or import costs",
          "Always latest hardware versions"
        ]
      }
    },
    {
      category: "Learning Experience",
      before: {
        icon: "AlertTriangle",
        title: "Frustrating & Slow",
        points: [
          "Hours spent on toolchain setup",
          "Complex driver installations",
          "Hardware debugging challenges",
          "Limited collaboration options"
        ]
      },
      after: {
        icon: "CheckCircle",
        title: "Smooth & Fast",
        points: [
          "Zero setup - start coding immediately",
          "Pre-configured environments",
          "Advanced debugging tools",
          "Real-time collaboration features"
        ]
      }
    },
    {
      category: "Innovation Speed",
      before: {
        icon: "AlertTriangle",
        title: "Weeks to Prototype",
        points: [
          "Procurement delays",
          "Setup and configuration time",
          "Hardware troubleshooting",
          "Limited testing capabilities"
        ]
      },
      after: {
        icon: "CheckCircle",
        title: "Minutes to Prototype",
        points: [
          "Instant hardware access",
          "Pre-built project templates",
          "Automated testing suites",
          "Rapid iteration cycles"
        ]
      }
    }
  ];

  const successStories = [
    {
      location: "Rural India",
      story: "Engineering students in remote villages now build IoT projects that compete globally, without ever owning physical hardware.",
      impact: "200+ students reached",
      icon: "MapPin"
    },
    {
      location: "African Universities",
      story: "Computer science programs across Africa integrate embedded systems into curriculum without hardware investment.",
      impact: "50+ institutions",
      icon: "GraduationCap"
    },
    {
      location: "Latin America",
      story: "Startup accelerators use MicroCloudLab to help entrepreneurs prototype IoT solutions in days, not months.",
      impact: "1000+ prototypes",
      icon: "Rocket"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "text-primary bg-primary/10",
      accent: "text-accent bg-accent/10",
      success: "text-success bg-success/10",
      conversion: "text-conversion bg-conversion/10"
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Heart" size={16} />
            <span>Democratizing Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-headline text-text-primary mb-6">
            Breaking Down Barriers,
            <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              Building Up Dreams
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Every student deserves access to the same tools that power Silicon Valley innovation. 
            We're making that dream a reality, one developer at a time.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-brand text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(stat.color)}`}>
                <Icon name={stat.icon} size={32} />
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-text-primary mb-3">{stat.label}</div>
              <p className="text-sm text-text-secondary leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Before vs After Comparison */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-12">
            The Transformation We've Enabled
          </h3>
          <div className="space-y-12">
            {beforeAfter.map((comparison, index) => (
              <div key={index} className="bg-background rounded-2xl p-8 shadow-brand">
                <h4 className="text-xl font-semibold text-text-primary text-center mb-8">
                  {comparison.category}
                </h4>
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Before */}
                  <div className="bg-error/5 border border-error/20 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon name={comparison.before.icon} size={24} className="text-error" />
                      <h5 className="text-lg font-semibold text-error">Before MicroCloudLab</h5>
                    </div>
                    <h6 className="font-medium text-text-primary mb-3">{comparison.before.title}</h6>
                    <ul className="space-y-2">
                      {comparison.before.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-2">
                          <Icon name="X" size={16} className="text-error mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* After */}
                  <div className="bg-success/5 border border-success/20 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon name={comparison.after.icon} size={24} className="text-success" />
                      <h5 className="text-lg font-semibold text-success">With MicroCloudLab</h5>
                    </div>
                    <h6 className="font-medium text-text-primary mb-3">{comparison.after.title}</h6>
                    <ul className="space-y-2">
                      {comparison.after.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-12">
            Real Impact, Real Stories
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-background rounded-xl p-6 shadow-brand">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={story.icon} size={24} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary">{story.location}</h4>
                </div>
                <p className="text-text-secondary leading-relaxed mb-4">{story.story}</p>
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">{story.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12 text-center">
          <Icon name="Globe" size={48} className="text-primary mx-auto mb-6" />
          <h3 className="text-2xl sm:text-3xl font-headline text-text-primary mb-6">
            Join the Revolution
          </h3>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Be part of the movement that's democratizing embedded development. Whether you're a student, 
            educator, or developer, you have the power to shape the future of IoT innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="/platform-demo" 
              className="inline-flex items-center space-x-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg hover:bg-accent/90 transition-smooth shadow-oscilloscope"
            >
              <Icon name="Play" size={20} />
              <span>Experience the Platform</span>
            </a>
            <a 
              href="/contact-partnership" 
              className="inline-flex items-center space-x-2 border border-border text-text-primary px-8 py-4 rounded-lg hover:bg-surface transition-smooth"
            >
              <Icon name="Users" size={20} />
              <span>Partner with Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemocratizingSection;