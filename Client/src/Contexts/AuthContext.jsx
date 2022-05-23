import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  userData: null,
  userDataHandler: (token) => {},
  isError: false,
  register: (email, username, password, confirmPassword) => {},
  login: (email, password) => {},
  logout: () => {},
});

const BASE_URL = "http://localhost:5000/api/auth";

export const AuthProvider = (props) => {
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(null);

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

    localStorage.setItem("token", response.data.accessToken);
    setUserData(jwtDecode(response.data.accessToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        error,
        userData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
