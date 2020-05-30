<template>
    <div class="spend">
        <Row>
            <div class="head" style="margin-bottom: 10px;border-bottom: 1px solid #dcdee2;">
                <Menu mode="horizontal" @on-select="back2home">
                    <MenuItem name="/home" style="color: #2d8cf0">
                        <span>返回主页</span>
                    </MenuItem>
                </Menu>
            </div>
        </Row>
        <Row>
            <Col :md="{span:4}" :xs="{span:24}">
                <div class="financial-head">协会财务公示</div>
                <div @click="displayBlock(item, index)" v-for="(item,index) in spend" :key="item.id">
                    <Card dis-hover :class="clickIndex === index ? 'card-no-right-border' : ''">
                        <Timeline>
                            <TimelineItem :color="item.type === '+' ? 'green' : 'red'">
                                <p class="time">{{ item.time | formatDate }}</p>
                                <Row>
                                    <Col span="16">
                                        <p class="content">
                                            {{item.desc}} <br>
                                            <Icon custom="iconfont icon-renminbi" size="23"></Icon>
                                            {{ `${item.number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                        </p>
                                    </Col>
                                    <Col span="8">
                                        <span :style="'font-size: 26px;font-weight: bold;color: '+ (item.type === '+' ? '#00CD66' : '#EE4000')">
                                            {{item.type + `${item.number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</span>
                                    </Col>
                                </Row>
                            </TimelineItem>
                        </Timeline>
                        <div>点击查看明细</div>
                    </Card>
                </div>
                <div style="width:1000px;height: 800px;" slot="content"></div>
                <div style="text-align: center;margin-top: 10px;">
                    <Page :total="total" :current="page" :page-size="5" @on-change="changePage" size="small"/>
                </div>
            </Col>
            <Col v-show="rightBlock" :md="{span:20}" :xs="{span:24}" style="background: #fff;">
                <Row>
                    <div class="financial-head">财务明细：{{ hoverSpend.desc }}</div>
                </Row>
                <Row>
                    <div
                        title="关闭"
                        @click="rightBlock = false;clickIndex = -1"
                        style="text-align: right;cursor: pointer;">
                        <Icon type="md-close" size="25"/>
                    </div>
                </Row>
                <Row class="row-money-top" style="">
                    <div class="money-content">
                        <div class="money-small-title">收支时间:</div>
                        <div class="money-small-content">{{ hoverSpend.time | formatDateTime }}</div>
                        <div class="money-small-title">收支描述:</div>
                        <div class="money-small-content">{{ hoverSpend.desc }}</div>
                        <div class="money-small-title">收支金额:</div>
                        <div class="money-small-content">{{ hoverSpend.type }}{{
                            `${hoverSpend.number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}(元)
                        </div>
                        <div class="money-small-title">上报人:</div>
                        <div class="money-small-content">{{ hoverSpend.name }}</div>
                        <div class="money-small-title">相关图片:</div>
                        <div class="money-small-content">
                            <img title="放大" class="magnify-img" v-for="(img,index) in hoverSpend.small" :key="index"
                                 :src="'http://39.106.85.24:9000/wecoding/' + img" @click="openBigImg(index)"/>
                        </div>
                        <div class="money-small-title">其他补充:</div>
                        <div style="font-size: 18px;">{{ hoverSpend.others }}</div>
                    </div>
                </Row>
                <!-- <Row type="flex" justify="center">
                    <Button type="error" @click="deleteSpend(hoverSpend.id)">删除这条记录</Button>
                </Row> -->
            </Col>
            <Col v-show="!rightBlock" :md="{span:20}" :xs="{span:24}">
                <Row>
                    <div class="financial-head">收支上报流程</div>
                    <div style="padding: 20px">
                        <Steps :current="current">
                            <Step title="收支信息"></Step>
                            <Step title="相关图片"></Step>
                            <Step title="上报人信息"></Step>
                            <Step title="完成上报"></Step>
                        </Steps>
                    </div>
                </Row>
                <Row class="row-top">
                    <!-- <router-view></router-view> -->
                    <Carousel v-model="current" arrow="never" dots="none" :height="400">
                        <CarouselItem>
                            <div class="demo-carousel">
                                <div class="first step">
                                    <div class="money-title">收支信息</div>
                                    <Form ref="formSpend1" :model="money" label-position="top" :rules="ruleSpend">
                                        <Row>
                                            <Col span="12">
                                                <FormItem label="收入/支出" prop="type">
                                                    <RadioGroup v-model="money.type" type="button">
                                                        <Radio label="+">
                                                            <span>收入</span>
                                                        </Radio>
                                                        <Radio label="-">
                                                            <span>支出</span>
                                                        </Radio>
                                                    </RadioGroup>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="金额" prop="number">
                                                    <InputNumber
                                                            :max="10000"
                                                            v-model="money.number"
                                                            :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                            :parser="value => value.replace(/$s?|(,*)/g, '')">
                                                    </InputNumber>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <FormItem label="收支时间" prop="time">
                                            <DatePicker
                                                    v-model="money.time"
                                                    :editable="false"
                                                    type="datetime"
                                                    format="yyyy-MM-dd HH:mm"
                                                    transfer
                                                    style="width: 100%"
                                                    placeholder="选择时间和日期">
                                            </DatePicker>
                                        </FormItem>
                                        <FormItem label="收支描述" prop="desc">
                                            <Input clearable type="text" v-model="money.desc"
                                                   placeholder="一句话描述"></Input>
                                        </FormItem>
                                        <FormItem label="补充" prop="others">
                                            <Input clearable type="textarea" v-model="money.others"
                                                   placeholder="还有任何这项收支的补充吗">
                                            </Input>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <UpImg @getImg="getImgMethod"/>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <div class="first step">
                                    <div class="money-title">上报人信息</div>
                                    <Form ref="formSpend2" label-position="top" :model="money" :rules="ruleSpend">
                                        <FormItem label="姓名" prop="name">
                                            <Input clearable type="text" v-model="money.name" placeholder="你的名字">
                                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                                            </Input>
                                        </FormItem>
                                        <FormItem label="邮箱" prop="email">
                                            <Input
                                                    clearable
                                                    type="text"
                                                    v-model="money.email"
                                                    placeholder="以便及时的通知你"
                                                    @keyup.enter.native="next()">
                                                <Icon type="ios-mail-outline" slot="prepend"></Icon>
                                            </Input>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <div class="first step">
                                    <div v-if="resultStatus === 1" class="money-title"
                                         style="color: #EE4000;font-size: 30px;">
                                        <Icon type="ios-close-circle-outline" size="40"/>
                                        意外错误
                                    </div>
                                    <div v-else>
                                        <div class="money-title" style="color: #5cb85c">
                                            <Icon type="md-checkmark-circle-outline" size="30"/>
                                            上报成功
                                        </div>
                                        <div class="step3-title">如长时间没有答复,直接QQ联系</div>
                                        <div style="text-align: center;">
                                            <img src="http://39.106.85.24:8999/money_qq.png"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    </Carousel>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <ButtonGroup>
                        <Button v-show="current !== 3" type="primary" @click="previous" :disabled="current === 0">上一步
                        </Button>
                        <Button v-show="current !== 3" :type="current === 2 ? 'default' : 'primary'" @click="next">
                            {{ current === 2 ? '完成' : '下一步' }}
                        </Button>
                    </ButtonGroup>
                </Row>
                <Spin size="large" fix v-if="Listloading">
                    <div class="loader">
                        <svg class="circular" viewBox="25 25 50 50">
                            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5"
                                    stroke-miterlimit="10"></circle>
                        </svg>
                    </div>
                    <span style="font-size: 15px;color: black">正在提交...</span>
                </Spin>
            </Col>
        </Row>
    </div>
</template>
<script>
    import axios from 'axios'
    import UpImg from '@/pages/index/spend/components/upimg.vue'

    export default {
        name: 'spend',
        components: {
            UpImg
        },
        data() {
            return {
                spend: [],
                total: 0,
                page: 1,
                current: 0,
                Listloading: false,
                money: {
                    type: '',
                    time: '',
                    others: '',
                    name: '',
                    number: 0,
                    email: '',
                    small: [],
                    big: [],
                    desc: '',
                },
                ruleSpend: {
                    type: [
                        {required: true, message: '收支是必选项', trigger: 'blur'}
                    ],
                    number: [
                        {required: true, type: 'number', message: '金额不能为空', trigger: 'blur'},
                        {
                            validator: (rule, value, callback) => {
                                if (value < 1) {
                                    callback(new Error('请输入正确的金额'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
                    ],
                    time: [
                        {required: true, message: '必须选择收支时间', pattern: /.+/, trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '简介不能为空', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                },
                resultStatus: 1,
                hoverSpend: {},
                rightBlock: false,
                clickIndex: -1,
            }
        },
        created() {
            this.getAllSpendByPage(this.page, 5);
            let info = this.$store.state.token;
            this.money.name = info.stuName;
            this.money.email = info.stuEmail;

            // 用户访问财务页面给后台发送一个请求记录访问次数
            axios.get("/api/admin/comp/access/spend").then()
        },
        methods: {
            getAllSpendByPage(page, size) {
                let _self = this;
                axios
                    .get('/api/comp/spend', {
                        params: {
                            page: page,
                            size: size
                        },
                    })
                    .then(res => {
                        if (res) {
                            let revlist = res.data.list.reverse();
                            _self.spend = revlist;
                            console.log(res.data);
                            _self.string2list(revlist);
                            _self.total = res.data.total;
                            _self.page = res.data.pageNum;
                            
                        }
                    })
            },
            string2list(list) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].small === '' || list[i].big === '') continue;
                    this.spend[i].small = list[i].small.split(',');
                    this.spend[i].big = list[i].big.split(',');
                }
            },
            displayBlock(spend, index) {
                this.hoverSpend = spend;
                this.rightBlock = true;
                this.clickIndex = index;
            },
            openBigImg(index) {
                window.open('http://39.106.85.24:9000/wecoding/' + this.hoverSpend.big[index])
            },
            getImgMethod(small, big) {
                this.money.small = small;
                this.money.big = big;
            },
            changePage(page) {
                this.getAllSpendByPage(page, 5)
            },
            back2home() {
                this.$router.push('/home');
            },
            next() {
                let _self = this;
                if (this.current === 2) {
                    this.$refs['formSpend1'].validate((valid) => {
                        if (valid) {
                            this.$refs['formSpend2'].validate((valid) => {
                                if (valid) {
                                    this.Listloading = true;
                                    axios
                                        .post('/api/comp/spend', {
                                            type: this.money.type,
                                            time: this.money.time,
                                            others: this.money.others,
                                            name: this.money.name,
                                            number: this.money.number,
                                            email: this.money.email,
                                            desc: this.money.desc,
                                            small: this.money.small.join(','),
                                            big: this.money.big.join(',')
                                        })
                                        .then(res => {
                                            if (res) {
                                                _self.Listloading = false;
                                                _self.current = 3;
                                            }
                                        });
                                    this.resultStatus = 0;
                                } else {
                                    this.$Message.error('上报人信息填写有误!');
                                }
                            })
                        } else {
                            this.$Message.error('基本信息填写有误!');
                            this.current = 0;
                        }
                    });
                    return;
                }
                this.current += 1;
            },
            previous() {
                this.current -= 1;
            }
        },
    }
</script>
<style scoped lang="less">
    @media screen and (max-width: 770px) {
        .step {
            width: 100%;
            margin: auto;
        }

        .row-top {
            padding-top: 0 !important;
        }

        .money-content {
            width: 100%;
            margin: auto
        }

        .row-money-top {
            padding-top: 20px !important;
            padding-bottom: 20px !important;
        }
    }

    .row-money-top {
        padding-top: 100px;
        padding-bottom: 50px;
    }

    .row-top {
        padding-bottom: 20px;
    }

    .step3-title {
        font-size: 17px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
        margin-top: 15px;
    }

    .financial-head {
        text-align: center;
        padding: 20px;
        font-size: 20px;
        font-weight: bold;
        border-bottom: solid @primary-color;
        margin-bottom: 5px;
    }

    .spend {
        padding: 20px;
        overflow: hidden;
    }

    .time {
        font-size: 16px;
        font-weight: bold;
    }

    .content {
        font-size: 14px;
        padding-left: 5px;
    }

    .ivu-card-bordered {
        cursor: pointer;
    }

    .card-no-right-border {
        border-right: 0px;
    }

    .magnify-img {
        cursor: url('http://39.106.85.24:8999/magnify.ico'), auto
    }
</style>
<style>
    .step {
        width: 500px;
        margin: auto;
    }

    .money-title {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
    }

    .money-small-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .money-small-content {
        text-align: right;
        font-size: 18px;
    }

    .money-content {
        width: 500px;
        margin: auto
    }

    .money-content > .money-small-title {
        border-bottom: 1px dashed;
    }

    .money-small-content > img {
        margin: 1px;
    }


    .ivu-spin-fix {
        z-index: 11;
    }

    .circular {
        -webkit-animation: rotate 2s linear infinite;
        animation: rotate 2s linear infinite;
        height: 100%;
        -webkit-transform-origin: center center;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    .loader {
        width: 40px;
        height: 40px;
        position: relative;
        margin: 0 auto;
    }
</style>