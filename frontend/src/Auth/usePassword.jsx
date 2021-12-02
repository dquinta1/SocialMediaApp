import { message } from 'antd';
import validationMessage from '../Helpers/validation-message';
import axios from '../Tools/axios';

export default function usePassword() {
	const updatePassword = async (oldPwd, newPwd) => {
		// only perfom login logic if both inputs are provided
		if (
			((oldPwd !== '' || typeof oldPwd !== typeof undefined) &&
				newPwd !== '') ||
			typeof newPwd !== typeof undefined
		) {
			try {
				await axios.put('/password', {
					oldPassword: oldPwd,
					newPassword: newPwd,
				});
				validationMessage('Updating password', 'Password Updated!', () => {});
			} catch (error) {
				switch (error.response.status) {
					case 401:
						message.error('Invalid Old Password');
						break;
					default:
						message.error('Internal Server Error, please try again later');
						break;
				}
			}
		}
	};

	return {
		updatePassword,
	};
}
