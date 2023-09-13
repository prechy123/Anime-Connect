import React from "react";
import UserProfile from "../components/profile/UserProfile";

function Profile() {
  const profile = localStorage.getItem("profile");
  const userData = JSON.parse(profile).user;
  return (
    <div>
      <UserProfile userData={userData} />
    </div>
  );
}

export default Profile;
