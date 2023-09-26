import React from "react";
import { Link } from "react-router-dom";
import Button from "../Landing-Page_Component/Button";
import "./Register.css";
const Register = () => {
  return (
    <div className="register-page">
      <form className="register-form">
        <div className="register-container">
          <h1 className="register-form-title">Register</h1>
          <label className="label-name">First Name</label>
          <div className="name-div">
            <input
              className="input-field"
              placeholder="Type your first name"
              type="text"
              name="firstname"
            />
          </div>
          <label className="label-name">Last Name</label>
          <div className="name-div">
            <input
              className="input-field"
              placeholder="Type your last name"
              type="text"
              name="lastname"
            />
          </div>
          <label className="label-name">UserName</label>
          <div className="name-div">
            <input
              className="input-field"
              placeholder="Type your username"
              type="text"
              name="email"
            />
          </div>
          <label className="label-name">Password</label>
          <div className="password-div">
            <input
              className="input-field"
              placeholder="Type your password"
              type="text"
              name="email"
            />
          </div>

          <Button text={"Register"} width={300} height={50} link={"/home"} />
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
