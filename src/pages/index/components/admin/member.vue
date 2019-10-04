<template>
    <div class="admin" v-if="screenWidth > 500">
        <Row style="margin-bottom: 10px;">
            <Col span="8">
                <div style="font-size: 30px;font-weight: bold;">会员信息管理系统</div>
            </Col>
            <Col span="8">
                <AutoComplete
                        v-model="keywords"
                        :data="globalSearchData"
                        transfer
                        clearable
                        placeholder="全局搜索(试用)"
                        icon="ios-search"
                        size="large"
                        @on-change="searchByKeywords"
                        @on-clear="clearSearchComplete"
                        @on-blur="clearSearchComplete"
                        @on-select="chooseSearch">
                </AutoComplete>
            </Col>
        </Row>
        <Card>
            <Table
                    ref="table"
                    :columns="columns"
                    :loading="loading"
                    :data="search(searchName)"
                    size="large" :stripe="true"
                    @on-selection-change="selectStu"
            >
                <template slot-scope="{ row, index }" slot="id">
                    <Input type="text" v-model="editId" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuId }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="name">
                    <Input type="text" v-model="editName" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuName }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="gender">
                    <Input type="text" v-model="editGender" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuGender }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="nation">
                    <Input type="text" v-model="editNation" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuNation }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="status">
                    <Input type="text" v-model="editStatus" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuStatus }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="dept">
                    <Input type="text" v-model="editDept" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuDept }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="class">
                    <Input type="text" v-model="editClass" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuClass }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="phone">
                    <Input type="text" v-model="editPhone" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuPhone }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="email">
                    <Input type="text" v-model="editEmail" v-if="editIndex === index"/>
                    <span v-else>{{ row.stuEmail }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="info">
                    <Input type="textarea" v-model="editInfo" v-if="editIndex === index"/>
                    <Tooltip placement="top" max-width="200" v-else>
                        <span style="width: 200px" class="ivu-table-cell-tooltip-content">{{ row.stuInfo }}</span>
                        <div slot="content">
                            <p>{{ row.stuInfo }}</p>
                        </div>
                    </Tooltip>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <div v-if="editIndex === index">
                        <Button @click="saveBtn(row, index)">保存</Button>&nbsp;
                        <Button @click="editIndex = -1">取消</Button>
                    </div>
                    <div v-else>
                        <Button @click="modifyBtn(row, index)">修改</Button>&nbsp;
                        <Button type="error" @click="delBtn(row, index)">删除</Button>
                    </div>
                </template>
            </Table>
            <br>
            <ButtonGroup>
                <Button type="primary" shape="circle" size="large" @click="exportData(1)">
                    <Icon type="ios-download-outline"></Icon>
                    导出所有数据
                </Button>&nbsp;
                <Button type="primary" shape="circle" size="large" @click="exportData(2)">
                    <Icon type="ios-download-outline"></Icon>
                    导出排序和过滤后的数据
                </Button>&nbsp;
                <Button type="primary" shape="circle" size="large" @click="exportData(3)">
                    <Icon type="ios-download-outline"></Icon>
                    导出选中的数据
                </Button>
            </ButtonGroup>
            <Tooltip placement="right-start" theme="light">
                <Icon color="#828282" type="md-help-circle" size="25"></Icon>
                <div slot="content">
                    <p>说明：</p>
                    <p>切换页之后选中的会取消</p>
                    <p>IE9、Safari 需要手动修改后缀名为 .csv。</p>
                    <p>IE9暂时只支持英文，中文会显示为乱码。</p>
                </div>
            </Tooltip>
            <div style="float: right;" v-show="searchName === '' ? true : false">
                <Page
                        :total="total"
                        :current="page"
                        show-total show-sizer show-elevator
                        @on-change="changePage"
                        @on-page-size-change="changeSize">
                </Page>
            </div>
        </Card>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: "manage",
        data() {
            return {
                screenWidth: document.body.clientWidth,
                editIndex: -1,
                editId: '',
                editName: '',
                editGender: '',
                editNation: '',
                editClass: '',
                editStatus: '',
                editDept: '',
                editPhone: '',
                editEmail: '',
                editInfo: '',
                searchName: '',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left',
                    },
                    {
                        title: '姓名',
                        width: 160,
                        slot: 'name',
                        key: 'stuName',
                        fixed: 'left',
                        renderHeader: (h) => {
                            let _self = this;
                            return [
                                // h('span', {}, '姓名 '),
                                h('Input', {
                                    props: {
                                        suffix: 'md-return-left',
                                        placeholder: '姓名',
                                        clearable: true,
                                    },
                                    on: {
                                        input: function (event) {
                                            _self.searchName = event;
                                        },
                                        'on-enter': () => {
                                            // if (_self.searchName !== '') {
                                            //     _self.searchStuByName(_self.searchName.toLowerCase())
                                            // }
                                        },
                                        'on-clear': () => {
                                            _self.searchName = '';
                                            _self.total = _self.data.length;
                                        }
                                    }
                                })
                            ]
                        },
                        align: 'center',
                    },
                    {
                        title: '学号',
                        width: 150,
                        key: 'stuId',
                        align: 'center',
                        slot: 'id'
                    },
                    {
                        title: '性别',
                        key: 'stuGender',
                        slot: 'gender',
                        width: 100,
                        align: 'center',
                        filters: [
                            {
                                label: '男',
                                value: '男'
                            },
                            {
                                label: '女',
                                value: '女'
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            return row.stuGender === value;
                        }
                    },
                    {
                        title: '民族',
                        width: 150,
                        key: 'stuNation',
                        slot: 'nation',
                        align: 'center',
                    },
                    {
                        title: '政治面貌',
                        width: 150,
                        key: 'stuStatus',
                        slot: 'status',
                        align: 'center',
                    },
                    {
                        title: '院系/专业',
                        width: 200,
                        key: 'stuDept',
                        slot: 'dept',
                        align: 'center',
                        filters: [
                            {
                                label: '信息工程学院',
                                value: '信息工程学院'
                            },
                            {
                                label: '外国语学院',
                                value: '外国语学院'
                            },
                            {
                                label: '经济贸易学院',
                                value: '经济贸易学院'
                            },
                            {
                                label: '人文与艺术学院',
                                value: '人文与艺术学院'
                            },
                            {
                                label: '理学院',
                                value: '理学院'
                            },
                            {
                                label: '机械与电气工程学院',
                                value: '机械与电气工程学院'
                            },
                            {
                                label: '土木与建筑工程学院',
                                value: '土木与建筑工程学院'
                            },
                            {
                                label: '水利与生态工程学院',
                                value: '水利与生态工程学院'
                            },
                            {
                                label: '工商管理学院',
                                value: '工商管理学院'
                            },
                            {
                                label: '国际教育学院',
                                value: '国际教育学院'
                            },
                            {
                                label: '瑶湖学院',
                                value: '瑶湖学院'
                            },
                            {
                                label: '士官学院',
                                value: '士官学院'
                            },
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            return row.stuDept.includes(value);
                        }
                    },
                    {
                        title: '班级',
                        width: 150,
                        key: 'stuClass',
                        slot: 'class',
                        align: 'center',
                    },
                    {
                        title: '联系方式',
                        width: 150,
                        key: 'stuPhone',
                        slot: 'phone',
                        align: 'center',
                    },
                    {
                        title: '邮箱',
                        width: 200,
                        key: 'stuEmail',
                        slot: 'email',
                        align: 'center',
                    },
                    {
                        title: '简介',
                        key: 'stuInfo',
                        slot: 'info',
                        align: 'center',
                        width: 217
                    },
                    {
                        title: '操作',
                        width: 180,
                        slot: 'action',
                        align: 'center',
                        fixed: 'right',
                    }
                ],
                data: [],
                data1: [],
                data_search: [],
                total: 0,
                page: 1,
                limit: 10,
                loading: false,
                selectList: [],
                keywords: '',
                globalSearchData: []
            }
        },
        created() {
            if (this.screenWidth < 500) {
                this.$Modal.error({
                    title: '错误',
                    content: '暂不支持手机端！请用pc端重试'
                });
                return;
            }
            this.getAllStuInfo().then(result => {
                this.data = result;
                this.total = result.length;
                this.loading = false;
                this.getStuInfo();
            });
            // this.getStuByPage(this.page, this.limit)
        },
        methods: {
            searchByKeywords() {
                let _self = this;
                if (this.keywords === '') return;
                axios
                    .get('/api/comp/search', {
                        params: {
                            keywords: this.keywords
                        }
                    })
                    .then(res => {
                        if (res) {
                            _self.data_search = res.data;
                            _self.globalSearchData = _self.candidate(res.data);
                        }
                    })
            },
            async getAllStuInfo() {
                this.loading = true;
                var res = await axios.get('/api/comp/all');
                return res.data;
            },
            getStuInfo() {
                let start = (this.page - 1) * this.limit;
                this.data1 = this.data.slice(start, start + this.limit)
            },
            changePage(page) {
                this.page = page;
                this.getStuInfo();
            },
            changeSize(pageSize) {
                this.limit = pageSize;
                this.getStuInfo();
            },
            // 导出数据
            exportData(type) {
                if (type === 1) {
                    // console.log(this.data)
                    this.$refs.table.exportCsv({
                        filename: '所有会员数据',
                        columns: this.columns.filter((col, index) => index > 0 && index < 8),
                        data: this.data
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '过滤排序后的数据',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: '选中数据',
                        columns: this.columns.filter((col, index) => index > 0 && index < 8),
                        data: this.selectList
                    });
                }
            },
            selectStu(selection) {
                // console.log(selection)
                this.selectList = selection;
            },
            modifyBtn(row, index) {
                this.editIndex = index;
                this.editId = row.stuId;
                this.editName = row.stuName;
                this.editGender = row.stuGender;
                this.editDept = row.stuDept;
                this.editPhone = row.stuPhone;
                this.editEmail = row.stuEmail;
                this.editInfo = row.stuInfo;
                this.editStatus = row.stuStatus;
                this.editNation = row.stuNation;
                this.editClass = row.stuClass;
            },
            saveBtn(row, index) {
                this.data1[index].id = row.id;
                this.data1[index].stuId = this.editId;
                this.data1[index].stuName = this.editName;
                this.data1[index].stuGender = this.editGender;
                this.data1[index].stuDept = this.editDept;
                this.data1[index].stuPhone = this.editPhone;
                this.data1[index].stuEmail = this.editEmail;
                this.data1[index].stuInfo = this.editInfo;
                this.data1[index].stuClass = this.editClass;
                this.data1[index].stuNation = this.editNation;
                this.data1[index].stuStatus = this.editStatus;
                axios
                    .put('/api/comp', this.data1[index])
                    .then(res => {
                        if (res) {
                            this.$Message.success('修改成功');
                            this.editIndex = -1;
                        }
                    })
            },
            delBtn(row, index) {
                let _self = this;
                this.$Modal.confirm({
                    title: '警告',
                    content: '删除后无法恢复，确定要删除吗？',
                    onOk: () => {
                        axios
                            .delete('/api/comp', {
                                data: row
                            })
                            .then(res => {
                                if (res) {
                                    _self.$Message.success('删除成功');
                                    _self.data1.splice(index, 1)
                                }
                            })
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });
            },
            search(searchName) {
                if (searchName === '')
                    return this.data1;
                return this.data.filter(stu => {
                    if (stu.stuName.includes(searchName)) {
                        return stu;
                    }
                });
            },
            candidate() {
                let a = [];
                this.data_search.forEach(element => {
                    a.push(element.stu_id + ' ' + element.stu_name + ' ' + element.stu_gender + ' ' + element.stu_dept)
                });
                if (a.length === 0) {
                    a.push('暂无结果')
                }
                return a;
            },
            clearSearchComplete() {
                this.globalSearchData = [];
            },
            chooseSearch() {

            }
            // 分页搜索信息
            // getStuByPage(page, size) {
            //     this.loading = true;
            //     let _self = this;
            //     axios
            //     .get('/api/comp', {
            //         params: {
            //             page: page,
            //             size: size
            //         },
            //     }).then(res => {
            //         if (res) {
            //             _self.data = res.data.list;
            //             _self.total = res.data.total;
            //             _self.page = res.data.pageNum;
            //             _self.loading = false;
            //         }
            //     })
            // },
            // 异步搜索名字
            // searchStuByName(searchName) {
            //     var _self = this;
            //     axios
            //     .get('/api/comp/name/' + searchName)
            //     .then(res => {
            //         if (res) {
            //             this.data_search = res.data;
            //         }
            //     })
            // },
        }
    }
</script>
<style scoped>

</style>