import React, { useEffect, useState } from 'react'
import auth from '../Auth/utils/auth'
import AccountFragment from './Components/AccountFragment';
import FollowerListItem from './Components/FollowerListItem';
import PostCard from './Components/PostCard';
import NewPostModal from './Components/NewPostModal';
import { Button, Layout, Space, List, Card, Input} from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const { Search } = Input;
const loremTitle = 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit';
const loremDescription = "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto";
const loremPic = 'https://picsum.photos/200/200';

const MainPage = ({ history }) => {

    const onSearch = (value) => {
        // TODO: implement this
        console.log(value);
    }

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
                    <List itemLayout='vertical' split={false}>
                        <List.Item>
                            { FollowerListItem('Follower Name', 'Headline', loremPic) }
                        </List.Item>
                        <List.Item>
                            { FollowerListItem('Follower Name', 'Headline', loremPic) }
                        </List.Item>
                        <List.Item>
                            { FollowerListItem('Follower Name', 'Headline', loremPic) }
                        </List.Item>
                    </List>
                    <Button type='primary' danger id='btn-logout' className="btn-logout" 
                            onClick= { logout }
                            style={{ textAlign: 'center', position: 'absolute', marginLeft: -50, bottom: 15}}>
                        Sign Out
                    </Button>
                </Sider>
                <Layout className="main-layout" style={{ marginLeft: 200 }}>
                    <Header className="main-layout-background" style={{ padding: 15 }}>
                        <Space align='end' style={{position: 'absolute', right: '10px'}}>
                            <Search placeholder="search posts..." onSearch={onSearch} style={{ width: 200 }} />
                        </Space>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <Space direction='vertical' >
                            <NewPostModal />
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
}

export default MainPage;