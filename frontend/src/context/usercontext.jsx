import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const updateUser = (userData) => {
    setUser(userData);
  };
  const clearUser = () => {
    setUser(null);
  };
  const isAuthenticated = !!user; // true if user object exists

  return (
    <UserContext.Provider
      value={{ user, updateUser, clearUser, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
