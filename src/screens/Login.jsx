import React, { useState } from 'react';
import Navebar from '../components/Navebar';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!credentials.email || !credentials.password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("https://jitway-server.onrender.com/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert(json.error || "Enter a valid entry");
      } else {
        localStorage.setItem("userEmail", credentials.email)

        localStorage.setItem("authToken",json.authToken)
        navigate('/');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <Navebar />
      <div className="container text-light">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter Email here!"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter Password here!"
            />
          </div>

          <button type="submit" className="btn btn-outline-success">Login</button>
          <Link to="/creatuser" className="m-3 btn btn-outline-info">New User!</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
