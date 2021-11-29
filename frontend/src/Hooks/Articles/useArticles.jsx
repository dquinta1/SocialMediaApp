import { articlesKeys } from './articles-keys-factory';
import { useQuery } from 'react-query';
import axios from '../../Tools/axios';

const getArticles = async () => {
	const { data } = await axios.get(
		'/articles' // TODO: need to modify this query to implement pagination
	);
	return data;
};

export default function useArticles() {
	return useQuery(articlesKeys.all, getArticles);
}
