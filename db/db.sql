CREATE TABLE IF NOT EXISTS member (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '用户id',
    `realname` VARCHAR(5) NOT NULL COMMENT '真实姓名',
    `password` VARCHAR(40) NOT NULL COMMENT '密码',
    `nickname` VARCHAR(10) NULL COMMENT '昵称',
    `headline` VARCHAR(50) NULL COMMENT '简介',
    `email` VARCHAR(20) UNIQUE COMMENT '邮箱',
    `created` INT UNSIGNED NOT NULL COMMENT '注册时间',
    `status` TINYINT DEFAULT 0 COMMENT '用户状态',
    `is_deleted` TINYINT DEFAULT 0 COMMENT '是否销毁',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS circle (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '圈子id',
    `name` VARCHAR(10) NOT NULL UNIQUE COMMENT '圈子名称',
    `introduction` VARCHAR(500) NOT NULL COMMENT '圈子介绍',
    `created` INT UNSIGNED NOT NULL COMMENT '圈子创建时间',
    `is_deleted` TINYINT DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS article (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '文章id',
    `title` VARCHAR(100) NOT NULL COMMENT '文章标题',
    `title_image` VARCHAR(100) NULL COMMENT '文章题图',
    `content` TEXT NOT NULL COMMENT '文章内容',
    `author_id` INT NOT NULL COMMENT '作者id',
    `created` INT UNSIGNED NOT NULL COMMENT '创建时间',
    `is_published` TINYINT DEFAULT 0 COMMENT '是否发布',
    PRIMARY KEY (`id`),
    KEY `author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS bookmark (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '书签id',
    `member_id` INT NOT NULL COMMENT '书签所属用户id',
    `article_id` INT NOT NULL COMMENT '书签收藏文章id',
    `created` INT UNSIGNED NOT NULL COMMENT '收藏时间',
    PRIMARY KEY (`id`),
    KEY `member_id` (`member_id`),
    KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS comment (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '评论id',
    `member_id` INT NOT NULL COMMENT '评论用户id',
    `article_id` INT NOT NULL COMMENT '评论文章id',
    `content` VARCHAR(200) NOT NULL COMMENT '评论内容',
    `created` INT UNSIGNED NOT NULL COMMENT '评论时间',
    PRIMARY KEY (`id`),
    KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS member_follow_circle (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `member_id` INT NOT NULL COMMENT '关注用户id',
    `circle_id` INT NOT NULL COMMENT '关注圈子id',
    `is_deleted` TINYINT DEFAULT 0 COMMENT '是否取消关注',
    PRIMARY KEY (`id`),
    KEY `member_id` (`member_id`),
    KEY `circle_id` (`circle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS member_relationship (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `member_id` INT NOT NULL COMMENT '关注用户id',
    `followed_member_id` INT NOT NULL COMMENT '被关注用户id',
    PRIMARY KEY (`id`),
    KEY `member_id` (`member_id`),
    KEY `followed_member_id` (`followed_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS article_like (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `member_id` INT NOT NULL COMMENT '用户id',
    `article_id` INT NOT NULL COMMENT '文章id',
    PRIMARY KEY (`id`),
    KEY `member_id` (`member_id`),
    KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
