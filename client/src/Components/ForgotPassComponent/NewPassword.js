import React, { useContext, useState } from "react";
import { ResetPassContext } from "../../Context/ResetPassword/ResetPassContext";

const NewPassword = () => {
  const { resetPasswordAction } = useContext(ResetPassContext);
  const [formData, setFormData] = useState({
    password: "",
  });
  const { password } = formData;
  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    console.log(formData);
    e.preventDefault();
    resetPasswordAction(formData);
  };
  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <form onSubmit={onSubmitHandler} className="reset-password-form">
          <h1>Enter New Password</h1>
          <div className="reset-password-form-div">
            <label>New Password</label>
            <input
              onChange={onChangeInput}
              name="password"
              value={password}
              required
              type="password"
            />
          </div>
          <div className="reset-password-form-button-div">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
