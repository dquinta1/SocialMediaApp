import React from 'react';
import {Collapse, List } from 'antd';
import CommentItem from './CommentItem';
import AddCommentSection from './AddCommentSection';
import useRemoveComment from '../../../Hooks/Comments/useRemoveComment';
import useStatusMessages from '../../../Hooks/Common/useStatusMessages';

const { Panel } = Collapse;

const CommentSection = ({ pid, author, comments, activeKey }) => {
	
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

	const getIndex = (comment) => {
		return comments.indexOf(comment);
	}

	const CommentList = () => (
		<List>
			{comments.map((comment) => (
				<li>
					<CommentItem id={pid} author={author} comment={comment} clickToDelete={clickToDelete} getIndex={getIndex} />
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
