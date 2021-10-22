import React from 'react';
import { Redirect, Route } from 'react-router';

const ProtectedRoute = ({component: Component, ...rest}) => {
    var store = require('store');

    return (
        <Route {...rest} 
         render= { (props) => 
            (store.get('user')) 
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
