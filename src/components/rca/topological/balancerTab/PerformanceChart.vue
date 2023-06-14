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
    connsRef.value.show()
    sslTransRef.value.show()
    pvaConnsRef.value.show()
    tcpConnsRef.value.show()
  } else {
    throughputTotalRef.value && throughputTotalRef.value.hidden()
    throughputRef.value && throughputRef.value.hidden()
    connsRef.value && connsRef.value.hidden()
    sslTransRef.value && sslTransRef.value.hidden()
    pvaConnsRef.value && pvaConnsRef.value.hidden()
    tcpConnsRef.value && tcpConnsRef.value.hidden()
  }
})

const throughputTotalRef = ref()
const throughputRef = ref()
const connsRef = ref()
const sslTransRef = ref()
const pvaConnsRef = ref()
const tcpConnsRef = ref()

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
const connsParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.performance.conns,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 25, 50],
      color: 'type',
      alias: '次',
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
const sslTransParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.performance.sslConns,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 25, 50],
      color: 'type',
      alias: '次',
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
const pvaConnsParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.performance.pvaConns,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 25, 50],
      color: 'type',
      alias: '次',
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
const tcpConnsParams = reactive({
  style: {
    width: 400,
    height: 200
  },
  info: {
    data: nodeInfo.value.chartData.performance.tcpConns,
    chart: {
      position: 'xValue*y1Value',
      padding: [30, 20, 25, 50],
      color: 'type',
      alias: '次',
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

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> 连接数统计</p>
      <my-ct-line ref="connsRef" :params="connsParams" idName="conns"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> ssl会话统计</p>
      <my-ct-line ref="sslTransRef" :params="sslTransParams" idName="sslTrans"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> PVA连接</p>
      <my-ct-line ref="pvaConnsRef" :params="pvaConnsParams" idName="pvaConns"></my-ct-line>
    </div>

    <div class="q-px-sm">
      <p class="title"><i class="lar la-circle text-aiops-primary"></i> TCP连接</p>
      <my-ct-line ref="tcpConnsRef" :params="tcpConnsParams" idName="tcpConns"></my-ct-line>
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
