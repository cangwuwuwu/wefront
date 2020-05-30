<template>
  <div class="overview">

      <Row>
          <Col span="14">
              <!--消息列表-->
              <div class="card">
                  <div class="msgCard"  v-for="(msgInfo,index) in this.msgListInfo" :key="index">
                      <p class="title">{{msgInfo.msgHead}}: {{msgInfo.msgType}}</p>
                      <div class="line"></div>
                      <p class="content">{{msgInfo.msgContent}}</p>
                      <div class="sp">
                          <span class="sp3">{{msgInfo.msgTime}}</span>
                          <span class="sp2">{{msgInfo.msgSender}}</span>
                      </div>
                  </div>
                  <Page  class="page"  :current="currentPage" :page-size="currentSize" :total="total" @on-change="changePage" />
              </div>
          </Col>
          <Col span="10">
              <!--发送消息表单-->
              <div class="form">
                  <Form ref="formValidate" :model="messageInfo" :rules="ruleValidate"  :label-width="80" >
                      <p>发送消息</p>
                      <FormItem label="类型" prop="msgType">
                          <Select v-model="messageInfo.msgType" placeholder="选择标签类型">
                              <Option value="test">测试消息</Option>
                              <Option value="official">全局消息</Option>
                          </Select>
                      </FormItem>
                      <FormItem label="消息头" prop="msgHead">
                          <Input v-model="messageInfo.msgHead" placeholder="输入消息头"/>
                      </FormItem>
                      <FormItem label="发送者" prop="msgSender">
                          <Input v-model="messageInfo.msgSender"  placeholder="输入消息发送者名称"/>
                      </FormItem>

                      <FormItem label="消息内容" prop="msgContent">
                          <Input type="textarea" v-model="messageInfo.msgContent" :rows="3" placeholder="输入消息内容" />
                      </FormItem>
                      <FormItem class="formClick">
                          <Button type="primary" @click="handleSubmit('formValidate')" :loading="submitLoading">发送</Button>
                          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                      </FormItem>
                  </Form>
              </div>
          </Col>
      </Row>





  </div>
</template>

<script>
    import axios from 'axios'
export default {

    name: 'notice',
    data() {
        return {

            //消息列表信息
            msgListInfo:[],
            //消息信息
            msgInfo:{},

          //发送消息的对象
          messageInfo: {
              msgType: '',
              msgHead: '',
              msgSender: '',
              msgTime: '',
              msgContent: '',

          },

          //发送表单验证
          ruleValidate:{
              msgType:[{required: true, message: '选择标签类型', trigger: 'blur'}],
              msgHead:[{required: true, message: '输入消息头', trigger: 'blur'}],
              msgSender:[{required: true, message: '输入消息发送者名称', trigger: 'blur'}],
              msgContent:[{required: true, message: '输入消息内容', trigger: 'blur'}],
          },

            //表单提交加载
            submitLoading: false,

            currentPage: 1,
            //当前页的大小
            currentSize: 3,
            //总条数
            total: 5,
        }
    },
    methods:{
        async getInfo(){
            await axios.get("/api/admin/comp/msg/getMsgList", {
                params:{page: this.currentPage, size: this.currentSize}
            }).then(res => {
                let info = res.data;
                this.msgListInfo = info.list;
                this.currentPage = info.pageNum;
                this.total = info.total;
            })
        },
      //发送消息
      handleSubmit(name){
          this.$refs[name].validate((valid) => {
             if (valid){
                 this.submitLoading = true;
                 let data = JSON.stringify(this.messageInfo);
                 axios({
                     method: 'post',
                     url: '/api/admin/comp/msg/sendMsg',
                     data: data,
                     headers: {
                         'Content-Type': 'application/json;charset=utf-8'
                     },
                 }).then(res => {
                     if (res.status == 200){
                         this.submitLoading = false;
                         this.$Message.success("发送成功");
                         this.$refs[name].resetFields();
                         this.getInfo();
                     }else {
                         this.$Message.error("发送失败");
                     }
                 });
             } else {
                 this.$Message.error('您未正确的填入表格');
             }
          });

      },
      //重置发送表单
      handleReset(name){
          this.$refs[name].resetFields();
      },

    //改变页数
    changePage(current){
        this.currentPage = current;
        this.getInfo();
    },

  },
    created() {
        this.getInfo();
    }
}
</script>

<style>
  .overview{
      /*height: 640px;*/
      border: 1px solid #e8eaec;
      padding: 26px;
      display: block;
      background: #fff;
      border-radius: 4px;
      font-size: 14px;
      position: relative;
      transition: all .2s ease-in-out;
      margin: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
  }

  /*发送表单*/
  .form{
    /*width: 400px;*/
    /*!*!*position: absolute;*!*!*/
    /*!*!*right: 20px;*!*!*/
    /*!*!*top: 40px;*!*!*/
    /*float: right;*/
    /*margin-top: 30px;*/
    /*margin-right: 60px;*/
      width: 80%;
      height: 420px;
      margin: 20px 40px 0 0;
    border-style:solid; border-width:1px; border-color: #d4d4d4;
    padding: 30px 45px 15px 30px;
      -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
      -moz-box-shadow:0px 3px 3px #c8c8c8 ;
      box-shadow:0px 3px 3px #c8c8c8 ;

  }

  /*表单标题*/
  .form p {
    text-align: center;
    font-size: 16px;
    margin-bottom: 15px;
  }

  /*表单按钮*/
  .formClick{
    text-align: center;
  }

  /*卡片div*/
  .card{
      /*float: left;*/
      /*width: 700px;*/
  }

  /*卡片内容*/
  .msgCard{
      /*width: 480px;*/
      width:60%;
      height: 140px;
      margin: 20px 30px 20px 120px;
      padding: 10px 10px 0px 10px;
      border-style:solid; border-width:1px; border-color: #cccccc;
      -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
      -moz-box-shadow:0px 3px 3px #c8c8c8 ;
      box-shadow:0px 3px 3px #c8c8c8 ;
  }

  /*标题*/
  .title{
    margin: 5px 10px;
    font-size: 16px;
      font-weight: 500;
  }

  /*分割线*/
  .line{
      height: 1px;
      border-top: 1px solid #ddd;
      text-align: center;
  }

  /*内容*/
  .content{
      margin-top: 10px;
  }

  .sp{
      margin-top: 30px;
  }
  .sp span{
    display: inline-block;
  }
  .sp1{
      float: left;
      margin-left: 5px;
  }
  .sp2{
      float: right;
      margin-right: 20px;
  }
  .sp3{
      float: right;
      margin-right: 10px;
  }

  .page{
      margin-top: 20px;
      float: right;
      margin-right: 22%;
  }

</style>