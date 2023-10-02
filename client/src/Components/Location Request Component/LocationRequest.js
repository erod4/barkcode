import React, { useContext, useState } from "react";

import "./Location.css";
import { petContext } from "../../Context/Pets/PetsContext";
import { useParams } from "react-router-dom";
const LocationRequest = () => {
  const { fetchPetAction } = useContext(petContext);
  const params = useParams();
  const { id } = params;

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    fetchPetAction(id, lat, lng);
    setIsOpen(false);
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          fetchPetAction(id, lat, lng);
          setIsOpen(false);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Browser Does Not Support");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="location-page">
          <div className="loction-container">
            <p className="location-message">
              If you've found a lost pet and want to share your current
              location, click the button below. Otherwise, click 'Continue'.
            </p>
            <div className="location-button-container">
              <button className="share-loc-button" onClick={getLocation}>
                Share Your Location
              </button>

              <button onClick={close} className="loc-continue-button">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationRequest;
