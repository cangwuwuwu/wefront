<template>
    <div class="head card-shadow" style="margin-bottom: 16px;">
        <Menu mode="horizontal" :active-name="activeName" @on-select="headChoose">
            <MenuItem name="/" class="wecoding-logo" style="color: #2d8cf0">
                <span><Icon custom="iconfont icon-logo6-copy" size="32"></Icon>coding</span>
            </MenuItem>
            <MenuItem name="/docs/help" style="float: right;">
                帮助
            </MenuItem>
            <MenuItem name="/docs/resources" style="float: right;">
                资源分享
            <sup class="ivu-badge-dot" style="margin: 20px 20px"></sup>
            </MenuItem>
            <MenuItem name="/docs/guide" style="float: right;">
                校园指南
            </MenuItem>
            <MenuItem name="/home" style="float: right;">
                返回首页
            </MenuItem>
        </Menu>
 
    </div>
</template>
<script>
export default {
    name: 'heads',
    data() {
        return {
            activeName: ''
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
</style>