<template>
    <div id="doc">

        <Head/>
        <router-view/>
        <Footer/>

        <Col :md="{span:1}" :xs="{span:0}">
            <Back-Top :height="100">
                <div class="top">
                    <Icon type="ios-arrow-up"/>
                </div>
            </Back-Top>
        </Col>
    </div>
</template>

<script>
    import Head from '@/pages/index/components/heads.vue'
    import Footer from '@/pages/index/components/footers.vue'

    export default {
        name: "docs",
        components: {
            Head, Footer
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    footer, .footer a div {
        color: #f8f9f8 !important;
    }

</style>