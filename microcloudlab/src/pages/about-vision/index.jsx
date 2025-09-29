import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FoundingStory from './components/FoundingStory';
import Timeline from './components/Timeline';
import TeamSection from './components/TeamSection';
import DemocratizingSection from './components/DemocratizingSection';
import RecognitionSection from './components/RecognitionSection';

/**
 * @module AboutVision
 */

/**
 * The main page component for the "About & Vision" section of the website.
 * It assembles various sections like Hero, Founding Story, Timeline, Team, etc.,
 * to tell the story of MicroCloudLab. It also handles SEO by setting the
 * document title and meta description.
 *
 * @returns {JSX.Element} The rendered About & Vision page.
 */
const AboutVision = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'About & Vision - MicroCloudLab | Democratizing Embedded Development';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about MicroCloudLab\'s mission to democratize embedded development, making microcontroller access as universal as web development. Meet our team and discover our vision for the future of IoT innovation.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Founding Story */}
      <FoundingStory />
      
      {/* Timeline */}
      <Timeline />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Democratizing Innovation */}
      <DemocratizingSection />
      
      {/* Recognition & Testimonials */}
      <RecognitionSection />
      
      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
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
              <p className="text-secondary-foreground/80 leading-relaxed mb-6 max-w-md">
                Democratizing embedded development by making microcontroller access as universal as web development. 
                Breaking barriers, enabling innovation, empowering creators worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary-foreground/20 transition-smooth">
                  <span className="text-secondary-foreground">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary-foreground/20 transition-smooth">
                  <span className="text-secondary-foreground">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary-foreground/20 transition-smooth">
                  <span className="text-secondary-foreground">gh</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="/platform-demo" className="hover:text-secondary-foreground transition-smooth">Live Demo</a></li>
                <li><a href="/solutions-hub" className="hover:text-secondary-foreground transition-smooth">Solutions</a></li>
                <li><a href="/resources-support" className="hover:text-secondary-foreground transition-smooth">Documentation</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">API Reference</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="/about-vision" className="hover:text-secondary-foreground transition-smooth">About Us</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Careers</a></li>
                <li><a href="/contact-partnership" className="hover:text-secondary-foreground transition-smooth">Contact</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Press Kit</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-secondary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-secondary-foreground/60">
              © {new Date().getFullYear()} MicroCloudLab. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-smooth">Privacy Policy</a>
              <a href="#" className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-smooth">Terms of Service</a>
              <a href="#" className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-smooth">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutVision;