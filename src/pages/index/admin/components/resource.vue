<template>
  <div class="overview">
      <Row style="margin-bottom: 10px;">
          <Col span="8">
              <div style="font-size: 25px;font-weight: bold;">网盘资源管理</div>
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
      <!--表格-->
    <Table ref="selection" :columns="infoColumns" :data="resourceInfo" :loading="loading">
        <template slot-scope="{ row, index }" slot="resStatus">
            {{ (row.resMore.resStatus) == 1 ? '有效' : '无效'}}
        </template>
        <template slot-scope="{ row, index }" slot="resUpTime">
            {{row.resUpTime | formatDate}}
        </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="drawerShow(row, index)">修改</Button>
        <Button type="error" size="small" @click="handleDelete(row)">删除</Button>
      </template>
    </Table>
      <br>
      <!--分页-->
      <Row>
          <Col span="2" style="text-align: center">
              <Button type="primary" @click="addInfo">新增</Button>
          </Col>
          <Col style="float: right">
              <Page show-sizer :current="currentPage" :page-size="currentSize" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
          </Col>
      </Row>

      <!--修改抽屉-->
      <div>
          <Drawer
                  title="修改/增加 资源"
                  v-model="isDrawerShow"
                  width="720"
                  :mask-closable="false"
                  :styles="styles"
                  @on-close="closeDrawer"
          >
              <Form ref="formValidate"   :model="formData" label-position="top"  :rules="ruleResource">
                  <Row :gutter="32">
                      <Col span="12">
                          <FormItem label="分类" label-position="top" prop="resType">
                              <Input v-model="formData.resType" placeholder="输入资源分类名称" />
                          </FormItem>
                      </Col>
                      <Col span="12">
                          <FormItem label="名称" label-position="top" prop="resName">
                              <Input v-model="formData.resName" placeholder="输入资源名称"/>
                          </FormItem>
                      </Col>
                  </Row>
                  <Row :gutter="32">
                      <Col span="12">
                          <FormItem label="状态" label-position="top"  prop="resMore.resStatus">
                                  <Select v-model="formData.resMore.resStatus"  :placeholder="formData.resMore.resStatus == 1 ? '有效' : '无效' ">
                                  <Option value="1">有效</Option>
                                  <Option value="0">无效</Option>
                              </Select>
                          </FormItem>
                      </Col>
                      <Col span="12">
                          <FormItem label="上传时间" label-position="top" prop="resUpTime">
                              <DatePicker
                                      v-model="formData.resUpTime"
                                      :editable="false"
                                      type="datetime"
                                      format="yyyy-MM-dd HH:mm"
                                      transfer
                                      placeholder="选择时间和日期">
                              </DatePicker>
                          </FormItem>
                      </Col>
                  </Row>
                  <Row :gutter="32">
                      <Col span="12">
                          <FormItem label="上传人" label-position="top" prop="resUploader">
                              <Input v-model="formData.resUploader"  placeholder="输入上传人姓名"/>
                          </FormItem>
                      </Col>
                      <Col span="12">
                          <FormItem label="类别" label-position="top" prop="resForm">
                              <Select v-model="formData.resForm" :placeholder="formData.resForm == 1 ?
                                                            '基础学习' : formData.resForm == 2 ? '进阶面试' :
                                                         formData.resForm == 3 ? '实战项目' : formData.resForm == 4 ? '文档/PDF' : '未知'">
                                  <Option value="1">基础学习</Option>
                                  <Option value="2">进阶面试</Option>
                                  <Option value="3">实战项目</Option>
                                  <Option value="4">文档/PDF</Option>
                              </Select>
                          </FormItem>
                      </Col>
                  </Row>
                  <Row :gutter="32">
                      <Col span="12">
                          <FormItem label="资源网址" label-position="top" prop="resUrl">
                              <Input v-model="formData.resUrl" placeholder="输入资源下载/观看网址"/>
                          </FormItem>
                      </Col>
                      <Col span="12">
                          <FormItem label="提取码" label-position="top" prop="resPassword">
                              <Input v-model="formData.resPassword" placeholder="如果资源下载网址非网盘，可不填"/>
                          </FormItem>
                      </Col>
                  </Row>
                  <Row :gutter="32">
                      <Col span="12">
                          <FormItem label="评分" label-position="top">
                              <InputNumber :max="5" :min="0" :step="0.5" v-model="formData.resMore.resPoint"></InputNumber>
                          </FormItem>
                      </Col>
                      <Col span="12">
                          <FormItem label="下载量" label-position="top">
                              <InputNumber  :min="0" v-model="formData.resMore.resHeat"></InputNumber>
                          </FormItem>
                      </Col>
                  </Row>
                  <FormItem label="描述资源信息" label-position="top">
                      <Input type="textarea" v-model="formData.resDescribe" :rows="4" placeholder="输入该资源的相关描述" />
                  </FormItem>

                  <FormItem class="demo-drawer-footer">
                      <Button style="margin-right: 20px" @click="handleCancel">取消</Button>
                      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                  </FormItem>
              </Form>
          </Drawer>
      </div>

      <!--删除确认对话框-->
      <Modal
              v-model="isModalShow"
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
    import resourceTable from './resource-hide-table'
export default {
    name: 'resource',
    components:{
      resourceTable
    },
    data() {
        return {
            //表格头
          infoColumns: [
            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                return h(resourceTable, {
                  props: {
                    row: params.row,
                    row2ResMore: params.row.resMore
                  }
                })
              }
            },
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
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
                title: '状态',
                slot: 'resStatus',
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
            //显示修改的抽屉
            isDrawerShow : false,
            //判断表格数据是否在加载
            loading : true,
            //当前修改行索引
            updateIndex: 0,
            //当前修改行的值
            updateRow: '',

            //是否为在线文档
            isWeb: 0,

            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            //表单中的值
            formData: {
                resId: '',
                resForm: '',
                resType: '',
                resName: '',
                resDescribe: '',
                resUrl: '',
                resPassword: '',
                resUpTime: '',
                resMore: {
                    resId: '',
                    resStatus: 0,
                    resPoint: 0,
                    resHeat: 0,
                },
                resUploader: ''
            },

            //表单字段校验规则
            ruleResource:{
                resForm:[{required: true, message: '请输入资源所属类别', trigger: 'blur'}],
                resName:[{required: true, message: '请输入资源名称', trigger: 'blur'}],
                resType:[{required: true, message: '请输入资源分类', trigger: 'blur'}],
                resUrl:[{required: true, message: '请输入资源地址', trigger: 'blur'}],
                resPassword:[{required: false, message: '如果资源下载网址非网盘，可不填', trigger: 'blur'}],
                resUpTime:[{required: true, message: '请输入资源上传时间', pattern: /.+/, trigger: 'change'}],
                resUploader:[{required: true, message: '请输入资源上传人', trigger: 'blur'}],
                'resMore.resStatus':[{required: true, message: '请输入资源状态', trigger: 'blur'}],
            },

            //是否显现删除对话框
            isModalShow : false,
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
            let info = await axios.get("/api/admin/comp/res/getResourceInfo", {
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
            this.currentPage = 1;
            this.currentSize = 10;
            this.mapperInfo();
        },

        /*点击修改表单*/
        drawerShow(row, index){
            this.formData = row;
            this.updateRow = JSON.parse(JSON.stringify(row));
            this.updateIndex = index;
            this.isDrawerShow = true;

        },
        /*提交修改/增加资源信息表单*/
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post("/api/admin/comp/res/updateOrInsertResource", {
                        resId: this.formData.resId,
                        resForm: this.formData.resForm,
                        resType: this.formData.resType,
                        resName: this.formData.resName,
                        resDescribe: this.formData.resDescribe,
                        resUrl: this.formData.resUrl,
                        resPassword: this.formData.resPassword,
                        resUpTime: this.formData.resUpTime,
                        resMore: this.formData.resMore,
                        resUploader: this.formData.resUploader,
                        resIsWeb: this.isWeb,
                    }).then( res => {
                        this.isDrawerShow = false;
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
            this.isDrawerShow = false;
        },

        /*关闭修改抽屉*/
        closeDrawer(){
            this.$set(this.resourceInfo, this.updateIndex, this.updateRow);
            this.isDrawerShow = false;
        },

        /*新增资源信息*/
        addInfo(){
            this.$refs['formValidate'].resetFields();
            this.isDrawerShow = true;
        },

        /*点击删除按钮*/
        handleDelete(row){
            this.editResId = row.resId;
            this.isModalShow = true;
        },

        /*点击删除对话框确定按钮后，根据学号删除该账户*/
        deleteResource(){
            axios.delete("/api/admin/comp/res/deleteResource/" + this.editResId).then(res => {
                if (res.status == 200){
                    this.$Message.success("删除成功");
                }
            });
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
        this.mapperInfo();
    },
}
</script>

<style>
    .demo-drawer-footer{
        width: 100%;
        margin-top: 40px;
        margin-right: 15px;
        left: 0;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>