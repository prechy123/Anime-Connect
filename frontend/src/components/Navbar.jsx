import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/authenticationAction";

function Navbar({ userData, accessToken }) {

  const dispatch = useDispatch();
  // const location = useLocation()
  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogout = async () => {
    setLoggingOut(true);
    await dispatch(logoutAction(accessToken));
    setLoggingOut(false);
  };
  return (
    <nav className=" sticky top-0 z-10 flex justify-between p-5 border border-b-4 backdrop-blur-lg">
      <div>
        <Link to="/">
          <h1>LOGO</h1>
        </Link>
      </div>
      <div className="flex justify-between gap-3">
        <img src={userData.profilepictureurl} alt="profile" width={50} />
        <div>
          <Link to="/profile">{userData.name}</Link>
          <p>{userData.username}</p>
        </div>
        <div>
          <button onClick={handleLogout}>
            {loggingOut ? (
              <div>Loading...</div>
            ) : (
              <div>
                <span>Logout</span>
                {/* <IoLogOutOutline /> */}
              </div>
            )}
          </button>
        </div> 
      </div>
    </nav>
  );
}

export default Navbar;
