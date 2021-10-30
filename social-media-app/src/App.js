import './App.css';
import AuthState from './Auth/Auth-Context/AuthState';
import Login from './Auth/Login/Login';
import SignUpForm from './Auth/Login/SignUpForm';
import MainPage from './Main/MainPage';
import ProfilePage from './Profile/ProfilePage';
import ProtectedRoute from './Auth/Routing/ProtectedRoute';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AuthState >
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
      </AuthState>
    </div>
  );
}

export default App;
