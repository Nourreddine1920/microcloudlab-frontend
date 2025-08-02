import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  // Safety check for location
  if (!location || !location.pathname) {
    return null;
  }
  
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumb on homepage or if no pathnames
  if (location.pathname === '/' || pathnames.length === 0) {
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumb on homepage
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/', icon: 'Home' }
  ];

  // Build breadcrumb items based on current path
  pathnames.forEach((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    
    let label = name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    let icon = 'ChevronRight';
    
    // Special cases for known routes
    if (name === 'ide') {
      label = 'IDE';
      icon = 'Code';
    } else if (name === 'peripheral-configuration-dashboard') {
      label = 'Dashboard';
      icon = 'LayoutDashboard';
    } else if (name === 'peripheral-configuration-editor') {
      label = 'Configure';
      icon = 'Settings';
    } else if (name === 'configuration-validation-conflicts') {
      label = 'Validate';
      icon = 'AlertTriangle';
    } else if (name === 'pin-assignment-visualizer') {
      label = 'Pin Map';
      icon = 'Map';
    } else if (name === 'configuration-import-export-manager') {
      label = 'Projects';
      icon = 'FolderOpen';
    }

    breadcrumbItems.push({
      label,
      path: routeTo,
      icon,
      isLast: index === pathnames.length - 1
    });
  });

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.path}>
              {index > 0 && (
                <Icon name="ChevronRight" size={14} className="text-text-secondary" />
              )}
              {item.isLast ? (
                <div className="flex items-center space-x-1 text-text-primary font-medium">
                  <Icon name={item.icon} size={14} />
                  <span>{item.label}</span>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Icon name={item.icon} size={14} />
                  <span>{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;