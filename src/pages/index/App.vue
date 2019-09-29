<template>
    <div id="app">
       <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
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
