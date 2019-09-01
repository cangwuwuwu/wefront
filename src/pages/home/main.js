import Vue from 'vue'
import App from './App.vue'
import { Icon, Poptip, Avatar, Badge, Modal, Input, Button, Drawer, Divider, Time, Spin, BackTop } from 'iview'
import { Row, Col, Card } from 'iview'
import { Message, Notice } from 'iview'
import { Dropdown, DropdownItem, DropdownMenu } from 'iview'
import { Menu, MenuItem, MenuGroup,Submenu } from 'iview'
import { Form,FormItem  } from 'iview'
import { Radio, RadioGroup } from 'iview'
// import iView from 'iview'
import 'iview/dist/styles/iview.css';
require('@/assets/css/home.css');
require('@/assets/css/icons.css')

Vue.config.productionTip = false;
// Vue.use(iView)
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('MenuGroup', MenuGroup);
Vue.component('Submenu', Submenu);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Icon', Icon);
Vue.component('Poptip', Poptip);
Vue.component('Dropdown', Dropdown);
Vue.component('Avatar', Avatar);
Vue.component('BackTop', BackTop);
Vue.component('Badge', Badge);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Modal', Modal);
Vue.component('Input', Input);
Vue.component('Button', Button);
Vue.component('Drawer', Drawer);
Vue.component('Divider', Divider);
Vue.component('Card', Card);
Vue.component('Time', Time);
Vue.component('Spin', Spin);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Radio', Radio);
Vue.component('RadioGroup', RadioGroup);
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice 

new Vue({
    render: h => h(App),
}).$mount('#app');
