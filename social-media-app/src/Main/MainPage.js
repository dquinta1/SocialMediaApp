import React from 'react'
import auth from '../Auth/utils/auth'
import { Button, Layout, Menu, Avatar} from 'antd';
import {
    AppstoreOutlined,
    UserOutlined,
    UploadOutlined,
  } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const MainPage = ({ history }) => {

    let logout = () => {
        auth.logout( () => {
            history.push('/');
        })
    }

    return (
        <>
            <Layout>
                <Sider style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                    <div className="logo">
                        <Avatar size={45} icon={<UserOutlined />} src='' />
                            Username
                        <Button type='link' className='profile-btn' id='btn-profile' href='/profile'>
                            Profile
                        </Button>
                            Catchphrase

                    </div>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="1">
                            <div className="follower" style={{display: 'inline-block'}}>
                                <Avatar size='24' icon={<UserOutlined />} />
                                Follower 1 
                            </div>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<AppstoreOutlined />}>
                            Follower 2 
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            Follower 3 
                        </Menu.Item>
                        <Menu.Item key='signout' className='sign-out' style={{ textAlign: 'center', position: 'absolute', marginLeft: -50, bottom: 5}}>
                            <Button type='primary' danger id='btn-logout' className="btn-logout" onClick= { logout }>
                                Sign Out
                            </Button>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="main-layout" style={{ marginLeft: 200 }}>
                    <Header className="main-layout-background" style={{ padding: 0 }}>
                        <h1>Main</h1>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="main-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                            Posts
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Something interesting at the end of the page</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default MainPage;