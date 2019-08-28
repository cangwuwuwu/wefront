<template>
    <div id="app">
<!--        <router-view/>-->
        <Home/>
    </div>
</template>

<script>
    import Home from '@/pages/home/views/home.vue'
    export default {
        name: 'App',
        components: { Home },
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
    #app {
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
