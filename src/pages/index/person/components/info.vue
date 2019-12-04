<template>
    <div>
        <div style="padding: 10px;">
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>真实姓名:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">{{ myinfo.stuName }}</Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>民族:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">{{ myinfo.stuNation }}</Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>ID学号:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">{{ myinfo.stuId }}</Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>政治面貌:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">{{ myinfo.stuStatus }}</Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>性别:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">{{ myinfo.stuGender }}</Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>籍贯:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">{{ myinfo.stuArea }}</Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>联系方式:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">{{ myinfo.stuPhone }}</Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>邮箱地址:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">{{ myinfo.stuEmail }}</Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>生日:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">{{ myinfo.stuBirthday | formatDate }}</Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>院系:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">{{ myinfo.stuDept }}</Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>注册日期:</div>
                </Col>
                <Col :md="{span:11}" :xs="{span:17}">{{ myinfo.stuRegistTime | formatDateTime }}</Col>
                <Col class="person-info-col" :md="{span:3}" :xs="{span:7}">
                    <div>班级:</div>
                </Col>
                <Col class="person-info-col" :md="{span:6}" :xs="{span:17}">{{ myinfo.stuClass }}</Col>
            </Row>
            <Row class="person-info-row">
                <Col :md="{span:3}" :xs="{span:7}">
                    <div>个人简介:</div>
                </Col>
                <Col :md="{span:21}" :xs="{span:17}">{{ myinfo.stuInfo }}</Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    name: "info",
    data() {
        return {
            myinfo: {},
        };
    },
    computed: {
        getUserInfo() {
            return this.$store.state.userInfo;
        }
    },
    //监听执行
    watch: {
        getUserInfo(val) {
            this.myinfo = val;
        }
    }
};
</script>

<style scoped>
@media screen and (max-width: 700px) {
    .person-info-col {
        padding-top: 20px;
    }

    .person-info-row {
        padding: 10px !important;
    }
}

.cover-head {
    padding-bottom: 10px;
    font-size: 40px;
}

.cover >>> .user-list-col {
    padding: 8px;
    text-align: right;
}

.cover >>> .ivu-card {
    cursor: pointer;
    border-radius: 10px;
}

.cover >>> .my-0 {
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.cover >>> .ivu-spin-fix {
    z-index: 11;
}

.head-area {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    box-shadow: -1px 6px 4px #333333;
}

.anonymity-head {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    font-size: 50px;
    text-align: center;
    padding-top: 20px;
}

.person-info-row {
    padding: 20px;
    font-size: 14px;
}
</style>