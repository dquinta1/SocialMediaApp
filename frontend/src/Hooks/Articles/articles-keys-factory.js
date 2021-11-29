export const articlesKeys = {
	all: ['articles'],
	articleById: (id) => [...articlesKeys.all, { _id: id }],
	filterById: (criteria) => [...articlesKeys.all, criteria],
	commentsById: (id) => [...articlesKeys.all, { _id: id }, 'comments'],
};
