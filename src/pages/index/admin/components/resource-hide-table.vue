<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">类别: </span>
                <span class="expand-value">{{ form }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">描述: </span>
                <span class="expand-value">{{ row.resDescribe }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">下载地址: </span>
                <span class="expand-value">{{ row.resUrl }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <span class="expand-key">下载密码: </span>
                <span class="expand-value">{{ row.resPassword }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">评分: </span>
                <span class="expand-value">{{ row2ResMore.resPoint }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">热度: </span>
                <span class="expand-value">{{ row2ResMore.resHeat }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>

    export default {
        props: {
            row: Object,
            row2ResMore: Object
        },
        data(){
            return {
                form : ''
            }
        },
        watch: {
                'row.resForm' : {
                    handler(newVal){
                        newVal == 1 ? this.form = '基础学习' : newVal == 2 ? this.form = '进阶面试' :
                            newVal == 3 ? this.form = '实战项目' : newVal == 4 ? this.form = '文档/PDF' :this.form =  '未知';
                    },
                    deep: true,
                    immediate: true,
                }
        }
    }
</script>

<style>

</style>