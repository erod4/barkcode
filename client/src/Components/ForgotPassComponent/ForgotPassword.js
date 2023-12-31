import React, { useContext, useState } from "react";
import "./ForgotPassword.css";

import { ResetPassContext } from "../../Context/ResetPassword/ResetPassContext";
const ForgotPassword = () => {
  const { sendResetAction } = useContext(ResetPassContext);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendResetAction(formData);
  };
  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <form onSubmit={onSubmitHandler} className="reset-password-form">
          <h1>Forgot Password?</h1>
          <div className="reset-password-form-div">
            <label>Email</label>
            <input
              name="email"
              onChange={onChangeInput}
              value={email}
              required
              type="email"
            />
          </div>
          <div className="reset-password-form-button-div">
            <button>Send Reset Code</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
