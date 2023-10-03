import React, { useContext, useState } from "react";
import "./login.css";

import { Link, useHistory } from "react-router-dom";
import { authContext } from "../../Context/Auth/AuthContext";

const Login = () => {
  const history = useHistory();
  const { loginUserAction, userAuth } = useContext(authContext);
  //form data

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  //onchange
  const onChangeInput = (e) => {
    //set for data to previous data (...formData), then set the new data property name to e.target.name
    //which basically is the name of the field you're typing in and the value is the value being typed in e.traget.value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //submit handler
  const onSubmitHandler = async (e) => {
    //prevent reload on submit
    e.preventDefault();
    const success = await loginUserAction(formData);
    if (success) {
      history.push("/home");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={onSubmitHandler} className="login-form">
        <div className="login-container">
          <h1 className="login-form-title">Login</h1>
          {userAuth?.error && (
            <span className="login-message">{userAuth?.error}</span>
          )}
          <label className="login-label-name">Email</label>
          <div className="login-email-div">
            <div className="user-icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <input
              value={email}
              onChange={onChangeInput}
              className="login-input-field"
              placeholder="Type your email"
              type="text"
              name="email"
            />
          </div>
          <label className="login-label-name">Password</label>
          <div className="login-password-div">
            <div className="lock-icon">
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              value={password}
              onChange={onChangeInput}
              className="login-input-field"
              placeholder="Type your password"
              type="password"
              name="password"
            />
          </div>
          <div className="forgot-password-container">
            <Link className="forgot-password-link" to="/forgot-password">
              Forgot Password
            </Link>
          </div>
          <button type="submit" className="login-form-button">
            Submit
          </button>
        </div>
        <div className="register-container">
          <p>Or Register Using</p>
          <Link className="register-link" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
