import { message } from 'antd';
import { useEffect, useState } from 'react';
import useAddComment from '../../../Hooks/Comments/useAddComment';
import useStatusMessages from '../../../Hooks/Common/useStatusMessages';

export default function useLogic(pid) {
	const [submitting, setSubmitting] = useState(false);
	const [text, setText] = useState('');
	const commentMutation = useAddComment();    

	useEffect(() => {
		setSubmitting(commentMutation.status === 'loading');
	}, [commentMutation.status]);

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
		'Posting comment..',
		errMsg,
		'Comment Posted!'
	);

	// logic to post comment on button click
	const onSubmit = () => {
		if (text !== '') {
			commentMutation.mutate(
				{ id: pid, text },
				{
					onSuccess: () => {
						setText('');
					},
				}
			);
		} else {
			message.warning('Write something first');
		}
	};

	return {
		submitting,
		text,
		setText,
		onSubmit,
	};
}
