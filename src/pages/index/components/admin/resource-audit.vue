<template>
    <div class="resource-audit">
        <Row style="margin-bottom: 10px;">
            <Col span="8">
                <div style="font-size: 25px;font-weight: bold;">资源审核</div>
            </Col>
            <Col span="8" offset="8">
                <AutoComplete
                        v-model="keyWords"
                        transfer
                        clearable
                        placeholder="资源搜索"
                        icon="ios-search"
                        size="large"
                        @on-change="searchByKeyWords"
                >
                </AutoComplete>
            </Col>
        </Row>

        <!--审核资源标签页-->
        <Tabs type="card"  :animated="false" @on-click="clickTable" >
            <!--审核网盘资源-->
            <TabPane label="网盘资源审核">
                <Table ref="selection" :columns="webDiskInfoColumns" :data="resourceInfo" :loading="loading" @on-row-dblclick="rowClick">
                    <template slot-scope="{ row, index }" slot="resUpTime">
                        {{row.resUpTime | formatDate}}
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="approved(row, index)">通过</Button>
                        <Button type="error" size="small" @click="handleDelete(row, index)">删除</Button>
                    </template>
                </Table>

                <!--审核在线资源-->
            </TabPane>
            <TabPane label="在线资源审核">
                <!--表格-->
                <Table ref="selection" :columns="webColumns" :data="resourceInfo" :loading="loading">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="approved(row, index)">通过</Button>
                        <Button type="error" size="small" @click="handleDelete(row, index)">删除</Button>
                    </template>
                </Table>
            </TabPane>
        </Tabs>
        <br>
        <!--分页-->
        <Row>
            <Col style="float: right">
                <Page show-sizer :current="currentPage" :page-size="currentSize" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
            </Col>
        </Row>

        <!--网盘未审核资源具体信息-->
        <Modal
                v-model="isShow"
                width="680"
                :footer-hide="true"
                @on-cancel="closeFormModal"
                :styles="{top: '60px'}"
        >
            <p slot="header" style="text-align: center; font-size: 16px">网盘资源待审核信息</p>
            <Form   :model="formData" label-position="top" style="padding: 0 20px 0 20px">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="上传人" label-position="top">
                            <Input v-model="formData.resUploader"  placeholder="上传人姓名" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="名称" label-position="top">
                            <Input v-model="formData.resName" placeholder="资源名称" readonly/>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="分类" label-position="top">
                            <Input v-model="formData.resType" placeholder="资源分类名称"  readonly />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="类别" label-position="top">
                            <Input v-model="formData.resForm == 1 ? '基础学习' : formData.resForm == 2 ? '进阶面试' :
                            formData.resForm == 3 ? '实战项目' : formData.resForm == 4 ? '文档/PDF' : '未知'"
                                   placeholder="类别" readonly/>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="资源网址" label-position="top">
                            <Input v-model="formData.resUrl" placeholder="输入资源下载/观看网址" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="提取码" label-position="top">
                            <Input v-model="formData.resPassword" placeholder="如果资源下载网址非网盘，可不填" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="上传时间" label-position="top">
                            <DatePicker
                                    v-model="formData.resUpTime"
                                    :editable="false"
                                    readonly
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    transfer
                                    placeholder="选择时间和日期">
                            </DatePicker>
                        </FormItem>
                    </Col>

                </Row>

                <FormItem label="描述资源信息" label-position="top">
                    <Input type="textarea" v-model="formData.resDescribe" :rows="4" placeholder="输入该资源的相关描述" readonly/>
                </FormItem>

                    <Button class="demo-drawer-footer" type="primary" @click="handleSubmit">确定</Button>
                <br>
                <br>
            </Form>
        </Modal>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'resource-audit',
        data(){
            return{

                //是否为在线资源
                isWeb: false,

                //网盘资源表头
                webDiskInfoColumns: [
                    {
                        title: '分类',
                        key: 'resType',
                        align: "center"
                    },
                    {
                        title: '名称',
                        key: 'resName',
                        align: "center"
                    },
                    {
                        title: '上传时间',
                        slot: 'resUpTime',
                        align: "center"
                    },
                    {
                        title: '上传人',
                        key: 'resUploader',
                        align: "center"
                    },
                    {
                        title: '审核',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],

                //在线资源表头
                webColumns: [
                    {
                        title: '分类',
                        key: 'resWebType',
                        width: 150,
                        align: "center"
                    },
                    {
                        title: '名称',
                        key: 'resWebName',
                        width: 150,
                        align: "center"
                    },
                    {
                        title: '描述',
                        key: 'resWebDescribe',
                        align: "center",
                    },
                    {
                        title: '网址',
                        key: 'resWebUrl',
                        align: "center"
                    },
                    {
                        title: '上传人',
                        key: 'resWebUper',
                        width: 150,
                        align: "center"
                    },
                    {
                        title: '审核',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],

                //资源信息
                resourceInfo:[],
                //判断网盘表格数据是否在加载
                loading : true,
                //网盘资源具体信息显示对话框
                isShow: false,
                //对话框数据
                formData:{},
                //搜索字段
                keyWords: '',
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
            async getInfo(currentPage, currentSize, uri){
                let info = await axios.get("/api/admin/comp/res/" + uri, {
                    params:{page: currentPage, size: currentSize, search: this.keyWords}
                });
                return info.data;
            },
            /*映射信息*/
            mapperInfo(){
                let uri = 'getResourceAuditInfo';
                if (this.isWeb){
                    uri = 'getResourceWebAuditInfo';
                }
                this.getInfo(this.currentPage, this.currentSize, uri).then(info => {
                    this.resourceInfo = info .list;
                    this.currentPage = info.pageNum;
                    this.currentSize = info.pageSize;
                    this.total = info.total;
                    this.loading = false;
                });
            },

            //根据搜索字段查询信息
            searchByKeyWords(){
                this.currentPage = 1;
                this.currentSize = 10;
                this.mapperInfo();
            },

            //点击tab标签
            clickTable(name){
                this.currentPage = 1;
                this.currentSize = 10;
                this.loading = true;
                if (name == '0'){
                    this.isWeb = false;
                }else {
                    this.isWeb = true;
                }
                this.mapperInfo();
            },

            //点击网盘资源表格某一行显示具体信息
            rowClick(row, index){
                this.isShow = true;
                this.formData = row;
            },

            //网盘具体信息表格确定按钮
            handleSubmit(){
                this.isShow = false;
            },

            //通过审核
            approved(row, index){
                let data = JSON.stringify(row);
                let uri = 'approvedResAudit';
                if (this.isWeb){
                    uri = 'approvedResWebAudit';
                }
                axios({
                    method: 'post',
                    url: "/api/admin/comp/res/" + uri,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                }).then(res => {
                    if (res.status == 200){
                                this.$Message.info("操作成功成功");
                                this.resourceInfo.splice(index, 1);
                    }
                });
            },

            //未通过进行删除
            handleDelete(row, index){
                let id = row.resId;
                let uri = 'unApprovedResAudit';
                if (this.isWeb){
                    id = row.id;
                    uri = 'unApprovedResWebAudit';
                }
                axios.delete("/api/admin/comp/res/" + uri + '/' + id).then(res => {
                    if (res.status == 200){
                        this.$Message.info("删除成功");
                    }
                });
                this.resourceInfo.splice(index, 1);
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
            this.mapperInfo();
        },
    }
</script>

<style>
    .demo-drawer-footer{
        float: right;
        overflow: hidden;
        /*margin-right: 20px;*/
        /*margin-bottom: 20px;*/
    }
</style>