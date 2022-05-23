import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AuthContext = React.createContext({
  userData: null,
  userDataHandler: (token) => {},
  isError: false,
  register: (email, username, password, confirmPassword) => {},
  login: (username, password) => {},
  logout: () => {},
});

const BASE_URL = "http://localhost:5000/api/auth";

export const AuthProvider = (props) => {
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(null);

  const register = async (email, username, password, confirmPassword) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        email,
        username,
        password,
        confirmPassword,
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

  const login = async (username, password) => {
    let response;
    try {
      response = await axios.post(`${BASE_URL}/login`, {
        username,
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

    localStorage.setItem("token", response.data.accessToken);
    setUserData(jwtDecode(response.data.accessToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  const userDataHandler = async (token) => {
    let user;
    try {
      user = await axios.post(`${BASE_URL}/user`, {
        token,
      });
      console.log(user);
    } catch (error) {
      setError(error.message.split(":")[0]);
      logout();
      return;
    }

    if (user.data.exp * 1000 < Date.now()) {
      logout();
      return;
    }
    setUserData(user.data);
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        error,
        userData,
        userDataHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
