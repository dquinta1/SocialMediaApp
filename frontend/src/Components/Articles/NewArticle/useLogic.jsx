import { useState } from 'react';
import useCreateArticle from '../../../Hooks/Articles/useCreateArticle';

const useLogic = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [title, setTitle] = useState('New Post');
	const [description, setDescription] = useState('');

	const createArticle = useCreateArticle();

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		if (title !== '' && title !== 'New Article' && description !== '') {
			// format new article
			const newArticle = {
				title: title,
				description: description,
			};
			createArticle.mutate(newArticle);
			setTitle('New Article');
			setDescription('');
		}
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setTitle('New Article');
		setDescription('');
		setIsModalVisible(false);
	};

	return {
		isModalVisible,
		title,
		description,
		setTitle,
		setDescription,
		showModal,
		handleOk,
		handleCancel,
	};
};

export default useLogic;