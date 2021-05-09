import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserService from '../services/UserServices';

function Navbar(props) {
    const [collapsed, setCollapsed] = useState(true);
    
    const classOne = collapsed ?  'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler';   


    function toggleNavbar() {
        setCollapsed(!collapsed);
    }

    const history = useHistory();

    function logOut() {
        UserService.logout()
            .then(response => {
                console.log(response)
                props.setAuthenticated(false)
                localStorage.removeItem("landingURL");
                localStorage.removeItem("personalURL");
                history.push("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Image Repository</Link>
            <button id="example" onClick={toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarResponsive" aria-expanded={collapsed} aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>

            <div className={`${classOne}`} id="navbarSupportedContent">
              {props.authenticated ?
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/images" className="nav-link">Images</Link>
                  </li>
                  <li className="nav-item">
                  <span className="nav-link" onClick={logOut}>Logout</span>
                  </li>
                </ul> :
                <ul className="navbar-nav ml-auto">  
                  <li className="nav-item">
                    <Link to="/sign-up" className="nav-link">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </ul>
              }
            </div>
          </nav>
        </div>
    );
}

export default Navbar;