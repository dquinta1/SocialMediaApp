import { Button, Layout, Space, List } from 'antd';
import useLogout from '../Auth/useLogout';
// import DisplayAvatar from '../Components/Avatar/DisplayAvatar';
// import FollowingList from '../Components/Following/FollowingList';
// import NewFollowingModal from '../Components/Following/NewFollowingModal';
import ArticlesList from '../Components/Articles/ArticlesList';
import NewArticleModal from '../Components/Articles/NewArticle/NewArticleModal';
// import SearchFragment from '../Components/Search/SearchFragment';

const { Header, Sider, Content, Footer } = Layout;

const MainPage = () => {
	const { logout } = useLogout();

	return (
		<Layout>
			<Sider
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
				}}
			>
				<div className='logo'>{/* <DisplayAvatar /> */}</div>
				<List itemLayout='vertical' split={false}>
					{/* <FollowingList />

						<List.Item key={-1}>
							<NewFollowingModal />
						</List.Item> */}
				</List>
				<div style={{ display: 'inline-flex' }}>
					<Button
						type='primary'
						danger
						id='btn-logout'
						className='btn-logout'
						onClick={logout}
						style={{ flex: '1 1 auto' }}
					>
						Sign Out
					</Button>
				</div>
			</Sider>
			<Layout className='main-layout' style={{ marginLeft: 200 }}>
				<Header className='main-layout-background' style={{ padding: 15 }}>
					{/* <SearchFragment /> */}
				</Header>

				<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
					<Space direction='vertical'>
						<NewArticleModal />
						<ArticlesList />
					</Space>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Something interesting at the end of the page
				</Footer>
			</Layout>
		</Layout>
	);
};

export default MainPage;
