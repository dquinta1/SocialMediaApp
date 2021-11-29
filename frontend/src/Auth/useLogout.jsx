import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import validationMessage from '../Helpers/validation-message';
import axios from '../Tools/axios';

export default function useLogout() {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await axios.put('/logout');
			validationMessage('Logging Out', 'Logged Out Successfully', () =>
				navigate('/login')
			);
		} catch (error) {
			message.error(error.message);
		}
	};

	return { logout };
}
