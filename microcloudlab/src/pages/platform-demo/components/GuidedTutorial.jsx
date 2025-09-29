import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module GuidedTutorial
 */

/**
 * A modal component that provides a step-by-step guided tutorial of the platform.
 * It walks the user through various features and actions, with navigation controls
 * to move between steps.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isActive - A flag to control the visibility of the tutorial modal.
 * @param {Function} props.onClose - A callback function to close the tutorial.
 * @param {Function} props.onStepComplete - A callback function that is executed when a tutorial step is completed.
 * @returns {JSX.Element|null} The rendered guided tutorial modal, or null if it is not active.
 */
const GuidedTutorial = ({ isActive, onClose, onStepComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const tutorialSteps = [
    {
      id: 'welcome',
      title: 'Welcome to MicroCloudLab',
      description: 'Let\'s take a quick tour of the platform and see how easy embedded development can be.',
      target: 'overview',
      content: `Welcome to the future of embedded development! \n\nMicroCloudLab eliminates the need for physical hardware by providing cloud-hosted microcontrollers that you can program and control remotely. \n\nThis guided tutorial will show you how to:\n• Select and connect to microcontrollers\n• Write and run embedded code\n• Monitor real-time output\n• Collaborate with team members`,
      action: 'Get Started',
      icon: 'Rocket'
    },
    {
      id: 'select-board',
      title: 'Select Your Microcontroller',
      description: 'Choose from our library of cloud-hosted microcontrollers. No physical setup required!',
      target: 'board-selector',
      content: `Choose your microcontroller from our extensive library:\n\n• Arduino Uno - Perfect for beginners\n• ESP32 - WiFi and Bluetooth enabled\n• Raspberry Pi Pico - ARM Cortex-M0+ power\n\nEach board is pre-configured and ready to use instantly. No wiring, no setup, no delays!`,
      action: 'Select Arduino Uno',
      icon: 'Cpu'
    },
    {
      id: 'explore-projects',
      title: 'Explore Sample Projects',
      description: 'Browse our curated collection of example projects to get started quickly.',
      target: 'project-explorer',
      content: `Our project library includes:\n\n• LED Blink - The classic "Hello World" of embedded\n• Sensor Reading - Temperature and humidity monitoring\n• IoT Connectivity - WiFi and cloud communication\n\nEach project includes complete code, documentation, and step-by-step instructions.`,
      action: 'Open LED Blink Project',
      icon: 'FolderOpen'
    },
    {
      id: 'code-editor',
      title: 'Write and Edit Code',
      description: 'Use our powerful cloud IDE with syntax highlighting, auto-completion, and real-time collaboration.',
      target: 'code-editor',
      content: `Our cloud IDE features:\n\n• Syntax highlighting for C/C++\n• Intelligent auto-completion\n• Real-time error detection\n• Collaborative editing\n• Version control integration\n\nWrite code just like you would locally, but with the power of the cloud!`,
      action: 'Compile Code',
      icon: 'Code'
    },
    {
      id: 'run-project',
      title: 'Run Your Project',
      description: 'Compile and deploy your code to the cloud-hosted microcontroller instantly.',
      target: 'run-controls',
      content: `Running your project is simple:\n\n1. Click "Compile" to build your code\n2. Click "Run" to deploy to the microcontroller\n3. Watch real-time execution in the serial monitor\n4. View waveforms in the oscilloscope\n\nYour code runs on real hardware in our secure cloud environment!`,
      action: 'Run Project',
      icon: 'Play'
    },
    {
      id: 'monitor-output',
      title: 'Monitor Real-Time Output',
      description: 'View serial output, debug information, and oscilloscope traces from your running code.',
      target: 'serial-monitor',
      content: `Monitor your project with professional tools:\n\n• Serial Monitor - View debug output and sensor data\n• Virtual Oscilloscope - Analyze electrical signals\n• Performance Metrics - Track resource usage\n• Error Logging - Debug issues quickly\n\nAll the tools you need for professional embedded development!`,
      action: 'View Output',
      icon: 'Activity'
    },
    {
      id: 'collaboration',
      title: 'Collaborate in Real-Time',
      description: 'Share your workspace with team members for live collaboration and code review.',
      target: 'collaboration',
      content: `Collaboration features include:\n\n• Live code editing with multiple users\n• Shared debugging sessions\n• Real-time chat and comments\n• Project sharing and permissions\n• Team workspaces and organization\n\nWork together seamlessly, regardless of location!`,
      action: 'Invite Team Member',
      icon: 'Users'
    },
    {
      id: 'complete',
      title: 'You\'re Ready to Build!',
      description: 'Congratulations! You\'ve completed the tutorial and are ready to start your embedded development journey.',
      target: 'completion',
      content: `You\'ve learned how to:\n\n✓ Select and connect to microcontrollers\n✓ Write and compile embedded code\n✓ Run projects on cloud hardware\n✓ Monitor real-time output\n✓ Collaborate with team members\n\nStart your free trial to begin building amazing embedded projects!`,action: 'Start Free Trial',icon: 'CheckCircle'
    }
  ];

  const currentTutorialStep = tutorialSteps[currentStep];

  const handleNext = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);
    
    if (onStepComplete) {
      onStepComplete(currentTutorialStep.id);
    }
    
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name={currentTutorialStep.icon} size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{currentTutorialStep.title}</h2>
              <p className="text-sm text-text-secondary">
                Step {currentStep + 1} of {tutorialSteps.length}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Tutorial Progress</span>
            <span className="text-sm text-text-secondary">
              {Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <p className="text-text-secondary mb-4">{currentTutorialStep.description}</p>
          
          <div className="bg-surface rounded-lg p-4 border border-border">
            <pre className="text-sm text-text-primary whitespace-pre-wrap font-body">
              {currentTutorialStep.content}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface/50">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-text-secondary"
            >
              Skip Tutorial
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronLeft"
                iconPosition="left"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
            
            <Button
              variant="primary"
              size="sm"
              iconName={currentStep === tutorialSteps.length - 1 ? "CheckCircle" : "ChevronRight"}
              iconPosition="right"
              onClick={handleNext}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {currentTutorialStep.action}
            </Button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 p-4 border-t border-border">
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentStep 
                  ? 'bg-primary w-6' 
                  : completedSteps.has(index)
                  ? 'bg-success' :'bg-border hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidedTutorial;