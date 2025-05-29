import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/usercontext"; // if used
import { API_PATHS } from "../utils/apiPaths";
import { useUserStore } from "../store/userstore";
import LoadingSpinner from "../components/LoadingSpinner";
const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext); // optional if Zustand is used

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.USER.CHECK_ONBOARDING(userId)
      );

      if (response.data.success && response.data.data) {
        const userData = response.data.data;
        useUserStore.getState().setUser(userData);
        if (updateUser) updateUser(userData);
        navigate("/");
      } else {
        navigate("/onboarding");
      }
    } catch (err) {
      console.error("Error checking onboarding status:", err);
      navigate("/onboarding");
    }
  };

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (!token) {
        return navigate("/login");
      }

      localStorage.setItem("token", token);

      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
        const user = {
          id: res.data._id,
          email: res.data.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user);

        await fetchUserProfile(user.id); // check onboarding status
      } catch (err) {
        console.error("Failed to fetch user after OAuth:", err);
        navigate("/login");
      }
    };

    handleOAuthLogin();
  }, [navigate, updateUser]);

  return <LoadingSpinner />;
};

export default OAuthSuccess;
