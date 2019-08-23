<template>
    <div class="home">
        <Menu mode="horizontal"
              :theme="theme" @on-select="selectMenu"
              :style="{background: theme1}" :class="fontcolor">
            <MenuItem to="index" name="index" title="返回封面">
                <Icon type="md-backspace" size="30"></Icon>
                <span>返回封面</span>
            </MenuItem>
            <MenuItem to="/docs/guide" name="guide">
                <Icon type="ios-paper"></Icon>
                校园指南
            </MenuItem>
            <MenuItem to="/docs/resources" name="resources">
                <Icon type="logo-buffer" size="16"></Icon>
                资源分享
            </MenuItem>
            <Submenu name="talk-chat">
                <template slot="title">
                    <Icon type="ios-stats"></Icon>
                    交流讨论
                </template>
                <MenuGroup title="现在开始">
                    <MenuItem to="/chat/forum" name="forum">
                        <Icon type="md-chatboxes"></Icon>
                        论坛
                    </MenuItem>
                    <MenuItem to="/chat/room" name="chatroom">
                        <Icon type="ios-chatbubbles"></Icon>
                        聊天室
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem to="/docs/help" name="help">
                <Icon type="md-help-circle" size="16"></Icon>
                帮助
            </MenuItem>
            <Poptip trigger="hover" title="相信我!  点进去你就出不来了! " content="戴上耳机，好好放松一下吧！">
                <MenuItem to="relax" target="_blank" name="relax">
                    <Icon type="md-musical-note"></Icon>
                    放松一下
                </MenuItem>
            </Poptip>
            <Submenu name="choose-theme" v-model="theme" style="float: right;">
                <template slot="title">
                    <Icon type="md-color-palette"></Icon>
                    更换主题
                </template>
                <MenuGroup title="主题">
                    <MenuItem name="light">
                        <Icon type="ios-color-fill-outline"></Icon>
                        亮色
                    </MenuItem>
                    <MenuItem name="dark">
                        <Icon type="ios-color-fill"></Icon>
                        暗色
                    </MenuItem>
                    <MenuItem name="primary">
                        <Icon type="md-color-fill"></Icon>
                        蓝色
                    </MenuItem>
                    <MenuItem name="#37a969">
                        <Icon type="md-color-fill"></Icon>
                        水鸭青
                    </MenuItem>
                    <MenuItem name="#ffc0cb">
                        <Icon type="md-color-fill"></Icon>
                        骚粉
                    </MenuItem>
                    <MenuItem name="#7B68EE">
                        <Icon type="md-color-fill"></Icon>
                        基佬紫
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="6" style="float: right;">
                <div sec:authorize="isAuthenticated()">
                    <Dropdown @on-click="go">
                        <template>
                            <badge :count="msgcount">
                                <Avatar style="background-color: #1E90FF" icon="ios-person"/>
                            </badge>
                        </template>
                        <a class="ios-arrow-down" href="javascript:void(0)">
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="#">
                                <Icon type="md-at" size="17"></Icon>
                                <span id="username" sec:authentication="name">admin</span>
                            </DropdownItem>
                            <DropdownItem name="me" divided>
                                <Icon type="ios-person" size="17"></Icon>
                                个人中心
                            </DropdownItem>
                            <DropdownItem name="me">
                                <Icon type="ios-notifications" size="17"></Icon>
                                消息中心
                            </DropdownItem>
                            <DropdownItem>
                                <Icon type="md-settings" size="17"></Icon>
                                修改密码
                            </DropdownItem>
                            <DropdownItem name="logout" divided>
                                <Icon type="md-power" size="17"></Icon>
                                退出登录
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div sec:authorize="!isAuthenticated()">
                    <Dropdown @on-click="go">
                        <Avatar style="background-color: #1E90FF" icon="ios-person"/>
                        <a class="ios-arrow-down" href="javascript:void(0)">
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="login">
                                <Icon type="md-contact" size="17"></Icon>
                                未登录
                            </DropdownItem>
                            <DropdownItem name="login" divided>
                                <Icon type="md-log-in" size="17"></Icon>
                                登录
                            </DropdownItem>
                            <DropdownItem name="signup">
                                <Icon type="md-log-out" size="17"></Icon>
                                注册
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </MenuItem>
        </Menu>

        <div style="padding: 20px">
            <Breadcrumb style="padding: 0 20px 0 20px;">
                <BreadcrumbItem to="/index/cover">Cover</BreadcrumbItem>
                <BreadcrumbItem to="/home">Home</BreadcrumbItem>
            </Breadcrumb>
            <Row>
                <Col>
                    <Card class="box-left">
                        <Collapse v-model="value2" accordion>
                            <Panel name="0">
                                校园指南
                                <p slot="content">致力于收集全校(南昌工程学院)学习生活过程中可能遇到的小问题，届时只需查阅本页即可解决，例如: 水电缴费、社区报修方式、成绩查询等。</p>
                            </Panel>
                            <Panel name="1">
                                资源分享
                                <p slot="content">致力于建立一个丰富的计算机学习资源分享天地，例如: PDF书籍、编程教学视频、学习网站等。</p>
                            </Panel>
                            <Panel name="2">
                                交流讨论
                                <p slot="content">在论坛发帖提问或者聊天室讨论，文明发言，共同进步。(虽然我知道没人就是了:) <br>(暂未开放)</p>
                            </Panel>
                            <Panel name="3">
                                参观一下
                                <p slot="content">走过路过，8要错过~可以查看所有注册用户的列表，查看个人主页，关注并私聊他们。 <br>(暂未开放)</p>
                            </Panel>
                            <Panel name="4">
                                照片墙
                                <p slot="content">汇聚最光辉的时刻(你最糗的样子都在这里:)<br>旨在收藏一些有纪念意义的照片或视频。<br>(暂未开放)</p>
                            </Panel>
                        </Collapse>
                    </Card>
                </Col>
                <Col>
                    <Card class="box-left" style="width:1062px;">
                        <Carousel v-model="value1" loop trigger="hover">
                            <CarouselItem>
                                <div class="demo-carousel"><img src="@/assets/images/business.jpg"/></div>
                            </CarouselItem>
                            <CarouselItem>
                                <div class="demo-carousel"><img src="@/assets/images/resource.jpg"/></div>
                            </CarouselItem>
                            <CarouselItem>
                                <div class="demo-carousel"><img src="@/assets/images/talk.jpg"/></div>
                            </CarouselItem>
                            <CarouselItem>
                                <div class="demo-carousel"><img src="@/assets/images/friends.jpg"/></div>
                            </CarouselItem>
                            <CarouselItem>
                                <div class="demo-carousel"><img src="@/assets/images/photos.jpg"/></div>
                            </CarouselItem>
                        </Carousel>
                    </Card>
                </Col>
                <Col>
                    <Card class="box-left">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            时光机
                        </p>
                        <Timeline>
                            <TimelineItem>
                                <p class="time">6月15日</p>
                                <p class="content">Wecoding项目启动</p>
                            </TimelineItem>
                            <TimelineItem>
                                <p class="time">6月30日</p>
                                <p class="content">域名niter.work备案成功</p>
                            </TimelineItem>
                            <TimelineItem>
                                <p class="time">7月10日</p>
                                <p class="content">登录/注册/封面的完成</p>
                            </TimelineItem>
                            <TimelineItem>
                                <p class="time">7月25日</p>
                                <p class="content">校园指南第一版完成</p>
                            </TimelineItem>
                            <TimelineItem>
                                <p class="time">8月10日</p>
                                <p class="content">重构前端页面</p>
                            </TimelineItem>
                            <TimelineItem>
                                <p class="time">Now</p>
                                <p class="content">玩命爆肝中...</p>
                            </TimelineItem>
                        </Timeline>
                    </Card>
                </Col>
            </Row>
        </div>

        <Drawer :closable="false" width="500" v-model="personinfo">
            <Divider orientation="left">我的信息</Divider>
            <div class="card-surround-gray">
                <Card :bordered="false">
                    <MyInfo/>
                </Card>
            </div>

            <br>
            <Divider orientation="left">新的消息</Divider>
            <div v-if="msglist.length == 0" class="card-surround-gray">
                <Card>
                    <p>
                        <img alt="空的" src="@/assets/images/isempty.jpg"/>
                    </p>
                </Card>
            </div>
            <div v-for="(amsg, index) in revmsglist" :key="index" class="card-surround-gray">
                <Card>
                    <p slot="title">
                        {{ amsg.msgType }}消息: {{ amsg.msgHead }}
                    </p>
                    <a href="#" slot="extra">
                        <Icon type="ios-loop-strong"></Icon>
                        {{ amsg.msgSender }}
                    </a>
                    <p> {{ amsg.msgContent }}
                    <div style="text-align: right;">
                        <Time :time="parseInt(amsg.msgTime)"/>
                    </div>
                    </p>
                </Card>
            </div>
            <br>
            <Divider orientation="left">历史消息</Divider>
            <div v-if="hismsglist.length == 0" style="padding: 10px;">
                <Card>
                    <div class="ivu-upload-drag" @click="show2hismsg">
                        <div style="padding: 40px 0;">
                            <Icon type="md-finger-print" size="30"></Icon>
                            <P>点此加载</P>
                        </div>
                    </div>
                    <Spin fix v-if="spinShowHis">
                        <Icon type="ios-loading" size=25 class="demo-spin-icon-load"></Icon>
                        <div>加载中...</div>
                    </Spin>
                </Card>
            </div>
            <div v-for="(ahismsg,index) in hismsglist" :key="index" style="padding: 10px;">
                <Card>
                    <p slot="title">
                        {{ ahismsg.msgType }}消息: {{ ahismsg.msgHead }}
                    </p>
                    <a href="#" slot="extra">
                        <Icon type="ios-loop-strong"></Icon>
                        {{ ahismsg.msgSender }}
                    </a>
                    <p> {{ ahismsg.msgContent }}
                    <div style="text-align: right;">
                        <Time :time="parseInt(ahismsg.msgTime)" type="datetime"/>
                    </div>
                    </p>
                </Card>
            </div>
            <div v-if="hismsglist.length != 0" style="cursor: pointer" @click="showallhismsg">
                <Divider>{{ more }}</Divider>
            </div>
        </Drawer>

        <Footer></Footer>

        <BackTop></BackTop>

    </div>
</template>

<script>
    import $ from 'jquery'
    import Stomp from 'stompjs'
    // import VueCropper from 'vue-cropper'
    // import Cropper from '@/pages/home/views/cropper.vue'
    import store from '../store'
    import {formatDate} from '@/assets/js/date.js'
    import Footer from '@/pages/docs/views/footers.vue'
    import MyInfo from '@/pages/home/views/myinfo.vue'

    export default {
        name: 'home',
        components: {
            Footer, MyInfo
        },
        data() {
            return {
                head: '',
                msg: '',
                sender: '',
                theme: 'light',
                theme1: '',
                fontcolor: '',
                more: '加载更多',
                username: '',
                bugtype: '',
                bugcontent: '',
                msgcount: 0,
                value1: 0,
                value2: '0',
                msglist: [],
                hismsglist: [],
                allhismsglist: [],
                spinShowHis: false,
                personinfo: false,
                bug: false,
                loading: false
            }
        },
        mounted: function () {
            // 获取用户名
            this.username = $("#username").text();
            this.connectMsgWsServer(this.username);
            // 放到vuex中
            store.commit('setUsername', this.username)
        },
        methods: {
            connectMsgWsServer(username) {
                var _self = this;
                if (username !== '') {
                    var ws = new WebSocket('ws://39.106.85.24:15674/ws');
                    var client = Stomp.over(ws);
                    var onConnect = function () {
                        _self.$Message.success('消息服务器连接成功!');
                        client.subscribe('/exchange/wecoding.fanout/', function (msg) {
                            console.log(msg);
                            let jsonMsg = JSON.parse(msg.body);
                            _self.$Notice.info({
                                title: '收到一条' + jsonMsg.msgType + '消息',
                                desc: jsonMsg.msgHead,
                            });
                            _self.msgcount += 1;
                            _self.msglist.push(jsonMsg);
                        })
                    };
                    var onError = function () {
                        _self.$Message.error('消息服务器连接失败!')
                    };
                    client.connect('guest', 'guest', onConnect, onError, '/');
                } else {
                    this.error('未登录!暂时无法连接到消息服务器')
                }
            },
            handleView() {
                this.visible = true;
            },
            changeinfo2list(myinfo) {
                return [
                    {title: '姓名', value: myinfo.stuName, class: 'tb-point'},
                    {title: '性别', value: myinfo.stuGender, class: 'tb-point'},
                    {title: '邮箱', value: myinfo.stuEmail, class: 'tb-point'},
                    {title: '籍贯', value: myinfo.stuArea, class: 'tb-point'},
                    {title: '电话', value: myinfo.stuPhone, class: 'tb-point'},
                    {title: '生日', value: formatDate(new Date(myinfo.stuBirthday), 'yyyy-MM-dd'), class: 'tb-point'},
                    // {title: '注册日期', value: formatDate(new Date(myinfo.stuRegistTime), 'yyyy-MM-dd hh:mm'), class: 'not-allow'},
                    {title: '个人简介', value: myinfo.stuInfo, class: 'tb-point'}
                ];
            },
            changecolor(type) {
                this.theme = type;
            },
            go(link) {
                let _self = this;
                if (link === 'me') {
                    this.personinfo = true;
                    // $.get("stu/stu-username/" + this.username, function (data_my) {
                    //     var myinfo = _self.changeinfo2list(data_my);
                    //     myinfo.stuImg = data_my.stuImg;
                    //     myinfo.stuBigImg = data_my.stuBigImg;
                    //     store.commit('getMyInfo', myinfo)
                    //     _self.spinShow = false;
                    // });
                    var a = {
                        stuArea: "北京市",
                        stuBigImg: "rBg7v105w4qABS5DAAAKk7Ss4-Q583.png",
                        stuBirthday: "1969-12-31T00:00:00.000+0000",
                        stuEmail: "222@qq.com",
                        stuGender: "猛男",
                        stuId: 2,
                        stuImg: "rBg7v105w4qABS5DAAAKk7Ss4-Q583_40x40.png",
                        stuInfo: "他是管理员.",
                        stuModifyTime: "2019-08-21T13:26:58.000+0000",
                        stuName: "admin",
                        stuPhone: "222",
                        stuRegistTime: "2019-07-12T16:00:00.000+0000",
                        stuUsername: "admin",
                    }
                    var myinfo = _self.changeinfo2list(a);
                    myinfo.stuImg = a.stuImg;
                    myinfo.stuBigImg = a.stuBigImg;
                    myinfo.stuId = a.stuId;
                    myinfo.stuUsername = a.stuUsername;
                    myinfo.stuRegistTime = formatDate(new Date(a.stuRegistTime), 'yyyy-MM-dd hh:mm');
                    store.commit('getMyInfo', myinfo)
                    this.msgcount = 0;
                } else window.location = link;
            },
            selectMenu(name) {
                if (name === 'light' || name === 'dark' || name === 'primary')
                    this.changecolor(name);
                if (name.substr(0, 1) === '#') {
                    this.theme1 = name;
                    this.fontcolor = 'font-light';
                }
            },
            show2hismsg() {
                this.spinShowHis = true;
                $.ajax({
                    url: '/mymsg',
                    type: 'get',
                    success(data_history_msg) {
                        console.log(data_history_msg);
                        this.allhismsglist = data_history_msg.reverse();
                        this.hismsglist = data_history_msg.slice(0, 2);
                        if (this.hismsglist.length === this.allhismsglist.length) {
                            this.more = '到底啦~';
                        }
                    }
                })
            },
            showallhismsg() {
                if (this.more === '到底啦~') return;
                let last = this.hismsglist.length - 1;
                for (let i = 1; i < 4; i++) {
                    this.hismsglist.push(this.allhismsglist.slice(last + i)[0]);
                    // last + i === this.allhismsglist.length - 1
                    if (this.hismsglist.length === this.allhismsglist.length) {
                        this.more = '到底啦~';
                        break;
                    }
                }
            },
            success(info) {
                this.$Message.success({
                    content: info,
                    duration: 3
                });
            },
            error(info) {
                this.$Message.error({
                    content: info,
                    duration: 3
                });
            }
        },
        computed: {
            revmsglist() {
                return this.msglist.reverse();
            }
        }
    }
</script>

<style scoped>

</style>
