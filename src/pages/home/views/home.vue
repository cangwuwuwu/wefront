<template>
    <div :class="'home ' + headtheme">
        <Col>
        <Menu mode="horizontal" :theme="headtheme"
               @on-select="selectMenu">
            <MenuItem to="/" name="index" class="wecoding-logo" title="返回封面">
                <span><Icon custom="iconfont icon-logo6-copy" size="32"></Icon>coding</span>
            </MenuItem>
            <Col :md="{span: 17}" :xs="{span: 0}">
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
                <MenuItem to="/comp/spend" name="spend">
                    <Icon type="logo-usd" size="16"></Icon>
                    财务公示
                </MenuItem>
                <MenuItem to="/docs/help" name="help">
                    <Icon type="md-help-circle" size="16"></Icon>
                    帮助
                </MenuItem>
                <!-- <Poptip trigger="hover" title="相信我!  点进去你就出不来了 " content="戴上耳机，好好放松一下吧！">
                    <MenuItem to="https://static.hfi.me/mikutap/" target="_blank" name="relax">
                        <Icon type="md-musical-note"></Icon>
                        轻松一下
                    </MenuItem>
                </Poptip> -->
            </Col>
            
            <Col :md="{span: 0}" :xs="{span:2}" class="xs-menu-btn" 
            :style=" headtheme === 'dark' ? 'color: rgba(255,255,255,.7)' : headtheme === 'primary' ? 'color: #fff' : ''">
                <Icon type="md-menu" size="25" @click="openmenu"/>
            </Col>
            <!-- <Col :xs="{span: 0}" :md="{span: 3}"> -->
                <Submenu name="choose-theme" class="change-theme" style="float: right;">
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
            <!-- </Col> -->
            <MenuItem name="6" style="float: right;">
                <div v-if="hasLogin !== false">
                    <Dropdown @on-click="go">
                        <template>
                            <badge :count="msgcount">
                                <Avatar v-if="myinfo.stuImg !== '' && myinfo.stuImg  !== null && myinfo.stuImg !== undefined" 
                                :src="'http://39.106.85.24:9000/wecoding/' + myinfo.stuImg"/>
                                <Avatar v-else icon="ios-person"/>
                            </badge>
                        </template>
                        <a class="ios-arrow-down" href="javascript:void(0)">
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="#">
                                <Icon type="md-at" size="17"></Icon>
                                <span id="username"> {{ myinfo.stuName }}</span>
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
                <div v-else>
                    <Dropdown @on-click="go">
                        <Avatar icon="ios-person"/>
                        <a class="ios-arrow-down" href="javascript:void(0)">
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="/index/signin">
                                <Icon type="md-contact" size="17"></Icon>
                                未登录
                            </DropdownItem>
                            <DropdownItem name="/index/signin" divided>
                                <Icon type="md-log-in" size="17"></Icon>
                                登录
                            </DropdownItem>
                            <DropdownItem name="/index/signup">
                                <Icon type="md-log-out" size="17"></Icon>
                                注册
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </MenuItem>
        </Menu>
        </Col>

        <Drawer title="全局导航" :closable="false" v-model="catalog" class="catalog-menu">
            <div class="card-shadow">
                <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                    <Menu width="310" @on-select="selectMenu">
                        <div class="navigate-group catalogue">起步</div>
                        <MenuItem name="cover" to="/index/cover">返回封面</MenuItem>
                        <MenuItem name="signin" to="/index/signin">登录</MenuItem>
                        <MenuItem name="signup" to="/index/signup">注册</MenuItem>
                        <a href="/docs/guide"><div class="navigate-group catalogue">校园指南</div></a>
                        <MenuItem name="college-website" to="/docs/guide/college-website">学校信息</MenuItem>
                        <MenuItem name="wel-new" to="/docs/guide/wel-new">新生专区</MenuItem>
                        <MenuItem name="score" to="/docs/guide/score">其他指南</MenuItem>
                        <a href="/docs/resources"><div class="navigate-group catalogue">资源分享</div></a>
                        <MenuItem name="java" to="/docs/resources/java">Java/Kotlin</MenuItem>
                        <MenuItem name="web" to="/docs/resources/vue">Web前端</MenuItem>
                        <MenuItem name="python" to="/docs/resources/python">其他语言</MenuItem>
                        <MenuItem name="tocet">四六级</MenuItem>
                        <MenuItem name="toothers">其他专业</MenuItem>
                        <div class="navigate-group catalogue">交流讨论</div>
                        <MenuItem name="room" to="/chat/room">在线聊天</MenuItem>
                        <a href="/docs/help"><div class="navigate-group catalogue">帮助文档</div></a>
                        <MenuItem name="help" to="/docs/help/update-log">更新日志</MenuItem>
                        <a href="/comp/spend"><div class="navigate-group catalogue">财务公示</div></a>
                        <div class="navigate-group catalogue">更换主题</div>
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
                        <MenuGroup title="更新中...">
                        </MenuGroup>
                    </Menu>
                </ul>
            </div>
        </Drawer>
        
        <div style="padding: 20px">
            <Row type="flex" justify="center" align="middle" style="width:100%">
                <Col :md="{span: 16}" :xs="{span: 24}" style="background: #fff">
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
                    <Input type="text" v-model="formChPass.id" disabled placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem> 
                <FormItem prop="stuEmail">
                    <AutoComplete
                        style="text-align: left;"
                        icon="ios-mail-outline"
                        transfer
                        v-model="formChPass.stuEmail"
                        @on-search="emailSearch"
                        placeholder="邮箱账号">
                        <Option v-for="item in emailist" :value="item" :key="item">{{ item }}</Option>
                    </AutoComplete>
                </FormItem>
                <Row :gutter="16">
                    <Col :md="{span:18}" :xs="{span: 14}">
                        <FormItem prop="stuCode">
                            <Input v-model="formChPass.stuCode" enter-button icon="ios-barcode-outline" placeholder="输入邮件收到的验证码"></Input>
                        </FormItem>
                    </Col>
                    <Col :md="{span:6}" :xs="{span: 10}">
                        <!-- <Button type="primary">获取验证码</Button> -->
                        <Button type="primary" @click="sendMail" :style="btnstyle" :disabled="disabled">
                            {{ btntext }}
                            <Poptip trigger="hover" word-wrap width="200" content="邮件发送会在20s之内发送到您的邮箱，若接收不到邮件，查看垃圾箱或向我反馈。">
                                <Icon type="md-help-circle" size="18"></Icon>
                            </Poptip>
                        </Button>
                    </Col>
                </Row>
                <FormItem prop="password">
                    <Input :type="passwdtype" icon="md-eye" @on-click="displayPassText" v-model="formChPass.password" placeholder="新密码"
                    @keyup.enter.native="changepassBtn('formChPass')">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="changepassBtn('formChPass')" long :loading="changepassloading">更改</Button>
                </FormItem>
            </Form>
        </Modal>

        <Drawer :closable="true" width="400" v-model="personinfo">
            <Divider orientation="left">我的信息</Divider>
            <div class="card-surround-gray">
                <Card :bordered="false">
                    <MyInfo :allinfo="myinfo" @updateHead="changeHeadImg"/>
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

        <Col :xs="{span: 0}" :md="{span: 1}">
            <BackTop title="返回顶部" :height="100" :right="250" :bottom="250">
                <div class="top"><Icon type="ios-arrow-up" /></div>
            </BackTop>
            <div title="收藏本站" class="ivu-back-top ivu-back-top-show" style="right: 250px; bottom: 200px;" @click="add2Favourite">
                <div class="top">
                    <Icon type="md-star" size="25"/>
                </div>
            </div>
        </Col>
    </div>
</template>

<script>
    import axios from 'axios'
    import Stomp from 'stompjs'
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
                catalog: false,
                myinfo: {},
                msg: '',
                more: '加载更多',
                passwdtype: 'password',
                newpasswdtype: 'password',
                msgcount: 0,
                msglist: [],
                hismsglist: [],
                allhismsglist: [],
                hasLogin: false,
                spinShowHis: false,
                personinfo: false,
                changepassmd: false,
                changepassloading: false,

                formChPass: {
                    id: '',
                    password: '',
                    stuEmail: '',
                    stuCode: '',
                },
                emailist: [],
                disabled:  false,
                btntext: '获取验证码',
                btnstyle: '',
                ruleChPass: {
                    password: [
                        { required: true, message: '请输入您的新密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '密码长度在6到20之间。', trigger: 'blur' }
                    ],
                    stuEmail: [
                        { required: true, message: '邮箱不能为空!', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式错误!', trigger: 'change' }
                    ],
                    stuCode: [
                        { required: true, message: '验证码不能为空!', trigger: 'blur' },
                        { type: 'number', message: '验证码格式错误!', 
                        transform(value) {
                                return Number(value);
                            }   
                        }
                    ],
                }
            }
        },
        mounted: function () {
            let info = sessionStorage.getItem('wecoding_login_info')
            // console.log(info)
            if (info) {  
                this.getCurrentInfo();
                this.hasLogin = true;
                const id = JSON.parse(info).username;
                this.formChPass.id = id
                this.checkFirstLogin(id).then(res => {
                    if (res.data === 1) {
                        this.$Modal.confirm({
                            title: '首次登录',
                            content: '<p>您是第一次登录这里，更改密码使账号更安全</p>',
                            okText: '更改密码',
                            cancelText: '下次一定',
                            onOk: () => {
                                this.changepassmd = true;
                            }
                        });
                    }
                })
                // this.connectMsgWsServer(this.id)
            } else {
                // this.connectMsgWsServer('')
            }
        },
        methods: {
            // 获取当前账号信息
            getCurrentInfo() {
                let _self = this;
                axios
                .get('/api/stu/current')
                .then(res => {
                    if (res) {
                        let myinfo = _self.changeinfo2list(res.data);
                        myinfo.stuImg = res.data.stuImg;
                        myinfo.stuBigImg = res.data.stuBigImg;
                        myinfo.stuId = res.data.stuId;
                        myinfo.stuName = res.data.stuName;
                        myinfo.id = res.data.id;
                        _self.myinfo = myinfo;
                    }
                })
            },
            checkFirstLogin(id) {
                let _self = this;
                return axios
                .get('/api/account', {
                    params: {
                        stuId: id
                    }
                })
            },
            connectMsgWsServer(id) {
                var _self = this;
                if (id !== '') {
                    var ws = new WebSocket('ws://119.3.59.217:15674/ws');
                    var client = Stomp.over(ws);
                    var onConnect = function () {
                        _self.$Message.success('消息服务器连接成功!');
                        client.subscribe('/exchange/wecoding.fanout/', function (msg) {
                            // console.log(msg);
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
                    {title: '性别', value: myinfo.stuGender},
                    {title: '邮箱', value: myinfo.stuEmail},
                    {title: '院系', value: myinfo.stuDept},
                    {title: '班级', value: myinfo.stuClass},
                    {title: '政治面貌', value: myinfo.stuStatus},
                    {title: '籍贯', value: myinfo.stuArea},
                    {title: '民族', value: myinfo.stuNation},
                    {title: '电话', value: myinfo.stuPhone},
                    {title: '生日', value: formatDate(new Date(myinfo.stuBirthday), 'yyyy-MM-dd')},
                    {title: '个人简介', value: myinfo.stuInfo}
                ];
            },
            changeHeadImg(res) {
                this.myinfo.stuImg = res;
            },
            // 修改密码请求
            changepassBtn(name) {
                let _self = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.changepassloading = true;
                        let formData = new FormData();
                        formData.append('stuId', this.formChPass.id);
                        formData.append('stuPassword', this.formChPass.password);
                        formData.append('stuCode', this.formChPass.stuCode);
                        formData.append('stuEmail', this.formChPass.stuEmail);
                        axios
                        .put('/api/account', formData)
                        .then(res => {
                            if (res) {
                                _self.$Message.success('密码修改成功!');
                                _self.changepassmd = false;
                                _self.formChPass.password = '';
                                setTimeout(function () {
                                    _self.go('logout');
                                }, 1500);
                            }
                            _self.changepassloading = false;
                        })
                    }
                })
            },
            displayPassText() {
                this.passwdtype === 'password' ? this.passwdtype = 'text' : this.passwdtype ='password'
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
                } else if (link === 'logout') {
                    // 登出账号
                    axios
                    .get('/api/logout')
                    .then(res => {
                        if (res) {
                            setTimeout(function () {
                                sessionStorage.removeItem('wecoding_login_info');
                                window.location = "/index/signin"
                            }, 1500);
                        }
                    })
                } else {
                    window.location = link;
                }
            },
            selectMenu(name) {
                if (name === 'light' || name === 'dark' || 
                name === 'primary' || name === 'pink' ) {
                    this.headtheme = name;
                }
            },
            show2hismsg() {
                this.spinShowHis = true;
                let _self = this;
                axios
                .get('/api/mymsg')
                .then(res => {
                    if (res) {
                        _self.allhismsglist = res.data.reverse();
                        _self.hismsglist = res.data.slice(0, 2);
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
            openmenu() {
                // this.divheight === '200px' ? this.divheight = '0px' : this.divheight = '200px'
                this.catalog = true;
            },
            sendMail() {
                let _self = this;
                let params = new URLSearchParams();
                params.append('email', this.formChPass.stuEmail)
                axios
                .post('/api/sendmail/sign', params)
                .then(res => {
                    // 发送成功禁用按钮/倒计时/解禁按钮
                    if (res) {
                        _self.$Message.success('发送成功，验证码五分钟内有效');
                        let time = 60;
                        _self.disabled = true;
                        _self.btnstyle = {'cursor': 'not-allowed'};
                        let interval  = setInterval(function () {
                            _self.btntext =  '已发送(' + time + 's)';
                            if (time === 0) {
                                _self.disabled = false;
                                _self.btntext = '获取验证码';
                                _self.btnstyle = '';
                                clearInterval(interval);
                            }
                            time--;
                        }, 1000);
                    }
                })
            },
            emailSearch (value) {
                this.emailist = !value || value.includes('@') ? [] : [
                    value + '@qq.com',
                    value + '@sina.com',
                    value + '@163.com',
                    value + '@gmail.com',
                    value + '@foxmail.com'
                ];
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
@media screen and (max-width: 770px) {
    .change-theme {
        display: none;
    }
}

.card-home {
    transition: height .2s ease-in-out;
    overflow: hidden;
}
.card-home:hover {
    height: 200px;
}
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
.catalogue {
    font-size: 20px;
    font-weight: bold;
    padding: 15px 15px;
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
.catalog-menu p {
    margin: 10px;
    font-size: 20px;
}
.catalog-menu p a {
    text-decoration: underline;
}
.xs-menu-btn {
    float: right;
    padding-right: 20px;
}
</style>
