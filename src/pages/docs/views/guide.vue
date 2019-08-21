<template>
    <div class="guide">
        <Row>
            <Col span="4">
                <div class="card-shadow">
                    <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                        <Menu width="310" :active-name="choose" @on-select="path2Docs">
                            <div class="navigate-group catalogue">关于学校</div>
                            <MenuGroup title="学校信息">
                                <MenuItem name="/docs/guide/college-website">学校官网</MenuItem>
                                <MenuItem name="/docs/guide/college-address">学校地址/路线</MenuItem>
                                <MenuItem name="/docs/guide/map">学校地图</MenuItem>
                            </MenuGroup>
                            <div class="navigate-group catalogue">校园指南</div>
                            <MenuGroup title="新生专区">
                                <MenuItem name="/docs/guide/wel-new">自助迎新</MenuItem>
                                <MenuItem name="/docs/guide/military-training">军训安排</MenuItem>
                                <MenuItem name="/docs/guide/dormitory">宿舍环境</MenuItem>
                                <MenuItem name="/docs/guide/wifi">宽带配置</MenuItem>
                                <MenuItem name="/docs/guide/start-test">开学考试</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="其他指南">
                                <MenuItem name="/docs/guide/score">成绩查询</MenuItem>
                                <MenuItem name="/docs/guide/electric">电费缴纳</MenuItem>
                                <MenuItem name="/docs/guide/edu-email">教育邮箱</MenuItem>
                                <MenuItem name="/docs/guide/cet">四六级</MenuItem>
                                <MenuItem name="/docs/guide/repair">社区报修</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="更新中...">
                            </MenuGroup>
                        </Menu>
                    </ul>
                </div>
            </Col>
            <Col span="20">
                <div class="card-shadow res-content-div">
                    <Tag  closable checkable color="success" @on-close="TagClose(index, tag)"
                     v-for="(tag, index) in tagList" :key="index" :name="tag" @on-change="path2Docs(tag)">
                        {{ tag === '/docs/guide/wifi' ? '宽带配置' : tag === '/docs/guide/college-website' ? '学校官网'
                        : tag === '/docs/guide/college-address' ? '学校地址' : tag === '/docs/guide/map' ? '学校地图'
                        : tag === '/docs/guide/dormitory' ? '宿舍环境' : tag === '/docs/guide/military-training' ? '军训安排'
                        : tag === '/docs/guide/edu-email' ? '教育邮箱' : tag === '/docs/guide/electric' ? '电费缴纳'
                        : tag === '/docs/guide/start-test' ? '开学考试' : tag === '/docs/guide/wel-new' ? '自助迎新'
                        : tag === '/docs/guide/repair' ? '社区报修' : tag === '/docs/guide/cet' ? '四六级': '成绩查询'}}
                     </Tag>
                    <div style="padding: 20px">
                        <Card>
                            <router-view></router-view>
                        </Card>
                    </div>
                </div>
            </Col>
        </Row>

    </div>
</template>

<script>
    export default {
        name: "guide",
        data() {
            return {
                choose: '',
                tagSet: new Set(),
                tagList: [],
                navClass: ''
            }
        },
        mounted: function() {
            this.choose = this.$route.path
            if (this.choose === '/docs/guide') return;
            this.$router.push('/docs/guide')
            this.$router.push(this.choose)
        },
        methods: {
            path2Docs(name) {
                this.tagSet.add(name)
                if (name == this.choose) return;
                this.choose = name;
                this.$router.push(name)
                // console.log(this.tagSet)
                this.tagList = Array.from(this.tagSet)
            },
            path2DocsByTag(tag) {
                this.$router.push(tag)
            },
            TagClose(index, tag) {
                this.tagList.splice(index, 1);
                this.tagSet.delete(tag);
                // console.log(index, tag)
            }
        },
        computed: {
            
        },
    }
</script>

<style scoped>

</style>