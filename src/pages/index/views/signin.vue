<template>
    <div class="signin">
        <Row type="flex" align="middle" style="height: 500px">
            <Col span="24">
        <Form ref="formSignin" :model="formSignin" :rules="ruleSignin">
            <FormItem prop="username">
                <h1>请登录</h1>
                <Input type="text" v-model="formSignin.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formSignin.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <input type="checkbox" name="remember-me" style="display:none" v-model="formSignin.remember">
                <i-Switch @on-change="change">
                    <Icon type="md-checkmark" slot="open"></Icon>
                    <Icon type="md-close" slot="close"></Icon>
                </i-Switch>
                记住我
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleSubmit('formSignin')">登录</Button>
            </FormItem>
        </Form>
        </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: "signin",
    components: {},
    data() {
        return {
            formSignin: {
                username: '',
                password: '',
                remember: false,        
            },
            ruleSignin: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }                
                ]
            }
        }
    },
    methods: {
        change (status) {
            this.formSignin.remember = status;
        }
    }
}

</script>

<style scoped>
.signin {
    width: 340px;
    margin:auto;
}

</style>
