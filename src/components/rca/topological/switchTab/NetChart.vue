<!-- 网络组件 -->
<script setup lang="ts">
import { ref, nextTick, reactive, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import MyCtColumn from 'components/common/MyCtColumn.vue'

const store = useStore()
const { nodeInfo } = storeToRefs(store)

const trafficRef = ref()
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
  } else {
    trafficRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="NetChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 每分钟流量</p>
      <my-ct-column ref="trafficRef" :params="trafficParams" idName="traffic"></my-ct-column>
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
