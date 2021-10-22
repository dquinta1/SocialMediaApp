export const User = (username, name, id, headline, src) => {
    return {
        'username': username,
        'name': name,
        'id': id,
        'headline': headline,
        'src': src
    }
}

export const NullUser = () => User('null', '0', '', '');

