import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../../components/ui/Header";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import ConfigurationForm from "./components/ConfigurationForm";
import ConfigurationToolbar from "./components/ConfigurationToolbar";
import CodePreviewPanel from "./components/CodePreviewPanel";
import { useMcu } from "../context/McuContext";
import peripheralSchemas from "./components/peripheralSchemas";

const PeripheralConfigurationEditor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    selectedMcu,
    getPeripheralConfiguration,
    savePeripheralConfiguration,
    deletePeripheralConfiguration,
    getPeripheralStatus,
  } = useMcu();

  // Get peripheral info from URL params
  const peripheralType = searchParams.get("type") || "UART";
  const instance = searchParams.get("instance") || "UART1";

  // Get existing configuration if any
  const existingConfig = getPeripheralConfiguration(peripheralType, instance);
  const peripheralStatus = getPeripheralStatus(peripheralType, instance);

  // Add activeSection state
  const [activeSection, setActiveSection] = useState("basic");
  const [selectedPeripheral, setSelectedPeripheral] = useState("UART");

  const [formData, setFormData] = useState({
    instance: instance,
    baudRate: "115200",
    dataBits: "8",
    parity: "none",
    stopBits: "1",
    flowControl: "none",
    txBufferSize: "256",
    rxBufferSize: "256",
    dmaEnable: false,
    interruptEnable: true,
    autoBaud: false,
    oversampling: "16",
    txPin: "PA9",
    rxPin: "PA10",
    rtsPin: "PA12",
    ctsPin: "PA11",
    gpioSpeed: "high",
    pullResistor: "none",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [mobileView, setMobileView] = useState("form");

  // Create default config function to avoid repetition
  const getDefaultConfig = (instanceParam) => ({
    instance: instanceParam,
    baudRate: "115200",
    dataBits: "8",
    parity: "none",
    stopBits: "1",
    flowControl: "none",
    txBufferSize: "256",
    rxBufferSize: "256",
    dmaEnable: false,
    interruptEnable: true,
    autoBaud: false,
    oversampling: "16",
    txPin: "PA9",
    rxPin: "PA10",
    rtsPin: "PA12",
    ctsPin: "PA11",
    gpioSpeed: "high",
    pullResistor: "none",
  });

  // Load existing configuration on mount - FIXED: removed formData from deps
  useEffect(() => {
    if (existingConfig) {
      setFormData((prev) => ({
        ...prev,
        ...existingConfig,
      }));
      setHasUnsavedChanges(false);
    }
  }, [existingConfig]); // Removed formData from dependencies

  // Update form data when peripheral type or instance changes - FIXED: removed formData from deps
  useEffect(() => {
    const newConfig = getPeripheralConfiguration(peripheralType, instance);
    if (newConfig) {
      setFormData((prev) => ({
        ...prev,
        ...newConfig,
      }));
    } else {
      // Reset to defaults for new configuration
      setFormData(getDefaultConfig(instance));
    }
    setHasUnsavedChanges(false);
  }, [peripheralType, instance, getPeripheralConfiguration]); // Removed formData from dependencies

  const getBoardDisplayName = (boardId) => {
    const boardNames = {
      "arduino-uno": "Arduino Uno",
      "esp32-devkit": "ESP32 DevKit",
      "stm32f103-blue-pill": "STM32F103 Blue Pill",
    };
    return boardNames[boardId] || boardId;
  };

  const peripheralInfo = {
    type: peripheralType,
    instance: instance,
    board: selectedMcu?.name || "Unknown Board",
    status: peripheralStatus.status,
    completeness: peripheralStatus.completeness,
    lastModified: peripheralStatus.lastModified,
  };

  // FIXED: Added debugging and better state management
  const handleFormChange = (newData) => {
    console.log("🔄 Form change received in parent:", newData);
    console.log("📊 Current formData before update:", formData);

    setFormData((prev) => {
      const updatedData = { ...prev, ...newData };
      console.log("✅ New formData after update:", updatedData);
      return updatedData;
    });

    setHasUnsavedChanges(true);

    // Clear validation errors for updated fields
    if (Object.keys(validationErrors).length > 0) {
      const updatedFields = Object.keys(newData);
      const newErrors = { ...validationErrors };
      updatedFields.forEach((field) => {
        delete newErrors[field];
      });
      setValidationErrors(newErrors);
    }
  };

  const validateConfiguration = async () => {
    setIsValidating(true);

    // Simulate validation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const errors = {};

    // Basic validation rules
    if (!formData.instance) {
      errors.instance = "Instance selection is required";
    }

    if (
      parseInt(formData.baudRate) < 9600 ||
      parseInt(formData.baudRate) > 115200
    ) {
      errors.baudRate = "Baud rate must be between 9600 and 115200";
    }

    // Pin conflict simulation
    if (formData.txPin === formData.rxPin) {
      errors.txPin = "TX and RX pins cannot be the same";
      errors.rxPin = "TX and RX pins cannot be the same";
    }

    // Buffer size validation
    if (parseInt(formData.txBufferSize) < 64) {
      errors.txBufferSize = "Buffer size must be at least 64 bytes";
    }

    setValidationErrors(errors);
    setLastValidated(new Date());
    setIsValidating(false);

    return Object.keys(errors).length === 0;
  };

  // Save configuration with dynamic status update
  const handleSave = async () => {
    const isValid = await validateConfiguration();
    if (isValid) {
      setIsSaving(true);

      try {
        // Save configuration with dynamic status update
        await savePeripheralConfiguration(peripheralType, instance, formData);

        setHasUnsavedChanges(false);
        setIsSaving(false);

        // Show success notification
        console.log("Configuration saved successfully");

        // Navigate back to dashboard after successful save
        setTimeout(() => {
          navigate("/ide/peripheral-configuration-dashboard");
        }, 1000);
      } catch (error) {
        console.error("Failed to save configuration:", error);
        setIsSaving(false);
      }
    }
  };

  // Reset configuration - FIXED: use getDefaultConfig function
  const handleReset = () => {
    setFormData(getDefaultConfig(peripheralInfo.instance || "UART1"));
    setValidationErrors({});
    setHasUnsavedChanges(false);
  };

  // Delete configuration
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this configuration?")) {
      try {
        await deletePeripheralConfiguration(peripheralType, instance);
        navigate("/ide/peripheral-configuration-dashboard");
      } catch (error) {
        console.error("Failed to delete configuration:", error);
      }
    }
  };

  // Export configuration
  const handleExport = () => {
    const config = {
      peripheral: peripheralInfo.type,
      instance: formData.instance,
      timestamp: new Date().toISOString(),
      configuration: formData,
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${peripheralInfo.type.toLowerCase()}_config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import configuration
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedConfig = JSON.parse(event.target.result);
            if (importedConfig.configuration) {
              setFormData((prev) => ({
                ...prev,
                ...importedConfig.configuration,
              }));
              setHasUnsavedChanges(true);
            }
          } catch (error) {
            console.error("Failed to parse imported configuration:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const openMobileDrawer = (view = "preview") => {
    setMobileView(view);
  };

  if (!selectedMcu) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 px-4 lg:px-6 py-12">
          <div className="max-w-md mx-auto text-center">
            <Icon
              name="Cpu"
              size={64}
              className="text-muted-foreground mx-auto mb-4"
            />
            <h1 className="text-heading-lg font-heading mb-2">
              No MCU Selected
            </h1>
            <p className="text-body-sm text-muted-foreground mb-6">
              Please select an MCU from the dashboard to configure peripherals.
            </p>
            <Button
              variant="default"
              size="lg"
              onClick={() =>
                navigate("/ide/peripheral-configuration-dashboard")
              }
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex h-screen pt-16">
        {/* Main Configuration Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <ConfigurationToolbar
            peripheralInfo={peripheralInfo}
            hasUnsavedChanges={hasUnsavedChanges}
            isValidating={isValidating}
            isSaving={isSaving}
            onSave={handleSave}
            onReset={handleReset}
            onDelete={handleDelete}
            onExport={handleExport}
            onImport={handleImport}
            onMobileViewChange={openMobileDrawer}
          />

          {/* Section Navigation - Add this for better UX */}
          <div className="border-b border-border bg-card px-4 lg:px-6 py-3">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveSection("basic")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === "basic"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Basic Settings
              </button>
              <button
                onClick={() => setActiveSection("advanced")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === "advanced"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Advanced Options
              </button>
              <button
                onClick={() => setActiveSection("pins")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === "pins"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Pin Configuration
              </button>
            </div>
          </div>

          {/* Configuration Form - FIXED: Added all required props */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6">
              <ConfigurationForm
                activeSection={activeSection}
                formData={formData}
                onFormChange={handleFormChange}
                validationErrors={validationErrors}
                peripheralType={peripheralType}
                peripheralSchemas={peripheralSchemas} // <-- Add this line!
              />
            </div>
          </div>
        </div>

        {/* Code Preview Panel - Desktop */}
        <div className="hidden lg:block w-96 border-l border-border">
          <CodePreviewPanel
            formData={formData}
            peripheralInfo={peripheralInfo}
            lastValidated={lastValidated}
          />
        </div>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ${
            mobileView ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileView(null)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-heading-sm font-heading">Code Preview</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setMobileView(null)}
                />
              </div>
              <CodePreviewPanel
                formData={formData}
                peripheralInfo={peripheralInfo}
                lastValidated={lastValidated}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Debug Panel - Remove in production */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs max-w-xs">
        <strong>Debug Info:</strong>
        <br />
        Active Section: {activeSection}
        <br />
        Has Changes: {hasUnsavedChanges.toString()}
        <br />
        Current Instance: {formData.instance}
        <br />
        Current Baud Rate: {formData.baudRate}
      </div>
    </div>
  );
};

export default PeripheralConfigurationEditor;
