import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../redux/actions/authenticationAction";

function Signup() {
  document.title = "Signup | AnimeConnect"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.auth);
    console.log(success);

  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpAction(form, navigate));
      // setForm({
      //   username: "",
      //   fullname: "",
      //   email: "",
      //   password: "",
      // });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
      console.log(err);
    }
  };
  return (
    <div>
      <h2>
        Have an account, then{" "}
        <Link to={"/"} className=" underline">
          Log in
        </Link>
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"> Email Address: </label>
          <input
            type="email"
            id="email"
            value={form.email}
            className="input"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="fullname"> Full Name: </label>
          <input
            type="text"
            id="fullname"
            value={form.fullname}
            className="input"
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="username"> Username: </label>
          <input
            type="text"
            id="username"
            value={form.username}
            className="input"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={form.password}
            className="input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="button">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;

//signup
