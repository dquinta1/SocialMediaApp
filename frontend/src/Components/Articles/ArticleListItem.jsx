import { Card, Image, Space, Typography } from 'antd';
import {
	EditOutlined,
	CommentOutlined,
} from '@ant-design/icons';
import CommentSection from './CommentSection';
import { useState } from 'react';

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
	clickToEdit,
	clickToComment,
}) {
	const [expanded, setExpanded] = useState(false);
	const [activeKey, setActiveKey] = useState('');

	const clickToExpand = () => {
		if (expanded) {
			setActiveKey('');
			setExpanded(false);
		} else {
			setActiveKey('1');
			setExpanded(true);
		}
	};

	return (
		<Card
			hoverable
			style={{ width: '500px' }}
			cover={<Image src={src} />}
			actions={[
				<CommentOutlined key='comment' onClick={clickToExpand} />,
				<EditOutlined
					key='edit'
					onClick={() => {
						/*TODO: implement this*/
					}}
				/>,
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

			<CommentSection activeKey={activeKey} comments={comments} />
		</Card>
	);
}

export default ArticleListItem;
