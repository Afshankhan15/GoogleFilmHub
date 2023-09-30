import "./Dash.css";
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const Dash = () => {

  const [user, setUser] = useState({
    moviename: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [result, setResult] = useState([]);

  const location = useLocation(); // Use useLocation hook to access the current location

  // Extract googleId & profilePicture from query parameters
  const searchParams = new URLSearchParams(location.search);
  const googleId = searchParams.get("googleId");
  const profilePicture = searchParams.get("profilePicture");

  // if user is logged In (if googleID exists)then show user's PP otherwise alt src image
  const profileImage = googleId ? profilePicture : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png";

  // function to get All added User
  const getMovie = useCallback(async () => {
    var Id = googleId;
    try {
      const response = await axios.get("http://localhost:4000/getMovie", {
        params: { googleId: Id }, // Send googleId as a query parameter
      });

      if (response.data.message === "User valid") { // if Fetch Movie successfully then --> it is executed else other than that CATCH block executed
        setResult(response.data.MovieData);
        alert("Fetch Movie successfully");
      } 
    } catch (error) { 
      // alert("client error in fetching Movies");
      alert("Fetch Error: " + error.response.data.message); // like --> Fetch Error: Movie not found, Fetch Error: Server error
    }
  }, [googleId]);

  useEffect(() => {
    // You can now access the googleId here and perform any necessary actions
    // console.log("Google ID:", googleId);
    // console.log("Profile Picture:", profilePicture);
    if (googleId) {
      getMovie();
    }
  }, [googleId, profilePicture, getMovie]); // Add googleId as a dependency to the useEffect

  // function to ADD Movies
  const addMoviebtn = async () => {
    // const Id = googleId;
    const Id = googleId; // Assuming googleId is defined somewhere in your code.

    if (!Id) {
      // IF ID is not  available
      return alert("Please Login to Add Movies");
    }

    const data = { googleId: Id, moviename: user.moviename, image: user.image };

    if (!user.moviename || !user.image) {
      alert("please write Movie name and Image URL");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/addMovie", data);

      if (response.data.message === "Movie successfully created") { // only runs when status === 201
        alert("Movie added Successfully");
        getMovie();
      }  
    } catch (error) { // runs when status other than === 201
      // status(400) will go to catch block with axios so handle the status(400) in catch of client
      alert("Error: " + error.response.data.message); // Display the error message like : Error: Movie already exists
    }
  };

  // BUTTON --> to Delete Movie
  const deleteMovie = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmation) {
      // User canceled the deletion
      return;
    }
    var Id = googleId;

    try {
      const response = await axios.post(
        "http://localhost:4000/deleteMovie",
        { id },
        { params: { googleId: Id } }
      );
      if (response.data.message === "Movie deleted successfully") {
        setResult(response.data.MovieData);
        alert("Movie deleted successfully");
      } 
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  // BUTTON -->  To Update Movie
  const updateMovie = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to update movie name?"
    );

    if (!confirmation) {
      // User canceled the updation
      return;
    }
    const { moviename } = user;
    var G_Id = googleId;

    if (!moviename) {
      alert("Please write movie name to update");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/movieUpdate/${id}?googleId=${G_Id}`, // Include the id and googleId in the URL and query params
        { moviename } // Include only the new selected movie name in request body
      );

      if (response.data.message === "Movie updated successfully") {
        // Update the Movie's information
        setResult(response.data.MovieData); // Update with the updated Movie data
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  // Function to Logout USER
  const LogoutBtn = async () => {
    var Id = googleId;
    if (!Id) {
      return alert("Please Login, You are not Logged In");
    }
    try {
      // Make a request to the server to log the user out
      const response = await axios.get("http://localhost:4000/logout");

      if (response.data.message === "You are Logged Out Successfully") {
        alert("You are Logged Out Successfully");
        window.location.href = "/login"; // redirect to login page after logout user
      }
    } catch (error) {
      // alert("Error: " + error.response.data.message);
      alert("client error during logout");
    }
  };

  const handleMouseEnter = () => {
   const confirmLogout = window.confirm("Wants to Logout?"); // Display the confirm message when hovering
    if(confirmLogout) {
      LogoutBtn(); // call logout function
    }
  };

  return (
    <>
      <Navbar />
      <div className="dash-page">
        {console.log("USER: ", result)}
        <div className="dash-container">
          <div className="input-wrap">
            <h1> Add Movie</h1>
            <input
              className="inputval1"
              type="text"
              name="moviename"
              value={user.moviename}
              placeholder="Movie Name *"
              onChange={handleChange}
              required
            />
            <input
              className="inputval1"
              type="url"
              name="image"
              value={user.image}
              placeholder="Image Url *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="btn-wrap1">
            <button className="btn1" onClick={addMoviebtn}>
              Add Movie
            </button>
            {/* Display the user's profile picture */}
            <img
              src= {profileImage}
              alt = "logo"
              className="profile-picture"
              onMouseEnter={handleMouseEnter} //when user hover then it confirms Logout message
            />
          </div>
        </div>
        <div className="main">
          {result.length > 0 ? (
            result.map((element) => (
              <div key={element._id} className="movies">
                <img src={element.image} alt={element.moviename} />

                <div className="wrapicon">
                  <div className="h3-wrap">
                    <h3>Title: {element.moviename}</h3>
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => deleteMovie(element._id)}>
                      <DeleteIcon />
                    </button>
                    <button
                      onClick={() => updateMovie(element._id)}
                      style={{ color: "orange" }}
                    >
                      <EditOutlinedIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // if --> No user data available
            <img
              src="https://cdn.dribbble.com/userupload/6187550/file/original-9251cb68d93c4e0d7f16ae790d9f5c09.png"
              alt="Movie Icon"
              className="movie-img-nodata"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dash;
