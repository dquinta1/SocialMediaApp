import { Form } from 'antd';
import { useQueryClient } from 'react-query';
import { profileKeys } from '../../../Hooks/Profile/profile-keys-factory';
import useUpdateProfile from '../../../Hooks/Profile/useUpdateProfile';
import useStatusMessages from '../../../Hooks/useStatusMessages';
import usePassword from '../../../Auth/usePassword';

export default function useLogic() {
	const [form] = Form.useForm();
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData(profileKeys.profile);
	const profileMutation = useUpdateProfile();
	const { updatePassword } = usePassword();

	// react to profile mutation status
	useStatusMessages(
		profileMutation.status,
		'Validating changes..',
		'Internal Server Error, please try again',
		'Profile Updated!'
	);

	// assign modified input values to edit profile and clear form
	const onFinish = () => {
		// create new user Profile based on input
		const newProfile = {
			username:
				form.getFieldValue('username') === '' ||
				typeof form.getFieldValue('username') === typeof undefined
					? data.username
					: form.getFieldValue('username'),
			headline:
				form.getFieldValue('headline') === '' ||
				typeof form.getFieldValue('headline') === typeof undefined
					? data.headline
					: form.getFieldValue('headline'),
			email:
				form.getFieldValue('email') === '' ||
				typeof form.getFieldValue('email') === typeof undefined
					? data.email
					: form.getFieldValue('email'),
			zipcode:
				form.getFieldValue('zipcode') === '' ||
				typeof form.getFieldValue('zipcode') === typeof undefined
					? data.zipcode
					: form.getFieldValue('zipcode'),
		};

		// send request with profile changes and invalidate profile queries
		profileMutation.mutate(newProfile);

		// check if a new password was provided
		if (
			form.getFieldValue('password') !== '' ||
			typeof form.getFieldValue('password') !== typeof undefined
		) {
			// request password update
			updatePassword(
				form.getFieldValue('oldPassword'),
				form.getFieldValue('password')
			);
		}

		// reset the form fields
		form.resetFields();
	};

	return {
		form,
		onFinish,
	};
}
