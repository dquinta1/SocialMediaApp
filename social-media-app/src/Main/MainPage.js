import React from 'react'
import auth from '../Auth/utils/auth'
import { Button, Layout, Menu, Avatar, Space, List, Card, Image} from 'antd';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
const { Meta } = Card;
const loremTitle = 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit';
const loremDescription = "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto";
const loremPic = 'https://picsum.photos/200/200';

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
                        {AccountFragment()}
                    </div>
                    <Menu theme="dark" mode="inline">
                        {FollowerMenuItem('1', 'Follower Name', '')}
                        {FollowerMenuItem('2', 'Follower Name', '')}
                        {FollowerMenuItem('3', 'Follower Name', '')}
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
                        <Space >
                            <List itemLayout='vertical'>
                                <List.Item>
                                    { PostCard(loremTitle, loremDescription, loremPic) }
                                </List.Item>
                                <List.Item>
                                    { PostCard(loremTitle, loremDescription, loremPic) }
                                </List.Item>
                                <List.Item>
                                    { PostCard(loremTitle, loremDescription, loremPic) }
                                </List.Item>
                                <List.Item>
                                    { PostCard(loremTitle, loremDescription, loremPic) }
                                </List.Item>
                            </List>
                        </Space>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Something interesting at the end of the page</Footer>
                </Layout>
            </Layout>
        </>
    )

    function PostCard(title, description, src) {
        return <Card hoverable style={{ width: '500px' }} cover={<Image src={ src } placeholder={ <CameraOutlined /> }/>}>
            <Meta title={title} description={description} />
        </Card>;
    }

    function FollowerMenuItem(key, name, src) {
        return <Menu.Item key={ key }>
            <Space size='middle' align='center'>
                <Avatar className='avatar' size='24' icon={<UserOutlined />} src={ src } />
                { name }
            </Space>
        </Menu.Item>;
    }

    function AccountFragment() {
        return <Space direction='vertical' style={{ paddingTop: '8px' }}>
            <Space size={25}>
                <Avatar className='avatar' id='avatar-profile' size={55} icon={<UserOutlined />} src='' />
                <Space align='center' size={0} direction='vertical' style={{ fontSize: '14px', color: '#fff' }}>
                    <p style={{ lineHeight: '0px' }} id='avatar-username'>Username</p>
                    <Button type='link' className='profile-btn' id='btn-profile' href='/profile' style={{ fontSize: '12px', top: '-5px' }}>
                        Profile
                    </Button>
                </Space>
            </Space>
            <Space size={5} style={{ fontStyle: 'italic', fontSize: '13px', color: 'white', lineHeight: '-1px' }}>
                <p id='status'>"Catchphrase"</p>
                <Button type='text' style={{
                    position: 'absolute',
                    right: 0,
                    color: 'white',
                    fontSize: '10px'
                }}
                onClick={() => { /*TODO*/ } }>
                    Change
                </Button>
            </Space>
        </Space>;
    }
}

export default MainPage;