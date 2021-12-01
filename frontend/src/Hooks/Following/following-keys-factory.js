export const followingKeys = {
	all: ['following'],
	byUsername: (username) => [...followingKeys.all, { username }],
	propertyByUsername: (username, property) => [
		...followingKeys.byUsername(username),
		{ property },
	],
};
