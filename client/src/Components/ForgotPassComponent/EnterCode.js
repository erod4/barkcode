import React, { useContext, useState } from "react";
import { ResetPassContext } from "../../Context/ResetPassword/ResetPassContext";

const EnterCode = () => {
  const { verifyResetAction } = useContext(ResetPassContext);
  const [formData, setFormData] = useState({
    resetCode: "",
  });
  const { resetCode } = formData;
  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    verifyResetAction(formData);
  };
  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <form onSubmit={onSubmitHandler} className="reset-password-form">
          <h1>Enter Reset Code</h1>
          <div className="reset-password-form-div">
            <label>Code</label>
            <input
              name="resetCode"
              value={resetCode}
              onChange={onChangeInput}
              maxLength={6}
              required
              type="text"
            />
          </div>
          <div className="reset-password-form-button-div">
            <button>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterCode;
