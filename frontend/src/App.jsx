import './App.css';
import LandingPage from './Pages/LandingPage';
import SignUpForm from './Components/Forms/SignUpForm';
import MainPage from './Pages/MainPage';
import ProfilePage from './Pages/ProfilePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import ProtectedPage from './Pages/ProtectedPage';

const queryClient = new QueryClient();

function App() {
	return (
		<div className='App'>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Routes>
						<Route path='/login' element={<LandingPage />} />
						<Route path='/signup' element={<SignUpForm />} />
						<Route
							path='/'
							element={
								<ProtectedPage>
									<MainPage />
								</ProtectedPage>
							}
						/>
						<Route
							path='/profile'
							element={
								<ProtectedPage>
									<ProfilePage />
								</ProtectedPage>
							}
						/>
					</Routes>
				</Router>
			</QueryClientProvider>
		</div>
	);
}

export default App;
