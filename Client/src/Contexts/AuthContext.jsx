import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  register: (email, name, nim, password, confirmPassword) => {},
  login: (email, password) => {},
  logout: () => {},
  loadUser: () => {},
  adminLogin: (username, password) => {},
  userData: {},
});

const BASE_URL =
  "http://localhost:5000/api/auth" || `${process.env.API_URL}/auth`;

export const AuthProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const register = async (email, name, nim, password, confirmPassword) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        email,
        name,
        password,
        confirmPassword,
        nim,
      });
      if (response.data.error) {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error: error };
    }

    return {
      error: null,
      message: "Successfully Registered, redirecting in 5 seconds",
    };
  };

  const login = async (email, password) => {
    let response;
    try {
      response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      if (response.data.error) {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error: error };
    }

    localStorage.setItem("token", response.data.token);
    setUserData(jwtDecode(response.data.token));

    return {
      error: null,
      message: "Successfully Logged In, redirecting...",
    };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  const loadUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return logout();
      }
      setUserData(decoded);
    }
  };

  const adminLogin = async (username, password) => {
    let response;
    try {
      response = await axios.post(`${BASE_URL}/admin`, {
        username,
        password,
      });
      if (response.data.error) {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error: error };
    }

    localStorage.setItem("token", response.data.token);
    setUserData(jwtDecode(response.data.token));

    return {
      error: null,
      message: "Successfully Logged In, redirecting...",
    };
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        loadUser,
        userData,
        adminLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
