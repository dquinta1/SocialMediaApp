import { useState } from 'react';
import { useQueryClient } from 'react-query';
import useUpdateArticle from '../../../Hooks/Articles/useUpdateArticle';
import useStatusMessages from '../../../Hooks/Common/useStatusMessages';
import useUploadFile from '../../../Hooks/Common/useUploadFile';

const useLogic = ({ id, oldTitle, oldDescription, clickToCancel }) => {
	const [title, setTitle] = useState(oldTitle);
	const [description, setDescription] = useState(oldDescription);
	const [fileList, setFileList] = useState([]);
	const articleMutation = useUpdateArticle();
	const uploadMutation = useUploadFile();
	const queryClient = useQueryClient();

	// react to article mutations
	useStatusMessages(
		articleMutation.status,
		'Updating Article...',
		'Internal Server Error, check your connection',
		'Updated Successfully!'
	);

	// react to image upload mutations
	useStatusMessages(
		uploadMutation.status,
		'Uploading...',
		'Upload failed',
		'Uploaded Successfully!'
	);

	const handleUpload = async (id) => {
		if (fileList.length > 0) {
			const formData = new FormData();
			formData.append('title', 'image');
			formData.append('image', fileList[0]);

			// upload chosen image using mutation hook
			uploadMutation.mutate(
				{ url: '/articles/' + id + '/image', formData },
				{
					onSettled: () => {
						setFileList([]);
						clickToCancel();
					},
				}
			);
		} else {
			await queryClient.refetchQueries({ stale: true });
			clickToCancel();
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

	const handleOk = () => {
		if (
			title !== oldTitle ||
			description !== oldDescription ||
			fileList.length > 0
		) {
			// attempt to create and post new article
			articleMutation.mutate(
				{ id, title, description },
				{
					onSuccess: (response) => {
						setTitle(response.title);
						setDescription(response.description);
						// use mutation to upload image updating article created
						return handleUpload(response._id);
					},
				}
			);
		}
	};

	const handleCancel = () => {
		setTitle(oldTitle);
		setDescription(oldDescription);
		setFileList([]);
		clickToCancel();
	};

	return {
		title,
		description,
		config,
		setTitle,
		setDescription,
		handleOk,
		handleCancel,
	};
};

export default useLogic;
