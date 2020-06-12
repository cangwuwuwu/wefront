<template>
    <div class="query">
        <Row>
            <div class="head" style="margin-bottom: 10px;border-bottom: 1px solid #dcdee2;">
                <Menu mode="horizontal" @on-select="back2home">
                    <MenuItem name="/home" style="color: #2d8cf0">
                        <span>返回主页</span>
                    </MenuItem>
                    <div style="float: right;padding-right: 20px;">
                        已有 <span style="color: #2d8cf0;font-size: 20px;">{{ count }}</span> 人开通了电量提醒
                    </div>
                </Menu>
            </div>
        </Row>
        <Row type="flex" justify="center" align="middle" style="margin-bottom: 20px;">
            <Col :md="{span:8}" :xs="{span: 22}">
                <div class="query-head">电量不足提醒系统</div>
                <div class="query-head-div" style="margin: 15px 0 10px 0;">订阅成功后，我们将在每天12点帮您查询电量余额，若电量余额不足，便会以邮件的方式通知您。</div>
                <div class="query-head-div" style="color: darkred">1. 若信息填入有误，您将不会收到邮件通知。</div>
                <div class="query-head-div" style="color: darkred">2. 若停电后发现未收到邮件提醒信息，请下方取消订阅后重新开通。</div>
                <div class="query-head-div" style="color: darkred;margin: 0 0 10px;">3. 若提示信息重复录入，则您的室友可能已经开通了订阅。</div>
                <Form ref="formEle" :model="formEle" :rules="ruleEle">
                    <FormItem prop="stuId">
                        <div class="query-head-div">输入你的学号：</div>
                        <Input v-model="formEle.stuId" size="large" placeholder="Please enter student ID" />
                    </FormItem>
                    <Row>
                        <Col :md="{span:8}" :xs="{span: 24}">
                            <FormItem prop="stuBuild">
                                <div class="query-head-div">选择楼栋：</div>
                                <Select v-model="formEle.stuBuild" size="large" filterable>
                                    <Option  v-for="item in buildList" :value="item.name + '_' + item.value" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col :md="{span:14, offset: 2}" :xs="{span: 24}">
                            <FormItem prop="stuRoom">
                                <div class="query-head-div">填写宿舍号（请写全 如： 7axxx）：</div>
                                <Input v-model="formEle.stuRoom" @blur.native.capture="checkRoom" size="large" placeholder="Please enter student Room"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <div class="query-head-div">当前剩余电量：<span style="float: right;color: red" v-show="currentNumber !== 0">{{ currentNumber }}</span></div>
                    </FormItem>
                    <FormItem prop="stuEmail">
                        <div class="query-head-div">输入你的邮箱（建议使用qq邮箱以便及时收到通知）：</div>
                        <AutoComplete
                                style="text-align: left;"
                                transfer
                                size="large"
                                v-model="formEle.stuEmail"
                                @on-search="emailSearch"
                                placeholder="Please enter student Email">
                            <Option v-for="item in emailist" :value="item" :key="item">{{ item }}</Option>
                        </AutoComplete>
                    </FormItem>
                    <FormItem style="text-align: center;margin-top: 20px;">
                        <Button type="primary" size="large" @click="submitBuildRoom('formEle')">订阅提醒</Button>
                    </FormItem>
                </Form>

                <div class="query-head">关闭通知</div>
                <div class="query-head-div" style="margin: 15px 0 10px 0;">关闭后您依然可以重新订阅</div>
                <Row>
                    <div class="query-head-div">输入你的学号：</div>
                    <Input v-model="formEle.stuId" size="large" placeholder="Please enter student ID" />
                </Row>
                <Row style="text-align: center;margin-top: 20px;">
                    <Button type="primary" size="large" @click="stopEleNotice">取消订阅</Button>
                </Row>
            </Col>
            <Col :md="{span:1, offset:1}" :xs="{span: 22}">
                <div class="qr-code">
                    <Icon type="ios-finger-print" size="35" />
                </div>
                <Poptip trigger="hover" placement="right">
                    <div slot="title">
                       <img :src="manualImgBase + 'asqun.jpg'" alt="">
                    </div>
                    <div slot="content" style="text-align: center">
                       扫码加入计算机协会
                    </div>
                    <div class="qr-code">
                        <Icon custom="iconfont icon-erweima" size="35" />
                    </div>
                </Poptip>
                <!-- <Poptip trigger="hover" placement="right">
                    <div slot="title">
                       <img src="https://www.niter.work/images/asqun.jpg" alt="">
                    </div>
                    <div slot="content" style="text-align: center">
                       云端工作室公众号
                    </div> -->
                    <div class="qr-code">
                        <Icon custom="iconfont icon-weixingongzhonghao" size="28" />
                    </div>
                <!-- </Poptip> -->
            </Col>
            <!-- <Col :md="{span:1, offset:1}">
                    
            </Col> -->
        </Row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'query',
    data() {
        const roomFormatCheck = (rule, value, callback) => {
            let name = this.formEle.stuBuild.split('_')[0];
            if (!value.includes(name.toLowerCase()) || value.length < 5) {
                callback(new Error('宿舍号格式错误'));
            } else {
                callback();
            }
        };
        return {
            count: 0,
            formEle: {
                stuId: '',
                stuEmail: '',
                stuBuild: '',
                stuRoom: '',
            },
            ruleEle: {
                stuId: [
                    {required: true, message: '学号不能为空!', trigger: 'blur'},
                    {type: 'string', pattern: /^201\d{7}$/, message: '学号格式错误!', trigger: 'blur'},
                    // {validator: IdUsedCheck, trigger: 'blur'},
                ],
                stuEmail: [
                    {required: true, message: '邮箱不能为空!', trigger: 'blur'},
                    {type: 'email', message: '邮箱格式错误!', trigger: 'change'}
                ],
                stuBuild: [
                    {required: true, message: '楼栋不能为空!'}
                ],
                stuRoom: [
                    {required: true, message: '宿舍号不能为空!', trigger: 'blur'},
                    {validator: roomFormatCheck, trigger: 'blur'}
                ]
            },
            buildList: [],
            emailist: [],
            currentNumber: 0,
        }
    },
    created() {
        this.initRoomInfo();
        this.getCount();

        // 用户访问电费提醒页面给后台发送一个请求记录访问次数
        axios.get("/api/admin/comp/access/electric").then()
    },
    methods: {
        initRoomInfo() {
            let _self = this;
            axios
                .get('/api/ele')
                .then(res => {
                    if (res) {
                        _self.buildList = res.data;
                    }
                })
        },
        getCount() {
            let _self = this;
            axios
                .get('/api/ele/count')
                .then(res => {
                    if (res) {
                        _self.count = res.data;
                    }
                })
        },
        checkRoom() {
            let _self = this;
            if (this.formEle.stuBuild === '' || this.formEle.stuRoom === '') return ;
            let formData = new FormData();
            formData.append('buildname', this.formEle.stuBuild);
            formData.append('roomname', this.formEle.stuRoom);
            axios
                .post('/api/ele/nowCheck', formData)
                .then(res => {
                    if (res) {
                        _self.currentNumber = res.data
                    }
                })
        },
        submitBuildRoom(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let _self = this;
                    let formData = new FormData();
                    formData.append('stuId', this.formEle.stuId);
                    formData.append('stuEmail', this.formEle.stuEmail);
                    formData.append('stuRoom', this.formEle.stuRoom.toLowerCase());
                    formData.append('stuBuild', this.formEle.stuBuild);
                    axios
                        .post('/api/ele/addAccount', formData)
                        .then(res => {
                            if (res) {
                                _self.$Message.success('订阅成功');
                                _self.$router.replace({
                                    path: '/refresh',
                                    query: {
                                        t: Date.now()
                                    }
                                })
                            }
                        })
                }
            })
        },
        emailSearch(value) {
            this.emailist = !value || value.includes('@') ? [] : [
                value + '@qq.com',
                value + '@sina.com',
                value + '@163.com',
                value + '@gmail.com',
                value + '@foxmail.com'
            ];
        },
        back2home() {
            this.$router.push('/home');
        },
        stopEleNotice() {
            let _self = this;
            let id = this.formEle.stuId;
            if (id !== '') {
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>确定要取消订阅吗？</p>',
                    okText: '确定',
                    cancelText: '关闭',
                    onOk: () => {
                        axios
                            .delete('/api/ele/deleteAccount/' + id)
                            .then(res => {
                                if (res) {
                                    _self.$Message.success('取消成功')
                                }
                            })
                    }
                });
            }
        }
    },
}
</script>

<style scoped lang="less">
@media screen and (max-width: 770px) {
    .cancleRow {
        height: 600px!important;
    }
    .qr-code {
        display: inline-block;
        margin: 10px 0 20px 60px;
        vertical-align:middle
    }
}
.query-head {
    margin-top: 10px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid @light-gray-color;
}
.query-head-div {
    font-size: 16px;
}
.cancleRow {
    height: 400px;
}
.qr-code {
    width: 40px;
    height: 40px;
    border: 1px solid @light-gray-color;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
    text-align: center;
    padding-top: 2px;
    transition: .5s;
    opacity: .4;
}
.qr-code:hover {
    transform:rotate(180deg);
    opacity: 1;
    color: @primary-color;
}
</style>