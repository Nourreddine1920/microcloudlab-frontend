import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';

const ImportExportToolbar = ({ 
  onImport, 
  onExport, 
  onSearch, 
  searchQuery,
  isCompareMode,
  onToggleCompareMode,
  selectedForComparison,
  onCompareConfigurations,
  onCreateFolder 
}) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showImportOptions, setShowImportOptions] = useState(false);

  const exportFormats = [
    { id: 'json', label: 'JSON Configuration', icon: 'FileText', description: 'Standard configuration format' },
    { id: 'c', label: 'C Source Code', icon: 'Code', description: 'Generated C code files' },
    { id: 'ioc', label: 'STM32CubeMX (.ioc)', icon: 'Settings', description: 'CubeMX project file' },
    { id: 'zip', label: 'Complete Project', icon: 'Archive', description: 'Full project with all files' }
  ];

  const importSources = [
    { id: 'file', label: 'Upload File', icon: 'Upload', description: 'Import from local file' },
    { id: 'cubemx', label: 'STM32CubeMX', icon: 'Settings', description: 'Import .ioc file' },
    { id: 'template', label: 'From Template', icon: 'Copy', description: 'Use existing template' },
    { id: 'url', label: 'From URL', icon: 'Link', description: 'Import from web URL' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Search and Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1 sm:w-80">
            <Input
              type="search"
              placeholder="Search configurations..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>

          {/* Compare Mode Toggle */}
          <Button
            variant={isCompareMode ? "default" : "outline"}
            size="sm"
            iconName="GitCompare"
            onClick={onToggleCompareMode}
          >
            Compare Mode
            {selectedForComparison.length > 0 && (
              <span className="ml-1 bg-background text-foreground px-1.5 py-0.5 rounded text-xs">
                {selectedForComparison.length}
              </span>
            )}
          </Button>

          {/* Compare Button */}
          {isCompareMode && selectedForComparison.length >= 2 && (
            <Button
              variant="default"
              size="sm"
              iconName="Eye"
              onClick={onCompareConfigurations}
            >
              Compare ({selectedForComparison.length})
            </Button>
          )}
        </div>

        {/* Right Section - Import/Export Actions */}
        <div className="flex items-center space-x-2">
          {/* Create Folder */}
          <Button
            variant="ghost"
            size="sm"
            iconName="FolderPlus"
            onClick={onCreateFolder}
            className="hidden sm:flex"
          >
            New Folder
          </Button>

          {/* Import Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              onClick={() => setShowImportOptions(!showImportOptions)}
            >
              Import
              <Icon name="ChevronDown" size={14} className="ml-1" />
            </Button>

            {showImportOptions && (
              <>
                <div
                  className="fixed inset-0 z-1000"
                  onClick={() => setShowImportOptions(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-1010 animate-fade-in">
                  <div className="p-2">
                    {importSources.map((source) => (
                      <button
                        key={source.id}
                        className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-micro text-left"
                        onClick={() => {
                          if (source.id === 'file') {
                            document.getElementById('file-upload').click();
                          } else {
                            onImport(source.id);
                          }
                          setShowImportOptions(false);
                        }}
                      >
                        <Icon name={source.icon} size={16} className="text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-body-sm font-medium">{source.label}</div>
                          <div className="text-caption text-muted-foreground">{source.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              onClick={() => setShowExportOptions(!showExportOptions)}
            >
              Export
              <Icon name="ChevronDown" size={14} className="ml-1" />
            </Button>

            {showExportOptions && (
              <>
                <div
                  className="fixed inset-0 z-1000"
                  onClick={() => setShowExportOptions(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-1010 animate-fade-in">
                  <div className="p-2">
                    {exportFormats.map((format) => (
                      <button
                        key={format.id}
                        className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-micro text-left"
                        onClick={() => {
                          onExport(format.id);
                          setShowExportOptions(false);
                        }}
                      >
                        <Icon name={format.icon} size={16} className="text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-body-sm font-medium">{format.label}</div>
                          <div className="text-caption text-muted-foreground">{format.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            id="file-upload"
            type="file"
            accept=".json,.ioc,.zip"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="sm:hidden mt-4 flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          iconName="FolderPlus"
          onClick={onCreateFolder}
          fullWidth
        >
          New Folder
        </Button>
      </div>
    </div>
  );
};

export default ImportExportToolbar;