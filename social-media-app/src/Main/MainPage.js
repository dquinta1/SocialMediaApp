import { Button, Layout, Space, List} from 'antd';
import AccountFragment from './Components/AccountFragment/AccountFragment';
import FollowerList from './Components/FollowerList/FollowerList';
import NewFollowerModal from './Components/FollowerList/NewFollowerModal';
import PostsList from './Components/PostList/PostsList';
import NewPostModal from './Components/PostList/NewPostModal';
import FeedState from './Context/FeedState';
import SearchFragment from './Components/Search/SearchFragment';
import { useContext } from 'react';
import AuthContext from '../Auth/Auth-Context/AuthContext';

const { Header, Sider, Content, Footer } = Layout;

const MainPage = () => {

    const { signOut } = useContext(AuthContext);

    const logout = () => {
        signOut();
    }

    return (
        <FeedState>
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

                        <FollowerList/>

                        <List.Item key={-1}>
                            <NewFollowerModal />
                        </List.Item>

                    </List>
                    <div style={{display:'inline-flex'}} >
                        <Button type='primary' danger id='btn-logout' className="btn-logout" 
                                onClick= { logout }
                                style={{flex: '1 1 auto'}}
                                >
                            Sign Out
                        </Button>
                    </div>
                </Sider>
                <Layout className="main-layout" style={{ marginLeft: 200 }}>

                    <Header className="main-layout-background" style={{ padding: 15 }}>
                        <SearchFragment />
                    </Header>

                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <Space direction='vertical' >
                            <NewPostModal />
                            <PostsList />
                        </Space>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Something interesting at the end of the page</Footer>
                </Layout>
            </Layout>
        </FeedState>
    )
}

export default MainPage;