# Social Media App Frontend

### TODO:

#### React Query - Implement Mutations

- Article: POST '/article'
- Articles: PUT '/articles/:id'
- Comment: POST '/articles/:id/comment'
- Comments: PUT '/articles/:id/comments/:index'
- Comments: DELETE '/articles/:id/comments/:index'
- Avatar: PUT '/profile/avatar'

#### UI/UX Quality of Life Fixes

- Implement ALL Loading-Status components
- Implement ALL Error-Status components
- Profile Form Field Validation: only trigger onFinish if values are modified

#### After Integration

- Fix article pagination in feed using React Query infiniteQuery
- Implement redirects and protected routing based on user auth
- Beautify

#### Tests (after code refactor with React Query):

- Validate Article actions

  - should fetch all articles for current logged in user (posts state is set)
  - should fetch subset of articles for current logged in user given search keyword (posts state is filtered)


