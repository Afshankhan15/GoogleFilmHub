import React from "react";
import Navbar from "../Navbar/Navbar";
import Bgimage from "../Bg_Image/Bgimage";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      const notification = document.createElement("div");
      notification.innerHTML = `
      <div style="position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: orange; color: #FFF; padding: 1.5rem; border-radius: 12px; box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);">
        <h2 style="margin: 0; font-size: 24px;">🍿 Welcome to Our Movie Collection! 🎥</h2>
        <p style="margin: 0; font-size: 16px;">🔐 Login to Add Your Favorite Movies and Discover Exciting Features. 🚀</p>
      </div>
    `;
      document.body.appendChild(notification);

      setTimeout(() => {
        document.body.removeChild(notification);
      }, 6000); // Remove notification after 6 seconds
    }, 3000);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "4.2vmax" }}>
        <Bgimage />
      </div>
    </>
  );
};

export default Home;
