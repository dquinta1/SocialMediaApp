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
import PostListWrapper from './Components/PostListWrapper';
import { loadPosts as loadGlobalPosts } from '../DB/utils/store-utils';
import MockDB from '../DB/MockDB';
import { filterPosts } from '../DB/utils/store-utils';

const { Header, Sider, Content, Footer } = Layout;
const { Search } = Input;

const MainPage = ({ history }) => {

    const { user, followers, posts } = useHookState(store);

    const [change, setChange] = useState(false);

    useEffect(() => {
        setChange(false);
    }, [change]);

    // const db = MockDB();
    // let posts_data = db.posts.data;
    // let id_data = db.iDs.data;

    // useEffect(() => {
    //     var store = require('store');
    //     let user = store.get('user');
    //     let followers = store.get('followers');
    //     let ids = [user['id']];

    //     for (let index = 0; index < followers.length; index++) {
    //         const element = followers[index];
    //         ids.push(element['id'])
    //     }

    //     loadGlobalPosts(ids, posts, posts_data, id_data);
    // }, []);

    const onSearch = (value) => { // TODO: this filters properly but does not rerender
        filterPosts(value);
        setChange(true);
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
                        <AccountFragment/>
                    </div>
                    <List itemLayout='vertical' split={false}>

                        <FollowerListWrapper/>

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
                        <Space align='end' style={{display:'flex', justifyContent:'end'}}>
                            <Search placeholder="search posts..." onSearch={onSearch} style={{ width: 200 }} />
                        </Space>
                    </Header>

                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <Space direction='vertical' >
                            <PostListWrapper />
                        </Space>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Something interesting at the end of the page</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default MainPage;