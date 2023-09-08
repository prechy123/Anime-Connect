import React, { useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { siginAction } from "../redux/actions/authenticationAction";

function Login() {
  const dispatch = useDispatch()
  const qwerty = useSelector(state => state)
  console.log(qwerty)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(siginAction(form))
      //   .post("http://localhost:4000/users/signin", form)
      //   .then((response) => {
      //     console.log(response.message);
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
      }
      console.log(err.message);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"> Email Address: </label>
          <input
            type="email"
            id="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            className="input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="button">Log in</button>
      </form>
    </div>
  );
}

export default Login;
