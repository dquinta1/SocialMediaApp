import { useState } from 'react';
import { Button, Card, Image, Space, Typography } from 'antd';
import { EditOutlined, CommentOutlined } from '@ant-design/icons';
import CommentSection from './Comment/CommentSection';
import EditArticleCard from './EditArticle/EditArticleCard';
import { useQueryClient } from 'react-query';
import { profileKeys } from '../../Hooks/Profile/profile-keys-factory';

const { Meta } = Card;
const { Text } = Typography;

function ArticleListItem({
	id,
	title,
	description,
	author,
	timestamp,
	comments,
	src,
}) {
	const [expanded, setExpanded] = useState(false);
	const [activeKey, setActiveKey] = useState('');
	const [editing, setEditing] = useState(false);

	const queryClient = useQueryClient();
	const username = queryClient.getQueryData(profileKeys.profile).username;

	const toggleEditing = () => {
		setEditing(!editing);
	};

	const clickToExpand = () => {
		if (expanded) {
			setActiveKey('');
			setExpanded(false);
		} else {
			setActiveKey('1');
			setExpanded(true);
		}
	};

	if (editing) {
		return (
			<EditArticleCard
				id={id}
				oldTitle={title}
				oldDescription={description}
				src={src}
				clickToCancel={toggleEditing}
			/>
		);
	}

	return (
		<Card
			hoverable
			style={{ width: '500px' }}
			cover={<Image src={src} />}
			actions={[
				<Button type='text' onClick={clickToExpand}>
					<CommentOutlined key='comment' />
				</Button>,
				<Button
					type='text'
					disabled={author !== username}
					onClick={toggleEditing}
				>
					<EditOutlined key='edit' />
				</Button>,
			]}
		>
			<Meta title={title} description={description} />
			<Space direction='vertical' size='large'></Space>
			<Space
				style={{
					paddingTop: '15px',
					paddingBottom: '15px',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Text>{author}</Text>
				<Text>{new Date(timestamp).toLocaleDateString('en-US')}</Text>
			</Space>

			<CommentSection
				author={author}
				pid={id}
				activeKey={activeKey}
				comments={comments}
			/>
		</Card>
	);
}

export default ArticleListItem;
