import React, { useState } from 'react';
import Button from './ui/Button';
import { projectAPI, microcontrollerAPI, caseStudyAPI } from '../services/api';
import { useApiState, useApiMutation } from '../hooks/useApiState';

const ApiTest = () => {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Fetch data
  const { data: projects, loading: projectsLoading, refetch: refetchProjects } = useApiState(
    () => projectAPI.getAll(),
    []
  );
  
  const { data: microcontrollers, loading: mcuLoading, refetch: refetchMCUs } = useApiState(
    () => microcontrollerAPI.getAll(),
    []
  );
  
  const { data: caseStudies, loading: caseStudiesLoading, refetch: refetchCaseStudies } = useApiState(
    () => caseStudyAPI.getAll(),
    []
  );

  // Mutations
  const { mutate: createProject, loading: creatingProject } = useApiMutation(
    (data) => projectAPI.create(data)
  );
  
  const { mutate: createMCU, loading: creatingMCU } = useApiMutation(
    (data) => microcontrollerAPI.create(data)
  );
  
  const { mutate: createCaseStudy, loading: creatingCaseStudy } = useApiMutation(
    (data) => caseStudyAPI.create(data)
  );

  const handleCreateProject = async () => {
    try {
      await createProject({
        title: `Test Project ${Date.now()}`,
        description: 'This is a test project created via API',
        project_type: 'IOT'
      });
      refetchProjects();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleCreateMCU = async () => {
    try {
      await createMCU({
        name: `ESP32 Test ${Date.now()}`,
        type: 'ESP32',
        description: 'Test ESP32 microcontroller',
        specifications: {
          ram: '520KB',
          flash: '4MB',
          gpio_pins: 30
        }
      });
      refetchMCUs();
    } catch (error) {
      console.error('Failed to create microcontroller:', error);
    }
  };

  const handleCreateCaseStudy = async () => {
    try {
      await createCaseStudy({
        title: `Test Case Study ${Date.now()}`,
        subtitle: 'A test case study',
        description: 'This is a test case study',
        challenge: 'Test challenge',
        solution: 'Test solution',
        results: 'Test results',
        technologies_used: ['ESP32', 'Arduino'],
        industry: 'Test Industry'
      });
      refetchCaseStudies();
    } catch (error) {
      console.error('Failed to create case study:', error);
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', data: projects, loading: projectsLoading },
    { id: 'microcontrollers', label: 'Microcontrollers', data: microcontrollers, loading: mcuLoading },
    { id: 'casestudies', label: 'Case Studies', data: caseStudies, loading: caseStudiesLoading }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-4">API Integration Test</h2>
        <p className="text-text-secondary mb-4">
          This component demonstrates the frontend-backend integration. Test creating and viewing data from the API.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Create Button */}
      <div className="mb-6">
        {activeTab === 'projects' && (
          <Button
            onClick={handleCreateProject}
            loading={creatingProject}
            variant="primary"
            iconName="Plus"
            iconPosition="left"
          >
            Create Test Project
          </Button>
        )}
        {activeTab === 'microcontrollers' && (
          <Button
            onClick={handleCreateMCU}
            loading={creatingMCU}
            variant="primary"
            iconName="Plus"
            iconPosition="left"
          >
            Create Test Microcontroller
          </Button>
        )}
        {activeTab === 'casestudies' && (
          <Button
            onClick={handleCreateCaseStudy}
            loading={creatingCaseStudy}
            variant="primary"
            iconName="Plus"
            iconPosition="left"
          >
            Create Test Case Study
          </Button>
        )}
      </div>

      {/* Data Display */}
      <div className="bg-surface rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {currentTab?.label} ({currentTab?.data?.length || 0})
          </h3>
          <Button
            onClick={() => {
              if (activeTab === 'projects') refetchProjects();
              if (activeTab === 'microcontrollers') refetchMCUs();
              if (activeTab === 'casestudies') refetchCaseStudies();
            }}
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>

        {currentTab?.loading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2 text-text-secondary">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span>Loading {currentTab.label.toLowerCase()}...</span>
            </div>
          </div>
        ) : currentTab?.data?.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            No {currentTab.label.toLowerCase()} found. Create one to get started!
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {currentTab?.data?.map((item) => (
              <div
                key={item.id}
                className="bg-background border border-border rounded-lg p-4 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">
                      {item.title || item.name}
                    </h4>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                      <span>ID: {item.id}</span>
                      <span>Created: {new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Status */}
      <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-2 text-success">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-sm font-medium">API Connection Active</span>
        </div>
        <p className="text-xs text-success/80 mt-1">
          Backend API is running and responding to requests
        </p>
      </div>
    </div>
  );
};

export default ApiTest; 