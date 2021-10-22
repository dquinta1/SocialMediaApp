import { useState as useHookState } from '@hookstate/core'
import React, { useEffect, useState } from 'react'
import store from '../../DB/store'
import { List } from 'antd'
import FollowerListItem from '../Components/FollowerListItem';
import { removeFollower } from '../../DB/utils/store-utils';
import NewUserModal from './NewUserModal';

const FollowerListWrapper = () => {

    // using localStorage
    var store = require('store');

    const [followerList, setFollowerList] = useState(store.get('followers'));
    const [idToRemove, setToRemove] = useState('');
    const [change, setChange] = useState(false);

    useEffect(() => {
        removeFollower(idToRemove);
        setFollowerList(store.get('followers'));
        setChange(false)
    }, [idToRemove, change]);

    return (
        <>
            { followerList.map( (element) => (
                <List.Item key={element.id} >
                    { FollowerListItem(element.id, element.name, element.headline, element.src, setToRemove) }
                </List.Item>
            ) ) }
            <List.Item key='new-user-modal'>
                { NewUserModal(setChange) }
            </List.Item>
        </>
    )
}

export default FollowerListWrapper;
