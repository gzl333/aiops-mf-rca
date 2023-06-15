<!-- 性能组件 -->
<script setup lang="ts">
import { ref, nextTick, reactive, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import MyCtLine from 'components/common/MyCtLine.vue'
import MyCtColumn from 'components/common/MyCtColumn.vue'

const store = useStore()
const { nodeInfo } = storeToRefs(store)

const qpsRef = ref()
const tpsRef = ref()
const sysLoadRef = ref()
// const diskThroughputRef = ref()
// const diskIOPSRef = ref()
// const networkCardThRef = ref()

const qpsParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: nodeInfo.value.chartData.performance.mysqlQPS,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 25, 50],
      color: 'type',
      area: false,
      shape: 'smooth',
      alias: '次/秒',
      scale: {
        max: 600,
        min: 0
      },
      annotation: {
        line: {
          isHas: true // 展示预警线
        },
        lineData: { // 数据同上面warningLine中的data
          usage: {
            label: '预警线', // 预警线名
            value: nodeInfo.value.chartData.warning?.qps || 500, // 预警值
            alias: '' // 预警线单位
          }
        },
        regionFilter: {
          isHas: true
        },
        filterData: {
          usage: {
            start: 1000, // 小于当前值
            end: nodeInfo.value.chartData.warning?.qps || 500 // 且大于当前值 的范围标红
          }
        }
      },
      legend: false
    }
  }
})
const tpsParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: nodeInfo.value.chartData.performance.mysqlTPS,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 25, 50],
      color: 'type',
      area: false,
      shape: 'smooth',
      alias: '次/秒',
      scale: {
        max: 600,
        min: 0
      },
      annotation: {
        line: {
          isHas: true // 展示预警线
        },
        lineData: { // 数据同上面warningLine中的data
          usage: {
            label: '预警线', // 预警线名
            value: nodeInfo.value.chartData.warning?.tps || 500, // 预警值
            alias: '' // 预警线单位
          }
        },
        regionFilter: {
          isHas: true
        },
        filterData: {
          usage: {
            start: 1000, // 小于当前值
            end: nodeInfo.value.chartData.warning?.tps || 500 // 且大于当前值 的范围标红
          }
        }
      },
      legend: false
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
      padding: [30, 20, 25, 50],
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
const diskThroughputParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: 'Read:sda', value: 1.02 },
      { time: '10:17', type: 'Write:sda', value: 1.09 },
      { time: '10:19', type: 'Read:sda', value: 1.00 },
      { time: '10:19', type: 'Write:sda', value: 1.09 },
      { time: '10:21', type: 'Read:sda', value: 2.3 },
      { time: '10:21', type: 'Write:sda', value: 1.53 },
      { time: '10:23', type: 'Read:sda', value: 1.34 },
      { time: '10:23', type: 'Write:sda', value: 480 },
      { time: '10:25', type: 'Read:sda', value: 1.45 },
      { time: '10:25', type: 'Write:sda', value: 1.63 },
      { time: '10:27', type: 'Read:sda', value: 1.34 },
      { time: '10:27', type: 'Write:sda', value: 1.74 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FFAC33', '#0090FF']
      },
      alias: 'Mib',
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
const diskIOPSParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: 'Read:sda', value: 0 },
      { time: '10:17', type: 'Write:sda', value: 21.09 },
      { time: '10:19', type: 'Read:sda', value: 0 },
      { time: '10:19', type: 'Write:sda', value: 131.09 },
      { time: '10:21', type: 'Read:sda', value: 0 },
      { time: '10:21', type: 'Write:sda', value: 41.53 },
      { time: '10:23', type: 'Read:sda', value: 0 },
      { time: '10:23', type: 'Write:sda', value: 150 },
      { time: '10:25', type: 'Read:sda', value: 0 },
      { time: '10:25', type: 'Write:sda', value: 113 },
      { time: '10:27', type: 'Read:sda', value: 0 },
      { time: '10:27', type: 'Write:sda', value: 24 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FFAC33', '#0090FF']
      },
      alias: 'io/s',
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
const networkCardThParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: [
      { time: '10:17', type: '-em1-Outgoing', value: 0 },
      { time: '10:17', type: '-em2-Outgoing', value: 0 },
      { time: '10:19', type: '-em1-Outgoing', value: 1 },
      { time: '10:19', type: '-em2-Outgoing', value: 31.09 },
      { time: '10:21', type: '-em1-Outgoing', value: 0 },
      { time: '10:21', type: '-em2-Outgoing', value: 41.53 },
      { time: '10:23', type: '-em1-Outgoing', value: 4 },
      { time: '10:23', type: '-em2-Outgoing', value: 38.74 },
      { time: '10:25', type: '-em1-Outgoing', value: 0 },
      { time: '10:25', type: '-em2-Outgoing', value: 0 },
      { time: '10:27', type: '-em1-Outgoing', value: 0 },
      { time: '10:27', type: '-em2-Outgoing', value: 24 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FFAC33', '#0090FF']
      },
      alias: 'Mib',
      shape: 'smooth',
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
    qpsRef.value.show()
    tpsRef.value.show()
    sysLoadRef.value.show()
    // diskThroughputRef.value.show()
    // diskIOPSRef.value.show()
    // networkCardThRef.value.show()
  } else {
    qpsRef.value && qpsRef.value.hidden()
    tpsRef.value && tpsRef.value.hidden()
    sysLoadRef.value && sysLoadRef.value.hidden()
    // diskThroughputRef.value.hidden()
    // diskIOPSRef.value.hidden()
    // networkCardThRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="PerformanceChart" v-if="isShow">
    <!-- qps, tps, 系统负载，磁盘吞吐量，磁盘iops使用量，网卡吞吐量 -->
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> qps</p>
      <my-ct-line ref="qpsRef" :params="qpsParams" idName="qps"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> tps</p>
      <my-ct-line ref="tpsRef" :params="tpsParams" idName="tps"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 系统负载</p>
      <my-ct-line ref="sysLoadRef" :params="sysLoadParams" idName="sysLoad"></my-ct-line>
    </div>

    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘吞吐量</p>
      <my-ct-line ref="diskThroughputRef" :params="diskThroughputParams" idName="diskThroughput"></my-ct-line>
    </div>

    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘iops使用量</p>
      <my-ct-line ref="diskIOPSRef" :params="diskIOPSParams" idName="diskIOPS"></my-ct-line>
    </div>

    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 网卡吞吐量</p>
      <my-ct-line ref="networkCardThRef" :params="networkCardThParams" idName="networkCardTh"></my-ct-line>
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
