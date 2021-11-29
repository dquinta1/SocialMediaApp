import { articlesKeys } from './articles-keys-factory';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';

const postArticle = async (newArticle) => {
	const { data } = await axios.post('/article', newArticle);
	return data;
};

export default function useCreateArticle() {
	const queryClient = useQueryClient();

	return useMutation((newArticle) => postArticle(newArticle), {
		onSuccess: (newArticles) => {
			queryClient.setQueryData(articlesKeys.all, newArticles);
		},
	});
}
