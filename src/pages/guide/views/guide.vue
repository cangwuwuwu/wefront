<template>
    <div class="guide">
        <Row>
            <Col span="4">
                <div class="card-shadow" style="margin: 16px 0 auto auto">
                    <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                        <Menu width="310" :active-name="choose" @on-select="path2Docs">
                            <div class="navigate-group catalogue">关于学校</div>
                            <MenuGroup title="学校信息">
                                <MenuItem name="/guide/college-website">学校官网</MenuItem>
                                <MenuItem name="/guide/college-address">学校地址/路线</MenuItem>
                                <MenuItem name="/guide/map">学校地图</MenuItem>
                            </MenuGroup>
                            <div class="navigate-group catalogue">校园指南</div>
                            <MenuGroup title="新生专区">
                                <MenuItem name="/guide/wel-new">自助迎新</MenuItem>
                                <MenuItem name="/guide/military-training">军训安排</MenuItem>
                                <MenuItem name="/guide/dormitory">宿舍环境</MenuItem>
                                <MenuItem name="/guide/wifi">宽带配置</MenuItem>
                                <MenuItem name="/guide/start-test">开学考试</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="其他指南">
                                <MenuItem name="/guide/score">成绩查询</MenuItem>
                                <MenuItem name="/guide/electric">电费缴纳</MenuItem>
                                <MenuItem name="/guide/edu-email">教育邮箱</MenuItem>
                                <MenuItem name="/guide/cet">四六级</MenuItem>
                                <MenuItem name="/guide/repair">社区报修</MenuItem>
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
                        {{ tag === '/guide/wifi' ? '宽带配置' : tag === '/guide/college-website' ? '学校官网' 
                        : tag === '/guide/college-address' ? '学校地址' : tag === '/guide/map' ? '学校地图' 
                        : tag === '/guide/dormitory' ? '宿舍环境' : tag === '/guide/military-training' ? '军训安排'
                        : tag === '/guide/edu-email' ? '教育邮箱' : tag === '/guide/electric' ? '电费缴纳'
                        : tag === '/guide/start-test' ? '开学考试' : tag === '/guide/wel-new' ? '自助迎新'
                        : tag === '/guide/repair' ? '社区报修' : tag === '/guide/cet' ? '四六级': '成绩查询'}}
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
            if (this.choose === '/guide') return;
            this.$router.push('/guide')
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