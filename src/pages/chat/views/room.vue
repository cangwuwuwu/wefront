<template>
    <div class="room" v-cloak>
        <div class="container">
            <header class="blog-header py-3">
                <div class="row flex-nowrap justify-content-between align-items-center">
                    <div class="col-4 pt-1 msg-toleft">
                        <a class="text-muted" href="/home">主页</a>
                    </div>
                    <div class="col-4 text-center">
                        <a class="blog-header-logo text-dark" href="#">在线聊天</a>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center" >
                        <div sec:authorize="isAuthenticated()">
                            <a id="username" class="btn btn-sm btn-outline-secondary" href="#">{{ name }}</a>
                        </div>
                    </div>
                </div>
            </header>
        </div>

        <div class="abs cover contaniner" id="msgframe">
            <div class="abs cover pnl">
                <div class="top pnl-head"></div>
                <div class="abs cover pnl-body" id="pnlBody">
                    <div class="abs cover pnl-left">
                        <div class="abs cover pnl-msgs scroll" id="show">
                            <div class="msg min time" id="histStart" @click="history">加载历史消息</div>
                            <div class="pnl-list" id="hists">
                                <!-- 历史消息 -->
                            </div>
                            <div class="pnl-list" id="msgs" v-for="(msg, index) in left" :key="index">
                                <div class="msg robot" v-if="msg.type ? false : true ">
                                    <div class="msg-left" :worker="msg.name">
                                        <div class="msg-host photo"></div>
                                        <div class="msg-ball" :title="msg.time" v-html="msg.content"></div>
                                    </div>
                                </div>
                                <div class="msg guest" v-if="msg.type ? true : false ">
                                    <div class="msg-right" >
                                        <div class="msg-host headDefault"></div>
                                        <div class="msg-ball" :title="msg.time" v-html="msg.content"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="pnl-list hide" id="unreadLine">
                                <div class="msg min time unread">未读消息</div>
                            </div>
                        </div>
                        <div class="abs bottom pnl-text">
                            <div class="abs top pnl-warn" id="pnlWarn">
                                <div class="fl btns rel pnl-warn-free">
                                    <img src="" class="kh warn-btn" title="" id="emojiBtn" />
                                </div>
                            </div>
                            <div class="abs cover pnl-input" sec:authorize="isAuthenticated()">
                                <textarea ref="inputbox" class="scroll" id="text" wrap="hard" placeholder="在此输入文字信息..." v-model="msg" @keyup.enter.ctrl="sendmsg"></textarea>
                                <div class="abs atcom-pnl scroll hide" id="atcomPnl">
                                    <ul class="atcom" id="atcom"></ul>
                                </div>
                            </div>
                            <div class="abs br pnl-btn" id="submit" @click="sendmsg" v-text="btn"></div>
                            <div class="pnl-support" id="copyright"><a href="/">www.niter.work</a></div>
                        </div>
                    </div>
                    <div class="abs right pnl-right">
                        <div class="slider-container hide"></div>
                        <div class="pnl-right-content">
                            <div class="pnl-tabs">
                                <div class="tab-btn active" id="hot-tab">群聊成员</div>
                                <div class="tab-btn" id="rel-tab">群公告</div>
                            </div>
                            <div class="pnl-hot">
                                <ul class="rel-list unselect">
                                    <li class="rel-item">在线人数(<span v-text="count"></span>)</li>
                                    <li class="rel-item" v-for="(number, index) in numbers" :key="index">{{number}}</li>
                                </ul>
                            </div>
                            <div class="pnl-rel" style="display: none;">
                                <ul class="rel-list unselect" id="rels">
                                    <!-- <li class="rel-item">这是一个问题，这是一个问题？</li> -->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="blog-footer fixed-bottom">
            <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
            <p>
                <a href="#"> &copy;2019 </a>
            </p>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'room',
    data() {
        return {
            showtips: true,
            tip: '',
            msg: '',
            left: [],
            btn: '',
            numbers: [],
            count: 0,
            name: '',
            websocket: null,
        }
    },
    mounted() {
        this.initWebsocket();
        this.name = JSON.parse(sessionStorage.getItem('wecoding_login_info')).username;
    },
    watch: {
        // left数组改变时 说明收到新消息
        left() {
            let bar = document.getElementById('show');
            let top = bar.scrollTop;
            let height = bar.scrollHeight;
            let client = bar.clientHeight;
            // 如果滚动栏在消息框的底部,  产生新消息时自动滑到底部
            if (top + client === height) {
                setTimeout(() => {
                    bar.scrollTop = bar.scrollHeight;
                },10)
            }
        }
    },
    methods: {
        sendmsg() {
            if (this.btn === '重新连接') {
                this.initWebsocket();
                return;
            }
            if (this.msg === '') {
                return ;
            }
            let list1 = {
                type: true,
                time: new Date(),
                name:  this.name,
                content: this.msg.replace(/\n|\r\n/g,"<br>")
            };
            this.left.push(list1);
            this.websocket.send(new Date() + '&&' + this.name + '&&' + this.msg.replace(/\n|\r\n/g,"<br>"));
            this.msg = '';
            this.$refs.inputbox.focus();
        },
        history() {
            this.$Message.info('正在火速开发中...')
        },
        initWebsocket() {
            if (window.WebSocket) {
                this.websocket = new WebSocket("ws://39.106.85.24:8088/ws");
                this.websocket.onopen = this.wsonopen;
                this.websocket.onerror = this.wsonerror;
                this.websocket.onmessage = this.wsonmessage;
                this.websocket.onclose = this.wsonclose;
            } else {
                this.$Message.warning('您的浏览器不支持websocket!')
            }
        },
        wsonopen() {
            this.$Message.success('连接建立成功...畅所欲言吧😀');
            console.log("连接建立成功...");
            this.btn = '发送(Ctrl+Enter)';
        },
        wsonerror(e) {
            console.log('websocket: 出错了')
            this.$Message.error('出错了');
        },
        wsonmessage(e) {
            console.log(e.data);
            let strs = e.data.toString().split("&&");
            if (strs.length < 3) {
                var json = JSON.parse(e.data);
                this.count = json.count;
                this.numbers = json.list;
                return;
            }
            // 消息框显示信息
            let list = {
                type: false,
                time: strs[0],
                name: strs[1],
                content: strs[2]
            };
            this.left.push(list);
        },
        wsonclose(e) {
            this.$Modal.error({
                title: '连接已断开',
                content: '太长时间没有收发信息了...连接已断开😭'
            });
            console.log("websocket: 退出聊天室...");
            this.btn = '重新连接'
        },
    },
}

</script>