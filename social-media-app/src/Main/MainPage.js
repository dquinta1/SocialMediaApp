import store from '../DB/store';
import React, { useEffect, useState } from 'react'
import { useState as useHookState } from '@hookstate/core';
import auth from '../Auth/utils/auth'
import AccountFragment from './Components/AccountFragment';
import NewPostModal from './Components/NewPostModal';
import NewUserModal from './Components/NewUserModal';
import { Button, Layout, Space, List, Input} from 'antd';
import loadFollowers from './utils/loadFollowers';
import loadPosts from './utils/loadPosts';
import { clearStore, removeFollower } from '../DB/utils/store-utils';
import FollowerListWrapper from './Components/FollowerListWrapper';

const { Header, Sider, Content, Footer } = Layout;
const { Search } = Input;

const MainPage = ({ history }) => {

    const { user, followers, posts } = useHookState(store);

    // const [idToRemove, setToRemove] = useState('');

    // useEffect(() => {
    //     removeFollower(idToRemove, followers);
    //     setToRemove('');
    // }, [idToRemove]);

    const onSearch = (value) => {
        // TODO: implement this
        console.log(value);
        removeFollower(1, followers);
    }

    const logout = () => {
        auth.logout( () => {
            clearStore( user, followers, posts );
            history.replace('/');
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

                        {/* <FollowerListWrapper /> */}
                        { FollowerListWrapper(followers) }

                        <List.Item key='new-user-modal'>
                            <NewUserModal />
                        </List.Item>

                    </List>
                    <Button type='primary' danger id='btn-logout' className="btn-logout" 
                            onClick= { logout }
                            style={{left: '50px'}}
                            >
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
                                { loadPosts(posts) }
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