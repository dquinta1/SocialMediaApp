import { Card, Image } from 'antd';
import { 
    CameraOutlined, 
    EditOutlined, 
    CommentOutlined
} from '@ant-design/icons';

const { Meta } = Card;

function PostCard(title, description, src) {
    return (
        <Card hoverable style={{ width: '500px' }} 
        cover={<Image src={ src } placeholder={ <CameraOutlined /> }/>}
        actions={[
            <CommentOutlined key="comment" onClick={ () => {/*TODO: implement this*/} }/>,
            <EditOutlined key="edit" onClick={ () => {/*TODO: implement this*/} }/>,
        ]}>
            <Meta title={title} description={description} />
        </Card>
    );
}

export default PostCard;