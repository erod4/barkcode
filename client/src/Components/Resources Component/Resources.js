import React, { useContext } from "react";
import SideBar from "../Home-components/SideBar";
import "./Resources.css";
import { authContext } from "../../Context/Auth/AuthContext";
import UserNotFound from "../UserNotFound/UserNotFound";
const Resources = () => {
  const { error } = useContext(authContext);
  return (
    <div className="resources-page" style={{ height: "100vh" }}>
      <SideBar />
      {error ? (
        <UserNotFound />
      ) : (
        <div className="resources-main-content">
          <h1>Coming Soon</h1>
          <p>
            Exciting resources are currently in development to enhance your
            experience!
          </p>
          <p>
            Stay tuned for a variety of helpful articles, tutorials, and tools
            to support your needs.
          </p>
        </div>
      )}
    </div>
  );
};

export default Resources;
