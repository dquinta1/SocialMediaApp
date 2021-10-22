import React from 'react'
import { Redirect, Route } from 'react-router';

const AuthRedirect = ({component: Component, ...rest}) => {
    var store = require('store');

    // console.log('protected route', store.get('user'));

    return (
        <Route {...rest} 
         render= { (props) => 
            (store.get('user'))  
                ? <Redirect to={{
                    path: '/main',
                    state: { from: props.location }
                    }}
                />
                : <Redirect to={{
                    path: '/',
                    state: { from: props.location }
                    }}
                />     
            }
         />
    )
}

export default AuthRedirect
