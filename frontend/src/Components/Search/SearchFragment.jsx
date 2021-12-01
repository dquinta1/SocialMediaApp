import React, { useContext, useState } from 'react';
import { Space, Input } from 'antd';
import useLogic from './useLogic';

const { Search } = Input;

const SearchFragment = () => {
	
	const { onSearch } = useLogic();

	return (
		<Space align='end' style={{ display: 'flex', justifyContent: 'end' }}>
			<Search
				placeholder='search posts...'
				style={{ width: 200 }}
				onSearch={onSearch}
			/>
		</Space>
	);
};

export default SearchFragment;
