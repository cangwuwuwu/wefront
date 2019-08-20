<template>
    <footer class="footer">
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
                <Icon custom="iconfont icon-WE" size="45"/>
            </Col>
        </Row>
        <Row>
            <Col span="5">
                <a target="_blank" href="https://github.com/cangwuwuwu/wecoding">
                    <h2>GitHub</h2>
                    <h3>项目源码地址</h3>
                </a>
            </Col>
            <Col span="5">
            <Poptip trigger="hover" placement="right-end" title="前往github给个star吧...">
                <a target="_blank" href="https://github.com/cangwuwuwu/wecoding"><h3>点赞/Star</h3></a>
                <div slot="content"><img alt="star" src="@/assets/images/star.png"/></div>
            </Poptip>
                <a target="_blank" href="https://blog.csdn.net/qq_43581949"><h3>作者博客</h3></a>
                <Poptip trigger="hover" placement="right-end" title="扫二维码,  加入我们">
                    <h3>加入我们</h3>
                    <div slot="content"><img alt="二维码" src="@/assets/images/ours2code.jpg"/></div>
                </Poptip>
            </Col>
            <Col span="5">
                <a href="/help"><h3>帮助</h3></a>
                <a target="_blank" href="/help/update-log"><h3>更新日志</h3></a>
                <h3 @click="bug = true">反馈Bug</h3>
            </Col>
            <Col span="9">
                <h2>Wecoding</h2>
                <h3>&copy; 2019</h3>
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
    methods: {
            sendfeedback() {
                if (this.bugtype === '' || this.bugcontent === '')
                    return;
                this.loading = true;
                $.ajax({
                    type: 'post',
                    url: '/sendmail/feedback',
                    data: {type: this.bugtype, content: this.bugcontent},
                    success(data_feedback) {
                        this.$Message.success(data_feedback);
                        this.loading = false;
                    },
                    error() {
                        this.$Message.error('糟糕! 反馈好像发送失败了...:(');
                        this.loading = false;
                    },
                });
            },
        }
}
</script>
<style scoped>

</style>