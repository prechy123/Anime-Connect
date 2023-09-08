import React from "react";

function Signup() {
  return (
    <form className="m-5 flex flex-col gap-2 w-40">
      <div>
        <label htmlFor="username"> Username: </label>
        <input type="text" id="username" className="input"/>
      </div>
      <div>
        <label htmlFor="fullname"> Full Name: </label>
        <input type="text" id="fullname" className="input"/>
      </div>
      <div>
        <label htmlFor="email"> Email Address: </label>
        <input type="text" id="email" className="input"/>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" className="input"/>
      </div>
      <button className="button">Sign up</button>
    </form>
  );
}

export default Signup;
