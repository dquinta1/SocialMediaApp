import React, { useContext, useState } from 'react';
import { Space, Input } from 'antd';
import FeedContext from '../../Context/feed-context';
import { requestPosts } from '../../../Common/APIUtils';

const { Search } = Input;

const SearchFragment = () => {

    const { filterPosts, updatePosts } = useContext(FeedContext);

    const [criteria, setCriteria] = useState('');

    const onSearch = (value) => {

        // search only if criteria differs from previous
        if (value !== criteria) {
            // revert back filtering to show all posts
            if (value === ''){
                console.log('posts requested from search');
                requestPosts().then((result) => {
                    console.log('result', result);
                    updatePosts(result);
                } );
            }

            // if actual criteria was inserted
            else {
                requestPosts().then((result) => {
                    console.log('result', result);
                    updatePosts(result);
                    filterPosts(value);
                    console.log('criteria', value);
                } );
            }
        }
        setCriteria(value);
    }

    return (
        <Space align='end' style={{display:'flex', justifyContent:'end'}}>
            <Search placeholder="search posts..." style={{ width: 200 }} onSearch={ onSearch }/>
        </Space>
    )
}

export default SearchFragment;
