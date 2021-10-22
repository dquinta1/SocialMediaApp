import React from 'react';
import ProfileForm from './ProfileForm';
import { Layout, Space, Avatar, Upload, Button } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const ProfilePage = () => {
    return (
        <Layout theme='light' className="login-layout" style={{}}>

        <Header className="login-layout-background" style={{display: 'flex', justifyContent:'start'}}>
            <Space>
                <Button type='link' href='/main'>
                    Back to Main
                </Button>
            </Space>
        </Header>

        <Content style={{ margin: 'auto', paddingTop:'20px'}}>

            <Space size={50} direction='vertical'>
                <Upload accept={'.png,.jpg,.jpeg'} maxCount={1} onChange={() => {/*TODO: Implement this*/}}>
                    <Button type='link' size={80}>
                        <Avatar size={80} icon={<FileImageOutlined />} src='https://picsum.photos/600/600'/>
                    </Button>
                </Upload>
                <ProfileForm />
            </Space>
            
        </Content>

        </Layout> 
    )
}

export default ProfilePage
