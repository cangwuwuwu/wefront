<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row" >
            <Col span="8">
                <span class="expand-key" >email: </span>
                <span class="expand-value" >{{ row.email }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">其他: </span>
                <span class="expand-value">{{ row.others }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">相关图片: </span>
                <span class="expand-value">{{ row.name }}</span>
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


