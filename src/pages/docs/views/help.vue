<template>
    <div class="guide">
        <Row>
            <Col span="4">
                <div class="card-shadow">
                    <ul class="ivu-menu ivu-menu-light ivu-menu-vertical" style="width: auto;">
                        <Menu width="310" :active-name="choose" @on-select="path2Docs">
                            <div class="navigate-group catalogue">引导</div>
                            <MenuGroup title="功能介绍">
                                <!-- <MenuItem name="/docs/help/bootstrap1">bootstrap1</MenuItem>
                                <MenuItem name="/docs/help/bootstrap2">bootstrap2</MenuItem> -->
                            </MenuGroup>
                            <MenuGroup title="开发文档">
                                <!-- <MenuItem name="/docs/help/document1">document1</MenuItem> -->
                            </MenuGroup>
                            <MenuGroup title="关于">
                                <MenuItem name="/docs/help/update-log">更新日志</MenuItem>
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
                        {{ tag === '/docs/help/bootstrap1' ? '引导1' : tag === '/docs/help/bootstrap2' ? '引导2' : '更新日志'}}
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
        name: "help",
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
            if (this.choose === '/docs/help') return;
            this.$router.push('/docs/help')
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