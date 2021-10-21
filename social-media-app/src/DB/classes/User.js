export const User = (username, id, headline, src) => {
    return {
        'username': username,
        'id': id,
        'headline': headline,
        'src': src
    }
}

export const NullUser = () => User('null', '0', '', '');

