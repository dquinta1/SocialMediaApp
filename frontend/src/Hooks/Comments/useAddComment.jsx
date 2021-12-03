import { articlesKeys } from '../Articles/articles-keys-factory';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';

const postComment = async ({ id, text }) => {
	const { data } = await axios.post(`/articles/${id}/comment`, {text});
	return data;
};

export default function useAddComment() {
	const queryClient = useQueryClient();

	return useMutation(postComment, {
		onSuccess: () => {
			queryClient.invalidateQueries(articlesKeys.all);
			return queryClient.refetchQueries({ stale: true });
		},
	});
}
