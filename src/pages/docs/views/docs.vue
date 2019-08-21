<template>
    <div id="doc">

        <Head></Head>

        <router-view/>

        <Footer></Footer>

        <Back-Top :height="100">
            <div class="top"><Icon type="ios-arrow-up" /></div>
        </Back-Top>
    </div>
</template>

<script>
    import Head from '@/pages/docs/views/heads.vue'
    import Footer from '@/pages/docs/views/footers.vue'

    export default {
        name: "docs",
        components: {
            Head, Footer
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style scoped>

</style>