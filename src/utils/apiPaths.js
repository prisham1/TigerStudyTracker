export const BASE_URL = "http://localhost:5000"; 

// utils/apiPaths.js
// Define API paths for different functionalities
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  }, 
  DASHBOARD : {
    GET_DATA: "/api/v1/dashboard", 
  }, 
  STUDY: {
    ADD_LOG: "/api/v1/study/add",
    GET_LOGS: "/api/v1/study/get",
    DELETE_LOG: (logId) => `/api/v1/study/${logId}`,
    DOWNLOAD_LOGS: "/api/v1/study/download", 
  }, 
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
