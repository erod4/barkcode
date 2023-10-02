import React from "react";
import Button from "./Button";

const Main = () => {
  return (
    <div className="main-content-cotainer">
      <main className="main-content">
        <h1 className="title">Tired of lost pets?</h1>
        <h1 className="title">We can help.</h1>
        <p className="call-to-action">Lost and Found Made Simple:</p>
        <div className="features">
          <ul className="features-ul">
            <li className="feature-li">
              <i className="fa-solid fa-circle-check"></i>Customizable Profile
            </li>
            <li className="feature">
              <i className="fa-solid fa-circle-check"></i>Get Notified When Your
              pet is Found
            </li>
            <li className="feature">
              <i className="fa-solid fa-circle-check"></i>Send Lost Pet Alerts
            </li>
          </ul>
        </div>
        <div className="button-container">
          <Button link={"/login"} text={"Login"} width={250} height={50} />
          <Button
            link={"/register"}
            text={"Register"}
            width={250}
            height={50}
          />
        </div>
        <div className="explore-features-container">
          <p className="trusted">Trusted by many worldwide!</p>
          <div>
            <p className="explore-features-text">Explore our features</p>
            <a href="/" className="explore-features-button">
              <i className="fa-solid fa-circle-chevron-down"></i>
            </a>
          </div>
        </div>
        {/* "BarkCode: Pet Profiles Unleashed" */}
      </main>
    </div>
  );
};

export default Main;
