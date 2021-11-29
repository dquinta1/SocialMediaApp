import axios from '../Tools/axios';

export default function usePassword() {
	const updatePassword = async () => {
		try {
			const {data} = await axios.put('/password');
            return data;
		} catch (error) {
			throw error;
		}
	};

	return { updatePassword };
}