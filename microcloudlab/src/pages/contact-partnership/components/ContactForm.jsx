import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    category: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    { value: 'technical-support', label: 'Technical Support', icon: 'Wrench', description: 'Platform issues, bugs, and technical questions' },
    { value: 'sales', label: 'Sales Consultation', icon: 'ShoppingCart', description: 'Pricing, demos, and purchase inquiries' },
    { value: 'education', label: 'Educational Partnerships', icon: 'GraduationCap', description: 'Curriculum integration and institutional programs' },
    { value: 'media', label: 'Media Inquiries', icon: 'Newspaper', description: 'Press releases, interviews, and media requests' },
    { value: 'general', label: 'General Questions', icon: 'MessageCircle', description: 'Other inquiries and feedback' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        category: '',
        subject: '',
        message: '',
        priority: 'normal'
      });
    }, 2000);
  };

  const getResponseTime = (category) => {
    const times = {
      'technical-support': '2-4 hours',
      'sales': '24 hours',
      'education': '48 hours',
      'media': '24 hours',
      'general': '72 hours'
    };
    return times[category] || '72 hours';
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-success-50 border border-success-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success-600" />
        </div>
        <h3 className="text-xl font-semibold text-success-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-success-700 mb-4">
          Thank you for contacting us. We'll get back to you within {getResponseTime(formData.category)}.
        </p>
        <Button 
          variant="success" 
          onClick={() => setSubmitStatus(null)}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@company.com"
            required
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Company/Organization
        </label>
        <Input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Your company or institution name"
          className="w-full"
        />
      </div>

      {/* Inquiry Category */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Inquiry Category *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => (
            <label
              key={category.value}
              className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.category === category.value
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary/50 hover:bg-surface'
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={formData.category === category.value}
                onChange={handleInputChange}
                className="sr-only"
                required
              />
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  formData.category === category.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-text-secondary'
                }`}>
                  <Icon name={category.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary">
                    {category.label}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {category.description}
                  </div>
                  {formData.category === category.value && (
                    <div className="text-xs text-primary font-medium mt-2">
                      Response time: {getResponseTime(category.value)}
                    </div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Subject *
        </label>
        <Input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Brief description of your inquiry"
          required
          className="w-full"
        />
      </div>

      {/* Priority for Technical Support */}
      {formData.category === 'technical-support' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Priority Level
          </label>
          <div className="flex space-x-4">
            {[
              { value: 'low', label: 'Low', color: 'text-success-600' },
              { value: 'normal', label: 'Normal', color: 'text-primary' },
              { value: 'high', label: 'High', color: 'text-warning-600' },
              { value: 'critical', label: 'Critical', color: 'text-error-600' }
            ].map((priority) => (
              <label key={priority.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={priority.value}
                  checked={formData.priority === priority.value}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary"
                />
                <span className={`text-sm font-medium ${priority.color}`}>
                  {priority.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Please provide detailed information about your inquiry..."
          required
          rows={6}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-vertical"
        />
        <div className="text-xs text-text-secondary mt-1">
          Minimum 20 characters ({formData.message.length}/20)
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-text-secondary">
          <Icon name="Shield" size={16} className="inline mr-1" />
          Your information is secure and will never be shared
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={!formData.name || !formData.email || !formData.category || !formData.subject || !formData.message || formData.message.length < 20}
          iconName="Send"
          iconPosition="right"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;