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
const cpuSingleRef = ref()
const memoryRef = ref()
const diskUsageRef = ref()
const diskRemainRef = ref()
const fileSysRef = ref()
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
      padding: [30, 20, 25, 50],
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
const cpuSingleParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: [
      { time: '10:17', type: '--cpu0', value: 23 },
      { time: '10:17', type: '--cpu1', value: 14 },
      { time: '10:17', type: '--cpu2', value: 9 },
      { time: '10:17', type: '--cpu3', value: 9 },

      { time: '10:19', type: '--cpu0', value: 21 },
      { time: '10:19', type: '--cpu1', value: 14 },
      { time: '10:19', type: '--cpu2', value: 9 },
      { time: '10:19', type: '--cpu3', value: 5 },

      { time: '10:21', type: '--cpu0', value: 24 },
      { time: '10:21', type: '--cpu1', value: 13 },
      { time: '10:21', type: '--cpu2', value: 8 },
      { time: '10:21', type: '--cpu3', value: 10 },

      { time: '10:23', type: '--cpu0', value: 25 },
      { time: '10:23', type: '--cpu1', value: 16 },
      { time: '10:23', type: '--cpu2', value: 11 },
      { time: '10:23', type: '--cpu3', value: 9 },

      { time: '10:25', type: '--cpu0', value: 24 },
      { time: '10:25', type: '--cpu1', value: 13 },
      { time: '10:25', type: '--cpu2', value: 10 },
      { time: '10:25', type: '--cpu3', value: 9 },

      { time: '10:27', type: '--cpu0', value: 22 },
      { time: '10:27', type: '--cpu1', value: 11 },
      { time: '10:27', type: '--cpu2', value: 10 },
      { time: '10:27', type: '--cpu3', value: 7 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FC5531', '#21BA45', '#FFAC33', '#0090FF']
      },
      alias: '%',
      area: false,
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

const memoryParams = reactive({
  style: {
    width: 350,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.source.memory,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 25, 50],
      color: {
        type: 'type',
        color: ['#0090FF', '#FFAC33', '#FC5531', '#21BA45']
      },
      alias: 'GiB',
      shape: 'smooth',
      area: true,
      annotation: {
        line: {
          isHas: true // 展示预警线
        },
        lineData: { // 数据同上面warningLine中的data
          usage: {
            label: '预警线', // 预警线名
            value: nodeInfo.value.chartData.warning?.memory || 500, // 预警值
            alias: '' // 预警线单位
          }
        },
        regionFilter: {
          isHas: true
        },
        filterData: {
          usage: {
            start: 10000000, // 小于当前值
            end: nodeInfo.value.chartData.warning?.memory || 500 // 且大于当前值 的范围标红
          }
        }
      },
      legend: true
    }
  }
})
const diskUsageParams = reactive({
  style: {
    width: 400,
    height: 150
  },
  info: {
    data: [
      { time: '10:17', type: '目录:/boot', value: 18 },
      { time: '10:17', type: '目录:/', value: 14 },
      { time: '10:19', type: '目录:/boot', value: 18 },
      { time: '10:19', type: '目录:/', value: 14 },
      { time: '10:21', type: '目录:/boot', value: 18 },
      { time: '10:21', type: '目录:/', value: 14 },
      { time: '10:23', type: '目录:/boot', value: 18 },
      { time: '10:23', type: '目录:/', value: 16 },
      { time: '10:25', type: '目录:/boot', value: 17 },
      { time: '10:25', type: '目录:/', value: 13 },
      { time: '10:27', type: '目录:/boot', value: 17 },
      { time: '10:27', type: '目录:/', value: 13 }
    ],
    chart: {
      position: 'time*value',
      padding: [15, 20, 60, 50],
      color: {
        type: 'type',
        color: ['#FC5531', '#21BA45', '#FFAC33', '#0090FF']
      },
      alias: '%',
      area: false,
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
const diskRemainParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.source.disk,
    chart: {
      title: '磁盘信息',
      position: 'xValue*y1Value',
      padding: [30, 50, 25, 40],
      color: 'type',
      alias: 'GiB',
      scale: {
        // max: 100,
        min: 0
      },
      annotation: {
        line: {
          isHas: true // 是否展示预警线
        },
        lineData: { // 数据同上面warningLine中的data
          usage: {
            label: '预警线', // 预警线名
            value: nodeInfo.value.chartData.warning?.disk_used || 80, // 预警值
            alias: 'GiB' // 预警线单位
          }
        },
        regionFilter: { // 是否将预警线范围内的值覆盖成红色
          isHas: true
        },
        filterData: {
          usage: {
            start: Number(nodeInfo.value.chartData.warning?.disk_used) * 1.2 || 100, // 小于当前值
            end: nodeInfo.value.chartData.warning?.disk_used || 80 // 且大于当前值 的范围标红
          }
        }
      },
      legend: true
    }
  }
})
const fileSysParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.source.filesystem,
    chart: {
      title: '分区信息',
      position: 'xValue*y1Value',
      padding: [30, 50, 25, 40],
      color: 'type',
      alias: 'GiB',
      scale: {
        // max: 100,
        min: 0
      },
      annotation: {
        line: {
          isHas: true // 是否展示预警线
        },
        lineData: { // 数据同上面warningLine中的data
          usage: {
            label: '预警线', // 预警线名
            value: nodeInfo.value.chartData.warning?.fileSys || 1500, // 预警值
            alias: 'GiB' // 预警线单位
          }
        },
        regionFilter: { // 是否将预警线范围内的值覆盖成红色
          isHas: true
        },
        filterData: {
          usage: {
            start: Number(nodeInfo.value.chartData.warning?.fileSys) * 1.2 || 100000000, // 小于当前值
            end: nodeInfo.value.chartData.warning?.fileSys || 1500 // 且大于当前值 的范围标红
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
    // cpuSingleRef.value.show()
    memoryRef.value.show()
    // diskUsageRef.value.show()
    diskRemainRef.value.show()
    fileSysRef.value.show()
  } else {
    cpuRef.value && cpuRef.value.hidden()
    // cpuSingleRef.value.hidden()
    memoryRef.value && memoryRef.value.hidden()
    // diskUsageRef.value.hidden()
    diskRemainRef.value && diskRemainRef.value.hidden()
    fileSysRef.value && fileSysRef.value.hidden()
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="SourceChart" v-if="isShow">
    <!--cpu详细使用率，单核cpu使用率， 内存使用量，swap使用量，磁盘空间使用率，磁盘剩余空间，磁盘吞吐量，磁盘iops使用量，网卡吞吐量 -->
    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> CPU详细使用率</p>
      <my-ct-line ref="cpuRef" :params="cpuParams" idName="cpu"></my-ct-line>
    </div>

    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 单核CPU使用率</p>
      <my-ct-line ref="cpuSingleRef" :params="cpuSingleParams" idName="cpuSingle"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 内存使用量</p>
      <my-ct-line ref="memoryRef" idName="memory" :params="memoryParams"></my-ct-line>
    </div>

    <div class="q-px-sm" v-if="false">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘空间使用率</p>
      <my-ct-line ref="diskUsageRef" :params="diskUsageParams" idName="diskUsage"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 磁盘空间</p>
      <my-ct-line ref="diskRemainRef" :params="diskRemainParams" idName="diskRemain"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 分区空间</p>
      <my-ct-line ref="fileSysRef" :params="fileSysParams" idName="fileSys"></my-ct-line>
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
