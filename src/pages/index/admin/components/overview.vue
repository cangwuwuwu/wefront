<template>
  <div class="overview overview-index">

    <!--访问量统计-->
    <div class="access-user">
      <Row type="flex" justify="space-between">

        <!--用户访问量统计-->
        <Col span="6">
          <Card :bordered="false">
            <p slot="title">访问量</p>

            <Poptip v-model="accessVisible1" slot="extra" placement="right" width="80" class="access-poptip">
              <div slot="content">
                <ul>
                  <li><span @click="getAccessDate($event)">日</span></li>
                  <li><span @click="getAccessDate($event)">月</span></li>
                  <li><span @click="getAccessDate($event)">年</span></li>
                </ul>
              </div>
              <div :class="[dateClass.class1, dateClass.class2]"><span>{{this.current.accessDate}}</span></div>
            </Poptip>
            <p class="access-card-content">{{this.current.accessCurrent}}</p>
            <div class="access-card-bottom">
              <span>累计访问</span>
              <span>{{this.access.accessAll}}</span>
            </div>
          </Card>
        </Col>

        <!--日活、月活统计-->
        <Col span="6">
          <Card :bordered="false">
            <p slot="title">用户活跃度</p>
            <Poptip v-model="accessVisible2" slot="extra" placement="right" class="access-poptip">
              <div slot="content">
                <ul>
                  <li><span @click="getUvDate($event)">日</span></li>
                  <li><span @click="getUvDate($event)">月</span></li>
                </ul>
              </div>
              <div :class="[dateClass.class1, dateClass.class3]"><span>{{this.current.UvDate}}</span></div>
            </Poptip>
            <p class="access-card-content">{{this.current.UvCurrent}}</p>
            <div class="access-card-bottom">
              <span>平均活跃度</span>
              <span>{{this.access.accessUvAverage}}</span>
            </div>
          </Card>
        </Col>

        <!--新增用户统计-->
        <Col span="6">
          <Card :bordered="false">
            <p slot="title">新增用户</p>

            <Poptip v-model="accessVisible3" slot="extra" placement="bottom-start" class="access-poptip">
              <div slot="content">
                <ul>
                  <li><span @click="getNewUserDate($event)">日</span></li>
                  <li><span @click="getNewUserDate($event)">月</span></li>
                </ul>
              </div>
              <div :class="[dateClass.class1, dateClass.class4]"><span>{{this.current.newUserDate}}</span></div>
            </Poptip>

            <p class="access-card-content">{{this.current.newUserCurrent}} 位</p>
            <div class="access-card-bottom">
              <span>总用户</span>
              <span>{{this.access.newUserAll}}</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>

    <!--访问量柱状图显示，并统计各个页面访问量-->
    <div class="access-pageView">
      <!--标题-->
      <Card :bordered="false" dis-hover :padding="0" class="access-pageView-card">
            <p  slot="title" class="access-pageView-card-head">
              <Row>
                <Col span="8">
                  <span class="ivu-avatar ivu-avatar-circle ivu-avatar-icon ivu-avatar-small" style="color: rgb(24, 144, 255); background-color: rgb(230, 247, 255);">
                    <Icon style="" type="ios-podium"></Icon>
                  </span>
                  访问量
                </Col>
                <Col span="16" class="pageView-card-extra">
                  <span :class="pageViewDateClass.class1" @click="accessPageDay($event)">今日</span>
                  <span :class="pageViewDateClass.class2" @click="accessPageDay($event)">本月</span>
                  <span :class="pageViewDateClass.class3" @click="accessPageDay($event)">全年</span>
                </Col>
              </Row>
            </p>
      </Card>
      <!--柱状图-->
      <Row>
        <Col span="15" class="pageView-trend">
          <p>访问量趋势</p>
          <div id="pageView" style="width: 90%; height: 380px"></div>
        </Col>
        <Col span="9" class="pageView-rank">
          <p>页面访问量排行</p>
          <ul v-for="(list, index) in current.pageView" :key="index">
            <li v-if="index < 3"><span class="pageView-rank-top">{{index + 1}}</span><span>{{list.name}}</span><span>{{list.value}}</span></li>
            <li v-else><span>{{index + 1}}</span><span>{{list.name}}</span><span>{{list.value}}</span></li>

          </ul>
        </Col>
      </Row>
    </div>

    <!--学生分布及资源分布统计-->
    <div class="stuAndRes">
      <Row>
        <Col span="12">
          <div id="dept" style="width: 90%;height:480px;" ref="chart"></div>
        </Col>
        <Col span="12">
          <div id="resource" style="width: 90%;height: 240px"></div>
          <div id="gender" style="width: 90%;height:240px;padding-top:20px "></div>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
  const charts = require('echarts');
  import axios from 'axios'

  export default {
    name: 'overview',
    data() {
      return {

        //访问数据
        access:{
          accessDay:0, //当日访问量
          accessMonth:0, //当月访问量
          accessYear: 0, //全年访问量
          accessAll: 0, //总访问量
          accessTrend: [],
          accessUvDay:0, //日活
          accessUvMonth:0, //月活
          accessUvAverage: 0, //平均每日活跃度
          newUserDay: 0, //当日新增用户
          newUserMonth: 0,//当月新增用户
          newUserAll: 0, //总用户
          pageViewDay:[],
          pageViewMonth:[],
          pageViewYear:[],
        },

        pageView:{
          pageViewDay:[],
          pageViewMonth:[],
          pageViewYear:[],
        },

        //当前值与时间间隔
        current:{
          accessCurrent: 0, //访问量页面显示当前值
          UvCurrent: 0, //日活页面显示的当前值
          newUserCurrent: 0, //新增用户页面显示的当前值
          accessDate: '日', //访问量页面显示的时间间隔
          UvDate: '月', //日活页面显示的时间间隔
          newUserDate: '月', //新增用户页面显示的时间间隔
          pageView:[],

        },

        //时间间隔样式
        dateClass:{
          class1: 'access-card-extra',
          class2: 'access-day',
          class3: 'access-month',
          class4: 'access-month'
        },

        //各个页面访问量日期样式
        pageViewDateClass:{
          class1: 'pageView-card-extra-active',
          class2: '',
          class3: ''
        },

        //访问量气泡提示不可见
        accessVisible1: false,
        accessVisible2: false,
        accessVisible3: false,

        //页面访问量分布图
        pageViewOption:{
          color: ['#3398DB'],
          tooltip: {},
          grid: {
            left: '6%',
            top: '9%',
            // containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              // splitLine: {
              //   show: false
              // },

            }
          ],
          series: [
            {
              name: '访问量',
              type: 'bar',
              data: [],
            }
          ]
        },

        //学院分布图数据模板
        deptOption: {
          title: {
            text: '协会学生所在学院分布',
            x: 'center',
            y: 0
            // padding: [0, 0, 0, 40],
          },
          grid: {
            right: '4%',
            // containLabel: true,
          },
          tooltip: {},
          xAxis: {
            // data: ['信息工程学院', '外国语学院', '经济贸易学院', '人文与艺术学院', '理学院', '土木与建筑工程学院', '水利与生态工程学院',
            //         '工商管理学院', '国际教育学院', '瑶湖学院', '士官学院', '机械与电气工程学院'],
            data: [],
            axisLabel: {
              inside: false,
              rotate: 40,
              margin: 2,
              textStyle: {
                // color: '#444'
                fontSize: 10,
              },
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {},
          series: [{
            name: '协会学生所在学院分布',
            type: 'bar',
            // data: [199, 2, 3, 0, 18, 39, 23, 3, 4, 0, 0, 23]
            data: []
          }]
        },

        //协会男女比例
        genderOption: {},

        //资源分布信息
        resourceOption: {},

        //初始化echars对象
        PageViewChart: Object,
        DeptChart: Object,
        GenderChart: Object,
        ResourceChart: Object,

      }
    },

    methods:{

      /*动态显示访问量日月年的数据*/
      getAccessDate(e){
        let text = e.currentTarget.innerHTML;
        if (text == '日'){
          this.current.accessCurrent = this.access.accessDay;
          this.current.accessDate = '日';
          this.dateClass.class2 = "access-day"
        }else if(text == '月'){
          this.current.accessCurrent = this.access.accessMonth;
          this.current.accessDate = '月';
          this.dateClass.class2 = "access-month"

        }else if (text == '年'){
          this.current.accessCurrent = this.access.accessYear;
          this.current.accessDate = '年';
          this.dateClass.class2 = "access-year"

        }
        this.accessVisible1 = false;
      },

      /*动态显示用户活跃度日月年的数据*/
      getUvDate(e){
        let text = e.currentTarget.innerHTML;
        if (text == '日'){
          this.current.UvCurrent = this.access.accessUvDay;
          this.current.UvDate = '日';
          this.dateClass.class3 = "access-day"
        }else if(text == '月'){
          this.current.UvCurrent = this.access.accessUvMonth;
          this.current.UvDate = '月';
          this.dateClass.class3 = "access-month"

        }else if (text == '年'){
          this.current.UvCurrent = this.access.accessUvAverage;
          this.current.UvDate = '年';
          this.dateClass.class3 = "access-year"

        }
        this.accessVisible2 = false;
      },

      /*动态显示新增用户日月年的数据*/
      getNewUserDate(e){
        let text = e.currentTarget.innerHTML;
        if (text == '日'){
          this.current.newUserCurrent = this.access.newUserDay;
          this.current.newUserDate = '日';
          this.dateClass.class4 = "access-day"
        }else if(text == '月'){
          this.current.newUserCurrent = this.access.newUserMonth;
          this.current.newUserDate = '月';
          this.dateClass.class4 = "access-month"

        }
        this.accessVisible3 = false;
      },

      /*动态显示各个页面访问量统计*/
      accessPageDay(e){
        let text = e.currentTarget.innerHTML;
        if (text == '今日'){
          this.current.pageView = this.pageView.pageViewDay;
          this.pageViewDateClass.class1 = 'pageView-card-extra-active';
          this.pageViewDateClass.class2 = '';
          this.pageViewDateClass.class3 = '';
        }else if (text == '本月'){
          this.current.pageView = this.pageView.pageViewMonth;
          this.pageViewDateClass.class2 = 'pageView-card-extra-active';
          this.pageViewDateClass.class1 = '';
          this.pageViewDateClass.class3 = '';
        }else if(text == '全年'){
          this.current.pageView = this.pageView.pageViewYear;
          this.pageViewDateClass.class3 = 'pageView-card-extra-active';
          this.pageViewDateClass.class2 = '';
          this.pageViewDateClass.class1 = '';
        }
      },

      /*初始化echarts*/
      chart(){
        this.DeptChart = charts.init(document.getElementById('dept'));
        this.GenderChart = charts.init(document.getElementById('gender'));
        this.ResourceChart = charts.init(document.getElementById('resource'));
        this.PageViewChart = charts.init(document.getElementById('pageView'));
        this.DeptChart.setOption(this.deptOption, true);
        this.GenderChart.setOption(this.genderOption, true);
        this.ResourceChart.setOption(this.resourceOption, true);
        this.PageViewChart.setOption(this.pageViewOption, true);
      },

      /*从后台获取访问量数据*/
      getAccessInfo(){
        axios.get('/api/admin/comp/access').then(data => {
          this.access = data.data;
          this.access.accessUvAverage = Math.ceil(this.access.accessUvMonth/new Date().getDay());
          this.current.UvCurrent = this.access.accessUvMonth;
          this.current.accessCurrent = this.access.accessDay;
          this.current.newUserCurrent = this.access.newUserMonth;
          this.pageViewOption.series[0].data = this.access.accessTrend;
          this.PageViewChart.setOption(this.pageViewOption, true);
          this.pageView.pageViewDay = this.access.pageViewDay.sort(desc);
          this.pageView.pageViewMonth = this.access.pageViewMonth.sort(desc);
          this.pageView.pageViewYear = this.access.pageViewYear.sort(desc);
          function desc(a, b) {
            return b.value - a.value;
          }
          this.current.pageView = this.pageView.pageViewDay;
        });

      },


      /*从后台获取学生学院分布数据*/
      getDeptInfo(){
        this.DeptChart.showLoading();
        axios.get('/api/admin/comp/ov/getDeptDistribution').then(data => {
          let map = data.data;
          let yData = [];
          let xData = [];
          for(var key in map){
            yData.push(map[key]);
            xData.push(key)
          }
          this.deptOption.xAxis.data = xData;
          this.deptOption.series[0].data = yData;

          this.DeptChart.hideLoading();
          this.DeptChart.setOption(this.deptOption, true);
        });
      },

      /*从后台获取男女分布数据*/
      getGenderInfo(){
        this.GenderChart.showLoading();
        axios.get('/api/admin/comp/ov/getGenderDis').then(data => {
          let map = data.data;
          let maxData = map['all'];
          let boys = map['boys'];
          let girls = map['girls'];
          let genderOption = {
            title: {
              text: '协会学生男女比例',
              x: 'center',
              y: 0
            },
            tooltip: {},
            xAxis: {
              splitLine: {show: false},
              axisLine: {show: false},
              axisTick: {show: false},
              axisLabel: {show: false},
              max: maxData,
            },
            yAxis: {
              data: ['', ''],
              axisTick: {show: false},
              axisLine: {show: false},
              axisLabel: {
                margin: 20,
                textStyle: {
                  color: '#666',
                  fontSize: 18
                }
              },
              splitLine: {show: false},
              position: 'top'
            },
            grid: {
              height: 160,
              width: 360,
              top: 30,
              left: 100,
            },
            series: [{
              name: '成员性别',
              type: 'pictorialBar',
              symbol: 'path://M877.714286 603.428571q0 22.857143-16 38.857143t-38.857143 16q-29.142857 0-45.714286-24.571429l-129.714286-194.857143-25.714286 0 0 75.428571 141.142857 234.857143q5.142857 8.571429 5.142857 18.857143 0 14.857143-10.857143 25.714286t-25.714286 10.857143l-109.714286 0 0 155.428571q0 26.285714-18.857143 45.142857t-45.142857 18.857143l-91.428571 0q-26.285714 0-45.142857-18.857143t-18.857143-45.142857l0-155.428571-109.714286 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286q0-10.285714 5.142857-18.857143l141.142857-234.857143 0-75.428571-25.714286 0-129.714286 194.857143q-16.571429 24.571429-45.714286 24.571429-22.857143 0-38.857143-16t-16-38.857143q0-16.571429 9.142857-30.285714l146.285714-219.428571q41.714286-61.142857 100.571429-61.142857l219.428571 0q58.857143 0 100.571429 61.142857l146.285714 219.428571q9.142857 13.714286 9.142857 30.285714zm-237.714286-457.142857q0 53.142857-37.428571 90.571429t-90.571429 37.428571-90.571429-37.428571-37.428571-90.571429 37.428571-90.571429 90.571429-37.428571 90.571429 37.428571 37.428571 90.571429z',
              itemStyle: {
                normal: {
                  color: '#ddd'
                }
              },
              symbolRepeat: 10,
              symbolClip: false,
              symbolBoundingData: maxData,
              symbolSize: ['50%', '75%'],
              data: [{
                name: '男生',
                value: boys,
                symbol: 'path://M804.571429 402.285714l0 237.714286q0 22.857143-16 38.857143t-38.857143 16-38.857143-16-16-38.857143l0-201.142857-36.571429 0 0 521.142857q0 26.285714-18.857143 45.142857t-45.142857 18.857143-45.142857-18.857143-18.857143-45.142857l0-265.142857-36.571429 0 0 265.142857q0 26.285714-18.857143 45.142857t-45.142857 18.857143-45.142857-18.857143-18.857143-45.142857l0-521.142857-36.571429 0 0 201.142857q0 22.857143-16 38.857143t-38.857143 16-38.857143-16-16-38.857143l0-237.714286q0-45.714286 32-77.714286t77.714286-32l365.714286 0q45.714286 0 77.714286 32t32 77.714286zm-164.571429-256q0 53.142857-37.428571 90.571429t-90.571429 37.428571-90.571429-37.428571-37.428571-90.571429 37.428571-90.571429 90.571429-37.428571 90.571429 37.428571 37.428571 90.571429z\n'
              }, {
                name: '女生',
                value: girls,
                symbol: 'path://M877.714286 603.428571q0 22.857143-16 38.857143t-38.857143 16q-29.142857 0-45.714286-24.571429l-129.714286-194.857143-25.714286 0 0 75.428571 141.142857 234.857143q5.142857 8.571429 5.142857 18.857143 0 14.857143-10.857143 25.714286t-25.714286 10.857143l-109.714286 0 0 155.428571q0 26.285714-18.857143 45.142857t-45.142857 18.857143l-91.428571 0q-26.285714 0-45.142857-18.857143t-18.857143-45.142857l0-155.428571-109.714286 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286q0-10.285714 5.142857-18.857143l141.142857-234.857143 0-75.428571-25.714286 0-129.714286 194.857143q-16.571429 24.571429-45.714286 24.571429-22.857143 0-38.857143-16t-16-38.857143q0-16.571429 9.142857-30.285714l146.285714-219.428571q41.714286-61.142857 100.571429-61.142857l219.428571 0q58.857143 0 100.571429 61.142857l146.285714 219.428571q9.142857 13.714286 9.142857 30.285714zm-237.714286-457.142857q0 53.142857-37.428571 90.571429t-90.571429 37.428571-90.571429-37.428571-37.428571-90.571429 37.428571-90.571429 90.571429-37.428571 90.571429 37.428571 37.428571 90.571429z',
              }
              ],
            }, {
              name: '成员性别',
              type: 'pictorialBar',
              barCategoryGap: '25%',
              symbolRepeat: 10,
              symbolClip: true,
              symbolSize: ['50%', '75%'],
              symbolBoundingData: maxData,
              z: 10,
              // data: [380, 28]
              data: [{
                name: '男生',
                value: boys,
                itemStyle: {
                  color: '#1296db'
                },
                symbol: 'path://M804.571429 402.285714l0 237.714286q0 22.857143-16 38.857143t-38.857143 16-38.857143-16-16-38.857143l0-201.142857-36.571429 0 0 521.142857q0 26.285714-18.857143 45.142857t-45.142857 18.857143-45.142857-18.857143-18.857143-45.142857l0-265.142857-36.571429 0 0 265.142857q0 26.285714-18.857143 45.142857t-45.142857 18.857143-45.142857-18.857143-18.857143-45.142857l0-521.142857-36.571429 0 0 201.142857q0 22.857143-16 38.857143t-38.857143 16-38.857143-16-16-38.857143l0-237.714286q0-45.714286 32-77.714286t77.714286-32l365.714286 0q45.714286 0 77.714286 32t32 77.714286zm-164.571429-256q0 53.142857-37.428571 90.571429t-90.571429 37.428571-90.571429-37.428571-37.428571-90.571429 37.428571-90.571429 90.571429-37.428571 90.571429 37.428571 37.428571 90.571429z\n',
                label: {
                  show: true,
                  position: 'right',
                  formatter: function (params) {
                    return (params.value / maxData * 100).toFixed(1) + ' %' + '\n' + '男' + boys + '人';
                  },
                  fontSize: 16,
                  offset: [20, 0],
                  lineHeight: 20
                },
              }, {
                name: '女生',
                value: girls,
                itemStyle: {
                  color: '#d4237a'
                },
                symbol: 'path://M877.714286 603.428571q0 22.857143-16 38.857143t-38.857143 16q-29.142857 0-45.714286-24.571429l-129.714286-194.857143-25.714286 0 0 75.428571 141.142857 234.857143q5.142857 8.571429 5.142857 18.857143 0 14.857143-10.857143 25.714286t-25.714286 10.857143l-109.714286 0 0 155.428571q0 26.285714-18.857143 45.142857t-45.142857 18.857143l-91.428571 0q-26.285714 0-45.142857-18.857143t-18.857143-45.142857l0-155.428571-109.714286 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286q0-10.285714 5.142857-18.857143l141.142857-234.857143 0-75.428571-25.714286 0-129.714286 194.857143q-16.571429 24.571429-45.714286 24.571429-22.857143 0-38.857143-16t-16-38.857143q0-16.571429 9.142857-30.285714l146.285714-219.428571q41.714286-61.142857 100.571429-61.142857l219.428571 0q58.857143 0 100.571429 61.142857l146.285714 219.428571q9.142857 13.714286 9.142857 30.285714zm-237.714286-457.142857q0 53.142857-37.428571 90.571429t-90.571429 37.428571-90.571429-37.428571-37.428571-90.571429 37.428571-90.571429 90.571429-37.428571 90.571429 37.428571 37.428571 90.571429z',
                label: {
                  show: true,
                  position: 'right',
                  formatter: function (params) {
                    return (params.value / maxData * 100).toFixed(1) + ' %' + '\n' + '女' + girls + '人';
                  },
                  fontSize: 18,
                  offset: [20, 0],
                  lineHeight: 20
                },
              }
              ],
            }]
          };
          this.GenderChart.hideLoading();
          this.GenderChart.setOption(genderOption, true);
        })
      },

      /*从后台获取资源分布和年级分布信息*/
      getResourceInfo(){
        this.ResourceChart.showLoading();
        axios.get("/api/admin/comp/ov/getResAndGrade").then(data => {
          let infoList = data.data;
          let resMap = {};
          let gradeMap = {};
          let legendList = [];
          resMap = infoList[0];
          gradeMap = infoList[1];
          let resData = [];
          let gradeData = [];
          for (let key in resMap){
            let map = {};
            map.value = resMap[key];
            map.name = key;
            legendList.push(key);
            resData.push(map);
          }
          for (let key in gradeMap){
            let map = {};
            map.value = gradeMap[key];
            map.name = key + "级";
            gradeData.push(map);
          }
          this.resourceOption = {
            title : {
              text: '资源以及学生年级分布情况',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
              {
                name:'资源分布',
                color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
                type:'pie',
                radius : 70,
                center : ['25%', '60%'],

                // label: {
                //   normal: {
                //     show: false
                //   },
                //   emphasis: {
                //     show: true
                //   }
                // },
                // lableLine: {
                //   normal: {
                //     show: false
                //   },
                //   emphasis: {
                //     show: true
                //   }
                // },
                data: resData,
              },
              {
                name:'年级分布',
                type:'pie',
                radius : 70,
                  color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
                center : ['75%', '60%'],
                data: gradeData,
              }
            ]
          };
          this.ResourceChart.hideLoading();
          this.ResourceChart.setOption(this.resourceOption, true);
        });

      },

    },

    created(){

    },

    /*将图渲染到页面上*/
    mounted() {
      this.chart();
      this.getAccessInfo();
      this.getDeptInfo();
      this.getGenderInfo();
      this.getResourceInfo();
    },


  }
</script>

<style>

  /*.overview{*/
  /*  padding: 20px 10px 10px 10px;*/
  /*}*/

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
  
  .overview-index{
    border: none !important;
    background-color: #f5f7f9!important;
    padding: 14px!important;
  }

  /*学生及资源分布*/
  .stuAndRes{
    background-color: #ffffff;
    /*border: 1px solid #e8eaec;*/
    padding: 40px 20px 40px 20px;
    border-radius: 4px;
    margin-top: 30px;
  }

  /*访问量统计*/
  .access-card-bottom{
    margin-top: 20px;
    width: 100%;
    height: 40px;
  }

  .access-card-bottom span:nth-child(1){
    display: inline-block;
    float: left;
    line-height: 40px;
  }

  .access-card-bottom span:nth-child(2){
    display: inline-block;
    float: right;
    line-height: 40px;
  }

  .access-card-extra{
    line-height: 28px;
    display: inline-block;
    height: 28px;
    margin: -2px 4px 2px 0;
    padding: 0 7px;
    border-radius: 3px;
    font-size: 14px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor:pointer;
  }

  .access-poptip{

  }

  .ivu-poptip-popper{
    min-width: 80px!important;
  }

  .access-poptip>div{

  }

  .access-poptip li{
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #e4e4e8;
    line-height: 30px;
    text-align: center;
  }

  .access-poptip li:nth-last-child(1){
    border-bottom: none;
  }

  .access-poptip li span:hover{
    cursor: pointer;
    color: #2d8cf0;
  }

  /*日、月、*/
  .access-day{
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    color: #52c41a!important;
  }

  .access-month{
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    color: #1890ff!important;
  }

  .access-year{
    background: #fff1f0;
    border: 1px solid #ffa39e;
    color: #f5222d!important;
  }

  .access-card-content{
    font-size: 24px;
    font-weight: bold;
  }

  /*访问量柱状图已经页面访问量统计*/
  .access-pageView{
    margin-top: 30px;
    padding: 0 20px 40px 20px;
    border-radius: 4px;
    background-color: #ffffff;

  }

  .pageView-trend{
    padding: 20px 10px;
  }

  .pageView-trend p{
    font-size: 16px;
    font-weight: bold;
    margin-left: 20px;
  }

  /*卡片标题*/
  .access-pageView-card{
    padding: 0!important;
  }

  .access-pageView-card-head{
    height: 40px!important;
    line-height:40px!important;
  }

  .pageView-card-extra{
    text-align: right;
    padding-right: 10px;
  }

  .pageView-card-extra span{
    margin-right: 20px;
    cursor: pointer;
  }

  .pageView-card-extra-active{
    color: #57a3f3;
  }

  /*各个页面访问统计*/
  .pageView-rank{
    padding: 20px 20px 20px 30px;
  }

  .pageView-rank p{
    font-size: 16px;
    font-weight: bold;
  }

  .pageView-rank  li{
    width: 100%;
    list-style: none;
    margin-top: 30px;
    font-size: 15px;
  }

  .pageView-rank ul li span:nth-child(1){
    height: 25px;
    width: 25px;
    line-height: 25px;
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    background-color: rgb(245, 245, 245);
    color: rgb(140, 140, 140);
  }

  .pageView-rank-top{
    background-color: rgb(230, 247, 255)!important;
    color: rgb(24, 144, 255)!important;
  }

  .pageView-rank ul li span:nth-child(2){
    margin-left: 20px;
  }

  .pageView-rank ul li span:nth-child(3){
    float: right;
    margin-right: 20px;
  }




</style>