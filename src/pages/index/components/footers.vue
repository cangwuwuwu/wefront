<template>
    <footer :class="'footer ' + hometheme">
        <Row>
            <Col span="5">
                <Icon type="logo-github" size="30"/>
            </Col>
            <Col span="5">
                <Icon type="md-thumbs-up" size="30"/>
            </Col>
            <Col span="5">
                <Icon type="md-help-circle" size="30"/>
            </Col>
            <Col span="9">
                <Icon custom="iconfont icon-logo6-copy" size="45"/>
            </Col>
        </Row>
        <Row>
            <Col span="5">
                <div @click="footOpen('http://github.com/cangwuwuwu/wecoding')">
                    <div class="footer-font-24">GitHub</div>
                    <div class="footer-font-16">源码地址</div>
                </div>
            </Col>
            <Col span="5">
                <Poptip trigger="hover" placement="right-end" title="前往github给个star吧...">
                    <div @click="footOpen('http://github.com/cangwuwuwu/wecoding')">
                        <div class="footer-font-16">点赞/Star</div>
                    </div>
                    <div slot="content"><img alt="star" src="@/assets/images/star.png"/></div>
                </Poptip>
                <div @click="footOpen('https://blog.csdn.net/qq_43581949')">
                    <div class="footer-font-16">作者博客</div>
                </div>
                <Poptip trigger="hover" placement="right-end" title="扫二维码,  加入我们">
                    <div class="footer-font-16">加入我们</div>
                    <div slot="content"><img alt="二维码" src="@/assets/images/ours2code.jpg"/></div>
                </Poptip>
            </Col>
            <Col span="5">
                <div @click="footPush('/docs/help')">
                    <div class="footer-font-16">帮助</div>
                </div>
                <div @click="footPush('/docs/help/update-log')">
                    <div class="footer-font-16">更新日志</div>
                </div>
                <div @click="bug = true" class="footer-font-16">反馈Bug</div>
            </Col>
            <Col span="9">
                <div class="footer-font-24">Wecoding</div>
                <div class="footer-font-24">&copy; 2019</div>
            </Col>
        </Row>
        <Modal
                footer-hide
                title="反馈"
                v-model="bug">
            <div>反馈类型</div>
            <RadioGroup v-model="bugtype">
                <Radio label="bug">
                    <Icon type="md-alert" size="15"></Icon>
                    <span>Bug</span>
                </Radio>
                <Radio label="need">
                    <Icon type="ios-hand" size="15"></Icon>
                    <span>没有我想要的</span>
                </Radio>
                <Radio label="advice">
                    <Icon type="ios-information-circle" size="15"></Icon>
                    <span>纰漏/指正/建议</span>
                </Radio>
            </RadioGroup>
            <div>反馈内容</div>
            <div class="bug-div">
                <Input v-model="bugcontent" type="textarea" :autosize="{minRows: 3,maxRows: 5}"
                       placeholder="Enter something..."/>
            </div>
            <div class="bug-div">
                <Button :loading="loading" long type="primary" @click="sendfeedback">提交反馈</Button>
            </div>
        </Modal>
    </footer>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'footers',
        data() {
            return {
                bug: false,
                bugtype: '',
                bugcontent: '',
                loading: false
            }
        },
        props: ["hometheme"],
        methods: {
            sendfeedback() {
                if (this.bugtype === '' || this.bugcontent === '')
                    return;
                this.loading = true;
                let _self = this;
                axios
                    .post('/api/sendmail/feedback', {
                        type: this.bugtype,
                        content: this.bugcontent
                    })
                    .then(res => {
                        if (res) {
                            _self.$Message.success('反馈成功，感谢支持');
                            _self.loading = false;
                            _self.bug = false;
                        }
                    })
            },
            footOpen(url) {
                window.open(url);
            },
            footPush(url) {
                this.$router.push(url);
            }
        }
    }
</script>
<style scoped lang="less">
    @media screen and (max-width: 770px) {
        .footer-font-16 {
            font-size: 14px !important;
        }

        .footer-font-24 {
            font-size: 18px !important;
        }
    }

    .dark, .dark a, .purple, .purple a {
        color: @font-in-dark;
    }

    .primary, .primary a {
        color: @light-color;
    }

    .bug-div {
        margin-top: 10px;
    }

    .footer-font-16, .footer-font-24 {
        cursor: pointer;
    }

    .footer-font-16 {
        font-size: 16px;
    }

    .footer-font-24 {
        font-size: 24px;
    }

    .footer {
        width: 100%;
        position: relative;
        bottom: 0;
        padding: 45px 0 45px 0;
        background: #212121;
        z-index: 10;
        font-size: 12px;
        text-align: center;
    }

    footer p {
        line-height: 30px;
        margin: 0;
        padding: 0;
    }

    footer h3:hover {
        color: #2d8cf0;
        cursor: pointer;
    }
</style>