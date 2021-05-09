import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingRedirect from './components/LandingRedirect';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Images from './components/Images';
import Logout from './components/Logout';
import UserService from './services/UserServices';

function App() {
  const [authenticated, setAuthenticated] = useState("loading");

  function checkAuth() {
    UserService.getAuth()
      .then(response => {
        console.log(response)
        setAuthenticated(response.data.authenticated);
      })
      .catch((error) => {
        setAuthenticated(false)
      });
  }
      
  return (
    <div>
      <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      {authenticated === "loading" ?
      <Route path="/" exact={true} component={() => <LandingRedirect checkAuth={checkAuth}/>} /> :
      <Route path="/" exact={true} component={() => <Landing checkAuth={checkAuth} authenticated={authenticated} />} />}

      <Route path="/sign-up" component={() => <SignUp checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/login" component={() => <Login checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/images" component={() => <Images checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="logout" component={Logout} />

    </div>
  );
}

export default App;
