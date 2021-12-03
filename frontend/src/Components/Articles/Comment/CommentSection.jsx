import React from 'react';
import { Avatar, Button, Collapse, Comment, List } from 'antd';
import { UserOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AddCommentSection from './AddCommentSection';
import { useQueryClient } from 'react-query';
import { profileKeys } from '../../../Hooks/Profile/profile-keys-factory';
import useRemoveComment from '../../../Hooks/Comments/useRemoveComment';
import useStatusMessages from '../../../Hooks/Common/useStatusMessages';

const { Panel } = Collapse;

const CommentSection = ({ pid, comments, activeKey }) => {
	const queryClient = useQueryClient();
	const username = queryClient.getQueryData(profileKeys.profile).username;
	const commentMutation = useRemoveComment();

	// detailed error messages
	const errMsg =
		commentMutation.status !== 'error'
			? ''
			: commentMutation.error.response.status === 400
			? 'Invalid Action'
			: 'Internal Server Error, check your connection';

	// react to comment mutations
	useStatusMessages(
		commentMutation.status,
		'Deleting comment..',
		errMsg,
		'Comment Deleted'
	);

	const clickToDelete = (comment) => {
		const index = comments.indexOf(comment);

		commentMutation.mutate({ id: pid, index });
	};

	const CommentList = () => (
		<List>
			{comments.map((comment) => (
				<li>
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
							>
								Edit <EditOutlined />
							</Button>,
							<Button
								size='small'
								type='text'
								disabled={comment.author !== username}
								onClick={() => {clickToDelete(comment)}}
							>
								Delete <DeleteOutlined />
							</Button>,
						]}
					/>
				</li>
			))}
		</List>
	);

	return (
		<>
			<Collapse
				activeKey={[activeKey]}
				ghost
				style={{ marginBottom: '-45px', marginTop: '-10px' }}
			>
				<Panel key='1' showArrow={false}>
					<h4
						style={{
							display: 'flex',
							justifyContent: 'start',
							fontWeight: 'bold',
						}}
					>
						Comments
					</h4>
					{comments.length > 0 && <CommentList />}
					<AddCommentSection pid={pid} />
				</Panel>
			</Collapse>
		</>
	);
};

export default CommentSection;
