import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Landing-Page_Component/Button";

import "./Register.css";
import { authContext } from "../../Context/Auth/AuthContext";
const Register = () => {
  const { registerUserAction, error } = useContext(authContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = formData;

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onRegSubmitHandler = (e) => {
    e.preventDefault();

    registerUserAction(formData);
  };



  return (
    <div className="register-page">
      <form onSubmit={onRegSubmitHandler} className="register-form">
        <div className="register-container">
          <h1 className="register-form-title">Register</h1>
          {error && <span className="login-message">{error}</span>}
          <label className="label-name">First Name</label>
          <div className="name-div">
            <input
              className="register-input-field"
              placeholder="Type your first name"
              type="text"
              name="firstname"
              onChange={onChangeInput}
              value={firstname}
              required
            />
          </div>
          <label className="label-name">Last Name</label>
          <div className="name-div">
            <input
              className="register-input-field"
              placeholder="Type your last name"
              type="text"
              name="lastname"
              onChange={onChangeInput}
              value={lastname}
              required
            />
          </div>
          <label className="label-name">Email</label>
          <div className="name-div">
            <input
              className="register-input-field"
              placeholder="Type your email"
              type="text"
              name="email"
              onChange={onChangeInput}
              value={email}
              required
            />
          </div>
          <label className="label-name">Password</label>
          <div className="password-div">
            <input
              className="register-input-field"
              placeholder="Type your password"
              type="password"
              name="password"
              onChange={onChangeInput}
              value={password}
              required
            />
          </div>

          <button className="login-form-button reg-btn" type="submit">
            Register
          </button>
        </div>
        <div className="register-container">
          <p>Or Login Using</p>
          <Link className="register-link" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
