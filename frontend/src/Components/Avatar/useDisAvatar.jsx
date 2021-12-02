import { useState } from 'react';
import useUpdateProfile from '../../Hooks/Profile/useUpdateProfile';
import useStatusMessages from '../../Hooks/useStatusMessages';

export default function useDisAvatar() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [input, setInput] = useState('');
	const profileMutation = useUpdateProfile();

	// react to mutation status
	useStatusMessages(
		profileMutation.status,
		'Validating changes..',
		'Internal Server Error, please try again',
		'Headline Updated!'
	);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		if (input !== '') {
			profileMutation.mutate({ headline: input });
		}
		setInput('');
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setInput('');
		setIsModalVisible(false);
	};

	return {
		isModalVisible,
		input,
		setInput,
		showModal,
		handleOk,
		handleCancel,
	};
}
