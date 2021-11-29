import React from 'react';
import { Layout, Space } from 'antd';
import LoginForm from '../Components/Forms/LoginForm';

const { Header, Content } = Layout;

const LandingPage = ({ history }) => {
	return (
		<Layout
			theme='light'
			className='login-layout'
			style={{
				paddingTop: '50px',
				margin: 'auto',
				width: '400px',
				height: '500px',
			}}
		>
			<Header className='login-layout-background'>
				<Space>
					<h1>Login</h1>
				</Space>
			</Header>

			<Content
				style={{ margin: 'auto', overflow: 'initial', paddingTop: '30%' }}
			>
				<LoginForm history={history} />
			</Content>
		</Layout>
	);
};

export default LandingPage;
