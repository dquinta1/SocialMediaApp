import { NullUser, User } from "../classes/User";
import { Follower } from '../classes/Follower';
import { Post } from '../classes/Post';

export function loadUser(username, data) {
    var store = require('store');
    store.set('user', 
        User(
            username, 
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
 * @param data Mappings from userId to Post raw data loaded from DB.
 * @param ids_data Mappings from id to User raw data loaded from DB.
 */
export function loadPosts(ids, posts, data, ids_data) {

    // console.log('data', data);

    if (data) {
        ids.forEach(id => {
            let temp = [];
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
            posts.merge(temp);
        });
    }

    // console.log('data', data);
    // console.log('data[10]', data['10']);

    // let temp = [];

    // if (data.length > 0) {
    //     ids.forEach(id => {
    //         for (let index = 0; index < data[id].length; index++) {
    //             const element = data[id][index];
    //                 temp.push(Post(
    //                 element['title'],
    //                 element['body'],
    //                 ids_data[id]['name'],
    //                 Date.now(),
    //                 'https://picsum.photos/1000/1000'
    //             ))
    //         }
    //     });
    // }

    // console.log('temp', temp);

    // return temp;
}

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
 * Clears globals storage.
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