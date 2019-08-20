### Wecoding 更新日志
---
#### `2019/7/3` first commit;Some basic registration and login functions
* 欢迎/首页/登录/注册/错误页面/个人中心 页面
* 登录页面  国际化功能/Remember-me功能
* 注册页面  发送邮件/学号用户名校验/随机显示已注册用户/显示用户总数/查看用户信息
* 错误页面  显示状态码/错误名称/异常信息
* 个人页面  显示个人信息

#### `2019/7/3` Uniform web font
* 统一了页面使用的字体

#### `2019/7/6` Second commit
* 密码从数据库中拆分出来
* 添加了暂未完成的页面
* 删去了基于后台的省市联动

#### `2019/7/12` Third Commit:Code refactoring & improving the experience
* 基于MVC解耦,  将业务逻辑拆分至service层
* 使用ajax+vue,  优化注册页面,  提高了页面加载速度
* 添加了loading
* 主页添加了回到顶部按钮

#### `2019/7/14` Optimize the performance of data query and cache
* 将Druid连接池更改为性能更强大的Hikari连接池
* Spring Boot 2.x redis默认采用的lettuce存在连接超时错误,  已更换为jedis

#### `2019/7/16` front-end development
* signup.html使用Vue双向绑定取代了JQuery的DOM操作
* 新增通过右边的搜索框搜索学生，查看其个人信息

#### `2019/7/21` Use Netty for websocket and iView for view
* 整合了Netty 编写了一个简单的聊天室，聊天、显示在线人数等功能
* 添加了iView 美化注册页面,  添加了省市联动、显示性别、头像等

#### `2019/7/25` finished school-guide model
* 使用iView编写了home/guide/help页面,  用来展示主页和校园指南信息
* guide/help页面使用marked.js+highlight.js 将md文件转化成 html并高亮显示

#### `2019/7/29` fastDFS Support 
* 添加的fastDFS头像上传的后端代码
* 部分大图片配置到Nginx静态资源服务器
* 完善了校园指南,新增新生专区
* 添加了通过邮件方式发送反馈

#### `2019/8/2` add Transactional
* 添加事物支持
* 整合RabbitMQ, stomp消息插件
* 完成用户广播消息模块: 历史消息/实时接收在线消息

#### `2019/8/15` Resource Model
* 暂未做完整的资源分享模块

#### `2019/8/20` Perfect home/resources page
* 完善资源分享模块,新增学习路线图/在线学习资源
* 完善个人中心的修改个人信息
* 资源查询分页缓存

<br>