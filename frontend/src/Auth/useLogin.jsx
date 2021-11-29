import { useState } from 'react';
import { message } from 'antd';
import axios from '../Tools/axios';
import validationMessage from '../Helpers/validation-message';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const clickToLogin = async () => {
		// only perfom login logic if there is some input
		if (username !== '' && password !== '') {
			try {
				await axios.post('/login', { username, password });
				validationMessage('Logging In', 'Logged In Successfully', () =>
					navigate('/')
				);
			} catch (error) {
				switch (error.response.status) {
					case 401:
						message.error('Invalid credentials');
						break;
					default:
						message.error(error.message);
						break;
				}
			}
		}
	};

	const goToSignUp = () => {
		navigate('/signup');
	};

	// TODO: if user is already authorized then redirect to main page
	// useEffect(() => {
	// 	if (auth.token) {
	// 		history.push('/');
	// 	}
	// }, []);

	return {
		username,
		password,
		setUsername,
		setPassword,
		clickToLogin,
		goToSignUp,
	};
};

export default useLogin;
