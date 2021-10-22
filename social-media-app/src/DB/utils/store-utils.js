import { NullUser, User } from "../classes/User";
import { Follower } from '../classes/Follower';
import { Post } from '../classes/Post';

export function loadUser(username, data) {
    var store = require('store');
    store.set('user', 
        User(
            username, 
            data[username]['name'],
            data[username]['id'], 
            data[username]['company']['catchPhrase'],
            'https://picsum.photos/400/400'
        ) 
    )
}

export function addNewUser(username, data) {
    var store = require('store');
    store.set('user',
        User(
            username, 
            'No Name',
            'newUser', 
            'New User Status',
            'https://picsum.photos/400/400'
        ) 
    )
    store.set('followers', []);
}

export function loadFollowers(id, data) {

    var store = require('store');
    let followers = [];

    for (let index = 0; index < 3; index++) {
        const element = data[(id + index + 1) % 10];
        followers.push(
            Follower(
                element['id'],
                element['name'],
                element['company']['catchPhrase'],
                'https://picsum.photos/200/200'
            )
        );
    }
    store.set('followers', followers);
}

/**
 * Loads information to render all the posts authored by user and followers.
 * @param ids Array of id values from user and followers.
 * @param posts Reference to global state's posts data.
 * @param data Mappings from userId to Post raw data loaded from DB.
 * @param ids_data Mappings from id to User raw data loaded from DB.
 */
export function loadPosts(/*ids, posts,*/ data, ids_data) {

    // using global state
    // if (data) {
    //     ids.forEach(id => {
    //         let temp = [];
    //         for (let index = 0; index < data[id].length; index++) {
    //             const element = data[id][index];
    //             temp.push(Post(
    //                 element['title'],
    //                 element['body'],
    //                 ids_data[id]['name'],
    //                 Date.now(),
    //                 'https://picsum.photos/1000/1000'
    //             ))
    //         }
    //         posts.merge(temp);
    //     });
    // }

    //using local storage
    var store = require('store');
    let user = store.get('user');
    let followers = store.get('followers');

    let ids = [user['id']];
    for (let index = 0; index < followers.length; index++) {
        const element = followers[index];
        ids.push(element['id'])
    }

    if (data) {
        let temp = [];
        ids.forEach(id => {
            for (let index = 0; index < data[id].length; index++) {
                const element = data[id][index];
                temp.push(Post(
                    element['title'],
                    element['body'],
                    ids_data[id]['name'],
                    Date.now(),
                    'https://picsum.photos/1000/1000'
                ))
            }
        });
        store.set('posts', temp);
    }
}

/**
 * Adds new post authored by current logged-in user.
 * @param title Title of the post.
 * @param description Body of the post.
 * @param author Name of the logged-in user.
 * @param src Image src if any provided.
 */
export function addNewPost(title, description, author, src) {

    // using local storage
    var store = require('store');
    let currentPosts = store.get('posts');
    currentPosts.push(
        Post(
            title, 
            description,
            author, 
            Date.now(),
            src            
        )
    )
    store.remove('posts');
    store.set('posts', currentPosts);
}

/**
 * Adds a new follower to the sidebar list of followers
 * @param id ID of the user to add as follower.
 * @param name Name of the new follower.
 * @param headline Headline of the new follower.
 * @param src Avatar image source of the new follower.
 */
export function addNewFollower(id, name, headline, src) {
    var store = require('store');
    let followers = store.get('followers');
    followers.push(
        Follower(
            id,
            name,
            headline,
            src
        )
    );
    store.remove('followers');
    store.set('followers', followers);
}

/**
 * Removes a follower from the list of followers.
 * @param id Follower ID.
 */
export function removeFollower(id) {

    var store = require('store');
    let temp = store.get('followers');

    for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        
        if (element['id'] === id) {
            let t = temp[temp.length - 1];
            temp[temp.length - 1] = element;
            temp[index] = t;
            temp.pop();
            break;
        }
    }
    store.remove('followers');
    store.set('followers', temp);
}

/**
 * Filters the posts shown on the feed by author and description.
 * @param value The value to filter the posts. 
 */
export function filterPosts(value) {

    var store = require('store');

    // reset to have all posts show up after a previous filter
    if (value === '') {
        // if we filted before and want to get all posts
        if (store.get('allPosts')) {
            store.remove('posts');
            store.set('posts', store.get('allPosts'));
            store.remove('allPosts');
        } 
    } else {
        // filter posts by author or text matching value
        let filteredPosts = []
        let posts = store.get('posts');

        // cache all posts
        store.set('allPosts', posts);
        
        posts.forEach(post => {
            if (post['author'].includes(value) || post['description'].includes(value)) {
                filteredPosts.push(post);
                console.log('filtered post', post);
            }
        });

        // set current posts to filtered posts
        store.remove('posts');
        store.set('posts', filteredPosts);
    }
}

/**
 * Clears global storage.
 * @param user Global storage reference to auth'd user.
 * @param followers Global storage reference to user's followers.
 * @param posts Global storage reference to user and folloers' posts.
 */
export function clearStore( user, followers, posts) {
    user.set(NullUser());
    followers.set([]);
    posts.set([]);

    var store = require('store');
    store.clearAll();
}