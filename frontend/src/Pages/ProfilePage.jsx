import React from 'react';
import ProfileForm from '../Components/Forms/ProfileForm';
import UploadAvatar from '../Components/Avatar/UploadAvatar';
import { Layout, Space, Button } from 'antd';

const { Header, Content } = Layout;

const ProfilePage = () => {
	return (
		<Layout className='login-layout' style={{}}>
			<Header
				className='login-layout-background'
				style={{ display: 'flex', justifyContent: 'start' }}
			>
				<Space>
					<Button type='link' href='/'>
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
