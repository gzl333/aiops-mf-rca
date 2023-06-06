import {
  cpuUsageData,
  memoryInfoData,
  diskData,
  requestsData,
  responseTimeData,
  sysLoadData,
  bandwidthData,
  trafficData,
  socketData
} from './chartTestData/host'
const timeSeriesSetData = [
  {
    type: 'source',
    isExpand: true,
    title: '资源',
    charts: {
      cpuUsage: {
        title: 'CPU使用率',
        alias: '%',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            usage: { // key->usage名 会随每个图表变化
              label: '预警线', // 预警线名
              value: 80, // 预警值
              alias: '%' // 预警线单位
            }
            // test: { // key->usage名 会随每个图表变化
            //   label: '低预警线', // 预警线名
            //   value: 30, // 预警值
            //   alias: '%' // 预警线单位
            // }
          }
        },
        chartType: 'ctLine', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: cpuUsageData, // 表格数据
            chart: {
              title: 'CPU使用率',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 40],
              color: 'type',
              alias: '%',
              scale: {
                max: 100,
                min: 0
              },
              annotation: {
                line: {
                  isHas: true // 是否展示预警线
                },
                lineData: { // 数据同上面warningLine中的data
                  usage: {
                    label: '预警线', // 预警线名
                    value: 80, // 预警值
                    alias: '%' // 预警线单位
                  }
                  // test: { // key->usage名 会随每个图表变化
                  //   label: '低预警线', // 预警线名
                  //   value: 30, // 预警值
                  //   alias: '%' // 预警线单位
                  // }
                },
                regionFilter: { // 是否将预警线范围内的值覆盖成红色
                  isHas: true
                },
                filterData: {
                  usage: {
                    start: 100, // 小于当前值
                    end: 80 // 且大于当前值 的范围标红
                  }
                  // test: {
                  //   start: 0,
                  //   end: 30
                  // }
                }
              },
              legend: true
            }

          }
        }
      },
      memoryInfo: {
        title: '内存信息',
        alias: 'GiB',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            memory: {
              label: '预警线', // 预警线名
              value: 1000, // 预警值
              alias: 'GiB' // 预警线单位
            }
          }
        },
        chartType: 'ctLine', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: memoryInfoData,
            chart: {
              title: '内存信息',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 50],
              color: {
                type: 'type',
                color: ['#0090FF', '#FC5531']
              },
              alias: 'GiB',
              scale: {
                max: 1050,
                min: 950
              },
              annotation: {
                line: {
                  isHas: true
                },
                lineData: {
                  memory: {
                    label: '预警线', // 预警线名
                    value: 1000, // 预警值
                    alias: 'GiB' // 预警线单位
                  }
                },
                regionFilter: {
                  isHas: true
                },
                filterData: {
                  memory: {
                    start: 1050, // 小于当前值，等于scale的max
                    end: 1000 // 且大于当前值 的范围标红
                  }
                }
              },
              legend: true
            }
          }
        }
      },
      diskInfo: {
        title: '磁盘信息',
        alias: 'TiB',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            usage: { // key->usage名 会随每个图表变化
              label: '预警线', // 预警线名
              value: 80, // 预警值
              alias: 'TiB' // 预警线单位
            }
            // test: { // key->usage名 会随每个图表变化
            //   label: '低预警线', // 预警线名
            //   value: 30, // 预警值
            //   alias: '%' // 预警线单位
            // }
          }
        },
        chartType: 'ctLine', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: diskData, // 表格数据
            chart: {
              title: '磁盘信息',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 40],
              color: 'type',
              alias: 'TiB',
              scale: {
                max: 100,
                min: 0
              },
              annotation: {
                line: {
                  isHas: true // 是否展示预警线
                },
                lineData: { // 数据同上面warningLine中的data
                  usage: {
                    label: '预警线', // 预警线名
                    value: 80, // 预警值
                    alias: 'TiB' // 预警线单位
                  }
                },
                regionFilter: { // 是否将预警线范围内的值覆盖成红色
                  isHas: true
                },
                filterData: {
                  usage: {
                    start: 100, // 小于当前值
                    end: 80 // 且大于当前值 的范围标红
                  }
                }
              },
              legend: true
            }

          }
        }
      }
    }
  },
  {
    type: 'performance',
    isExpand: true,
    title: '性能',
    charts: {
      requests: {
        title: '请求数',
        alias: '次',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            requests: { // key->usage名 会随每个图表变化
              label: '预警线', // 预警线名
              value: 80, // 预警值
              alias: '次' // 预警线单位
            }
          }
        },
        chartType: 'ctLine', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: requestsData, // 表格数据
            chart: {
              title: '请求数',
              position: 'xValue*y1Value',
              padding: [15, 50, 20, 40],
              area: true,
              color: 'type',
              alias: '次',
              scale: {
                max: 100,
                min: 0
              },
              annotation: {
                line: {
                  isHas: true // 是否展示预警线
                },
                lineData: { // 数据同上面warningLine中的data
                  requests: {
                    label: '预警线', // 预警线名
                    value: 80, // 预警值
                    alias: '次' // 预警线单位
                  }
                },
                regionFilter: { // 是否将预警线范围内的值覆盖成红色
                  isHas: true
                },
                filterData: {
                  requests: {
                    start: 100, // 小于当前值
                    end: 80 // 且大于当前值 的范围标红
                  }
                }
              },
              legend: false
            }

          }
        }
      },
      responseTime: {
        title: '平均响应时间',
        alias: 'ms',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            responseTime: {
              label: '预警线', // 预警线名
              value: 500, // 预警值
              alias: 'ms' // 预警线单位
            }
          }
        },
        chartType: 'ctLine', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: responseTimeData,
            chart: {
              title: '平均响应时间',
              position: 'xValue*y1Value',
              padding: [15, 50, 20, 50],
              color: {
                type: 'type',
                color: ['#0090FF', '#FC5531']
              },
              alias: 'ms',
              scale: {
                max: 1000,
                min: 0
              },
              annotation: {
                line: {
                  isHas: true
                },
                lineData: {
                  responseTime: {
                    label: '预警线', // 预警线名
                    value: 500, // 预警值
                    alias: 'ms' // 预警线单位
                  }
                },
                regionFilter: {
                  isHas: true
                },
                filterData: {
                  responseTime: {
                    start: 1000, // 小于当前值，等于scale的max
                    end: 500 // 且大于当前值 的范围标红
                  }
                }
              },
              legend: false
            }
          }
        }
      },
      sysLoad: {
        title: '系统平均负载',
        alias: '',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            sysLoad: { // key->usage名 会随每个图表变化
              label: '预警线', // 预警线名
              value: 8, // 预警值
              alias: '' // 预警线单位
            }
          }
        },
        chartType: 'ctLine', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: sysLoadData, // 表格数据
            chart: {
              title: '系统平均负载',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 40],
              color: 'type',
              alias: '',
              scale: {
                max: 10,
                min: 0
              },
              annotation: {
                line: {
                  isHas: true // 是否展示预警线
                },
                lineData: { // 数据同上面warningLine中的data
                  sysLoad: {
                    label: '预警线', // 预警线名
                    value: 8, // 预警值
                    alias: '' // 预警线单位
                  }
                },
                regionFilter: { // 是否将预警线范围内的值覆盖成红色
                  isHas: true
                },
                filterData: {
                  sysLoad: {
                    start: 10, // 小于当前值
                    end: 8 // 且大于当前值 的范围标红
                  }
                }
              },
              legend: true
            }

          }
        }
      }
    }
  },
  {
    type: 'net',
    isExpand: true,
    title: '网络',
    charts: {
      bandwidth: {
        title: '每分钟网络带宽使用',
        alias: 'kb/s',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            bandtop: {
              label: '预警线', // 预警线名
              value: 310, // 预警值
              alias: 'kb/s' // 预警线单位
            },
            bandbottom: {
              label: '预警线', // 预警线名
              value: -300, // 预警值
              alias: 'kb/s' // 预警线单位
            }
          }
        },
        chartType: 'ctLine', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: bandwidthData, // 表格数据
            chart: {
              title: '每分钟网络带宽使用',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 40],
              area: true,
              color: 'type',
              alias: 'kb/s',
              scale: {
                max: 400,
                min: -400
              },
              annotation: {
                line: {
                  isHas: true // 是否展示预警线
                },
                lineData: { // 数据同上面warningLine中的data
                  bandtop: {
                    label: '预警线', // 预警线名
                    value: 310, // 预警值
                    alias: 'kb/s' // 预警线单位
                  },
                  bandbottom: {
                    label: '预警线', // 预警线名
                    value: -300, // 预警值
                    alias: 'kb/s' // 预警线单位
                  }
                },
                regionFilter: { // 是否将预警线范围内的值覆盖成红色
                  isHas: true
                },
                filterData: {
                  bandtop: {
                    start: 400, // 小于当前值
                    end: 310 // 且大于当前值 的范围标红
                  },
                  bandbottom: {
                    start: -400, // 小于当前值
                    end: -300 // 且大于当前值 的范围标红
                  }
                }
              },
              legend: true
            }

          }
        }
      },
      traffic: {
        title: '每分钟流量',
        alias: 'MiB',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            traffictop: {
              label: '预警线', // 预警线名
              value: 310, // 预警值
              alias: 'MiB' // 预警线单位
            },
            trafficbottom: {
              label: '预警线', // 预警线名
              value: -300, // 预警值
              alias: 'MiB' // 预警线单位
            }
          }
        },
        chartType: 'ctColumn', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: trafficData,
            chart: {
              title: '每分钟流量',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 50],
              color: {
                type: 'type',
                color: ['#0090FF', '#21BA45']
              },
              alias: 'MiB',
              scale: {
                max: 400,
                min: -400
              },
              annotation: {
                line: {
                  isHas: true
                },
                lineData: {
                  traffictop: {
                    label: '预警线', // 预警线名
                    value: 310, // 预警值
                    alias: 'MiB' // 预警线单位
                  },
                  trafficbottom: {
                    label: '预警线', // 预警线名
                    value: -300, // 预警值
                    alias: 'MiB' // 预警线单位
                  }
                },
                regionFilter: {
                  isHas: true
                },
                filterData: {
                  traffictop: {
                    start: 400, // 小于当前值
                    end: 310 // 且大于当前值 的范围标红
                  },
                  trafficbottom: {
                    start: -400, // 小于当前值
                    end: -300 // 且大于当前值 的范围标红
                  }
                }
              },
              legend: true
            }
          }
        }
      },
      socket: {
        title: '网络socket连接信息',
        alias: '',
        warningLine: { // 预警线配置
          canEdit: true, // 是否可设置预警线
          data: {
            socket: { // key->usage名 会随每个图表变化
              label: '预警线', // 预警线名
              value: 8, // 预警值
              alias: '' // 预警线单位
            }
          }
        },
        chartType: 'ctLine', // 图表类型
        chartParams: {
          style: {
            width: 400,
            height: 200
          },
          info: {
            data: socketData, // 表格数据
            chart: {
              title: '网络socket连接信息',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 40],
              color: 'type',
              alias: '',
              scale: {
                max: 10,
                min: 0
              },
              annotation: {
                line: {
                  isHas: true // 是否展示预警线
                },
                lineData: { // 数据同上面warningLine中的data
                  socket: {
                    label: '预警线', // 预警线名
                    value: 8, // 预警值
                    alias: '' // 预警线单位
                  }
                },
                regionFilter: { // 是否将预警线范围内的值覆盖成红色
                  isHas: true
                },
                filterData: {
                  socket: {
                    start: 10, // 小于当前值
                    end: 8 // 且大于当前值 的范围标红
                  }
                }
              },
              legend: true
            }

          }
        }
      }
    }
  }
]

export default timeSeriesSetData
