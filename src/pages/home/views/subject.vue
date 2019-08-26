<template>
    <div class="subject">
        <Row type="flex" align="middle" class="subject-row">
            <Col span="15">
                <img src="@/assets/images/features_overview.svg" class="subject-img"/>
            </Col>
            <Col span="6" offset="3">
                <div id="guide" class="subject-head">校园指南</div>
                <Collapse simple>
                    <Panel>
                        GUIDE
                        <p slot="content">
                            <Row>
                                <Col span="19">
                                    <Icon type="md-radio-button-off" size="25"/>
                                    学校信息 <br>
                                    <Icon type="md-radio-button-off" size="25"/>
                                    新生专区 <br>
                                    <Icon type="md-radio-button-off" size="25"/>
                                    其他指南 <br>
                                </Col>
                                <Col span="5" style="padding-top: 10px">
                                    <!-- <Icon type="ios-arrow-forward" size="50" @click="goesto('/docs/guide')" style="cursor: pointer"/> -->
                                    <!-- <span style="font-size: 25px">前往</span> -->
                                </Col>
                            </Row>
                        </p>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
        <Row type="flex" align="middle" class="subject-row">
            <Col span="6" style="text-align: right">
                <div id="resource" class="subject-head" >资源分享</div>
                <Collapse simple>
                    <Panel>
                        RESOURCE
                        <p slot="content">
                            <Row>
                                <Col span="5" style="padding-top: 20px">
                                    <!-- <Icon type="ios-arrow-back" size="50" @click="goesto('/docs/resources')" style="cursor: pointer"/> -->
                                </Col>
                                <Col span="19">
                                    <Icon type="md-radio-button-off" size="25"/>
                                    学习视频 <br>
                                    <Icon type="md-radio-button-off" size="25"/>
                                    PDF资源 <br>
                                    <Icon type="md-radio-button-off" size="25"/>
                                    在线资料 <br>
                                    <Icon type="md-radio-button-off" size="25"/>
                                    学习路线 <br>
                                </Col>
                            </Row>
                        </p>
                    </Panel>
                </Collapse>
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
                <div id="conversation" class="subject-head" >交流讨论</div>
                <Collapse simple>
                    <Panel>
                        CONVERSATION
                        <p slot="content">
                            <Row>
                                <Col span="19">
                                    <Icon type="md-radio-button-off" size="25"/>
                                    交流论坛 <br>
                                    <Icon type="md-radio-button-off" size="25"/>
                                    在线聊天 <br>
                                </Col>
                                <Col span="5">
                                    <!-- <Icon type="ios-arrow-forward" size="50" @click="goesto('/chat/room')" style="cursor: pointer"/> -->
                                </Col>
                            </Row>
                        </p>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
        <Row type="flex" align="middle" class="subject-row">
            <Col span="6" style="text-align: right">                
                <div id="photo" class="subject-head" >照片墙</div>
                <Collapse simple>
                    <Panel>
                        PHOTOS
                        <p slot="content">
                            
                            
                        </p>
                    </Panel>
                </Collapse>
            </Col>
            <Col span="15" offset="3">
                <img src="@/assets/images/image_post.svg" class="subject-img"/>
            </Col>
        </Row>
        <Row type="flex" align="middle" class="subject-row">
            <Col span="15">
                <img src="@/assets/images/questions.svg" class="subject-img"/>
            </Col>
            <Col span="6" offset="3">
                <div id="help" class="subject-head">获取帮助</div><Collapse simple>
                    <Panel>
                        HELP
                        <p slot="content">
                            <Icon type="md-radio-button-off" size="25"/>
                            更新日志 <br>
                        </p>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
        
    </div>
</template>
<script>
export default {
    name: 'subject',
    data() {
        return {
            
        }
    },
    methods: {
        goesto(url) {
            window.open(url);
        }
    },
}

</script>

<style scoped>
    .subject {
        font-size: 17px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
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
        border-bottom: 1px solid black;font-weight: bold; font-size: 35px;margin-bottom: 25px
    }
</style>
