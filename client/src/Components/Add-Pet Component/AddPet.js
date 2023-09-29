import React, { useContext, useState } from "react";
import SideBar from "../Home-components/SideBar";
import "./AddPet.css";
import { petContext } from "../../Context/Pets/PetsContext";

const AddPet = ({ scanResult }) => {
  //qr code
  console.log(scanResult);
  const [profilePicture, setProfilePicture] = useState(null);

  const { postPetAction } = useContext(petContext);

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    dob: "",
    description: "",
    qrURL: scanResult,
    file: null,
    phone: "",
    email: "",
  });
  const { name, breed, dob, description, phone, email } = formData;

  const onChangeInput = (e) => {
    //set for data to previous data (...formData), then set the new data property name to e.target.name
    //which basically is the name of the field you're typing in and the value is the value being typed in e.traget.value

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFileInputChange = (e) => {
    console.log("new");
    const file = e.target.files[0];
    console.log(e.target);
    setProfilePicture(file);
    setFormData({ ...formData, file: profilePicture });
  };

  //submit handler
  const onSubmitHandler = (e) => {
    //prevent reload on submit
    e.preventDefault();
    console.log(formData);
    postPetAction(formData);
  };
  return (
    <div className="add-pet-page">
      <SideBar name={"First Last"} />
      <main className="add-pet-main-content">
        <div className="add-pet-form-container">
          <form onSubmit={onSubmitHandler} className="add-pet-form">
            <i className="pet-icon fa-solid fa-shield-dog"></i>
            <h1 className="add-pet-form-title">New Pet</h1>

            <div className="file-container">
              <label>
                Add Profile Photo
                <input
                  accept="image/jpg, image/png, image/jpeg"
                  name="file"
                  onChange={onFileInputChange}
                  onInput={onFileInputChange}
                  type="file"
                  required
                  id="file"
                />
              </label>
            </div>

            <label className="pet-form-labels">Name:</label>
            <input
              required
              onChange={onChangeInput}
              value={name}
              name="name"
              className="pet-form-input-1"
              type="text"
              placeholder="Enter Pet Name"
            />

            <div className="contact-info-container">
              <div className="phone-info-container">
                <label className="pet-form-labels">Phone:</label>
                <input
                  required
                  onChange={onChangeInput}
                  value={phone}
                  name="phone"
                  className="pet-form-input-1"
                  type="tel"
                  id="input"
                  placeholder="(999) 999-999"
                  maxLength="10"
                  pattern="[0-9]*"
                />
              </div>
              <div id="email">
                <label className="pet-form-labels">Email:</label>
                <input
                  required
                  onChange={onChangeInput}
                  value={email}
                  name="email"
                  className="pet-form-input-1 "
                  id="input"
                  type="text"
                  placeholder="JohnDoe@barkcode.com"
                />
              </div>
            </div>
            <div className="contact-info-container">
              <div className="phone-info-container">
                <label className="pet-form-labels">Breed:</label>
                <input
                  required
                  onChange={onChangeInput}
                  value={breed}
                  name="breed"
                  className="pet-form-input-1"
                  type="text"
                  id="input"
                  placeholder="Chihuahua"
                />
              </div>
              <div id="email">
                <label className="pet-form-labels">DOB:</label>
                <input
                  required
                  onChange={onChangeInput}
                  value={dob}
                  name="dob"
                  className="pet-form-input-1 "
                  id="input"
                  type="date"
                />
              </div>
            </div>
            <label name="dob" className="pet-form-labels">
              Description:
            </label>
            <textarea
              maxLength="50"
              required
              onChange={onChangeInput}
              value={description}
              name="description"
              className="pet-form-textarea"
            ></textarea>

            <button type="submit" className="pet-form-submit-button-1">
              Add Pet
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPet;
{
  /*  */
}
