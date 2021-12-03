import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';
import { profileKeys } from '../Profile/profile-keys-factory';

const putFile = async ({url, formData}) => {
	const { data } = await axios.put(url, formData);
	return data;
};

export default function useUploadFile() {
	const queryClient = useQueryClient();

	return useMutation(putFile, {
		onSuccess: () => {
			queryClient.invalidateQueries(profileKeys.profile);
			return queryClient.refetchQueries({ stale: true });
		},
	});
}
