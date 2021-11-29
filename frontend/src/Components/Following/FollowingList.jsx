import { List } from 'antd'
import FollowingListItem from './FollowingListItem';

const FollowingList = () => {
    return (
        <>
            { (noFollowers)
                ? <></>
                : followers.map( (follower) => (
                    <List.Item key={ follower.id } >
                        <FollowingListItem 
                            name={ follower.name }
                            status={ follower.headline }
                            src={ follower.src }
                            clickToRemove={ () => removeFollower(follower.id) }
                        />
                    </List.Item>
            ) ) }
        </>
    )
}

export default FollowingList;
