export const env = {
    // Environment configuration from browser (client-side)
    USER_INFO: import.meta.env.VITE_USER_INFO,
    BROWSER_TO_SERVER: import.meta.env.VITE_BROWSER_TO_SERVER,
    BROWSER_TO_BACKEND: import.meta.env.VITE_BROWSER_TO_BACKEND,
    BROWSER_TO_BFF: import.meta.env.VITE_BROWSER_TO_BFF,
    // Optional fallbacks if needed
    // BROWSER_TO_OPM: import.meta.env.VITE_BROWSER_TO_OPM,
    // CDN_IMAGE: import.meta.env.VITE_CDN_IMAGE,
  
    // Environment configuration only available on the server (SSR)
    SERVER_TO_BACKEND: import.meta.env.VITE_SERVER_TO_BACKEND,
  };