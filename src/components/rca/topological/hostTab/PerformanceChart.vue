<!-- 性能组件 -->
<script setup lang="ts">
import { ref, nextTick, reactive, watch } from 'vue'
import { lineData } from 'components/common/myctline'

import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtColumn from 'components/common/MyCtColumn.vue'

const store = useStore()
const { nodeInfo } = storeToRefs(store)

const requestRef = ref()
const responseTimeRef = ref()
const sysLoadRef = ref()

const requestParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: lineData,
    chart: {
      position: 'time*cpu',
      padding: [15, 50, 20, 30],
      color: 'date',
      annotation: {
        line: {
          isHas: true
        },
        regionFilter: {
          isHas: true
        }
      }
    }
  }
})
const resTimeParams = reactive({
  style: {
    width: 350,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '超出时间', value: 80 },
      { time: '10:17', type: '正常时间', value: 200 },
      { time: '10:19', type: '超出时间', value: 0 },
      { time: '10:19', type: '正常时间', value: 130 },
      { time: '10:21', type: '超出时间', value: 0 },
      { time: '10:21', type: '正常时间', value: 160 },
      { time: '10:23', type: '超出时间', value: 40 },
      { time: '10:23', type: '正常时间', value: 200 },
      { time: '10:25', type: '超出时间', value: 10 },
      { time: '10:25', type: '正常时间', value: 200 },
      { time: '10:27', type: '超出时间', value: 20 },
      { time: '10:27', type: '正常时间', value: 200 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 50, 60, 50],
      adjust: 'stack',
      color: {
        type: 'type',
        color: ['#fc5531', '#40a9ff']
      },
      alias: 'ms'
    }
  }
})
const sysLoadParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.performance.load,
    chart: {
      title: '系统平均负载',
      position: 'xValue*y1Value',
      padding: [20, 50, 25, 40],
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
    // requestRef.value.show()
    // responseTimeRef.value.show()
    sysLoadRef.value.show()
  } else {
    // requestRef.value.hidden()
    // responseTimeRef.value.hidden()
    sysLoadRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="PerformanceChart" v-if="isShow">
    <!-- 无请求数指标 -->
    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 请求数</p>
      <my-ct-line ref="requestRef" :params="requestParams" idName="request"></my-ct-line>
    </div>

    <!-- 无平均响应时间指标 -->
    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 平均响应时间</p>
      <my-ct-column ref="responseTimeRef" idName="responseTime" :params="resTimeParams"></my-ct-column>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 系统平均负载</p>
      <my-ct-line ref="sysLoadRef" :params="sysLoadParams" idName="sysLoad"></my-ct-line>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.PerformanceChart {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
