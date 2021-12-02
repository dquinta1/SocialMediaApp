import axios from '../../Tools/axios';
import { useMutation, useQueryClient } from 'react-query';
import { followingKeys } from './following-keys-factory';
import { articlesKeys } from '../Articles/articles-keys-factory';

export default function useAddFollowing() {
	const queryClient = useQueryClient();

	return useMutation((payload) => axios.put('/following/' + payload), {
		onSuccess: () => {
			return queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === followingKeys.all ||
					query.queryKey[0] === articlesKeys.all,
			});
		},
	});
}
