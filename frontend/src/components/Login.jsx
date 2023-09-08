import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:4000/users/signin", form);
      if (!response) {
        console.log(response.data)
      }
      console.log(response.data);

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
