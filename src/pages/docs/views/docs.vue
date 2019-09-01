<template>
    <div id="doc">

        <Head></Head>

        <router-view/>

        <Footer></Footer>

        <Col :md="{span:1}" :xs="{span:0}"> 
            <Back-Top :height="100">
                <div class="top"><Icon type="ios-arrow-up" /></div>
            </Back-Top>
        </Col>
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