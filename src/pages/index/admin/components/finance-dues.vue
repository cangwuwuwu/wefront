<template>
    <div class="overview">
        <Row style="margin-bottom: 10px;">
            <Col span="8">
                <div style="font-size: 25px;font-weight: bold;">会费缴纳</div>
            </Col>
            <Col span="8" offset="8">
                <AutoComplete
                        v-model="keyWords"
                        transfer
                        clearable
                        placeholder="全局搜索"
                        icon="ios-search"
                        size="large"
                        @on-focus="searchByKeyWords"
                >
                </AutoComplete>
            </Col>
        </Row>

        <!--主体内容，表格-->
        <Table border :columns="duesColumns" :data="duesInfo" size="large" :loading="loading">
            <template slot-scope="{ row }" slot="paymentType">
                <span>{{ row.paymentType == 1 ? '在线支付':  row.paymentType == 2 ? '线下支付' : '未支付'}}</span>
            </template>
            <template slot-scope="{ row }" slot="finishTime">
                <span>{{ row.finishTime | formatDate}}</span>
            </template>
        </Table>

        <br>

        <!--分页-->
        <Row>
            <Col span="2" style="text-align: center; margin-left: 30px">
                <Button type="primary" @click="addInfo">手动录入</Button>
            </Col>
            <Col style="float: right">
                <Page show-sizer :current="currentPage" :page-size="currentSize" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
            </Col>
        </Row>

        <!--手动录入会费缴纳信息-->
        <Modal
                v-model="isAddShow"
                width="530"
                :footer-hide="true"
                @on-cancel="closeFormModal"
                :styles="{top: '100px'}"
        >
            <p slot="header" style="text-align: center; font-size: 16px; ">手动录入线下缴费信息</p>
            <Form class="updateForm"  ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="80">
                <FormItem label="学号" prop="userId">
                    <Input v-model="formData.userId" placeholder="输入学号" size="large" style="width: 300px;"></Input>
                </FormItem>
                <FormItem label="缴费金额" prop="payment" style="margin-top: 40px">
                    <Input v-model="formData.payment" placeholder="请输入缴费金额" size="large" style="width: 100px;"> </Input>
                </FormItem>
                <FormItem label="缴费时间" prop="finishTime" style="margin-top: 40px">
                    <DatePicker v-model="formData.finishTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择缴费时间" size="large" style="width: 300px;"></DatePicker>
                </FormItem>
                <FormItem class="formSubmit">
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="closeFormModal()" style="margin-left: 20px">取消</Button>
                </FormItem>
            </Form>

        </Modal>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: '',
        data () {
            return {


                /*表头信息*/
                duesColumns: [
                    {
                        title: '姓名',
                        key: 'stuName',
                        align: "center"
                    },
                    {
                        title: '学号',
                        key: 'userId',
                        align: "center"
                    },
                    {
                        title: '金额',
                        key: 'payment',
                        align: "center"
                    },
                    {
                        title: '类型',
                        slot: 'paymentType',
                        align: "center"
                    },
                    {
                        title: '支付时间',
                        slot: 'finishTime',
                        align: "center"
                    },
                ],
                //账号数据
                duesInfo: [],

                //搜索字段
                keyWords: '',

                //判断是否正在加载
                loading: true,

                //手动录入会费缴纳信息对话框是否显示
                isAddShow: false,
                //表单中的值
                formData: {
                    userId: '',
                    payment: '10.00',
                    finishTime: ''
                },
                //表单中的验证规则
                ruleValidate:{
                    userId: [{required: true, len: 10, message: '未输入学号或学号位数有误', trigger: 'blur'}],
                    payment: [{required: true, message: '请输入缴费金额', trigger: 'blur'}],
                    finishTime: [{required: true, type: 'date', message: '请选择缴费的时间', trigger: 'blur'}],
                },


                //分页数据
                currentPage: 1, //当前页
                total: 0, //数据总数
                currentSize: 10, //每页条数

            }
        },
        methods: {

            /*获取所有账号信息*/
            async getAllInfo(currentPage, currentSize){
                let info = await axios.get("/api/admin/comp/spend/getSpendDuesInfo", {
                    params:{page: currentPage, size: currentSize, search: this.keyWords},
                });
                return info.data;
            },

            /*映射信息*/
            mapperInfo(){
                this.getAllInfo(this.currentPage, this.currentSize).then(result => {
                    this.duesInfo = result.list;
                    this.currentPage = result.pageNum;
                    this.total = result.total;
                    this.currentSize = result.pageSize;
                    this.loading = false;
                });
            },

            //根据搜索字段查询信息
            searchByKeyWords(){
                let _self = this;
                document.onkeyup = function (ev) {
                    if (ev.keyCode == 13 && ev.which == 13){
                        _self.currentPage = 1;
                        _self.currentSize = 10;
                        _self.mapperInfo();
                    }
                }
            },

            //点击录入缴费信息，显示对话框
            addInfo(){
                this.formData.finishTime = this.formatDateTimeExact(new Date());
                this.$set(this.formData);
                this.isAddShow = true;
            },

            //提交录入缴费信息表单
            handleSubmit(name){
                this.$refs[name].validate(valid =>{
                    if (valid){
                        axios.post("/api/admin/comp/spend/updatePaymentInfo", {
                            userId: this.formData.userId,
                            payment: this.formData.payment,
                            finishTime: this.formData.finishTime
                        }).then(res =>{
                            if (res.status != 200){
                                this.$Message.error(res.message)
                            }else {
                                this.$Message.success("添加成功")
                            }
                        })
                    }else {
                        this.$Message.error("您未正确填入表格")
                    }
                })
            },

            //关闭对话框
            closeFormModal(){
                this.$refs['formValidate'].resetFields();
                this.isAddShow = false;
            },

            //改变页数
            changePage(current){
                this.currentPage = current;
                this.mapperInfo();
            },

            //改变每页条数
            changePageSize(pageSize){
                this.currentSize = pageSize;
                this.mapperInfo();
            },
        },

        created() {
            this.mapperInfo()
        }

    }
</script>

<style>

    .overview{
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

    .updateForm{
        margin: 20px 40px 20px 35px;
    }

    .formSubmit{
        margin-top: 60px;
        text-align: center;
    }

    .ivu-form-item-content{
        margin-left: 0!important;
    }
</style>