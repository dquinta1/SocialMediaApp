import { useState } from 'react';
import { Avatar, Button, Comment } from 'antd';
import { UserOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';
import { profileKeys } from '../../../Hooks/Profile/profile-keys-factory';
import EditComment from '../EditComment/EditComment';

export default function CommentItem({ id, author, comment, clickToDelete, getIndex }) {
	const [editing, setEditing] = useState(false);

	const queryClient = useQueryClient();
	const username = queryClient.getQueryData(profileKeys.profile).username;

    const index = getIndex(comment);

	const clickToCancel = () => {
		setEditing(!editing);
	};

	if (editing) {
		return <EditComment id={id} index={index} comment={comment} clickToCancel={clickToCancel}  />;
	}

	return (
		<Comment
			style={{ textAlign: 'start' }}
			key={comment._id}
			author={comment.author}
			avatar={<Avatar src={comment.avatar} icon={<UserOutlined />} />}
			content={comment.text}
			datetime={comment.date}
			actions={[
				<Button
					size='small'
					type='text'
					disabled={comment.author !== username}
					onClick={clickToCancel}
				>
					Edit <EditOutlined />
				</Button>,
				<Button
					size='small'
					type='text'
					disabled={author !== username}
					onClick={() => {
						clickToDelete(comment);
					}}
				>
					Delete <DeleteOutlined />
				</Button>,
			]}
		/>
	);
}
