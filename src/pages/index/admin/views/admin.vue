<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .ivu-layout-sider {
        min-width: 0px !important;
        height:100vh;
    }
    .admin-name-box {
        float: right;
        font-size: 15px;
        margin-right: 20px;
    }
    .admin-name:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .sub-menu>.ivu-menu>.ivu-menu-item {
        padding: 14px 24px !important;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" style="width: 100vh;overflow: auto;position: fixed">
<!--            <Sider ref="side"  v-model="isCollapsed" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">-->
                <Menu accordion
                    :active-name="breadName" 
                    theme="dark" 
                    width="auto" 
                    @on-select="adminSelectMenu"
                    :class="menuitemClasses">
                    <MenuItem name="overview">
                        <Icon type="md-podium"></Icon>
                        <span>协会概览</span>
                    </MenuItem>
                    <MenuItem name="member">
                        <Icon type="md-contacts"></Icon>
                        <span>成员管理</span>
                    </MenuItem>
                    <MenuItem name="account">
                        <Icon type="md-contact"></Icon>
                        <span>账号管理</span>
                    </MenuItem>
                    <Submenu name="4" class="sub-menu">
                        <template slot="title">
                            <Icon type="logo-usd"></Icon>
                            <span>财务管理</span>
                        </template>
                        <MenuItem name="finance">会费收支</MenuItem>
                        <MenuItem name="finance-dues">会费缴纳</MenuItem>
                    </Submenu>
<!--                    <MenuItem name="finance">-->
<!--                        <Icon type="logo-usd"></Icon>-->
<!--                        <span>财务管理</span>-->
<!--                    </MenuItem>-->
<!--                    <MenuItem name="resource">-->
<!--                        <Icon type="ios-paper"></Icon>-->
<!--                        <span>资源管理</span>-->
<!--                    </MenuItem>-->
                    <Submenu name="5" class="sub-menu">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            <span>资源管理</span>
                        </template>
                        <MenuItem name="resource-webdesk">网盘资源</MenuItem>
                        <MenuItem name="resource-web">在线资源</MenuItem>
                        <MenuItem name="resource-audit">资源审核</MenuItem>
                    </Submenu>
                    <!-- <MenuItem name="guide">
                        <Icon type="ios-navigate"></Icon>
                        <span>指南管理</span>
                    </MenuItem> -->
                    <MenuItem name="notice">
                        <Icon type="ios-notifications"></Icon>
                        <span>发送通知</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <span class="admin-name-box">欢迎您, 
                        <Dropdown @on-click="adminNameListSelect">
                            <span class="admin-name">{{ name }}</span>
                            <a href="javascript:void(0)">
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem><Icon type="md-exit" size="16"></Icon> 退出后台</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                </Header>
                <Content :style="{padding: '0 16px 16px', marginLeft: '195px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>ADMIN</BreadcrumbItem>
                        <BreadcrumbItem>{{ breadName.toUpperCase() }}</BreadcrumbItem>
                    </Breadcrumb>
<!--                    <Card dis-hover>-->
<!--                        <div>-->
<!--                            <router-view></router-view>-->
<!--                        </div>-->
<!--                    </Card>-->
                    <div>
                        <div>
                            <router-view></router-view>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false,
                name: '管理员',
                breadName: 'overview',
            }
        },
        created() {
            this.breadName = this.real_choose();
            const info = localStorage.getItem('wecoding_login_info');
            this.name = JSON.parse(info).stuName;
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
        },
        methods: {
            collapsedSider () {
                this.$refs.side.toggleCollapse();
            },
            adminNameListSelect() {
                this.$router.push('/home')
            },
            adminSelectMenu(name) {
                this.breadName = name;
                this.$router.push('/admin/' + name)
            },
            real_choose() {
                const path = this.$route.path;
                if (path === '/admin') return '';
                let index = path.lastIndexOf("\/");
                return path.substring(index + 1, path.length).toLowerCase();
            },
        }
    }
</script>
<style>
    .div-card-content{
        border: 1px solid #e8eaec;
        padding: 16px;
        display: block;
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        position: relative;
        transition: all .2s ease-in-out;
        margin: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;

    }
</style>
