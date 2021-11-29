import { Form, message } from 'antd';
import validationMessage from '../Helpers/validation-message';
import axios from '../Tools/axios';

export default function useRegister(history) {
	const [form] = Form.useForm();

	// TODO: if user is already authorized then redirect to main page
	// useEffect(() => {
	// 	if (auth.token) {
	// 		history.push('/');
	// 	}
	// }, []);

	const onFinish = async (values) => {
		// attempt to register new user
		try {
			await axios.post('/register', {
				username: values.username,
				headline: values.headline,
				email: values.email,
				dob: new Date(values.dateOfBirth).toLocaleDateString('en-US'),
				zipcode: values.zipcode,
				password: values.password,
			});
			validationMessage('Creating Account', 'Registered Successfully!', () =>
				history.push('/')
			);
		} catch (error) {
			switch (error.response.status) {
				case 401:
					message.error('This username is already in use');
					break;
				default:
					message.error(error.message);
					break;
			}
		}
	};

	return {
		form,
		onFinish,
	};
}
