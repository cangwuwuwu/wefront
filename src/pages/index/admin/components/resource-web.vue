<template>
    <div class="overview">
        <Row style="margin-bottom: 10px;">
            <Col span="8">
                <div style="font-size: 25px;font-weight: bold;">在线资源管理</div>
            </Col>
            <Col span="8" offset="8">
                <AutoComplete
                        v-model="keyWords"
                        transfer
                        clearable
                        placeholder="资源搜索"
                        icon="ios-search"
                        size="large"
                        @on-focus="searchByKeyWords"
                >
                </AutoComplete>
            </Col>
        </Row>
        <!--表格-->
        <Table ref="selection" size="large" :columns="infoColumns" :data="resourceInfo" :loading="loading" >
            <template slot-scope="{ row, index }" slot="resWebUrl">
                <Tooltip class="web-url-tooltip" max-width="300" :content="row.resWebUrl">
                    <div class="web-url"  @click="toWebUrl(row.resWebUrl)">{{row.resWebUrl}}</div>
                </Tooltip>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="formModalShow(row, index)">修改</Button>
                <Button type="error" size="small" @click="handleDelete(row)">删除</Button>
            </template>
        </Table>
        <br>
        <!--分页-->
        <Row>
            <Col span="2" style="text-align: center">
                <Button type="primary" @click="addInfo">新增</Button>
            </Col>
            <Col span="2" style="text-align: left;">
                <Button type="primary" @click="refresh">刷新</Button>
            </Col>
            <Col style="float: right">
                <Page show-sizer :current="currentPage" :page-size="currentSize" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
            </Col>
        </Row>

        <!--修改在线资源信息对话框-->
        <Modal
            v-model="isUpdateShow"
            width="620"
            :footer-hide="true"
            @on-cancel="closeFormModal"
            :styles="{top: '60px'}"
        >
            <p slot="header" style="text-align: center; font-size: 16px; ">增加/修改在线资源</p>
            <Form class="updateForm"  ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="80">
                <FormItem label="分类" prop="resWebType">
                    <Input v-model="formData.resWebType" placeholder="输入资源分类"></Input>
                </FormItem>
                <FormItem label="名称" prop="resWebName">
                    <Input v-model="formData.resWebName" placeholder="输入资源名称"></Input>
                </FormItem>
                <FormItem label="网址" prop="resWebUrl">
                    <Input v-model="formData.resWebUrl" placeholder="输入资源地址"></Input>
                </FormItem>
                <FormItem label="上传人" prop="resWebUper">
                    <Input v-model="formData.resWebUper" placeholder="输入上传人名字"></Input>
                </FormItem>
                <FormItem label="描述资源信息" prop="resWebDescribe">
                    <Input type="textarea" v-model="formData.resWebDescribe" :rows="4" placeholder="输入该资源的相关描述" />
                </FormItem>
                <FormItem class="formSubmit">
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleCancel()" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>

        </Modal>


        <!--删除确认对话框-->
        <Modal
                v-model="isDeleteModalShow"
                @on-ok="deleteResource"
                width="380"
        >
            <p slot="header" style="color:#f60;text-align: center"> <Icon type="ios-information-circle"></Icon> 删除资源信息</p>
            <p style="text-align: center;margin-top: 20px">该操作会永久删除该资源信息，仍要继续执行吗？</p>
            <br>
        </Modal>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'resource-web',

        data() {
            return {
                //表格头
                infoColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'resWebType',
                        width: 150,
                        // align: "center",
                        tooltip: true,
                        className: "text-ellipsis",
                    },
                    {
                        title: '名称',
                        key: 'resWebName',
                        width: 150,
                        // align: "center",
                        tooltip: true,
                        className: "text-ellipsis",
                    },
                    {
                        title: '描述',
                        key: 'resWebDescribe',
                        // align: "left",
                        className: "text-ellipsis",
                        tooltip: true,

                    },
                    {
                        title: '网址',
                        slot: 'resWebUrl',
                        className: "text-ellipsis",
                        // align: "center",
                        tooltip: true,
                        // render:(h,paramer)=>{
                        //     return h('a',{
                        //         style:{
                        //             color: '#515A6E'
                        //         }
                        //     }, paramer.row.resWebUrl)
                        // }
                    },
                    {
                        title: '上传人',
                        key: 'resWebUper',
                        width: 150,
                        align: "center",
                        tooltip: true,
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                //表格信息
                resourceInfo:[],
                //搜索字段
                keyWords: '',

                //显示修改的对话框
                isUpdateShow : false,
                //判断表格数据是否在加载
                loading : true,
                //当前修改行索引
                updateIndex: 0,
                //当前修改行的值
                updateRow: '',

                //是否为在线资源
                isWeb: 0,

                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },

                //表单中的值
                formData:{
                    id: '',
                    resWebType: '',
                    resWebName: '',
                    resWebUrl: '',
                    resWebUper: '',
                    resWebDescribe: ''
                },
                //表单中的验证规则
                ruleValidate:{
                    resWebType: [{required: true, message: '请输入在线资源所属类别', trigger: 'blur'}],
                    resWebName: [{required: true, message: '请输入在线资源名称', trigger: 'blur'}],
                    resWebUrl: [{required: true, message: '请输入在线资源地址', trigger: 'blur'}],
                    resWebUper: [{required: true, message: '请输入在线资源上传人名称', trigger: 'blur'}],
                    resWebDescribe: [{required: false}],
                },

                //是否显现删除对话框
                isDeleteModalShow : false,
                editResId: '',

                //当前页
                currentPage: 1,
                //当前页的大小
                currentSize: 10,
                //总条数
                total: 5,
            }
        },
        methods:{
            /*加载所有信息*/
            async getInfo(currentPage, currentSize){
                let info = await axios.get("/api/admin/comp/res/getResourceWebInfo", {
                    params:{page: currentPage, size: currentSize, search: this.keyWords}
                });
                return info.data;
            },
            /*映射信息*/
            mapperInfo(){
                this.getInfo(this.currentPage, this.currentSize).then(info => {
                    this.resourceInfo = info .list;
                    this.currentPage = info.pageNum;
                    this.currentSize = info.pageSize;
                    this.total = info.total;
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

            /*点击修改表单*/
            formModalShow(row, index){
                this.formData = row;
                this.updateRow = JSON.parse(JSON.stringify(row));
                this.updateIndex = index;
                this.isUpdateShow = true;

            },
            /*提交修改/增加资源信息表单*/
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post("/api/admin/comp/res/updateOrInsertResourceWeb", {
                            id: this.formData.id,
                            resWebType: this.formData.resWebType,
                            resWebName: this.formData.resWebName,
                            resWebUrl: this.formData.resWebUrl,
                            resWebUper: this.formData.resWebUper,
                            resWebDescribe: this.formData.resWebDescribe
                        }).then( res => {
                            this.isUpdateShow = false;
                            if (res.status == 200){
                                this.$Message.success("修改成功");
                            }
                        })
                    } else {
                        this.$Message.error('您未正确的填入表格');
                    }
                });

            },
            /*取消提交*/
            handleCancel(){
                this.$set(this.resourceInfo, this.updateIndex, this.updateRow);
                this.isUpdateShow = false;
            },

            /*关闭修改修改*/
            closeFormModal(){
                this.$set(this.resourceInfo, this.updateIndex, this.updateRow);
                this.isUpdateShow = false;
            },

            /*新增资源信息*/
            addInfo(){
                this.$refs['formValidate'].resetFields();
                this.isUpdateShow = true;
            },

            /*点击删除按钮*/
            handleDelete(row){
                this.editResId = row.id;
                this.isDeleteModalShow = true;
            },

            /*点击删除对话框确定按钮后，根据学号删除该账户*/
            deleteResource(){
                axios.delete("/api/admin/comp/res/deleteResourceWeb/" + this.editResId).then(res => {
                    if (res.status == 200) {
                        this.$Message.success("删除成功");
                    }
                });
                this.mapperInfo();
            },

            /*刷新页面*/
            refresh(){
                location.reload();
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

            //点击网址进行跳转
            toWebUrl(url){
                window.location.href = url;
            }
        },
        created() {
            this.mapperInfo();
        },
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

    .demo-drawer-footer{
        width: 100%;
        margin-top: 40px;
        margin-right: 15px;
        left: 0;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }

    .updateForm{
        margin: 20px 40px 100px 35px;
    }

    .formSubmit{
        float:right;
        margin-right: 20px;
        margin-top: 10px;
    }

    .text-ellipsis{
        /*display: block;*/
        text-align: left;
        padding-left: 30px;
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
    }

    .web-url{
        width: 100%;
        height: 100%;
        height: inherit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #515A6E;
    }

    .web-url:hover{
        color: #515A6E;
        cursor: pointer;
    }

   .web-url-tooltip{
       width: 100%;
       display: flex;
       align-items: center;
   }

</style>