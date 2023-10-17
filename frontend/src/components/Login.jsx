import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { siginAction } from "../redux/actions/authenticationAction";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  document.title = "Login | AnimeConnect"
  const [error1, setError1] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const message = useSelector(state => state?.auth)
  const signInError = message.signInError
  useEffect(() => {
    if (signInError == null) {
      setError1("")
    } else {
      setError1(signInError)
    }
  }, [signInError])
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(siginAction(form, navigate))
  };
  const signInDemo = () => {
    const email = "testuser1@gmail.com"
    const password = "test123"
    setForm({email, password})
  }

  return (
    <div>
      <h2>Don't have an account <Link to={"/signup"} className=" underline">Sign up</Link></h2>
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
      <Link onClick={signInDemo} class=" underline ml-2">Get Demo-account Login details</Link>
      <div>
          {error1 && (
            <p>{error1}</p>
          )}
      </div>
    </div>
  );
}

export default Login;

//login