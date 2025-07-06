import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Platform Demo', path: '/platform-demo', icon: 'Play' },
    { name: 'Solutions Hub', path: '/solutions-hub', icon: 'Grid3X3' },
    { name: 'About Vision', path: '/about-vision', icon: 'Eye' },
    { name: 'Resources', path: '/resources-support', icon: 'BookOpen' },
    { name: 'Contact', path: '/contact-partnership', icon: 'MessageCircle' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-brand border-b border-border' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 group transition-smooth hover:scale-105"
            onClick={closeMenu}
          >
            <div className="relative">
                <img
                  src="/assets/images/logo.png"
                  alt="MicroCloudLab Logo"
                  style={{ height: '60px', marginRight: '20px' }}
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full pulse-glow"></div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-headline text-text-primary group-hover:text-primary transition-smooth">
                MicroCloudLab
              </h1>
              <p className="text-xs text-text-secondary font-medium">
                Embedded Development, Unleashed
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              iconName="Play"
              iconPosition="left"
              className="text-text-secondary hover:text-primary"
            >
              Watch Demo
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              iconName="Zap"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-smooth ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' :'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-border">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-border">
              <Button 
                variant="outline" 
                size="md"
                iconName="Play"
                iconPosition="left"
                fullWidth
                className="justify-center"
              >
                Watch 2-Min Demo
              </Button>
              <Button 
                variant="primary" 
                size="md"
                iconName="Zap"
                iconPosition="left"
                fullWidth
                className="justify-center bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
              >
                Start Free Trial
              </Button>
            </div>

            {/* Mobile Platform Stats */}
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-accent">2.4K+</div>
                  <div className="text-xs text-text-secondary">Active Developers</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-primary">15K+</div>
                  <div className="text-xs text-text-secondary">Projects Created</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-success">99.9%</div>
                  <div className="text-xs text-text-secondary">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Platform Activity Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-accent/10 to-primary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2 space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full pulse-glow"></div>
              <span className="text-text-secondary">
                <span className="font-semibold text-accent">127</span> developers coding now
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Cpu" size={14} className="text-primary" />
              <span className="text-text-secondary">
                <span className="font-semibold text-primary">43</span> projects created today
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={14} className="text-success" />
              <span className="text-text-secondary">
                <span className="font-semibold text-success">12</span> countries collaborating
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;