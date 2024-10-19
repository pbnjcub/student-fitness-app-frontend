// config/config.js

const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
    prodApiBaseUrl: process.env.REACT_APP_PROD_API_BASE_URL || 'https://api.default-production.com',
  };
  
  export default config;
  