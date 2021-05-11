<template>
    <div>
        <div class="big-navbar">
            <div class="navbar" :class="navbarTheme ? 'dark-bg-navbar' : ''">
                <ul class="md-navbar">
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
                            <Button v-if="hasAdminRole" style="margin-right: 30px;" to="/admin/overview" type="primary">后台管理</Button>
                            <!-- <Badge dot style="margin: 0 30px;" :offset="[30, 0]">
                                <Icon type="ios-notifications-outline" size="26"></Icon>
                            </Badge> -->
                            <Dropdown @on-click="go" transfer>
                                <template>
                                    <badge :count="msgcount" :offset="[25, 5]">
                                        <Avatar v-if="myinfo.stuImg !== '' && myinfo.stuImg  !== null && myinfo.stuImg !== undefined"
                                                :src="upImgBase + myinfo.stuImg"/>
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
                                    <DropdownItem name="changepasswd">
                                        <Icon type="md-settings" size="17"></Icon>
                                        修改密码
                                    </DropdownItem>
                                    <DropdownItem name="logout" divided>
                                        <Icon type="md-power" size="17"></Icon>
                                        退出登录
                                    </DropdownItem>
                                    <!-- <DropdownItem name="person">
                                        person
                                    </DropdownItem> -->
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </li>
                </ul>
                <ul class="xs-navbar">
                    <li @click="catalog = true"><div class="iconfont" style="font-size: 40px">&#xe617;</div></li>
                </ul>
            </div>
        </div>

        <Drawer title="全局导航" :closable="false" v-model="catalog" class="catalog-menu" placement="left" >
            <div class="card-shadow">
                <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                    <Menu width="310">
                        <div class="navigate-group catalogue">起步</div>
                        <MenuItem name="cover" to="/index/cover">封面/登录/注册</MenuItem>
                        <div @click="go('/docs/guide')" class="navigate-group catalogue">校园指南</div>
                        <MenuItem name="college-website" to="/docs/guide/college-website">学校信息</MenuItem>
                        <MenuItem name="wel-new" to="/docs/guide/wel-new">新生专区</MenuItem>
                        <MenuItem name="score" to="/docs/guide/score">其他指南</MenuItem>
                        <div @click="go('/docs/resources')" class="navigate-group catalogue">资源分享</div>
                        <MenuItem name="java" to="/docs/resources/java">编程语言</MenuItem>
                        <MenuItem name="tocet">四六级</MenuItem>
                        <MenuItem name="toothers">其他专业</MenuItem>
                        <div @click="go('/comp/spend')" class="navigate-group catalogue">财务公示</div>
                        <div @click="go('/course/list')" class="navigate-group catalogue">计协课程</div>
                        <div @click="go('/queryele')" class="navigate-group catalogue">电量通知</div>
                        <div @click="go('/docs/help')" class="navigate-group catalogue">帮助文档</div>
                        <MenuItem name="help" to="/docs/help/update-log">更新日志</MenuItem>
                    </Menu>
                </ul>
            </div>
        </Drawer>

        <div class="compus" v-ripple.mouseover.3000>
            <div class="compus-width">
                <div class="compus-cover">
                    <div>
                        <div class="cs-bg-head">
                            
                            <div>Computer</div>
                            <div>Society</div>
                        </div>
                        <div class="nit-head">Nanchang Institute of Techology</div>
                        <div class="center-logo">
                            <img style="width: 80px;" v-show="!navbarTheme" src="@/assets/images/home/logo.png"/>
                        </div>
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
        <div>
            <div class="device-height" style="height: 800px;">
                <div class="catalog-head">
                    <div class="bold-letter">校园指南</div>
                    <div>Campus guide</div>
                    <div class="compus-little-squa"></div>
                </div>
                <Row type="flex">
                    <Col :xs="{span: 0}" :md="{span: 24}" style="width: 900px;margin: 0 auto;">
                        <Row style="overflow: hidden;">
                            <Col :md="{span: 15}">
                                <div class="guide-img-block">
                                    <img style="width: 100%;height: 100%;" src="@/assets/images/home/coampDirect.png">
                                </div>
                            </Col>
                            <Col :md="{span: 9}" style="padding: 50px 50px;">
                                <div >
                                    <div class="guide-item-block">
                                        <div class="guide-point"></div>
                                        <div class="guide-title">学校信息</div>
                                    </div>
                                    <div class="guide-item-block">
                                        <div class="guide-point"></div>
                                        <div class="guide-title">新生专区</div>
                                    </div>
                                    <div class="guide-item-block">
                                        <div class="guide-point"></div>
                                        <div class="guide-title">其他指南</div>
                                    </div>
                                    <div class="btn-enter">
                                        <div class="btn-enter-block">
                                            <a class="compus-content-2-block" 
                                                href="/docs/guide" >ENTER</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div class="orange-bg-bar"></div>
                    </Col>
                    <Col :xs="{span: 24}" :md="{span: 0}">
                        <Row style="overflow: hidden;">
                            <Col>
                                <img style="width: 100%;height: 100%;" src="@/assets/images/home/coampDirect.png">
                            </Col>
                            <Col style="padding: 30px;">
                                <div class="xs-guide-item">
                                    <div class="guide-item-block">
                                        <div class="guide-point"></div>
                                        <div class="guide-title">学校信息</div>
                                    </div>
                                    <div class="guide-item-block">
                                        <div class="guide-point"></div>
                                        <div class="guide-title">新生专区</div>
                                    </div>
                                    <div class="guide-item-block">
                                        <div class="guide-point"></div>
                                        <div class="guide-title">其他指南</div>
                                    </div>
                                </div>
                                <div class="btn-enter">
                                    <div class="btn-enter-block">
                                        <a class="compus-content-2-block" 
                                            href="/docs/guide" >ENTER</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div class="device-height" style="height: 800px;">
                <div class="catalog-head">
                    <div class="bold-letter">资源分享</div>
                    <div>Resource sharing</div>
                    <div class="compus-little-squa"></div>
                </div>
                <Row type="flex" class="res-content">
                    <Col :xs="{span: 0}" :md="{span: 24}" class="res-content-block">
                        <Row style="overflow: hidden;">
                            <Col :md="{span: 4}" style="padding-top: 160px;">
                                <div>
                                    <div class="compus-content-2-list-left">
                                        <div class="compus-content-2-left-oracl"></div>PDF资源
                                    </div>
                                    <div class="compus-content-2-list-left res-content-item">
                                        <div class="compus-content-2-left-oracl"></div>学习视频
                                    </div>
                                </div>
                            </Col>
                            <Col :md="{span: 16}">
                                <img src="@/assets/images/home/resource-share.jpg" class="res-img">
                            </Col>
                            <Col :md="{span: 4}" style="padding-top: 160px;">
                                <div>
                                    <div class="compus-content-2-list-left">
                                        <div class="compus-content-2-left-oracl"></div>PDF资源
                                    </div>
                                    <div class="compus-content-2-list-left res-content-item">
                                        <div class="compus-content-2-left-oracl"></div>学习视频
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div>
                            <div class="btn-enter-block">
                                <a class="compus-content-2-block compus-ayellow" 
                                    href="/docs/resources" >ENTER</a>
                            </div>
                        </div>
                    </Col>
                    <Col :xs="{span: 24}" :md="{span: 0}">
                        <div>
                            <img src="@/assets/images/home/resource-share.jpg" class="res-img">
                        </div>
                        <div style="overflow: hidden;">
                            <div style="width: fit-content;margin: 0 auto;">
                                <div class="compus-content-2-list-left">
                                    <div class="compus-content-2-left-oracl"></div>PDF资源
                                </div>
                                <div class="compus-content-2-list-left" style="letter-spacing: 10px;">
                                    <div class="compus-content-2-left-oracl"></div>学习视频
                                </div>
                                <div class="compus-content-2-list-left">
                                    <div class="compus-content-2-left-oracl"></div>PDF资源
                                </div>
                                <div class="compus-content-2-list-left" style="letter-spacing: 10px;">
                                    <div class="compus-content-2-left-oracl"></div>学习视频
                                </div>
                            </div>
                        </div>
                        <div class="btn-enter">
                            <div class="btn-enter-block">
                                <a class="compus-content-2-block compus-ayellow" 
                                    href="/docs/resources" >ENTER</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            
            <div class="course-block" style="height: 700px;">
                <div class="catalog-head">
                    <div class="bold-letter" style="letter-spacing: 3px;">计协课程</div>
                    <div>Course</div>
                    <div class="compus-little-squa"></div>
                </div>
                <div>
                    <img style="width: 100%;height: 100%;" src="@/assets/images/home/course.png">
                </div>
                <div style="width: 100%;">
                    <div class="elemind-block" style="margin: 30px auto;">
                        <div class="compus-content-3-oracle"></div>
                        <div class="ele-notice">报名课程</div>
                        <div class="compus-content-3-oracle"></div>
                        <div class="ele-notice">推荐网课</div>
                    </div>
                </div>
                <div class="btn-enter">
                    <div class="btn-enter-block">
                        <a class="compus-content-2-block compus-ayellow" href="/course/list" >ENTER</a>
                    </div>
                </div>
            </div>


            <div class="device-height" style="height: 700px;">
                <div class="catalog-head">
                    <div class="bold-letter">电量提醒</div>
                    <div>Electricity Remind</div>
                    <div class="compus-little-squa"></div>
                </div>
                <Row>
                    <Col :xs="{span: 0}" :md="{span: 24}" class="compus-content-style">
                        <div class="compus-content-2-style">
                            <div class="compus-content-3-img"></div>
                        </div>
                        <div style="width: 100%;">
                            <div class="elemind-block" style="margin: 20px auto;">
                                <div class="compus-content-3-oracle"></div>
                                <div class="ele-notice">开通后，宿舍电量不足时会自动收到邮件提醒</div>
                            </div>
                        </div>
                        <div>
                            <div class="btn-enter-block">
                                <a class="compus-content-2-block compus-ayellow" href="/queryele" >ENTER</a>
                            </div>
                        </div>
                    </Col>
                    <Col :xs="{span: 24}" :md="{span: 0}">
                        <div>
                            <img style="width: 100%;height: 100%;" src="@/assets/images/home/power_rate_remind.jpg">
                        </div>
                        <div style="width: 100%;">
                            <div class="elemind-block" style="margin: 30px auto;">
                                <div class="compus-content-3-oracle"></div>
                                <div class="ele-notice">开通宿舍电量不足提醒</div>
                            </div>
                        </div>
                        <div class="btn-enter">
                            <div class="btn-enter-block">
                                <a class="compus-content-2-block compus-ayellow" href="/queryele" >ENTER</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            

            
            <div class="device-height other-box" style="height: 1000px;">
                <div class="catalog-head">
                    <div class="bold-letter" style="letter-spacing: 3px;">其他</div>
                    <div>Others</div>
                    <div class="compus-little-squa"></div>
                </div>
                <div type="flex">
                    <div class="other-content">
                        <div class="compus-content-4-leftImg" style="margin-top: 20px;">
                            <div class="compus-content-4-takeItEasy">
                                <div class="compus-content-4-takeItEasy-1">
                                    <div class="other-content-round"></div>
                                    <div style="float: left;">
                                        <a href="/comp/spend" style="color: #000">财务公示</a>
                                    </div>
                                </div>
                                <div class="compus-content-4-content">上报收支</div>
                            </div>
                        </div>
                        <div class="compus-content-4-rightImg" style="padding: 100px;">
                            <div style="width: fit-content;">
                                <div class="other-right">获取帮助</div>
                                <div class="other-right-block">
                                    <div class="other-right-round"></div>
                                    <div class="other-right-btn">
                                        <a href="/docs/help/update-log">更新日志</a>
                                    </div>
                                </div>
                            </div>
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
                            <div style="margin-bottom: 14px;">&copy;2019-2020 Niter.work</div>
                            
                            <Col :md="{span:7}" :xs="{span: 10}" class="compus-column">
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
                                <div @click="bug = true" style="cursor:pointer;">反馈错误</div>
                                <div>
                                    <a target="_blank" href="/docs/help" class="a-dark-color">Help</a>
                                </div>
                            </Col>
                            <Col :md="{span:10}" :xs="{span: 12, offset: 2}" class="compus-column">
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
                        </Col>
                        <Col :md="{span:10}" class="friend-link-col">
                            <Col :md="{span:16}" :xs="{span: 15, offset: 1}" class="right-relate">
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
                            <Col :md="{span:5, offset: 2}" :xs="{span: 5, offset: 2}">
                                <img src="@/assets/images/home/qqun.png" alt="qq群二维码" />
                                <p class="qq-text">QQ</p>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="compus-buttom">
                <div class="compus-buttom-div">
                    <div class="compus-buttom-left">
                        <a target="_blank" href="http://www.beian.miit.gov.cn/">浙ICP备19026120号</a>&nbsp; UI designed by 廖嘉璐
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
                        <Time :time="timeConvert(amsg.msgTime)"/>
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
                        <Time :time="timeConvert(ahismsg.msgTime)"/>
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

        <!-- 反馈bug -->
        <Modal
                footer-hide
                title="反馈"
                v-model="bug">
            <div>反馈类型</div>
            <RadioGroup v-model="bugtype">
                <Radio label="bug">
                    <Icon type="md-alert" size="15"></Icon>
                    <span>Bug</span>
                </Radio>
                <Radio label="need">
                    <Icon type="ios-hand" size="15"></Icon>
                    <span>没有我想要的</span>
                </Radio>
                <Radio label="advice">
                    <Icon type="ios-information-circle" size="15"></Icon>
                    <span>指正/建议</span>
                </Radio>
            </RadioGroup>
            <div>反馈内容</div>
            <div class="bug-div">
                <Input v-model="bugcontent" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                       placeholder="Enter something..."/>
            </div>
            <div class="bug-div">
                <Button :loading="loading" long type="primary" @click="sendfeedback">提交反馈</Button>
            </div>
        </Modal>

        <BackTop class="back-2-top"></BackTop>
    </div>
</template>

<script>
    import axios from 'axios'
    import Stomp from 'stompjs'
    import {formatDate} from '@/assets/js/date.js'
    import MyInfo from '@/pages/index/home/components/myinfo.vue'
    export default {
        name: "home",
        components: {
            MyInfo
        },
        data() {
            return {
                bug: false,
                bugtype: '',
                bugcontent: '',
                loading: false,
                catalog: false,
                navbarTheme: false,
                myinfo: [],
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
                },
            };
        },
        created() {
            const info = localStorage.getItem('wecoding_login_info');
            let jsonInfo = JSON.parse(info);
            if (jsonInfo) {
                this.hasLogin = true;
                this.myinfo.stuName = jsonInfo.stuName;
                this.myinfo.stuImg = jsonInfo.stuImg;

                const id = jsonInfo.username;
                const email = jsonInfo.stuEmail;
                this.formChPass.id = id;
                this.formChPass.stuEmail = email;

                if (this.$store.state.passStatus === 0) {
                    this.checkFirstLogin(id);
                }
                const auth = jsonInfo.authorities;

                if (auth.length === 2 || auth.length === 3) {
                    this.hasAdminRole = true;
                }
                this.connectMsgWsServer(this.id)
            } else {
                this.connectMsgWsServer('')
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
                if (id !== '' && !this.$store.state.wsStatus) {
                    // var ws = new WebSocket('wss://www.niter.work/websocket/ws');
                    var ws = new WebSocket('ws://39.106.85.24:15674/ws');
                    var client = Stomp.over(ws);
                    var onConnect = function () {
                        if (ws.readyState == 1) {
                            _self.$store.commit('setWsStatus', true);
                        }
                        client.subscribe('/exchange/wecoding.fanout/', function (msg) {
                            // console.log(msg);
                            let jsonMsg = JSON.parse(msg.body);
                            _self.msgcount += 1;
                            _self.msglist.push(jsonMsg);
                            _self.$Notice.info({
                                title: '收到一条' + jsonMsg.msgType + '消息',
                                desc: jsonMsg.msgHead,
                            });
                        })
                    };
                    var onError = function () {
                        // _self.$Message.error('消息服务器连接失败!')
                        console.log('消息服务器连接失败...')
                    };
                    client.connect('guest', 'guest', onConnect, onError, '/');
                    client.debug = null;
                } else {
                    return;
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
                if (top >= 520) {
                    this.navbarTheme = true;
                } else {
                    this.navbarTheme = false;
                }

                let list = document.getElementsByClassName('device-height');
            },
            sendfeedback() {
                if (this.bugtype === '' || this.bugcontent === '')
                    return;
                this.loading = true;
                let _self = this;
                axios
                    .post('/api/sendmail/feedback', {
                        type: this.bugtype,
                        content: this.bugcontent
                    })
                    .then(res => {
                        if (res) {
                            _self.$Message.success('反馈成功，感谢支持');
                            _self.loading = false;
                            _self.bug = false;
                        }
                    })
            },
            // 把日期字符串转换为时间戳
            timeConvert(timeStr) {
                return (new Date(timeStr)).getTime();;
            },
        },
        computed: {
            revmsglist() {
                return this.msglist.reverse();
            },
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
        },
    };
</script>
<style scoped>
@media screen and (max-width: 770px) {
    .cs-bg-head {
        text-align: center;
    }
    .compus {
        height: 600px;
    }
    .compus,
    .compus-width,
    .compus-buttom-div,
    .compus-cover {
        width: auto;
    }
    .compus-cover {
        padding: 90px 0;
    }
    .nit-head {
        text-align: center;
        font-size: 15px;
    }
    .compus-entry-div {
        width: 100%;
    }
    .compus-buttom-entry {
        text-align: center;
    }
    .friend-link-col {
        margin-top: 15px;
    }
    .xs-guide-item {
        width: 200px;
        margin: 0 auto;
    }
    .btn-enter {
        margin-top: 40px;
    }
    .compus-little-squa {
        margin: 10px auto;
    }
    .back-2-top {
        display: none;
    }
    .dark-bg-navbar {
        width: 100%;
        background: rgba(85,106,137,1);
    }
    .nav-logo10 {
        margin-top: 10px;
        width: 40px;
    }
    .navbar ul li {
        padding: 0 10px;
    }
    .navbar {
        padding: 0;
    }
    .navbar, .dark-bg-navbar {
        height: 60px;
        line-height: 60px;
    }
    .other-box,
    .qq-text,
    .mirrorRotateVertical,
    .compus-squareness,
    .md-navbar,
    .compus-buttom-right {
        display: none;
    }
    .compus-buttom-div {
        margin: 0 auto;
        width: fit-content;
    }
}

@media screen and (min-width: 770px) {
    .navbar ul li {
        padding: 0 50px;
    }
    .course-block,
    .xs-navbar,
    .center-logo {
        display: none;
    }
}
    
.compus-ayellow:hover {
    color: #e9bf15;
}
</style>