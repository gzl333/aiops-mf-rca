<!-- 网络组件 -->
<script setup lang="ts">
import { ref, nextTick, reactive, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtColumn from 'components/common/MyCtColumn.vue'

const store = useStore()
const { nodeInfo } = storeToRefs(store)

const bandwidthRef = ref()
const trafficRef = ref()
const socketRef = ref()

const bandwidthParams = reactive({
  style: {
    width: 350,
    height: 180
  },
  info: {
    data: nodeInfo.value.chartData.net.bandwidth,
    chart: {
      title: '每分钟网络带宽使用',
      position: 'xValue*y1Value',
      padding: [30, 50, 25, 40],
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
})
const trafficParams = reactive({
  style: {
    width: 350,
    height: 180
  },
  info: {
    data: nodeInfo.value.chartData.net.flow,
    chart: {
      title: '每分钟流量',
      position: 'xValue*y1Value',
      padding: [30, 50, 25, 50],
      color: {
        type: 'type',
        color: ['#0090FF', '#21BA45']
      },
      alias: 'MiB',
      scale: {
        max: 800,
        min: -800
      },
      annotation: {
        line: {
          isHas: true
        },
        lineData: {
          traffictop: {
            label: '预警线', // 预警线名
            value: 500, // 预警值
            alias: 'MiB' // 预警线单位
          },
          trafficbottom: {
            label: '预警线', // 预警线名
            value: -500, // 预警值
            alias: 'MiB' // 预警线单位
          }
        },
        regionFilter: {
          isHas: true
        },
        filterData: {
          traffictop: {
            start: 800, // 小于当前值
            end: 500 // 且大于当前值 的范围标红
          },
          trafficbottom: {
            start: -500, // 小于当前值
            end: -800 // 且大于当前值 的范围标红
          }
        }
      },
      legend: true
    }
  }
})
const socketParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.net.socket,
    chart: {
      title: '网络socket连接信息',
      position: 'xValue*y1Value',
      padding: [30, 50, 25, 40],
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
})

const isShow = ref(false)

const show = async () => {
  isShow.value = true
}

const hidden = async () => {
  isShow.value = false
}

watch(() => isShow.value, async (val) => {
  await nextTick()

  if (val) {
    trafficRef.value.show()
    // bandwidthRef.value.show()
    // socketRef.value.show()
  } else {
    trafficRef.value.hidden()
    // bandwidthRef.value.hidden()
    // socketRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="NetChart" v-if="isShow">
    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 每分钟网络带宽使用</p>
      <my-ct-line ref="bandwidthRef" :params="bandwidthParams" idName="bandwidth"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 每分钟流量</p>
      <my-ct-column ref="trafficRef" :params="trafficParams" idName="traffic"></my-ct-column>
    </div>

    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 网络socket连接信息</p>
      <my-ct-line ref="socketRef" :params="socketParams" idName="socket"></my-ct-line>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.NetChart {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
