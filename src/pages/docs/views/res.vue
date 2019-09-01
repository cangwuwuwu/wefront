<template>
    <Row>
        <Col :md="{span:0}" :xs="{span:1}">
            <Drawer title="菜单" :closable="false" @on-close="MenuClose" v-model="catalog" class="catalog-menu">
                <div class="card-shadow">
                    <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                        <Menu width="310" :active-name="choose" @on-select="chooseRes">
                            <div class="catalogue">软件工程</div>
                            <MenuGroup title="编程语言">
                                <MenuItem name="/docs/resources/java">
                                    <Icon custom="iconfont icon-java" size="20"></Icon>
                                    Java / Kotlin
                                </MenuItem>
                                <MenuItem name="/docs/resources/vue">
                                    <Icon type="logo-nodejs" size="20"></Icon>
                                    Web前端
                                </MenuItem>
                                <MenuItem name="/docs/resources/python">
                                    <Icon type="logo-python" size="20"></Icon>
                                    Python
                                </MenuItem>
                                <MenuItem name="/docs/resources/cpp">
                                    <Icon custom="iconfont icon-cpp" size="20"></Icon>
                                    C/C#/C++
                                </MenuItem>
                                <MenuItem name="/docs/resources/php">
                                    <Icon custom="iconfont icon-php" size="20"></Icon>
                                    Php
                                </MenuItem>
                                <MenuItem name="/docs/resources/golang">
                                    <Icon custom="iconfont icon-golang" size="20"></Icon>
                                    Go
                                </MenuItem>
                                <MenuItem name="/docs/resources/android">
                                    <Icon type="logo-android" size="20"></Icon>
                                    Android
                                </MenuItem>
                                <MenuItem name="/docs/resources/wechat">
                                    <Icon custom="iconfont icon-we1" size="20"></Icon>
                                    Wechat小程序
                                </MenuItem>
                            </MenuGroup>
                            <MenuGroup title="操作系统">
                                <MenuItem name="/docs/resources/linux">
                                    <Icon custom="iconfont icon-linux" size="20"></Icon>
                                    Linux: 
                                </MenuItem>
                                <MenuItem name="/docs/resources/nosql">
                                    <Icon custom="iconfont icon-mongodb" size="20"></Icon>
                                    Windows
                                </MenuItem>
                                <MenuItem name="/docs/resources/docker">
                                    <Icon custom="iconfont icon-docker" size="20"></Icon>
                                    Docker
                                </MenuItem>
                            </MenuGroup>
                            <MenuGroup title="数据库/缓存">
                                <MenuItem name="/docs/resources/sql">
                                    <Icon custom="iconfont icon-MYSQL" size="20"></Icon>
                                    SQL: MySQL/Oracle/PostgreSQL
                                </MenuItem>
                                <MenuItem name="/docs/resources/nosql">
                                    <Icon custom="iconfont icon-mongodb" size="20"></Icon>
                                    NoSQL: Redis/MongoDB/Neo4j/HBase
                                </MenuItem>
                            </MenuGroup>
                            <MenuGroup title="工具">
                                <MenuItem name="/docs/resources/devtools">
                                    <Icon custom="iconfont icon-icons-intellij_idea" size="20"></Icon>
                                    开发工具: IDEA/VSCode/Vim
                                </MenuItem>
                                <MenuItem name="/docs/resources/mantools">
                                    <Icon custom="iconfont icon-webpack" size="20"></Icon>
                                    管理工具: Maven/Gradle/Webpack/
                                </MenuItem>
                                <MenuItem name="/docs/resources/vertools">
                                    <Icon custom="iconfont icon-git" size="20"></Icon>
                                    版本管理: SVN/Git
                                </MenuItem>
                            </MenuGroup>
                            <div class="navigate-group catalogue">其他</div>
                            <MenuGroup title="考试">
                                <MenuItem name="/docs/resources/cet">
                                    四六级
                                </MenuItem>
                                 <MenuItem name="/docs/resources/master">
                                    考研
                                </MenuItem>
                            </MenuGroup>
                        </Menu>
                    </ul>
                </div>
            </Drawer>
        </Col>
        <Col :md="{span:4}" :xs="{span:0}">
            <div class="card-shadow">
                <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                    <Menu width="310" :active-name="choose" @on-select="chooseRes">
                        <div class="catalogue">软件工程</div>
                        <MenuGroup title="编程语言">
                            <MenuItem name="/docs/resources/java">
                                <Icon custom="iconfont icon-java" size="20"></Icon>
                                Java / Kotlin
                            </MenuItem>
                            <MenuItem name="/docs/resources/vue">
                                <Icon type="logo-nodejs" size="20"></Icon>
                                Web前端
                            </MenuItem>
                            <MenuItem name="/docs/resources/python">
                                <Icon type="logo-python" size="20"></Icon>
                                Python
                            </MenuItem>
                            <MenuItem name="/docs/resources/cpp">
                                <Icon custom="iconfont icon-cpp" size="20"></Icon>
                                C/C#/C++
                            </MenuItem>
                            <MenuItem name="/docs/resources/php">
                                <Icon custom="iconfont icon-php" size="20"></Icon>
                                Php
                            </MenuItem>
                            <MenuItem name="/docs/resources/golang">
                                <Icon custom="iconfont icon-golang" size="20"></Icon>
                                Go
                            </MenuItem>
                            <MenuItem name="/docs/resources/android">
                                <Icon type="logo-android" size="20"></Icon>
                                Android
                            </MenuItem>
                            <MenuItem name="/docs/resources/wechat">
                                <Icon custom="iconfont icon-we1" size="20"></Icon>
                                Wechat小程序
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="操作系统">
                            <MenuItem name="/docs/resources/linux">
                                <Icon custom="iconfont icon-linux" size="20"></Icon>
                                Linux: 
                            </MenuItem>
                            <MenuItem name="/docs/resources/nosql">
                                <Icon custom="iconfont icon-mongodb" size="20"></Icon>
                                Windows
                            </MenuItem>
                            <MenuItem name="/docs/resources/docker">
                                <Icon custom="iconfont icon-docker" size="20"></Icon>
                                Docker
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="数据库/缓存">
                            <MenuItem name="/docs/resources/sql">
                                <Icon custom="iconfont icon-MYSQL" size="20"></Icon>
                                SQL: MySQL/Oracle/PostgreSQL
                            </MenuItem>
                            <MenuItem name="/docs/resources/nosql">
                                <Icon custom="iconfont icon-mongodb" size="20"></Icon>
                                NoSQL: Redis/MongoDB/Neo4j/HBase
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="工具">
                            <MenuItem name="/docs/resources/devtools">
                                <Icon custom="iconfont icon-icons-intellij_idea" size="20"></Icon>
                                开发工具: IDEA/VSCode/Vim
                            </MenuItem>
                            <MenuItem name="/docs/resources/mantools">
                                <Icon custom="iconfont icon-webpack" size="20"></Icon>
                                管理工具: Maven/Gradle/Webpack/
                            </MenuItem>
                            <MenuItem name="/docs/resources/vertools">
                                <Icon custom="iconfont icon-git" size="20"></Icon>
                                版本管理: SVN/Git
                            </MenuItem>
                        </MenuGroup>
                        <div class="navigate-group catalogue">其他</div>
                        <MenuGroup title="考试">
                            <MenuItem name="/docs/resources/cet">
                                四六级
                            </MenuItem>
                                <MenuItem name="/docs/resources/master">
                                考研
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </ul>
            </div>
        </Col>
        <Col :md="{span:20}" :xs="{span: 24}">
            <router-view :choose="real_choose" name="videos"></router-view>
           
            <router-view :choose="real_choose" name="web"></router-view>
        
            <router-view :choose="real_choose" name="others"></router-view>
        </Col>
    </Row>
</template>

<script>
export default {
    name: 'res',
    data() {
        return {
            choose: '',
            catalog: false,
        }
    },
    mounted: function() {
        this.choose = this.$route.path
        if (this.choose === '/docs/resources') return;
        this.$router.push(this.choose)
    },
    methods: {
        chooseRes(name) {
            this.$router.push(name)
            this.choose = name
        },
        MenuClose() {
            this.$store.commit('isDisplayMenu', false)
        }
    },
    computed: {
        real_choose() {
            let path = this.choose
            // console.log(this.choose)
            let index = path.lastIndexOf("\/")
            return path.substring(index + 1, path.length).toLowerCase();
        },
        displaystatus() {
            return this.$store.state.displaystatus;
        }
    },
    watch: {
        displaystatus(status) {
            this.catalog = status;
        }
    },
}
</script>