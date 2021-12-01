import React from 'react';
import ProfileForm from '../Components/Forms/Profile/ProfileForm';
import UploadAvatar from '../Components/Avatar/UploadAvatar';
import { Layout, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const ProfilePage = () => {

	const navigate = useNavigate();

	return (
		<Layout className='login-layout' style={{}}>
			<Header
				className='login-layout-background'
				style={{ display: 'flex', justifyContent: 'start' }}
			>
				<Space>
					<Button type='link' onClick={() => navigate('/')}>
						Back to Dashboard
					</Button>
				</Space>
			</Header>
			<Content style={{ margin: 'auto', paddingTop: '20px' }}>
				<Space size={50} direction='vertical'>
					<UploadAvatar />
					<ProfileForm />
				</Space>
			</Content>
		</Layout>
	);
};

export default ProfilePage;
