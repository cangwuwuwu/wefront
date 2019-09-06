import Vue from 'vue'
import store from './store'
// import Vuex from 'vuex'
import App from './App.vue'
// import iView from 'iview'
import { Icon, Modal, Input, Button, Time, Spin, BackTop, Page, Rate, Drawer,Divider, Badge } from 'iview'
import { Row, Col, Card } from 'iview'
import { Message, LoadingBar } from 'iview'
import { Menu, MenuItem, MenuGroup,Submenu } from 'iview'
import { Radio, RadioGroup } from 'iview'
import { Poptip, Tooltip } from 'iview'
import { Table, Tag } from 'iview'
import { Form, FormItem } from 'iview'
import { Select, Option } from 'iview'

import router from '@/pages/docs/router'
import 'iview/dist/styles/iview.css';
require('../../assets/css/guide.css');
require('../../assets/css/icons.css');
import 'highlight.js/styles/github.css';


Vue.config.productionTip = false;
// Vue.use(Vuex)
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('MenuGroup', MenuGroup);
Vue.component('Submenu', Submenu);
Vue.component('Page', Page);
Vue.component('Icon', Icon);
Vue.component('Drawer', Drawer);
Vue.component('Poptip', Poptip);
Vue.component('BackTop', BackTop);
Vue.component('Modal', Modal);
Vue.component('Input', Input);
Vue.component('Button', Button);
Vue.component('Card', Card);
Vue.component('Time', Time);
Vue.component('Spin', Spin);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Radio', Radio);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Tooltip', Tooltip);
Vue.component('Table', Table);
Vue.component('Tag', Tag);
Vue.component('Rate', Rate);
Vue.component('Divider', Divider);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Badge', Badge);
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
    router,
    store
}).$mount('#app');
