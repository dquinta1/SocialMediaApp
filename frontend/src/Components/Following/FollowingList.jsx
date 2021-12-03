import { List } from 'antd';
import FollowingListItem from './FollowingListItem';
import useFollowing from '../../Hooks/Following/useFollowing';
import useRemoveFollowing from '../../Hooks/Following/useRemoveFollowing';
import useStatusMessages from '../../Hooks/Common/useStatusMessages';

const FollowingList = () => {
	const { data, status, error } = useFollowing();
	const followingMutation = useRemoveFollowing();

	// detailed error messages
	const errMsg =
		followingMutation.status !== 'error'
			? ''
			: followingMutation.error.response.status === 404
			? 'This user does not exist'
			: followingMutation.error.response.status === 401
			? 'You do not follow this user'
			: followingMutation.error.response.status === 400
			? 'You are not following any users'
			: 'Internal Server Error, check your connection';

	// react to following list mutations
	useStatusMessages(followingMutation.status, 'Loading...', errMsg, 'Success!');

	switch (status) {
		case 'loading':
			return <div>Loading...</div>; // TODO: fix this
		case 'error':
			return <div>{error.message}</div>; // TODO: fix this
		case 'success':
			return (
				<>
					{data.map((following) => (
						<List.Item key={following._id}>
							<FollowingListItem
								name={following.username}
								status={following.headline}
								src={following.avatar}
								clickToRemove={() =>
									followingMutation.mutate(following.username)
								}
							/>
						</List.Item>
					))}
				</>
			);
		default:
			break;
	}
};

export default FollowingList;
