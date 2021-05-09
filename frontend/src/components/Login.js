import React, { useState } from 'react';
import UserService from '../services/UserServices';
import { useHistory } from 'react-router-dom';

function Login (props) {

    const [loginInfo, setLoginInfo] = useState({
        email: "", 
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { value, name } = event.target;
        setLoginInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };
    
    const history = useHistory();

    const logUserIn = () => {
        UserService.login(loginInfo)
            .then (response => {
                if(response.data.status === 1) {
                    console.log(response);
                    history.push("/");
                } else {
                    setErrorMessage(response.data.data);
                };
            })
            .catch(e => {
                console.log(e);
            });
    };

    return(
        <div className="page-form">
            <header>
                <h2>Login</h2>
            </header>
            <div id="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{errorMessage}</div>
            <div className="form-group preauth-select-style">
                <label for="username">Email</label>
                <input 
                    id="username"
                    type="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="john.smith@gmail.com" 
                    required
                    value={loginInfo.email} 
                    onChange={handleChange}         
                />
            </div>
            <div className="form-group preauth-select-style">    
                <label for="loginPW">Password</label>
                <input 
                    id="loginPW"
                    type="password" 
                    className="form-control"
                    name="password" 
                    placeholder="Password" 
                    required
                    value={loginInfo.password} 
                    onChange={handleChange} 
                />
            </div>

            <button type="submit" className="btn btn-info form-control preauth-loginbutton-style" onClick={logUserIn}>Login</button>
        </div>
    );
};

export default Login;