import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../Auth-Context/AuthContext';

const ProtectedRoute = ({component: Component, ...rest}) => {
    
    const { auth } = useContext(AuthContext);

    return (
        <Route {...rest} 
         render= { (props) => 
            (auth.token) 
                ? <Component {...props} /> 
                : <Redirect to={{
                    path: '/',
                    state: { from: props.location }
                    }}
                />     
            }
         />
    )
}

export default ProtectedRoute;
