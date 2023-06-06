<!-- 资源 -->
<script setup lang="ts">
import { ref, nextTick, reactive, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'

import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtColumn from 'components/common/MyCtColumn.vue'
import MyCtTrendLine from 'components/common/MyCtTrendLine.vue'

const store = useStore()
const { nodeInfo } = storeToRefs(store)

const cpuRef = ref()
const memoryRef = ref()
const diskRef = ref()

const cpuParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: nodeInfo.value.chartData.source.cpu,
    chart: {
      title: 'CPU使用率',
      position: 'xValue*y1Value',
      padding: [20, 20, 25, 50],
      color: {
        type: 'type',
        color: ['#FC5531', '#21BA45', '#FFAC33', '#0090FF']
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
            value: 80, // 预警值
            alias: '%' // 预警线单位
          }
        },
        regionFilter: {
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
})
const memoryParams = reactive({
  style: {
    width: 350,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.source.memory,
    chart: {
      title: '内存信息',
      position: 'xValue*y1Value',
      padding: [20, 50, 25, 50],
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
})
const diskParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.source.disk,
    chart: {
      title: '磁盘信息',
      position: 'xValue*y1Value',
      padding: [20, 50, 25, 40],
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
    cpuRef.value.show()
    memoryRef.value.show()
    diskRef.value.show()
  } else {
    cpuRef.value && cpuRef.value.hidden()
    memoryRef.value && memoryRef.value.hidden()
    diskRef.value && diskRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="SourceChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> CPU使用率</p>
      <my-ct-line ref="cpuRef" :params="cpuParams" idName="cpu"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 内存信息</p>
      <my-ct-line ref="memoryRef" idName="memory" :params="memoryParams"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘信息</p>
      <my-ct-line ref="diskRef" :params="diskParams" idName="disk"></my-ct-line>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.SourceChart {
  margin-left: -10px;
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
