# Backend

## 基本数据格式

### feed数据格式
```
title: 文章标题
excerpt: 文章简介
author: 文章作者信息，包括：name（用户名），avatar（用户头像地址）
viewCounts: 阅读次数
likedCounts: 被赞次数
created: 文章发表时间
figureTitle: 题图地址
```


## API List
API请求参数格式均为JSON

### GET /feeds (首页动态)
	param:
		无

### POST /auth/login (用户登录)
	param:
		email: 用户邮箱(必须)
		password: 用户密码(必须)
	return:
	    access_token: 访问令牌
	    expired_at: 过期时间

### POST /auth/register (用户注册)
	param:
		email: 用户邮箱(必须)
		password: 用户密码(必须)
    return:
	    access_token: 访问令牌
	    expired_at: 过期时间

### DELETE /auth/logout (用户注销)
	param:
		无

### GET /member/check_email (检测用户是否注册)
	param:
		email: 用户邮箱(必须)
		
### GET /member/member_id
    param:
        无
    return;
        realname: 真实姓名
        nickname: 用户昵称
        headline: 个人简介
        email: 邮箱地址
        created: 注册时间
        avatar_path: 用户头像地址

### PUT /member/profile (更新用户信息)
	param:
		nickname: 用户昵称(可选)
		moto: 座右铭(可选)
		introduction: 个人简介(可选) 
		zhihu: 知乎个人网址(可选)
		douban:　豆瓣个人网址(可选)
		pixiv: pixiv个人网址(可选)
		dribbble: dribbble个人网址(可选)
		weibo: 微博个人网址(可选)
		github: github个人网址(可选)
		person_site: inkpaper个性网址(可选)
		
### PUT /member/password（更新用户密码）
    param:
        old_password: 用户旧密码
        new_password: 用户新密码
        confirm_new_password: 新密码确认

## Error Code Introduction

+   code: 0, 表示请求成功
+   code: 20001, 表示参数错误
+   code: 20002, 表示查询用户不存在
+   code: 20003, 表示密码错误
+	code: 20004, 没有访问权限
+   code: 20005, access_token过期
+   code: 20006, 禁止操作
+   code: 20006, 错误的头部信息
+   code: 50000, 表示服务端错误



