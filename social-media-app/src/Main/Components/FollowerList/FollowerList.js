import { List } from 'antd'
import FollowerListItem from './FollowerListItem';
import FeedContext from '../../Context/feed-context';
import { useContext, useEffect } from 'react';
import { requestPosts } from '../../../Common/APIUtils';

const FollowerList = () => {
    console.log('Follower List Rendered');

    // temporary fix for where there are no followers
    let noFollowers = true;

    // access follower state
    const { followers, removeFollower, updatePosts } = useContext(FeedContext);

    console.log('followers', followers);

    if(followers.length > 0) {
        noFollowers = false;
    } 

    // if no followers were pulled from cache then request to API
    useEffect( async () => {
        console.log('follower useEffect called');

        const newPosts = await requestPosts();
        updatePosts(newPosts);

    }, [followers]);

    console.log('followers', followers);

    return (
        <>
            { (noFollowers)
                ? <></>
                : followers.map( (follower) => (
                    <List.Item key={ follower.id } >
                        <FollowerListItem 
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

export default FollowerList;
