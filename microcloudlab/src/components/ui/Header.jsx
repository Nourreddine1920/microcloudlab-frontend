import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're in the IDE section with fallback
  const isInIDE = location?.pathname?.startsWith('/ide') || false;

  // Debug logging
  React.useEffect(() => {
    console.log('Header render - Location:', location?.pathname, 'isInIDE:', isInIDE);
  }, [location?.pathname, isInIDE]);

  // Main app navigation items
  const mainAppNavigationItems = [
    {
      label: 'Home',
      path: '/',
      icon: 'Home',
      tooltip: 'Homepage'
    },
    {
      label: 'Solutions',
      path: '/solutions-hub',
      icon: 'Building',
      tooltip: 'Solutions and case studies'
    },
    {
      label: 'About',
      path: '/about-vision',
      icon: 'Users',
      tooltip: 'About us and vision'
    },
    {
      label: 'Resources',
      path: '/resources-support',
      icon: 'BookOpen',
      tooltip: 'Documentation and support'
    },
    {
      label: 'Contact',
      path: '/contact-partnership',
      icon: 'MessageCircle',
      tooltip: 'Contact and partnerships'
    },
    {
      label: 'Demo',
      path: '/platform-demo',
      icon: 'Play',
      tooltip: 'Platform demo'
    }
  ];

  // IDE navigation items
  const ideNavigationItems = [
    {
      label: 'Dashboard',
      path: '/ide/peripheral-configuration-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Peripheral selection and overview'
    },
    {
      label: 'Configure',
      path: '/ide/peripheral-configuration-editor',
      icon: 'Settings',
      tooltip: 'Active configuration workspace'
    },
    {
      label: 'Validate',
      path: '/ide/configuration-validation-conflicts',
      icon: 'AlertTriangle',
      tooltip: 'Configuration validation and conflicts'
    },
    {
      label: 'Pin Map',
      path: '/ide/pin-assignment-visualizer',
      icon: 'Map',
      tooltip: 'Interactive pin assignment visualizer'
    },
    {
      label: 'Projects',
      path: '/ide/configuration-import-export-manager',
      icon: 'FolderOpen',
      tooltip: 'Configuration file management'
    }
  ];

  const navigationItems = isInIDE ? ideNavigationItems : mainAppNavigationItems;

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 backdrop-blur-sm bg-background/80">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:bg-surface/50 rounded-lg px-2 py-1 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg">
              <Icon name="Cpu" size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-headline text-text-primary">MicroCloudLab</span>
              <span className="text-xs text-text-secondary">
                {isInIDE ? "IDE • Click to return to main app" : "Embedded Development Platform"}
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
              title={item.tooltip}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-2">
          {isInIDE ? (
            <>
              <Link to="/">
                <Button variant="ghost" size="sm" iconName="ArrowLeft">
                  Back to Main App
                </Button>
              </Link>
              <Button variant="ghost" size="sm" iconName="HelpCircle">
                Help
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Export
              </Button>
            </>
          ) : (
            <>
              <Link to="/ide">
                <Button variant="primary" size="sm" iconName="Code">
                  Try IDE
                </Button>
              </Link>
              <Button variant="outline" size="sm" iconName="MessageCircle">
                Contact
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            iconName={isMobileMenuOpen ? 'X' : 'Menu'}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-in slide-in-from-top-2">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item.icon} size={18} />
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs text-text-secondary">{item.tooltip}</span>
                </div>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Actions */}
          <div className="px-4 py-3 border-t border-border space-y-2">
            {isInIDE ? (
              <>
                <Link to="/">
                  <Button variant="ghost" size="sm" iconName="ArrowLeft" fullWidth>
                    Back to Main App
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" iconName="HelpCircle" fullWidth>
                  Help & Documentation
                </Button>
                <Button variant="outline" size="sm" iconName="Download" fullWidth>
                  Export Configuration
                </Button>
              </>
            ) : (
              <>
                <Link to="/ide">
                  <Button variant="primary" size="sm" iconName="Code" fullWidth>
                    Try IDE
                  </Button>
                </Link>
                <Button variant="outline" size="sm" iconName="MessageCircle" fullWidth>
                  Contact Us
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;