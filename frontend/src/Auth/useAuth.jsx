import { useQuery } from 'react-query';
import axios from '../Tools/axios';

export default function useAuth() {
	const getAuth = async () => {
		const { data } = await axios.get('/profile');
		return data;
	};

	return useQuery('auth', getAuth);
}
