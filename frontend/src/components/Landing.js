import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Landing () {
    const [loggedIn, setLoggedIn] = useState(false);

    return(
        <div className="homepage-header">
            {loggedIn ? (
                <p>Here</p>
            ) :
            <div>
            <h1>Image Repository</h1>
            <Link to="/sign-up" className="btn btn-lg btn-outline-primary home-button">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-secondary home-button">Login</Link>
            </div>}
        </div>
    );
};

export default Landing