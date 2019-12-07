<template>
  <div class="overview">
    <Row>
      <Col span="12">
        <div id="dept" style="width: 600px;height:480px;" ref="chart"></div>
      </Col>
      <Col span="12">
        <div id="resource" style="width: 600px;height: 240px"></div>
        <div id="gender" style="width: 600px;height:240px;"></div>
      </Col>
    </Row>

  </div>
</template>

<script>
  const charts = require('echarts');
  import axios from 'axios'

  export default {
    name: 'overview',
    data() {
      return {

        //学院分布图数据模板
        deptOption: {
          title: {
            text: '协会学生所在学院分布',
            x: 'center',
            y: 0
            // padding: [0, 0, 0, 40],
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
        DeptChart: Object,
        GenderChart: Object,
        ResourceChart: Object,
      }
    },

    methods:{

      /*初始化echarts*/
      chart(){
        this.DeptChart = charts.init(document.getElementById('dept'));
        this.GenderChart = charts.init(document.getElementById('gender'));
        this.ResourceChart = charts.init(document.getElementById('resource'));
        this.DeptChart.setOption(this.deptOption, true);
        this.GenderChart.setOption(this.genderOption, true);
        this.ResourceChart.setOption(this.resourceOption, true);
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
              name: 'bg',
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
                name: 'man',
                value: boys,
                symbol: 'path://M804.571429 402.285714l0 237.714286q0 22.857143-16 38.857143t-38.857143 16-38.857143-16-16-38.857143l0-201.142857-36.571429 0 0 521.142857q0 26.285714-18.857143 45.142857t-45.142857 18.857143-45.142857-18.857143-18.857143-45.142857l0-265.142857-36.571429 0 0 265.142857q0 26.285714-18.857143 45.142857t-45.142857 18.857143-45.142857-18.857143-18.857143-45.142857l0-521.142857-36.571429 0 0 201.142857q0 22.857143-16 38.857143t-38.857143 16-38.857143-16-16-38.857143l0-237.714286q0-45.714286 32-77.714286t77.714286-32l365.714286 0q45.714286 0 77.714286 32t32 77.714286zm-164.571429-256q0 53.142857-37.428571 90.571429t-90.571429 37.428571-90.571429-37.428571-37.428571-90.571429 37.428571-90.571429 90.571429-37.428571 90.571429 37.428571 37.428571 90.571429z\n'
              }, {
                name: 'girl',
                value: girls,
                symbol: 'path://M877.714286 603.428571q0 22.857143-16 38.857143t-38.857143 16q-29.142857 0-45.714286-24.571429l-129.714286-194.857143-25.714286 0 0 75.428571 141.142857 234.857143q5.142857 8.571429 5.142857 18.857143 0 14.857143-10.857143 25.714286t-25.714286 10.857143l-109.714286 0 0 155.428571q0 26.285714-18.857143 45.142857t-45.142857 18.857143l-91.428571 0q-26.285714 0-45.142857-18.857143t-18.857143-45.142857l0-155.428571-109.714286 0q-14.857143 0-25.714286-10.857143t-10.857143-25.714286q0-10.285714 5.142857-18.857143l141.142857-234.857143 0-75.428571-25.714286 0-129.714286 194.857143q-16.571429 24.571429-45.714286 24.571429-22.857143 0-38.857143-16t-16-38.857143q0-16.571429 9.142857-30.285714l146.285714-219.428571q41.714286-61.142857 100.571429-61.142857l219.428571 0q58.857143 0 100.571429 61.142857l146.285714 219.428571q9.142857 13.714286 9.142857 30.285714zm-237.714286-457.142857q0 53.142857-37.428571 90.571429t-90.571429 37.428571-90.571429-37.428571-37.428571-90.571429 37.428571-90.571429 90.571429-37.428571 90.571429 37.428571 37.428571 90.571429z',
              }
              ],
            }, {
              name: 'data',
              type: 'pictorialBar',
              barCategoryGap: '25%',
              symbolRepeat: 10,
              symbolClip: true,
              symbolSize: ['50%', '75%'],
              symbolBoundingData: maxData,
              z: 10,
              // data: [380, 28]
              data: [{
                name: 'man',
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
                name: 'girl',
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
                name:'面积模式',
                  color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
                type:'pie',
                radius : 70,
                center : ['25%', '50%'],

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
                name:'面积模式',
                type:'pie',
                radius : 70,
                  color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
                center : ['75%', '50%'],
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
      this.getDeptInfo();
      this.getGenderInfo();
      this.getResourceInfo();
    },

  }
</script>

<style>
  .overview{
    padding: 20px 10px 10px 10px;
  }
</style>