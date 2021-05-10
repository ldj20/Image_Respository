import React, { useState } from 'react';
import UserService from '../services/UserServices';
import { useHistory } from 'react-router-dom';
import ImageService from '../services/ImageServices';
import { arrayBufferToBlob, createObjectURL } from 'blob-util';

function Login (props) {
    const [loginInfo, setLoginInfo] = useState({
        username: "", 
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { value, name } = event.target;
        console.log(value)
        console.log(name)
        setLoginInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };
    
    const history = useHistory();

    const logUserIn = () => {
        console.log(loginInfo);
        if (!(loginInfo.username == "" || loginInfo.username == undefined || loginInfo.password == "" || loginInfo.password == undefined)) {
            UserService.login(loginInfo)
                .then (response => {
                    if (response.data.success == 1) {
                        console.log("heree")
                        history.push("/");
                    } else {
                        console.log("hereee")
                        setErrorMessage("Account not found");
                    };
                })
                .catch(err => {
                    console.log("hereeee")
                    setErrorMessage("Account not found");
                });
        }
    };

    return(
        <div className="page-form">
            <header>
                <h2>Login</h2>
            </header>
            <div className="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{errorMessage}</div>
            <div className="form-group preauth-select-style">
                <label for="username">Email</label>
                <input 
                    id="username"
                    type="email" 
                    className="form-control" 
                    name="username" 
                    placeholder="john.smith@gmail.com" 
                    required
                    value={loginInfo.username} 
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

            <button id="loginSubmit" type="submit" className="btn btn-info form-control preauth-loginbutton-style" onClick={logUserIn}>Login</button>
        </div>
    );
};

export default Login;