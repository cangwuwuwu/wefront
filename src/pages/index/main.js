import Vue from 'vue'
import App from './App.vue'
import router from '@/pages/index/router'
import '@/utils/api'
import { Icon, Poptip, Avatar, Badge, Modal, Input, Button, Divider, Time, Spin, BackTop, AutoComplete } from 'iview'
import { Row, Col, Card } from 'iview'
import { Message, LoadingBar } from 'iview'
import { Form,FormItem  } from 'iview'
import { Radio, RadioGroup } from 'iview'
import { Tabs, TabPane, Tag} from 'iview'
import { Switch, Cascader, DatePicker, Option } from 'iview'
import 'iview/dist/styles/iview.css';
require('../../assets/css/cover.css');

Vue.config.productionTip = false;
Vue.component('Icon', Icon);
Vue.component('Poptip', Poptip);
Vue.component('Avatar', Avatar);
Vue.component('BackTop', BackTop);
Vue.component('Badge', Badge);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Modal', Modal);
Vue.component('Input', Input);
Vue.component('Button', Button);
Vue.component('Divider', Divider);
Vue.component('Card', Card);
Vue.component('Time', Time);
Vue.component('Spin', Spin);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Radio', Radio);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('Tag', Tag);
Vue.component('iSwitch', Switch );
Vue.component('Cascader', Cascader);
Vue.component('DatePicker', DatePicker);
Vue.component('AutoComplete', AutoComplete );
Vue.component('Option', Option );
Vue.prototype.$Message = Message;
Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Modal = Modal;

router.beforeEach((to, from , next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');