<template>
    <div class="signup">
        <Row type="flex" justify="center" align="middle" style="height: 700px">
            <Col :md="{span:10}" :xs="{span:22}">
                <div class="cover-head">{{ $t('index.signupHead') }}</div>
                <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                    <FormItem :label="$t('index.stuId')" prop="stuId">
                        <Input v-model="formItem.stuId" icon="ios-key-outline" :placeholder="$t('index.NITstuId')"></Input>
                    </FormItem>
                    <Row>
                        <Col :md="{span:12}" :xs="{span:24}">
                            <FormItem :label="$t('index.stuName')" prop="stuName">
                                <Input v-model="formItem.stuName" icon="ios-person-outline" :placeholder="$t('index.stuName')"></Input>
                            </FormItem>
                        </Col>
                        <Col :md="{span:12}" :xs="{span:24}">
                            <FormItem :label="$t('index.PoliticsStatus')" prop="stuStatus">
                                <Select v-model="formItem.stuStatus" :placeholder="$t('index.chooseStatus')">
                                    <Option
                                            v-for="item in statusList"
                                            :value="item.value" :key="item.value">{{ item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :md="{span:10}" :xs="{span:24}">
                            <FormItem :label="$t('index.sex')" prop="stuGender">
                                <RadioGroup v-model="formItem.stuGender" type="button" size="large">
                                    <Radio :label="$t('index.boy')"></Radio>
                                    <Radio :label="$t('index.girl')"></Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col :md="{span:14}" :xs="{span:24}">
                            <FormItem :label="$t('index.nation')" prop="stuNation">
                                <Input v-model="formItem.stuNation" :placeholder="$t('index.inputNation')"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :md="{span:12}" :xs="{span:24}">
                            <FormItem :label="$t('index.stuDept')" prop="stuDept">
                                <Cascader :data="depts" v-model="formItem.stuDept" change-on-select></Cascader>
                            </FormItem>
                        </Col>
                        <Col :md="{span:12}" :xs="{span:24}">
                            <FormItem :label="$t('index.stuClass')" prop="stuClass">
                                <Input v-model="formItem.stuClass" :placeholder="$t('index.inputClass')"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem :label="$t('index.stuEmail')" prop="stuEmail">
                        <AutoComplete
                                style="text-align: left;"
                                icon="ios-mail-outline"
                                transfer
                                v-model="formItem.stuEmail"
                                @on-search="emailSearch"
                                :placeholder="$t('index.email')">
                            <Option v-for="item in emailist" :value="item" :key="item">{{ item }}</Option>
                        </AutoComplete>
                    </FormItem>
                    <FormItem :label="$t('index.stuPhone')" prop="stuPhone">
                        <Input v-model="formItem.stuPhone" icon="ios-call-outline" :placeholder="$t('index.phone')"></Input>
                    </FormItem>
                    <FormItem :label="$t('index.stuInfo')" prop="stuInfo">
                        <Input
                                v-model="formItem.stuInfo"
                                type="textarea"
                                :autosize="{minRows: 2,maxRows: 5}"
                                :placeholder="$t('index.info')">
                        </Input>
                    </FormItem>
                    <FormItem class="left-from-item">
                        <Button type="primary" :loading="loading" @click="Submit('formItem')">{{ $t('index.submit') }}</Button>
                        <Button style="margin-left: 8px" @click="Reset('formItem')">{{ $t('index.reset') }}</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
    import axios from 'axios'
    import {formatDate} from '@/assets/js/date.js'

    export default {
        name: "signup",
        data() {
            const IdUsedCheck = (rule, value, callback) => {
                this.checkId(value).then(result => {
                    if (result.data === 1) callback(new Error('该用户已存在'));
                    else callback();
                })
            };
            return {
                formItem: {
                    stuId: '',
                    stuName: '',
                    stuGender: '男',
                    stuDept: [],
                    stuEmail: '',
                    stuPhone: '',   // 联系方式
                    stuInfo: '',    // 简介
                    stuNation: '', // 民族
                    stuStatus: '', // 政治面貌
                },
                emailist: [],
                ruleValidate: {
                    stuId: [
                        {required: true, message: '学号不能为空!', trigger: 'blur'},
                        {type: 'string', pattern: /^201\d{7}$/, message: '学号格式错误!', trigger: 'blur'},
                        {validator: IdUsedCheck, trigger: 'blur'},
                    ],
                    stuName: [
                        {required: true, message: '姓名不能为空!', trigger: 'blur'},
                        {max: 8, message: '姓名最大8位', trigger: 'blur'}
                    ],
                    stuDept: [
                        {required: true, message: '院系和专业不能为空!'},
                    ],
                    stuStatus: [
                        {required: true, message: '政治面貌不能为空!'}
                    ],
                    stuNation: [
                        {required: true, message: '民族不能为空!', trigger: 'blur'}
                    ],
                    stuClass: [
                        {required: true, message: '所在班级不能为空', trigger: 'blur'}
                    ],
                    stuEmail: [
                        {required: true, message: '邮箱不能为空!', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式错误!', trigger: 'change'}
                    ],
                    stuPhone: [
                        {required: true, message: '电话不能为空!', trigger: 'blur'},
                        {type: 'string', pattern: /^1[3456789]\d{9}$/, message: '电话格式错误!', trigger: 'blur'}
                    ],
                    stuInfo: [
                        {required: false},
                        {max: 200, message: '最多只能输入两百个字符!', trigger: 'change'}
                    ]
                },
                loading: false,
                statusList: [
                    {
                        value: '共青团员',
                        label: '共青团员'
                    },
                    {
                        value: '群众',
                        label: '群众'
                    },
                    {
                        value: '中共党员',
                        label: '中共党员'
                    },
                    {
                        value: '预备党员',
                        label: '预备党员'
                    },
                    {
                        value: '入党积极分子',
                        label: '入党积极分子'
                    },

                ],
                depts: [
                    {
                        label: '信息工程学院',
                        value: '信息工程学院',
                        children: [
                            {
                                dept: '信息工程学院',
                                value: '计算机类',
                                label: '计算机类'
                            },
                            {
                                dept: '信息工程学院',
                                value: '信息管理',
                                label: '信息管理'
                            },
                            {
                                dept: '信息工程学院',
                                value: '电子信息工程',
                                label: '电子信息工程'
                            },
                            {
                                dept: '信息工程学院',
                                value: '通信工程',
                                label: '通信工程'
                            },
                            {
                                dept: '信息工程学院',
                                value: '数据科学与大数据技术',
                                label: '数据科学与大数据技术'
                            },
                        ]
                    },
                    {
                        label: '外国语学院',
                        value: '外国语学院',
                        children: [
                            {
                                dept: '外国语学院',
                                value: '英语',
                                label: '英语'
                            },
                            {
                                dept: '外国语学院',
                                value: '法语',
                                label: '法语'
                            },
                            {
                                dept: '外国语学院',
                                value: '翻译',
                                label: '翻译'
                            }
                        ]
                    },
                    {
                        label: '经济贸易学院',
                        value: '经济贸易学院',
                        children: [
                            {
                                dept: '经济贸易学院',
                                value: '国际经济与贸易',
                                label: '国际经济与贸易'
                            },
                            {
                                dept: '经济贸易学院',
                                value: '审计学',
                                label: '审计学'
                            },
                            {
                                dept: '经济贸易学院',
                                value: '投资学',
                                label: '投资学'
                            },
                            {
                                dept: '经济贸易学院',
                                value: '财务管理',
                                label: '财务管理'
                            },
                        ]
                    },
                    {
                        label: '人文与艺术学院',
                        value: '人文与艺术学院',
                        children: [
                            {
                                dept: '人文与艺术学院',
                                value: '视觉传达设计',
                                label: '视觉传达设计'
                            },
                            {
                                dept: '人文与艺术学院',
                                value: '编辑出版学',
                                label: '编辑出版学'
                            },
                            {
                                dept: '人文与艺术学院',
                                value: '广播电视学',
                                label: '广播电视学'
                            },
                            {
                                dept: '人文与艺术学院',
                                value: '产品设计',
                                label: '产品设计'
                            },
                            {
                                dept: '人文与艺术学院',
                                value: '动画',
                                label: '动画'
                            },
                            {
                                dept: '人文与艺术学院',
                                value: '环境设计',
                                label: '环境设计'
                            },
                            {
                                dept: '人文与艺术学院',
                                value: '音乐学',
                                label: '音乐学'
                            },
                            {
                                dept: '人文与艺术学院',
                                value: '数字媒体技术',
                                label: '数字媒体技术'
                            },
                        ]
                    },
                    {
                        label: '理学院',
                        value: '理学院',
                        children: [
                            {
                                dept: '理学院',
                                value: '应用统计学',
                                label: '应用统计学'
                            },

                        ]
                    },
                    {
                        label: '机械与电气工程学院',
                        value: '机械与电气工程学院',
                        children: [
                            {
                                dept: '机械与电气工程学院',
                                value: '电气工程及其自动化',
                                label: '电气工程及其自动化'
                            },
                            {
                                dept: '机械与电气工程学院',
                                value: '能源与动力工程',
                                label: '能源与动力工程'
                            },
                            {
                                dept: '机械与电气工程学院',
                                value: '机械设计制造及其自动化',
                                label: '机械设计制造及其自动化'
                            },
                            {
                                dept: '机械与电气工程学院',
                                value: '材料成型及控制工程',
                                label: '材料成型及控制工程'
                            },
                            {
                                dept: '机械与电气工程学院',
                                value: '车辆工程',
                                label: '车辆工程'
                            },
                            {
                                dept: '机械与电气工程学院',
                                value: '机械电子工程',
                                label: '机械电子工程'
                            },
                            {
                                dept: '机械与电气工程学院',
                                value: '自动化',
                                label: '自动化'
                            },
                        ]
                    },
                    {
                        label: '土木与建筑工程学院',
                        value: '土木与建筑工程学院',
                        children: [
                            {
                                dept: '土木与建筑工程学院',
                                value: '土木工程',
                                label: '土木工程'
                            },
                            {
                                dept: '土木与建筑工程学院',
                                value: '城乡规划',
                                label: '城乡规划'
                            },
                            {
                                dept: '土木与建筑工程学院',
                                value: '给排水科学与工程',
                                label: '给排水科学与工程'
                            },
                            {
                                dept: '土木与建筑工程学院',
                                value: '道路桥梁与渡河工程',
                                label: '道路桥梁与渡河工程'
                            },
                            {
                                dept: '土木与建筑工程学院',
                                value: '建筑学',
                                label: '建筑学'
                            },
                            {
                                dept: '土木与建筑工程学院',
                                value: '工程造价',
                                label: '工程造价'
                            },
                        ]
                    },
                    {
                        label: '水利与生态工程学院',
                        value: '水利与生态工程学院',
                        children: [
                            {
                                dept: '水利与生态工程学院',
                                value: '水利水电工程',
                                label: '水利水电工程'
                            },
                            {
                                dept: '水利与生态工程学院',
                                value: '水文与水资源工程',
                                label: '水文与水资源工程'
                            },
                            {
                                dept: '水利与生态工程学院',
                                value: '港口航道与海岸工程',
                                label: '港口航道与海岸工程'
                            },
                            {
                                dept: '水利与生态工程学院',
                                value: '农业水利工程',
                                label: '农业水利工程'
                            },
                            {
                                dept: '水利与生态工程学院',
                                value: '测绘工程',
                                label: '测绘工程'
                            },
                            {
                                dept: '水利与生态工程学院',
                                value: '水土保持与荒漠化防治',
                                label: '水土保持与荒漠化防治'
                            },
                            {
                                dept: '水利与生态工程学院',
                                value: '园林',
                                label: '园林'
                            },
                            {
                                dept: '水利与生态工程学院',
                                value: '地质工程',
                                label: '地质工程'
                            },
                            {
                                dept: '水利与生态工程学院',
                                value: '风景园林',
                                label: '风景园林'
                            },
                        ]
                    },
                    {
                        label: '工商管理学院',
                        value: '工商管理学院',
                        children: [
                            {
                                dept: '工商管理学院',
                                value: '市场营销',
                                label: '市场营销'
                            },
                            {
                                dept: '工商管理学院',
                                value: '物流管理',
                                label: '物流管理'
                            },
                            {
                                dept: '工商管理学院',
                                value: '电子商务',
                                label: '电子商务'
                            },
                            {
                                dept: '工商管理学院',
                                value: '人力资源管理',
                                label: '人力资源管理'
                            }
                        ]
                    },
                    {
                        label: '国际教育学院',
                        value: '国际教育学院',
                        children: [
                            {
                                dept: '国际教育学院',
                                value: '土木工程',
                                label: '土木工程'
                            },
                            {
                                dept: '国际教育学院',
                                value: '电气工程及其自动化',
                                label: '电气工程及其自动化'
                            }
                        ]
                    },
                    {
                        label: '瑶湖学院',
                        value: '瑶湖学院',
                        children: [
                            {
                                dept: '瑶湖学院',
                                value: '土木工程',
                                label: '土木工程'
                            },
                            {
                                dept: '瑶湖学院',
                                value: '水利水电工程',
                                label: '水利水电工程'
                            }
                        ]
                    },
                    {
                        label: '士官学院',
                        value: '士官学院'
                    },
                ],
            }
        },
        methods: {
            emailSearch(value) {
                this.emailist = !value || value.includes('@') ? [] : [
                    value + '@qq.com',
                    value + '@sina.com',
                    value + '@163.com',
                    value + '@gmail.com',
                    value + '@foxmail.com'
                ];
            },
            Submit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let _self = this;
                        let formData = new FormData();
                        formData.append('stuId', this.formItem.stuId);
                        formData.append('stuName', this.formItem.stuName);
                        formData.append('stuGender', this.formItem.stuGender);
                        formData.append('stuDept', this.formItem.stuDept.join('/'));
                        formData.append('stuPhone', this.formItem.stuPhone);
                        formData.append('stuEmail', this.formItem.stuEmail);
                        formData.append('stuInfo', this.formItem.stuInfo);
                        formData.append('stuStatus', this.formItem.stuStatus);
                        formData.append('stuNation', this.formItem.stuNation);
                        formData.append('stuClass', this.formItem.stuClass);
                        axios
                            .post('/api/comp', formData)
                            .then(submit => {
                                if (submit) {
                                    _self.$Message.success('会员信息录入成功！');
                                    _self.Reset(name);
                                    _self.loading = false;
                                    setTimeout(function () {
                                        _self.$Modal.success({
                                            title: '添加我们的QQ群',
                                            content: '<p>点击链接加入群聊【2019计算机协会】：</p>' +
                                                '<p><a target=_blank href="https://jq.qq.com/?_wv=1027&k=5absL3A">https://jq.qq.com/?_wv=1027&k=5absL3A</a></p>',
                                        });
                                    }, 2000);
                                }
                            })
                    }
                })
            },
            async checkId(id) {
                return await axios.get('/api/stu/id/' + id);
            },
            Reset(name) {
                this.$refs[name].resetFields();
            },
            showAdver(name) {
                this.ad1modal = true;
                this.advername = name;
            },
            gotohome() {
                window.location = '/home'
            }
        }
    };
</script>

<style scoped>
    .left-from-item >>> .ivu-form-item-content {
        margin-left: 0 !important;
    }

    .cover-head {
        padding-bottom: 10px;
        font-weight: bold;
        font-size: 30px
    }
</style>