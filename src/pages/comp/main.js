import Vue from 'vue'
import App from './App.vue'
import router from '@/pages/comp/router'
import '@/utils/api'
import { Icon, Modal, Input, InputNumber, AutoComplete } from 'iview'
import { Row, Col, Card } from 'iview'
import { Message, LoadingBar, Notice } from 'iview'
import { Form,FormItem  } from 'iview'
import { Radio, RadioGroup } from 'iview'
import { Switch, Cascader, Option } from 'iview'
import { Carousel, CarouselItem } from 'iview'
import { Page, Table } from 'iview'
import { Button, ButtonGroup } from 'iview'
import { Tooltip, Timeline, TimelineItem } from 'iview'
import { Steps, Step, Spin } from 'iview'
import { DatePicker, Upload, Circle } from 'iview'
import 'iview/dist/styles/iview.css';
require('../../assets/css/icons.css');
// require('../../assets/css/cover.css');

Vue.config.productionTip = false;
Vue.component('Icon', Icon);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Modal', Modal);
Vue.component('Input', Input);
Vue.component('InputNumber', InputNumber);
Vue.component('Button', Button);
Vue.component('ButtonGroup', ButtonGroup);
Vue.component('Card', Card);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Radio', Radio);
Vue.component('RadioGroup', RadioGroup);
Vue.component('iSwitch', Switch );
Vue.component('Cascader', Cascader);
Vue.component('AutoComplete', AutoComplete );
Vue.component('Option', Option );
Vue.component('Carousel', Carousel );
Vue.component('CarouselItem', CarouselItem );
Vue.component('Table', Table );
Vue.component('Page', Page );
Vue.component('Timeline', Timeline );
Vue.component('TimelineItem', TimelineItem );
Vue.component('Tooltip', Tooltip );
Vue.component('Steps', Steps );
Vue.component('Step', Step );
Vue.component('Spin', Spin );
Vue.component('DatePicker', DatePicker );
Vue.component('Upload', Upload );
Vue.component('iCircle', Circle );
Vue.prototype.$Message = Message;
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;

router.beforeEach((to, from , next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.requireLogin)) {  
    // 判断当前用户的登录信息wecoding_login_info是否存在
    if (sessionStorage.getItem('wecoding_login_info')) {  
      next();
    } else {
      // next({
        // path: '/index/signin'
      // })
      window.location = '/index/signin'
    }
  }else {
    next();
  }
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');