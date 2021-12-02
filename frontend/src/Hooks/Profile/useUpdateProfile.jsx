import axios from '../../Tools/axios';
import { useMutation, useQueryClient } from 'react-query';
import { profileKeys } from './profile-keys-factory';

const patchProfile = async (payload) => {
	const { data } = await axios.patch('/profile', payload);
	return data;
};

export default function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation(patchProfile, {
		onSuccess: () => {
			queryClient.invalidateQueries(profileKeys.profile);
			return queryClient.refetchQueries({ stale: true });
		},
	});
}
