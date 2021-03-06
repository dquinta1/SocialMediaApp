const express = require('express');
const router = express.Router();
const {
	GetArticles,
	UpdateArticle,
	UpdateArticleImage,
	AddNewComment,
	UpdateCommentAtIndex,
	RemoveCommentAtIndex,
} = require('../controllers/articles-controller');
const uploadImage = require('../middlewares/upload-image');
const paginatedFeed = require('../middlewares/paginated-feed');

router.get('/:id?', paginatedFeed, GetArticles);
router.put('/:id', UpdateArticle);
router.put('/:id/image', uploadImage('article-image'), UpdateArticleImage);
router.post('/:id/comment', AddNewComment);
router.put('/:id/comments/:index', UpdateCommentAtIndex);
router.delete('/:id/comments/:index', RemoveCommentAtIndex);

module.exports = router;
