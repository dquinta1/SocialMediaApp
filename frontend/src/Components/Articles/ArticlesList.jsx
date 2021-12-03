import React from 'react';
import { List } from 'antd';
import ArticleListItem from './ArticleListItem';
import LoadingPosts from './LoadingPosts';
import useArticles from '../../Hooks/Articles/useArticles';
import useUpdateArticle from '../../Hooks/Articles/useUpdateArticle';
import useAddComment from '../../Hooks/Articles/useAddComment';

const ArticlesList = () => {
	const { data, status, error } = useArticles();
	const editArticle = useUpdateArticle();
	const addComment = useAddComment();

	switch (status) {
		case 'error':
			return <h1>{ error.message }</h1>;
		case 'success':
			return (
				<>
					{data.map((post) => (
						<List.Item key={post._id}>
							<ArticleListItem
								id={post._id}
								title={post.title}
								description={post.description}
								author={post.author}
								timestamp={post.date}
								comments={post.comments}
								src={post.img !== '' ? post.img : null}
								clickToEdit={editArticle}
								clickToComment={addComment}
							/>
						</List.Item>
					))}
				</>
			);
		default:
			return <LoadingPosts />;
	}
};

export default ArticlesList;
