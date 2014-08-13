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

### POST /auth/register (用户注册)
	param:
		email: 用户邮箱(必须)
		password: 用户密码(必须)
		realname: 用户姓名(必须)

### DELETE /auth/logout (用户注销)
	param:
		无

### GET /member/check_email (检测用户是否注册)
	param:
		email: 用户邮箱(必须)

### PUT /member/member_id (更新用户信息)
	param:
		nickname: 用户昵称(可选)
		headline: 用户简介(可选)

## Error Code Introduction

+   code: 0, 表示请求成功
+   code: 20001, 表示参数错误
+   code: 20002, 表示查询用户不存在
+   code: 20003, 表示密码错误
+	code: 20004, 禁止访问，权限相关
+   code: 50000, 表示服务端错误