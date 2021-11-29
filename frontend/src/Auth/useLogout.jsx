import { message } from 'antd';
import validationMessage from '../Helpers/validation-message';
import axios from '../Tools/axios';

export default function useLogout(history) {
	const logout = async () => {
		try {
			await axios.put('/logout');
			validationMessage('Logging Out', 'Logged Out Successfully', () =>
				history.push('/login')
			);
		} catch (error) {
			message.error(error.message);
		}
	};

	return { logout };
}
