// Initial fallback configuration object
let configState = {
  frontendUrl: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
  backendUrl: (typeof import.meta !== 'undefined' && (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL)) || 'http://localhost:5005',
};

// Function to update config state dynamically
export const updateConfigState = (newConfig) => {
  if (!newConfig) return;
  if (newConfig.backendUrl) {
    configState.backendUrl = newConfig.backendUrl.replace(/\/+$/, '');
  }
  if (newConfig.frontendUrl) {
    configState.frontendUrl = newConfig.frontendUrl.replace(/\/+$/, '');
  }
};

// Runtime loader that fetches /config.json dynamically from web server
export const loadRuntimeConfig = async () => {
  try {
    const res = await fetch('/config.json?v=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      updateConfigState(data);
    }
  } catch (err) {
    console.warn('Could not fetch runtime config.json, using bundled defaults:', err);

  }
  return configState;
};

// Dynamic getters
export const getBackendUrl = () => configState.backendUrl;
export const getFrontendUrl = () => configState.frontendUrl;
export const getApiUrl = () => `${configState.backendUrl}/api`;
export const getServerBaseUrl = () => configState.backendUrl;

// Dynamic string objects for API_URL & SERVER_BASE_URL so `${API_URL}/endpoint`
// and `${API_URL.replace('/api', '')}` work dynamically without touching page code.
export const API_URL = {
  toString: () => getApiUrl(),
  valueOf: () => getApiUrl(),
  replace: (...args) => getApiUrl().replace(...args),
  startsWith: (...args) => getApiUrl().startsWith(...args),
};

export const SERVER_BASE_URL = {
  toString: () => getServerBaseUrl(),
  valueOf: () => getServerBaseUrl(),
  replace: (...args) => getServerBaseUrl().replace(...args),
  startsWith: (...args) => getServerBaseUrl().startsWith(...args),
};

export default {
  getBackendUrl,
  getFrontendUrl,
  getApiUrl,
  getServerBaseUrl,
  API_URL,
  SERVER_BASE_URL,
  loadRuntimeConfig,
};
