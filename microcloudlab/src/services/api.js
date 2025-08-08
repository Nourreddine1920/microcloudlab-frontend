const API_BASE_URL = 'http://localhost:8000/api';

// Generic API functions
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('auth_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Microcontroller API
export const microcontrollerAPI = {
  getAll: () => apiRequest('/microcontrollers/'),
  getById: (id) => apiRequest(`/microcontrollers/${id}/`),
  create: (data) => apiRequest('/microcontrollers/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/microcontrollers/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/microcontrollers/${id}/`, {
    method: 'DELETE',
  }),
};

// Project API
export const projectAPI = {
  getAll: () => apiRequest('/projects/'),
  getById: (id) => apiRequest(`/projects/${id}/`),
  create: (data) => apiRequest('/projects/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/projects/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/projects/${id}/`, {
    method: 'DELETE',
  }),
};

// Code Execution API
export const codeExecutionAPI = {
  getAll: () => apiRequest('/codeexecutions/'),
  getById: (id) => apiRequest(`/codeexecutions/${id}/`),
  create: (data) => apiRequest('/codeexecutions/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/codeexecutions/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/codeexecutions/${id}/`, {
    method: 'DELETE',
  }),
};

// Tutorial API
export const tutorialAPI = {
  getAll: () => apiRequest('/tutorials/'),
  getById: (id) => apiRequest(`/tutorials/${id}/`),
  create: (data) => apiRequest('/tutorials/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/tutorials/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/tutorials/${id}/`, {
    method: 'DELETE',
  }),
};

// Tutorial Progress API
export const tutorialProgressAPI = {
  getAll: () => apiRequest('/tutorialprogress/'),
  getById: (id) => apiRequest(`/tutorialprogress/${id}/`),
  create: (data) => apiRequest('/tutorialprogress/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/tutorialprogress/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/tutorialprogress/${id}/`, {
    method: 'DELETE',
  }),
};

// Case Study API
export const caseStudyAPI = {
  getAll: () => apiRequest('/casestudies/'),
  getById: (id) => apiRequest(`/casestudies/${id}/`),
  create: (data) => apiRequest('/casestudies/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/casestudies/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/casestudies/${id}/`, {
    method: 'DELETE',
  }),
};

// Contact Inquiry API
export const contactAPI = {
  getAll: () => apiRequest('/contactinquiries/'),
  getById: (id) => apiRequest(`/contactinquiries/${id}/`),
  create: (data) => apiRequest('/contactinquiries/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/contactinquiries/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/contactinquiries/${id}/`, {
    method: 'DELETE',
  }),
};

// Platform Stats API
export const platformStatsAPI = {
  getAll: () => apiRequest('/platformstats/'),
  getById: (id) => apiRequest(`/platformstats/${id}/`),
  create: (data) => apiRequest('/platformstats/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/platformstats/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/platformstats/${id}/`, {
    method: 'DELETE',
  }),
};

// Team Member API
export const teamMemberAPI = {
  getAll: () => apiRequest('/teammembers/'),
  getById: (id) => apiRequest(`/teammembers/${id}/`),
  create: (data) => apiRequest('/teammembers/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/teammembers/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/teammembers/${id}/`, {
    method: 'DELETE',
  }),
};

// Resource API
export const resourceAPI = {
  getAll: () => apiRequest('/resources/'),
  getById: (id) => apiRequest(`/resources/${id}/`),
  create: (data) => apiRequest('/resources/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/resources/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/resources/${id}/`, {
    method: 'DELETE',
  }),
};

// User Profile API
export const userProfileAPI = {
  getAll: () => apiRequest('/userprofiles/'),
  getById: (id) => apiRequest(`/userprofiles/${id}/`),
  create: (data) => apiRequest('/userprofiles/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/userprofiles/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/userprofiles/${id}/`, {
    method: 'DELETE',
  }),
};

// Custom hooks for React components
export const useAPI = () => ({
  microcontrollers: microcontrollerAPI,
  projects: projectAPI,
  codeExecutions: codeExecutionAPI,
  tutorials: tutorialAPI,
  tutorialProgress: tutorialProgressAPI,
  caseStudies: caseStudyAPI,
  contact: contactAPI,
  platformStats: platformStatsAPI,
  teamMembers: teamMemberAPI,
  resources: resourceAPI,
  userProfiles: userProfileAPI,
}); 