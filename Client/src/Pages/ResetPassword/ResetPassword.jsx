import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const [isMessage, setIsMessage] = useState(null);
  //detect query params
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const id = query.get("id");

  const API_URL =
    (import.meta.env.API_URL &&
      `${
        import.meta.env.API_URL
      }/api/auth/reset-password?token=${token}&id=${id}`) ||
    `http://localhost:5000/api/auth/reset-password?token=${token}&id=${id}`;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //send request to server

    const response = await axios.post(API_URL, {
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    });
    if (response.data.error) {
      setIsMessage(response.data.error);
    } else {
      setIsMessage(response.data.message);
    }
  };

  return (
    <div>
      <form onClick={onSubmitHandler}>
        <div>
          <label htmlFor="password">Type in new Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Type in new Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button type="submit">Submit</button>
        {isMessage && <p>{isMessage}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
