<template>
    <div class="signin">
        <Row type="flex" align="middle" style="height: 500px">
            <Col span="24">
                <Form ref="formSignin" :model="formSignin" :rules="ruleSignin">
                    <FormItem prop="stuUsername">
                        <h1 class="cover-head">请登录</h1>
                        <Input type="text" v-model="formSignin.stuUsername" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="stuPassword">
                        <Input type="password" v-model="formSignin.stuPassword" placeholder="Password" @keyup.enter.native="handleSubmit('formSignin')">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <!-- <FormItem>
                        <i-Switch :value="remember" @on-change="change">
                            <Icon type="md-checkmark" slot="open"></Icon>
                            <Icon type="md-close" slot="close"></Icon>
                        </i-Switch>
                        记住密码
                    </FormItem> -->
                    <FormItem>
                        <Button type="primary" :loading="loginbtnload" long @click="handleSubmit('formSignin')">登录</Button>
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
                stuUsername: '',
                stuPassword: '',
            },
            loginbtnload: false,
            ruleSignin: {
                stuUsername: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                stuPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' }                
                ]
            },
            // remember: false,      
        }
    },
    methods: {
        // change (status) {
        //     this.remember = status;
        // },
        handleSubmit(name) {
            let _self = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.loginbtnload = true;
                    let formData = new FormData();
                    formData.append('stuUsername', this.formSignin.stuUsername)
                    formData.append('stuPassword', this.formSignin.stuPassword)
                    // formData.append('remember-me', this.remember)
                    axios
                    .post('/api/login', formData)
                    .then(res => {
                        if (res) {
                            sessionStorage.setItem('wecoding_login_info',JSON.stringify(res.data));
                            setTimeout(function () {
                                window.location = "/home"
                                // this.$router.go(-1);
                            }, 1500);
                        }
                        _self.loginbtnload = false;
                    });
                } 
            })
        }
    }
}

</script>

<style scoped>
.signin {
    width: 340px;
    margin:auto;
}
.cover-head {
    padding-bottom: 20px;
    font-size: 40px
}
</style>
