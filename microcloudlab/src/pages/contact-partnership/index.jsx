import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContactForm from './components/ContactForm';
import PartnershipOpportunities from './components/PartnershipOpportunities';
import TeamContacts from './components/TeamContacts';
import SupportChannels from './components/SupportChannels';

const ContactPartnership = () => {
  const [activeTab, setActiveTab] = useState('contact');

  const tabs = [
    { id: 'contact', label: 'Contact Us', icon: 'MessageCircle' },
    { id: 'partnerships', label: 'Partnerships', icon: 'Handshake' },
    { id: 'team', label: 'Meet the Team', icon: 'Users' },
    { id: 'support', label: 'Support Channels', icon: 'LifeBuoy' }
  ];

  const quickStats = [
    { label: 'Average Response Time', value: '< 4 hours', icon: 'Clock', color: 'text-success-600' },
    { label: 'Customer Satisfaction', value: '98.5%', icon: 'Star', color: 'text-accent' },
    { label: 'Active Partnerships', value: '150+', icon: 'Handshake', color: 'text-primary' },
    { label: 'Global Presence', value: '25 Countries', icon: 'Globe', color: 'text-conversion' }
  ];

  const socialChannels = [
    { name: 'Twitter', icon: 'Twitter', handle: '@MicroCloudLab', url: 'https://twitter.com/microcloudlab' },
    { name: 'LinkedIn', icon: 'Linkedin', handle: 'MicroCloudLab', url: 'https://linkedin.com/company/microcloudlab' },
    { name: 'GitHub', icon: 'Github', handle: 'microcloudlab', url: 'https://github.com/microcloudlab' },
    { name: 'YouTube', icon: 'Youtube', handle: 'MicroCloudLab', url: 'https://youtube.com/@microcloudlab' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact & Partnership - MicroCloudLab | Connect with Our Team</title>
        <meta name="description" content="Get in touch with MicroCloudLab for technical support, sales inquiries, partnerships, and collaboration opportunities. Multiple contact channels available." />
        <meta name="keywords" content="contact, support, partnership, collaboration, embedded systems, microcontroller, cloud development" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="MessageCircle" size={24} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-headline text-text-primary">
                Contact & Partnership
              </h1>
            </div>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Connect with our team for support, partnerships, and collaboration opportunities. 
              We're here to help you succeed with embedded development in the cloud.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Icon name={stat.icon} size={20} className={stat.color} />
                    <span className={`text-lg font-semibold ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-background border-b border-border sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 py-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'contact' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-headline text-text-primary mb-4">
                  Get in Touch
                </h2>
                <p className="text-lg text-text-secondary">
                  Have questions, need support, or want to explore opportunities? 
                  We'd love to hear from you. Choose the best way to connect.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-surface rounded-xl p-8 border border-border">
                    <h3 className="text-2xl font-semibold text-text-primary mb-6">
                      Send us a Message
                    </h3>
                    <ContactForm />
                  </div>
                </div>

                {/* Quick Contact Options */}
                <div className="space-y-6">
                  {/* Direct Contact */}
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Direct Contact
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Icon name="Mail" size={18} className="text-primary" />
                        <div>
                          <p className="text-sm font-medium text-text-primary">General Inquiries</p>
                          <a href="mailto:hello@microcloudlab.com" className="text-sm text-primary hover:text-primary-700">
                            hello@microcloudlab.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Phone" size={18} className="text-primary" />
                        <div>
                          <p className="text-sm font-medium text-text-primary">Sales & Support</p>
                          <a href="tel:+1-555-123-4567" className="text-sm text-primary hover:text-primary-700">
                            +1 (555) 123-4567
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" size={18} className="text-primary" />
                        <div>
                          <p className="text-sm font-medium text-text-primary">Headquarters</p>
                          <p className="text-sm text-text-secondary">San Francisco, CA</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-surface rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Follow Us
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {socialChannels.map((channel, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          iconName={channel.icon}
                          iconPosition="left"
                          onClick={() => window.open(channel.url, '_blank')}
                          className="justify-start"
                        >
                          {channel.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        size="sm"
                        iconName="Play"
                        iconPosition="left"
                        fullWidth
                        onClick={() => window.location.href = '/platform-demo'}
                      >
                        Schedule Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Download"
                        iconPosition="left"
                        fullWidth
                      >
                        Download Brochure
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="left"
                        fullWidth
                        onClick={() => window.open('https://status.microcloudlab.com', '_blank')}
                      >
                        Platform Status
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'partnerships' && <PartnershipOpportunities />}
          {activeTab === 'team' && <TeamContacts />}
          {activeTab === 'support' && <SupportChannels />}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-headline text-white mb-4">
            Ready to Transform Your Embedded Development?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of developers who are already building the future of IoT 
            with MicroCloudLab's cloud-based embedded development platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="secondary"
              size="lg"
              iconName="Zap"
              iconPosition="left"
              onClick={() => window.location.href = '/platform-demo'}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Calendar"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-headline">MicroCloudLab</h3>
                  <p className="text-sm text-secondary-foreground/80">Embedded Development, Unleashed</p>
                </div>
              </div>
              <p className="text-secondary-foreground/80 mb-4 max-w-md">
                Democratizing embedded systems development through cloud-based innovation. 
                Build, test, and deploy IoT solutions from anywhere in the world.
              </p>
              <div className="flex space-x-4">
                {socialChannels.map((channel, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(channel.url, '_blank')}
                    className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors"
                  >
                    <Icon name={channel.icon} size={20} />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="/platform-demo" className="hover:text-secondary-foreground transition-colors">Platform Demo</a></li>
                <li><a href="/solutions-hub" className="hover:text-secondary-foreground transition-colors">Solutions</a></li>
                <li><a href="/resources-support" className="hover:text-secondary-foreground transition-colors">Documentation</a></li>
                <li><a href="/about-vision" className="hover:text-secondary-foreground transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="mailto:support@microcloudlab.com" className="hover:text-secondary-foreground transition-colors">Technical Support</a></li>
                <li><a href="mailto:sales@microcloudlab.com" className="hover:text-secondary-foreground transition-colors">Sales Inquiries</a></li>
                <li><a href="mailto:partnerships@microcloudlab.com" className="hover:text-secondary-foreground transition-colors">Partnerships</a></li>
                <li><a href="https://status.microcloudlab.com" className="hover:text-secondary-foreground transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
            <p>&copy; {new Date().getFullYear()} MicroCloudLab. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPartnership;