import axios from "axios";

export async function requestFollowers(id) {
    
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
    if (!(id in data)) {
        return followers;
    }

    console.log('userID', id);
    console.log('data', data[10]);

    // pull current user's followers among All users
    for (let index = 0; index < 3; index++) {
        const element = data[(id + index + 1) % 10];
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
    //using local storage to cache
    var store = require('store');
    store.set('followers', followers);

    return followers;
};

export async function requestPosts(id) {
    
    //using local storage to cache
    var store = require('store');

    // pull auth'd user from DB (for now local storage instead)
    // const user = await requestUser(id);
    const user = typeof(store.get('user')) === typeof(undefined) 
                    ? await requestUser(id) 
                    : store.get('user');

    // pull user's followers info to pull their posts into feed
    // const followers = await requestFollowers(id);
    const followers = typeof(store.get('followers')) === typeof(undefined) 
                        ? await requestFollowers(id) 
                        : store.get('followers');
    
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

// Returns a placeholder user or hardcoded user
export async function requestUser(id) {
    let newUser;

    // id: -1 => requests a hardcoded user (signedUp)
    if (id === -1) {
        newUser = {
            // data necessary for Account Fragment
            username: 'randoUser1',
            name: 'Jon Doearyen',
            id: 1,
            headline: 'I know nothing JDoe',
            src: 'https://picsum.photos/400/400',
            // data necessary for profile
            email: 'jd@somemail.com',
            phone: '302-123-4539',
            dateOfBirth: '02/04/2001',
            zipcode: '77005',
            password: '1234',
            confirm: '1234'
        };
    } else { // id of existing user (loggedIn)
        // GET request to Api
        const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // TODO: catch error

        // format response into mapping: username -> user
        let info = response.data;
        let data = {};

        for (let index = 0; index < info.length; index++) {
            const element = info[index];
            data[element.id] = element;
        }
        newUser = {
            // data necessary for Account Fragment
            username: data[id]['username'],
            name: data[id]['name'],
            id: id,
            headline: data[id]['company']['catchPhrase'],
            src: 'https://picsum.photos/400/400',
            // data necessary for profile
            email: 'jd@somemail.com',
            phone: '302-123-4539',
            dateOfBirth: '02/04/2001',
            zipcode: '77005',
            password: '1234',
            confirm: '1234'
        }
    }
    // using localStorage to cache
    var store = require('store');

    store.set('user', newUser);
    return newUser;
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
            // const newUser = {
            //     username: username,
            //     name: data[username]['name'],
            //     id: data[username]['id'],
            //     headline: data[username]['company']['catchPhrase'],
            //     src: 'https://picsum.photos/400/400'
            // };

            // cache user to localStorage (here we would cache token)
            // var store = require('store');
            // store.set('user', newUser);

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
