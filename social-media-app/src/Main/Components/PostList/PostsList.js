import React, { useContext } from 'react';
import FeedContext from '../../Context/feed-context';
import { List } from 'antd';
import PostListItem from './PostListItem';
import LoadingPosts from './LoadingPosts';

const PostsList = () => {

    console.log('Posts List rendered');

    // temporary fix for when there are no posts
    let noPosts = false;

    // access posts state
    const { posts, editPost, addComment } = useContext(FeedContext);

    // if there are posts in feed
    if(posts.length > 0) {
        posts.sort(function(a, b) {
            return Number(b.timestamp) - Number(a.timestamp);
        });
    } else { // 
        noPosts = true;
    }

    return (
        <>
            {noPosts
                ? <LoadingPosts />
                : posts.map( (post) => (
                    <List.Item key={post.id} >
                        <PostListItem 
                            id={ post.id }
                            title={ post.title }
                            description={ post.description }
                            author={ post.author }
                            timestamp={ post.timestamp }
                            src={ post.src }
                            clickToEdit={ editPost }
                            clickToComment={ addComment }
                        />
                    </List.Item>
                ) ) }
        </>
    )
}

export default PostsList;
