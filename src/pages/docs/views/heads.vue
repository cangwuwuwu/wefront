<template>
    <div class="head card-shadow" style="margin-bottom: 16px;">
        <Menu mode="horizontal" :active-name="activeName" @on-select="headChoose">
            <MenuItem name="/home" class="wecoding-logo" style="color: #2d8cf0">
                <span><Icon custom="iconfont icon-logo6-copy" size="32"></Icon>coding</span>
            </MenuItem>
            <Col :md="{span: 0}" :xs="{span:2}" style="float: right;padding-right: 20px;cursor: pointer">
                <Icon type="md-menu" size="25" @click="openmenu"/>
            </Col>
            <Col style="float: right">
                <MenuItem name="/home">
                    回到首页
                </MenuItem>
                <MenuItem name="/docs/guide">
                    校园指南
                </MenuItem>
                <MenuItem name="/docs/resources">
                    资源分享
                <sup class="ivu-badge-dot" style="margin: 20px 20px"></sup>
                </MenuItem> 
                <MenuItem name="/docs/help">
                    帮助
                </MenuItem>
            </Col>
        </Menu>
 
    </div>
</template>
<script>
export default {
    name: 'heads',
    data() {
        return {
            activeName: '',
        }
    },
    mounted: function() {
            this.activeName = this.$route.path
        },
    methods: {
        headChoose(name) {
            if (name === '/home' || name === '/') 
            window.location = name
            this.$router.push(name)
        },
        openmenu () {
            this.$store.commit('isDisplayMenu', true)
            // console.log(this.$store.state.displaystatus)
        }
    },
    watch: {
        $route(to) {
            this.$store.commit('isDisplayMenu', false)
        }
    },
}
</script>
<style scoped>
.head {
    min-height: 100%;
    height: 100%;
    padding-right: 70px;
    padding-left: 70px;
}
@media screen and (max-width: 770px) {
    .head {
        padding-right: 10px;
        padding-left: 10px;
    }
}
</style>