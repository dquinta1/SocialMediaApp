import { articlesKeys } from './articles-keys-factory';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';

const putArticle = async (updatedArticle) => {
	const { data } = await axios.put(`/articles/${updatedArticle._id}`, updatedArticle);
	return data;
};

export default function useUpdateArticle() {
	const queryClient = useQueryClient();

	return useMutation((updatedArticle) => putArticle(updatedArticle), {
		onSuccess: (updatedArticles) => {
			queryClient.setQueryData(articlesKeys.all, updatedArticles);
		},
	});
}
