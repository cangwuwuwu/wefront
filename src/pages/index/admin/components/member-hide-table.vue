<template>
    <div>
        <Row class="expand-row" type="flex" justify="center">
            <Col span="7">
                <span class="expand-key">名族: </span>
                <span class="expand-value">{{ row.stuNation}}</span>
            </Col>
            <Col span="7">
                <span class="expand-key">班级: </span>
                <span class="expand-value">{{ row.stuClass }}</span>
            </Col>
            <Col span="7">
                <span class="expand-key">邮箱地址: </span>
                <span class="expand-value">{{ row.stuEmail }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>

    export default {
        props: {
            row: Object
        },
    };
</script>

<style>

</style>