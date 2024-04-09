/** @format */
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Configure axios
  useEffect(() => {
    if (auth.token) {
      if (process.server) {
        axios.defaults.baseURL = process.env.API;
      } else {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    }
  }, [auth.token]);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(JSON.parse(localStorage.getItem("auth")));
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
