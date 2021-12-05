# Social Media App Frontend

### TODO:

#### Implement:

- Search Articles: filter articles query (might need new endpoint)
- Protected Routing

#### UI/UX Quality of Life Fixes

- Refactor All Auth hooks to use mutations
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
