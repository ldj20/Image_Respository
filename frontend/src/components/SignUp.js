import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserServices';

function SignUp() {

    const initialFormState= {
        email: "",
        password: ""
    };
    
    const [form, setForm] = useState({initialFormState});
    
    const [submitted, setSubmitted] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const saveData = event => {
        console.log('here')
        UserService.create(form)
            .then(response => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });

        event.preventDefault();
    };

    const newSignUp = () => {
        setForm(initialFormState);
        setSubmitted(false);
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