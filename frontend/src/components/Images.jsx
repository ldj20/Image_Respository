import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FileInput from './FileInput';

function Landing (props) {

    useEffect(() => {
      props.checkAuth()
    }, []);

    const history = useHistory();

    const formData = new FormData();
    return (
        props.authenticated ? 
        <div>
            <FileInput />
        </div>
        :
        <div>{history.push("/")}</div>
    )
};

export default Landing
