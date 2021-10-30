import React from 'react';
import ProfileForm from './Components/ProfileForm';
import UploadAvatar from './Components/UploadAvatar';
import FeedState from '../Main/Context/FeedState';
import { Layout, Space, Button } from 'antd';

const { Header, Content } = Layout;

const ProfilePage = () => {

    return (
        <FeedState>
            <Layout className="login-layout" style={{}}>

            <Header className="login-layout-background" style={{display: 'flex', justifyContent:'start'}}>
                <Space>
                    <Button type='link' href='/main'>
                        Back to Main
                    </Button>
                </Space>
            </Header>

            <Content style={{ margin: 'auto', paddingTop:'20px'}}>

                <Space size={50} direction='vertical'>
                    <UploadAvatar />
                    <ProfileForm />
                </Space>
                
            </Content>

            </Layout> 
        </FeedState>
    )
}

export default ProfilePage
