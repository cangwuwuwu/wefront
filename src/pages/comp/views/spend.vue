<template>
    <div class="spend">
        <Row style="">
            <Col span="4">
                <div class="financial-head">协会财务公示</div>
                <Card v-for="item in spend" :key="item.id"> 
                    <Timeline>
                        <TimelineItem :color="item.type === '+' ? 'green' : 'red'" >
                            <p class="time">{{item.time}}</p>
                            <Row>
                                <Col span="16" >
                                    <p class="content">
                                        {{item.content}} <br>
                                        <Icon custom="iconfont icon-renminbi" size="23"></Icon>
                                        {{item.number}}
                                    </p>
                                </Col>
                                <Col span="8" >
                                    <span :style="'font-size: 30px;font-weight: bold;color: '+ (item.type === '+' ? 'green' : 'red')">{{item.type + item.number}}</span>
                                </Col>
                            </Row>
                        </TimelineItem>
                    </Timeline>
                </Card>
            </Col>
            <Col span="20" >
                <div class="financial-head">财务上报流程</div>
                <div style="padding: 20px">
                    <Steps :current="0">
                        <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                    </Steps>
                </div>
            </Col>
        </Row>
    </div>    
</template>
<script>
export default {
    name: 'spend',
    data() {
        return {
            spend: [
                {
                    id: 1,
                    time: '2019',
                    type: '+',
                    content: '会费结余',
                    number: 300,
                },
                {
                    id: 2,
                    time: '2019',
                    type: '-',
                    content: '纳新海报',
                    number: 50,
                },
                {
                    id: 3,
                    time: '2019',
                    type: '-',
                    content: '纳新传单',
                    number: 100,
                },
                {
                    id: 4,
                    time: '2019',
                    type: '-',
                    content: '...etc',
                    number: 100,
                },
                {
                    id: 5,
                    time: '2019',
                    type: '-',
                    content: '...etc',
                    number: 100,
                },
                {
                    id: 6,
                    time: '2019',
                    type: '-',
                    content: '...etc',
                    number: 100,
                },
            ],
        }
    },
    mounted() {
        
    },
    methods: {
        getAllSpendByPage() {
            axios
            .get('/api/comp/spend')
            .then(res => {
                if (res) {
                    this.spend = res.data;
                }
            })
        }
    },
}
</script>
<style scoped lang="less">
    .financial-head {
        text-align: center;
        padding:20px;
        font-size: 20px;
        font-weight: bold;
        border-bottom: solid @primary-color;
        margin-bottom: 5px;
    }
    .spend {
        padding: 20px;
        overflow: hidden;
    }

    .time {
        font-size: 16px;
        font-weight: bold;
    }
    .content {
        font-size: 14px;
        padding-left: 5px;
    }
</style>