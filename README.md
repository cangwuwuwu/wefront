# WeFront

#### 前言
`wecoding`致力于打造一个便捷的小型校内信息交流网站，采用当前流行的技术实现。
#### 前端
后端项目地址: [Wecoding](https://github.com/cangwuwuwu/wecoding)
#### 项目介绍
`wecoding`基于SpringBoot + MyBatis + Vue实现。包含欢迎、首页、学生注册、学生登录、学生信息展示、学生搜索、资源分享、校园指南、资源上传、帮助中心、论坛讨论等模块。


#### 技术选型
##### 前端技术
   
|技术      | 说明    |  官网|  
| ----- | ----- | ---- |
|Vue	|前端框架	|https://vuejs.org/|
|iView| 基于 Vue 的 UI 组件库| https://www.iviewui.com/ |
|Bootstrap|开源工具包|https://www.bootcss.com/|
|Thymeleaf|模板引擎|https://www.thymeleaf.org/|
| Marked | 在线转码md文件的JS库 | https://github.com/markedjs/marked |
| Vue cli3| 基于 Vue.js 进行快速开发的脚手架 |https://cli.vuejs.org/zh/guide/|

##### 后端技术
见 wecoding

##### 开发工具
   
| 工具      | 说明    |  官网  |
| ----- | ----- | ---- |
| vscode	| 开发IDE |	https://code.visualstudio.com/ |
| webpack | 前端资源加载/打包工具 | https://www.webpackjs.com/ |

  
##### 开发环境
  
| 工具      | 版本号    |  下载  |
| ----- | ----- | ---- |
|Node.js | v10.15.3 |https://nodejs.org/en/|
|npm | 6.10.3 | https://www.npmjs.cn/ |


#### 更新日志
##### `2019/12/13`
* 重做home page ui
* 适配home page mobile
* 修复注册页面显示问题
##### `2019/10/23`
* 完成课程列表页面
##### `2019/10/6`
* 添加录取宿舍/邮箱入口实现电费查询通知功能
* 修复头像bug
##### `2019/10/4`
* 添加记住密码功能
* 添加管理员后台及入口
##### `2019/9/29`
* 合并多页面为单页面
* 修复若干显示bug
* 完成封页/登录/注册页面全球化
##### `2019/9/26`
* 剔除了所有jquery ajax,使用axios替代
* 会员信息录入合并为注册页面
##### `2019/9/23`
* 完成财务公示模块
##### `2019/9/6`
* 采用表单完成上传资源模块
* 修改了docs页面的字体
* 访问聊天室登录鉴权/未登录跳转到登录页面
##### `2019/9/1`
* 重构页面响应式布局，适配手机
* 修复了发送不了反馈的问题
* 修复资源无法搜索问题
##### `2019/8/28`
* 完善登录注册请求发送与响应接收
##### `2019/8/26`
* 完成修改密码页面模块
* 修改信息请求改写为put请求 RESTful规范化
##### `2019/8/23`
* 完成头像上传页面模块
##### `2019/8/20` 
* 前后端分离，前端改写成webpack项目
##### `2019/8/15` 
* 资源分享模块页面
##### `2019/7/25` 
* 使用iView编写了home/guide/help页面,  用来展示主页和校园指南信息
* guide/help页面使用marked.js+highlight.js 将md文件转化成 html并高亮显示
##### `2019/7/21`
* 完成简单的聊天室页面
* 添加了iView 美化注册页面,  添加了省市联动、显示性别、头像等
##### `2019/7/16`
* signup.html使用Vue双向绑定取代了JQuery的DOM操作
* 新增通过右边的搜索框搜索学生，查看其个人信息
##### `2019/7/12` 
* 使用ajax+vue,  优化注册页面,  提高了页面加载速度
* 添加了loading
* 主页添加了回到顶部按钮
##### `2019/7/6` 
* 添加了暂未完成的页面
* 删去了基于后台的省市联动
##### `2019/7/3`  
* 统一了页面使用的字体


---
Thank you for your read.