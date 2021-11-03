import React, { useContext, useState } from 'react';
import FeedContext from '../../Main/Context/feed-context';
import { Avatar, Upload, Button } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { useEffect } from 'react/cjs/react.development';

const UploadAvatar = () => {

    const { user, editAvatar } = useContext(FeedContext);

    // TODO: implement function that trigger on onChange and calls editAvatar

    let isLoading = true;

    if (typeof(user) !== typeof(undefined)) {
        isLoading = false;
    }

    return (
        <>
            {
            (isLoading) 
                ? <h1>Nothing to See Here</h1>
                : <Upload accept={'.png,.jpg,.jpeg'} maxCount={1} onChange={() => {/*TODO: Implement this*/}}>
                    <Button type='link' size={80}>
                        <Avatar size={80} icon={<FileImageOutlined />} src={ user.src }/>
                    </Button>
                </Upload>
            }   
        </>
    )
}

export default UploadAvatar;
