import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Display from './Display';

function Landing (props) {

    useEffect(() => {
      props.checkAuth()
    }, []);

    return(
        <div className="homepage-header center-styling">
            {props.authenticated ? (
                <div>
                    <h1>Image Repository</h1>
                    <Display isLanding={true} />
                </div>
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