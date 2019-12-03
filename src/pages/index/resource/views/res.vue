<template>
    <Row>
        <Col v-if="screenWidth <= 400">
            <Drawer title="菜单" :closable="false" @on-close="MenuClose" v-model="catalog" class="catalog-menu">
                <div class="card-shadow">
                    <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                        <Menu width="310" :active-name="choose" @on-select="chooseRes">
                            <div class="catalogue">
                                <Button long type="primary" ghost @click="uploadResModal = true">
                                    上传资源
                                    <Badge text="new">
                                    </Badge>
                                </Button>
                                <Divider/>
                                软件工程
                            </div>
                            <MenuGroup title="编程语言">
                                <MenuItem name="/docs/resources/java">
                                    <Icon custom="iconfont icon-java" size="20"></Icon>
                                    Java / Kotlin
                                </MenuItem>
                                <MenuItem name="/docs/resources/vue">
                                    <Icon type="logo-nodejs" size="20"></Icon>
                                    Web前端
                                </MenuItem>
                                <MenuItem name="/docs/resources/python">
                                    <Icon type="logo-python" size="20"></Icon>
                                    Python
                                </MenuItem>
                                <MenuItem name="/docs/resources/cpp">
                                    <Icon custom="iconfont icon-cpp" size="20"></Icon>
                                    C/C#/C++
                                </MenuItem>
                                <MenuItem name="/docs/resources/php">
                                    <Icon custom="iconfont icon-php" size="20"></Icon>
                                    Php
                                </MenuItem>
                                <MenuItem name="/docs/resources/golang">
                                    <Icon custom="iconfont icon-golang" size="20"></Icon>
                                    Go
                                </MenuItem>
                                <MenuItem name="/docs/resources/android">
                                    <Icon type="logo-android" size="20"></Icon>
                                    Android
                                </MenuItem>
                                <MenuItem name="/docs/resources/wechat">
                                    <Icon custom="iconfont icon-we1" size="20"></Icon>
                                    Wechat小程序
                                </MenuItem>
                            </MenuGroup>
                            <MenuGroup title="操作系统">
                                <MenuItem name="/docs/resources/linux">
                                    <Icon custom="iconfont icon-linux" size="20"></Icon>
                                    Linux
                                </MenuItem>
                                <MenuItem name="/docs/resources/nosql">
                                    <Icon custom="iconfont icon-mongodb" size="20"></Icon>
                                    Windows
                                </MenuItem>
                                <MenuItem name="/docs/resources/docker">
                                    <Icon custom="iconfont icon-docker" size="20"></Icon>
                                    Docker
                                </MenuItem>
                            </MenuGroup>
                            <MenuGroup title="数据库/缓存">
                                <MenuItem name="/docs/resources/sql">
                                    <Icon custom="iconfont icon-MYSQL" size="20"></Icon>
                                    SQL: MySQL/Oracle/PostgreSQL
                                </MenuItem>
                                <MenuItem name="/docs/resources/nosql">
                                    <Icon custom="iconfont icon-mongodb" size="20"></Icon>
                                    NoSQL: Redis/MongoDB/Neo4j/HBase
                                </MenuItem>
                            </MenuGroup>
                            <MenuGroup title="工具">
                                <MenuItem name="/docs/resources/devtools">
                                    <Icon custom="iconfont icon-icons-intellij_idea" size="20"></Icon>
                                    开发工具: IDEA/VSCode/Vim
                                </MenuItem>
                                <MenuItem name="/docs/resources/mantools">
                                    <Icon custom="iconfont icon-webpack" size="20"></Icon>
                                    管理工具: Maven/Gradle/Webpack
                                </MenuItem>
                                <MenuItem name="/docs/resources/vertools">
                                    <Icon custom="iconfont icon-git" size="20"></Icon>
                                    版本管理: SVN/Git
                                </MenuItem>
                            </MenuGroup>
                            <div class="navigate-group catalogue">其他</div>
                            <MenuGroup title="考试">
                                <MenuItem name="/docs/resources/cet">
                                    四六级
                                </MenuItem>
                                <MenuItem name="/docs/resources/master">
                                    考研
                                </MenuItem>
                            </MenuGroup>
                        </Menu>
                    </ul>
                </div>
            </Drawer>
        </Col>
        <Col :md="{span:4}" :xs="{span:0}">
            <div class="card-shadow">
                <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                    <Menu width="310" :active-name="choose" @on-select="chooseRes">
                        <div class="catalogue">软件工程
                            <Button type="primary" style="float:right;" ghost size="large"
                                    @click="uploadResModal = true">
                                <Badge text="new">
                                    上传资源&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Badge>
                            </Button>
                        </div>
                        <MenuGroup title="编程语言">
                            <MenuItem name="/docs/resources/java">
                                <Icon custom="iconfont icon-java" size="20"></Icon>
                                Java / Kotlin
                            </MenuItem>
                            <MenuItem name="/docs/resources/vue">
                                <Icon type="logo-nodejs" size="20"></Icon>
                                Web前端
                            </MenuItem>
                            <MenuItem name="/docs/resources/python">
                                <Icon type="logo-python" size="20"></Icon>
                                Python
                            </MenuItem>
                            <MenuItem name="/docs/resources/cpp">
                                <Icon custom="iconfont icon-cpp" size="20"></Icon>
                                C/C#/C++
                            </MenuItem>
                            <MenuItem name="/docs/resources/php">
                                <Icon custom="iconfont icon-php" size="20"></Icon>
                                Php
                            </MenuItem>
                            <MenuItem name="/docs/resources/golang">
                                <Icon custom="iconfont icon-golang" size="20"></Icon>
                                Go
                            </MenuItem>
                            <MenuItem name="/docs/resources/android">
                                <Icon type="logo-android" size="20"></Icon>
                                Android
                            </MenuItem>
                            <MenuItem name="/docs/resources/wechat">
                                <Icon custom="iconfont icon-we1" size="20"></Icon>
                                Wechat小程序
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="操作系统">
                            <MenuItem name="/docs/resources/linux">
                                <Icon custom="iconfont icon-linux" size="20"></Icon>
                                Linux
                            </MenuItem>
                            <MenuItem name="/docs/resources/nosql">
                                <Icon custom="iconfont icon-windows" size="20"></Icon>
                                Windows
                            </MenuItem>
                            <MenuItem name="/docs/resources/docker">
                                <Icon custom="iconfont icon-docker" size="20"></Icon>
                                Docker
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="数据库/缓存">
                            <MenuItem name="/docs/resources/sql">
                                <Icon custom="iconfont icon-MYSQL" size="20"></Icon>
                                SQL: MySQL/Oracle/PostgreSQL
                            </MenuItem>
                            <MenuItem name="/docs/resources/nosql">
                                <Icon custom="iconfont icon-mongodb" size="20"></Icon>
                                NoSQL: Redis/MongoDB/Neo4j/HBase
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="工具">
                            <MenuItem name="/docs/resources/devtools">
                                <Icon custom="iconfont icon-icons-intellij_idea" size="20"></Icon>
                                开发工具: IDEA/VSCode/Vim
                            </MenuItem>
                            <MenuItem name="/docs/resources/mantools">
                                <Icon custom="iconfont icon-webpack" size="20"></Icon>
                                管理工具: Maven/Gradle/Webpack
                            </MenuItem>
                            <MenuItem name="/docs/resources/vertools">
                                <Icon custom="iconfont icon-git" size="20"></Icon>
                                版本管理: SVN/Git
                            </MenuItem>
                        </MenuGroup>
                        <div class="navigate-group catalogue">其他</div>
                        <MenuGroup title="考试">
                            <MenuItem name="/docs/resources/cet">
                                四六级
                            </MenuItem>
                            <MenuItem name="/docs/resources/master">
                                考研
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </ul>
            </div>
        </Col>
        <Col :md="{span:20}" :xs="{span: 24}">
            <router-view :choose="real_choose" :screenWidth="screenWidth" name="videos"></router-view>

            <router-view :choose="real_choose" :screenWidth="screenWidth" name="web"></router-view>

            <router-view :choose="real_choose" :screenWidth="screenWidth" name="others"></router-view>
        </Col>
        <Modal footer-hide v-model="uploadResModal">
            <p slot="header" style="color:#2d8cf0;text-align:center">
                <Icon type="md-cloud-upload" size="20"></Icon>
                <span>上传资源</span>
            </p>
            <Form ref="formUpRes" :model="upRes" :rules="ruleRes">
                <FormItem label="资源类型" prop="resForm">
                    <Select v-model="upRes.resForm" clearable style="">
                        <Option v-for="form in formList" :value="form.value" :key="form.value">{{ form.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="资源所属" prop="resType">
                    <Select v-model="upRes.resType" multiple filterable :max-tag-count="3"
                            :max-tag-placeholder="maxTypePlaceholder" style="">
                        <Option v-for="type in typeList" :value="type.value" :key="type.value">{{ type.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="资源名称" prop="resName">
                    <Input v-model="upRes.resName" clearable long :maxlength="60" placeholder="填写资源的名字"/>
                </FormItem>
                <FormItem label="资源链接" prop="resUrl">
                    <Input v-model="upRes.resUrl" clearable long placeholder="填写资源的网盘链接">
                        <span slot="prepend">https://</span>
                    </Input>
                </FormItem>
                <FormItem label="资源密码" prop="resPassword">
                    <Input v-model="upRes.resPassword" clearable long placeholder="填写资源的网盘密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem label="资源描述">
                    <Input v-model="upRes.resDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 4}"
                           :maxlength="200" clearable long placeholder="简单描述资源"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="uploadResBtn('formUpRes')" long :loading="uploadresloading">上传
                    </Button>
                </FormItem>
            </Form>
        </Modal>
    </Row>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'res',
        data() {
            const UrlFormatCheck = (rule, value, callback) => {
                if (value.substr(0, 8) === 'https://' || value.substr(0, 7) === 'http://') {
                    callback(new Error('资源链接格式错误!'));
                } else {
                    callback();
                }
            };
            return {
                choose: '',
                screenWidth: document.body.clientWidth,
                catalog: false,
                uploadResModal: false,
                uploadresloading: false,
                formList: [
                    {
                        value: '1',
                        label: '基础学习'
                    },
                    {
                        value: '2',
                        label: '进阶学习'
                    },
                    {
                        value: '3',
                        label: '面试就业'
                    },
                    {
                        value: '4',
                        label: '实战项目'
                    },
                    {
                        value: '5',
                        label: '文档/PDF'
                    }
                ],
                typeList: [
                    {
                        value: 'java',
                        label: 'Java/Kotlin'
                    },
                    {
                        value: 'vue',
                        label: 'Web前端'
                    },
                    {
                        value: 'python',
                        label: 'Python'
                    },
                    {
                        value: 'cpp',
                        label: 'C/C#/C++'
                    },
                    {
                        value: 'php',
                        label: 'Php'
                    },
                    {
                        value: 'golang',
                        label: 'Go'
                    },
                    {
                        value: 'android',
                        label: 'Android'
                    },
                    {
                        value: 'wechat',
                        label: 'Wechat小程序'
                    },
                    {
                        value: 'linux',
                        label: 'Linux'
                    },
                    {
                        value: 'windows',
                        label: 'Windows'
                    },
                    {
                        value: 'docker',
                        label: 'Docker'
                    },
                    {
                        value: 'sql',
                        label: 'Sql'
                    },
                    {
                        value: 'nosql',
                        label: 'NoSql'
                    },
                    {
                        value: 'devtools',
                        label: '开发工具'
                    },
                    {
                        value: 'mantools',
                        label: '管理工具'
                    },
                    {
                        value: 'vertools',
                        label: '版本管理'
                    },
                    {
                        value: 'cet',
                        label: '四六级'
                    },
                    {
                        value: 'master',
                        label: '考研'
                    },
                ],
                upRes: {
                    resForm: '',
                    resType: [],
                    resName: '',
                    resDescribe: '暂无',
                    resUrl: '',
                    resPassword: '',
                    resUploader: '',
                },
                ruleRes: {
                    resForm: [
                        {required: true, message: '必须填写此项', trigger: 'blur'}
                    ],
                    resType: [
                        {required: true, message: '必须选择一项或多项'},
                    ],
                    resName: [
                        {required: true, message: '必须填写此项', trigger: 'blur'}
                    ],
                    resUrl: [
                        {required: true, message: '必须填写此项', trigger: 'blur'},
                        {validator: UrlFormatCheck, trigger: 'blur'}
                    ],
                    resPassword: [
                        {required: true, message: '必须填写此项', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            let info = sessionStorage.getItem('wecoding_login_info');
            if (info) {
                this.upRes.resUploader = JSON.parse(info).username
            } else {
                this.upRes.resUploader = 'Anonymity'
            }
        },
        mounted: function () {
            this.choose = this.$route.path;
            this.$router.push(this.choose)
        },
        methods: {
            chooseRes(name) {
                this.$router.push(name);
                this.choose = name
            },
            MenuClose() {
                this.$store.commit('isDisplayMenu', false)
            },
            uploadResBtn(name) {
                let _self = this;
                this.uploadresloading = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let formData = new FormData();
                        formData.append('resForm', this.upRes.resForm);
                        formData.append('resType', this.upRes.resType.join(','));
                        formData.append('resName', this.upRes.resName);
                        formData.append('resDescribe', this.upRes.resDescribe);
                        formData.append('resUrl', this.upRes.resUrl);
                        formData.append('resPassword', this.upRes.resPassword);
                        formData.append('resUploader', this.upRes.resUploader);
                        axios
                            .post('/api/res', formData)
                            .then(res => {
                                // console.log(res)
                                if (res) {
                                    _self.$Message.success('上传成功！感谢你的支持');
                                    _self.uploadResModal = false;
                                    _self.$refs[name].resetFields();
                                    _self.upRes.resDescribe = '暂无'
                                }
                            })
                    }
                    this.uploadresloading = false;
                })
            },
            maxTypePlaceholder(num) {
                return 'more ' + num;
            }
        },
        computed: {
            real_choose() {
                let path = this.choose;
                // console.log(this.choose)
                let index = path.lastIndexOf("\/");
                return path.substring(index + 1, path.length).toLowerCase();
            },
            displaystatus() {
                return this.$store.state.displaystatus;
            },
        },
        watch: {
            displaystatus(status) {
                this.catalog = status;
            }
        },
    }
</script>