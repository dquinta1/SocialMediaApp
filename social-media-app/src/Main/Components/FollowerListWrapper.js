import { useState as useHookState } from '@hookstate/core'
import React, { useEffect, useState } from 'react'
import store from '../../DB/store'
import { List } from 'antd'
import FollowerListItem from '../Components/FollowerListItem';
import { removeFollower } from '../../DB/utils/store-utils';

const FollowerListWrapper = (followers) => {

    let followerList = [...followers.get()];

    // const [idToRemove, setToRemove] = useState('');

    // useEffect(() => {
    //     onChange(idToRemove);
    //     setToRemove('');
    // }, [idToRemove]);

    // let followerList = [...followers.get()];

    return (
        followerList.map( (element) => (
            <List.Item key={element.id} >
                { FollowerListItem(element.id, element.name, element.headline, element.src) }
            </List.Item>
        ) )
    )
}

export default FollowerListWrapper;
