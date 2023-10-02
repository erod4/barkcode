import React, { useContext } from "react";

import { petContext } from "../../Context/Pets/PetsContext";
import "./PetProfile.css";
import LocationRequest from "../Location Request Component/LocationRequest";

const PetProfile = () => {
  const { pet } = useContext(petContext); // This line is updated
  // const params = useParams();
  // const { id } = params;

  // useEffect(() => {
  //   // Call the fetchPetAction function with the ID
  //   fetchPetAction(id);
  // }, []);

  return (
    <div className="pet-profile-page">
      <LocationRequest />
      {pet?.data ? (
        <div className="profile-card">
          <div className="profile-photo-container">
            <img className="pet-profile-photo" src={pet.data.path} alt="" />
          </div>
          <div className="profile-name-container">
            <h1 className="profile-name">{pet.data.name}</h1>
          </div>
          <div className="description-container">
            <h2 className="description-text">
              Description: {pet.data.description}
            </h2>
          </div>
          <div className="phone-email-container">
            <h2 className="phone">Phone: {pet.data.phone}</h2>
            <h2 className="email">Email: {pet.data.email}</h2>
          </div>
        </div>
      ) : (
        <div>Pet Profile Not Found</div>
      )}
    </div>
  );
};

export default PetProfile;
