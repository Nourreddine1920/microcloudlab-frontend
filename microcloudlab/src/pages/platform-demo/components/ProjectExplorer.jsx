import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProjectExplorer = ({ projects, selectedProject, onProjectSelect, onFileSelect }) => {
  const [expandedProjects, setExpandedProjects] = useState(new Set([projects[0]?.id]));

  const toggleProject = (projectId) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'ino': case'cpp': case'c':
        return 'FileCode';
      case 'h':
        return 'FileText';
      case 'json':
        return 'Braces';
      case 'md':
        return 'FileText';
      default:
        return 'File';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="FolderOpen" size={18} className="text-primary" />
          <h3 className="font-semibold text-text-primary">Project Explorer</h3>
        </div>
        <button className="p-1 hover:bg-surface-hover rounded">
          <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {projects.map((project) => (
          <div key={project.id} className="border-b border-border last:border-b-0">
            <button
              onClick={() => {
                toggleProject(project.id);
                onProjectSelect(project);
              }}
              className={`w-full flex items-center space-x-2 p-3 text-left hover:bg-surface-hover transition-colors ${
                selectedProject?.id === project.id ? 'bg-primary/5 border-r-2 border-primary' : ''
              }`}
            >
              <Icon 
                name={expandedProjects.has(project.id) ? 'ChevronDown' : 'ChevronRight'} 
                size={14} 
                className="text-text-secondary" 
              />
              <Icon name="Folder" size={16} className="text-accent" />
              <div className="flex-1">
                <div className="font-medium text-text-primary text-sm">{project.name}</div>
                <div className="text-xs text-text-secondary">{project.description}</div>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  project.difficulty === 'Beginner' ? 'bg-success' :
                  project.difficulty === 'Intermediate' ? 'bg-warning' : 'bg-error'
                }`}></div>
                <span className="text-xs text-text-secondary">{project.difficulty}</span>
              </div>
            </button>
            
            {expandedProjects.has(project.id) && (
              <div className="pl-8 pb-2">
                {project.files.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => onFileSelect(file)}
                    className="w-full flex items-center space-x-2 p-2 text-left hover:bg-surface-hover rounded text-sm"
                  >
                    <Icon name={getFileIcon(file.name)} size={14} className="text-text-secondary" />
                    <span className="text-text-primary">{file.name}</span>
                    {file.isMain && (
                      <span className="text-xs bg-primary/10 text-primary px-1 py-0.5 rounded">main</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border bg-background/50">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{projects.length} projects</span>
          <div className="flex items-center space-x-1">
            <Icon name="Cloud" size={12} />
            <span>Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;