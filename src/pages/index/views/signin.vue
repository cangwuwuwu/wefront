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
                    <FormItem>
                        <input type="checkbox" name="remember-me" style="display:none" v-model="remember">
                        <i-Switch @on-change="change">
                            <Icon type="md-checkmark" slot="open"></Icon>
                            <Icon type="md-close" slot="close"></Icon>
                        </i-Switch>
                        记住密码
                    </FormItem>
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
                    formData.append('stuUsername', this.formSignin.stuUsername)
                    formData.append('stuPassword', this.formSignin.stuPassword)
                    axios.post('/api/login', formData)
                    .then(function (res) {
                        if (res.data.status === 200) {
                            _self.$Message.success(res.data.message)
                            setTimeout(function () {
                                window.location = "/home"
                            }, 2000);
                        } else if (res.data.status === 401 || res.data.status === 403) {
                            _self.$Message.error(res.data.message);
                        }
                        _self.loginbtnload = false;
                    }).catch(function () {
                        _self.loginbtnload = false;
                        _self.$Message.error('用户名或密码错误!');
                    })
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
