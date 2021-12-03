import React from 'react';
import { Avatar, Upload, Button } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import useProfile from '../../Hooks/Profile/useProfile';
import useUploadAvatar from './useUploadAvatar';

const UploadAvatar = () => {
	const { data, status, error } = useProfile();

	const { config } = useUploadAvatar();

	switch (status) {
		case 'loading':
			return <div>Loading...</div>; // TODO: fix this
		case 'error':
			return <div>{error.message}</div>; // TODO: fix this
		case 'success':
			return (
				<>
					<Upload {...config}>
						<Button type='link' size={80}>
							<Avatar
								size={80}
								icon={<FileImageOutlined />}
								src={data.avatar}
							/>
						</Button>
					</Upload>
				</>
			);
		default:
			break;
	}
};

export default UploadAvatar;
