import { List } from 'antd'
import PostCard from '../Components/PostCard';

export default function loadPosts(posts) {

    let postsArray = [...posts.get()];

    postsArray.sort(function(a, b) {
        return Number(a.timestamp) - Number(b.timestamp);
    });

    return (
        postsArray.map( (element) => (
            <List.Item key={element.id} >
                { PostCard(
                    element.title, 
                    element.description, 
                    element.author, 
                    element.timestamp, 
                    element.src) }
            </List.Item>
        ) ) 
    )
}