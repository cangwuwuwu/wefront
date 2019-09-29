import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default new VueI18n({
    locale: 'zh-CN',
    messages: {
        'zh-CN': require('@/i18n/lang/zh'),
        'en-US': require('@/i18n/lang/en')
    }
})