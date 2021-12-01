export const profileKeys = {
	profile: ['profile'],
    property: (property) => [...profileKeys.profile, {property}],
	byUsername: (username) => [...profileKeys.profile, username],
	propertyByUsername: (username, property) => [...profileKeys.byUsername(username), {property}],
};
