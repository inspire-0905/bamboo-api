/*
 * Index feeds
 */

function Feed() {

}

Feed.prototype.getIndexFeeds = function(memberId, callback) {
  var that = this;

  // TODO
  // For test data
  var data = [
    {
      title: '简时文书 - 产品设计迭代历程',
      excerpt: '熬夜看了WWDC2014，非常鸡冻。连夜更新了OSX10.10 beta和IOS8 beta，本来好好的，就是有点卡顿，结果重启了一下就无限卡在登陆界面，只好抹盘重装系统...',
      author: {
        name: '简时文书',
        avatar: ''
      },
      readCounts: 234,
      likedCounts: 18,
      created: 1407943482,
      figureTitle: ''
    },
    {
      title: '简时文书 - 产品设计迭代历程',
      excerpt: '熬夜看了WWDC2014，非常鸡冻。连夜更新了OSX10.10 beta和IOS8 beta，本来好好的，就是有点卡顿，结果重启了一下就无限卡在登陆界面，只好抹盘重装系统...',
      author: {
        name: '简时文书',
        avatar: ''
      },
      readCounts: 234,
      likedCounts: 18,
      created: 1407943482,
      figureTitle: ''
    },
    {
      title: '简时文书 - 产品设计迭代历程',
      excerpt: '熬夜看了WWDC2014，非常鸡冻。连夜更新了OSX10.10 beta和IOS8 beta，本来好好的，就是有点卡顿，结果重启了一下就无限卡在登陆界面，只好抹盘重装系统...',
      author: {
        name: '简时文书',
        avatar: ''
      },
      readCounts: 234,
      likedCounts: 18,
      created: 1407943482,
      figureTitle: ''
    }
  ]
  return callback(null, data);
};

var feed = new Feed();
module.exports = feed;