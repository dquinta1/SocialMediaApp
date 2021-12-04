import { useState } from 'react';
import useStatusMessages from '../../../Hooks/Common/useStatusMessages';
import useUpdateComment from '../../../Hooks/Comments/useUpdateComment';
import { message } from 'antd';

export default function useLogic({ id, index, comment, clickToCancel }) {
	const [text, setText] = useState(comment.text);
	const [submitting, setSubmitting] = useState(false);
	const commentMutation = useUpdateComment();

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
		'Updating comment..',
		errMsg,
		'Comment Updated!'
	);

	const onSubmit = () => {
		if (text !== comment.text) {
			commentMutation.mutate(
				{ id, index, text },
				{
					onSuccess: () => {
						return clickToCancel();
					},
				}
			);
		} else {
			message.warning('Make changes to your comment before confirming');
		}
	};

	const onCancel = () => {
		setText(comment.text);
		setSubmitting(false);
		clickToCancel();
	};

	return {
		text,
		submitting,
		setText,
		onSubmit,
		onCancel,
	};
}
