# Social Media App Frontend

### TODO:

#### After Integration ####

- Remove global and local state management logic
- Add Async State Management logic using React Query
- Beautify

#### Tests (after code refactor with React Query):

- Validate Article actions

  - should fetch all articles for current logged in user (posts state is set)
  - should fetch subset of articles for current logged in user given search keyword (posts state is filtered)
  - should add articles when adding a follower (posts state is larger )
  - should remove articles when removing a follower (posts state is smaller)

- Validate Profile actions
  - should fetch the logged in user's profile username