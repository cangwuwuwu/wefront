<template>
    <div>
        <div class="big-navbar">
            <div class="navbar" :class="navbarTheme ? 'dark-bg-navbar' : ''">
                <ul>
                    <li @click="router('/home')">
                        <img class="nav-logo20" :class="navbarTheme ? 'nav-logo10':''" src="@/assets/images/home/logo1.png"/>
                    </li>
                    <li @click="router('/docs/guide')">校园指南</li>
                    <li @click="router('/docs/resources')">资源分享</li>
                    <li @click="router('/course/list')">计协课程</li>
                    <li @click="router('/comp/spend')">财务公示</li>
                    <li @click="router('/queryele')">电量通知</li>
                    <li @click="router('/docs/help')">帮助</li>
                    <li style="float: right;">
                        <div v-if="!hasLogin">
                            <span class="iconfont" style="margin-right: 10px">&#xe613;</span>
                            <span class="compus-login">
                                <router-link to="/index/signin">Login</router-link>
                            </span>
                        </div>
                        <div v-else>
                            <!-- <Avatar v-if="myinfo.stuImg !== '' && myinfo.stuImg  !== null && myinfo.stuImg !== undefined"
                                :src="'http://39.106.85.24:9000/wecoding/' + myinfo.stuImg"/>
                            <Avatar v-else icon="ios-person"/>
                            <span class="compus-login">&nbsp;&nbsp;Hello, 
                                <router-link to="/person/info">{{myinfo.stuName}}</router-link>
                            </span> -->
                            <Button v-if="hasAdminRole" style="margin-right: 30px;" to="/admin" type="primary">后台管理</Button>
                            <Dropdown @on-click="go" transfer>
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
                                    <!-- <DropdownItem name="msg">
                                        <Icon type="ios-notifications" size="17"></Icon>
                                        消息中心
                                    </DropdownItem> -->
                                    <DropdownItem name="pay">
                                        <Icon custom="iconfont icon-renminbi" size="17"></Icon>
                                        会费交纳
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
                    </li>
                </ul>
            </div>
        </div>
        <div class="compus" v-ripple.mouseover.3000>
            <div style="width: 1920px;margin: 0 auto;">
                <div class="compus-cover">
                    <div>
                        <div class="cs-bg-head">
                            <div>Computer</div>
                            <div>Society</div>
                        </div>
                        <div class="nit-head">Nanchang Institute of Techology</div>
                    </div>
                    <div class="compus-squareness"></div>
                    <div class="mirrorRotateVertical">
                        <div class="cs-bg-head">
                            <div>Computer</div>
                            <div>Society</div>
                        </div>
                        <div class="nit-head">Nanchang Institute of Techology</div>
                    </div>
                    <!-- <div class="compus-icno" style="margin: 115px 0;">
                        <a href="#">
                            <div class="compus-title-oralce">
                                <div class="iconfont" style="font-size: 40px">&#xe615;</div>
                                <div class="compus-icno-title">校园指南</div>
                            </div>
                        </a>
                        <a href="#">
                            <div class="compus-title-oralce" style="margin: 0 25px">
                                <div class="iconfont" style="font-size: 40px">&#xe60b;</div>
                                <div class="compus-icno-title">资源分享</div>
                            </div>
                        </a>
                        <a href="#">
                            <div class="compus-title-oralce">
                                <div class="iconfont" style="font-size: 40px">&#xe64c;</div>
                                <div class="compus-icno-title">计协课程</div>
                            </div>
                        </a>
                    </div>-->
                </div>
            </div>
        </div>
        <div class="compus-content">
            <div class="compus-content-style" style="position: relative;left: -50px;top: 30px;">
                <!--校园指导整体-->
                <span class="bold-letter" style="margin-left: 89px">校园指南</span>
                <br />
                <span style="margin-left: 89px">Campus guide</span>
                <div class="compus-little-squa-1"></div>
                <div class="compus-content-1">
                    <div class="compus-content-1-squa"></div>
                    <!--黄色框框-->
                    <div class="compus-content-1-img">
                        <!--放图片的div-->
                        <div class="compus-content-1-img-style"></div>
                    </div>
                    <!-- 圆圈框-->
                    <div class="compus-content-1-yorcle-father">
                        <div class="compus-content-1-yorcle">
                            <div class="compus-content1LeftOracl"></div>学校信息
                        </div>
                        <div class="compus-content-1-yorcle">
                            <div class="compus-content1LeftOracl"></div>新生专区
                        </div>
                        <div class="compus-content-1-yorcle">
                            <div class="compus-content1LeftOracl"></div>其他指南
                        </div>
                    </div>
                    <div class="compus-content-1-enter">
                        <a class="compus-content-1-block" href="/docs/guide">ENTER</a>
                    </div>
                </div>
            </div>

            <div style="width: 100px;height: 100px; margin: 0  auto">
                <div class="compus-content-triangle-top"></div>
                <div class="compus-content-triangle-botton"></div>
            </div>
            <div style="margin-top: 60px"></div>
            <div class="compus-content-style">
                <span class="bold-letter">资源分享</span>
                <br />
                <span>Resource sharing</span>
                <div class="compus-little-squa"></div>
                <div class="compus-content-2-style">
                    <div>
                        <div class="compus-content-2-left-oracl"></div>
                        <!--小圆圈-->
                        <div class="compus-content-2-left-oracl" style="margin-left: 27px"></div>
                        <!--小圆圈-->
                        <div class="compus-content-2-list-left">PDF资源</div>
                        <div
                            class="compus-content-2-list-left"
                            style="margin-left:21px;letter-spacing:10px;"
                        >学习视频</div>
                    </div>
                    <div class="compus-content-2-img"></div>
                    <div class="compus-content-2-moveToright">
                        <div class="compus-content-2-left-oracl-right"></div>
                        <!--小圆圈-->
                        <div class="compus-content-2-left-oracl-right" style="margin-left: 30px"></div>
                        <!--小圆圈-->
                        <div class="compus-content-2-list-right" style="letter-spacing:10px;">学习线路</div>
                        <div
                            class="compus-content-2-list-right"
                            style="margin-left: 24px;letter-spacing:10px;"
                        >在线资料</div>
                        <div class="compus-content-2-enter">
                            <a
                                class="compus-content-2-block compus-ayellow"
                                href="/docs/resources"
                            >ENTER</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--两个三角形-->
            <div style="width: 100px;height: 100px; margin: 0  auto">
                <div class="compus-content-triangle-top"></div>
                <div class="compus-content-triangle-botton"></div>
            </div>
            <!--compus-content-2-->
            <div style="height: 800px" class="compus-content-style">
                <span class="bold-letter">电量提醒</span>
                <br />
                <span>Resource sharing</span>
                <!--litter-squa-->
                <div class="compus-little-squa"></div>
                <div class="compus-content-2-style">
                    <div class="compus-content-3-img"></div>
                </div>
                <div style="margin-top: 10px">
                    <div class="compus-content-3-oracle"></div>
                    <div
                        style="font-size: 17px;margin-left: 50px;font-size: 19px;"
                    >开通后，宿舍电量不足时会自动收到邮件提醒</div>
                </div>
                <div class="compus-content-3-enter">
                    <a class="compus-content-2-block compus-ayellow" href="/queryele">ENTER</a>
                </div>
            </div>
            <!--两个三角形-->
            <div style="width: 100px;height: 100px; margin: 0  auto">
                <div class="compus-content-triangle-top"></div>
                <div class="compus-content-triangle-botton"></div>
            </div>
            <!--compus-content-4-->
            <div style="width: 1030px" class="compus-content-style">
                <span class="bold-letter">其他</span>
                <br />
                <span>Others</span>
                <!--litter-squa-->
                <div class="compus-little-squa"></div>
                <div class="compus-content-4-remove-left">
                    <!--left-img-->
                    <div class="compus-content-4-leftImg">
                        <div class="compus-content-4-takeItEasy">
                            <div class="compus-content-4-takeItEasy-1">
                                <!--小圆圈-->
                                <div class="compus-content-4-loralce"></div>
                                <div class="compus-content-4-remove-right-Mi">
                                    <!-- <router-link target="_blank" to="/comp/spend" style="color: #000">财务公示</router-link> -->
                                    <a href="/comp/spend" style="color: #000">财务公示</a>
                                </div>
                            </div>
                            <div class="compus-content-4-content">上报收支</div>
                        </div>
                    </div>
                </div>
                <!--right-img-->
                <div class="compus-content-4-rightImg">
                    <div class="compus-content-4-remove-right">
                        <div class="compus-content-4-getHelp">获取帮助</div>
                        <div class="compus-content-4-width"></div>
                        <div class="compus-content-4-loralce-right"></div>
                        <div class="compus-content-4-remove-right-gx">
                            <!-- <router-link target="_blank" to="/docs/help/update-log">更新日志</router-link> -->
                            <a href="/docs/help/update-log">更新日志</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--页脚  -->
        <div class="compus-foot">
            <div class="compus-buttom-entry">
                <div class="compus-entry-div">
                    <Row>
                        <Col :md="{span: 14}">
                            <div style="margin-bottom: 14px;">&copy;2019 Niter.work</div>
                            <Col :md="{span:10}" class="compus-column">
                                <div>
                                    <a
                                        target="_blank"
                                        href="http://www.nit.edu.cn/"
                                        class="a-dark-color"
                                    >南昌工程学院官网</a>
                                </div>
                                <div>
                                    <a
                                        target="_blank"
                                        href="http://pay.nit.edu.cn/"
                                        class="a-dark-color"
                                    >南昌工程学院电子支付平台</a>
                                </div>
                                <div>
                                    <a
                                        target="_blank"
                                        href="http://ngzhyfw.nit.edu.cn/"
                                        class="a-dark-color"
                                    >南昌工程学院志愿者服务系统</a>
                                </div>
                                <div>
                                    <a
                                        target="_blank"
                                        href="http://nontax.nit.edu.cn/"
                                        class="a-dark-color"
                                    >校园网上统一支付平台</a>
                                </div>
                            </Col>
                            <Col :md="{span:7}" class="compus-column">
                                <div>
                                    <a
                                        target="_blank"
                                        href="https://blog.csdn.net/qq_43581949"
                                        class="a-dark-color"
                                    >作者博客</a>
                                </div>
                                <div>
                                    <a href="#" class="a-dark-color">加入我们</a>
                                </div>
                                <div>反馈错误</div>
                                <div>
                                    <a target="_blank" href="/docs/help" class="a-dark-color">Help</a>
                                </div>
                            </Col>
                            <Col :md="{span:7}" class="compus-column">
                                <div>友情链接</div>
                                <div>友情链接</div>
                                <div>友情链接</div>
                                <div>友情链接</div>
                            </Col>
                        </Col>
                        <Col :md="{span:10}" style="margin-top: 34px;">
                            <Col :md="{span:16}" class="right-relate">
                                <div>
                                    <a
                                        target="_blank"
                                        class="a-dark-color"
                                        href="https://jq.qq.com/?_wv=1027&k=5U86hAr"
                                    >
                                        <Icon custom="iconfont icon-qq" size="22" />&nbsp;2019计算机协会QQ群: 462240069
                                    </a>
                                </div>
                                <div>
                                    <a
                                        target="_blank"
                                        class="a-dark-color"
                                        href="mailto:niticpc@163.com"
                                    >
                                        <Icon custom="iconfont icon-mail" size="22" />&nbsp;ACMer选拔邮箱: niticpc@163.com
                                    </a>
                                </div>
                                <div>
                                    <Icon type="logo-github" size="22" />&nbsp;GitHub源码:
                                    <a
                                        target="_blank"
                                        class="a-dark-color"
                                        href="https://github.com/cangwuwuwu/wecoding"
                                    >Wecoding</a> /
                                    <a
                                        target="_blank"
                                        class="a-dark-color"
                                        href="https://github.com/cangwuwuwu/wefront"
                                    >Wefront</a>
                                </div>
                            </Col>
                            <Col :md="{span:5, offset: 3}">
                                <img src="@/assets/images/home/qqun.png" alt="qq群二维码" />
                                <p class="qq-text">QQ</p>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="compus-buttom">
                <div class="compus-buttom-div">
                    <div class="compus-buttom-left" style>
                        <a target="_blank" href="http://www.beian.miit.gov.cn/">浙ICP备19026120号</a>&nbsp; by Cangwuwuwu
                    </div>
                    <div class="compus-buttom-right">简体 / 繁體 / English</div>
                </div>
            </div>
        </div>

        <!-- 抽屉 -->
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

        <!-- 修改密码 -->
        <Modal footer-hide v-model="changepassmd">
            <p slot="header" style="color:#2d8cf0;text-align:center">
                <Icon type="md-build"></Icon>
                <span>修改密码</span>
            </p>
            <Form ref="formChPass" :model="formChPass" :rules="ruleChPass">
                <FormItem prop="username">
                    <Input type="text" v-model="formChPass.id" disabled placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="stuEmail">
                    <Input type="text" v-model="formChPass.stuEmail" disabled placeholder="邮箱账号">
                        <Icon type="ios-mail-outline" slot="prepend"></Icon>
                    </Input>
                    <!-- <AutoComplete
                            style="text-align: left;"
                            icon="ios-mail-outline"
                            transfer
                            disabled
                            v-model="formChPass.stuEmail"
                            @on-search="emailSearch"
                            placeholder="邮箱账号">
                        <Option v-for="item in emailist" :value="item" :key="item">{{ item }}</Option>
                    </AutoComplete> -->
                </FormItem>
                <Row :gutter="16">
                    <Col :md="{span:17}" :xs="{span: 14}">
                        <FormItem prop="stuCode">
                            <Input v-model="formChPass.stuCode" enter-button icon="ios-barcode-outline"
                                   placeholder="输入邮件收到的验证码"></Input>
                        </FormItem>
                    </Col>
                    <Col :md="{span:7}" :xs="{span: 10}">
                        <!-- <Button type="primary">获取验证码</Button> -->
                        <Button type="primary" @click="sendMail" :style="btnstyle" :disabled="disabled">
                            {{ btntext }}
                            <Poptip trigger="hover" word-wrap width="200"
                                    content="邮件发送会在20s之内发送到您的邮箱，若接收不到邮件，查看垃圾箱或向我反馈。">
                                <Icon type="md-help-circle" size="18"></Icon>
                            </Poptip>
                        </Button>
                    </Col>
                </Row>
                <FormItem prop="password">
                    <Input :type="passwdtype" icon="md-eye" @on-click="displayPassText" v-model="formChPass.password"
                           placeholder="新密码"
                           @keyup.enter.native="changepassBtn('formChPass')">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="changepassBtn('formChPass')" long :loading="changepassloading">更改
                    </Button>
                </FormItem>
            </Form>
        </Modal>

        <BackTop></BackTop>
    </div>
</template>

<script>
    import axios from 'axios'
    import Stomp from 'stompjs'
    import {formatDate} from '@/assets/js/date.js'
    import MyInfo from '@/pages/index/home/components/myinfo.vue'
    export default {
        name: "new",
        components: {
            MyInfo
        },
        data() {
            return {
                navbarTheme: false,
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
                hasAdminRole: false,
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
                disabled: false,
                btntext: '获取验证码',
                btnstyle: '',
                ruleChPass: {
                    password: [
                        {required: true, message: '请输入您的新密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '密码长度在6到20之间。', trigger: 'blur'}
                    ],
                    stuCode: [
                        {required: true, message: '验证码不能为空!', trigger: 'blur'},
                        {
                            type: 'number', message: '验证码格式错误!',
                            transform(value) {
                                return Number(value);
                            }
                        }
                    ],
                }
            };
        },
        created() {
            const info = localStorage.getItem('wecoding_login_info');
            let jsonInfo = JSON.parse(info)
            if (jsonInfo) {
                this.hasLogin = true;
                this.myinfo.stuName = jsonInfo.stuName;
                this.myinfo.stuImg = jsonInfo.stuImg;

                const id = jsonInfo.username;
                const email = jsonInfo.stuEmail;
                this.formChPass.id = id;
                this.formChPass.stuEmail = email;

                if (this.$store.state.passStatus === 0) {
                    // this.checkFirstLogin(id);
                }
                const auth = jsonInfo.authorities;
                if (auth.length === 2) {
                    this.hasAdminRole = true;
                }
                // this.connectMsgWsServer(this.id)
            } else {
                // this.connectMsgWsServer('')
            }
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll, true);
        },
        methods: {
            getCurrentInfo() {
                let _self = this;
                axios
                    .get('/api/stu/current')
                    .then(res => {
                        if (res) {
                            _self.hasLogin = true;
                            let myinfo = _self.changeinfo2list(res.data);
                            myinfo.stuImg = res.data.stuImg;
                            myinfo.stuBigImg = res.data.stuBigImg;
                            myinfo.stuId = res.data.stuId;
                            myinfo.stuName = res.data.stuName;
                            myinfo.stuRegistTime = formatDate(new Date(res.data.stuRegistTime), 'yyyy-MM-dd');
                            myinfo.id = res.data.id;
                            _self.myinfo = myinfo;
                        }
                    })
            },
            checkFirstLogin(id) {
                let _self = this;
                axios
                    .get('/api/account', {
                        params: {
                            stuId: id
                        }
                    })
                    .then(res => {
                        if (res.data === 1) {
                            _self.$Modal.confirm({
                                title: '首次登录',
                                content: '<p>您是第一次登录这里，更改密码使账号更安全</p>',
                                okText: '更改密码',
                                cancelText: '下次一定',
                                onOk: () => {
                                    _self.changepassmd = true;
                                }
                            });
                        }
                        _self.$store.commit('setPassStatus', 1);
                    })
            },
            connectMsgWsServer(id) {
                let _self = this;
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
                    this.$Message.error({
                        content: '未登录!暂时无法连接到消息服务器',
                        duration: 3
                    });
                }
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
                this.passwdtype === 'password' ? this.passwdtype = 'text' : this.passwdtype = 'password'
            },
            go(link) {
                if (link === 'me') {
                    this.personinfo = true;
                    this.getCurrentInfo();
                    this.msgcount = 0;
                } else if (link === 'msg') {
                    this.personinfo = true;
                    this.getCurrentInfo();
                    this.msgcount = 0;
                    this.show2hismsg();
                } else if (link === 'changepasswd') {
                    this.changepassmd = true;
                } else if (link === 'logout') {
                    // 登出账号
                    this.logout();
                } else {
                    this.$router.push(link)
                }
            },
            logout() {
                let _self = this;
                axios
                    .get('/api/logout')
                    .then(res => {
                        if (res) {
                            setTimeout(function () {
                                localStorage.removeItem('wecoding_login_info');
                                // _self.$router.push('/index/signin');
                                _self.$router.replace({
                                    path: '/refresh',
                                    query: {
                                        t: Date.now()
                                    }
                                })
                            }, 1500);
                        }
                    })
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
            sendMail() {
                let _self = this;
                let params = new URLSearchParams();
                params.append('email', this.formChPass.stuEmail);
                axios
                    .post('/api/sendmail/sign', params)
                    .then(res => {
                        // 发送成功禁用按钮/倒计时/解禁按钮
                        if (res) {
                            _self.$Message.success('发送成功，验证码五分钟内有效');
                            let time = 60;
                            _self.disabled = true;
                            _self.btnstyle = {'cursor': 'not-allowed'};
                            let interval = setInterval(function () {
                                _self.btntext = '已发送(' + time + 's)';
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





            router(link) {
                this.$router.push(link);
            },
            handleScroll(e) {
                let top = Math.floor(
                    document.body.scrollTop ||
                        document.documentElement.scrollTop ||
                        window.pageXOffset
                );
                if (top >= 800) {
                    this.navbarTheme = true;
                } else {
                    this.navbarTheme = false;
                }
            },
            
        },
        computed: {
            revmsglist() {
                return this.msglist.reverse();
            }
        }
    };
</script>
<style scoped>
.compus-ayellow:hover {
    color: #e9bf15;
}
</style>