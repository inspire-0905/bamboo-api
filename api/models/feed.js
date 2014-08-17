/*
 * Index feeds
 */

var async = require('async');
var Article = require('./article');
var Member = require('./member');

function Feed() {

}

Feed.prototype.buildFeedMeta = function(articleId, callback) {
  var that = this;

  async.waterfall([
    function(cb) {
      Article.getArticleById(articleId, function(err, article) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, article);
        }
      });
    },
    function(article, cb) {
      if (article !== null) {
        
        // Generate article meta
        var articleMeta = {};
        articleMeta.id = article.id;
        articleMeta.excerpt = article.content.slice(0, 140);
        articleMeta.readCount = article.read_count;
        articleMeta.likeCount = article.like_count;
        articleMeta.figureTitle = article.figure_title;
        articleMeta.created = article.created;
        articleMeta.author = {};

        Member.getMemberById(article.author_id, function(err, member) {
          if (err) {
            cb(err, null);
          } else {
            if (member !== null) {
              articleMeta.author.name = member.nickname;
              articleMeta.author.avatar = member.avatar_path;
              cb(null, articleMeta)
            } else {
              cb(new Error('no author'), null);
            }
          }
        });
      } else {
       cb(new Error('no article'), null);
      }
    }
  ], function(err, result) {
    if (err) {
      console.error(err);
      return callback(null, null);
    } else {
      return callback(null, result);
    }
  });
};

Feed.prototype.getIndexFeeds = function(memberId, callback) {
  var that = this;

  // TODO
  // For test data
  
  // In the feeds, there are articles' id
  var feeds = [1, 2, 3];

  async.map(
    feeds,
    that.buildFeedMeta,
    function(err, results) {
      var feedMetas = results.filter(function(ele) {
        return ele !== null;
      });
      return callback(null, feedMetas);
    }
  );
};

var feed = new Feed();
module.exports = feed;