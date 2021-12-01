import { useState } from "react";
import { message } from "antd";

export default function useLogic() {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [name, setName] = useState('');

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		if (name !== '') {
			// TODO: get new following
			// const newFollower = {
			// 	name: name,
			// 	id: Math.random(),
			// 	headline: headline,
			// 	src: 'https://picsum.photos/200/200',
			// };
			// try {
			// 	await addFollower(newFollower.name);
			// 	message.success('New user is being followed!', 5);
			// } catch (error) {
			// 	message.error(error.message, 5);
			// }
		} else {
			message.warning('Input is empty', 5);
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
