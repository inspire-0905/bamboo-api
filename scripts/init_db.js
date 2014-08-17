/*
 * Init some test data
 */

var dbPool = require('../api/models/db');
var tools = require('../api/utils/tools');

var initDB = function() {

  var password = tools.hashPassword('1234567');

  var member = {
    realname: '简时文书',
    nickname: '简时文书',
    headline: '~简时文书~',
    email: 'admin@inkpaper.io',
    avatar_path: 'https://trello-attachments.s3.amazonaws.com/5380c818554fec87c83ec0b2/53c68ff1cf35c131ac057cb9/67x67/d022eeebd19d49e0e97140307b3142c4/avatar.png',
    password: password
  }

  dbPool.getConnection(function(err, conn) {
    if (err) {
      console.error(err);
    } else {
      var sql = 'INSERT INTO member SET ?';
      conn.query(sql, member, function(err, rst) {
        if (err) {
          console.error(err);
        } else {
          console.info(rst);
        }
      });
    }
  });

  var articles = [
    {
      title: '简时文书 - 产品设计迭代历程',
      content: '熬夜看了WWDC2014，\
                非常鸡冻。连夜更新了OSX10.10 beta\
                和IOS8 beta，本来好好的，就是有点卡顿，\
                结果重启了一下就无限卡在登陆界面，\
                只好抹盘重装系统...',
      author_id: 1,
      created: 1408259791,
      read_count: 234,
      like_count: 10
    },
    {
      title: '简时文书 - 产品设计迭代历程',
      content: '熬夜看了WWDC2014，\
                非常鸡冻。连夜更新了OSX10.10 beta\
                和IOS8 beta，本来好好的，就是有点卡顿，\
                结果重启了一下就无限卡在登陆界面，\
                只好抹盘重装系统...',
      author_id: 1,
      created: 1408259791,
      read_count: 234,
      like_count: 10
    },
    {
      title: '简时文书 - 产品设计迭代历程',
      content: '熬夜看了WWDC2014，\
                非常鸡冻。连夜更新了OSX10.10 beta\
                和IOS8 beta，本来好好的，就是有点卡顿，\
                结果重启了一下就无限卡在登陆界面，\
                只好抹盘重装系统...',
      author_id: 1,
      created: 1408259791,
      read_count: 234,
      like_count: 10,
      figure_title: 'https://trello-attachments.s3.amazonaws.com/5380c818554fec87c83ec0b2/53c68ff1cf35c131ac057cb9/664x313/90c968268884472c7d0cb99215e43046/thematic.jpg'
    }
  ];

  var sql = 'INSERT INTO article SET ?';

  for (var i = 0; i < articles.length; i++) {
    (function(i) {
      dbPool.getConnection(function(err, conn) {
        if (err) {
          console.error(err);
        } else {
          conn.query(sql, articles[i], function(err, rst) {
            if (err) {
              console.error(err);
            } else {
              console.info(rst);
            }
          });
        }
      });
    })(i);
  }
}

module.exports = initDB;
