import React from "react";

const ForgotPassword = () => {
  return (
    <div>
      <form action="">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
