import React, { useContext } from "react";
import "./PetsOverView.css";
import { Link } from "react-router-dom";
import { petContext } from "../../Context/Pets/PetsContext";

const PetProfiles = ({ pets }) => {
  const { deletePetAction } = useContext(petContext);

  const handleDeleteClick = (id) => {
    deletePetAction(id);
    window.location.reload();
  };

  return (
    <>
      <table className="pet-table">
        <thead>
          <tr className="table-row" key="">
            <th className="table-head name-column">Name</th>
            <th className="table-head breed-column">Breed</th>
            <th className="table-head age-column">Age</th>
            <th className="table-head descr-column">Description</th>
            <th className="table-head edit-column">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {pets?.length <= 0 ? (
            <tr className="table-row-no-pets" key="">
              <td colSpan="5" className="table-row-no-pets-data">
                Add a pet to explore pet profiles.
              </td>
            </tr>
          ) : (
            <>
              {pets?.map((pet) => {
                const currDate = new Date();
                const dob = new Date(pet.dob);

                const ageInMilli = currDate - dob;
                const millisecondsPerYear = 31557600000;
                const ageInYears = Math.floor(ageInMilli / millisecondsPerYear);

                return (
                  <tr className="table-row tbrd" key={pet.id}>
                    <td className="table-data">
                      <Link className="tooltip to-pet-profile" to={pet.qrURL}>
                        <span className="tooltiptext">Pet Profile</span>
                        {pet.name.toUpperCase()}
                      </Link>
                    </td>
                    <td className="table-data">{pet.breed}</td>
                    <td className="table-data">{ageInYears}</td>
                    <td className="table-data">{pet.description}</td>
                    <td className="table-data edit">
                      <Link
                        to={`/edit-profile/${pet.id}`}
                        className="edit-link tooltip"
                      >
                        <i className="fa-solid fa-pencil"></i>
                        <span className="tooltiptext">Edit Pet Info</span>
                      </Link>

                      <button
                        className="delete-pet-button tooltip"
                        onClick={() => handleDeleteClick(pet._id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                        <span className="tooltiptext">Delete Pet</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PetProfiles;
