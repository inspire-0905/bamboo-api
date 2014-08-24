DROP DATABASE IF EXISTS bamboo;

CREATE DATABASE IF NOT EXISTS bamboo DEFAULT CHARSET 'utf8';

USE bamboo;

DROP TABLE IF EXISTS member;

CREATE TABLE IF NOT EXISTS member (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '用户id',
    `realname` VARCHAR(5) NOT NULL COMMENT '真实姓名',
    `password` VARCHAR(40) NOT NULL COMMENT '密码',
    `nickname` VARCHAR(10) NULL COMMENT '昵称',
    `introduction` VARCHAR(150) DEFAULT NULL COMMENT '简介',
    `motto` VARCHAR(150) DEFAULT NULL COMMENT 'motto',
    `email` VARCHAR(20) UNIQUE COMMENT '邮箱',
    `created` INT UNSIGNED NOT NULL COMMENT '注册时间',
    `status` TINYINT DEFAULT 0 COMMENT '用户状态',
    `is_active` TINYINT DEFAULT 0 COMMENT '用户是否激活',
    `is_deleted` TINYINT DEFAULT 0 COMMENT '是否销毁',
    `avatar_path` VARCHAR(200) NULL COMMENT '头像地址',
    `zhihu` VARCHAR(150) DEFAULT NULL COMMENT 'zhihu',
    `weibo` VARCHAR(150) DEFAULT NULL COMMENT 'sina weibo',
    `douban` VARCHAR(150) DEFAULT NULL COMMENT 'douban',
    `pixiv` VARCHAR(150) DEFAULT NULL COMMENT 'pixiv',
    `github` VARCHAR(150) DEFAULT NULL COMMENT 'github',
    `dribbble` VARCHAR(150) DEFAULT NULL COMMENT `dribbble`,
    `site` VARCHAR(150) DEFAULT NULL COMMENT 'person site',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS circle;

CREATE TABLE IF NOT EXISTS circle (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '圈子id',
    `name` VARCHAR(10) NOT NULL UNIQUE COMMENT '圈子名称',
    `introduction` VARCHAR(500) NOT NULL COMMENT '圈子介绍',
    `created` INT UNSIGNED NOT NULL COMMENT '圈子创建时间',
    `is_deleted` TINYINT DEFAULT 0 COMMENT '是否删除',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS article;

CREATE TABLE IF NOT EXISTS article (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '文章id',
    `title` VARCHAR(100) NOT NULL COMMENT '文章标题',
    `figure_title` VARCHAR(200) NULL COMMENT '文章题图',
    `content` TEXT NOT NULL COMMENT '文章内容',
    `author_id` INT NOT NULL COMMENT '作者id',
    `created` INT UNSIGNED NOT NULL COMMENT '创建时间',
    `is_published` TINYINT DEFAULT 0 COMMENT '是否发布',
    `read_count` INT DEFAULT 0 COMMENT '阅读数',
    `like_count` INT DEFAULT 0 COMMENT '赞同数',
    PRIMARY KEY (`id`),
    KEY `author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS bookmark;

CREATE TABLE IF NOT EXISTS bookmark (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '书签id',
    `member_id` INT NOT NULL COMMENT '书签所属用户id',
    `article_id` INT NOT NULL COMMENT '书签收藏文章id',
    `created` INT UNSIGNED NOT NULL COMMENT '收藏时间',
    PRIMARY KEY (`id`),
    KEY `member_id` (`member_id`),
    KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS comment;

CREATE TABLE IF NOT EXISTS comment (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '评论id',
    `member_id` INT NOT NULL COMMENT '评论用户id',
    `article_id` INT NOT NULL COMMENT '评论文章id',
    `content` VARCHAR(200) NOT NULL COMMENT '评论内容',
    `created` INT UNSIGNED NOT NULL COMMENT '评论时间',
    PRIMARY KEY (`id`),
    KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS member_follow_circle;

CREATE TABLE IF NOT EXISTS member_follow_circle (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `member_id` INT NOT NULL COMMENT '关注用户id',
    `circle_id` INT NOT NULL COMMENT '关注圈子id',
    `is_deleted` TINYINT DEFAULT 0 COMMENT '是否取消关注',
    PRIMARY KEY (`id`),
    KEY `member_id` (`member_id`),
    KEY `circle_id` (`circle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS member_relationship;

CREATE TABLE IF NOT EXISTS member_relationship (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `member_id` INT NOT NULL COMMENT '关注用户id',
    `followed_member_id` INT NOT NULL COMMENT '被关注用户id',
    PRIMARY KEY (`id`),
    KEY `member_id` (`member_id`),
    KEY `followed_member_id` (`followed_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS article_like;

CREATE TABLE IF NOT EXISTS article_like (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `member_id` INT NOT NULL COMMENT '用户id',
    `article_id` INT NOT NULL COMMENT '文章id',
    PRIMARY KEY (`id`),
    KEY `member_id` (`member_id`),
    KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS access_token;

CREATE TABLE IF NOT EXISTS access_token (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
    `access_token` VARCHAR(64) NOT NULL COMMENT 'access token',
    `member_id` INT NOT NULL COMMENT '用户id',
    `expired_at` INT NOT NULL COMMENT '过期时间',
    `is_deleted` TINYINT DEFAULT 0 COMMENT '是否清除',
    `created_at` INT NOT NULL COMMENT '登录时间',
    PRIMARY KEY (`id`),
    KEY `access_token` (`access_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;