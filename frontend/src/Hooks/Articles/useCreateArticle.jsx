import { articlesKeys } from './articles-keys-factory';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../Tools/axios';

const postArticle = async (payload) => {
	const { data } = await axios.post('/article', payload);
	return data;
};

export default function useCreateArticle() {
	const queryClient = useQueryClient();

	return useMutation(postArticle);
}
