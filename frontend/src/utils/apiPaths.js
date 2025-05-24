export const BASE_URL = "http://localhost:5000";
export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/auth/login`,
    SIGNUP: `/api/auth/signup`,
    GET_USER: `/api/auth/getUser`,
    UPDATE_PASSWORD: `/api/auth/updatePassword`,
    FORGOT_PASSWORD: `/api/auth/forgotPassword`,
  },
  DASHBOARD: {
    GET_DATA: `/api/dashboard`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `/api/users/imageUpload`,
  },
  USER: {
    CREATE_USER: `/api/users/`,
    USER_ALLOPS: (userId) => `/api/users/${userId}`,
    CHECK_ONBOARDING: (userId) => `/api/users/checkOnboarding/${userId}`,
  },
  CERTIFICATE: {
    CREATE_CERTIFICATE: `/api/certificates/`,
    CERTIFICATE_ALLOPS: (id) => `/api/certificates/${id}`,
  },
  PROJECT: {
    CREATE_PROJECT: `/api/projects/`,
    PROJECT_ALLOPS: (projectId) => `/api/projects/${projectId}`,
  },
  EXPERIENCE: {
    CREATE_EXPERIENCE: `/api/experiences/`,
    EXPERIENCE_ALLOPS: (experienceId) => `/api/experiences/${experienceId}`,
  },
  RESUME: {
    CREATE_RESUME: `/api/resumes/`,
    RESUME_ALLOPS: (resumeId) => `/api/resumes/${resumeId}`,
  },
  MATCH: {
    GET_MATCH: `/api/match/`,
  },
};
