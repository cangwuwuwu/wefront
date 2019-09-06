<template>
  <div class="index">
    <Tabs v-model="tags" @on-click="changeTags" :xs="{}">
      <TabPane label="Welcome" name="/index/cover">
          <router-view name="cover"></router-view>
      </TabPane>
      <TabPane label="登录" name="/index/signin">
        <router-view name="signin"/>
<!--        <Signin />-->
      </TabPane>
      <TabPane label="注册" name="/index/signup">
        <router-view name="signup"/>
<!--        <Signup />-->
      </TabPane>
    </Tabs>

 

    <footer class="mastfoot mt-auto">
      <p class="mb-1">&copy; 2019 Wecoding</p>
      <ul class="list-inline">
        <li class="list-inline-item"><a href="https://github.com/cangwuwuwu/wecoding">源码</a></li>
        <li class="list-inline-item"><a href="#" @click.prevent="tips">反馈</a></li>
        <li class="list-inline-item"><a href="#" @click.prevent="support">支持</a></li>
        <Divider type="vertical" style="background: #2d8cf0" />
        <li class="list-inline-item"><a href="#">中文</a></li>
        <li class="list-inline-item"><a href="#">English</a></li>
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
    /* width: 900px */
}

.index >>> .ivu-tabs-nav-scroll {
    display: inline-block;
}

.index >>> .list-inline-item {
    display: inline-block;
    margin-right: .5rem;
}
</style>