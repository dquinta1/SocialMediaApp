// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import { loadPosts } from '../../DB/utils/store-utils';
// import { List } from 'antd';
// import PostCard from './PostCard';

// const apiURL = 'https://jsonplaceholder.typicode.com/';

// const PostListWrapper = () => {

//     // var store = require('store');
//     // let user = store.get('user');
//     // let followers = store.get('followers');

//     // const [posts, setPosts] = useState([]);
//     // const [postsArray, setPostsArray] = useState([]);
//     // const [ids, setIds] = useState([]);
//     // const [authorIDs, setAuthorIDs] = useState(getAuthorIDs(user, followers));

//     // useEffect(() => {
//     //     // calls setPosts and setIds
//     //     fetchPosts(apiURL);
//     //     setPostsArray(loadPosts(authorIDs, posts.data, ids.data));
//     //     setAuthorIDs(getAuthorIDs(user, followers));
//     //   }, [posts]);

//     // console.log('posts', posts.data);

//     const { posts } = useHookState(store); 

//     var store = require('store');
//     let user = store.get('user');
//     let followers = store.get('followers');

//     let ids = [user['id']];
//     for (let index = 0; index < followers.length; index++) {
//         const element = followers[index];
//         ids.push(element['id'])
//     }
//     loadPosts(ids, posts, postsData, iDs);


//     postsArray.sort(function(a, b) {
//         return Number(a.timestamp) - Number(b.timestamp);
//     });

//     return (
//         postsArray.map( (element) => (
//             <List.Item key={element.id} >
//                 { PostCard(
//                     element.title, 
//                     element.description, 
//                     element.author, 
//                     element.timestamp, 
//                     element.src) }
//             </List.Item>
//         ) ) 
//     )

//     // function getAuthorIDs(user, followers) {
//     //     let ids = [user['id'].toString()];
//     //     for (let index = 0; index < followers.length; index++) {
//     //         const element = followers[index];
//     //         ids.push(element['id'].toString());
//     //     }
//     //     return ids;
//     // }

//     // function fetchPosts(apiURL) {
//     //     axios.all([
//     //         axios.get(apiURL + 'users'),
//     //         axios.get(apiURL + 'posts')
//     //     ])
//     //     .then(response => {
//     //         let users_info = response[0].data;
//     //         let posts_info = response[1].data;
//     //         let id_data = {};
//     //         let posts_data = {};

//     //         for (let index = 0; index < users_info.length; index++) {
//     //             const element = users_info[index];
//     //             id_data[element.id] = element;
//     //         }

//     //         for (let index = 0; index < posts_info.length; index++) {
//     //             const element = posts_info[index];

//     //             if (!(element.userId in posts_data)) {
//     //                 posts_data[element.userId] = [element];
//     //             }

//     //             else {
//     //                 posts_data[element.userId].push(element);
//     //             }
//     //         }
//     //         // console.log('data', posts_data);

//     //         let data = posts_data; 
//     //         setPosts({data});

//     //         data = id_data;
//     //         setIds({data});
//     //     });
//     // }
// }

// export default PostListWrapper;