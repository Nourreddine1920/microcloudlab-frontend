import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import ResourceCard from './components/ResourceCard';
import LearningPathCard from './components/LearningPathCard';
import SupportChannelCard from './components/SupportChannelCard';
import DocumentationSection from './components/DocumentationSection';
import CommunityShowcase from './components/CommunityShowcase';

/**
 * @module ResourcesSupport
 */

/**
 * The main page for accessing all resources and support channels.
 * It features a tabbed navigation system to switch between learning paths,
 * documentation, community showcases, support options, and downloads.
 *
 * @returns {JSX.Element} The rendered resources and support page.
 */
const ResourcesSupport = () => {
  const [activeSection, setActiveSection] = useState('learning-paths');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const navigationSections = [
    { id: 'learning-paths', name: 'Learning Paths', icon: 'BookOpen' },
    { id: 'documentation', name: 'Documentation', icon: 'FileText' },
    { id: 'community', name: 'Community', icon: 'Users' },
    { id: 'support', name: 'Support', icon: 'MessageCircle' },
    { id: 'downloads', name: 'Downloads', icon: 'Download' }
  ];

  const learningPaths = [
    {
      title: "Embedded Systems Fundamentals",
      description: "Master the basics of embedded programming, from GPIO control to interrupt handling. Perfect for beginners starting their embedded journey.",
      modules: [
        "Introduction to Microcontrollers",
        "GPIO Programming & Control",
        "Analog-to-Digital Conversion",
        "Timer & Counter Operations",
        "Interrupt Service Routines",
        "Serial Communication Basics"
      ],
      duration: "6-8 weeks",
      difficulty: "Beginner",
      completedModules: 0,
      totalModules: 6,
      skills: ["GPIO Control", "ADC Programming", "Timers", "Interrupts", "UART Communication"],
      isStarted: false
    },
    {
      title: "IoT Development with ESP32",
      description: "Build connected devices using ESP32\'s WiFi and Bluetooth capabilities. Learn cloud integration and real-time data processing.",
      modules: [
        "ESP32 Architecture Overview",
        "WiFi Configuration & Management",
        "Bluetooth Low Energy (BLE)",
        "MQTT Protocol Implementation",
        "Cloud Platform Integration",
        "Over-the-Air (OTA) Updates",
        "Power Management Techniques",
        "Security Best Practices"
      ],
      duration: "8-10 weeks",
      difficulty: "Intermediate",
      completedModules: 3,
      totalModules: 8,
      skills: ["WiFi Programming", "BLE", "MQTT", "Cloud Integration", "OTA Updates"],
      isStarted: true
    },
    {
      title: "Advanced Real-Time Systems",
      description: "Dive deep into RTOS concepts, task scheduling, and real-time constraints. Build professional-grade embedded applications.",
      modules: [
        "Real-Time Operating Systems",
        "Task Creation & Management",
        "Inter-Task Communication",
        "Synchronization Primitives",
        "Memory Management",
        "Timing Analysis & Optimization",
        "Fault Tolerance & Recovery",
        "System Integration Testing"
      ],
      duration: "10-12 weeks",
      difficulty: "Advanced",
      completedModules: 0,
      totalModules: 8,
      skills: ["FreeRTOS", "Task Scheduling", "IPC", "Memory Management", "System Optimization"],
      isStarted: false
    }
  ];

  const featuredResources = [
    {
      title: "Arduino Programming Quick Reference",
      description: "Comprehensive guide covering all Arduino functions, libraries, and best practices with practical examples.",
      type: "Guide",
      difficulty: "Beginner",
      duration: "30 min read",
      author: "MicroCloudLab Team",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      tags: ["Arduino", "Programming", "Reference"],
      isNew: true
    },
    {
      title: "ESP32 Deep Sleep Tutorial",
      description: "Learn how to implement power-efficient deep sleep modes in ESP32 projects to extend battery life significantly.",
      type: "Tutorial",
      difficulty: "Intermediate",
      duration: "45 min",
      author: "Sarah Chen",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
      tags: ["ESP32", "Power Management", "Battery Life"]
    },
    {
      title: "MQTT Protocol Implementation",
      description: "Step-by-step video tutorial on implementing MQTT communication for IoT devices with practical examples.",
      type: "Video",
      difficulty: "Intermediate",
      duration: "1.5 hours",
      author: "Marcus Rodriguez",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      tags: ["MQTT", "IoT", "Communication"]
    },
    {
      title: "Sensor Calibration Code Library",
      description: "Ready-to-use code samples for calibrating various sensors including temperature, humidity, and pressure sensors.",
      type: "Code Sample",
      difficulty: "Beginner",
      duration: "15 min setup",
      author: "Emily Watson",
      thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      tags: ["Sensors", "Calibration", "Code Library"]
    },
    {
      title: "Real-Time Debugging Masterclass",
      description: "Advanced project walkthrough demonstrating professional debugging techniques for embedded systems.",
      type: "Project",
      difficulty: "Advanced",
      duration: "3 hours",
      author: "David Kim",
      thumbnail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
      tags: ["Debugging", "Advanced", "Professional"]
    },
    {
      title: "PCB Design Integration Guide",
      description: "Complete guide on integrating MicroCloudLab platform with custom PCB designs and hardware prototypes.",
      type: "Documentation",
      difficulty: "Advanced",
      duration: "2 hours read",
      author: "Alex Thompson",
      thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400",
      tags: ["PCB Design", "Hardware", "Integration"]
    }
  ];

  const supportChannels = [
    {
      title: "Live Chat Support",
      description: "Get instant help from our technical support team",
      icon: "MessageCircle",
      availability: "24/7",
      responseTime: "< 2 minutes",
      isOnline: true,
      stats: {
        activeAgents: 12,
        avgRating: "4.9",
        resolvedToday: 156
      }
    },
    {
      title: "Community Forums",
      description: "Connect with fellow developers and share knowledge",
      icon: "Users",
      availability: "Always Active",
      responseTime: "< 30 minutes",
      isOnline: true,
      stats: {
        activeMembers: "2.4K",
        dailyPosts: 89,
        expertContributors: 45
      }
    },
    {
      title: "Expert Office Hours",
      description: "Schedule 1-on-1 sessions with embedded systems experts",
      icon: "Video",
      availability: "Mon-Fri 9AM-6PM PST",
      responseTime: "Same day booking",
      isOnline: false,
      stats: {
        availableExperts: 8,
        avgSessionRating: "4.8",
        sessionsThisWeek: 23
      }
    }
  ];

  const downloadableResources = [
    {
      title: "Embedded Systems Curriculum Guide",
      description: "Complete curriculum framework for educators teaching embedded systems",
      type: "PDF Guide",
      size: "2.4 MB",
      downloads: 1520,
      icon: "BookOpen"
    },
    {
      title: "Arduino Code Templates",
      description: "Collection of starter templates for common Arduino projects",
      type: "ZIP Archive",
      size: "856 KB",
      downloads: 3240,
      icon: "Code"
    },
    {
      title: "ESP32 Pinout Reference",
      description: "High-resolution pinout diagrams for all ESP32 variants",
      type: "PDF Reference",
      size: "1.8 MB",
      downloads: 2890,
      icon: "Cpu"
    },
    {
      title: "IoT Security Checklist",
      description: "Comprehensive security checklist for IoT device development",
      type: "PDF Checklist",
      size: "945 KB",
      downloads: 1670,
      icon: "Shield"
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic here
    console.log('Searching for:', query);
  };

  const handleResourceAccess = (resource) => {
    console.log('Accessing resource:', resource);
  };

  const handleLearningPathStart = (path) => {
    console.log('Starting learning path:', path);
  };

  const handleLearningPathContinue = (path) => {
    console.log('Continuing learning path:', path);
  };

  const handleSupportAccess = (channel) => {
    console.log('Accessing support channel:', channel);
  };

  const handleDownload = (resource) => {
    console.log('Downloading resource:', resource);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-headline text-text-primary mb-6">
              Resources & Support
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Your comprehensive knowledge hub for embedded development. From beginner tutorials to advanced documentation, 
              find everything you need to master embedded systems in the cloud.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-semibold text-primary mb-2">150+</div>
              <div className="text-sm text-text-secondary">Tutorials & Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-accent mb-2">2.4K+</div>
              <div className="text-sm text-text-secondary">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-success mb-2">50+</div>
              <div className="text-sm text-text-secondary">Code Samples</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-warning mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4 overflow-x-auto">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-smooth ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={section.icon} size={18} />
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Learning Paths Section */}
        {activeSection === 'learning-paths' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-text-primary mb-4">Learning Paths</h2>
              <p className="text-text-secondary text-lg">
                Structured curricula designed to take you from beginner to expert in embedded systems development.
              </p>
            </div>

            <div className="grid gap-8 mb-12">
              {learningPaths.map((path, index) => (
                <LearningPathCard
                  key={index}
                  {...path}
                  onStart={() => handleLearningPathStart(path)}
                  onContinue={() => handleLearningPathContinue(path)}
                />
              ))}
            </div>

            {/* Featured Resources */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-text-primary mb-4">Featured Resources</h3>
              <p className="text-text-secondary mb-6">
                Handpicked tutorials, guides, and code samples to accelerate your learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => (
                <ResourceCard
                  key={index}
                  {...resource}
                  onAccess={() => handleResourceAccess(resource)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Documentation Section */}
        {activeSection === 'documentation' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-text-primary mb-4">Technical Documentation</h2>
              <p className="text-text-secondary text-lg">
                Comprehensive API references, hardware specifications, and integration guides for the MicroCloudLab platform.
              </p>
            </div>
            <DocumentationSection />
          </div>
        )}

        {/* Community Section */}
        {activeSection === 'community' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-text-primary mb-4">Community Hub</h2>
              <p className="text-text-secondary text-lg">
                Explore amazing projects, contribute to the knowledge base, and connect with fellow embedded developers.
              </p>
            </div>
            <CommunityShowcase />
          </div>
        )}

        {/* Support Section */}
        {activeSection === 'support' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-text-primary mb-4">Get Support</h2>
              <p className="text-text-secondary text-lg">
                Multiple channels to get help, from instant chat support to expert consultations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {supportChannels.map((channel, index) => (
                <SupportChannelCard
                  key={index}
                  {...channel}
                  onAccess={() => handleSupportAccess(channel)}
                />
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-surface/50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-text-primary mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {[
                  {
                    question: "How do I get started with MicroCloudLab?",
                    answer: "Sign up for a free account and follow our 'Getting Started' tutorial. You'll be coding on real hardware within minutes!"
                  },
                  {
                    question: "What microcontrollers are supported?",
                    answer: "We support Arduino Uno, ESP32, Raspberry Pi Pico, STM32 Nucleo boards, and many more. Check our hardware documentation for the complete list."
                  },
                  {
                    question: "Can I use my own code libraries?",
                    answer: "Yes! You can upload custom libraries and use any Arduino or PlatformIO compatible libraries in your projects."
                  },
                  {
                    question: "Is there a limit on project execution time?",
                    answer: "Free accounts have a 30-minute execution limit per session. Pro accounts get unlimited execution time and priority hardware access."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h4 className="text-lg font-medium text-text-primary mb-2">{faq.question}</h4>
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Downloads Section */}
        {activeSection === 'downloads' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-text-primary mb-4">Downloads</h2>
              <p className="text-text-secondary text-lg">
                Essential resources, templates, and tools to enhance your embedded development workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {downloadableResources.map((resource, index) => (
                <div key={index} className="bg-surface/50 border border-border rounded-xl p-6 hover:shadow-brand transition-smooth">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon name={resource.icon} size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">{resource.title}</h3>
                        <p className="text-text-secondary text-sm mt-1">{resource.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="File" size={14} />
                        <span>{resource.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="HardDrive" size={14} />
                        <span>{resource.size}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Download" size={14} />
                        <span>{resource.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      onClick={() => handleDownload(resource)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Join thousands of developers already using MicroCloudLab to create amazing embedded projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Try Interactive Demo
            </Button>
            <Link to="/ide">
              <Button
                variant="outline"
                size="lg"
                iconName="Zap"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Layers" size={20} className="text-white" />
                </div>
                <span className="text-lg font-semibold">MicroCloudLab</span>
              </div>
              <p className="text-secondary-foreground/80 text-sm">
                Democratizing embedded development through cloud-based innovation.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Documentation</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Tutorials</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">API Reference</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Help Center</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Contact Us</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Status Page</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Bug Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">GitHub</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Discord</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Twitter</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
            <p>&copy; {new Date().getFullYear()} MicroCloudLab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesSupport;