'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findAll(article) {
    return article.comments;
  }

  create(article, commentData) {
    const newComment = Object.assign({id: nanoid(MAX_ID_LENGTH)}, commentData);

    article.comments.push(newComment);
    return newComment;

  }

  drop(article, commentId) {
    const deletedComment = article.comments.find((comment) => comment.id === commentId);

    if (!deletedComment) {
      return null;
    }

    article.comments = article.comments.filter((item) => item.id !== commentId);

    return deletedComment;
  }
}

module.exports = CommentService;
