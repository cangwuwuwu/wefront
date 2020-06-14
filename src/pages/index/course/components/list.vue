<template>
    <div class="list">
        <Row>
            <div class="head head-line">
                <div class="row-content">
                <Menu mode="horizontal" @on-select="back2home">
                    <Row type="flex" align="middle">
                        <Col :md="{span: 7}" :xs="{span: 8}">
                            <MenuItem name="/home" style="color: #2d8cf0">
                                <span>返回主页</span>
                            </MenuItem>
                        </Col>
                        <Col :md="{span: 17}" :xs="{span: 14}">
                            <Input search enter-button="搜索" style="width: 100%;max-width: 500px;" placeholder="搜索课程"/>
                        </Col>
                    </Row>
                </Menu>

                </div>
            </div>
        </Row>
        <Row class="row-content">
            <Col :md="{span: 17, offset: 0}" :xs="{span: 22, offset: 1}">
                <div class="head head-line list-content">
                    全部课程  <Icon type="ios-arrow-forward" />  {{ showIndex === 1 ? 'IT·互联网' : showIndex === 2 ? '设计·创作' : showIndex === 3 ? '其他' : '' }} 
                </div>
                <div class="head list-content">
                    <span style="color: #a0a0a0;">课程分类</span>
                    <span style="float: right;cursor: pointer" title="展开/收起" @click="displayTypeList = !displayTypeList">
                        <span>{{ displayTypeList === true ? '展开' : '收起' }}</span>
                        <Icon :type="displayTypeList === false ? 'ios-arrow-up' : 'ios-arrow-down'"/>
                    </span>
                </div>
                <div class="head head-line list-content" :class="{'dismis': displayTypeList}" style="height: 204px;">
                    <div @click="selectCourseType(0)" :class="{'list-item-active': showIndex == 0}">全部</div>
                    <div @click="selectCourseType(1)" :class="{'list-item-active': showIndex == 1}">IT·互联网</div>
                    <div @click="selectCourseType(2)" :class="{'list-item-active': showIndex == 2}">设计·创作</div>
                    <div @click="selectCourseType(3)" :class="{'list-item-active': showIndex == 3}">其他</div>
                </div>
                <div class="head head-line list-content">
                    课程列表
                </div>
                <List item-layout="vertical">
                    <ListItem v-for="(item, index) in choose(showIndex)" :key="item.id">
                        <div @click="courseDetail(item, index)">
                            <ListItemMeta 
                                :avatar="item.avatar" 
                                class="listItem"
                                :title="item.type === 1 ? '[IT·互联网] ' + item.title: item.type === 2 
                                ? '[设计·创作] ' + item.title : '[其他] ' + item.title" 
                                :description="item.host" />
                        </div>
                        {{ item.content }}
                        <template slot="action">
                            <li title="报名人数">
                                <Icon type="ios-contact-outline" /> {{ item.apply }}
                            </li>
                            <li v-if="!item.star.includes(token.stuName)" title="给个好评" @click="star(index, 0)">
                                <Icon type="ios-thumbs-up-outline" /> {{ item.star === null ? 0 :  item.star.split(',').length-1 }}
                            </li>
                            <li v-if="item.star.includes(token.stuName)" title="取消点赞" @click="star(index, 1)">
                                <Icon type="ios-thumbs-up" /> {{ item.star.split(',').length-1 }}
                            </li>
                            <li title="讨论">
                                <Icon type="ios-chatbubbles-outline" /> 0
                            </li>
                            <li title="活动地点">
                                <Icon type="ios-pin-outline" /> {{ item.position }}
                            </li>
                            <li title="活动时间">
                                <Icon type="ios-clock-outline" /> {{ item.time }}
                            </li>
                        </template>
                        <template slot="extra">
                            <img :src="item.poster" style="width: 280px">
                        </template>
                    </ListItem>
                </List>
                <Row type="flex" justify="center">
                    <Col style="margin: 20px;">
                        <Page :page-size="size" :total="total" show-elevator @on-change="changePage"/>
                    </Col>
                </Row>
            </Col>
            <Col :md="{span: 6, offset: 1}" :xs="{span: 24}">
                <div style="background: #f7f8f9;">
                    <div class="head head-line list-content" style="padding:0 10px;">
                        推荐网课
                    </div>
                    <div class="recommend-class" v-for="(item, index) in otherClass" :key="index">
                        <img :src="item.resWebPoster" style="width: 100%">
                        <div style="font-size: 16px;margin: 3px">{{ item.resWebName }}</div>
                        <div style="font-size: 13px;margin: 3px;color: rgb(0, 0, 0, 0.45)">{{ item.resWebDescribe }}</div>
                        <div>
                            <Icon type="logo-youtube" title="播放量"/> {{ item.resWebNum }} 
                            <div style="float: right"><div class="recommend-go-url" @click="openWebClass(item, index)">点此前往</div></div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal 
            footer-hide 
            width="1200" 
            v-model="seeCourseInfo" 
            class-name="vertical-center-modal" 
            :z-index="899"
            :mask-closable="false">
            <Row>
                <Col :md="{span: 18}">
                    <img style="width: 100%" :src="chooseCourse.poster" alt="课程海报">
                    
                </Col>
                <Col :md="{span: 6}">
                    <div class="detail">
                        <div class="detail-info">举办单位</div>
                        <img :src="chooseCourse.avatar" alt="举办单位">
                        <div class="detail-info">单位简介</div>
                        <div class="detail-info">活动简介</div>
                        <div>{{ chooseCourse.content }}</div>
                        <div class="detail-info">活动地点</div>
                        <div>{{ chooseCourse.position }}</div>
                        <div class="detail-info">活动时间</div>
                        <div>{{ chooseCourse.time }}</div>
                    </div>
                </Col>
            </Row>
            <Row style="border-bottom: 1px solid #dcdee2">
                <Col :md="{span: 9}">
                    <div style="font-size: 20px;font-weight: bold;">
                        {{ chooseCourse.type === 1 ? '[IT·互联网] ' + chooseCourse.title: chooseCourse.type === 2 ? '[设计·创作] ' + chooseCourse.title : '[其他] ' + chooseCourse.title }}
                        <span style="color: #ff4f23">免费</span>
                    </div>
                    <div style="margin: 10px;">
                        <span style="margin-right: 42px;">
                            点赞人数&nbsp;&nbsp;&nbsp;&nbsp;  {{ chooseCourse.star === null||chooseCourse.star === undefined ? 0 :  chooseCourse.star.split(',').length-1 }}
                        </span>
                        <span style="margin-right: 42px;">
                            评论数量&nbsp;&nbsp;&nbsp;&nbsp;  0
                        </span>
                    </div>
                </Col>
                <Col :md="{span: 9}">
                    <div style="line-height: 70px;">
                        已报名&nbsp;&nbsp;&nbsp;&nbsp; 
                        <Avatar 
                            v-for="(apply, index) in applyList" 
                            v-show="index < 8" 
                            :src="apply.head === '' ? '' : upImgBase + apply.head" 
                            :key="index" 
                            size="large"
                            style="background-color: #87d068">
                            {{ apply.name }}
                        </Avatar>
                        <Avatar v-if="applyList.length > 7" size="large" >+{{ applyList.length - 8 }}</Avatar>
                    </div>
                </Col>
                <Col :md="{span: 6}">
                    <Button 
                        type="primary" 
                        class="apply-btn" 
                        @click="apply(chooseCourse)" 
                        :disabled="isApplied">
                        {{ isApplied ? '您已报名' : '马上报名' }}
                    </Button>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'list',
    data() {
        return {
            token: {},
            showIndex: 0,
            courseList: [],
            otherClass: [],
            applyList: [],
            displayTypeList: true,
            page: 1,
            size: 5,
            total: 0,
            seeCourseInfo: false,
            chooseCourse: {
                apply: []
            },
            chooseIndex: -1,
        }
    },
    created() {
        this.findAllCourseList();
        this.token = this.$store.state.token;
    },
    computed: {
        isApplied() {
            let status = false;
            this.applyList.forEach((value, index, arr) => {
                if (value.stuId === this.token.username) {
                    status = true;
                }
            })
            return status;
        }
    },
    methods: {
        findAllCourseList() {
            let _self = this;
            axios
                .get('/api/course', {
                    params: {
                        page: this.page,
                        size: this.size,
                    }
                })
                .then(res => {
                    if (res) {
                        let _data = res.data.courseList;
                        // console.log(res.data)
                        _self.courseList = _data.list;
                        _self.total = _data.total;

                        let i = 0;
                        let threeArr = [];
                        while(i++ < 3) {
                            threeArr.push(_self.arrRandom(res.data.recommend))
                        }
                        _self.otherClass = threeArr;
                    }
                })
        },
        back2home() {
            this.$router.push('/home');
        },
        changePage(page) {
            this.page = page;
            this.findAllCourseList();
        },
        courseDetail(course, index) {
            let _self = this;
            this.seeCourseInfo = true;
            this.chooseCourse = course;
            this.chooseIndex = index;
            axios
                .get('/api/course/apply/' + course.id)
                .then(res => {
                    if (res) {
                        _self.applyList = res.data;
                    }
                })
        },
        selectCourseType(num) {
            this.showIndex = num;
        },
        choose(type) {
            if (type === 0) {
                return this.courseList;
            }
            return this.courseList.filter(course => {
                if (type === course.type) {
                    return course;
                }
            });
        },
        star(index, type) {
            let starList = this.courseList[index].star.split(',');
            if (type === 0) {
                // 点赞操作
                starList.push(this.token.stuName);
            } else {
                // 取消点赞
                let i = starList.indexOf(this.token.stuName);
                starList.splice(i, 1);
            }
            this.courseList[index].star = starList.join(',');
            this.putRequest(this.courseList[index]);
        },
        apply(course) {
            let _self = this;
            let myinfo = {
                courseId: course.id,
                stuId: this.token.username,
                name: this.token.stuName,
                head: this.token.stuImg,
            }

            axios
                .post('/api/course/apply', myinfo)
                .then(res => {
                    if (res) {
                        course.apply++;
                        _self.applyList.push(myinfo);
                        _self.$Message['success']({
                            background: true,
                            content: '报名成功，请准时参加活动！'
                        });
                    }
                })
        },
        putRequest(course) {
            axios
                .put('/api/course/star', course)
        },
        arrRandom(arr) {
            let index = Math.floor((Math.random() * arr.length));
            let n = arr.splice(index, 1)[0];
            return n;
        },
        openWebClass(course, index) {
            window.open(course.resWebUrl);
            this.otherClass[index].resWebNum++;
            axios
                .put('/api/course/addPlay/' + course.id)
        }
    },
}
</script>

<style scoped lang="less">
    .dismis {
        height: 0!important;
    }
    .head-line {
        margin-bottom: 10px;
        border-bottom: 1px solid @light-gray-color;
        overflow: hidden;
    }
    .list-content {
        transition: height .8s ease;
        font-size: 16px;
        line-height: 50px;
    }
    .list-content > div {
        cursor: pointer;
        padding-left: 10px;
    }
    .list-content > div:hover {
        background: #eee;
    }
    .list-item-active {
        border-bottom: 3px solid @primary-color;
    }
    .recommend-class {
        margin:10px 0 20px 0;
        padding: 10px;
    }
    .recommend-class:hover {
        border: 1px solid @light-gray-color;
        padding: 9px;
    }
    .recommend-go-url {
        color: #333;
    }
    .recommend-go-url:hover {
        cursor: pointer;
        color: @primary-color;
    }
    .row-content {
        width: 1200px;
        margin: 0 auto;
    }
    @media screen and (max-width: 770px) {
        .row-content {
            width: 100%;
        }
    }
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
    .detail {
        padding-left: 16px;
    }
    .detail-info {
        font-size: 20px;
        font-weight: bold;
        border-bottom: 1px solid @light-gray-color;
        margin: 10px 0 10px 0;
    }
    .apply-btn {
        width: 100%;
        height: 50px;
        font-size: 20px;
        margin-top: 10px;
    }
</style>