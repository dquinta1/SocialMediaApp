import { useState as useHookState } from "@hookstate/core";
import store from "../../DB/store";
import { Space, Avatar, Typography, Button } from "antd";
import { removeFollower } from "../../DB/utils/store-utils";
import { 
    UserOutlined,
    CloseCircleOutlined
} from '@ant-design/icons'; 
import { useEffect } from "react";

const { Text } = Typography;

function FollowerListItem(id, name, status, src) {

    // const { followers } = useHookState(store);

    // let followersCopy = [...followers.get()]

    const removeMyself = () => {
        // removeFollower(id, followers);
        // onChange(id);
    }

    return (
        <Space size='small' align='center' style={{color: 'white'}}>
            <Avatar className='avatar' size={40} icon={<UserOutlined />} src={ src }/>
            <Space size={0} direction='vertical'>
                <Text style={{fontSize: '12px', color: 'white', width:'90px'}} ellipsis={{rows: 1}}>
                    { name }
                </Text>
                <Text style={{width:'90px', color: 'white', fontSize: '8px', fontStyle: 'italic'}} ellipsis={{rows: 1}}>
                    { status }
                </Text>
            </Space>
            <Button size='small' type='link' icon={<CloseCircleOutlined />} style={{color:'rgba(255, 50, 50, 0.8)' }} 
                onClick={ removeMyself }
            />
        </Space>
    );
}

export default FollowerListItem;