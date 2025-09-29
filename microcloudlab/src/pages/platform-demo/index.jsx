import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import all components
import MicrocontrollerSelector from './components/MicrocontrollerSelector';
import ProjectExplorer from './components/ProjectExplorer';
import CodeEditor from './components/CodeEditor';
import SerialMonitor from './components/SerialMonitor';
import VirtualOscilloscope from './components/VirtualOscilloscope';
import FeatureHighlights from './components/FeatureHighlights';
import GuidedTutorial from './components/GuidedTutorial';
import PerformanceMetrics from './components/PerformanceMetrics';

/**
 * @module PlatformDemo
 */

/**
 * The main page component for the interactive platform demo.
 * It showcases the core features of the MicroCloudLab IDE by assembling various
 * components like the board selector, project explorer, code editor, serial monitor,
 * and oscilloscope into a simulated development environment.
 *
 * @returns {JSX.Element} The rendered platform demo page.
 */
const PlatformDemo = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentCode, setCurrentCode] = useState('');

  // Mock data for microcontrollers
  const availableBoards = [
    {
      id: 'arduino-uno',
      name: 'Arduino Uno',
      specs: 'ATmega328P • 16MHz • 32KB Flash',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=100&h=100&fit=crop',
      status: 'online'
    },
    {
      id: 'esp32',
      name: 'ESP32 DevKit',
      specs: 'Dual-core • WiFi/BT • 4MB Flash',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100&h=100&fit=crop',
      status: 'online'
    },
    {
      id: 'raspberry-pi-pico',
      name: 'Raspberry Pi Pico',
      specs: 'RP2040 • ARM Cortex-M0+ • 2MB Flash',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=100&h=100&fit=crop',
      status: 'online'
    }
  ];

  // Mock data for projects
  const sampleProjects = [
    {
      id: 'led-blink',
      name: 'LED Blink',
      description: 'Classic Arduino LED blinking example',
      difficulty: 'Beginner',
      files: [
        {
          name: 'led_blink.ino',
          isMain: true,
          content: `// LED Blink Example - MicroCloudLab Demo
// This code blinks an LED connected to pin 13

#define LED_PIN 13

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  
  // Set LED pin as output
  pinMode(LED_PIN, OUTPUT);
  
  Serial.println("LED Blink Project Started!");
  Serial.println("Watch the LED blink every second...");
}

void loop() {
  // Turn LED on
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
  delay(1000);
  
  // Turn LED off
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
  delay(1000);
}`
        },
        {
          name: 'README.md',
          content: `# LED Blink Project\n\nThis is the classic "Hello World" of embedded programming.\n\n## What it does:\n- Blinks an LED every second\n- Prints status to serial monitor\n\n## Hardware:\n- LED connected to pin 13\n- Built-in LED on most Arduino boards`
        }
      ]
    },
    {
      id: 'sensor-reading',
      name: 'Temperature Sensor',
      description: 'Read temperature and humidity from DHT22',
      difficulty: 'Intermediate',
      files: [
        {
          name: 'temp_sensor.ino',
          isMain: true,
          content: `// Temperature Sensor Reading - MicroCloudLab Demo
// Reads temperature and humidity from DHT22 sensor

#include <DHT.h>

#define DHT_PIN 2
#define DHT_TYPE DHT22

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  
  Serial.println("Temperature Sensor Demo");
  Serial.println("Reading DHT22 sensor...");
}

void loop() {
  // Read temperature and humidity
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  // Check if readings are valid
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  // Print readings
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print("°C, Humidity: ");
  Serial.print(humidity);
  Serial.println("%");
  
  delay(3000); // Wait 3 seconds between readings
}`
        },
        {
          name: 'config.h',
          content: `#ifndef CONFIG_H\n#define CONFIG_H\n\n// Sensor configuration\n#define SENSOR_UPDATE_INTERVAL 3000\n#define TEMPERATURE_OFFSET 0.0\n#define HUMIDITY_OFFSET 0.0\n\n#endif`
        }
      ]
    },
    {
      id: 'iot-connectivity',
      name: 'IoT Data Logger',
      description: 'Connect to WiFi and send data to cloud',
      difficulty: 'Advanced',
      files: [
        {
          name: 'iot_logger.ino',
          isMain: true,
          content: `// IoT Data Logger - MicroCloudLab Demo
// Connects to WiFi and sends sensor data to MQTT broker

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "MicroCloudLab-Demo";
const char* password = "demo123";

// MQTT broker settings
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_topic = "microcloudlab/sensors";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.print("WiFi connected! IP address: ");
  Serial.println(WiFi.localIP());
  
  // Setup MQTT
  client.setServer(mqtt_server, mqtt_port);
  
  Serial.println("IoT Data Logger ready!");
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();
  
  // Create sensor data JSON
  StaticJsonDocument<200> doc;
  doc["device_id"] = "microcloudlab-demo";
  doc["timestamp"] = millis();
  doc["temperature"] = 23.5 + random(-50, 50) / 10.0;
  doc["humidity"] = 45.2 + random(-100, 100) / 10.0;
  doc["uptime"] = millis() / 1000;
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  // Publish to MQTT
  if (client.publish(mqtt_topic, jsonString.c_str())) {
    Serial.println("Data published: " + jsonString);
  } else {
    Serial.println("Failed to publish data");
  }
  
  delay(5000); // Send data every 5 seconds
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    if (client.connect("MicroCloudLabDemo")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}`
        },
        {
          name: 'secrets.h',
          content: `#ifndef SECRETS_H\n#define SECRETS_H\n\n// WiFi Configuration\n#define WIFI_SSID "MicroCloudLab-Demo"\n#define WIFI_PASSWORD "demo123"\n\n// MQTT Configuration\n#define MQTT_SERVER "broker.hivemq.com"\n#define MQTT_PORT 1883\n\n#endif`
        }
      ]
    }
  ];

  // Initialize with first board and project
  useEffect(() => {
    if (availableBoards.length > 0 && !selectedBoard) {
      setSelectedBoard(availableBoards[0]);
    }
    if (sampleProjects.length > 0 && !selectedProject) {
      setSelectedProject(sampleProjects[0]);
      setSelectedFile(sampleProjects[0].files[0]);
    }
  }, []);

  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setSelectedFile(project.files[0]);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    // Simulate compilation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCompiling(false);
  };

  const handleRun = async () => {
    if (!isCompiling) {
      await handleCompile();
    }
    setIsRunning(true);
    
    // Auto-stop after 30 seconds for demo
    setTimeout(() => {
      setIsRunning(false);
    }, 30000);
  };

  const handleStartTrial = () => {
    // Navigate to the IDE
    window.location.href = '/ide';
  };

  const handleTutorialComplete = (stepId) => {
    console.log('Tutorial step completed:', stepId);
  };

  return (
    <div className="min-h-screen bg-background circuit-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-accent rounded-full pulse-glow"></div>
              <span className="text-accent font-semibold text-sm tracking-wider">LIVE DEMO</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-headline font-bold text-text-primary mb-4">
              Experience the Future of
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mt-2">
                Embedded Development
              </span>
            </h1>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
              Program real microcontrollers in the cloud. No hardware setup, no delays, no limitations. 
              Just pure embedded development power at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="primary"
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={() => setShowTutorial(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-brand"
              >
                Start Guided Tour
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Code"
                iconPosition="left"
                onClick={() => document.getElementById('demo-interface').scrollIntoView({ behavior: 'smooth' })}
                className="shadow-brand"
              >
                Jump to Demo
              </Button>
            </div>
          </div>
          
          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md">
              <div className="text-3xl font-bold text-accent">2.4K+</div>
              <div className="text-sm text-text-secondary font-medium">Active Developers</div>
            </div>
            <div className="text-center p-4 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-text-secondary font-medium">Microcontrollers</div>
            </div>
            <div className="text-center p-4 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md">
              <div className="text-3xl font-bold text-success">99.9%</div>
              <div className="text-sm text-text-secondary font-medium">Uptime</div>
            </div>
            <div className="text-center p-4 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md">
              <div className="text-3xl font-bold text-warning">15K+</div>
              <div className="text-sm text-text-secondary font-medium">Projects Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Interface */}
      <section id="demo-interface" className="py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Microcontroller Selection */}
          <div className="mb-10">
            <MicrocontrollerSelector
              selectedBoard={selectedBoard}
              onBoardSelect={handleBoardSelect}
              boards={availableBoards}
            />
          </div>

          {/* Main Demo Interface */}
          <div className="grid lg:grid-cols-12 gap-6 mb-10">
            {/* Left Sidebar - Project Explorer */}
            <div className="lg:col-span-3 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md p-4">
              <ProjectExplorer
                projects={sampleProjects}
                selectedProject={selectedProject}
                onProjectSelect={handleProjectSelect}
                onFileSelect={handleFileSelect}
              />
            </div>

            {/* Main Content - Code Editor */}
            <div className="lg:col-span-6 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md p-4">
              <CodeEditor
                selectedFile={selectedFile}
                onCodeChange={handleCodeChange}
                onCompile={handleCompile}
                onRun={handleRun}
                isCompiling={isCompiling}
                isRunning={isRunning}
              />
            </div>

            {/* Right Sidebar - Performance Metrics */}
            <div className="lg:col-span-3 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md p-4">
              <PerformanceMetrics
                isRunning={isRunning}
                selectedProject={selectedProject}
              />
            </div>
          </div>

          {/* Bottom Panel - Monitoring Tools */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Serial Monitor */}
            <div className="h-96 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md p-4">
              <SerialMonitor
                isRunning={isRunning}
                selectedProject={selectedProject}
              />
            </div>

            {/* Virtual Oscilloscope */}
            <div className="h-96 bg-background/60 backdrop-blur-sm rounded-lg border border-border shadow-md p-4">
              <VirtualOscilloscope
                isRunning={isRunning}
                selectedProject={selectedProject}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gradient-to-br from-surface/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureHighlights onStartTrial={handleStartTrial} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-4">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have already made the switch to cloud-based embedded development.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              variant="secondary"
              size="lg"
              iconName="Rocket"
              iconPosition="left"
              onClick={handleStartTrial}
              className="bg-white text-primary hover:bg-white/90 shadow-2xl transform hover:scale-105 transition-transform"
            >
              Start Free Trial
            </Button>
            
            <Link to="/contact-partnership">
              <Button
                variant="ghost"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="text-white border-white hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-white/80 text-sm">
            <p>✓ No credit card required • ✓ Full platform access • ✓ 30-day free trial</p>
          </div>
        </div>
      </section>

      {/* Guided Tutorial Modal */}
      <GuidedTutorial
        isActive={showTutorial}
        onClose={() => setShowTutorial(false)}
        onStepComplete={handleTutorialComplete}
      />
    </div>
  );
};

export default PlatformDemo;