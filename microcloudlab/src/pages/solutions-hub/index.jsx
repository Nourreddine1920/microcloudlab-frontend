import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import SolutionCard from './components/SolutionCard';
import CaseStudyCard from './components/CaseStudyCard';
import ROICalculator from './components/ROICalculator';
import ComparisonTable from './components/ComparisonTable';

const SolutionsHub = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const solutions = [
    {
      id: 'developers',
      title: 'For Developers',
      description: `Accelerate your embedded development with cloud-based access to real microcontrollers. Build, test, and deploy IoT solutions without managing physical hardware inventory.`,
      features: [
        'Access 50+ microcontroller platforms instantly',
        'Real-time collaborative development environment',
        'Integrated version control and CI/CD pipelines',
        'Advanced debugging tools and oscilloscope access',
        'Seamless integration with existing DevOps workflows'
      ],
      icon: 'Code',
      gradient: 'from-primary to-accent',
      ctaText: 'Explore Developer Tools',
      stats: [
        { value: '40%', label: 'Faster Prototyping' },
        { value: '60%', label: 'Cost Reduction' }
      ],
      isHighlighted: true,
      category: 'developers'
    },
    {
      id: 'educators',
      title: 'For Educators',
      description: `Transform your embedded systems curriculum with cloud-based labs. Provide equal access to all students while reducing hardware costs and maintenance overhead.`,
      features: [
        'Complete curriculum management system',
        'Student progress tracking and analytics',
        'Pre-built lab exercises and assignments',
        'Classroom collaboration tools',
        'Automated grading and feedback systems'
      ],
      icon: 'GraduationCap',
      gradient: 'from-success to-primary',
      ctaText: 'Discover Education Solutions',
      stats: [
        { value: '80%', label: 'Cost Savings' },
        { value: '95%', label: 'Student Satisfaction' }
      ],
      category: 'educators'
    },
    {
      id: 'students',
      title: 'For Students',
      description: `Learn embedded programming without expensive hardware purchases. Access the same professional tools used by industry experts and build an impressive portfolio.`,
      features: [
        'Free tier with essential microcontroller access',
        'Interactive tutorials and guided projects',
        'Portfolio building and project showcase',
        'Peer collaboration and code sharing',
        'Industry-standard development environment'
      ],
      icon: 'BookOpen',
      gradient: 'from-accent to-warning',
      ctaText: 'Start Learning Today',
      stats: [
        { value: '$0', label: 'Hardware Cost' },
        { value: '24/7', label: 'Lab Access' }
      ],
      category: 'students'
    },
    {
      id: 'enterprise',
      title: 'For Enterprise',
      description: `Scale your embedded development teams with enterprise-grade security, compliance, and collaboration tools. Accelerate time-to-market for IoT products.`,
      features: [
        'Enterprise security and compliance (SOC 2, GDPR)',
        'Advanced team management and access controls',
        'Custom hardware platform integration',
        'Dedicated support and SLA guarantees',
        'API access for workflow automation'
      ],
      icon: 'Building',
      gradient: 'from-secondary to-primary',
      ctaText: 'Contact Enterprise Sales',
      stats: [
        { value: '50%', label: 'Faster TTM' },
        { value: '99.9%', label: 'Uptime SLA' }
      ],
      category: 'enterprise'
    }
  ];

  const caseStudies = [
    {
      title: 'IoT Startup Prototypes Smart Agriculture Solution',
      company: 'GreenTech Innovations',
      industry: 'AgTech Startup',
      challenge: 'A 3-person startup needed to prototype an IoT soil monitoring system across multiple microcontroller platforms but lacked the budget for extensive hardware inventory.',
      solution: 'Used MicroCloudLab to test their firmware on ESP32, Arduino, and STM32 platforms simultaneously, enabling rapid iteration and platform optimization.',
      results: [
        { value: '6 weeks', metric: 'Time to MVP' },
        { value: '$15K', metric: 'Hardware Savings' }
      ],
      image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=800&h=400&fit=crop',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      testimonial: 'MicroCloudLab allowed us to validate our concept across multiple platforms without the upfront hardware investment. We went from idea to working prototype in just 6 weeks.',
      author: 'Sarah Chen, CTO'
    },
    {
      title: 'University Modernizes Embedded Systems Curriculum',
      company: 'State University Engineering',
      industry: 'Higher Education',
      challenge: 'The university\'s embedded systems lab was outdated, expensive to maintain, and couldn\'t provide equal access to 200+ students across multiple sections.',
      solution: 'Implemented MicroCloudLab across all embedded systems courses, providing students with 24/7 access to modern microcontroller platforms and collaborative development tools.',
      results: [
        { value: '200+', metric: 'Students Served' },
        { value: '75%', metric: 'Lab Cost Reduction' }
      ],
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
      companyLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop',
      testimonial: 'Our students now have access to the same tools used by industry professionals. The engagement and project quality have improved dramatically.',
      author: 'Dr. Michael Rodriguez, Professor'
    },
    {
      title: 'Student Creates Viral IoT Project',
      company: 'Community College Student',
      industry: 'Student Project',
      challenge: 'A computer science student wanted to build an IoT weather station for their capstone project but couldn\'t afford the necessary hardware and development tools.',
      solution: 'Leveraged MicroCloudLab\'s free tier to develop and test the project, using the platform\'s collaboration features to get help from the community.',
      results: [
        { value: '50K+', metric: 'GitHub Stars' },
        { value: '3', metric: 'Job Offers' }
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      companyLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      testimonial: 'I never thought I could build something this sophisticated as a student. MicroCloudLab gave me access to professional-grade tools and an amazing community.',
      author: 'Alex Thompson, Student'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Solutions', icon: 'Grid3X3' },
    { id: 'developers', label: 'Developers', icon: 'Code' },
    { id: 'educators', label: 'Educators', icon: 'GraduationCap' },
    { id: 'students', label: 'Students', icon: 'BookOpen' },
    { id: 'enterprise', label: 'Enterprise', icon: 'Building' }
  ];

  const filteredSolutions = activeFilter === 'all' 
    ? solutions 
    : solutions.filter(solution => solution.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6 shadow-brand">
              <Icon name="Layers" size={40} className="text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-headline text-text-primary mb-6">
              Solutions for Every
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Embedded Developer
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
              Whether you're a developer building the next IoT breakthrough, an educator modernizing your curriculum, 
              or a student just starting your embedded journey, MicroCloudLab has the perfect solution for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                variant="primary"
                size="lg"
                iconName="Zap"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
              >
                Watch 2-Min Demo
              </Button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">2,400+</div>
                <div className="text-sm text-text-secondary">Active Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">150+</div>
                <div className="text-sm text-text-secondary">Educational Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-success mb-1">15K+</div>
                <div className="text-sm text-text-secondary">Projects Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-warning mb-1">50+</div>
                <div className="text-sm text-text-secondary">MCU Platforms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Filter */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-text-primary mb-4">
              Find Your Perfect Solution
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Tailored solutions designed for your specific needs and use cases
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-background text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                <Icon name={filter.icon} size={16} />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Solutions Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredSolutions.map((solution) => (
              <SolutionCard
                key={solution.id}
                title={solution.title}
                description={solution.description}
                features={solution.features}
                icon={solution.icon}
                gradient={solution.gradient}
                ctaText={solution.ctaText}
                stats={solution.stats}
                isHighlighted={solution.isHighlighted}
                onCtaClick={() => console.log(`Navigate to ${solution.id} solution`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-text-primary mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              See how teams across different industries are transforming their embedded development with MicroCloudLab
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={index}
                title={study.title}
                company={study.company}
                industry={study.industry}
                challenge={study.challenge}
                solution={study.solution}
                results={study.results}
                image={study.image}
                companyLogo={study.companyLogo}
                testimonial={study.testimonial}
                author={study.author}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-text-primary mb-4">
              Calculate Your Savings
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              See how much time and money you can save by switching to cloud-based embedded development
            </p>
          </div>

          <ROICalculator
            title="ROI Calculator"
            description="Discover your potential savings with MicroCloudLab"
            calculationType="developer"
          />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-text-primary mb-4">
              Why Choose MicroCloudLab?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Compare traditional embedded development approaches with our cloud-native solution
            </p>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl mb-6">
            <Icon name="Rocket" size={32} className="text-accent" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-headline text-text-primary mb-4">
            Ready to Transform Your Development?
          </h2>
          
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of developers, educators, and students who are already building the future with MicroCloudLab.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="primary"
              size="lg"
              iconName="Zap"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Talk to Sales
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Layers" size={20} className="text-white" />
                </div>
                <span className="text-lg font-headline">MicroCloudLab</span>
              </div>
              <p className="text-sm text-secondary-foreground/80 mb-4">
                Democratizing embedded development through cloud-native innovation.
              </p>
              <div className="flex space-x-4">
                <Icon name="Twitter" size={20} className="text-secondary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
                <Icon name="Github" size={20} className="text-secondary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
                <Icon name="Linkedin" size={20} className="text-secondary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/solutions-hub" className="text-secondary-foreground/80 hover:text-accent transition-colors">For Developers</Link></li>
                <li><Link to="/solutions-hub" className="text-secondary-foreground/80 hover:text-accent transition-colors">For Educators</Link></li>
                <li><Link to="/solutions-hub" className="text-secondary-foreground/80 hover:text-accent transition-colors">For Students</Link></li>
                <li><Link to="/solutions-hub" className="text-secondary-foreground/80 hover:text-accent transition-colors">For Enterprise</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/resources-support" className="text-secondary-foreground/80 hover:text-accent transition-colors">Documentation</Link></li>
                <li><Link to="/resources-support" className="text-secondary-foreground/80 hover:text-accent transition-colors">Tutorials</Link></li>
                <li><Link to="/resources-support" className="text-secondary-foreground/80 hover:text-accent transition-colors">Community</Link></li>
                <li><Link to="/resources-support" className="text-secondary-foreground/80 hover:text-accent transition-colors">Support</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about-vision" className="text-secondary-foreground/80 hover:text-accent transition-colors">About Us</Link></li>
                <li><Link to="/contact-partnership" className="text-secondary-foreground/80 hover:text-accent transition-colors">Contact</Link></li>
                <li><Link to="/contact-partnership" className="text-secondary-foreground/80 hover:text-accent transition-colors">Partnerships</Link></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-accent transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm text-secondary-foreground/60">
              © {new Date().getFullYear()} MicroCloudLab. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SolutionsHub;