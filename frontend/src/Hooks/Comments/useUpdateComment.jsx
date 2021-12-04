import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';
import { articlesKeys } from '../Articles/articles-keys-factory';

const updateComment = async (payload) => {
	const { data } = await axios.put(
		`/articles/${payload.id}/comments/${payload.index}`,
		{ text: payload.text }
	);
	return data;
};

export default function useUpdateComment() {
	const queryClient = useQueryClient();

	return useMutation(updateComment, {
		onSuccess: () => {
			queryClient.invalidateQueries(articlesKeys.all);
			return queryClient.refetchQueries({ stale: true });
		},
	});
}
