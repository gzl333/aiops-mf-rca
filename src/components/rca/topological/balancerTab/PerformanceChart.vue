<!-- 性能组件 -->
<script setup lang="ts">
import { ref, nextTick, reactive, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import MyCtLine from 'components/common/MyCtLine.vue'

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
    throughputTotalRef.value.show()
    throughputRef.value.show()
  } else {
    throughputTotalRef.value.hidden()
    throughputRef.value.hidden()
  }
})

const throughputTotalRef = ref()
const throughputRef = ref()
const throughputTotalParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    title: '吞吐总量',
    data: nodeInfo.value.chartData.performance.throughputTotal,
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
const throughputParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.performance.throughput,
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
  <div class="PerformanceChart" v-if="isShow">
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 吞吐总量</p>
      <my-ct-line ref="throughputTotalRef" :params="throughputTotalParams" idName="throughputTotal"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 吞吐</p>
      <my-ct-line ref="throughputRef" :params="throughputParams" idName="throughput"></my-ct-line>
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
