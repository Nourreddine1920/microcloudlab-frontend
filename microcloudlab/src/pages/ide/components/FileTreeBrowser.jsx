import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

/**
 * @module FileTreeBrowser
 */

/**
 * A component that displays microcontroller configurations in a hierarchical file tree structure.
 * It groups configurations into categories like "Recent", "Projects", "Templates", and "Archived".
 * It supports selection, deletion, duplication, renaming, and context menu actions for configurations.
 *
 * @param {object} props - The properties for the component.
 * @param {Array<object>} props.configurations - An array of configuration objects to display.
 * @param {object|null} props.selectedConfig - The currently selected configuration object.
 * @param {Function} props.onSelectConfig - Callback function when a configuration is selected.
 * @param {Function} props.onDeleteConfig - Callback function to delete a configuration.
 * @param {Function} props.onDuplicateConfig - Callback function to duplicate a configuration.
 * @param {Function} props.onRenameConfig - Callback function to rename a configuration.
 * @param {string} props.searchQuery - The search term to filter the configurations.
 * @param {Function} props.onCreateFolder - Callback function to create a new folder.
 * @returns {JSX.Element} The rendered file tree browser component.
 */
const FileTreeBrowser = ({ 
  configurations, 
  selectedConfig, 
  onSelectConfig, 
  onDeleteConfig, 
  onDuplicateConfig, 
  onRenameConfig,
  searchQuery,
  onCreateFolder 
}) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['recent', 'projects']));
  const [contextMenu, setContextMenu] = useState(null);

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleContextMenu = (e, config) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      config
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const filteredConfigs = configurations.filter(config =>
    config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    config.chipType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    config.peripherals.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedConfigs = {
    recent: filteredConfigs.filter(config => {
      const daysDiff = (new Date() - new Date(config.lastModified)) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    }),
    projects: filteredConfigs.filter(config => config.projectName),
    templates: filteredConfigs.filter(config => config.isTemplate),
    archived: filteredConfigs.filter(config => config.isArchived)
  };

  const renderConfigItem = (config) => (
    <div
      key={config.id}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-micro hover:bg-muted ${
        selectedConfig?.id === config.id ? 'bg-accent text-accent-foreground' : ''
      }`}
      onClick={() => onSelectConfig(config)}
      onContextMenu={(e) => handleContextMenu(e, config)}
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Cpu" size={20} className="text-primary" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="text-body-sm font-medium truncate">{config.name}</h4>
          {config.isTemplate && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">
              Template
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-caption text-muted-foreground">{config.chipType}</span>
          <span className="text-caption text-muted-foreground">•</span>
          <span className="text-caption text-muted-foreground">
            {new Date(config.lastModified).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-1 mt-1">
          {config.peripherals.slice(0, 3).map((peripheral, index) => (
            <span
              key={index}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground"
            >
              {peripheral}
            </span>
          ))}
          {config.peripherals.length > 3 && (
            <span className="text-caption text-muted-foreground">
              +{config.peripherals.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          iconName="Copy"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicateConfig(config);
          }}
          title="Duplicate"
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="Edit2"
          onClick={(e) => {
            e.stopPropagation();
            onRenameConfig(config);
          }}
          title="Rename"
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="Trash2"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteConfig(config);
          }}
          title="Delete"
        />
      </div>
    </div>
  );

  const renderFolder = (folderId, folderName, configs) => {
    const isExpanded = expandedFolders.has(folderId);
    
    return (
      <div key={folderId} className="mb-4">
        <div
          className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-micro"
          onClick={() => toggleFolder(folderId)}
        >
          <Icon 
            name={isExpanded ? "ChevronDown" : "ChevronRight"} 
            size={16} 
            className="text-muted-foreground" 
          />
          <Icon name="Folder" size={16} className="text-muted-foreground" />
          <span className="text-body-sm font-medium">{folderName}</span>
          <span className="text-caption text-muted-foreground">({configs.length})</span>
        </div>
        
        {isExpanded && (
          <div className="ml-6 mt-2 space-y-1">
            {configs.length === 0 ? (
              <div className="text-caption text-muted-foreground p-3 text-center">
                No configurations found
              </div>
            ) : (
              configs.map(renderConfigItem)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-heading-sm font-heading">Configuration Files</h2>
          <Button
            variant="outline"
            size="sm"
            iconName="FolderPlus"
            onClick={onCreateFolder}
          >
            New Folder
          </Button>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderFolder('recent', 'Recent', groupedConfigs.recent)}
        {renderFolder('projects', 'Projects', groupedConfigs.projects)}
        {renderFolder('templates', 'Templates', groupedConfigs.templates)}
        {renderFolder('archived', 'Archived', groupedConfigs.archived)}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-1000"
            onClick={closeContextMenu}
          />
          <div
            className="fixed bg-popover border border-border rounded-lg shadow-modal py-1 z-1010"
            style={{
              left: contextMenu.x,
              top: contextMenu.y
            }}
          >
            <button
              className="w-full px-3 py-2 text-left text-body-sm hover:bg-muted transition-micro flex items-center space-x-2"
              onClick={() => {
                onSelectConfig(contextMenu.config);
                closeContextMenu();
              }}
            >
              <Icon name="Eye" size={14} />
              <span>Open</span>
            </button>
            <button
              className="w-full px-3 py-2 text-left text-body-sm hover:bg-muted transition-micro flex items-center space-x-2"
              onClick={() => {
                onDuplicateConfig(contextMenu.config);
                closeContextMenu();
              }}
            >
              <Icon name="Copy" size={14} />
              <span>Duplicate</span>
            </button>
            <button
              className="w-full px-3 py-2 text-left text-body-sm hover:bg-muted transition-micro flex items-center space-x-2"
              onClick={() => {
                onRenameConfig(contextMenu.config);
                closeContextMenu();
              }}
            >
              <Icon name="Edit2" size={14} />
              <span>Rename</span>
            </button>
            <div className="border-t border-border my-1" />
            <button
              className="w-full px-3 py-2 text-left text-body-sm hover:bg-muted transition-micro flex items-center space-x-2 text-error"
              onClick={() => {
                onDeleteConfig(contextMenu.config);
                closeContextMenu();
              }}
            >
              <Icon name="Trash2" size={14} />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileTreeBrowser;