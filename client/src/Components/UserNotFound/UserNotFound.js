import React from "react";
import "./UserNotFound.css";
const UserNotFound = () => {
  return (
    <div className="error-page">
      <h1 className="error-page-title">
        Invalid/Expired Token, Please Login Again
      </h1>
    </div>
  );
};

export default UserNotFound;
