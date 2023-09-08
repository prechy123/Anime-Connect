import React from "react";

function Login() {
  return (
    <div>
      <form className="m-5 flex flex-col gap-2 w-40">
        <div>
          <label htmlFor="email"> Email Address: </label>
          <input
            type="text"
            id="email"
            className="input"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            id="password"
            className="input"
          />
        </div>
        <button className="button">Log in</button>
      </form>
    </div>
  );
}

export default Login;
