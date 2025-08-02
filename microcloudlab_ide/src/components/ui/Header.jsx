import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/peripheral-configuration-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Peripheral selection and overview'
    },
    {
      label: 'Configure',
      path: '/peripheral-configuration-editor',
      icon: 'Settings',
      tooltip: 'Active configuration workspace'
    },
    {
      label: 'Validate',
      path: '/configuration-validation-conflicts',
      icon: 'AlertTriangle',
      tooltip: 'Configuration validation and conflicts'
    },
    {
      label: 'Pin Map',
      path: '/pin-assignment-visualizer',
      icon: 'Map',
      tooltip: 'Interactive pin assignment visualizer'
    },
    {
      label: 'Projects',
      path: '/configuration-import-export-manager',
      icon: 'FolderOpen',
      tooltip: 'Configuration file management'
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/peripheral-configuration-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
              <img 
                src="/assets/images/logo.png" 
                alt="MicroCloudLab Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center w-full h-full bg-primary rounded-lg">
                <Icon name="Cpu" size={20} color="white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-heading-sm text-foreground font-heading">MicroCloudLab</span>
              <span className="text-caption text-muted-foreground">STM32 Configuration</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-body-sm transition-micro ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
          <Button variant="ghost" size="sm" iconName="HelpCircle">
            Help
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
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
        <div className="lg:hidden bg-card border-t border-border animate-slide-in">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-body-sm transition-micro ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item.icon} size={18} />
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-caption text-muted-foreground">{item.tooltip}</span>
                </div>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Actions */}
          <div className="px-4 py-3 border-t border-border space-y-2">
            <Button variant="ghost" size="sm" iconName="HelpCircle" fullWidth>
              Help & Documentation
            </Button>
            <Button variant="outline" size="sm" iconName="Download" fullWidth>
              Export Configuration
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;