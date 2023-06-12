<!-- 性能组件 -->
<script setup lang="ts">
import { ref, nextTick, reactive, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtGauge from 'components/common/MyCtGauge.vue'

// import MyCtRadialLine from 'components/common/MyCtRadialLine.vue'

const store = useStore()
const { nodeInfo } = storeToRefs(store)

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
    avrCPURef.value.show()
    CPURateRef.value.show()
  } else {
    avrCPURef.value.hidden()
    CPURateRef.value.hidden()
  }
})

const avrCPURef = ref()
const CPURateRef = ref()
const avrCPU = ref(0)
let sumCPU = 0
nodeInfo.value.chartData.source.cpu.forEach(item => {
  sumCPU += item.y1Value
})
const avrCPUParams = reactive({
  style: {
    width: 400,
    height: 180
  },
  info: {
    title: '',
    data: [
      { value: avrCPU.value }
      // { term: nodeInfo.value.ip, count: avrCPU.value }
    ],
    chart: {
      annotation: {
        style: {
          stroke: 'l(0) 0:#21BA45 0.7:#F2C037 1:#FC5531'
        }
      }
    }
  }
})
const CPURateParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.source.cpu,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 30, 50],
      color: {
        type: 'type',
        color: ['#0090FF']
      },
      alias: '%',
      scale: {
        max: 100,
        min: 0
      },
      area: false,
      annotation: {
        line: {
          isHas: true // 展示预警线
        },
        lineData: { // 数据同上面warningLine中的data
          usage: {
            label: '预警线', // 预警线名
            value: nodeInfo.value.chartData.warning?.cpu_rate || 80, // 预警值
            alias: '%' // 预警线单位
          }
        },
        regionFilter: {
          isHas: true
        },
        filterData: {
          usage: {
            start: 100, // 小于当前值
            end: nodeInfo.value.chartData.warning?.cpu_rate || 80 // 且大于当前值 的范围标红
          }
        }
      },
      legend: true
    }
  }
})
defineExpose({ show, hidden })
</script>

<template>
  <div class="PerformanceChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 平均CPU使用率</p>
      <my-ct-gauge ref="avrCPURef" :params="avrCPUParams" idName="avrCPU"></my-ct-gauge>
      <!-- <my-ct-radial-line ref="avrCPURef" :params="avrCPUParams" idName="avrCPU"></my-ct-radial-line> -->
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> CPU使用率</p>
      <my-ct-line ref="CPURateRef" :params="CPURateParams" idName="CPURate"></my-ct-line>
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
