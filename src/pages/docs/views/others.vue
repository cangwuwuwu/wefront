<template>
    <div v-show="choose === 'java'" class="card-shadow res-content-div sencond-div-position path-hidden-half"
        :style="{height: (arrowshow === true ? '150px' : cardhight)}">
        <div style="font-size: 25px;font-weight: bold">学习路线图<span style="font-size: 15px;">(仅参考, 侵删)</span></div>
        <div>
            <Card style="padding: 20px;border: 1px solid #dcdee2;">
                <Row type="flex" justify="center" align="bottom">
                    <img style="width: 100%" :src="'http://39.106.85.24:8999/' + choose + '_path.jpg'" @click="watchPic"/>
                </Row>
            </Card>
        </div>
        <div class="path-pic-more" @click="arrowshow = !arrowshow">
            <Icon type="ios-arrow-down" color="yellow" v-show="arrowshow"></Icon>
            <Icon type="ios-arrow-up" color="black" v-show="!arrowshow"></Icon>
            <button type="button" class="ivu-btn ivu-btn-text" style="display: none;">
                <span>Show Code</span></button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // screenWidth: document.body.clientWidth,
            name: '',
            arrowshow: true,
            cardhight: ''
        }
    },
    props: ["choose", "screenWidth"],
    mounted() {
        if (this.screenWidth > 400)
        this.cardhight = '900px';
    },
    methods: {
        watchPic() {
            window.open('http://39.106.85.24:8999/' + this.choose + '_path.jpg')
        }
    }
}
</script>