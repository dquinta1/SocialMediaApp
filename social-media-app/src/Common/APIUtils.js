import axios from "axios";

export async function requestFollowers() {

    // using localStorage
    var store = require('store');
    const user = store.get('user');
    
    const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // TODO: catch error
    
    // format response into mapping: userID -> user
    let info = response.data;
    let data = {};

    for (let index = 0; index < info.length; index++) {
        const element = info[index];
        data[element.id] = element;
    }
    
    // initialize empty list of followers
    let followers = [];

    // check that the user exists in Api
    if (!(user.id in data)) {
        return followers;
    }

    console.log('userID', user.id);
    console.log('data', data[10]);

    // pull current user's followers among All users
    for (let index = 0; index < 3; index++) {
        const element = data[(user.id + index + 1) % 10];
        console.log('element', element);
        followers.push(
            {
                id: element['id'],
                name: element['name'],
                headline: element['company']['catchPhrase'],
                src: 'https://picsum.photos/200/200',
            }
        );
    }
    store.set('followers', followers);
    return followers;
};

export async function requestPosts() {
    
    var store = require('store');
    const user = store.get('user');
    
    // GET request to Api
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // TODO: catch error

    // format response into mapping: userID -> post
    let info = response.data;
    let data = {};

    for (let index = 0; index < info.length; index++) {
        const element = info[index];
        
        if (!(element.userId in data)) {
            data[element.userId] = [element];
        }

        else {
            data[element.userId].push(element);
        }
    }

    // initialize empty list of posts
    let posts = [];

    // pull user's followers info to pull their posts into feed
    const followers = typeof(store.get('followers')) !== typeof(undefined) 
                        ? store.get('followers') 
                        : [];

    // pull follower-authored posts
    followers.forEach( (follower) => {
        // skip if this user has not authored any posts
        if (follower.id in data) {
            for (let index = 0; index < data[follower.id].length; index++) {
                const element = data[follower.id][index];

                posts.push({
                    title: element['title'],
                    description: element['body'],
                    author: follower.name,
                    timestamp: Date.now(),
                    src: 'https://picsum.photos/1000/1000',
                    comments: [],
                });
            }
        }
    });

    // pull posts authored by user
    if (user.id in data) {
        for (let index = 0; index < data[user.id].length; index++) {
            const element = data[user.id][index];

            posts.push({
                title: element['title'],
                description: element['body'],
                author: user.name, 
                timestamp: Date.now(),
                src: 'https://picsum.photos/1000/1000',
                comments: [],
            });
        }
    }
    store.set('posts', posts);
    return posts;
};

/*** FRONTEND TESTING PURPOSES ONLY ***/

// Returns hardcoded user
export async function requestUser() {
    return {
        username: 'randoUser1',
        name: 'Jon Doearyen',
        id: 1,
        headline: 'I know nothing JDoe',
        src: 'https://picsum.photos/400/400'
    }
};

// Simulates a sign-in using the json placeholders api
export async function fakeSignIn(username, password) {
    // GET request to Api
    const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // TODO: catch error

    // format response into mapping: username -> user
    let info = response.data;
    let data = {};

    for (let index = 0; index < info.length; index++) {
        const element = info[index];
        data[element.username] = element;
    }

    // validate credentials
    if (username in data) {
        console.log('username found in user dictionary', data);
        if(password === data[username]['address']['street']) {
            console.log('password matches', data[username]['address']['street']);

            // create user using info from API (here we would simply pull from DB)
            const newUser = {
                username: username,
                name: data[username]['name'],
                id: data[username]['id'],
                headline: data[username]['company']['catchPhrase'],
                src: 'https://picsum.photos/400/400'
            };

            // cache user to localStorage (here we would cache token)
            var store = require('store');
            store.set('user', newUser);

            return {
                token: true,
                id: data[username]['id'],
            };
        }
    } else {
        return {
            token: false,
            id: undefined,
        };
    }
};

// Simulates a sign-up 
export async function fakeSignUp(user) {
    // TODO: Check that these credential don't already exist

    // TODO: set the store to contain undefined user so requestUser will be called
    // and the harcoded user loaded into state

    // TODO: return { token: true, id: 1 } on success to meet requirements
    // for new user created at this phase in the project
}

// Simulates a sign-out 
export async function fakeSignOut(token) {
    // perform some sign out operation using token 

    // clear the cache
    var store = require('store');
    store.clearAll();
}
