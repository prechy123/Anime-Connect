import React from "react";
// import { useDispatch } from 'react-redux'
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function PrivateRoutes() {
  document.title = "Feed | AnimeConnect"
  // const dispatch = useDispatch()
    const profile = localStorage.getItem("profile");
    let userData
    let accessToken
    if (!profile) {
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
