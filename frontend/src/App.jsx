import './App.css';
import LandingPage from './Pages/LandingPage';
import SignUpForm from './Components/Forms/SignUpForm';
import MainPage from './Pages/MainPage';
// import ProfilePage from './Pages/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<div className='App'>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Routes>
						<Route path='/login' element={<LandingPage />} />
						<Route path='/signup' element={<SignUpForm />} />

						{/* These should be protected routes */}
						<Route path='/' element={<MainPage />} />
						{/* <Route path='/profile' element={<ProfilePage />} /> */}
						<Route path='*' element={() => '404 NOT FOUND'} />
					</Routes>
				</Router>
			</QueryClientProvider>
		</div>
	);
}

export default App;
