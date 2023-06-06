<!-- 时序信息组件 -->
<script setup lang="ts">
import { ref, withDefaults, nextTick, reactive, watch, shallowRef, getCurrentInstance } from 'vue'

import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtColumn from 'components/common/MyCtColumn.vue'
// import timeSeriesSetData from './TimeSeriesChartSet'
import EditWarningLine from './EditWarningLine.vue'

// const { t } = useI18n()

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

// const store = useStore()
// const route = userRoute()
interface Params {
  style: {
    width?: number
    height?: number
    [propName: string]: any
  },
  info: {
    data: any
    [propName: string]: any
  },
  [propName: string]: any
}

interface Props {
  data: Record<string, any>
  type: string
  activeId: string // 列表中选中的监控单元id
}

const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {}
  },
  type: '',
  activeId: 'activeId'
})
interface SetData {
  [key: string]: any
}

// 请求数
const requestsData = [
  {
    xValue: '10:17',
    y1Value: 23,
    type: '请求数'
  },
  {
    xValue: '10:19',
    y1Value: 35,
    type: '请求数'
  },
  {
    xValue: '10:21',
    y1Value: 68,
    type: '请求数'
  },
  {
    xValue: '10:23',
    y1Value: 70,
    type: '请求数'
  },
  {
    xValue: '10:25',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:27',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:29',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:31',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:33',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:35',
    y1Value: 90,
    type: '请求数'
  }
]

// 平均响应时间
const responseTimeData = [
  { xValue: '10:17', type: '平均响应时间', y1Value: 580 },
  { xValue: '10:19', type: '平均响应时间', y1Value: 400 },
  { xValue: '10:21', type: '平均响应时间', y1Value: 340 },
  { xValue: '10:23', type: '平均响应时间', y1Value: 650 },
  { xValue: '10:25', type: '平均响应时间', y1Value: 320 },
  { xValue: '10:27', type: '平均响应时间', y1Value: 500 }
]

const instance = getCurrentInstance() // 用于获取组件实例
// const setData: SetData = reactive(timeSeriesSetData) // 配置时序数据
const setData: SetData = ref([
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
            data: [], // 表格数据
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
            data: [],
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
                min: 0
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
            data: [], // 表格数据
            chart: {
              title: '磁盘信息',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 40],
              color: 'type',
              alias: 'TiB',
              // scale: {
              //   max: 100,
              //   min: 0
              // },
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
            data: [], // 表格数据
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
            data: [], // 表格数据
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
            data: [],
            chart: {
              title: '每分钟流量',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 50],
              color: {
                type: 'type',
                color: ['#0090FF', '#21BA45']
              },
              alias: 'MiB',
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
            data: [], // 表格数据
            chart: {
              title: '网络socket连接信息',
              position: 'xValue*y1Value',
              padding: [15, 50, 60, 40],
              color: 'type',
              alias: '',
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
])
const currentChart = shallowRef() // 动态组件声明
const currentWarnLine = ref() // 当前选中的预警线弹框数据
const currentEditChart = ref('') // 当前选中图表的key(setData[i].charts中的keys)
const currentChartIndex = ref() // 当前选中图表的key对应的index(setData[i].charts中的key的索引)
const currentTypeIndex = ref() // 当前选中图表所属的类别索引（setData index）

const editLineRef = ref() // 预警线弹框ref

const isShow = ref(false) // 是否展示时序图tab panel

const componentInstance = {
  ctLine: MyCtLine,
  ctColumn: MyCtColumn
}
watch(props, () => {
  setData.value[0].charts.cpuUsage.chartParams.info.data = props.data?.source?.cpu
  setData.value[0].charts.memoryInfo.chartParams.info.data = props.data?.source?.mem
  setData.value[0].charts.diskInfo.chartParams.info.data = props.data?.source?.disk
  setData.value[1].charts.sysLoad.chartParams.info.data = props.data?.performance?.load
  setData.value[2].charts.bandwidth.chartParams.info.data = props.data?.net?.bandwidth
  setData.value[2].charts.traffic.chartParams.info.data = props.data?.net?.flow
  setData.value[2].charts.socket.chartParams.info.data = props.data?.net?.socket
}, { deep: true })

/**
 * @desc: 监听当前组件展示状态（isShow），当状态变化时面板中所有的chart显示或隐藏
 * @return {*}
 */
watch(
  () => isShow.value,
  async (newVal, oldVal) => {
    // 监听到当前组件显示状态变化时，面板中所有的chart显示或隐藏
    if (newVal !== oldVal) {
      if (newVal) {
        // nextTick不能放在外层，否则当newVal为false时，组件实例已销毁，下面else中不能取到子组件chart实例并销毁
        await nextTick()

        for (let i = 0; i < setData.value.length; i++) {
          for (const key in setData.value[i].charts) {
            if (setData.value[i].isExpand) instance?.refs[`chart${key}`][0].show()
          }
        }
      } else {
        for (let i = 0; i < setData.value.length; i++) {
          for (const key in setData.value[i].charts) {
            if (setData.value[i].isExpand) instance?.refs[`chart${key}`][0].hidden()
          }
        }
      }
    }
  }
)
/**
 * @desc:监听所有面板的收起与展示状态（isExpand） 监听到某个面板展开或收起时，操作当前面板下的所有chart的展示状态
 * @return {*}
 */
watch(
  () => setData.value.map((data: any) => data.isExpand),
  async (newVal, oldVal) => {
    await nextTick()

    // 监听到某个面板展开或收起时，操作当前面板下的所有chart的展示状态
    for (let i = 0; i < newVal.length; i++) {
      if (newVal[i] !== oldVal[i]) {
        for (const key in setData.value[i].charts) {
          newVal[i] ? instance?.refs[`chart${key}`][0].show() : instance?.refs[`chart${key}`][0].hidden()
        }
      }
    }
  },
  { deep: true }
)

const show = () => {
  // TODO 更新当前setData数据
  isShow.value = true
}

const hidden = () => {
  isShow.value = false
}

/**
 * @desc: 展示修改预警线弹框
 * @param {*} type 当前选中的图表
 * @param {*} index 当前选中的图表index
 * @param {*} line 当前预警线配置信息
 * @return {*}
 */
const editLine = (typeIndex: any, chartKey: string, index: number, line: any) => {
  currentEditChart.value = chartKey
  currentChartIndex.value = index
  currentWarnLine.value = line
  currentTypeIndex.value = typeIndex

  editLineRef.value.show()
}

/**
 * @desc: 保存修改的预警线
 * @param {*} val
 * @return {*}
 */
const changeWarningLine = (val: any) => {
  // TODO 调用保存设置预警线接口，保存后需重新加载当前chart，修改配置数据
  // （warningLine，chartParams.info.chart.annotation.lineData，chartParams.info.chart.annotation.filterData）
  setData.value[currentTypeIndex.value].charts[currentEditChart.value].warningLine.data = val
  setData.value[currentTypeIndex.value].charts[currentEditChart.value].chartParams.info.chart.annotation.lineData = val

  for (const key in val) {
    setData.value[currentTypeIndex.value].charts[currentEditChart.value].chartParams.info.chart.annotation.filterData[key].end = val[key].value
  }

  // 重载当前chart图
  instance?.refs[`chart${currentEditChart.value}`][0].upDateChart()
}
defineExpose({ show, hidden })
</script>

<template>
  <div class="TimeSeriesChart" v-if="isShow">
    <div v-for="(el, elIndex) in setData" :key="elIndex">
<!--      <div v-show="!(elIndex === 1 && props?.type === 'host')">-->
        <div class="row items-center bg-aiops-border q-mb-sm">
          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="el.isExpand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="el.isExpand = !el.isExpand"
          />
          <p class="text-subtitle1 text-weight-bold ">{{ el.title }}</p>
        </div>

        <q-slide-transition>
          <div class="row" v-show="el.isExpand">
            <div
              :class="['col-6', {'q-pa-sm': index % 2 !== 0}, {'q-py-sm': index % 2 === 0}, {'q-pr-sm': index % 2 === 0}]"
              v-for="(item, key, index) in el.charts"
              :key="key"
            >
              <div class="row items-center">
                <p class="title"><i class="lar la-circle text-aiops-primary"></i> {{ item.title }}</p>
                <i
                  class="lar la-edit text-aiops-primary text-subtitle1 text-weight-bold cursor-pointer q-pl-xs"
                  @click="editLine(elIndex, key, index, item.warningLine.data)"
                >
                  <q-tooltip>
                    修改预警线
                  </q-tooltip>
                </i>
              </div>
              <div>
              </div>
              <!-- 判断是什么图表类型，引入图表组件，传入参数 -->
              <component
                :is="componentInstance[item.chartType]"
                :ref="`chart${key}`"
                :params="item.chartParams"
                :idName="key"
              >
              </component>
            </div>
          </div>
        </q-slide-transition>
<!--      </div>-->
    </div>

    <!-- 设置预警线弹框 -->
    <edit-warning-line ref="editLineRef" :lineData="currentWarnLine" @changeWarningLine="changeWarningLine"></edit-warning-line>

  </div>
</template>

<style lang="scss" scoped>
.TimeSeriesChart {
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
