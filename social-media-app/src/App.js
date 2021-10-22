import './App.css';
import Login from './Auth/Login';
import SignUpForm from './Auth/SignUpForm';
import MainPage from './Main/MainPage';
import ProfilePage from './Profile/ProfilePage';
import ProtectedRoute from './Auth/ProtectedRoute';
import AuthRedirect from './Auth/AuthRedirect';

import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={ Login } />
          <Route exact path='/login' component={ Login } />
          <Route exact path='/signup' component={ SignUpForm } />
          <ProtectedRoute exact path='/main' component={ MainPage } /> 
          <ProtectedRoute exact path='/profile' component={ ProfilePage } /> 
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
