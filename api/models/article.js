/*
 * Article model
 */

var dbPool = require("./db");

function Article() {

}

module.exports = Article;

/*
 * Get article by article's id
 */
Article.getArticleById = function(articleId, callback) {
  dbPool.getConnection(function(err, connection) {
    if (err) {
      return callback(err, null);
    } else {
      var sql = 'SELECT * FROM article WHERE id = ?';
      connection.query(sql, [articleId], function(err, result) {
        if (err) {
          return callback(err, null);
        } else {
          if (result.length === 0) {
            return callback(null, null);
          } else {
            return callback(null, result[0]);
          }
        }
      });
    }
  });
};