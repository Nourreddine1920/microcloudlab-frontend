import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SupportChannels = () => {
  const [selectedChannel, setSelectedChannel] = useState('technical-support');

  const supportChannels = [
    {
      id: 'technical-support',
      title: 'Technical Support',
      icon: 'Wrench',
      description: 'Platform issues, bugs, and technical assistance',
      responseTime: '2-4 hours',
      availability: '24/7 for critical issues, business hours for general support',
      methods: [
        {
          type: 'Live Chat',
          icon: 'MessageCircle',
          description: 'Instant support for logged-in users',
          action: 'Start Chat',
          available: true
        },
        {
          type: 'Support Ticket',
          icon: 'FileText',
          description: 'Detailed technical issues with project context',
          action: 'Create Ticket',
          available: true
        },
        {
          type: 'Emergency Hotline',
          icon: 'Phone',
          description: 'Critical platform outages and urgent issues',
          action: 'Call Now',
          available: true,
          contact: '+1 (555) URGENT-1'
        }
      ],
      tips: [
        'Include project ID and error messages for faster resolution',
        'Attach screenshots or code snippets when relevant',
        'Check our status page for known issues before reporting'
      ]
    },
    {
      id: 'sales-consultation',
      title: 'Sales Consultation',
      icon: 'ShoppingCart',
      description: 'Pricing, demos, and purchase assistance',
      responseTime: '24 hours',
      availability: 'Monday - Friday, 9 AM - 6 PM PST',
      methods: [
        {
          type: 'Schedule Demo',
          icon: 'Calendar',
          description: 'Personalized platform demonstration',
          action: 'Book Demo',
          available: true
        },
        {
          type: 'Sales Chat',
          icon: 'MessageSquare',
          description: 'Quick pricing and feature questions',
          action: 'Chat with Sales',
          available: true
        },
        {
          type: 'Enterprise Consultation',
          icon: 'Building',
          description: 'Custom solutions for large organizations',
          action: 'Request Consultation',
          available: true
        }
      ],
      tips: [
        'Prepare your team size and use case details for accurate pricing',
        'Ask about volume discounts and educational pricing',
        'Inquire about pilot programs and trial extensions'
      ]
    },
    {
      id: 'community-support',
      title: 'Community Support',
      icon: 'Users',
      description: 'Peer-to-peer help and knowledge sharing',
      responseTime: 'Varies (community-driven)',
      availability: '24/7 community activity',
      methods: [
        {
          type: 'Developer Forum',
          icon: 'MessageSquare',
          description: 'Ask questions and share knowledge',
          action: 'Visit Forum',
          available: true
        },
        {
          type: 'Discord Community',
          icon: 'Hash',
          description: 'Real-time chat with developers',
          action: 'Join Discord',
          available: true
        },
        {
          type: 'GitHub Discussions',
          icon: 'Github',
          description: 'Technical discussions and feature requests',
          action: 'View Discussions',
          available: true
        }
      ],
      tips: [
        'Search existing discussions before posting new questions',
        'Provide clear problem descriptions and code examples',
        'Help others to build community karma and recognition'
      ]
    },
    {
      id: 'educational-support',
      title: 'Educational Support',
      icon: 'GraduationCap',
      description: 'Curriculum integration and instructor assistance',
      responseTime: '48 hours',
      availability: 'Monday - Friday, 8 AM - 5 PM PST',
      methods: [
        {
          type: 'Instructor Portal',
          icon: 'BookOpen',
          description: 'Access teaching resources and materials',
          action: 'Access Portal',
          available: true
        },
        {
          type: 'Curriculum Consultation',
          icon: 'Users',
          description: 'Help integrating platform into courses',
          action: 'Schedule Consultation',
          available: true
        },
        {
          type: 'Training Webinars',
          icon: 'Video',
          description: 'Regular training sessions for educators',
          action: 'View Schedule',
          available: true
        }
      ],
      tips: [
        'Mention your institution and course details for tailored support',
        'Ask about bulk student accounts and classroom management',
        'Inquire about co-teaching opportunities and guest lectures'
      ]
    }
  ];

  const currentChannel = supportChannels.find(channel => channel.id === selectedChannel);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline text-text-primary mb-4">
          Support Channels
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Get help when you need it through multiple support channels. Our team and community 
          are here to ensure your success with MicroCloudLab.
        </p>
      </div>

      {/* Channel Selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {supportChannels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => setSelectedChannel(channel.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedChannel === channel.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <Icon name={channel.icon} size={16} />
            <span>{channel.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Channel Details */}
      {currentChannel && (
        <div className="bg-surface rounded-xl p-8 border border-border">
          <div className="flex items-start space-x-4 mb-6">
            <div className="p-4 bg-primary rounded-lg">
              <Icon name={currentChannel.icon} size={32} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                {currentChannel.title}
              </h3>
              <p className="text-text-secondary mb-4">
                {currentChannel.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-success-600" />
                  <span className="text-text-secondary">
                    Response time: <span className="font-medium text-success-600">{currentChannel.responseTime}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span className="text-text-secondary">
                    Available: <span className="font-medium text-primary">{currentChannel.availability}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Support Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {currentChannel.methods.map((method, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  method.available
                    ? 'border-border hover:border-primary/50 hover:bg-background cursor-pointer' :'border-border bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    method.available ? 'bg-accent text-accent-foreground' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon name={method.icon} size={20} />
                  </div>
                  <h4 className="font-semibold text-text-primary">{method.type}</h4>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  {method.description}
                </p>
                <Button
                  variant={method.available ? "primary" : "ghost"}
                  size="sm"
                  disabled={!method.available}
                  fullWidth
                  onClick={() => {
                    if (method.contact) {
                      window.location.href = `tel:${method.contact}`;
                    } else {
                      // Mock action for demo
                      console.log(`${method.action} clicked`);
                    }
                  }}
                >
                  {method.action}
                </Button>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-background rounded-lg p-6">
            <h4 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Lightbulb" size={18} className="text-accent" />
              <span>Pro Tips for Better Support</span>
            </h4>
            <ul className="space-y-2">
              {currentChannel.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                  <Icon name="ArrowRight" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Platform Status */}
      <div className="bg-success-50 border border-success-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-success-100 rounded-lg">
              <Icon name="Activity" size={24} className="text-success-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-success-800">
                Platform Status: All Systems Operational
              </h3>
              <p className="text-success-700">
                99.9% uptime over the last 30 days • Last updated: 2 minutes ago
              </p>
            </div>
          </div>
          <Button
            variant="success"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => window.open('https://status.microcloudlab.com', '_blank')}
          >
            View Status Page
          </Button>
        </div>
      </div>

      {/* Self-Service Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Documentation',
            icon: 'BookOpen',
            description: 'Comprehensive guides and API references',
            link: '/resources-support'
          },
          {
            title: 'Video Tutorials',
            icon: 'Play',
            description: 'Step-by-step video walkthroughs',
            link: '/resources-support'
          },
          {
            title: 'FAQ',
            icon: 'HelpCircle',
            description: 'Answers to common questions',
            link: '/resources-support'
          },
          {
            title: 'System Requirements',
            icon: 'Monitor',
            description: 'Browser and system compatibility',
            link: '/resources-support'
          }
        ].map((resource, index) => (
          <div
            key={index}
            className="p-4 bg-surface rounded-lg border border-border hover:border-primary/50 hover:bg-background transition-all cursor-pointer"
            onClick={() => window.location.href = resource.link}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={resource.icon} size={20} className="text-primary" />
              <h4 className="font-semibold text-text-primary">{resource.title}</h4>
            </div>
            <p className="text-sm text-text-secondary">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportChannels;