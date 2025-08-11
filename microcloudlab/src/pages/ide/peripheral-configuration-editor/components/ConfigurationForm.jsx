import React from "react";
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";
import { Checkbox } from "../../../../components/ui/Checkbox";
import Icon from "../../../../components/AppIcon";

const ConfigurationForm = ({
  activeSection,
  formData = {},
  onFormChange = () => {},
  validationErrors = {},
  peripheralType = "UART",
  peripheralSchemas = {},
}) => {
  // Get the schema for the current peripheral and section
  const schema =
    peripheralSchemas[peripheralType]?.sections?.[activeSection] || [];
  console.log(
    "Schema:",
    schema,
    "Peripheral:",
    peripheralType,
    "Section:",
    activeSection
  );
  console.log(
    "Passing peripheralType:",
    peripheralType,
    "activeSection:",
    activeSection,
    "peripheralSchemas:",
    peripheralSchemas
  );
  const handleInputChange = (field, value) => {
    if (typeof onFormChange === "function") {
      onFormChange({ [field]: value });
    }
  };

  // Render a field based on its type
  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            key={field.name}
            label={field.label}
            description={field.description}
            options={field.options}
            value={formData[field.name] ?? field.default}
            onChange={(value) => handleInputChange(field.name, value)}
            error={validationErrors[field.name]}
            required={field.required}
          />
        );
      case "input":
        return (
          <Input
            key={field.name}
            label={field.label}
            type={field.inputType || "text"}
            description={field.description}
            value={formData[field.name] ?? field.default}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            min={field.min}
            max={field.max}
            error={validationErrors[field.name]}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            key={field.name}
            label={field.label}
            description={field.description}
            checked={formData[field.name] ?? field.default}
            onChange={(e) => handleInputChange(field.name, e.target.checked)}
          />
        );
      default:
        return null;
    }
  };

  // Section icon mapping
  const sectionIcons = {
    basic: "Settings",
    advanced: "Sliders",
    pins: "Zap",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon
          name={sectionIcons[activeSection] || "Settings"}
          size={20}
          className="text-primary"
        />
        <h3 className="text-heading-md">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{" "}
          Configuration
        </h3>
      </div>
      <div className="space-y-6">{schema.map(renderField)}</div>
    </div>
  );
};

export default ConfigurationForm;
