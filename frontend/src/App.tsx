import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AchievementManager from "./pages/AchievementManager";
import JobTailoring from "./pages/JobTailoring";
import ResumePreview from "./pages/ResumePreview";
import UserProfile from "./pages/UserProfile";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserContext } from "./context/usercontext";
import { useContext } from "react";
import Onboarding from "./pages/onboarding";
import { useUserStore } from "./store/userstore";
import LoadingSpinner from "./components/LoadingSpinner";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  const { isAuthenticated } = useContext(UserContext);
  const userData = useUserStore((state) => state.userData);
  const needsOnboarding = isAuthenticated && !userData;
  const isLoading = useUserStore((state) => state.isLoading);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? <Signup /> : <Navigate to="/" replace />
            }
          />
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* Protected Routes */}
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                <Onboarding />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : needsOnboarding ? (
                <Navigate to="/onboarding" replace />
              ) : (
                <Layout />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="achievements" element={<AchievementManager />} />
            <Route path="job-tailoring" element={<JobTailoring />} />
            <Route path="resume-preview" element={<ResumePreview />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
