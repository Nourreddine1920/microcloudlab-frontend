import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module SupportChannelCard
 */

/**
 * A card component that displays information about a single support channel.
 * It shows the channel's title, description, availability, response time, and key stats,
 * along with a call to action.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.title - The title of the support channel.
 * @param {string} props.description - A short description of the support channel.
 * @param {string} props.icon - The name of the lucide-react icon to display.
 * @param {string} props.availability - The availability of the support channel (e.g., "24/7").
 * @param {string} props.responseTime - The typical response time for the channel.
 * @param {boolean} [props.isOnline=false] - A flag indicating if the channel is currently online.
 * @param {object} props.stats - An object containing key statistics for the channel.
 * @param {Function} props.onAccess - A callback function to be executed when the access button is clicked.
 * @param {string} [props.actionText="Access"] - The text to display on the action button.
 * @returns {JSX.Element} The rendered support channel card component.
 */
const SupportChannelCard = ({ 
  title, 
  description, 
  icon, 
  availability, 
  responseTime, 
  isOnline = false,
  stats,
  onAccess,
  actionText = "Access"
}) => {
  const getAvailabilityColor = (status) => {
    if (status === '24/7') return 'text-success';
    if (status.includes('Online') || isOnline) return 'text-success';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-background border border-border rounded-xl p-6 hover:shadow-brand transition-smooth group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
              <Icon name={icon} size={24} className="text-primary" />
            </div>
            {isOnline && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background pulse-glow"></div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-smooth">
              {title}
            </h3>
            <p className="text-text-secondary text-sm mt-1">{description}</p>
          </div>
        </div>
      </div>

      {/* Availability & Response Time */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-muted" />
            <span className="text-sm text-text-secondary">Availability:</span>
          </div>
          <span className={`text-sm font-medium ${getAvailabilityColor(availability)}`}>
            {availability}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-text-muted" />
            <span className="text-sm text-text-secondary">Response Time:</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {responseTime}
          </span>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="mb-4 p-3 bg-surface/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-semibold text-primary">{value}</div>
                <div className="text-xs text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features/Benefits */}
      <div className="mb-6">
        <div className="space-y-2">
          {title === 'Live Chat Support' && (
            <>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="MessageCircle" size={14} className="text-success" />
                <span>Real-time technical assistance</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Code" size={14} className="text-success" />
                <span>Code debugging help</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Cpu" size={14} className="text-success" />
                <span>Hardware configuration support</span>
              </div>
            </>
          )}
          
          {title === 'Community Forums' && (
            <>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Users" size={14} className="text-success" />
                <span>Peer-to-peer learning</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="BookOpen" size={14} className="text-success" />
                <span>Project showcases</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Search" size={14} className="text-success" />
                <span>Searchable knowledge base</span>
              </div>
            </>
          )}
          
          {title === 'Expert Office Hours' && (
            <>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Video" size={14} className="text-success" />
                <span>1-on-1 video sessions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Calendar" size={14} className="text-success" />
                <span>Scheduled consultations</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Award" size={14} className="text-success" />
                <span>Industry expert guidance</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="primary"
        size="md"
        iconName="ArrowRight"
        iconPosition="right"
        onClick={onAccess}
        fullWidth
        className="group-hover:shadow-oscilloscope"
      >
        {actionText}
      </Button>
    </div>
  );
};

export default SupportChannelCard;