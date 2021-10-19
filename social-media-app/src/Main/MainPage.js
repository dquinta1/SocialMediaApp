import React, { useEffect, useState } from 'react'
import auth from '../Auth/utils/auth'
import { Button, Layout, Menu, Avatar, Space, List, Card, Image, Input, Modal, Typography} from 'antd';
import { 
    UserOutlined, 
    CameraOutlined, 
    EditOutlined, 
    CommentOutlined, 
    PlusOutlined,
    FileImageOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;
const { Meta } = Card;
const { Search, TextArea } = Input;
const { Text } = Typography;
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
                        <Space style={{position: 'absolute', top: '0%', left: '20%'}}>
                            <h1>Main</h1>
                        </Space>
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

    function NewPostModal() {
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [title, setTitle] = useState('New Post');
        const [description, setDescription] = useState('');

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleOk = () => {
            // TODO: implement functionality
            setIsModalVisible(false);
        };

        const handleCancel = () => {
            setIsModalVisible(false);
        };

        return(
            <>
            <Button className='new-post' size='large' type='dashed' icon={<PlusOutlined />} onClick={ showModal }
                    style={{color: 'gray', backgroundColor: 'transparent'}} block>
                New Post...
            </Button>
            <Modal title={ title } 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={[
                    <Button type='link' icon={<FileImageOutlined />} style={{position: 'absolute', left: '2%'}}/>,
                    <Button key="submit" type="primary" /*{loading={loading}}*/ onClick={handleOk}>
                        Submit
                    </Button>,
                    <Button key="back" onClick={ handleCancel }>
                        Cancel
                    </Button>
                ]}
            >
                <TextArea rows={1} placeholder='Title' onChange={ (e) => { setTitle(e.target.value) } }/>
                <TextArea rows={4} placeholder='Description...' onChange={ (e) => { setDescription(e.target.value) } }/>
            </Modal>
            </>
        );
    }

    function PostCard(title, description, src) {
        return (
            <Card hoverable style={{ width: '500px' }} 
            cover={<Image src={ src } placeholder={ <CameraOutlined /> }/>}
            actions={[
                <CommentOutlined key="comment" onClick={ () => {/*TODO: implement this*/} }/>,
                <EditOutlined key="edit" onClick={ () => {/*TODO: implement this*/} }/>,
            ]}>
                <Meta title={title} description={description} />
            </Card>
        );
    }

    function FollowerListItem(name, status, src) {

        const removeFollower = () => {
            //TODO: implement this
        }

        return (
            <Space size='small' align='center' style={{color: 'white'}}>
                <Avatar className='avatar' size={40} icon={<UserOutlined />} src={ src }/>
                <Space size={0} direction='vertical'>
                    <Text style={{fontSize: '12px', color: 'white', width:'90px'}} ellipsis={{rows: 1}}>
                        { name }
                    </Text>
                    <Text style={{width:'90px', color: 'white', fontSize: '8px', fontStyle: 'italic'}} ellipsis={{rows: 1}}>
                        { status }
                    </Text>
                </Space>
                <Button size='small' type='link' icon={<CloseCircleOutlined />} style={{color:'rgba(255, 50, 50, 0.8)' }} 
                    onClick={ removeFollower }
                />
            </Space>
        );
    }

    function AccountFragment() {

        const [isModalVisible, setIsModalVisible] = useState(false);
        const [status, setStatus] = useState('Headline');
        const [prevStatus, setPrevStatus] = useState(status);

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleOk = () => {
            setPrevStatus(status);
            setIsModalVisible(false);
        };

        const handleCancel = () => {
            setStatus(prevStatus);
            setIsModalVisible(false);
        };

        return (
            <Space direction='vertical' style={{ paddingTop: '8px' }}>
                <Space size={25}>
                    <Avatar className='avatar' id='avatar-profile' size={55} icon={<UserOutlined />} src={ loremPic } />
                    <Space align='center' size={0} direction='vertical' style={{ fontSize: '14px', color: '#fff' }}>
                        <p style={{ lineHeight: '0px' }} id='avatar-username'>Username</p>
                        <Button type='link' className='profile-btn' id='btn-profile' href='/profile' style={{ fontSize: '12px', top: '-5px' }}>
                            Profile
                        </Button>
                    </Space>
                </Space>
                <Space size={5} style={{ fontStyle: 'italic', fontSize: '13px', color: 'white', lineHeight: '-1px' }}>
                    <Text style={{width:'180px', color: 'white', fontSize: '13px', fontStyle: 'italic'}} ellipsis={{rows: 1}}>
                        { status }
                    </Text>
                    <Button type='text' style={{
                        position: 'absolute',
                        right: 0,
                        color: 'white',
                        fontSize: '10px'
                    }}
                    onClick={ showModal }>
                        Change
                    </Button>
                    <Modal title='Change Headline Status' 
                        visible={isModalVisible} 
                        onOk={handleOk} 
                        onCancel={handleCancel}
                        footer={[
                            <Button key="submit" type="primary" /*{loading={loading}}*/ onClick={handleOk}>
                                Change
                            </Button>,
                            <Button key="back" onClick={ handleCancel }>
                                Cancel
                            </Button>
                        ]}
                    >
                        <TextArea rows={1} placeholder='Headline Status' onChange={ (e) => { setStatus(e.target.value) } }/>
                    </Modal>
                </Space>
            </Space>
        );
    }
}

export default MainPage;