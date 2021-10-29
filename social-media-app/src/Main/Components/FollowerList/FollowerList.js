import { List } from 'antd'
import FollowerListItem from './FollowerListItem';
import FeedContext from '../../Context/feed-context';
import { useContext, useEffect } from 'react';
import { requestPosts } from '../../../Common/APIUtils';
import AuthContext from '../../../Auth/Auth-Context/AuthContext';

const FollowerList = () => {
    console.log('Follower List Rendered');

    // temporary fix for where there are no followers
    let noFollowers = true;

    // access auth'd user state
    const { auth } = useContext(AuthContext);

    // access follower state
    const { followers, removeFollower, updatePosts } = useContext(FeedContext);

    console.log('followers', followers);

    if(followers.length > 0) {
        noFollowers = false;
    } 

    // if followers change update posts accordingly
    useEffect( async () => {
        console.log('follower useEffect called');

        // TODO: this is cheating, fix in next phase
        // update followers before FeedState does so posts are filtered accordingly
        var store = require('store');
        store.set('followers', followers);

        const newPosts = await requestPosts(auth.id);
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
