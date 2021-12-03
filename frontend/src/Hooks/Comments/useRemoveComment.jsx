import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';
import { articlesKeys } from '../Articles/articles-keys-factory';

const deleteComment = async (payload) => {
	const { data } = await axios.delete(
		`/articles/${payload.id}/comments/${payload.index}`
	);
	return data;
};

export default function useRemoveComment() {
	const queryClient = useQueryClient();

	return useMutation(deleteComment, {
		onSuccess: () => {
			queryClient.invalidateQueries(articlesKeys.all);
			return queryClient.refetchQueries({ stale: true });
		},
	});
}
