import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { loadPosts } from '../../DB/utils/store-utils';
import { List } from 'antd';
import PostCard from './PostCard';
import NewPostModal from './NewPostModal';

// const apiURL = 'https://jsonplaceholder.typicode.com/';

const PostListWrapper = () => {

    console.log('Posts List rendered');

    // using localStorage
    var store = require('store');

    const [postsList, setPostsList] = useState(store.get('posts'));
    const [change, setChange] = useState(false);
    
    useEffect(() => {
        setPostsList(store.get('posts'));
        setChange(false)
    }, [change]);

    postsList.sort(function(a, b) {
        return Number(b.timestamp) - Number(a.timestamp);
    });

    return (
        <>
            { NewPostModal(setChange) }
            { postsList.map( (element) => (
                <List.Item key={element.id} >
                    { PostCard(
                        element.title, 
                        element.description, 
                        element.author, 
                        element.timestamp, 
                        element.src) }
                </List.Item>
            ) ) }
        </>
    )
}

export default PostListWrapper;
