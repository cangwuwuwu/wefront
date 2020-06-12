<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row" type="flex" justify="center">
            <Col span="7">
                <span class="expand-key" >email: </span>
                <span class="expand-value" >{{ row.email }}</span>
            </Col>
            <Col span="7">
                <span class="expand-key">其他: </span>
                <span class="expand-value">{{ row.others }}</span>
            </Col>
            <Col span="7">
                <div style="float: left" class="expand-key">相关图片: </div>
                <div style="float: left; margin-left: 20px" class="expand-value" >
                    <span v-if="row.small == null || row.small == ''">暂无相关图片</span>
                    <span v-else>
                         <a  target="_blank"  :href="upImgBase + row.big.split(',')[index]" v-for="(img,index) in row.small.split(',')" :key="index">
                            <img title="放大"  :src="upImgBase + img"/>
                            </a>
                    </span>
                </div>
            </Col>

        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>


