import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  isError: false,
  register: (email, username, password, confirmPassword) => {},
  login: (email, password) => {},
  logout: () => {},
  isAuth: false,
  checkToken: () => {},
});

const BASE_URL = "http://localhost:5000/api/auth";

export const AuthProvider = (props) => {
  const [error, setError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

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
        console.log(response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      return;
    }
  };

  const login = async (email, password) => {
    let response;
    try {
      response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      if (response.data.error) {
        console.log(response.data.error);
        setError(response.data.error);
        return;
      }
    } catch (error) {
      console.log(error);
      setError(error);
      return;
    }

    localStorage.setItem("token", response.data.token);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        error,
        isAuth,
        checkToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
