# Social Media App Project

### TODO:

#### By Steps:

#### Login:
- Register a new user, but new users have no authored posts when redirected to the main page. However, all new users follow the json placeholder with user id 1. You'll need to check that the username is unique and report an error if the name is already exists.

#### Main:
- ability to update headline for user, update is persistent
- add JSON placeholder user to followed users list (add that user's articles to feed, it's not persistent)
- suitable message when trying to add user that does not exist
- each article has a list of comments displayed (you may want to show/hide them or use some other means to make it user friendly)

#### Tests:
- Validate Authentication
    - should log in a previously registered user (not new users, login state should be set)
    - should not log in an invalid user (error state should be set)
    - should log out a user (login state should be cleared)

- Validate Article actions
    - should fetch all articles for current logged in user (posts state is set)
    - should fetch subset of articles for current logged in user given search keyword (posts state is filtered)
    - should add articles when adding a follower (posts state is larger )
    - should remove articles when removing a follower (posts state is smaller)

- Validate Profile actions
    - should fetch the logged in user's profile username

#### After Integration
- Remove global and local state management logic
- Add Async State Management logic using React Query
- Beautify


