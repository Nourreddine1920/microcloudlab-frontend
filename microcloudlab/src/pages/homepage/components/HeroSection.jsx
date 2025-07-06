import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [activeCode, setActiveCode] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const codeExamples = [
    {
      title: "LED Blink Control",
      code: `// Arduino-style LED control
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
      description: "Classic blink example running on ESP32"
    },
    {
      title: "Sensor Reading",
      code: `// Temperature sensor reading
#include <DHT.h>
DHT dht(2, DHT22);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  Serial.println("Temp: " + String(temp) + "°C");
  delay(2000);
}`,
      description: "Real-time sensor data from DHT22"
    },
    {
      title: "WiFi Connection",
      code: `// ESP32 WiFi setup
#include <WiFi.h>

void setup() {
  WiFi.begin("YourNetwork", "password");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected to WiFi!");
}`,
      description: "Cloud connectivity demonstration"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCode((prev) => (prev + 1) % codeExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    
    const steps = [
      "Compiling code...",
      "Uploading to virtual ESP32...",
      "Executing program...",
      "Monitoring output..."
    ];
    
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setSimulationStep(currentStep);
      } else {
        clearInterval(stepInterval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimulationStep(0);
        }, 2000);
      }
    }, 1000);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-surface to-primary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-accent/20 rounded-full floating-animation"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-primary/20 rounded-lg floating-animation" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-8 h-8 bg-conversion/20 rounded-full floating-animation" style={{animationDelay: '2s'}}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-accent rounded-full pulse-glow"></div>
                <span>Revolutionary Cloud Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline text-text-primary leading-tight">
                Embedded Development,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Unleashed
                </span>
              </h1>
              
              <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                Code, test, and deploy embedded systems from anywhere. Access real microcontrollers in the cloud, collaborate with your team, and build IoT projects without buying hardware.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-accent" />
                </div>
                <span className="text-text-secondary">Instant hardware access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={16} className="text-primary" />
                </div>
                <span className="text-text-secondary">Team collaboration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={16} className="text-success" />
                </div>
                <span className="text-text-secondary">Enterprise security</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-conversion/20 rounded-lg flex items-center justify-center">
                  <Icon name="Rocket" size={16} className="text-conversion" />
                </div>
                <span className="text-text-secondary">Faster prototyping</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                iconName="Monitor"
                iconPosition="left"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Watch 2-Min Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-sm text-text-secondary">
                Trusted by <span className="font-semibold text-text-primary">2,400+</span> developers
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="text-sm font-medium text-text-primary">4.9/5</span>
                <span className="text-sm text-text-secondary">(324 reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="relative">
            <div className="bg-secondary-900 rounded-2xl shadow-2xl overflow-hidden border border-border">
              {/* Terminal Header */}
              <div className="bg-secondary-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-error rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                  </div>
                  <span className="text-sm text-secondary-300 ml-4">MicroCloudLab IDE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Wifi" size={14} className="text-accent" />
                  <span className="text-xs text-accent">Connected to ESP32</span>
                </div>
              </div>

              {/* Code Editor */}
              <div className="p-4 bg-secondary-900">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    {codeExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCode(index)}
                        className={`px-3 py-1 text-xs rounded-md transition-smooth ${
                          activeCode === index
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary-700 text-secondary-300 hover:bg-secondary-600'
                        }`}
                      >
                        {example.title}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="primary"
                    size="xs"
                    iconName="Play"
                    iconPosition="left"
                    onClick={handleSimulation}
                    disabled={isSimulating}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {isSimulating ? 'Running...' : 'Run Code'}
                  </Button>
                </div>

                <div className="bg-secondary-800 rounded-lg p-4 font-code text-sm">
                  <pre className="text-secondary-100 whitespace-pre-wrap">
                    {codeExamples[activeCode].code}
                  </pre>
                </div>

                <div className="mt-3 text-xs text-secondary-400">
                  {codeExamples[activeCode].description}
                </div>
              </div>

              {/* Simulation Output */}
              {isSimulating && (
                <div className="bg-secondary-800 border-t border-secondary-700 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-accent rounded-full pulse-glow"></div>
                    <span className="text-sm text-accent font-medium">Live Simulation</span>
                  </div>
                  <div className="font-code text-xs text-secondary-300">
                    {simulationStep === 0 && "Compiling code..."}
                    {simulationStep === 1 && "Uploading to virtual ESP32..."}
                    {simulationStep === 2 && "Executing program..."}
                    {simulationStep === 3 && "✓ Program running successfully!"}
                  </div>
                </div>
              )}

              {/* Hardware Visualization */}
              <div className="bg-secondary-800 border-t border-secondary-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="Cpu" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-secondary-100">ESP32 DevKit</div>
                      <div className="text-xs text-secondary-400">Virtual Hardware</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full pulse-glow"></div>
                    <span className="text-xs text-success">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-brand p-4 border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">127 Active</div>
                  <div className="text-xs text-text-secondary">Developers coding now</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-background rounded-xl shadow-brand p-4 border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">43 Projects</div>
                  <div className="text-xs text-text-secondary">Created today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;