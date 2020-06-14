<template>
    <div class="signin">
        <Row type="flex" align="middle" style="height: 500px">
            <Col span="24">
                <Form ref="formSignin" :model="formSignin" :rules="ruleSignin">
                    <FormItem prop="stuId">
                        <h1 class="cover-head">{{ $t('index.login') }}</h1>
                        <Input type="text" v-model="formSignin.stuId" :placeholder="$t('index.inputId')">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="stuPassword">
                        <Input type="password" v-model="formSignin.stuPassword" :placeholder="$t('index.inputPass')"
                               @keyup.enter.native="handleSubmit('formSignin')">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <i-Switch :value="remember" @on-change="change">
                            <Icon type="md-checkmark" slot="open"></Icon>
                            <Icon type="md-close" slot="close"></Icon>
                        </i-Switch>
                        {{ $t('index.remember') }}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" :loading="loginbtnload" long @click="handleSubmit('formSignin')">{{ $t('index.login') }}
                        </Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "signin",
        components: {},
        data() {
            return {
                formSignin: {
                    stuId: '2017101943',
                    stuPassword: 'wecoding',
                },
                loginbtnload: false,
                ruleSignin: {
                    stuId: [
                        {required: true, message: '学号不能为空', trigger: 'blur'}
                    ],
                    stuPassword: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
                remember: false,
            }
        },
        methods: {
            change (status) {
                this.remember = status;
            },
            handleSubmit(name) {
                let _self = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loginbtnload = true;
                        let formData = new FormData();
                        formData.append('stuId', this.formSignin.stuId);
                        formData.append('stuPassword', this.formSignin.stuPassword);
                        formData.append('remember-me', this.remember);
                        axios
                            .post('/api/login', formData)
                            .then(res => {
                                if (res) {
                                    // console.log(res.data.data.principal)
                                    localStorage.setItem('wecoding_login_info', JSON.stringify(res.data.data.principal));
                                    // this.$store.commit('setToken', res.data.data.principal);
                                    setTimeout(function () {
                                        if (_self.$route.query.redirect === location.hostname) {
                                            _self.$router.go(-1);
                                        } else {
                                            _self.$router.push('/home');
                                        }
                                        _self.$router.push('/home');
                                        // 用户登录后给后台发送一个请求记录访问次数
                                        axios.get("/api/admin/comp/access/signIn").then()
                                    }, 1500);
                                }
                                _self.loginbtnload = false;
                            });
                    }
                })
            }
        },

        created() {

        }
    }

</script>

<style scoped>
    .signin {
        width: 340px;
        margin: auto;
    }

    .cover-head {
        padding-bottom: 20px;
        font-size: 40px
    }
</style>
