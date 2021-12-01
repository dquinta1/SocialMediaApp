import { useState } from 'react';

export default function useDisAvatar() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [input, setInput] = useState('');

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		if (input !== '') {
			// TODO: implement useMutation to invalidate query on PATCH /profile/headline
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
