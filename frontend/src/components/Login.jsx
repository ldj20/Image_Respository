import React, { useState } from 'react';
import UserService from '../services/UserServices';
import { useHistory } from 'react-router-dom';
import ImageService from '../services/ImageServices';
import { arrayBufferToBlob, createObjectURL } from 'blob-util';

function Login (props) {

/*    function convert(images) {
        const converted = []
        for (var i = 0; i < images.length; i++) {
            const unit8 = new Uint8Array(images[i].data);
            const blob = arrayBufferToBlob(unit8);
            const blobURL = createObjectURL(blob);
            converted.push(blobURL)
        }
        return converted
    }


    async function decideImages() {
            ImageService.getImages()
                .then(response => {
                    const results = response.data.results
                    //const extensions = response.data.extensions
                    const res=convert(results)
                    var landing = ""
                    for (var j = 0; j < res.length; j++) {
                        landing += `${res[j]}|`
                    }
                    localStorage.setItem("landingURL", landing.substring(0,landing.length-2));
                })
                .catch(err => {
                    console.log(err)
                })
            UserService.getImages()
                .then(response => {
                    const results = response.data.results
                    //const extensions = response.data.extensions
                    const res=convert(results)
                    var personal = ""
                    for (var j = 0; j < res.length; j++) {
                        personal += `${res[j]}|`
                    }
                    var sub = personal
                    if (sub.length > 2) {
                        sub = personal.substring(0,personal.length-2)
                    }
                    localStorage.setItem("personalURL", personal);
                })
                .catch(err => {
                    console.log(err)
                })
    }
*/
    const [loginInfo, setLoginInfo] = useState({
        username: "", 
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
        if (!(loginInfo.username == "" || loginInfo.username == undefined || loginInfo.password == "" || loginInfo.password == undefined)) {
            UserService.login(loginInfo)
                .then (response => {
                    if (response.data.success == 1) {
                        console.log("heree")
                        /*decideImages()
                            .then(response => {
                                localStorage.removeItem("personalURL");
                                localStorage.removeItem("landingURL");*/
                                history.push("/");
                            /*})
                            .catch(err => {
                                setErrorMessage("Unexpected error, please try again later")
                            })*/
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

            <button type="submit" className="btn btn-info form-control preauth-loginbutton-style" onClick={logUserIn}>Login</button>
        </div>
    );
};

export default Login;