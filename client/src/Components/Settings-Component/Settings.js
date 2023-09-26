import React, { useContext, useEffect } from "react";
import SideBar from "../Home-components/SideBar";
import { authContext } from "../../Context/Auth/AuthContext";
import UserNotFound from "../UserNotFound/UserNotFound";
import "./Settings.css";
const Settings = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);

  //dispatch
  useEffect(() => {
    fetchProfileAction();
  }, []);
  return (
    <div className="settings-page">
      <SideBar name={"First Last"} />
      {error ? <UserNotFound /> : <div className="user-settings">Settings</div>}
    </div>
  );
};

export default Settings;
