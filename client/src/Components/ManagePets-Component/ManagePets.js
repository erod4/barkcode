import React, { useContext, useEffect } from "react";
import SideBar from "../Home-components/SideBar";
import { authContext } from "../../Context/Auth/AuthContext";
import UserNotFound from "../UserNotFound/UserNotFound";
import "./ManagePets.css";
import { Link, useParams } from "react-router-dom";
import PetProfiles from "../PetsOverview-Component/PetsOverView";

const ManagePets = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);

  //dispatch
  useEffect(() => {
    fetchProfileAction();
  }, []);

  return (
    <div className="manage-pets-page">
      <SideBar name={"First Last"} />
      {error ? (
        <UserNotFound />
      ) : (
        <div className="manage-pets-content">
          <header className="manage-pets-heading">
            <h1 className="manage-pets-title">Manage-Pets</h1>
          </header>
          <main className="manage-pets-main-conent">
            <div className="pet-profiles">
              <h1 className="pet-profiles-title">Profiles</h1>
              <div className="add-pet-link-container">
                <Link className="add-pet-link" to="/qr">
                  <i className="fa-solid fa-plus"></i>
                  <p className="pet-link-text">New Pet</p>
                </Link>
              </div>
              <div className="pet-profiles-container">
                <PetProfiles pets={profile?.pets} />
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default ManagePets;
//
