export const Follower = (id, name, headline, src) => {
    return {
        'id': id,
        'name': name,
        'headline': headline,
        'src': src
    }
}

export const NullFollower = () => Follower('null', 'null', '', '');
