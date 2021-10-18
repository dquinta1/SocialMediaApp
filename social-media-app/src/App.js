import './App.css';
import LoginForm from './Auth/LoginForm';
import SignUpForm from './Auth/SignUpForm';
import MainPage from './Main/MainPage';
import ProfilePage from './Profile/ProfilePage';
import ProtectedRoute from './Auth/ProtectedRoute';

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
          <Route exact path='/' component={ LoginForm } />
          <Route exact path='/signup' component={ SignUpForm } />
          <Route exact path='/main' component={ MainPage } /> {/*Change Route to ProtectedRoute when done*/} 
          <Route exact path='/profile' component={ ProfilePage } /> {/*Change Route to ProtectedRoute when done*/} 
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
