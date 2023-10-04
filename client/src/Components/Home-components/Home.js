import React, { useContext, useEffect } from "react";
import SideBar from "./SideBar";
import "./Home.css";
import { authContext } from "../../Context/Auth/AuthContext";
import UserNotFound from "../UserNotFound/UserNotFound";
import Notifications from "../notifications/Notifications";
import Alerts from "../Alerts-Component/AlertsComponent";
import { Link } from "react-router-dom";

const Home = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);

  //dispatch
  useEffect(() => {
    fetchProfileAction();
  }, []);

  return (
    <div className="home-page">
      <SideBar />
      {error ? (
        <UserNotFound />
      ) : (
        <div className="home-content">
          <header className="home-heading">
            <h1 className="home-title">Dashboard</h1>
          </header>
          <main className="home-main-conent">
            <div className="home-notifications">
              <h1 className="content-title">
                Notifications
                <i className="notification-icon fa-solid fa-envelope"></i>
              </h1>

              <Notifications notifications={profile?.notifications} />
            </div>
            <div className="home-active-alerts">
              <h1 className="content-title">
                Alerts<i className="home-alert-icon fa-solid fa-bell"></i>
              </h1>
              <div className="add-alert-link-container">
                <Link
                  className="add-alert-link add-pet-link"
                  to="/create-alert"
                >
                  <i className="plus-icon fa-solid fa-plus"></i>
                  <p className="pet-link-text">New Alert</p>
                </Link>
              </div>
              <Alerts alerts={profile?.alerts} />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Home;
