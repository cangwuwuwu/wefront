<template>
    
</template>
<script>
import $ from 'jquery'
import VueCropper from 'vue-cropper'

export default {
    name: 'subject',
    components: { 
      VueCropper 
    }, 
    data() {
        return {
            option: {
                img: "",                         //裁剪图片的地址
                info: true,                      //裁剪框的大小信息
                outputSize: 0.7,                   // 裁剪生成图片的质量
                outputType: 'jpeg',              //裁剪生成图片的格式
                canScale: true,                 // 图片是否允许滚轮缩放
                autoCrop: true,                  // 是否默认生成截图框
                autoCropWidth: 100,              // 默认生成截图框宽度
                autoCropHeight: 100,             // 默认生成截图框高度
                fixed: false,                    //是否开启截图框宽高固定比例
                fixedNumber: [4, 4]              //截图框的宽高比例
            },
            status:'',
            headImg:''
        }
    },
    mounted() {
        let _self = this;
        $("input[type='file']").change(function(){
            // Indicator.open();
            let file = this.files[0];
            if (window.FileReader) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                //监听文件读取结束后事件    
                reader.onloadend = function (e) {
                    _self.option.img = e.target.result;
                    // Indicator.close();
                };
            }
        });
    },
    methods: {
        compressImg:function () {
            let _self = this;
            this.$refs.cropper.startCrop();
            this.$refs.cropper.getCropData((data) => {
                let file = _self.convertBase64UrlToBlob(data);
                file.name = 'head.jpg';
                _self.uploadAction(file);
            })
        },
        uploadAction:function (file) {
            // Indicator.open();
            let _self = this;
            let param = new FormData();  // 创建form对象
            param.append('pics', file, file.name);  // 通过append向form对象添加数据
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            };
            // 添加请求头
            this.$axios.post('/appapi/user/i/up-headimg/pics', param, config)
                .then(response => {
                    if(response.status == 200){
                        let data = response.data;
                        // Indicator.close();
                        //处理服务器返回数据
                    }
                })
                .catch(error=>{
                    // Indicator.close();
                    console.log(error);
                })
        },
        // 将base64的图片转换为file文件
        convertBase64UrlToBlob(urlData) {
            let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
            //处理异常,将ascii码小于0的转换为大于0
            let ab = new ArrayBuffer(bytes.length);
            let ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], { type: 'image/jpeg' });
        },
    },
}
</script>

<style scoped>
    .btn{
        width: 80%;
        height: 40px;
        margin-top: 50px;
        color: white;
        border-radius: 20px;
        background-color: #3377ff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10%;
    }
</style>
