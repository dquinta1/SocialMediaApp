import { 
    ADD_FOLLOWER, 
    REMOVE_FOLLOWER,
    UPDATE_FOLLOWERS,
    UPDATE_POSTS,
    ADD_POSTS,
    REMOVE_POST,
    FILTER_POSTS,
    EDIT_POST,
    ADD_COMMENT,
    EDIT_HEADLINE,
    EDIT_AVATAR,
    EDIT_PROFILE,
    UPDATE_USER
} from './feed-actions';

const feedReducer = (state, action) => {
    switch (action.type) {
        case ADD_FOLLOWER:
            return {
                ...state,
                followers: [...state.followers, action.payload],
            };
        case REMOVE_FOLLOWER:
            return {
                ...state,
                followers: state.followers.filter((follower) => follower.id !== action.payload),
            };
        case UPDATE_FOLLOWERS:
            return {
                ...state,
                followers: action.payload,
            };
        case UPDATE_POSTS:
            return {
                ...state, 
                posts: action.payload,
            };
        case ADD_POSTS:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload),
            };
        case FILTER_POSTS:
            return {
                ...state,
                posts: state.posts.filter((post) => // if criteria found in title or body of post
                    (post.author.includes(action.payload) 
                        ||  post.title.includes(action.payload) 
                        || post.description.includes(action.payload))
                ),
            };
        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post.id === action.payload[0] // matches id of post to edit
                        ? action.payload[1]       // replace with edited post
                        : post
                ),
            };
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post.id === action.payload[0] // matches id of post to comment
                        ? { ...post, comments: [...post.comments, action.payload[1]] } // add new comment
                        : post
                ),
            };
        case UPDATE_USER:
            return{
                ...state,
                user: action.payload,
            };
        case EDIT_HEADLINE:
            return {
                ...state,
                user: { ...state.user, headline: action.payload } // replace current headline
            };
        case EDIT_AVATAR:
            return {
                ...state,
                user: {...state.user, src: action.payload}
            };
        case EDIT_PROFILE:
            return {
                ...state,
                // replace modified profile values
                user: { 
                    ...state.user, 
                    name: action.payload.name,
                    email: action.payload.email,
                    phone: action.payload.phone,
                    zipcode: action.payload.zipcode,
                    password: action.payload.password
                 } 
            };
        default:
            return state;
    }
};

export default feedReducer;
