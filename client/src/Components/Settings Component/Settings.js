import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Home-components/SideBar";
import "./Settings.css";
import { authContext } from "../../Context/Auth/AuthContext";
import UserNotFound from "../UserNotFound/UserNotFound";
const Settings = () => {
  const {
    updateUserAction,
    fetchProfileAction,
    profile,
    error,
    deleteUserAction,
  } = useContext(authContext);
  const [isDeleteAccountVisible, setIsDeleteAccountVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const openDelete = () => {
    setIsDeleteAccountVisible(true);
  };

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
  const submitHandler = (e) => {
    e.preventDefault();
    updateUserAction(formData);
    setIsSuccess(true);
  };
  const closeDelete = () => {
    setIsDeleteAccountVisible(false);
  };
  useEffect(() => {
    fetchProfileAction();
  }, []);

  const isProfileFetchError =
    error && error === "Invalid/Expired Token, Please login again";

  return (
    <div className="settings-page">
      <SideBar />
      {isProfileFetchError ? (
        <UserNotFound />
      ) : (
        <main className="settings-main-page">
          <div className="settings-container">
            <div className="settings-title">Main Info</div>
            {error && <span className="update-fail-message">{error}</span>}
            {!error && isSuccess && (
              <span className="update-succes-message">Save Succesful</span>
            )}
            <div className="main-info">
              <form onSubmit={submitHandler} className="settings-form">
                <label className="settings-form-label">First Name</label>
                <input
                  className="settings-form-input"
                  name="firstname"
                  type="text"
                  placeholder={profile?.firstname}
                  value={firstname}
                  onChange={onChangeInput}
                />
                <label className="settings-form-label">Last Name</label>
                <input
                  className="settings-form-input"
                  type="text"
                  placeholder={profile?.lastname}
                  value={lastname}
                  onChange={onChangeInput}
                  name="lastname"
                />
                <label className="settings-form-label">Email</label>
                <input
                  className="settings-form-input"
                  type="text"
                  placeholder={profile?.email}
                  value={email}
                  onChange={onChangeInput}
                  name="email"
                />
                <label className="settings-form-label">Password</label>
                <input
                  className="settings-form-input"
                  type="password"
                  placeholder="●●●●●●●"
                  value={password}
                  onChange={onChangeInput}
                  name="password"
                />
                <button type="submit" className="settings-form-save-button">
                  Save Changes
                </button>
              </form>
              <div className="delete-account-container">
                <button onClick={openDelete} className="delete-account-button">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
          {isDeleteAccountVisible && (
            <div className="confirm-delete">
              <div className="confirm-delete-container">
                <h1>Confirm Account Deletion</h1>
                <p>This will permanently delete your account.</p>
                <div className="confirm-delete-button-container">
                  <button onClick={deleteUserAction}>Confirm</button>
                  <button onClick={closeDelete}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Settings;
