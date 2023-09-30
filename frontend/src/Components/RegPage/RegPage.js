import React from "react";
import { Link } from "react-router-dom";
import "./RegPage.css"; // Import your CSS file

const RegPage = () => {
  return (
    <div className="RegPage-page">
      <div className="registration-success">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/011/858/556/small/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png"
          alt="logo"
        />
        <h1>User Registered Successfully</h1>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default RegPage;
