const API_BASE_URL = 'http://localhost:8000/api';

/**
 * @module api
 * This module provides a centralized and structured way to interact with the backend API.
 * It abstracts the details of HTTP requests and provides a clean interface for each API resource.
 */

/**
 * A generic function for making API requests. It handles adding the base URL,
 * setting common headers (including the auth token), and processing the response.
 *
 * @param {string} endpoint - The API endpoint to request (e.g., '/microcontrollers/').
 * @param {object} [options={}] - The options for the fetch request (e.g., method, body).
 * @returns {Promise<any>} A promise that resolves with the JSON response from the API.
 * @throws {Error} If the network request fails or the response status is not ok.
 */
export const apiRequest = async (endpoint, options = {}) => {
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

/**
 * An object containing a set of functions for interacting with the Microcontroller API endpoints.
 * @type {object}
 */
export const microcontrollerAPI = {
  /**
   * Fetches all microcontrollers.
   * @returns {Promise<any>} A promise that resolves with the list of microcontrollers.
   */
  getAll: () => apiRequest('/microcontrollers/'),
  /**
   * Fetches a single microcontroller by its ID.
   * @param {string} id - The ID of the microcontroller to fetch.
   * @returns {Promise<any>} A promise that resolves with the microcontroller data.
   */
  getById: (id) => apiRequest(`/microcontrollers/${id}/`),
  /**
   * Creates a new microcontroller.
   * @param {object} data - The data for the new microcontroller.
   * @returns {Promise<any>} A promise that resolves with the created microcontroller data.
   */
  create: (data) => apiRequest('/microcontrollers/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  /**
   * Updates an existing microcontroller.
   * @param {string} id - The ID of the microcontroller to update.
   * @param {object} data - The updated data for the microcontroller.
   * @returns {Promise<any>} A promise that resolves with the updated microcontroller data.
   */
  update: (id, data) => apiRequest(`/microcontrollers/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  /**
   * Deletes a microcontroller.
   * @param {string} id - The ID of the microcontroller to delete.
   * @returns {Promise<any>} A promise that resolves when the microcontroller is deleted.
   */
  delete: (id) => apiRequest(`/microcontrollers/${id}/`, {
    method: 'DELETE',
  }),
};

/**
 * An object containing a set of functions for interacting with the Project API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the CodeExecution API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the Tutorial API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the TutorialProgress API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the CaseStudy API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the ContactInquiry API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the PlatformStats API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the TeamMember API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the Resource API endpoints.
 * @type {object}
 */
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

/**
 * An object containing a set of functions for interacting with the UserProfile API endpoints.
 * @type {object}
 */
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

/**
 * A custom hook that provides a convenient way to access all API service objects.
 *
 * @returns {object} An object containing all API service interfaces.
 */
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