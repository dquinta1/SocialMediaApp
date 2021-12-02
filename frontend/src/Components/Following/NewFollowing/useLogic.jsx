import { useState } from 'react';
import { message } from 'antd';
import useAddFollowing from '../../../Hooks/Following/useAddFollowing';
import useStatusMessages from '../../../Hooks/useStatusMessages';

export default function useLogic() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [name, setName] = useState('');
	const followingMutation = useAddFollowing();

	// detailed error messages
	const errMsg =
		followingMutation.status !== 'error'
			? ''
			: followingMutation.error.response.status === 404
			? 'This user does not exist'
			: followingMutation.error.response.status === 400
			? 'You already follow this user'
			: 'Internal Server Error, check your connection';

	// react to following list mutations
	useStatusMessages(followingMutation.status, 'Loading..', errMsg, 'Success!');

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		if (name !== '') {
			followingMutation.mutate(name);
		} else {
			message.warning('Input was empty', 5);
		}

		setName('');
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setName('');
		setIsModalVisible(false);
	};

	return {
		name,
		isModalVisible,
		setName,
		showModal,
		handleOk,
		handleCancel,
	};
}
