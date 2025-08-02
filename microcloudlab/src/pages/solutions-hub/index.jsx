import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CaseStudyCard from './components/CaseStudyCard';
import MicrocontrollerCard from './components/MicrocontrollerCard';
import ProjectCard from './components/ProjectCard';
import IndustryCard from './components/IndustryCard';
import ComparisonTable from './components/ComparisonTable';
import ROICalculator from './components/ROICalculator';
import { caseStudyAPI, microcontrollerAPI, projectAPI } from '../../services/api';
import { useApiState } from '../../hooks/useApiState';

const SolutionsHub = () => {
  const [activeTab, setActiveTab] = useState('case-studies');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // Fetch data from APIs
  const { data: caseStudies, loading: caseStudiesLoading } = useApiState(
    () => caseStudyAPI.getAll(),
    []
  );

  const { data: microcontrollers, loading: microcontrollersLoading } = useApiState(
    () => microcontrollerAPI.getAll(),
    []
  );

  const { data: projects, loading: projectsLoading } = useApiState(
    () => projectAPI.getAll(),
    []
  );

  // Filter case studies by industry
  const filteredCaseStudies = caseStudies?.filter(study => 
    selectedIndustry === 'all' || study.industry === selectedIndustry
  ) || [];

  // Get unique industries from case studies
  const industries = ['all', ...new Set(caseStudies?.map(study => study.industry) || [])];

  const tabs = [
    { id: 'case-studies', name: 'Case Studies', icon: 'FileText' },
    { id: 'microcontrollers', name: 'Microcontrollers', icon: 'Cpu' },
    { id: 'projects', name: 'Projects', icon: 'Folder' },
    { id: 'industries', name: 'Industries', icon: 'Building' },
    { id: 'comparison', name: 'Platform Comparison', icon: 'BarChart3' },
    { id: 'roi-calculator', name: 'ROI Calculator', icon: 'Calculator' },
  ];

  const industriesData = [
    { name: 'IoT & Smart Cities', icon: 'Wifi', count: caseStudies?.filter(s => s.industry === 'IoT & Smart Cities').length || 0 },
    { name: 'Industrial Automation', icon: 'Factory', count: caseStudies?.filter(s => s.industry === 'Industrial Automation').length || 0 },
    { name: 'Healthcare & Medical', icon: 'Heart', count: caseStudies?.filter(s => s.industry === 'Healthcare & Medical').length || 0 },
    { name: 'Agriculture & Precision Farming', icon: 'Sprout', count: caseStudies?.filter(s => s.industry === 'Agriculture & Precision Farming').length || 0 },
    { name: 'Energy & Sustainability', icon: 'Zap', count: caseStudies?.filter(s => s.industry === 'Energy & Sustainability').length || 0 },
    { name: 'Transportation & Logistics', icon: 'Truck', count: caseStudies?.filter(s => s.industry === 'Transportation & Logistics').length || 0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-headline text-text-primary mb-6">
              Solutions Hub
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Discover real-world applications, compare platforms, and calculate your ROI. 
              See how MicroCloudLab transforms embedded development across industries.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                variant="primary" 
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
              >
                Watch Success Stories
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                iconName="Download"
                iconPosition="left"
              >
                Download Case Studies
              </Button>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="text-center p-6 bg-surface rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent mb-2">
                {caseStudiesLoading ? '...' : caseStudies?.length || 0}
              </div>
              <div className="text-text-secondary">Case Studies</div>
            </div>
            <div className="text-center p-6 bg-surface rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">
                {microcontrollersLoading ? '...' : microcontrollers?.length || 0}
              </div>
              <div className="text-text-secondary">Microcontrollers</div>
            </div>
            <div className="text-center p-6 bg-surface rounded-xl border border-border">
              <div className="text-3xl font-bold text-success mb-2">
                {projectsLoading ? '...' : projects?.length || 0}
              </div>
              <div className="text-text-secondary">Projects</div>
            </div>
            <div className="text-center p-6 bg-surface rounded-xl border border-border">
              <div className="text-3xl font-bold text-warning mb-2">
                {industries.length - 1}
              </div>
              <div className="text-text-secondary">Industries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-smooth ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={20} />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Case Studies Tab */}
          {activeTab === 'case-studies' && (
            <div>
              {/* Industry Filter */}
              <div className="mb-12">
                <h3 className="text-2xl font-headline text-text-primary mb-6">
                  Filter by Industry
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {industriesData.map((industry) => (
                    <button
                      key={industry.name}
                      onClick={() => setSelectedIndustry(industry.name)}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-smooth ${
                        selectedIndustry === industry.name
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-surface hover:border-primary/50'
                      }`}
                    >
                      <Icon name={industry.icon} size={20} />
                      <div className="text-left">
                        <div className="font-medium">{industry.name}</div>
                        <div className="text-sm text-text-secondary">
                          {industry.count} case studies
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Case Studies Grid */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-headline text-text-primary">
                    {selectedIndustry === 'all' ? 'All Case Studies' : `${selectedIndustry} Case Studies`}
                  </h3>
                  <div className="text-text-secondary">
                    {filteredCaseStudies.length} results
                  </div>
                </div>

                {caseStudiesLoading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-surface rounded-xl border border-border p-6">
                          <div className="h-4 bg-border rounded mb-4"></div>
                          <div className="h-6 bg-border rounded mb-2"></div>
                          <div className="h-4 bg-border rounded mb-4 w-3/4"></div>
                          <div className="h-4 bg-border rounded mb-2"></div>
                          <div className="h-4 bg-border rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredCaseStudies.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredCaseStudies.map((study) => (
                      <CaseStudyCard key={study.id} study={study} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-text-primary mb-2">
                      No case studies found
                    </h4>
                    <p className="text-text-secondary">
                      No case studies available for the selected industry.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Microcontrollers Tab */}
          {activeTab === 'microcontrollers' && (
            <div>
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-headline text-text-primary">
                    Available Microcontrollers
                  </h3>
                  <div className="text-text-secondary">
                    {microcontrollersLoading ? '...' : microcontrollers?.length || 0} microcontrollers
                  </div>
                </div>

                {microcontrollersLoading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-surface rounded-xl border border-border p-6">
                          <div className="h-4 bg-border rounded mb-4"></div>
                          <div className="h-6 bg-border rounded mb-2"></div>
                          <div className="h-4 bg-border rounded mb-4 w-3/4"></div>
                          <div className="h-4 bg-border rounded mb-2"></div>
                          <div className="h-4 bg-border rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : microcontrollers && microcontrollers.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {microcontrollers.map((microcontroller) => (
                      <MicrocontrollerCard key={microcontroller.id} microcontroller={microcontroller} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Cpu" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-text-primary mb-2">
                      No microcontrollers found
                    </h4>
                    <p className="text-text-secondary">
                      No microcontrollers are currently available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-headline text-text-primary">
                    User Projects
                  </h3>
                  <div className="text-text-secondary">
                    {projectsLoading ? '...' : projects?.length || 0} projects
                  </div>
                </div>

                {projectsLoading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-surface rounded-xl border border-border p-6">
                          <div className="h-4 bg-border rounded mb-4"></div>
                          <div className="h-6 bg-border rounded mb-2"></div>
                          <div className="h-4 bg-border rounded mb-4 w-3/4"></div>
                          <div className="h-4 bg-border rounded mb-2"></div>
                          <div className="h-4 bg-border rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : projects && projects.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Folder" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-text-primary mb-2">
                      No projects found
                    </h4>
                    <p className="text-text-secondary">
                      No projects are currently available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Industries Tab */}
          {activeTab === 'industries' && (
            <div>
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-headline text-text-primary">
                    Industry Solutions
                  </h3>
                  <div className="text-text-secondary">
                    {industries.length - 1} industries
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {industriesData.map((industry) => (
                    <IndustryCard 
                      key={industry.name}
                      industry={industry}
                      caseStudies={caseStudies}
                      projects={projects}
                      microcontrollers={microcontrollers}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Platform Comparison Tab */}
          {activeTab === 'comparison' && (
            <ComparisonTable />
          )}

          {/* ROI Calculator Tab */}
          {activeTab === 'roi-calculator' && (
            <ROICalculator />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-headline text-text-primary mb-6">
              Ready to Transform Your Development?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
              Join thousands of developers who have already accelerated their embedded projects with MicroCloudLab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ide">
                <Button 
                  variant="primary" 
                  size="lg"
                  iconName="Zap"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-oscilloscope"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-headline">MicroCloudLab</h3>
                  <p className="text-sm text-secondary-foreground/80">Embedded Development, Unleashed</p>
                </div>
              </div>
              <p className="text-secondary-foreground/80 leading-relaxed mb-6 max-w-md">
                Democratizing embedded development by making microcontroller access as universal as web development. 
                Breaking barriers, enabling innovation, empowering creators worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary-foreground/20 transition-smooth">
                  <span className="text-secondary-foreground">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary-foreground/20 transition-smooth">
                  <span className="text-secondary-foreground">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary-foreground/20 transition-smooth">
                  <span className="text-secondary-foreground">gh</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="/platform-demo" className="hover:text-secondary-foreground transition-smooth">Live Demo</a></li>
                <li><a href="/solutions-hub" className="hover:text-secondary-foreground transition-smooth">Solutions</a></li>
                <li><a href="/resources-support" className="hover:text-secondary-foreground transition-smooth">Documentation</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">API Reference</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/80">
                <li><a href="/about-vision" className="hover:text-secondary-foreground transition-smooth">About Us</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Careers</a></li>
                <li><a href="/contact-partnership" className="hover:text-secondary-foreground transition-smooth">Contact</a></li>
                <li><a href="#" className="hover:text-secondary-foreground transition-smooth">Press Kit</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-secondary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-secondary-foreground/60">
              © {new Date().getFullYear()} MicroCloudLab. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-smooth">Privacy Policy</a>
              <a href="#" className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-smooth">Terms of Service</a>
              <a href="#" className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-smooth">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SolutionsHub;