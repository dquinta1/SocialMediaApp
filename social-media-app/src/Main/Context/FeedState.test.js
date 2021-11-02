import feedReducer from "./feed-reducer";
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

test('should fetch all articles for current logged in user ', () => {
    // (posts state is set)
})

test('should fetch subset of articles for current logged in user given search keyword ', () => {
    // (posts state is filtered)
})

test('should add articles when adding a follower ', () => {
    // (posts state is larger)
})

test('should remove articles when removing a follower ', () => {
    // (posts state is smaller)
})

test('should fetch the logged in user profile username ', () => {
    
})

