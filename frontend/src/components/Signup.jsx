import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/users/signup",
        form
      );
      console.log(response.data.message);
      setForm({
        username: "",
        fullname: "",
        email: "",
        password: "",
      });
      navigate("/signin");
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
        <Link to={"/signin"} className=" underline">
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
