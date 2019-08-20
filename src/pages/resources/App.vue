<template>
    <div id="app">

        <Head></Head>

        <router-view/>

        <Footer></Footer>

        <Back-Top :height="100">
            <div class="top"><Icon type="ios-arrow-up" /></div>
        </Back-Top>
    </div>
</template>
<script>
import Head from '@/pages/guide/views/heads.vue'
import Footer from '@/pages/guide/views/footers.vue'
export default {
    name: "App",
        components: {
            Head, Footer
        },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>

</style>