import React from "react";
// import { useDispatch } from 'react-redux'
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoutes() {
  // const dispatch = useDispatch()
  // const navigate = useNavigate();
    const profile = localStorage.getItem("profile");
    let userData
    let accessToken
    if (!profile) {
      // navigate("/signin")
      console.log("Create account")
    } else {
      console.log(profile.accessToken)
      userData = JSON.parse(profile).user
      accessToken = JSON.parse(profile).accessToken
    }
  

  return (
    <div>
      <Navbar userData={userData} accessToken={accessToken} />
      <Outlet />
    </div>
  );
}

export default PrivateRoutes;
