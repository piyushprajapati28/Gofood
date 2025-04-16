import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const onChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3300/api/creatuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter a valid entry");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container text-light">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={credentials.name}
                        onChange={onChange}
                        placeholder="Enter Name here!"
                    />
                </div>

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

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="geolocation"
                        value={credentials.geolocation}
                        onChange={onChange}
                        placeholder="Enter Address here!"
                    />
                </div>

                <button type="submit" className="btn btn-outline-success">Submit</button>
                <Link to="/login" className="m-3 btn btn-outline-danger">Already a user</Link>
            </form>
        </div>
    );
};

export default SignUp;
