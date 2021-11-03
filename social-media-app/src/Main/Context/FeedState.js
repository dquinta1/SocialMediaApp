import React, { useReducer, useEffect, useContext } from 'react';
import AuthContext from '../../Auth/Auth-Context/AuthContext';
import FeedContext from './feed-context';
import feedReducer from './feed-reducer';
import { requestFollower, requestFollowers, requestPosts, requestUser } from '../../Common/APIUtils';
import { 
    ADD_FOLLOWER, 
    REMOVE_FOLLOWER,
    ADD_POSTS,
    REMOVE_POST,
    FILTER_POSTS,
    EDIT_POST,
    ADD_COMMENT,
    EDIT_HEADLINE,
    EDIT_AVATAR, 
    UPDATE_FOLLOWERS,
    UPDATE_POSTS,
    UPDATE_USER,
    EDIT_PROFILE
} from './feed-actions';

const FeedState = (props) => {
    // using local storage
    var store = require('store');

    console.log('FeedState Here');

    // Initialize state containing list of followers and posts, pull user info from cache or DB
    const initialState = {
        // { username:'', name:'', id:'', headline:'', src:'' }
        user: (typeof(store.get('user')) !== typeof(undefined))  
            ? store.get('user') 
            : undefined,

        // { id: '10', name: 'John Doe', headline: 'status', src: 'img.png' }
        followers: (typeof(store.get('followers')) !== typeof(undefined))  
            ? store.get('followers') 
            : [],

        // { title:'', description:'', author:'', timestamp:'', src:'', comments: ['','',''] }
        posts: (typeof(store.get('posts')) !== typeof(undefined))  
            ? store.get('posts') 
            : [],
    };

    // configure state management
    const [state, dispatch] = useReducer(feedReducer, initialState);

    // get auth'd data from context
    const { auth } = useContext(AuthContext);

    console.log('state', state);

    // Add a new Follower
    const addFollower = async (followerName) => {

        const follower = await requestFollower(followerName);

        dispatch({
            type: ADD_FOLLOWER,
            payload: follower,
        });
    };

    // Remove a Follower
    const removeFollower = (followerID) => {
        dispatch({
            type: REMOVE_FOLLOWER,
            payload: followerID,
        });
    };

    // Update list of Followers
    const updateFollowers = (followers) => {
        dispatch({
            type: UPDATE_FOLLOWERS,
            payload: followers,
        });
    };

    // Update list of Posts
    const updatePosts = (posts) => {
        dispatch({
            type: UPDATE_POSTS,
            payload: posts,
        });
    };

    // Add new Posts
    const addPosts = (posts) => {
        dispatch({
            type: ADD_POSTS,
            payload: posts,
        });
    }

    // Remove a Post
    const removePost = (postID) => {
        dispatch({
            type: REMOVE_POST,
            payload: postID,
        });
    }

    // Filter Posts by user Search input
    const filterPosts = (criteria) => {
        dispatch({
            type: FILTER_POSTS,
            payload: criteria,
        });
        console.log('filtered', state.posts);
    }

    // Edit Post
    const editPost = (postID, post) => {
        dispatch({
            type: EDIT_POST,
            payload: [postID, post],
        });
    }

    // Add Comment to a Post
    const addComment = (postID, comment) => {
        dispatch({
            type: ADD_COMMENT,
            payload: [postID, comment],
        });
    }

    // Update auth'd user
    const updateUser = (user) => {
        dispatch({
            type: UPDATE_USER,
            payload: user,
        });
    };

    // Edit User's headline
    const editHeadline = (headline) => {
        dispatch({
            type: EDIT_HEADLINE,
            payload: headline,
        });
    }

    // Edit Avatar's source when new pic uploaded
    const editAvatar = (src) => {
        dispatch({
            action: EDIT_AVATAR,
            payload: src,
        });
    };

    // Edit Avatar's source when new pic uploaded
    const editProfile = (profile) => {
        dispatch({
            action: EDIT_PROFILE,
            payload: profile,
        });
        console.log('editProfile dispatched');
    };

    // resolve promises to initialize state (GET from backend)
    useEffect( async () => {

        console.log('Feed useEffect, state: ', state);

        if (typeof(state.user) === typeof(undefined)) {
            const loadedUser = await requestUser(auth.id);
            updateUser(loadedUser);
        }
        if (state.followers.length === 0) {
            const loadedFollowers = await requestFollowers(auth.id);
            updateFollowers(loadedFollowers);
        }
        if (state.posts.length === 0) {            
            const loadedPosts = await requestPosts(auth.id);
            updatePosts(loadedPosts);
        }
        
    }, []);

    // update local storage (in next stage update DB)
    useEffect(() => {
        console.log('local storage updated');
        store.set('followers', state.followers); // TODO: we only want to update if previous state is different from current
        store.set('posts', state.posts); // TODO: we only want to update if previous state is different from current
        store.set('user', state.user); // TODO: we only want to update if previous state is different from current
    }, [state]);

    return (
        <FeedContext.Provider 
            value={{
                user: state.user,
                updateUser,
                editHeadline,
                editAvatar,
                editProfile,
                followers: state.followers,
                updateFollowers,
                addFollower,
                removeFollower,
                posts: state.posts,
                updatePosts,
                addPosts,
                removePost,
                filterPosts,
                editPost,
                addComment
            }}
        >
            {props.children}
        </FeedContext.Provider>
    )
};

export default FeedState;
