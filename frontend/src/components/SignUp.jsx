import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserServices';

function SignUp(props) {

    useEffect(() => {
        props.checkAuth()
      }, []);
    
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    
    const [submitted, setSubmitted] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const saveData = event => {
        if (form.email == undefined || form.password == undefined || form.email.length <= 5 || form.password.length <= 5) {
            setErrorMessage("Email and password should be longer than 5 characters")
            return
        }
        UserService.create(form)
            .then(response => {
                setSubmitted(true);
            })
            .catch(e => {
                setErrorMessage("Error signing up or email already in use, please try again later")
            });
    };
    
    return (
        <div>
          {submitted ? (
            <header className="notification">
              <h4>You signed up successfully!</h4>
              <Link to ="/login" className="btn btn-info">
                Login
              </Link>
            </header>
          ) : (
            <div className="page-form">
            
                <header>
                    <h2>Sign Up</h2>
                </header>
                <div className="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{errorMessage}</div>
                <div className="form-group preauth-select-style">
                    <label htmlFor="email">Email</label>
                    <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    />
                </div>

                <div className="form-group preauth-select-style">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        name="password"
                    />
                </div>
        
                <button type="submit" className="btn btn-info form-control preauth-button-style" onClick={saveData}>
                    Submit
                </button>

            </div>
            )}
        </div>
      );
};

export default SignUp