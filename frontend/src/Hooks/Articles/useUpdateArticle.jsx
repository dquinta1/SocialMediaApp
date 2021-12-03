import { articlesKeys } from './articles-keys-factory';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';

const putArticle = async ({id, title, description}) => {
	const { data } = await axios.put(
		`/articles/${id}`,
		{title, description}
	);
	return data;
};

export default function useUpdateArticle() {
	const queryClient = useQueryClient();

	return useMutation(putArticle, {
		onSuccess: () => {
			return queryClient.invalidateQueries(articlesKeys.all);
		},
	});
}
