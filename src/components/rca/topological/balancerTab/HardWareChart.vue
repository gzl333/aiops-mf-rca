<!-- 硬件指标组件 -->
<script setup lang="ts">
import { ref, nextTick, reactive, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'

import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtGauge from 'components/common/MyCtGauge.vue'

const store = useStore()
const { nodeInfo } = storeToRefs(store)
const avrCPU = ref(0)
let sumCPU = 0
nodeInfo.value.chartData.source.cpu.forEach(item => {
  sumCPU += item.y1Value
})
avrCPU.value = Number((sumCPU / (nodeInfo.value.chartData.source.cpu.length * 10)).toFixed(2))

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
    memoryUsedRef.value.show()
  } else {
    avrCPURef.value.hidden()
    memoryUsedRef.value.hidden()
  }
})

const avrCPURef = ref()
const memoryUsedRef = ref()
const avrCPUParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    title: '',
    data: [ // 获取的数据，需要请求接口拿到（写在show方法中）
      // 仪表盘
      { value: avrCPU.value }
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

const memoryUsedParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.source.f5Memory,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 25, 50],
      color: 'type',
      alias: 'GiB',
      annotation: {
        line: {
          isHas: false
        },
        regionFilter: {
          isHas: false
        }
      },
      legend: true
    }
  }
})
defineExpose({ show, hidden })
</script>

<template>
  <div class="HardWareChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 系统cpu使用率</p>
      <my-ct-gauge ref="avrCPURef" :params="avrCPUParams" idName="avrCPU"></my-ct-gauge>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 内存使用</p>
      <my-ct-line ref="memoryUsedRef" :params="memoryUsedParams" idName="memoryUsed"></my-ct-line>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.HardWareChart {
  margin-left: -10px;

  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
