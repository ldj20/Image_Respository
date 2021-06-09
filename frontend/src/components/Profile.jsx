import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Display from './Display';
import queryString from 'query-string'

function Profile (props) {

    useEffect(() => {
      props.checkAuth()
    }, []);

    const history = useHistory();
    const { search } = useLocation()
    const uid = queryString.parse(search).uid
    return (
        props.authenticated ? 
        <div>
            <Display uid={uid} isLanding={false} otherProfile={true} />
        </div>
        :
        <div>{history.push("/")}</div>
    )
};

export default Profile
