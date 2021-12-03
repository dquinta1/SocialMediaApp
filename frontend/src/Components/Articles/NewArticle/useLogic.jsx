import { message } from 'antd';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import useCreateArticle from '../../../Hooks/Articles/useCreateArticle';
import useStatusMessages from '../../../Hooks/Common/useStatusMessages';
import useUploadFile from '../../../Hooks/Common/useUploadFile';

const useLogic = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [title, setTitle] = useState('New Post');
	const [description, setDescription] = useState('');
	const [fileList, setFileList] = useState([]);
	const articleMutation = useCreateArticle();
	const uploadMutation = useUploadFile();
	const queryClient = useQueryClient();

	// react to article mutations
	useStatusMessages(
		articleMutation.status,
		'Posting Article...',
		'Internal Server Error, check your connection',
		'Posted Successfully!'
	);

	// react to image upload mutations
	useStatusMessages(
		uploadMutation.status,
		'Uploading...',
		'Upload failed',
		'Uploaded Successfully!'
	);

	const handleUpload = (id) => {
		if (fileList.length > 0) {
			const formData = new FormData();
			formData.append('title', 'image');
			formData.append('image', fileList[0]);

			// upload chosen image using mutation hook
			uploadMutation.mutate(
				{ url: '/articles/' + id + '/image', formData },
				{
					onSettled: () => setFileList([]),
				}
			);
		} else {
			message.warning('Might want to choose an image to upload');
			queryClient.refetchQueries({ stale: true });
		}
	};

	const config = {
		accept: '.png,.jpg,.jpeg',
		maxCount: 1,
		onRemove: () => setFileList([]),
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		if (title !== '' && title !== 'New Article' && description !== '') {
			// attempt to create and post new article
			articleMutation.mutate(
				{ title, description },
				{
					onSuccess: (response) => {
						// use mutation to upload image updating article created
						return handleUpload(response._id);
					},
				}
			);
			setTitle('New Article');
			setDescription('');
		}
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setTitle('New Article');
		setDescription('');
		setFileList([]);
		setIsModalVisible(false);
	};

	return {
		isModalVisible,
		title,
		description,
		config,
		setTitle,
		setDescription,
		showModal,
		handleOk,
		handleCancel,
	};
};

export default useLogic;
