import React, { useEffect } from 'react';

function HomeRedirect (props) {

    useEffect(() => {
        props.checkAuth()
      }, []);

    return(
        <div>
        </div>
    );
};

export default HomeRedirect;