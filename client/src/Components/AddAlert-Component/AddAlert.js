import React, { useContext, useEffect } from "react";
import SideBar from "../Home-components/SideBar";
import { authContext } from "../../Context/Auth/AuthContext";
import "./AddAlert.css";
const AddAlert = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);

  //dispatch
  useEffect(() => {
    fetchProfileAction();
  }, []);

  return (
    <div className="add-alert-page">
      <SideBar />
      <main className="add-alert-main-content">
        <div className="add-alert-form-container">
          <form className="add-alert-form">
            <i className="alert-icon fa-solid fa-bell"></i>
            <h1 className="add-alert-form-title">New Alert</h1>
            <p className="attention">
              *Alerts serve as a means to quickly locate your pet and broadcast
              notifications to all users of the application.
            </p>
            <select className="pet-drown-down">
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
            <input className="alert-form-input" type="text" />
            <label className="alert-form-labels">City:</label>
            <input className="alert-form-input" type="text" />
            <label className="alert-form-labels">Message:</label>
            <textarea className="alert-form-textarea"></textarea>
            <button className="alert-form-submit-button">Send Alert</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAlert;
