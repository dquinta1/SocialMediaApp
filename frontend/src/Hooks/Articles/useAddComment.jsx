import { articlesKeys } from './articles-keys-factory';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';

const postComment = async ({id, newComment}) => {
	const { data } = await axios.post(`/articles/${id}/comment`, newComment);
	return data;
};

export default function useAddComment() {
	const queryClient = useQueryClient();

	return useMutation((payload) => postComment(payload), {
		onSuccess: (updatedArticle) => {
			queryClient.setQueryData(articlesKeys.articleById(updatedArticle.id), updatedArticle);
		},
	});
}
