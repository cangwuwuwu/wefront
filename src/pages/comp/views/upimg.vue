<template>
    <div class="first step">
        <div class="money-title">上传相关图片</div>
            <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                <template class="test" v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.response.big)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item, index)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <i-circle v-if="item.showProgress" :size="80" :percent="item.percentage" :stroke-color="item.percentage === 100 ? '#5cb85c': '#2db7f5'" :stroke-width="7">
                        <Icon v-if="item.percentage == 100" type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
                        <span v-else class="demo-Circle-inner" style="font-size:24px">{{ parseInt(item.percentage) }}%</span>
                    </i-circle>
                    <!-- <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress> -->
                </template>
            </div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-error="uploadError"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="/api/upload/spend"
            style="display: inline-block;width:95px;">
            <div style="width: 95px;height:95px;line-height: 95px;">
                <Icon type="ios-camera" size="40"></Icon>
            </div>
        </Upload>
        <Modal width="80" v-model="visible" footer-hide>
            <img :src="'http://39.106.85.24:9000/wecoding/' + imgName" 
            v-if="visible" style="width: 100%;height: 100%">
        </Modal>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'second',
    data() {
        return {
            uploadList: [],
            imgName: '',
            visible: false,
            small: [],
            big: [],
        }
    },
    methods: {
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file, index) {
            // console.log(file)
            axios
            .delete('/api/upload/spend', {
                data: {
                    big: file.response.big,
                    small: file.response.small
                }
            })
            .then(res => {
                if (res) {
                    this.$refs.upload.fileList.splice(index, 1);
                    this.small.splice(index, 1);
                    this.big.splice(index, 1)
                    this.$emit('getImg', this.small, this.big);
                }
            })
        },
        handleSuccess (res, file) {
            this.small.push(res.small);
            this.big.push(res.big);
            this.$emit('getImg', this.small, this.big);
            file.url = 'http://39.106.85.24:9000/wecoding/' + res.small;
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '图片' + file.name + '格式不正确，请上传jpg/png格式'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小范围',
                desc: '图片' + file.name + ' 太大了, 不允许超过 2M.'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 8;
            if (!check) {
                this.$Notice.warning({
                    title: '最多上传8张图片'
                });
            }
            return check;
        },
        uploadError(error, file) {
            this.$Notice.error({
                title: file.status,
                desc: file.message + ' 前往登录：<a href="/index/signin">www.niter.work/index/signin</a>'
            });
        }
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
    }
}
</script>
<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 96px;
        height: 96px;
        text-align: center;
        line-height: 96px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>