import {followingKeys} from './following-keys-factory';
import { useQuery } from 'react-query';
import axios from '../../Tools/axios';

const getFollowing = async () => {
	const { data } = await axios.get(
		'/following' 
	);
	return data;
};

export default function useFollowing() {
	return useQuery(followingKeys.all, getFollowing);
}