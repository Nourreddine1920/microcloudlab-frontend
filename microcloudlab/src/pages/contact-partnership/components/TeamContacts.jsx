import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

/**
 * @module TeamContacts
 */

/**
 * A component that displays contact information for key team members and office locations.
 * It provides detailed profiles for team members, including their roles, expertise, and contact links.
 * It also shows office addresses with maps and directions.
 *
 * @returns {JSX.Element} The rendered team contacts and locations section.
 */
const TeamContacts = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      department: "Technical Leadership",
      email: "sarah.chen@microcloudlab.com",
      linkedin: "https://linkedin.com/in/sarahchen-cto",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      expertise: ["Embedded Systems", "Cloud Architecture", "IoT Platforms"],
      availability: "Technical partnerships, platform architecture discussions",
      responseTime: "24-48 hours",
      bio: "Leading our technical vision with 15+ years in embedded systems and cloud computing. PhD in Computer Engineering from MIT."
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "VP of Partnerships",
      department: "Business Development",
      email: "michael.rodriguez@microcloudlab.com",
      linkedin: "https://linkedin.com/in/michaelrodriguez-partnerships",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      expertise: ["Strategic Partnerships", "Business Development", "Market Expansion"],
      availability: "Partnership opportunities, strategic alliances, business development",
      responseTime: "12-24 hours",
      bio: "Driving strategic partnerships and business growth. Former VP at leading IoT companies with proven track record in scaling B2B platforms."
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Director of Education",
      department: "Educational Programs",
      email: "emily.watson@microcloudlab.com",
      linkedin: "https://linkedin.com/in/emilywatson-education",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      expertise: ["STEM Education", "Curriculum Development", "Educational Technology"],
      availability: "Educational partnerships, curriculum integration, instructor training",
      responseTime: "24-48 hours",
      bio: "Championing embedded systems education globally. Former professor with extensive experience in educational technology and curriculum design."
    },
    {
      id: 4,
      name: "James Park",
      role: "Head of Customer Success",
      department: "Customer Experience",
      email: "james.park@microcloudlab.com",
      linkedin: "https://linkedin.com/in/jamespark-customer-success",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      expertise: ["Customer Success", "Technical Support", "Platform Training"],
      availability: "Customer onboarding, technical support, platform training",
      responseTime: "4-8 hours",
      bio: "Ensuring customer success and platform adoption. Expert in technical support and customer relationship management with focus on developer experience."
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Marketing Director",
      department: "Marketing & Communications",
      email: "lisa.thompson@microcloudlab.com",
      linkedin: "https://linkedin.com/in/lisathompson-marketing",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      expertise: ["Developer Marketing", "Content Strategy", "Community Building"],
      availability: "Media inquiries, content partnerships, community initiatives",
      responseTime: "12-24 hours",
      bio: "Leading marketing strategy and community engagement. Specialized in developer-focused marketing with deep understanding of technical audiences."
    },
    {
      id: 6,
      name: "David Kim",
      role: "Enterprise Sales Director",
      department: "Sales",
      email: "david.kim@microcloudlab.com",
      linkedin: "https://linkedin.com/in/davidkim-enterprise-sales",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      expertise: ["Enterprise Sales", "Solution Architecture", "ROI Analysis"],
      availability: "Enterprise inquiries, custom solutions, volume licensing",
      responseTime: "8-12 hours",
      bio: "Driving enterprise adoption with focus on large-scale implementations. Expert in solution architecture and enterprise sales with proven track record."
    }
  ];

  const officeLocations = [
    {
      id: 1,
      name: "San Francisco Headquarters",
      address: "123 Innovation Drive, Suite 400\nSan Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM PST",
      mapUrl: "https://www.google.com/maps?q=37.7749,-122.4194&z=14&output=embed",
      type: "headquarters"
    },
    {
      id: 2,
      name: "Austin Development Center",
      address: "456 Tech Boulevard, Floor 12\nAustin, TX 78701",
      phone: "+1 (555) 234-5678",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM CST",
      mapUrl: "https://www.google.com/maps?q=30.2672,-97.7431&z=14&output=embed",
      type: "development"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Team Members */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline text-text-primary mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Connect directly with our leadership team. Each member brings unique expertise 
            and is committed to helping you succeed with MicroCloudLab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-surface rounded-xl p-6 border border-border hover:shadow-brand transition-all">
              <div className="text-center mb-4">
                <div className="relative inline-block mb-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-foreground rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-1">{member.role}</p>
                <p className="text-sm text-text-secondary">{member.department}</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {member.bio}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-1">Best for:</h4>
                  <p className="text-sm text-text-secondary">{member.availability}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-success-600">
                    <Icon name="Clock" size={14} />
                    <span>{member.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Mail"
                      onClick={() => window.location.href = `mailto:${member.email}`}
                      className="p-2"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Linkedin"
                      onClick={() => window.open(member.linkedin, '_blank')}
                      className="p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Office Locations */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-headline text-text-primary mb-4">
            Our Locations
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Visit us at our offices or connect with us virtually. We're here to support 
            your embedded development journey wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {officeLocations.map((location) => (
            <div key={location.id} className="bg-surface rounded-xl overflow-hidden border border-border">
              <div className="h-48 relative">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={location.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={location.mapUrl}
                  className="border-0"
                />
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    location.type === 'headquarters' ?'bg-primary text-primary-foreground' :'bg-accent text-accent-foreground'
                  }`}>
                    {location.type === 'headquarters' ? 'HQ' : 'Dev Center'}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {location.name}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={18} className="text-text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-text-secondary whitespace-pre-line">
                        {location.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={18} className="text-text-secondary flex-shrink-0" />
                    <a 
                      href={`tel:${location.phone}`}
                      className="text-primary hover:text-primary-700 font-medium"
                    >
                      {location.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={18} className="text-text-secondary flex-shrink-0" />
                    <p className="text-text-secondary">{location.hours}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Navigation"
                    iconPosition="left"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(location.address)}`, '_blank')}
                    fullWidth
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-error-50 border border-error-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-error-100 rounded-lg">
            <Icon name="AlertTriangle" size={24} className="text-error-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-error-800 mb-2">
              Critical Platform Issues
            </h3>
            <p className="text-error-700 mb-4">
              For urgent platform outages or critical technical issues affecting your production environment, 
              contact our emergency support line immediately.
            </p>
            <div className="flex items-center space-x-4">
              <Button
                variant="danger"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.location.href = 'tel:+1-555-URGENT-1'}
              >
                Emergency: +1 (555) URGENT-1
              </Button>
              <span className="text-sm text-error-600">Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamContacts;