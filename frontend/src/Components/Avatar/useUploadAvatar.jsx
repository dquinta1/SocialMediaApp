import { message } from 'antd';
import { useState } from 'react';
import useStatusMessages from '../../Hooks/Common/useStatusMessages';
import useUploadFile from '../../Hooks/Common/useUploadFile';

export default function useUploadAvatar() {
	const [fileList, setFileList] = useState([]);
	const uploadMutation = useUploadFile();

	// react to image upload mutations
	useStatusMessages(
		uploadMutation.status,
		'Uploading...',
		'Upload Failed',
		'Uploaded Successfully!'
	);

	const handleUpload = () => {
		if (fileList.length > 0) {
			const formData = new FormData();
			formData.append('title', 'image');
			formData.append('image', fileList[0]);

			// upload chosen image using mutation hook
			uploadMutation.mutate(
				{ url: '/profile/avatar', formData },
				{
					onSettled: () => setFileList([]),
				}
			);
		} else {
			message.warning('Choose an image to upload');
		}
	};

	const config = {
		accept: '.png,.jpg,.jpeg',
		maxCount: 1,
		showUploadList: false,
		onRemove: () => setFileList([]),
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
		},
		customRequest: handleUpload,
		fileList,
	};

	return {
		config,
	};
}
