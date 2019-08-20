<template>
    <div class="card-shadow res-content-div">
        <div>
            <div style="font-size: 25px;font-weight: bold">学习视频/PDF
                <Tooltip placement="right-start" theme="light">
                    <Icon color="#828282" type="md-help-circle" size="25"></Icon>
                    <div slot="content">
                        <p>一些高质量的学习视频, 欢迎下载;</p>
                        <p>后续会开通上传资源和评分功能.</p>
                    </div>
                </Tooltip>
            </div>
            <card>
                <Table stripe :loading="loading" no-filtered-data-text="暂无筛选结果,换一页试试" :columns="columns"
                    :data="useData(searchName)"></Table>
            </card>
            <div style="float: right;padding-top: 15px;">
                <Page :total="total" :current="page" @on-change="changePage" show-elevator show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    name: 'videos',
    data() {
        return {
            loading: false,
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '分类',
                    key: 'resForm',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        const row = params.row;
                        const text = row.resForm === 1 ? '基础学习' :
                            row.resForm === 5 ? '文档/PDF' :
                            row.resForm === 2 ? '进阶学习' :
                            row.resForm === 4 ? '项目实战' : '面试就业';

                        return h('span', {}, text);
                    },
                    filters: [
                        {
                            label: '基础学习',
                            value: 1
                        },
                        {
                            label: '进阶学习',
                            value: 2
                        },
                        {
                            label: '面试就业',
                            value: 3
                        },
                        {
                            label: '项目实战',
                            value: 4
                        },
                        {
                            label: '文档/PDF',
                            value: 5
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        return row.resForm === value;
                    }
                },
                {
                    // title: '名称',
                    renderHeader: (h) => {
                        return[
                            h('span', {}, '名称 '),
                            h('Input', {
                                props: {
                                    suffix: 'md-return-left',
                                    placeholder: '回车搜索',
                                    clearable: true,
                                },
                                on: {
                                    input: function (event) {
                                        this.searchName = event;
                                    },
                                    'on-enter': () => {
                                        this.searchResByName(this.searchName.toLowerCase())
                                    },
                                    'on-clear': () => {
                                        this.searchName = '';
                                        this.data_search = [];
                                    }
                                }
                            })
                        ]
                    },
                    key: 'resName',
                    align: 'center',
                    tooltip: true
                },
                {
                    title: '描述',
                    key: 'resDescribe',
                    width: 270,
                    align: 'center',
                    ellipsis: true
                },
                {
                    title: '状态',
                    key: 'resStatus',
                    align: 'center',
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.resStatus === 0 ? 'error' : 'success';
                        const text = row.resStatus === 0 ? '失效' : '有效';

                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    },
                    filters: [
                        {
                            label: '有效',
                            value: 1
                        },
                        {
                            label: '失效',
                            value: 0
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        if (value === 1) {
                            return row.resStatus === 1;
                        } else if (value === 0) {
                            return row.resStatus === 0;
                        }
                    }
                },
                {
                    title: '上传时间',
                    key: 'resUpTime',
                    align: 'center',
                    sortable: true,
                    render: (h, params) => {
                        return h('i-Time', {
                            props: {
                                time: params.row.resUpTime,
                                type: 'date'
                            }
                        })
                    }
                },
                {
                    title: '下载量',
                    key: 'resHeat',
                    align: 'center',
                    sortable: true,
                    sortType: 'desc',
                    render: (h, params) => {
                        return h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, params.row.resHeat)
                    },
                },
                {
                    title: '评分',
                    key: 'resPoint',
                    align: 'center',
                    width: 180,
                    sortable: true,
                    render: (h, params) => {
                        return h('Rate', {
                            props: {
                                value: params.row.resPoint,
                                allowHalf: true,
                                disabled: true,
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 130,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params);
                                    }
                                }
                            }, '详情'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.download(params);
                                    }
                                }
                            }, '下载')
                        ]);
                    }
                }
            ],
            total: 0,
            page: 1,
            name: '',
            searchName: '',
            data: [],
            data_search: [],

        }
    },
    mounted() {
        
    },
    watch: {
        $route(to) {
            let path = to.path
            let index = path.lastIndexOf("\/")
            path = path.substring(index + 1, path.length);
            this.getRes(path);
        }
    },
    methods: {
        resTableData(list) {
            let a = [];
            for (let i = 0; i < list.length; i++) {
                a.push({
                    resName: list[i].resName,
                    resDescribe: list[i].resDescribe,
                    resForm: list[i].resForm,
                    resType: list[i].resType,
                    resUrl: list[i].resUrl,
                    resPassword: list[i].resPassword,
                    resUpTime: list[i].resUpTime,
                    resFailTime: list[i].resFailTime,
                    resId: list[i].resMore.resId,
                    resHeat: list[i].resMore.resHeat,
                    resStatus: list[i].resMore.resStatus,
                    resPoint: list[i].resMore.resPoint
                });
            }
            return a;
        },
        getRes(name) {
            this.$Loading.start();
            this.loading= true;
            this.name = name.toLowerCase();
            var _self = this;
            $.ajax({
                url: 'resources/res/' + this.name,
                data: {
                    page: this.page,
                    limit: 10
                },
                type: 'get',
                success(res_language) {
                    console.log(res_language);
                    _self.data = _self.resTableData(res_language.list);
                    _self.total = res_language.total;
                    _self.page = res_language.pageNum;
                    _self.$Loading.finish();
                    _self.loading = false;
                },
                error() {
                    _self.$Loading.error();
                    _self.loading = false;
                }
            });
        },
        changePage(page) {
            this.$Loading.start();
            this.page = page;
            if (this.searchName !== '')
                this.searchResByName(this.name);
            this.getRes(this.name);
        },
        useData(searchName) {
            if (searchName === '')
                return this.data;
            return this.data_search;
        },
        searchResByName(name) {
            this.$Loading.start();
            this.loading= true;
            var _self = this;
            $.ajax({
                url: 'resources/search',
                type: 'get',
                data: {
                    page: _self.page,
                    resName: name
                },
                success(search_res) {
                    _self.data_search = _self.resTableData(search_res.list);
                    _self.total = search_res.total;
                    _self.page = search_res.pageNum;
                    _self.$Loading.finish();
                    _self.loading= false;
                },
                error() {
                    _self.$Message.error('数据加载失败...');
                    _self.$Loading.error();
                    _self.loading= false;
                }
            })
        },
        show(param) {
            let arow = param.row;
            const textForm = arow.resForm === 1 ? '基础学习':
                arow.resForm === 5 ? '文档/PDF' :
                arow.resForm === 2 ? '进阶学习' :
                arow.resForm === 4 ? '项目实战' : '面试就业';
            const id = arow.resId;
            const name = arow.resName;
            const describe = arow.resDescribe;
            const url = 'https://' + arow.resUrl;
            const password = arow.resPassword;
            const status = arow.resStatus === 1 ? '有效' : '失效';
            const colorstatus = arow.resStatus === 1 ? 'success' : 'error';
            const uptime = arow.resUpTime;
            const failtime = arow.resFailTime;
            const point = arow.resPoint;
            const count = arow.resHeat;
            const up = arow.resUploader;
            this.$Modal.info({
                title: '详细信息',
                width: 520,
                render: (h) => {
                    return [
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '资源编号 RES ID: '),
                        h('Tag', {
                            props: {
                                color: 'primary'
                            }
                        }, id),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '类型 TYPE: '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, textForm),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '名称 NAME: '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, name),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '描述 DESCRIBE: '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, describe),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '链接 LINK: '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, url),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '密码 PASSWORD: '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, password),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'md-copy'
                            },
                            on: {
                                click: () => {
                                    res.download(param)
                                }
                            }
                        }, '复制'),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '状态 STATUS: '),
                        h('Tag', {
                            props: {
                                color: colorstatus
                            }
                        }, status),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '有效时间 USETIME: '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, [
                            h('i-Time', {
                                props: {
                                    time: uptime,
                                    type: 'date'
                                }
                            })
                        ]),
                        h('span', '-  '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, [
                            h('i-Time', {
                                props: {
                                    time: failtime,
                                    type: 'date'
                                }
                            })
                        ]),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '评分 MARK: '),
                        h('Rate', {
                            props: {
                                value: point,
                                allowHalf: true,
                                disabled: true,
                            }
                        }, point),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '下载量 CLICKRATE: '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, count),
                        h('br'),
                        h('span', {
                            style: {
                                fontWeight: 'bold',
                                fontSize: 25
                            }
                        }, '上传者 UPLOADER: '),
                        h('Tag', {
                            props: {
                                type: 'border',
                                color: 'primary'
                            }
                        }, up)
                    ]
                }
            })
        },
        countplus(params) {
            $.ajax({
                url: 'resources/count',
                type: 'post',
                data: {
                    resId: params.row.resId
                },
                success(count_result) {
                    params.row.resHeat += count_result;
                }
            })
        },
        // 复制密码并2秒后跳转
        download(params) {
            if (params.row.resStatus === 0) {
                this.$Modal.error({
                    title: '失败',
                    content: '该链接已经失效'
                });
                return;
            }
            this.copy(params.row.resPassword);
            this.$Modal.success({
                title: '成功',
                content: '已将云盘密码复制到粘贴板',
                loading: true,
                okText: '点此跳转',
                closable: true,
                onOk: () => {
                    setTimeout(() => {
                        window.open('https://' + params.row.resUrl);
                        this.$Modal.remove();
                        this.countplus(params)
                    }, 2000);
                }
            })
        },
        // 复制内容到粘贴板
        copy(str) {
            let oInput = document.createElement('input');
            oInput.value = str;
            document.body.appendChild(oInput);
            oInput.select();
            document.execCommand("Copy");
            oInput.style.display = 'none';
            document.body.removeChild(oInput);
        }
    },
}
</script>