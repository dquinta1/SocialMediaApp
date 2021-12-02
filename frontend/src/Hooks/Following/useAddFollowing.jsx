import axios from '../../Tools/axios';
import { useMutation, useQueryClient } from 'react-query';
import { followingKeys } from './following-keys-factory';
import { articlesKeys } from '../Articles/articles-keys-factory';

const putFollowing = async (payload) => {
	const { data } = await axios.put('/following/' + payload);
	return data;
};

export default function useAddFollowing() {
	const queryClient = useQueryClient();

	return useMutation(putFollowing, {
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === followingKeys.all ||
					query.queryKey[0] === articlesKeys.all,
			});
			return queryClient.refetchQueries({ stale: true });
		},
	});
}
