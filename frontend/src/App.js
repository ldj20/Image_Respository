import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingRedirect from './components/LandingRedirect';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Images from './components/Images';
import Profile from './components/Profile';
import UserService from './services/UserServices';

function App() {
  const [authenticated, setAuthenticated] = useState("loading");
  const [images, setImages] = useState([])
  const [personalImg, setPersonalImg] = useState([])

  function checkAuth() {
    UserService.getAuth()
      .then(response => {
        setAuthenticated(response.data.authenticated);
      })
      .catch(err => {
        setAuthenticated(false)
      });
  }
      
  return (
    <div>
      <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      {authenticated === "loading" ?
      <Route path="/" exact={true} component={() => <LandingRedirect checkAuth={checkAuth}/>} /> :
      <Route path="/" exact={true} component={() => <Landing images={images} checkAuth={checkAuth} authenticated={authenticated} />} />}

      <Route path="/sign-up" component={() => <SignUp checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/login" component={() => <Login images={images} setImages={setImages} personalImg={personalImg} setPersonalImg={setPersonalImg} checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/images" component={() => <Images personalImg={personalImg} setPersonalImg={setPersonalImg} checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/profiles" component={() => <Profile checkAuth={checkAuth} authenticated={authenticated} />} />

    </div>
  );
}

export default App;
