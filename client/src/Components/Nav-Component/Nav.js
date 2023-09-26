import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/Auth/AuthContext";
import UserNotFound from "../UserNotFound/UserNotFound";
const Nav = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);

  //dispatch
  useEffect(() => {
    fetchProfileAction();
  }, []);
  console.log(profile.firstname);
  return (
    <nav>
      <Link>Home</Link>
    </nav>
  );
};

export default Nav;
