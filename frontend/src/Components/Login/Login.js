import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Login.css";

const Login = () => {
  const handleSignInClick = () => {
    // Redirect the user to the Google OAuth page when they click on the button
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAY1BMVEX///8AAADo6Oja2to0NDSTk5NwcHCrq6tmZmb6+vrz8/Pf39/r6+vV1dXk5ORBQUGIiIh5eXnHx8cMDAxVVVVMTEy+vr6kpKS4uLhaWlqdnZ0VFRUnJydgYGBGRkaAgIAeHh40JyS9AAAEvUlEQVRoge2a6XqjOgyGwRDAC4tJWAJJ4P6vcgjBtjzQMaaQc37wTadPqxq9IAvJJjjOqVOnTp069b8Qq/L/gJrU3HXd4stUWvOr+9E3qSX3BXZQ/B1qUnav1tXUHA7FLO9uH9gDku/HYkme3T+gtmhiFkH0gdj8Ml2r+2pyPJoyQD5oovPLSxA6iKiOnGicNymMauvBv5bS/tyVSuKm6CfHCl/CIbHMcbwb1avu/ujyeuty5rCbRFdwHBIpvstEE1pFH2qf8jz5GHEg0RdtcLFg3CKMqsCXDG1SO2nmMLTTKUW/wqKQ9zCdXJ/BPzfSfiPQfhltxNmoJOST2ysPJeKqTZ9K5RacEinTzRNNa0F9dOHbJ1IBr+FAT5XrDwiVmYhSZ00t+ZSeKa+QmEBylwitRoBTKlGe+fJMXrxccP6jkpynqtVpOQJSOYN2cEqyZaRBmKy/nd9NpwANdp43qioHmluuHeNHtWeRW0PTmQpDX1RxrdxQOErlWSF9k/iiWlT/DGOr0kVFOSqafHSpSqB+A+cqsGgc14DGeA/tkxmP2RiC9SIDeaOdozRf6+qpqM9qY628zfLGKaRXLZWZ1qdGRY0WFzt9JjDSpkilsnZfaug2uni/a0nxx9ENQeNFxXLyTrzwmYoU6J+ZTQ7/IDJNq6/FTaVyShyS1JG83EdxidlPzuwkkuWq7UpUKvtcUls/y9FPfuylLk9LZU9byL4vNit3pL6l7hYtlUmlUevfz+tMBGRs8DENTUfVE/8Q6qgAXNydDE1HxTntDqO+FQKy68t1SMFrttsaclmJO1dR5ZQwhn6hFWTiz8mP/jo3Wumx5qK52Y+9/DXksVY2oZQ4+CItlUj1bD6qU6Z2EzlQvwunYB8sFgwvZRJrz1SZ4k1kN1QG0SbB1kXceqCfikkC/azbRG7V6geJ9FJdhCyYRGaCqptuIcOnSSLehbqhRQt5LJhUtYk3kWHZFmsssDVbiLdYkQZzX3ZkV8WbzPejWGQu6KYL8S42kcFokbkguCKSvQqu7HNzkx3ZEElhAvsPsaMEN2C4iQyDO48kFo9mwMZOmMA9+dxE9hfSVMXbmyytagey3YAc2UR2uTKLSC5Ut5sy1XNTvonsRoHUP0xPZRIl5i4tfBt5L53kk3yST7Kmdsup7UKOHGzP3ok89KSnYdBh5KEDzR8NfYns4KY1DDyK7DjMYge2L3lYlawO+d7kYVG6MuT7k+EnGN8mr5vuQ8jDurQwHHIYeViF9oaDDiNrz7K+SUbGYnoMGWeGI44ih4bxR5Hzhcdn3yCjyDD4IDJZv0LYl1yvC/Tu5BWFy5ZsagEjmZhKxxZyaXASvdcjdtyVb3ZQg5MbLv/+OMWsVS85YJMXi8SSWvdmnOUUrtFj3adpudmTrQIzdZT9NJq09jPa3S+am5mTdp7p3uIdh5fZnYVsPoVHdrumf8vqbRIH3cwe16m1A69b4qxRkViCB3m2e+QFPWozZ0lJZdUJ/1af/eptYkK9bdrp7YNTp04pEUqZRymiJEkSipLhHx5+Y97Ob8DMxRLHIyxmDFFKaIyGLzz8R8ff6SQZr5aR4WoTiocIDD+whNHjawzGDh6/O860NMDg+6kv6g+3wUEZdvbvqAAAAABJRU5ErkJggg==" // Replace with your movie-themed icon
            alt="Movie Icon"
          />
          <h1 className="login-heading">Welcome to the login page</h1>
          <button className="google-sign-in-button" onClick={handleSignInClick}>
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
              alt="Google Logo"
              className="google-logo"
            />
            Sign In with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
