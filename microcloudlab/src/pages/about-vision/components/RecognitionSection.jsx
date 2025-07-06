import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecognitionSection = () => {
  const testimonials = [
    {
      name: "Dr. Michael Thompson",
      role: "Professor of Electrical Engineering",
      institution: "MIT",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: `MicroCloudLab has revolutionized how we teach embedded systems. Students who previously couldn't afford development boards are now building sophisticated IoT projects. It's democratization in action.`,
      rating: 5
    },
    {
      name: "Sarah Kim",
      role: "Senior IoT Engineer",
      institution: "Tesla",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: `Our prototyping speed increased by 300% after adopting MicroCloudLab. What used to take weeks now takes days. The collaborative features are game-changing for distributed teams.`,
      rating: 5
    },
    {
      name: "Carlos Rodriguez",
      role: "Computer Science Student",
      institution: "Universidad de São Paulo",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: `As a student from Brazil, I never thought I'd have access to the same tools as students in Silicon Valley. MicroCloudLab changed everything - now I'm building projects that compete globally.`,
      rating: 5
    }
  ];

  const mediaRecognition = [
    {
      publication: "IEEE Spectrum",
      headline: "Cloud-Based Embedded Development: The Future is Here",
      date: "March 2024",
      excerpt: "MicroCloudLab represents a paradigm shift in embedded systems education and development...",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop"
    },
    {
      publication: "TechCrunch",
      headline: "MicroCloudLab Raises $50M to Democratize Embedded Development",
      date: "January 2024",
      excerpt: "The platform that\'s making microcontroller access as universal as web development...",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop"
    },
    {
      publication: "Education Week",
      headline: "How Cloud Technology is Transforming STEM Education",
      date: "February 2024",
      excerpt: "Universities worldwide are adopting cloud-based embedded development platforms...",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop"
    }
  ];

  const awards = [
    {
      title: "EdTech Innovation Award",
      organization: "Global Education Summit",
      year: "2024",
      icon: "Award",
      description: "Recognizing revolutionary impact on embedded systems education"
    },
    {
      title: "Best Developer Tool",
      organization: "Embedded World Conference",
      year: "2024",
      icon: "Code",
      description: "Voted by 10,000+ embedded developers worldwide"
    },
    {
      title: "Social Impact Technology",
      organization: "UN Tech for Good",
      year: "2023",
      icon: "Globe",
      description: "For democratizing access to advanced technology education"
    },
    {
      title: "Startup of the Year",
      organization: "Silicon Valley Tech Awards",
      year: "2023",
      icon: "Rocket",
      description: "Recognizing disruptive innovation in embedded systems"
    }
  ];

  const industryEndorsements = [
    {
      name: "Dr. Jane Foster",
      role: "Chief Technology Officer",
      company: "ARM Holdings",
      quote: "MicroCloudLab is reshaping the embedded development landscape.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Robert Chen",
      role: "VP of Engineering",
      company: "Qualcomm",
      quote: "The future of IoT development is in the cloud, and MicroCloudLab is leading the way.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Lisa Park",
      role: "Director of Innovation",
      company: "Intel",
      quote: "This platform is democratizing embedded development like never before.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-headline text-text-primary mb-6">
            Recognition & Impact
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our mission to democratize embedded development has earned recognition from industry leaders, 
            educational institutions, and media worldwide.
          </p>
        </div>

        {/* User Testimonials */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-12">
            Voices from Our Community
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-surface rounded-xl p-6 shadow-brand">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Icon key={starIndex} name="Star" size={16} className="text-accent fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-text-secondary leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Image 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-text-primary">{testimonial.name}</div>
                    <div className="text-sm text-text-secondary">{testimonial.role}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.institution}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Recognition */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-12">
            Media Coverage
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {mediaRecognition.map((article, index) => (
              <div key={index} className="bg-surface rounded-xl p-6 shadow-brand hover:shadow-lg transition-smooth">
                <div className="flex items-center space-x-3 mb-4">
                  <Image 
                    src={article.logo}
                    alt={article.publication}
                    className="w-12 h-8 object-contain"
                  />
                  <div>
                    <div className="font-semibold text-text-primary">{article.publication}</div>
                    <div className="text-xs text-text-secondary">{article.date}</div>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-3 leading-tight">
                  {article.headline}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth text-sm font-medium"
                >
                  <span>Read Full Article</span>
                  <Icon name="ExternalLink" size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-12">
            Awards & Recognition
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-surface rounded-xl p-6 text-center shadow-brand">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={award.icon} size={32} className="text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">{award.title}</h4>
                <p className="text-primary font-medium text-sm mb-2">{award.organization}</p>
                <p className="text-text-secondary text-xs mb-3">{award.year}</p>
                <p className="text-text-secondary text-xs leading-relaxed">{award.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Endorsements */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-text-primary text-center mb-12">
            Industry Leaders Speak
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {industryEndorsements.map((endorsement, index) => (
              <div key={index} className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                <blockquote className="text-text-secondary leading-relaxed mb-6 italic">
                  "{endorsement.quote}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <Image 
                    src={endorsement.image}
                    alt={endorsement.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-text-primary">{endorsement.name}</div>
                    <div className="text-sm text-text-secondary">{endorsement.role}</div>
                    <div className="text-xs text-primary font-medium">{endorsement.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl font-semibold text-text-primary mb-8">
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-text-secondary">ARM</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-text-secondary">Intel</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-text-secondary">Qualcomm</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-text-secondary">NVIDIA</span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg">
              <Icon name="Lock" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg">
              <Icon name="Award" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;