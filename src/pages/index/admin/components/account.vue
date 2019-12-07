<template>
    <div class="overview">
        <Row style="margin-bottom: 10px;">
            <Col span="8">
                <div style="font-size: 25px;font-weight: bold;">账号管理</div>
            </Col>
            <Col span="8" offset="8">
                <AutoComplete
                        v-model="keyWords"
                        transfer
                        clearable
                        placeholder="全局搜索"
                        icon="ios-search"
                        size="large"
                        @on-change="searchByKeyWords"
                        @on-clear="editIndex = -1"
                        >
                </AutoComplete>
            </Col>
        </Row>

        <!--主体内容，表格-->
        <Table border :columns="AccountColumns" :data="AccountInfo" size="large" :loading="loading">
            <template slot-scope="{ row }" slot="stuName">
                <span>{{ row.stuName }}</span>
            </template>

            <template slot-scope="{ row }" slot="stuPhone">
                <span>{{ row.stuPhone }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="stuAuthString">
                <Select transfer :placeholder="row.stuAuthString" :label-in-value="labelInValue" style="width:200px" v-if="editIndex === index" @on-open-change = "onOpenChange"  @on-change="onChange">
                    <Option v-for="item in AuthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span v-else>{{ row.stuAuthString }}</span>
            </template>

            <template slot-scope="{ row }" slot="stuDesc">
                <span>{{ row.stuDesc }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="action">
                <div v-if="editIndex === index">
                    <Button @click="handleSave(index)">保存</Button>
                    <Button @click="handleCancel">取消</Button>
                </div>
                <div v-else>
                    <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row, index)">修改</Button>
                    <Button type="error" size="small" @click="handleDelete(row)">删除</Button>
                </div>
            </template>
        </Table>

        <!--删除确认对话框-->
        <Modal
                v-model="isModalShow"
                @on-ok="deleteAccount"
                width="380"
                >
            <p slot="header" style="color:#f60;text-align: center"> <Icon type="ios-information-circle"></Icon> 删除账户</p>
            <p style="text-align: center;margin-top: 20px">该操作会永久删除该账号信息，仍要继续执行吗？</p>
            <br>
        </Modal>

        <br>

        <!--分页-->
        <Row type="flex" justify="end">
            <Col>
                <Page show-sizer :current="currentPage" :page-size="currentSize" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
            </Col>
        </Row>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: '',
        data () {
            return {

                /*权限列表*/
                AuthList: [],

                /*表头信息*/
                AccountColumns: [
                    {
                        title: '姓名',
                        slot: 'stuName',
                        align: "center"
                    },
                    {
                        title: '联系电话',
                        slot: 'stuPhone',
                        align: "center"
                    },
                    {
                        title: '角色',
                        slot: 'stuAuthString',
                        align: "center"
                    },
                    {
                        title: '描述',
                        slot: 'stuDesc',
                        align: "center"
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                //账号数据
                AccountInfo: [],

                //搜索字段
                keyWords: '',

                //判断是否正在加载
                loading: true,

                //是否同时返回value和label值
                labelInValue: true,

                //是否显现删除对话框
                isModalShow : false,


                //分页数据
                currentPage: 1, //当前页
                total: 0, //数据总数
                currentSize: 10, //每页条数

                //表格中编辑需要编辑的字段
                editStuId: '',
                editAuth: '',
                stuDesc: '',
                editIndex : -1 ,

            }
        },
            methods: {

            /*获取所有账号信息*/
            async getAllInfo(currentPage, currentSize){
                let info = await axios.get("/api/admin/comp/account/getAccountInfo", {
                    params:{page: currentPage, size: currentSize, search: this.keyWords},
                });
                return info.data;
            },

            /*映射信息*/
            mapperInfo(){
                this.getAllInfo(this.currentPage, this.currentSize).then(result => {
                    this.AccountInfo = result.list;
                    this.currentPage = result.pageNum;
                    this.total = result.total;
                    this.currentSize = result.pageSize;
                    this.loading = false;
                });
            },

            //根据搜索字段查询信息
            searchByKeyWords(){
                this.currentPage = 1;
                this.currentSize = 10;
                this.mapperInfo();
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

            /*用户点击修改后显示对应要修改的选择器*/
            handleEdit(row, index){
                this.editAuth = row.stuAuthString;
                this.editStuId = this.AccountInfo[index].stuId;
                this.editIndex = index;
                this.stuDesc = this.AccountInfo[index].stuDesc;
            },

            /*用户点击选择器展开时查询所有权限名称并赋值*/
            onOpenChange(isOpen){
                if (isOpen === true){
                    axios.get("/api/admin/comp/account/getAllAuth").then(result => {
                        this.AuthList = result.data
                    })
                }
            },

            /*改变选择器的值后给stuDesc赋值 和editAuth赋值，用来返回后端*/
            onChange(value){
                this.AccountInfo[this.editIndex].stuDesc = value.label;
                this.editAuth = value.value;
            },

            /*用户点击保存修改后，将数据传给后端操作*/
            handleSave(index){

                if (this.editAuth == this.stuAuth){
                    this.editIndex = -1;
                    return;
                }

                let formData = new FormData();
                formData.append("stuId", this.editStuId);
                formData.append("stuAuth", this.editAuth);
                axios.put("/api/admin/comp/account/updateAuth", formData).then();
                this.mapperInfo();
                this.editIndex = -1;
            },

            /*用户点击取消后，还原表格*/
            handleCancel(){
                this.AccountInfo[this.editIndex].stuDesc = this.stuDesc;
                this.editIndex = -1;
            },

            /*点击删除按钮*/
            handleDelete(row){
              this.editStuId = row.stuId;
              this.isModalShow = true;
            },

            /*点击删除对话框确定按钮后，根据学号删除该账户*/
            deleteAccount(){
            axios.delete("/api/admin/comp/account/deleteAccount/" + this.editStuId).then();
            this.mapperInfo();
            }
            
        },
        created() {
            this.mapperInfo()
        }

    }
</script>

<style>

</style>