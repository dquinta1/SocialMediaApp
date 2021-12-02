import axios from '../../Tools/axios';
import { useMutation, useQueryClient } from 'react-query';
import { followingKeys } from './following-keys-factory';
import { articlesKeys } from '../Articles/articles-keys-factory';

export default function useRemoveFollowing() {
	const queryClient = useQueryClient();

	return useMutation((payload) => axios.delete('/following/' + payload), {
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
