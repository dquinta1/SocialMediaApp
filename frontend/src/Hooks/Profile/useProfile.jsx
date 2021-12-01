import { profileKeys } from './profile-keys-factory';
import { useQuery } from 'react-query';
import axios from '../../Tools/axios';

const getProfile = async () => {
	const { data } = await axios.get('/profile');
	return data;
};

export default function useArticles() {
	return useQuery(profileKeys.profile, getProfile);
}
