import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Home-components/SideBar";
import { authContext } from "../../Context/Auth/AuthContext";
import "./AddAlert.css";
import { AlertContext } from "../../Context/Alert/AlertContext";

const AddAlert = () => {
  const { fetchProfileAction, profile } = useContext(authContext);
  const { postAlertAction } = useContext(AlertContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    city: "",
  });
  const { title, body, city } = formData;
  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    postAlertAction(formData);
  };
  //dispatch
  useEffect(() => {
    fetchProfileAction();
  }, []);

  return (
    <div className="add-alert-page">
      <SideBar />
      <main className="add-alert-main-content">
        <div className="add-alert-form-container">
          <form className="add-alert-form" onSubmit={onSubmitHandler}>
            <i className="alert-icon fa-solid fa-bell"></i>
            <h1 className="add-alert-form-title">New Alert</h1>
            <p className="attention">
              *Alerts serve as a means to quickly locate your pet and broadcast
              notifications to all users of the application.
            </p>
            <select required className="pet-drown-down">
              <option value="" key="">
                select a pet{" "}
              </option>
              {profile?.pets <= 0 ? (
                <option value="" key="">
                  No Pets Available
                </option>
              ) : (
                <>
                  {profile?.pets.map((pet) => {
                    return (
                      <option value="pet" key={pet._id}>
                        {pet.name}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
            <label className="alert-form-labels">Title:</label>
            <input
              placeholder="e.g. Lost Pet"
              className="alert-form-input"
              type="text"
              name="title"
              value={title}
              onChange={onChangeInput}
              required
            />
            <label className="alert-form-labels">City:</label>
            <input
              className="alert-form-input"
              type="text"
              placeholder="e.g. San Diego"
              name="city"
              value={city}
              onChange={onChangeInput}
              required
            />
            <label className="alert-form-labels">Message:</label>
            <textarea
              name="body"
              value={body}
              onChange={onChangeInput}
              className="alert-form-textarea"
              required
            ></textarea>
            <button className="alert-form-submit-button">Send Alert</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAlert;
