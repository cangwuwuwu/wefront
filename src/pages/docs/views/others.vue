<template>
    <div class="card-shadow res-content-div sencond-div-position path-hidden-half"
        :style="{height: (arrowshow === true ? '150px' : cardhight)}">
        <div style="font-size: 25px;font-weight: bold">学习路线图<span style="font-size: 15px;">(仅参考, 侵删)</span></div>
        <div>
            <Card style="padding: 20px;border: 1px solid #dcdee2;">
                <Row type="flex" justify="center" align="bottom">
                    <img :src="'@/assets/images/' + name + '_path.jpg'"/>
                </Row>
            </Card>
        </div>
        <div class="path-pic-more" @click="arrowshow = !arrowshow">
            <Icon type="ios-arrow-down" color="yellow" v-show="arrowshow"></Icon>
            <Icon type="ios-arrow-up" color="yellow" v-show="!arrowshow"></Icon>
            <button type="button" class="ivu-btn ivu-btn-text" style="display: none;">
                <span>Show Code</span></button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            arrowshow: true,
            cardhight: '900px'
        }
    },
}
</script>