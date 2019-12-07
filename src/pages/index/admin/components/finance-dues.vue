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
                        @on-change="searchByKeyWords"
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
        <Row type="flex" justify="end">
            <Col>
                <Page transfer show-sizer :current="currentPage" :page-size="currentSize" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
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
        },
        created() {
            this.mapperInfo()
        }

    }
</script>

<style>

</style>