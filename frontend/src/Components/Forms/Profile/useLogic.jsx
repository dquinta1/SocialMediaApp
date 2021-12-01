import { Form } from 'antd';
import { useQueryClient } from 'react-query';
import { profileKeys } from '../../../Hooks/Profile/profile-keys-factory';

export default function useLogic() {
	const [form] = Form.useForm();
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData(profileKeys.profile);

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
					: form.getFieldValue('zipcode')
		};

		// TODO: assign values and change state
		// editProfile(newProfile);

		// reset the form fields
		form.resetFields();
	};

	const formItemLayout = {
		labelCol: {
			xs: {
				span: 14,
			},
			sm: {
				span: 8,
			},
		},
		wrapperCol: {
			xs: {
				span: 14,
			},
			sm: {
				span: 8,
			},
		},
	};

	return {
		form,
		onFinish,
	};
}
