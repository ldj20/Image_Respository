import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FileInput from './FileInput';

function Images (props) {

    useEffect(() => {
      props.checkAuth()
    }, []);

    const history = useHistory();

    return (
        props.authenticated ? 
        <div>
            <FileInput/>
        </div>
        :
        <div>{history.push("/")}</div>
    )
};

export default Images
