import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";
import { authContext } from "../../Context/Auth/AuthContext";

const SideBar = ({ name }) => {
  const activePage = useLocation();
  const { fetchProfileAction, profile, logoutUserAction } =
    useContext(authContext);

  const [isOpen, setIsOpen] = useState(true);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  //dispatch
  useEffect(() => {
    fetchProfileAction();
  }, []);

  return (
    <>
      {isOpen ? (
        <>
          <aside className="side-bar">
            <div className="side-bar-close-button-container">
              <button onClick={toggleSideBar} className="side-bar-close-button">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <h1 className="user-full-name">Welcome {profile?.firstname}</h1>
            <div className="side-bar-menus">
              <div className="dahsboard-options">
                <div
                  id={activePage.pathname === "/home" ? "active" : ""}
                  className="menu-option"
                >
                  <Link className="nav-link" to={"/home"}>
                    <i className="icon fa-solid fa-house"></i>
                    Dashboard
                  </Link>
                </div>
                <div
                  id={activePage.pathname === "/manage-pets" ? "active" : ""}
                  className="menu-option"
                >
                  <Link className="nav-link" to={"/manage-pets"}>
                    <i className="icon fa-solid fa-paw"></i>
                    Manage Pets
                  </Link>
                </div>
                <div
                  id={activePage.pathname === "/resources" ? "active" : ""}
                  className="menu-option"
                >
                  <Link className="nav-link" to={"/resources"}>
                    <i className="icon fa-solid fa-book"></i>
                    Resources
                  </Link>
                </div>
              </div>
              <div className="user-options">
                <div className="user-option">
                  <Link onClick={logoutUserAction} className="nav-link">
                    <i className="icon fa-solid fa-right-from-bracket"></i>
                    Logout
                  </Link>
                </div>
                <div
                  id={activePage.pathname === "/settings" ? "active" : ""}
                  className="user-option"
                >
                  <Link className="nav-link" to={"/settings"}>
                    <i className="icon fa-solid fa-gear"></i>
                    Settings
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </>
      ) : (
        <aside className="closed-side-bar">
          <button className="open-sidebar-button" onClick={toggleSideBar}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </aside>
      )}
    </>
  );
};

export default SideBar;
