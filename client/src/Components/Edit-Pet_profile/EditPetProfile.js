import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Home-components/SideBar";
import { petContext } from "../../Context/Pets/PetsContext";
import "./EditProfile.css";
import { useParams } from "react-router-dom";
const EditPetProfile = () => {
  const { pet, updatePetAction, fetchPetAction } = useContext(petContext);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // Call the fetchPetAction function with the ID
    fetchPetAction(id);
  }, []);

  const [imagePreview, setImagePreview] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    dob: "",
    description: "",
    file: null,
    phone: "",
    email: "",
  });
  const { breed, description, phone, email } = formData;
  const onChangeInput = (e) => {
    //set for data to previous data (...formData), then set the new data property name to e.target.name
    //which basically is the name of the field you're typing in and the value is the value being typed in e.traget.value

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onFileInputChange = (e) => {
    const file = e.target.files[0];

    setProfilePicture(file);
    setFormData({ ...formData, file: profilePicture });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  //submit handler
  const onSubmitHandler = (e) => {
    //prevent reload on submit
    e.preventDefault();

    updatePetAction(id, formData);
    window.location.href = "/manage-pets/";
  };
  return (
    <div className="edit-profile-page">
      <SideBar />
      {pet ? (
        <main className="edit-profile-main-page">
          <div className="edit-profile-container">
            <div className="edit-profile-title">Pet Info</div>

            <div className="edit-profile-main-info">
              <form onSubmit={onSubmitHandler} className="edit-profile-form">
                {!imagePreview && (
                  <img
                    className="edit-profile-image-preview"
                    src={pet.data.path}
                    alt=""
                  />
                )}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="edit-profile-image-preview"
                  />
                )}
                <input
                  className="edit-profile-picture-input"
                  accept="image/jpg, image/png, image/jpeg"
                  name="file"
                  onChange={onFileInputChange}
                  onInput={onFileInputChange}
                  type="file"
                />
                <label className="edit-profile-form-label">Phone</label>
                <input
                  onChange={onChangeInput}
                  value={phone}
                  className="edit-profile-form-input"
                  name="phone"
                  placeholder={pet.data.phone}
                />
                <label className="edit-profile-form-label">Email</label>
                <input
                  onChange={onChangeInput}
                  value={email}
                  className="edit-profile-form-input"
                  name="email"
                  placeholder={pet.data.email}
                />
                <label className="edit-profile-form-label">Breed</label>
                <input
                  onChange={onChangeInput}
                  value={breed}
                  className="edit-profile-form-input"
                  type="text"
                  name="breed"
                  placeholder={pet.data.breed}
                />

                <label className="edit-profile-form-label">Description</label>
                <textarea
                  onChange={onChangeInput}
                  value={description}
                  name="description"
                  type="text"
                  className="edit-profile-form-input"
                  id="edit-profile-text-area"
                  placeholder={pet.data.description}
                />
                <button type="submit" className="edit-profile-form-save-button">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </main>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EditPetProfile;
