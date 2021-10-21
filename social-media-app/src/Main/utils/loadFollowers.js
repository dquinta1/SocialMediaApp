import { List } from 'antd'
import FollowerListItem from '../Components/FollowerListItem';

export default function loadFollowers(followers) {

    let followerArray = followers;

    return (
        followerArray.map( (element) => (
            <List.Item key={element.id} >
                { FollowerListItem(element.id, element.name, element.headline, element.src) }
            </List.Item>
        ) ) 
    )
}