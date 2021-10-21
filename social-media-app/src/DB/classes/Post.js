export const Post = (title, description, author, timestamp, src) => {
    return {
        'title': title,
        'description': description,
        'author': author,
        'timestamp': timestamp,
        'src': src
    }
}

export const NullPost = () => Post('', '', 'null', '00:00', '');