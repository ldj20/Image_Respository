import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserService from '../services/UserServices';

function Logout (props) {

    useEffect(() => {
        UserService.logout()
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const history = useHistory();
    
    return(
        <div>{history.push("/")}</div>
    );
};

export default Logout