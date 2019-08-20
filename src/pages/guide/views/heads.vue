<template>
    <div class="head">
        <Row>
            <div class="wrapper-header card-shadow">
                <ul class="ivu-menu ivu-menu-light ivu-menu-horizontal">
                    <div class="wrapper-header-nav">
                        <div class="wrapper-header-nav-list" style="float: right; padding: 0 65px">
                            <a href="/" class="wecoding-logo"><Icon custom="iconfont icon-WE" size="32"></Icon>coding</a>
                            <a href="/home" target="_self" class="ivu-menu-item">返回首页</a>
                            <a href="/guide" target="_self" class="ivu-menu-item ivu-menu-item-selected">校园指南</a>
                            <a href="/resources" target="_self" class="ivu-menu-item ivu-menu-item-active">
                                资源分享
                                <span class="ivu-badge-status ivu-badge"></span>
                                <sup class="ivu-badge-dot" style="margin: 20px 20px"></sup>
                            </a>
                            <a href="/help" target="_self" class="ivu-menu-item">帮助</a>
                        </div>
                    </div>
                </ul>
            </div>
        </Row>
    </div>
</template>
<script>
export default {
    name: 'heads'
}
</script>
<style scoped>
.head {
    min-height: 100%;
    height: 100%;
}
</style>