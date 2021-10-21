import { createState } from '@hookstate/core';
import { NullUser } from './classes/User';

const store = createState({
    user: NullUser(),
    followers: [],
    posts: []
});

export default store;