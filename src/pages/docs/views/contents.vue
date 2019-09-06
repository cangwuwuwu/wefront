<template>
    <div class="docs" v-html="md"></div>
</template>
<script>
    import axios from 'axios'
    import marked from 'marked'
    import hljs from 'highlight.js'
    import java from 'highlight.js/lib/languages/java';
    hljs.registerLanguage('javascript', java);

    var mdinit = '## 校园指南\n' +
    '\n' +
    '---\n' +
    '\n' +
    '<br>\n' +
    '\n' +
    '&nbsp;&nbsp;&nbsp;&nbsp;点击**左侧选项卡**(手机点击右上角菜单)查看校园指南。\n' +
    '\n' +
    '&nbsp;&nbsp;&nbsp;&nbsp;若有 bug 或者没有找到你想要的,  可以拉到下方点击**反馈**,  我会尽量第一时间更新。\n' +
    '\n' +
    '&nbsp;&nbsp;&nbsp;&nbsp;为了能方便同学们的校园生活，希望能将指南做的越发完善，谢谢！\n' +
    '\n' +
    '<br>\n' +
    '\n' +
    '## 帮助\n' +
    '\n' +
    '---\n' +
    '\n' +
    '<br>\n' +
    '\n' +
    '&nbsp;&nbsp;&nbsp;&nbsp;点击**左侧选项卡**查看帮助列表\n' +
    '\n' +
    '&nbsp;&nbsp;&nbsp;&nbsp;暂时(2019/8)只有更新日志，后续会在帮助加入项目的功能介绍\n' +
    '\n' +
    '&nbsp;&nbsp;&nbsp;&nbsp;引导部分为准备添加的项目开发文档\n' +
    '\n' +
    '<br>\n' +
    '\n' +
    '&nbsp;&nbsp;&nbsp;&nbsp;扫下方的**加入我们**二维码，欢迎同学加入项目开发 (因为我实在是肝不动了:)\n';

export default {
    name: 'contents',
    data() {
        return {
            md: marked(mdinit),
        }
    },
    watch: {
        $route(to) {
            let path = to.path
            let index = path.lastIndexOf("\/")
            path = path.substring(index + 1, path.length);
            this.getMdDocs(path);
        }
    },
    methods: {
        getMdDocs(name) {
            var _self = this
            axios.get('../../md/'+ name +'.md')
            .then(md => {
                _self.md = marked(md.data);
            }).catch(err => {
                _self.md = '<p>数据访问出错!  请刷新重试,  如果还是不能访问,  下方联系反馈,  谢谢</p>';
            })
        }
    },
}

var rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});//基本设置
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
// 定制<h#>
rendererMD.heading = function (text, level) {
    var escapedText = text.toLowerCase().replace(/\s/g, '-');
    return '<br><h' + level + '>' +
        '<a id="' + text + '" class="md-header" href="#' + escapedText +
        '"><span class="md-header-text">' +
        text + '</span></a></h' + level + '>';
};
// 定制<a>标签
rendererMD.link = function(href, title, text) {
    return '<a class="md-link" title="' + text + '" target="_blank" href="' + href +
        '">'+ text +'</a>'
};
// 定制加粗
rendererMD.strong = function (text) {
    return '<strong class="md-strong">' + text + '</strong>'
};
// 定制列表
rendererMD.list = function (body) {
    return '<ul class="md-list">'+ body +'</ul>'
};
// 定制图片
rendererMD.image = function (href, title, text) {
    return '<img style="width:100%" src="' + href + '" alt="' + title + '">'
}
</script>
<style scoped>
    .docs {
        padding:5% 15% 8% 15%;
        font-size: 20px;
        height: fit-content;
        min-height: 740px
    }
    @media screen and (max-width: 770px) {
        .docs {
            padding: 10px;
            font-size: 16px;
        }
        .docs img {
            width: 100%;
        }
    }
</style>