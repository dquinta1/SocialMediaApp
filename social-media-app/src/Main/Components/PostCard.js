import { Card, Image, Space, Typography } from 'antd';
import { 
    CameraOutlined, 
    EditOutlined, 
    CommentOutlined
} from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

function PostCard(title, description, author, timestamp, src) {
    return (
        <Card hoverable style={{ width: '500px' }} 
        cover={<Image src={ src } placeholder={ <CameraOutlined /> }/>}
        actions={[
            <CommentOutlined key="comment" onClick={ () => {/*TODO: implement this*/} }/>,
            <EditOutlined key="edit" onClick={ () => {/*TODO: implement this*/} }/>,
        ]}>
            <Meta title={title} description={description} />
            <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text>
                    {author}
                </Text>
                <Text>
                    {new Date(timestamp).toLocaleDateString("en-US")}
                </Text>
            </Space>
        </Card>
    );
}

export default PostCard;