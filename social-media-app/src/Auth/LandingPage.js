import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ProtectedRoute from './ProtectedRoute';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from 'react-router-dom';

import MockMain from './MockMain';

const LandingPage = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={ LoginForm } />
                <Route exact path='/signup' component={ SignUpForm } />
                <ProtectedRoute exact path='/main' component={ MockMain } />
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </Router>
    )
}

export default LandingPage
