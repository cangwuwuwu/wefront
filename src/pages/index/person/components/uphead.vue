<template>
    <Modal fullscreen v-model="visibleUpload" @on-visible-change="visibleChange">
        <p slot="header" style="color:#2d8cf0;text-align:center">
            <Icon type="ios-cloud-upload"></Icon>
            <span>上传头像</span>
        </p>
        <div class="model" v-show="model" @click="model = false">
            <div class="model-show">
                <img :src="modelSrc" alt="">
            </div>
        </div>
        <Row>
            <Col :md="{span:6}" :xs="{span: 12, offset: 1}">
                <div class="upload-img-block" style="width: 400px;height: 400px">
                    <div>
                        <input
                                accept="image/gif, image/jpeg, image/jpg, image/png"
                                type="file"
                                :value="imgFile"
                                class="img-input"
                                @change="chooseHeadImage($event)">
                        <div style="text-align: center;color: #3399ff;">
                            <Icon type="ios-cloud-upload" size="52"></Icon>
                            <h2>裁剪图片/上传</h2>
                        </div>
                    </div>
                </div>
            </Col>
            <Col :md="{span:1}" :xs="{span: 24,offset:1}">
                <Button size="large" class="up-img-btn" @click="rotateRight()">顺时旋转</Button>
                <Button size="large" class="up-img-btn" @click="rotateLeft()">逆时旋转</Button>
                <Button size="large" class="up-img-btn" @click="downloadImg('blob')">下载截图</Button>
                <Button size="large" class="up-img-btn" @click="finish('blob')">全屏预览</Button>
                <Button size="large" class="up-img-btn" @click="changeScale(2)">图片放大</Button>
                <Button size="large" class="up-img-btn" @click="changeScale(-2)">图片缩小</Button>
                <Button size="large" class="up-img-btn" @click="clearCrop()">清除截图</Button>
                <Button size="large" class="up-img-btn" @click="startCrop()">手动截图</Button>
            </Col>
            <Col :md="{span:15}" :xs="{span:24}">
                <vueCropper style="width: 90%;height: 400px;margin-left: 5%;"
                            ref="cropper"
                            :img="option.img"
                            :outputSize="option.outputSize"
                            :outputType="option.outputType"
                            :info="option.info"
                            :canScale="option.canScale"
                            :autoCrop="option.autoCrop"
                            :fixed="option.fixed"
                            :fixedNumber="option.fixedNumber"
                            centerBox
                            @realTime="realTime">
                </vueCropper>
            </Col>
        </Row>
        <Row class="next-row-up" type="flex" justify="center" align="middle">
            <Col :md="{span:9}" :xs="{span:0}">
                <Card style="padding: 50px;font-size: 20px;">
                    ① 点击 裁剪图片/上传 选择你要上传的图片 <br>
                    ② 控制 截屏框 选择合适头像 <br>
                    ③ 点击下方 完成上传 上传头像 <br>
                    <br>
                    <br>
                    * 图片上传仅支持 jpg、jpeg、png、gif 格式 <br>
                    * 原图最大长度和宽度为2000像素 <br>
                    * 滚轮也可以缩放图片大小 <br>
                </Card>
            </Col>
            <Col :md="{span:1, offset:1}" :xs="{span:24}">
                <h1>预览</h1>
            </Col>
            <Col :md="{span:5, offset: 4}" :xs="{span:0}" v-if="previews.url === ''">
                <img style="width:500px" src="@/assets/images/upload.svg"/>
            </Col>
            <Col :md="{span:2}" :xs="{span:0}">
                <div :style="previewStyle2">
                    <div :style="previews.div">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
            </Col>
            <Col :md="{span:3}" :xs="{span:0}">
                <div :style="previewStyle1">
                    <div :style="previews.div">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
            </Col>
            <Col :md="{span:6}" :xs="{span:18}">
                <div class="show-preview"
                     :style="{'width': previews.w + 'px', 'height': previews.h + 'px',
                        'overflow': 'hidden','margin': '5px','border-radius': '50%'}">
                    <div :style="previews.div">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
            </Col>
        </Row>
        <div slot="footer">
            <Button type="primary" size="large" long :loading="head_loading" @click="finishUp('blob')">完成上传
            </Button>
        </div>
    </Modal>
</template>
<script>
    import {VueCropper} from 'vue-cropper'
    import axios from 'axios'

    export default {
        name: 'uphead',
        components: {
            VueCropper
        },
        data() {
            return {
                option: {
                    img: "",                        //裁剪图片的地址
                    full: false,
                    info: true,                      //裁剪框的大小信息
                    outputSize: 1,                   // 裁剪生成图片的质量
                    outputType: 'png',              //裁剪生成图片的格式
                    canScale: true,                 // 图片是否允许滚轮缩放
                    autoCrop: true,                  // 是否默认生成截图框
                    autoCropWidth: 300,              // 默认生成截图框宽度
                    autoCropHeight: 300,             // 默认生成截图框高度
                    fixed: true,                    //是否开启截图框宽高固定比例
                    fixedNumber: [1, 1]              //截图框的宽高比例
                },
                imgFile: '',
                downImg: '#',
                previews: {},
                visibleUpload: false,
                head_loading: false,
                model: false,
                modelSrc: '',
                previewStyle1: {},   //正常大小
                previewStyle2: {},
                // previewStyle3: {},    // 60x60
                // previewStyle4: {},    // 60x60
            }
        },
        props: ["visibleup"],
        watch: {
            visibleup: {
                immediate: true,
                handler: function () {
                    this.visibleUpload = this.visibleup;
                }
            }
        },
        methods: {
            visibleChange(visible) {
                this.$emit('visiblechange', visible);
            },
            finishUp(type) {
                let _self = this;
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        this.head_loading = true;
                        let myinfo = this.$store.state.userInfo;
                        // console.log(myinfo)
                        let name = myinfo.stuId;
                        let id = myinfo.id;
                        let formData = new FormData();
                        formData.append("file", data, name + '.png');
                        formData.append("id", id);
                        axios
                            .post('/api/upload/head', formData)
                            .then(res => {
                                // console.log(res)
                                _self.$emit('updateHead', res.data.stuBigImg);
                                // console.log(data_myhead.stuImg)
                                _self.$Message.success('上传成功!');
                                _self.head_loading = false;
                                _self.visibleUpload = false
                            })
                    })
                }
            },
            chooseHeadImage(e) {
                var _this = this;
                //上传图片
                var file = e.target.files[0];
                _this.fileName = file.name;
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    _this.$Message.error('图片格式错误！');
                    return false
                }
                var reader = new FileReader();
                reader.onload = (e) => {
                    let data;
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    _this.option.img = data
                };
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
                reader.readAsArrayBuffer(file);

            },
            // 放大缩小
            changeScale(num) {
                num = num || 1;
                this.$refs.cropper.changeScale(num);
            },
            //左旋转
            rotateLeft() {
                this.$refs.cropper.rotateLeft();
            },
            // 右旋转
            rotateRight() {
                this.$refs.cropper.rotateRight();
            },
            // 实时预览函数
            realTime(data) {
                var previews = data;
                var h = 0.5;
                var w = 0.2;

                this.previewStyle1 = {
                    width: previews.w + "px",
                    height: previews.h + "px",
                    overflow: "hidden",
                    margin: "0",
                    zoom: h
                };

                this.previewStyle2 = {
                    width: previews.w + "px",
                    height: previews.h + "px",
                    overflow: "hidden",
                    margin: "0",
                    zoom: w
                };

                // 固定为60宽度
                this.previewStyle3 = {
                    width: previews.w + "px",
                    height: previews.h + "px",
                    overflow: "hidden",
                    margin: "0",
                    zoom: 60 / previews.w
                };

                // 固定为60高度
                this.previewStyle4 = {
                    width: previews.w + "px",
                    height: previews.h + "px",
                    overflow: "hidden",
                    margin: "0",
                    zoom: 60 / previews.h
                };
                this.previews = data;

            },
            //下载图片
            downloadImg(type) {
                var aLink = document.createElement('a');
                aLink.download = 'demo';
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        this.downImg = window.URL.createObjectURL(data);
                        aLink.href = window.URL.createObjectURL(data);
                        aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.downImg = data;
                        aLink.href = data;
                        aLink.click()
                    })
                }
            },
            clearCrop() {
                this.$refs.cropper.clearCrop();
                this.option.img = '';
            },
            startCrop() {
                this.$refs.cropper.startCrop()
            },
            finish(type) {
                // 输出
                // var test = window.open('about:blank')
                // test.document.body.innerHTML = '图片生成中..'
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        // console.log(data);
                        var img = window.URL.createObjectURL(data);
                        this.model = true;
                        this.modelSrc = img
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.model = true;
                        this.modelSrc = data
                    })
                }
            },
        }
    }
</script>
<style scoped>
    @media screen and (max-width: 770px) {
        .upload-img-block {
            margin-bottom: 10px;
            width: 340px !important;
            height: 100px !important;
        }

        .up-img-btn {
            width: 23%;
        }
    }

    .upload-img-block {
        position: relative;
        float: left;
        display: block;
    }

    .upload-img-block > div {
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 100%;
        border: 1px dashed #d6d6d6;
        border-radius: 8px;
        color: #d6d6d6;
        background: #fafafa;
        -webkit-transition: border-color .3s ease;
        transition: border-color .3s ease;
    }

    .upload-img-block > div:hover {
        border: 1px dashed #2d8cf0;
    }

    .upload-img-block > div .img-input {
        cursor: pointer;
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
    }

    .up-img-btn {
        margin-bottom: 15px;
    }

    .next-row-up {
        margin-top: 50px;
        /* height: 405px; */
    }

    .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
    }

    .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }

    .model img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-position: 0 0, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>