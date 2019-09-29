<template>
    <div class="subject">
        <Row type="flex" align="middle" class="subject-row">
            <Col span="15">
                <img src="@/assets/images/features_overview.svg" class="subject-img"/>
            </Col>
            <Col span="6" offset="3">
                <div id="guide" class="subject-head"><a href="/docs/guide">校园指南</a></div>
                <Row>
                    <Col :md="{span:19}">
                        <Icon type="md-radio-button-off" size="25"/>
                        学校信息 <br>
                        <Icon type="md-radio-button-off" size="25"/>
                        新生专区 <br>
                        <Icon type="md-radio-button-off" size="25"/>
                        其他指南 <br>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row type="flex" align="middle" class="subject-row">
            <Col span="6" style="text-align: right">
                <div id="resource" class="subject-head"><a href="/docs/resources">资源分享</a></div>
                学习视频
                <Icon type="md-radio-button-off" size="25"></Icon>
                <br>
                PDF资源
                <Icon type="md-radio-button-off" size="25"></Icon>
                <br>
                在线资料
                <Icon type="md-radio-button-off" size="25"></Icon>
                <br>
                学习路线
                <Icon type="md-radio-button-off" size="25"></Icon>
                <br>
            </Col>
            <Col span="15" offset="3">
                <img src="@/assets/images/filing_system.svg" class="subject-img"/>
            </Col>
        </Row>
        <Row type="flex" align="middle" class="subject-row">
            <Col span="15">
                <img src="@/assets/images/conversation.svg" class="subject-img"/>
            </Col>
            <Col span="6" offset="3">
                <div id="conversation" class="subject-head">交流讨论</div>
                <Row>
                    <Col span="19">
                        <Icon type="md-radio-button-off" size="25"/>
                        交流论坛 <br>
                        <Icon type="md-radio-button-off" size="25"/>
                        <a href="/chat/room">在线聊天</a> <br>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row type="flex" align="middle" class="subject-row">
            <Col span="6" style="text-align: right">
                <div id="photo" class="subject-head"><a href="https://static.hfi.me/mikutap/" target="_blank">轻松一下</a>
                </div>
                Mikutap
                <Icon type="md-radio-button-off" size="25"></Icon>
                <br>
            </Col>
            <Col span="15" offset="3">
                <img src="@/assets/images/rest.svg" class="subject-img"/>
            </Col>
        </Row>
        <Row type="flex" align="middle" class="subject-row">
            <Col span="15">
                <img src="@/assets/images/questions.svg" class="subject-img"/>
            </Col>
            <Col span="6" offset="3">
                <div id="help" class="subject-head"><a href="/docs/help">获取帮助</a></div>
                <Icon type="md-radio-button-off" size="25"/>
                更新日志 <br>
            </Col>
        </Row>

    </div>
</template>
<script>
    export default {
        name: 'subject',
    }

</script>

<style scoped>

    @media screen and (max-width: 770px) {
        .subject {
            font-size: .5rem !important;
        }

        .subject-head {
            font-size: .8rem !important;
        }

        .ivu-icon {
            font-size: 15px !important;
        }
    }

    .subject {
        font-size: 1rem;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        border-color: #eee;
        border-radius: 5px;
    }

    .subject-row {
        padding: 50px
    }

    .subject-img {
        width: 100%;
        height: auto;
    }

    .subject-head {
        border-bottom: 1px solid black;
        font-weight: bold;
        font-size: 35px;
        margin-bottom: 25px
    }

    a {
        color: #444;
    }
</style>
