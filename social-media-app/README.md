# Social Media App Project

### TODO:

#### By Steps:
- Implement Add New Follower using Global State
- Implement Add New Article to Feed
- Implement Search using Global State
- Fix Date of Birth validation on Registration
- Hardcode Global State values for when user logs in as New User
- Construct Profile Page
- Update Global State on Profile Update
- Beautify

#### Main:

- A search box, that filters the displayed articles by text or author, but not date or article id
- The username and profile picture are shown. The profile picture can be hard coded.
- The user's status headline is shown. The initial status headline is their company's catch phrase.
- Sidebar listing 3 followed users. The list should include a picture, name, and status headline for each user. The users follow the next 3 users in the user list. User with id 1 follows users with ids 2, 3, and 4. The user with id 10 follows users with ids 1, 2, and 3.
- Text field and button to add a user to the following list. For non-empty text, the follower is added to the sidebar with an arbitrary (i.e., hard coded) image and headline message
- Each followed user has a button to unfollow which removes that user from the list

#### Profile:
- The current username, email address, phone number, and zipcode are displayed
- There are fields to update each user piece of user information along with a field to update the user's password. The password should not be shown in plain text.
- Show the user's current profile picture
< li>There is a button to upload a new profile picture. But the button currently does nothing after a file is chosen.
- There is a button to update the user's values based on user input. The button validates each of the fields that are changed and then updates the displayed value as in the previous assignment.
- There is a button or link to navigate back to the main page
