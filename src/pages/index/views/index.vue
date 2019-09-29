<template>
    <div class="index">
        <Tabs v-model="tags" @on-click="changeTags">
            <TabPane :label="$t('index.welcome')" name="/index/cover">
                <router-view name="cover"/>
            </TabPane>
            <TabPane :label="$t('index.login')" name="/index/signin">
                <router-view name="signin"/>
            </TabPane>
            <TabPane :label="$t('index.signup')" name="/index/signup">
                <router-view name="signup"/>
            </TabPane>
        </Tabs>

        <footer class="mastfoot mt-auto">
            <p class="mb-1">&copy; 2019 Wecoding</p>
            <ul class="list-inline">
                <li class="list-inline-item">
                    <div @click="indexOpen('http://github.com/cangwuwuwu/wecoding')">{{ $t('index.sourceCode') }}</div>
                </li>
                <li class="list-inline-item">
                    <div @click.prevent="tips">{{ $t('index.feedback') }}</div>
                </li>
                <li class="list-inline-item">
                    <div @click.prevent="support">{{ $t('index.support') }}</div>
                </li>
                <Divider type="vertical" style="background: #2c3e50"/>
                <li class="list-inline-item">
                    <div @click="changeLang('zh')">中文</div>
                </li>
                <li class="list-inline-item">
                    <div @click="changeLang('en')">English</div>
                </li>
            </ul>
        </footer>

        <BackTop></BackTop>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                tags: '',
            }
        },
        mounted() {
            this.getCurrentPathToTags();
        },
        methods: {
            getCurrentPathToTags() {
                this.tags = this.$route.path
            },
            changeTags(name) {
                this.tags = name;
                this.$router.push(name)
            },
            tips() {
                this.$Modal.info({
                    title: '反馈',
                    content: '<p>1. 点击<strong>[Learn More]</strong>进入主页</p><p>2. 再点击页脚处的<strong>[反馈bug]</strong></p>'
                });
            },
            support() {
                this.$Modal.success({
                    title: '支持我们',
                    content: '<p>(一张微信收款码)</p><p>支持一点服务器的开销</p>'
                })
            },
            indexOpen(url) {
                window.open(url);
            },
            changeLang(lang) {
                if (lang === 'zh') {
                    this.$i18n.locale = 'zh-CN';
                    // this.$store.commit('changeWebLang', 'zh');
                } else if (lang === 'en') {
                    this.$i18n.locale = 'en-US';
                    // this.$store.commit('changeWebLang', 'en');
                }
            }
        },
    }
</script>

<style scoped>
    .index {
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding: 10px;
        margin: auto;
    }

    .index >>> .ivu-tabs-nav-scroll {
        display: inline-block;
    }

    .index >>> .list-inline-item {
        display: inline-block;
        margin-right: .5rem;
    }

    .list-inline-item > div {
        cursor: pointer;
    }

</style>