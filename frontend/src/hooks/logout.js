import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userstore";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";

export const useHandleLogout = () => {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);
  const clearUserData = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUserData();
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return handleLogout;
};
