<template>
  <div class="overview">
    <Row style="margin-bottom: 10px;">
      <Col span="8">
        <div style="font-size: 25px;font-weight: bold;">财务管理</div>
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
    <Table border ref="selection" :columns="infoTitle" :data="spendInfo" :loading="loading"
           @on-select-all="selectAll"
           @on-select-all-cancel="selectAllCancel" @on-select="onSelect"
           @on-select-cancel="onSelectCancel"
    >
      <template slot-scope="{ row, index }" slot="money">
        <strong>{{ row.type + row.number}}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="time">
        <span>{{ row.time | formatDate}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row, index)">修改</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>

    <br>
    <span style="font-size: 16px">社团经费余额：{{balance}}</span>
    <span v-if="totalMoney === '0'" style="font-size: 16px; margin-left: 30px">计算收支：--</span>
    <span v-else style="font-size: 16px; margin-left: 30px">计算收支：{{totalMoney}}</span>
    <!--分页-->
    <Row type="flex" justify="end">
      <Col>
        <Page show-sizer :current="currentPage" :page-size="currentSize" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
      </Col>

    </Row>

    <!--修改会费信息对话框-->
    <Modal
            v-model="updateModelShow"
            width="680"
            :footer-hide="true"
            :styles="{top: '40px'}"
           >
        <p  style="text-align: center; font-size: 24px">修改收支信息</p>

      <div class="spend">
          <div >
            <Steps :current="current">
              <Step title="收支信息"></Step>
              <Step title="相关图片"></Step>
              <Step title="上报人信息"></Step>
              <Step title="完成上报"></Step>
            </Steps>
          </div>
        <br>
          <!-- <router-view></router-view> -->
          <Carousel v-if="updateModelShow" v-model="current" arrow="never" dots="none" :height="480">
            <CarouselItem>
                  <div class="money-title">收支信息</div>
                  <Form ref="formSpend1" :model="money" label-position="top" :rules="ruleSpend">
                    <Row>
                      <Col span="6" offset="6">
                        <FormItem label="收入/支出" prop="type">
                          <RadioGroup v-model="money.type" type="button">
                            <Radio label="+">
                              <span>收入</span>
                            </Radio>
                            <Radio label="-">
                              <span>支出</span>
                            </Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                      <Col span="10" offset="2">
                        <FormItem label="金额" prop="number">
                          <InputNumber
                                  :max="10000"
                                  v-model="money.number"
                                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                  :parser="value => value.replace(/$s?|(,*)/g, '')">
                          </InputNumber>
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem label="收支时间" prop="time" style="margin: 20px 10px">
                      <DatePicker
                              v-model="money.time"
                              :editable="false"
                              type="datetime"
                              format="yyyy-MM-dd HH:mm"
                              transfer
                              style="width: 100%"
                              placeholder="选择时间和日期">
                      </DatePicker>
                    </FormItem>
                    <FormItem label="收支描述" prop="desc" style="margin: 20px 10px">
                      <Input clearable type="text" v-model="money.desc"
                             placeholder="一句话描述"></Input>
                    </FormItem>
                    <FormItem label="补充" prop="others" style="margin: 20px 10px">
                      <Input clearable type="textarea" v-model="money.others"
                             placeholder="还有任何这项收支的补充吗" :autosize="{minRows: 2,maxRows: 4}">
                      </Input>
                    </FormItem>
                  </Form>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carousel">
                <div style="margin-left: 20px" class="expand-value">
                  <a target="_blank" :href="'http://39.106.85.24:9000/wecoding/' + money.big.split(',')[index]" v-for="(img,index) in money.small.split(',')" :key="index">
                    <img style="margin-left: 10px" title="放大"  :src="'http://39.106.85.24:9000/wecoding/' + img"/>
                  </a>
                </div>
                <UpImg @getImg="getImgMethod"/>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carousel">
                <div class="first step">
                  <div class="money-title">上报人信息</div>
                  <Form ref="formSpend2" label-position="top" :model="money" :rules="ruleSpend">
                    <FormItem label="姓名" prop="name">
                      <Input clearable type="text" v-model="money.name" placeholder="你的名字" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                      </Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                      <Input
                              clearable
                              type="text"
                              v-model="money.email"
                              placeholder="以便及时的通知你"
                              @keyup.enter.native="next()">
                        <Icon type="ios-mail-outline" slot="prepend"></Icon>
                      </Input>
                    </FormItem>
                  </Form>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carousel">
                <div class="first step">
                  <div v-if="resultStatus === 1" class="money-title"
                       style="color: #EE4000;font-size: 30px;">
                    <Icon type="ios-close-circle-outline" size="40"/>
                    意外错误
                  </div>
                  <div v-else>
                    <div class="money-title" style="color: #5cb85c">
                      <Icon type="md-checkmark-circle-outline" size="30"/>
                      上报成功
                    </div>
                    <div class="step3-title">如长时间没有答复,直接QQ联系</div>
                    <div style="text-align: center;">
                      <img src="http://39.106.85.24:8999/money_qq.png"/>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        <Row type="flex" justify="center" align="middle">
          <ButtonGroup>
            <Button v-show="current !== 3" type="primary" @click="previous" :disabled="current === 0">上一步
            </Button>
            <Button v-show="current !== 3" :type="current === 2 ? 'default' : 'primary'" @click="next">
              {{ current === 2 ? '完成' : '下一步' }}
            </Button>
          </ButtonGroup>
        </Row>
      </div>

        <!--<Spin size="large" fix v-if="Listloading">
          <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5"
                      stroke-miterlimit="10"></circle>
            </svg>
          </div>
          <span style="font-size: 15px;color: black">正在提交...</span>
        </Spin>-->
    </Modal>

    <!--删除确认对话框-->
    <Modal
            v-model="isModalShow"
            @on-ok="deleteAccount"
            width="380"
    >
      <p slot="header" style="color:#f60;text-align: center"> <Icon type="ios-information-circle"></Icon> 删除会费开支信息</p>
      <p style="text-align: center;margin-top: 20px">该操作会永久删除该条会费开支信息，仍要继续执行吗？</p>
      <br>
    </Modal>
  </div>
</template>


<script>
  import axios from 'axios'
  import hideTable from './finance-hide-table'
  import UpImg from '@/pages/index/spend/components/upimg.vue'

export default {

    name: 'finance',
    components: {
      hideTable,
      UpImg
    },
    data() {
        return {
          infoTitle : [

            {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                return h(hideTable, {
                  props: {
                    row: params.row
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
              title: '收支信息',
              key: 'desc',
              align: "center"
            },
            {
              title: '上报人',
              key: 'name',
              align: "center"
            },
            {
              title: '金额',
              slot: 'money',
              align: "center"
            },
            {
              title: '时间',
              slot: 'time',
              align: "center"
            },
            {
              title: 'Action',
              slot: 'action',
              width: 150,
              align: 'center'
            }
          ],

          ruleSpend: {
            type: [
              {required: true, message: '收支是必选项', trigger: 'blur'}
            ],
            number: [
              {required: true, type: 'number', message: '金额不能为空', trigger: 'blur'},
              {
                validator: (rule, value, callback) => {
                  if (value < 1) {
                    callback(new Error('请输入正确的金额'));
                  } else {
                    callback();
                  }
                }
              }
            ],
            email: [
              {required: true, message: '邮箱不能为空', trigger: 'blur'},
              {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
            ],
            time: [
              {required: true, message: '必须选择收支时间', pattern: /.+/, trigger: 'change'}
            ],
            desc: [
              {required: true, message: '简介不能为空', trigger: 'blur'}
            ],
            name: [
              {required: true, message: '姓名不能为空', trigger: 'blur'}
            ],
          },

          //收支信息
          spendInfo: [],
          //总开支
          totalMoney: '0',
          //协会经费余额
          balance: '0',
          //搜索字段
          keyWords: '',
          //判断表格数据是否正在加载
          loading : true,
          //是否显示修改会费对话框
          updateModelShow: false,
          //修改对话框中走马灯组件的索引
          current : 0,

          //选中当前行的账户信息
          resultStatus : 1,
          //选中当前行的id
          editSpendId: 0,
          //是否显现删除对话框
          isModalShow : false,

          Listloading: false,
          money: {
            id: 0,
            type: '',
            time: '',
            others: '',
            name: '',
            number: 0,
            email: '',
            small: '',
            big: '',
            desc: '',
          },

          //当前页
          currentPage: 1,
          //当前每页条数
          currentSize: 10,
          //总条数
          total: 0,
        }
    },

    methods:{
      //加载所有收支信息
      async getInfo(currentPage, currentSize){
        let spend = await axios.get("/api/admin/comp/spend/getSpendInfo", {
          params:{
            page: currentPage,
            size: currentSize,
            search: this.keyWords
          }
        });
        return spend.data;
      },

      /*映射信息*/
      mapperInfo(){
        this.getInfo(this.currentPage, this.currentSize).then(result => {
          this.spendInfo = result.list;
          this.currentPage = result.pageNum;
          this.total = result.total;
          this.currentSize = result.pageSize;
          this.loading = false;
        });
      },

      /*查询协会经费余额*/
      async getSpendBalance(){
          await axios.get("/api/admin/comp/spend/getSpendBalance").then(res => {
          this.balance = res.data;
        });
      },

      /*根据搜索字段查询*/
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

      /*查询余额*/


      //改变页数
      changePage(current){
        this.currentPage = current;
        this.mapperInfo();
      },

      //改变每页条数
      changePageSize(pageSize){
        this.pageSize = pageSize;
        this.mapperInfo();
      },

      //全选
      selectAll(selection){
        let equtation =  '';
        for (let res of selection){
           equtation = equtation +(res.type+res.number);
        }
        this.totalMoney = eval(equtation);
      },

      //取消全选
      selectAllCancel(selection){
        this.totalMoney = '0';
      },

      //选中某一行时
      onSelect(selection, row){
        let op = '+';
        let equtation = (row.type+row.number) + op + this.totalMoney;
        this.totalMoney = eval(equtation);
      },

      //取消选中某一行
      onSelectCancel(selection, row){
        let equtation = -(row.type+row.number)  + this.totalMoney;
        this.totalMoney = eval(equtation);
      },

      //点击修改显示对话框
      show(row, index){
        this.updateModelShow = true;
        this.money = JSON.parse(JSON.stringify(row));
        this.updateIndex = index;
        this.current = 0;
        // console.log(this.money);
        // console.log(this.current);

      },
      //控制走马灯显示
      next() {
        let _self = this;
        if (this.current === 2) {
          this.$refs['formSpend1'].validate((valid) => {
            if (valid) {
              this.$refs['formSpend2'].validate((valid) => {
                if (valid) {
                  this.Listloading = true;
                  axios.post("/api/admin/comp/spend/updateOrInsertSpend", {
                            id: this.money.id,
                            type: this.money.type,
                            time: this.money.time,
                            others: this.money.others,
                            name: this.money.name,
                            number: this.money.number,
                            email: this.money.email,
                            desc: this.money.desc,
                           /* small: this.money.small.join(','),
                            big: this.money.big.join(',')*/
                          })
                          .then(res => {
                            if (res.status == 200) {
                             _self.Listloading = false;
                              _self.current = 3;
                              this.$Message.success('Success!');
                              this.$set(this.spendInfo, this.updateIndex, this.money)
                            }
                          });

                  this.resultStatus = 0;
                } else {
                  this.$Message.error('上报人信息填写有误!');
                }
              })
            } else {
              this.$Message.error('基本信息填写有误!');
              this.current = 0;
            }
          });
          return;
        }
        this.current += 1;
      },

      //点击显示删除对话框
      remove(row){
        this.editSpendId = row.id;
        this.isModalShow = true;
      },

      //删除指定行的会费开支信息
      deleteAccount(){
        axios.delete("/api/admin/comp/spend/deleteSpend/" + this.editSpendId).then(res => {
          if (res.status == 200){
            this.$Message.success("删除成功");
            this.mapperInfo();
          }
        })

      },

      previous() {
        this.current -= 1;
      },
      getImgMethod(small, big) {
        this.money.small = small;
        this.money.big = big;
      },
    },

    created() {
      this.mapperInfo();
      this.getSpendBalance();

    }
}
</script>

<style scoped lang="less">
  @media screen and (max-width: 770px) {
    .step {
      width: 100%;
      margin: auto;
    }

    .row-top {
      padding-top: 0 !important;
    }

    .money-content {
      width: 100%;
      margin: auto
    }

    .row-money-top {
      padding-top: 20px !important;
      padding-bottom: 20px !important;
    }
  }

  .row-money-top {
    padding-top: 100px;
    padding-bottom: 50px;
  }

  .row-top {
    padding-top: 130px;
  }

  .step3-title {
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .financial-head {
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: solid @primary-color;
    margin-bottom: 5px;
  }

  .spend {
    padding: 20px;
    overflow: hidden;
  }

  .time {
    font-size: 16px;
    font-weight: bold;
  }

  .content {
    font-size: 14px;
    padding-left: 5px;
  }

  .ivu-card-bordered {
    cursor: pointer;
  }

  .card-no-right-border {
    border-right: 0px;
  }

  .magnify-img {
    cursor: url('http://39.106.85.24:8999/magnify.ico'), auto
  }
</style>
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

  .step {
    width: 500px;
    margin: auto;
  }

  .money-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }

  .money-small-content > img {
    margin: 1px;
  }



</style>