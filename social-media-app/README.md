# Social Media App Project

### TODO:

#### By Steps:
- Beautify

#### Main:
- A search box, that filters the displayed articles by text or author, but not date or article id

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




