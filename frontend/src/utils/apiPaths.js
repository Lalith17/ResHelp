export const BASE_URL = "http://localhost:5000";
export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/auth/login`,
    SIGNUP: `/api/auth/signup`,
    GET_USER: `/api/auth/getUser`,
    UPDATE_PASSWORD: `/api/auth/updatePassword`,
    FORGOT_PASSWORD: `/api/auth/forgotPassword`,
    GOOGLE: `/api/auth/google`,
    GITHUB: `/api/auth/github`,
    LINKEDIN: `/api/auth/linkedin`,
  },
  DASHBOARD: {
    GET_DATA: (userId) => `/api/dashboard/${userId}`,
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
    GET_ALL_GITHUB_REPOS: `/api/projects/getAllGithub/`,
    IMPORT_GITHUB_REPOS: (id) => `/api/projects/importGithub/${id}`,
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
    MATCH_CERTIFICATES: `/api/match/certificates`,
    MATCH_PROJECTS: `/api/match/projects`,
    MATCH_EXPERIENCES: `/api/match/experiences`,
    MATCH_ALL: `/api/match/all`,
  },
};
