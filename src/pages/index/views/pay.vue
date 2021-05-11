<template>
    <div class="pay">
        <div style="font-size: 30px;text-align: center">NIT计协会费收取系统</div>
        <div style="text-align: center">简易版</div>
        <Row type="flex" justify="center">
            <Col :md="{span: 12}">
                <Card :dis-hover="true" class="pay-container">
                    <Row type="flex" align="middle">
                        <Col :md="{span: 24}" :xs="{span: 24}">
                            <div class="pay-head">Ⅰ. 使用必读</div>
                        </Col>
                        <Col :md="{span: 24}" :xs="{span: 24}">
                            <div
                                class="ivu-alert ivu-alert-warning ivu-alert-with-icon ivu-alert-with-desc pay-tips"
                            >
                                <span class="ivu-alert-icon">
                                    <Icon type="ios-alert-outline" size="30"></Icon>
                                </span>
                                <!-- <span class="ivu-alert-message">建议</span> -->
                                <span
                                    class="ivu-alert-desc"
                                >1. 社联规定经常参加社团活动以及交纳会费才为正式社团成员，社团所有活动权益将以正式成员优先</span>
                                <span class="ivu-alert-desc">2. 会费交纳秉着自愿的原则，会费收取后暂时不会提供退款</span>
                                <span class="ivu-alert-desc">3. 计算机协会每届只会收取一次会费，会费将用于协会网站，活动举办等。</span>
                                <span class="ivu-alert-desc">
                                    4. 协会会费收支情况公开透明，登陆后可以前往
                                    <span
                                        class="my-qq"
                                        @click="mvtoSpend"
                                    >/comp/spend</span> 页面围观。
                                </span>
                                <span class="ivu-alert-desc">5. 由于需要对接支付宝网关，所以生成二维码响应会较慢，请耐心等待</span>
                                <span class="ivu-alert-desc">
                                    6. 如遇到任何异常、错误提醒，
                                    <span class="my-qq" @click="createOutTradeNo">刷新</span>订单号后重试
                                </span>
                                <span class="ivu-alert-desc">
                                    7. 如有支付成功却显示失败情况，请及时联系我：
                                    <span class="my-qq">294352178</span>(QQ)
                                </span>
                            </div>
                            <!-- <div>6. 扫码支付和跳转支付都会创建订单，因此只能一个订单号二选一以免重复创建订单</div>  -->
                        </Col>
                    </Row>
                    <Row type="flex" align="middle">
                        <Col :md="{span: 24}" :xs="{span: 24}">
                            <div class="pay-head">Ⅱ. 生成订单号</div>
                        </Col>
                        <Col :md="{span: 8, offset: 8}" :xs="{span: 21}" class="out-trade-col">
                            <Tag title="当前订单号" color="red" class="out-trade-col">{{ outTradeNo }}</Tag>
                        </Col>
                        <Col :md="{span: 1}" :xs="{span: 3}">
                            <Icon title="换一个" type="md-refresh" @click="createOutTradeNo" />
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" justify="center">
                        <Col :md="{span: 24}" :xs="{span: 24}">
                            <div class="pay-head">Ⅲ. 选择操作类型</div>
                        </Col>
                        <Col :md="{span: 8, offset: 2}">
                            <Icon custom="iconfont icon-erweima" size="200" />
                            <div class="demo-spin-container">
                                <Button @click="desplayQrCodeModal" class="pay-btn">点此生成支付宝二维码</Button>
                            </div>
                        </Col>
                        <!-- <Col :md="{span: 5, offset: 1}">
                            <div style="padding: 20px;width: 200px;">
                                <Icon custom="iconfont icon-ziyuan" size="160" />
                            </div>
                            <Button @click="pcpay" class="pay-btn">跳转到支付宝支付</Button>
                        </Col>-->
                        <Col :md="{span: 8, offset: 2}">
                            <div style="padding: 20px;width: 200px;">
                                <Icon custom="iconfont icon-chaxun" size="160" />
                            </div>
                            <Button @click="checkStatusModal = true" class="pay-btn">查询订单状态</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal v-model="qrcodeModal" class="qr-modal" :width="232" :closable="false">
            <vue-qr :logoSrc="logo" :text="qrUrl" :size="200"></vue-qr>
            <!-- <qrcode-vue 
                id="qrcode"
                :size="size" 
                :value="qrUrl" 
                :logo="logo" 
                >
            </qrcode-vue>-->
            <Spin fix v-if="spinShow">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle
                            class="path"
                            cx="50"
                            cy="50"
                            r="20"
                            fill="none"
                            stroke-width="5"
                            stroke-miterlimit="10"
                        />
                    </svg>
                </div>网络延时，请稍等
            </Spin>
            <div slot="footer">
                <Row type="flex" justify="center" algin="middle">
                    <Col :md="{span: 10}" style="line-height: 32px;">
                        <span class="my-qq" @click="downloadQRCode">下载二维码</span>
                    </Col>
                    <Col :md="{span:14}" :xs="{span:14}">
                        <Button
                            type="primary"
                            :loading="payloading"
                            @click="finishPay(outTradeNo)"
                        >{{ paytxt }}</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
        <Modal :width="232" v-model="checkStatusModal" :closable="false">
            <Spin fix v-if="checkSpin">
                <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle
                            class="path"
                            cx="50"
                            cy="50"
                            r="20"
                            fill="none"
                            stroke-width="5"
                            stroke-miterlimit="10"
                        />
                    </svg>
                </div>查询中，请稍等
            </Spin>
            <Input v-model="outTradeNo" placeholder="输入要查询的订单号" />
            <div slot="footer">
                <Row>
                    <Col :md="{span: 14}">
                        <div
                            v-if="queryInfo !== -1"
                            :style="'color: ' + (queryInfo === 1 ? '#19be6b;' : '#ed4014')"
                        >该订单{{ queryInfo === 1 ? '支付成功' : '支付失败' }}</div>
                    </Col>
                    <Col :md="{span: 10}">
                        <Button type="primary" @click="query(outTradeNo)">查询</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>

<script>
import vueQr from "vue-qr";
import axios from "axios";
export default {
    data() {
        return {
            spinShow: false,
            checkSpin: false,
            token: {},
            outTradeNo: "",
            qrcodeModal: false,
            qrtrue: false,
            payloading: false,
            paytxt: "完成支付",
            queryInfo: -1,
            checkStatusModal: false,
            size: 200,
            qrUrl: "",
            logo: require("@/assets/images/aslogo.png")
        };
    },
    components: {
        vueQr
    },
    created() {
        this.isPaid();
        this.token = this.$store.state.token;
        this.createOutTradeNo();
    },
    methods: {
        isPaid() {
            let _self = this;
            axios
                .get("/api/pay/ispaid", {
                    params: {
                        stuId: this.$store.state.token.username
                    }
                })
                .then(res => {
                    if (res) {
                        if (res.data !== 0) {
                            _self.$Modal.confirm({
                                title: this.token.username + ": ",
                                content:
                                    "你已经交了会费" +
                                    res.data * 10 +
                                    "元，还要继续吗？",
                                okText: "继续",
                                cancelText: "退出",
                                onCancel: () => {
                                    _self.$router.go(-1);
                                }
                            });
                        }
                    }
                });
        },
        getQRCodeUrl() {
            this.qrcodeModal = true;
            this.spinShow = true;
            let _self = this;
            axios
                .get("/api/pay/qrcode", {
                    params: {
                        stuId: this.token.username,
                        out_trade_no: this.outTradeNo
                    }
                })
                .then(res => {
                    if (res) {
                        _self.spinShow = false;
                        _self.qrUrl = res.data;
                        _self.qrtrue = true;
                    }
                });
        },
        desplayQrCodeModal() {
            if (this.qrtrue !== true) {
                this.getQRCodeUrl();
            }
            this.qrcodeModal = true;
        },
        createOutTradeNo() {
            let ran = "";
            for (let i = 0; i < 4; i++) {
                ran += Math.floor(Math.random() * 10);
            }
            this.outTradeNo = "nitas" + new Date().getTime() + ran;
            console.log(this.outTradeNo);
        },
        query(outTradeNo) {
            this.checkSpin = true;
            this.checkStatus(outTradeNo);
        },
        pcpay() {
            window.open(
                "https://www.niter.work/api/pay/pcpay?out_trade_no=" +
                    this.outTradeNo +
                    "&total_amount=10.00&subject=NIT计算机协会会费收取&stuId=" +
                    this.token.username
            );
        },
        checkStatus(outTradeNo) {
            let _self = this;
            this.queryInfo = 0;
            axios
                .get("/api/pay/query", {
                    params: {
                        outTradeNo: outTradeNo
                    }
                })
                .then(res => {
                    if (res) {
                        _self.$Message["success"]({
                            background: true,
                            content: "会费交纳成功"
                        });
                        _self.queryInfo = 1;
                        setTimeout(function() {
                            _self.$router.replace({
                                path: "/refresh",
                                query: {
                                    t: Date.now()
                                }
                            });
                        }, 2000);
                    }
                    _self.payloading = false;
                    _self.paytxt = "完成支付";
                    _self.checkSpin = false;
                });
        },
        finishPay(outTradeNo) {
            this.paytxt = "正在校验订单";
            this.payloading = true;
            this.checkStatus(outTradeNo);
        },
        mvtoSpend() {
            this.$router.push("/comp/spend");
        },
        downloadQRCode() {
            let canvas = document.querySelectorAll(".qr-modal img");
            let a = document.createElement("a");
            a.href = canvas[0].src;
            a.download = "计算机协会会费支付二维码";
            a.click();
        }
    }
};
</script>
<style scoped lang="less">
@media screen and (max-width: 770px) {
    .qr-modal {
        width: 232px !important;
    }
    .pay-tips {
        padding: 20px !important;
    }
    .ivu-alert-icon {
        display: none;
    }
}
.pay-tips > span {
    font-size: 16px;
}
.qr-modal {
    text-align: center;
    width: 232px !important;
}
.pay-container {
    margin: auto;
}
.btn-wrap {
    width: 260px;
    height: 260px;
    margin: 0 auto;
}
.btn-wrap textarea {
    width: 260px;
    height: 260px;
}
.pay-btn {
    width: 200px;
}
.out-trade-col {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}
.my-qq {
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
}
.pay-head {
    font-size: 20px;
    border-bottom: 3px solid #2d8cf0;
    text-align: center;
    margin: 20px;
}
</style>