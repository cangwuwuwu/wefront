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
                <a target="_blank" href="https://github.com/cangwuwuwu/wecoding">
                    <h4>GitHub</h4>
                    <h6>项目源码地址</h6>
                </a>
            </Col>
            <Col span="5">
            <Poptip trigger="hover" placement="right-end" title="前往github给个star吧...">
                <a target="_blank" href="https://github.com/cangwuwuwu/wecoding"><h6>点赞/Star</h6></a>
                <div slot="content"><img alt="star" src="@/assets/images/star.png"/></div>
            </Poptip>
                <a target="_blank" href="https://blog.csdn.net/qq_43581949"><h6>作者博客</h6></a>
                <Poptip trigger="hover" placement="right-end" title="扫二维码,  加入我们">
                    <h6>加入我们</h6>
                    <div slot="content"><img alt="二维码" src="@/assets/images/ours2code.jpg"/></div>
                </Poptip>
            </Col>
            <Col span="5">
                <a href="/docs/help"><h6>帮助</h6></a>
                <a target="_blank" href="/docs/help/update-log"><h6>更新日志</h6></a>
                <h6 @click="bug = true">反馈Bug</h6>
            </Col>
            <Col span="9">
                <h4>Wecoding</h4>
                <h5>&copy; 2019</h5>
            </Col>
        </Row>
        <Modal
                footer-hide
                draggable
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
                <Input v-model="bugcontent" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="Enter something..." />
            </div>
            <div class="bug-div">
                <Button :loading="loading" long type="primary" @click="sendfeedback">提交反馈</Button>
            </div>
        </Modal>
    </footer>
</template>
<script>
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
                $.ajax({
                    type: 'post',
                    url: '/api/sendmail/feedback',
                    data: {type: this.bugtype, content: this.bugcontent},
                    success(data_feedback) {
                        _self.$Message.success(data_feedback);
                        _self.loading = false;
                    },
                    error() {
                        _self.$Message.error('糟糕! 反馈好像发送失败了...:(');
                        _self.loading = false;
                    },
                });
            },
        }
}
</script>
<style scoped lang="less">
.dark,.dark a,.purple,.purple a {
    color: @font-in-dark;
}
.primary, .primary a {
    color: @light-color;
}
</style>