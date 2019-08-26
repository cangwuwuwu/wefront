<template>
    <div :class="'home ' + headtheme">
        <Menu mode="horizontal" :theme="headtheme"
               @on-select="selectMenu">
            <MenuItem to="index" name="index" title="返回封面">
                <!-- <Icon type="md-backspace" size="30"></Icon> -->
                <span>返回封面</span>
            </MenuItem>
            <MenuItem to="/docs/guide" target="_blank" name="guide">
                <Icon type="ios-paper"></Icon>
                校园指南
            </MenuItem>
            <MenuItem to="/docs/resources" target="_blank" name="resources">
                <Icon type="logo-buffer" size="16"></Icon>
                资源分享
            </MenuItem>
            <Submenu name="talk-chat">
                <template slot="title">
                    <Icon type="ios-stats"></Icon>
                    交流讨论
                </template>
                <MenuGroup title="现在开始">
                    <MenuItem to="/chat/forum" target="_blank" name="forum">
                        <Icon type="md-chatboxes"></Icon>
                        论坛
                    </MenuItem>
                    <MenuItem to="/chat/room" target="_blank" name="chatroom">
                        <Icon type="ios-chatbubbles"></Icon>
                        聊天室
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem to="/docs/help" target="_blank" name="help">
                <Icon type="md-help-circle" size="16"></Icon>
                帮助
            </MenuItem>
            <Poptip trigger="hover" title="相信我!  点进去你就出不来了 " content="戴上耳机，好好放松一下吧！">
                <MenuItem to="https://static.hfi.me/mikutap/" target="_blank" name="relax">
                    <Icon type="md-musical-note"></Icon>
                    放松一下
                </MenuItem>
            </Poptip>
            <Submenu name="choose-theme" style="float: right;">
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
                    <MenuItem name="pink">
                        <Icon type="md-color-fill"></Icon>
                        骚粉
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="6" style="float: right;">
                <div sec:authorize="isAuthenticated()">
                    <Dropdown @on-click="go">
                        <template>
                            <badge :count="msgcount">
                                <Avatar v-if="headImg !== undefined" :src="'http://39.106.85.24:9000/wecoding/M00/00/00/' + headImg"/>
                                <Avatar v-else icon="ios-person"/>
                            </badge>
                        </template>
                        <a class="ios-arrow-down" href="javascript:void(0)">
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="#">
                                <Icon type="md-at" size="17"></Icon>
                                <span id="username" sec:authentication="name">aaa</span>
                            </DropdownItem>
                            <DropdownItem name="me" divided>
                                <Icon type="ios-person" size="17"></Icon>
                                个人中心
                            </DropdownItem>
                            <DropdownItem name="msg">
                                <Icon type="ios-notifications" size="17"></Icon>
                                消息中心
                            </DropdownItem>
                            <DropdownItem name="changepasswd">
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
                <!-- <div sec:authorize="!isAuthenticated()">
                    <Dropdown @on-click="go">
                        <Avatar icon="ios-person"/>
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
                </div> -->
            </MenuItem>
        </Menu>

        
        <div style="padding: 20px">
            <!-- <div style="position: absolute; left: 16%">
                <Anchor show-ink container=".subject">
                    <AnchorLink href="#guide" title="校园指南" />
                    <AnchorLink href="#resource" title="资源分享" />
                    <AnchorLink href="#conversation" title="交流讨论" />
                    <AnchorLink href="#photo" title="照片墙" />
                    <AnchorLink href="#help" title="获取帮助" />
                </Anchor>
            </div> -->
            <Row type="flex" justify="center" align="middle" style="width:100%">
                <Col style="width: 60%; background: #fff">
                    <Subject/>
                </Col>
            </Row>
        </div>

        <Modal footer-hide v-model="changepassmd">
            <p slot="header" style="color:#2d8cf0;text-align:center">
                    <Icon type="md-build" ></Icon>
                    <span>修改密码</span>
            </p>
            <Form ref="formChPass" :model="formChPass" :rules="ruleChPass" >
                <FormItem prop="username">
                    <Input type="text" v-model="username" disabled placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem> 
                <FormItem prop="password">
                    <Input :type="passwdtype" icon="md-eye" @on-click="displayPassText" v-model="formChPass.password" placeholder="旧密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="newpassword">
                    <Input :type="newpasswdtype" icon="md-eye" @on-click="displayNewPassText" v-model="formChPass.newpassword" placeholder="新密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="changepassBtn('formChPass')" long :loading="changepassloading">更改</Button>
                </FormItem>
            </Form>
        </Modal>

        <Drawer :closable="false" width="500" v-model="personinfo">
            <Divider orientation="left">我的信息</Divider>
            <div class="card-surround-gray">
                <Card :bordered="false">
                    <MyInfo @updateHead="changeHeadImg"/>
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

        <Footer :hometheme="headtheme"></Footer>

        <BackTop title="返回顶部" :height="100" :right="250" :bottom="250">
            <div class="top"><Icon type="ios-arrow-up" /></div>
        </BackTop>
        <div title="收藏本站" class="ivu-back-top ivu-back-top-show" style="right: 250px; bottom: 200px;" @click="add2Favourite">
            <div class="top">
                <Icon type="md-star" size="25"/>
            </div>
        </div>

    </div>
</template>

<script>
    import $ from 'jquery'
    import Stomp from 'stompjs'
    import store from '../store'
    import {formatDate} from '@/assets/js/date.js'
    import Footer from '@/pages/docs/views/footers.vue'
    import MyInfo from '@/pages/home/views/myinfo.vue'
    import Subject from '@/pages/home/views/subject.vue'

    export default {
        name: 'home',
        components: {
            Footer, MyInfo, Subject
        },
        data() {
            return {
                headtheme: 'light',
                headImg: '',
                msg: '',
                more: '加载更多',
                username: '',
                passwdtype: 'password',
                newpasswdtype: 'password',
                msgcount: 0,
                msglist: [],
                hismsglist: [],
                allhismsglist: [],
                spinShowHis: false,
                personinfo: false,
                changepassmd: false,
                changepassloading: false,

                formChPass: {
                    password: '',
                    newpassword: ''
                },
                ruleChPass: {
                    password: [
                        { required: true, message: '请输入您的旧密码。', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度在6到20之间。', trigger: 'blur' }
                    ],
                    newpassword: [
                        { required: true, message: '请输入要更改的密码。', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度在6到20之间。', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted: function () {
            // 获取用户名
            this.username = $("#username").text();

            this.getMyinfoByUsername(this.username);
            this.connectMsgWsServer(this.username);
            // 放到vuex中
            store.commit('setUsername', this.username)
        },
        methods: {
            getMyinfoByUsername(username) {
                let _self = this;
                $.ajax({
                    url: 'http://192.168.137.1:8080/stu/stu-username/' + username,
                    type: 'get',
                    processData: false,
                    contentType : false,
                    success(data_myinfo) {
                        _self.headImg = data_myinfo.stuImg;
                        var myinfo = _self.changeinfo2list(data_myinfo);
                        myinfo.stuImg = data_myinfo.stuImg;
                        myinfo.stuBigImg = data_myinfo.stuBigImg;
                        myinfo.stuId = data_myinfo.stuId;
                        myinfo.stuUsername = data_myinfo.stuUsername;
                        myinfo.stuRegistTime = formatDate(new Date(data_myinfo.stuRegistTime), 'yyyy-MM-dd hh:mm');
                        store.commit('getMyInfo', myinfo)
                    },
                    error() {
                        _self.$Message.error('获取个人信息失败...')
                    }
                })
            },
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
                    {title: '姓名', value: myinfo.stuName},
                    {title: '性别', value: myinfo.stuGender},
                    {title: '邮箱', value: myinfo.stuEmail},
                    {title: '籍贯', value: myinfo.stuArea},
                    {title: '电话', value: myinfo.stuPhone},
                    {title: '生日', value: formatDate(new Date(myinfo.stuBirthday), 'yyyy-MM-dd')},
                    {title: '个人简介', value: myinfo.stuInfo}
                ];
            },
            changeHeadImg(res) {
                console.log(res)
                this.headImg = res;
            },
            changepassBtn(name) {
                let _self = this;
                this.changepassloading = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        $.ajax({
                            url: 'http://192.168.137.1:8080/stu/account',
                            type: 'put',
                            data: {
                                stuUsername: _self.username,
                                stuPassword: _self.formChPass.password,
                                newPassword: _self.formChPass.newpassword
                            },
                            success(data_result) {
                                if (data_result === 1) {
                                    _self.$Message.success('密码修改成功!');
                                    _self.changepassloading = false;
                                    _self.changepassmd = false;
                                    _self.formChPass.password = '';
                                    _self.formChPass.newpassword = '';
                                    // window.location = 'login?logout' 登出
                                } else if (data_result === -1) {
                                    _self.changepassloading = false;
                                    _self.$Message.error('密码修改失败,请检查原密码是否输入正确!');
                                    _self.passwdtype = 'text'
                                } else {
                                    _self.changepassloading = false;
                                    _self.$Message.error('出错了,密码修改失败...');
                                    _self.passwdtype = 'text'
                                }
                            },
                            error() {
                                _self.$Message.error('密码修改失败...');
                                _self.changepassloading = false;
                            }
                        })
                        
                    } else {
                        this.$Message.error('Fail!');
                        this.changepassloading = false;
                    }
                })
            },
            displayPassText() {
                this.passwdtype === 'password' ? this.passwdtype = 'text' : this.passwdtype ='password'
            },
            displayNewPassText() {
                this.newpasswdtype === 'password' ? this.newpasswdtype = 'text' : this.newpasswdtype ='password'
            },
            go(link) {
                let _self = this;
                if (link === 'me') {
                    this.personinfo = true;
                    this.msgcount = 0;
                } else if (link === 'msg') {
                    this.personinfo = true;
                    this.msgcount = 0;
                    this.show2hismsg();
                } else if (link === 'changepasswd') {
                    this.changepassmd = true;
                } else window.location = link;
            },
            selectMenu(name) {
                // if (name.substr(0, 1) === '@') {              
                // }
                if (name === 'light' || name === 'dark' || 
                name === 'primary' || name === 'pink' ) {
                    this.headtheme = name;
                }
            },
            show2hismsg() {
                this.spinShowHis = true;
                let _self = this;
                $.ajax({
                    url: 'http://192.168.137.1:8080/mymsg',
                    type: 'get',
                    success(data_history_msg) {
                        console.log(data_history_msg);
                        _self.allhismsglist = data_history_msg.reverse();
                        _self.hismsglist = data_history_msg.slice(0, 2);
                        if (_self.hismsglist.length === _self.allhismsglist.length) {
                            _self.more = '到底啦~';
                        }
                        _self.spinShowHis = false;
                    }
                })
            },
            showallhismsg() {
                if (this.more === '到底啦~') return;
                let last = this.hismsglist.length - 1;
                for (let i = 1; i < 4; i++) {
                    this.hismsglist.push(this.allhismsglist.slice(last + i)[0]);
                    if (this.hismsglist.length === this.allhismsglist.length) {
                        this.more = '到底啦~';
                        break;
                    }
                }
            },
            add2Favourite() {
                let url = window.location.href;
                let title = document.title;
                try {
                    window.external.addFavorite(url, title);
                }catch (e) {
                    try {
                        window.sidebar.addPanel(title, url, "");
                    }
                    catch (e) {
                        this.$Modal.error({
                            title: '错误',
                            content: '<p>抱歉，您所使用的浏览器无法完成此操作。</p><p>请使用 “Ctrl+D” 手动添加到收藏夹</p>'
                        });
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

<style scoped lang="less">
.top {
    background: @light-color;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    text-align: center;
    border-radius: 5px;
    padding-top: 4px;
    width: 48px;
    height: 48px;
}
.top .ivu-icon {
    color: @dark-color;
}

.dark {
    background: @dark-color;
}
.primary {
    background: @primary-color;
    .top .ivu-icon {
        color: @primary-color;
    }
}
.light {
    background: @light-color;
}
.pink {
    background: @light-pink-color;
    .top .ivu-icon {
        color: @light-pink-color;
    }
}
</style>
