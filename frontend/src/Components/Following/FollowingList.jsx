import { List } from 'antd';
import FollowingListItem from './FollowingListItem';
import useFollowing from '../../Hooks/Following/useFollowing';

const FollowingList = () => {
    const { data, status, error } = useFollowing();

    switch (status) {
        case 'loading':
            return <div>Loading...</div>
        case 'error':
            return <div>{error.message}</div>
        case 'success':
            return (
                <>
                    {data.map((following) => (
                        <List.Item key={following._id}>
                            <FollowingListItem
                                name={following.username}
                                status={following.headline}
                                src={following.avatar}
                                // clickToRemove={() => removeFollowing(following.id)}
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
