<template>

</template>

<script>
    // 页面刷新时使用
    export default {
        name: "refresh",
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$router.replace(from.path)
            })
        }
    }
</script>

<style scoped>

</style>