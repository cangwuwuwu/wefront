<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            
        }
    },
    mounted() {
        // let info = sessionStorage.getItem('wecoding_login_info')
        // console.log(info)
    },
}
</script>
<style scoped>
    #app {
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    }
</style>