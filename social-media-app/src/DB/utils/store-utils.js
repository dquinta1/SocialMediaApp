import { NullUser, User } from "../classes/User";
import { Follower } from '../classes/Follower';
import { Post } from '../classes/Post';
import { none } from "@hookstate/core";

export function loadUser(username, user, data) {
    user.merge( 
        User(
            username, 
            data[username]['id'], 
            data[username]['company']['catchPhrase'],
            'https://picsum.photos/400/400'
        ) 
    )
}

export function loadFollowers(id, followers, data) {

    for (let index = 0; index < 3; index++) {

        const element = data[(id + index + 1) % 10];
        
        followers.merge([
            Follower(
                element['id'],
                element['name'],
                element['company']['catchPhrase'],
                'https://picsum.photos/200/200'
            )
        ])
    }
}

/**
 * Loads information to render all the posts authored by user and followers.
 * @param ids Array of id values from user and followers.
 * @param posts Reference to global storage state for posts. 
 * @param data Mappings from userId to Post raw data loaded from DB.
 * @param ids_data Mappings from id to User raw data loaded from DB.
 */
export function loadPosts(ids, posts, data, ids_data) {
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

export function addNewFollower(id, name, headline, src, followers) {
    followers.merge([
        Follower(
            id,
            name,
            headline,
            src
        )
    ])
}

/**
 * Removes a follower from the list of followers.
 * @param id Follower ID.
 * @param followers Global storage reference to followers state.
 */
export function removeFollower(id, followers) {

    let temp = [...followers.get()];

    for (let index = 0; index < temp.length; index++) {
        const element = temp[index];

        console.log('element_id', element['id']);

        if (element['id'] === id) {
            followers[index].set(none);
            break;
        }
    }
    console.log(followers);
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
}