import React from 'react';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const LoadingPosts = () => {
    return (
        <>
            <Card hoverable style={{ width: '500px' }} loading={true}>
                {/* <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                /> */}
            </Card>
        </>
    )
}

export default LoadingPosts
