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
                <div v-if="screenWidth > 400">
                    <Table stripe :loading="loading" no-filtered-data-text="暂无筛选结果,换一页试试" :columns="columns"
                           :data="useData(searchName)"></Table>
                </div>
                <div v-else>
                    <Table stripe :loading="loading" no-filtered-data-text="暂无筛选结果,换一页试试" :columns="columns_small"
                           :data="useData(searchName)"></Table>
                </div>
            </card>
            <div style="float: right;padding-top: 15px;">
                <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'videos',
        data() {
            return {
                // screenWidth: document.body.clientWidth,
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
                            let _self = this;
                            return [
                                h('span', {}, '名称 '),
                                h('Input', {
                                    props: {
                                        suffix: 'md-return-left',
                                        placeholder: '回车搜索',
                                        clearable: true,
                                    },
                                    on: {
                                        input: function (event) {
                                            _self.searchName = event;
                                        },
                                        'on-enter': () => {
                                            if (_self.searchName !== '') {
                                                _self.searchResByName(_self.searchName.toLowerCase())
                                            }
                                        },
                                        'on-clear': () => {
                                            _self.searchName = '';
                                            _self.data_search = [];
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
                            return h('Time', {
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
                columns_small: [
                    {
                        // title: '名称',
                        renderHeader: (h) => {
                            let _self = this;
                            return [
                                h('Input', {
                                    props: {
                                        placeholder: '回车搜索',
                                    },
                                    on: {
                                        input: function (event) {
                                            _self.searchName = event;
                                        },
                                        'on-enter': () => {
                                            _self.searchResByName(_self.searchName.toLowerCase())
                                        },
                                        'on-clear': () => {
                                            _self.searchName = '';
                                            _self.data_search = [];
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
                        title: '状态',
                        width: 80,
                        key: 'resStatus',
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.resStatus === 0 ? 'error' : 'success';
                            const text = row.resStatus === 0 ? '失效' : '有效';

                            return h('Tag', {
                                props: {
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
                        title: '操作',
                        key: 'action',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
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
                                        type: 'primary',
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
                searchName: '',
                data: [],
                data_search: [],
            }
        },
        props: ["choose", "screenWidth"],
        watch: {
            choose: {
                immediate: true,
                handler: function () {
                    if (this.choose !== '' && this.choose !== 'resources') {
                        this.getRes(this.choose);
                    }
                }
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
                        resId: list[i].resMore.resId,
                        resHeat: list[i].resMore.resHeat,
                        resStatus: list[i].resMore.resStatus,
                        resPoint: list[i].resMore.resPoint,
                        resUploader: list[i].resUploader
                    });
                }
                return a;
            },
            getRes(name) {
                this.loading = true;
                var _self = this;
                axios
                    .get('/api/res/video/' + name, {
                        params: {
                            page: this.page,
                            limit: 10
                        }
                    })
                    .then(res => {
                        if (res) {
                            _self.data = _self.resTableData(res.data.list);
                            _self.total = res.data.total;
                            _self.page = res.data.pageNum;
                            _self.loading = false;
                        }
                    })
            },
            changePage(page) {
                this.page = page;
                if (this.searchName !== '')
                    this.searchResByName(this.choose);
                this.getRes(this.choose);
            },
            useData(searchName) {
                if (searchName === '')
                    return this.data;
                return this.data_search;
            },
            searchResByName(name) {
                this.loading = true;
                var _self = this;
                axios
                    .get('/api/res/search', {
                        params: {
                            page: this.page,
                            resName: name
                        }
                    })
                    .then(res => {
                        if (res) {
                            _self.data_search = _self.resTableData(res.data.list);
                            _self.total = res.data.total;
                            _self.page = res.data.pageNum;
                            _self.loading = false;
                        }
                    })
            },
            show(param) {
                let arow = param.row;
                const textForm = arow.resForm === 1 ? '基础学习' :
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
                                        this.download(param)
                                    }
                                }
                            }, '复制密码'),
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
                            }, '上传日期 UPTIME: '),
                            h('Tag', {
                                props: {
                                    type: 'border',
                                    color: 'primary'
                                }
                            }, [
                                h('Time', {
                                    props: {
                                        time: uptime,
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
                let formData = new FormData();
                formData.append('resId', params.row.resId);
                axios
                    .post('/api/res/count', formData)
                    .then(res => {
                        if (res) {
                            params.row.resHeat += 1;
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