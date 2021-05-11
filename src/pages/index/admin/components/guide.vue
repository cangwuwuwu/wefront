<template>
  <div class="overview">
    <div id="main" style="width: 600px;height:400px;" ref="chart"></div>
  </div>
</template>

<script>
  var charts = require('echarts');

export default {
    name: 'guide',
    data() {
        return {
            
        }
    },

    methods:{
      chart(){
        var myChart = charts.init(document.getElementById('main'));
        myChart.setOption({
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    },

  mounted() {
      this.chart();
  }
}
</script>

<style>

</style>