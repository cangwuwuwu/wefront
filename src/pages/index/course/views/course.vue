<template>
    <router-view></router-view>
</template>

<script>
    import axios from 'axios'
export default {
    name: 'course',
    data() {
        return {
            
        }
    },

    created() {
        // 用户访问课程页面给后台发送一个请求记录访问次数
        axios.get("/api/admin/comp/access/course").then()
    }
}
</script>

<style>

</style>