<template>
<div class="person-bg">
    <div class="person-board">
        <Row>
            <Col :md="{span: 4}" style="min-height: 600px;border-right: 1px solid #e4e4e8;">
                <div style="height: 215px;border-bottom: 1px solid #e4e4e8;">
                    <div class="demo-upload-list">
                        <img v-if="myinfo.stuImg !== '' && myinfo.stuImg  !== null && myinfo.stuImg !== undefined"
                            style="width: 100%;"
                            :src="upImgBase + myinfo.stuBigImg"
                            alt="用户头像"
                        />
                        <Avatar v-else shape="square" icon="ios-person" size="215"/>
                        <div class="demo-upload-list-cover">
                            <Icon title="查看大图" type="md-qr-scanner" v-if="myinfo.stuImg !== null" @click.native="handleView" size="50"></Icon>
                            <Icon title="上传头像" type="ios-cloud-upload" @click.native="uploadHead" size="50"></Icon>
                        </div>
                    </div>
                    
                </div>

                <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                    <Menu
                        width="310"
                        :active-name="choose"
                        @on-select="path2item"
                        style="min-height: 331px;text-align: center;margin-top: 20px;"
                    >
                        <MenuItem name="/person/info">用户信息</MenuItem>
                        <MenuItem name="/person/account">账户信息</MenuItem>
                        <MenuItem name="/person/msg">消息中心</MenuItem>
                        <MenuItem name="/person/pay">交纳会费</MenuItem>
                        <MenuItem name="/admin/overview" v-if="role">进入后台</MenuItem>
                    </Menu>
                </ul>
            </Col>
            <Col :md="{span: 20}">
                <div class="person-bg-head">
                    {{choose === '/person/info' ? '用户信息 userinfo' : choose === '/person/account' ? '账户信息' : choose === '/person/msg' ? '消息中心' : '交纳会费'}}
                </div>
                <router-view></router-view>
            </Col>
        </Row>
    </div>

    <!-- 查看大图     -->
    <Modal footer-hide v-model="visible" class="handle-view-modal">
        <img :src="upImgBase + myinfo.stuBigImg"
                v-if="myinfo.stuImg !== '' && myinfo.stuImg  !== null && myinfo.stuImg !== undefined" style="width: 100%;height: 100%">
        <Avatar v-else shape="square" icon="ios-person" size="520"/>
    </Modal>

    <!-- 上传头像 -->
    <UpHead :visibleup="visibleup" @updateHead="changeHeadImg" @visiblechange="visiblechange"/>
    
</div>
</template>

<script>
import axios from "axios";
import UpHead from "@/pages/index/person/components/uphead.vue"
export default {
    name: "person",
    components: {
        UpHead
    },
    data() {
        return {
            myinfo: {},
            choose: '',
            role: false,
            visible: false,
            visibleup: false,
        };
    },
    created() {
        this.choose = this.$route.path;
        this.getCurrentInfo();

        const info = localStorage.getItem('wecoding_login_info');
        const auth = JSON.parse(info).authorities;
        if (auth.length === 2) {
            this.role = true;
        }
    },
    methods: {
        getCurrentInfo() {
            let _self = this;
            axios.get("/api/stu/current").then(res => {
                if (res) {
                    _self.hasLogin = true;
                    _self.myinfo = res.data;
                    _self.$store.commit('setUserInfo', res.data);
                    // console.log(_self.$store.state.userInfo);
                }
            });
        },
        path2item(name) {
            this.choose = name;
            this.$router.push(name);
        },
        // 显示头像大图
        handleView() {
            this.visible = true;
        },
        // 显示上传头像窗口
        uploadHead() {
            this.visibleup = true;
        },
        // 上传完成头像后更新person页面的头像
        changeHeadImg(res) {
            this.myinfo.stuBigImg = res;
        },
        visiblechange(visible) {
            this.visibleup = visible;
        }
    }
};
</script>

<style scoped>

.person-board {
    width: 1300px;
    margin: 0 auto;
    height: 600px;
    box-shadow: 0 8px 20px rgba(96, 118, 243, 0.2);
    -moz-box-shadow: 0 8px 20px rgba(96, 118, 243, 0.2);
    -webkit-box-shadow: 0 8px 20px rgba(96, 118, 243, 0.2);
    border-radius: 5px;
    background: #fff;
}

.ivu-menu-item {
    font-size: 16px;
}

.ivu-menu-vertical.ivu-menu-light:after {
    width: 0px;
}

.person-bg-head {
    border-bottom: 1px solid #e4e4e8;padding: 25px;font-size: 30px;
}

.demo-upload-list {
    display: inline-block;
    width: 215px;
    height: 215px;
    text-align: center;
    line-height: 215px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
