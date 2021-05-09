import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Landing from './components/Landing';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Route path="/" exact={true} component={Landing} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
