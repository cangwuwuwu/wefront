<template>
    <div class="card-shadow res-content-div sencond-div-position">
        <div>
            <div style="font-size: 25px;font-weight: bold">在线资料
                <Tooltip placement="right-start" theme="light">
                    <Icon color="#828282" type="md-help-circle" size="25"></Icon>
                    <div slot="content">
                        <p>本人在学习过程中受益匪浅的学习网站</p>
                        <p>后续会加入用户推荐功能</p>
                    </div>
                </Tooltip>
            </div>
            <card>
                <div v-if="screenWidth > 400">
                    <Table stripe :loading="loading_web" no-filtered-data-text="暂无筛选结果,换一页试试"
                        :columns="columns_web" :data="data_web"></Table>
                </div>
                <div v-else>
                    <Table stripe :loading="loading_web" no-filtered-data-text="暂无筛选结果,换一页试试"
                        :columns="web_small" :data="data_web"></Table>
                </div>
            </card>
            <div style="float: right;padding-top: 15px;">
                <Page :total="total_web" :current="page_web" show-elevator show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'web',
    data() {
        return {
            screenWidth: document.body.clientWidth,
            total_web: 0,
            page_web: 1,
            columns_web: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '名称',
                    width: 300,
                    key: 'resWebName',
                    align: 'center',
                },
                {
                    title: '描述',
                    key: 'resWebDescribe',
                    align: 'center',
                    tooltip: true
                },
                {
                    title: '网址',
                    key: 'resWebUrl',
                    align: 'center',
                },
                {
                    title: '推荐者',
                    key: 'resWebUper',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                },
                                on: {
                                    click: () => {
                                        window.open(params.row.resWebUrl)
                                    }
                                }
                            }, '前往'),
                        ]);
                    }
                }
            ],
            web_small: [
                {
                    title: '名称',
                    key: 'resWebName',
                    align: 'center',
                },
                {
                    title: '描述',
                    key: 'resWebDescribe',
                    align: 'center',
                    tooltip: true
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        window.open(params.row.resWebUrl)
                                    }
                                }
                            }, '前往'),
                        ]);
                    }
                }
            ],
            data_web: [],
            loading_web: false,
            name: '',
        }
    },
    props: ["choose"],
    methods: {
        getWebs(name) {
            var _self = this;
            axios
            .get('/api/resources/web/'+ name)
            .then(function(res) {
                // console.log(res)
                _self.data_web = res.data;
                _self.$Loading.finish();
            })
            .catch(function(error) {
                _self.$Loading.error();
            })
        },
    },
    watch: {
        choose: {
            immediate:true,
            handler:function() {
                if (this.choose === '' || this.choose === 'resources') return;
                this.getWebs(this.choose);
            }
        }
    },
}
</script>
<style scoped>

</style>