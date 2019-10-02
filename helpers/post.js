const postQueries = require('../queries/post');

exports.getPostDetails = (criteria) => {
  return postQueries.getPostByCriteria(criteria)
    .then((post) => {
      if (!post) {
        return Promise.reject();
      }
      post.title += ' - Woolha';
      return post;
    })
    .catch((err) => {
      return null;
    });
};


exports.getPostDetailsAsPromise = (criteria) => {

  return new Promise((resolve, reject) => {
    postQueries.getPostByCriteria(criteria)
    .then((post) => {
      if (!post) {
        return reject(null);
      }
      post.title += ' - Woolha';
      return resolve(post);
    })
    .catch((err) => {
      console.log (err);
    });
});




  
};