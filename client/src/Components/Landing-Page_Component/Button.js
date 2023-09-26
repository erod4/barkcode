import React from "react";
import { Link } from "react-router-dom";
const Button = ({ text, width, height, link }) => {
  return (
    <>
      <Link
        to={link}
        style={{
          textDecoration: "none",
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "#7295f6",
          border: "none",
          borderRadius: "15px",
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {text}
      </Link>
    </>
  );
};

export default Button;
