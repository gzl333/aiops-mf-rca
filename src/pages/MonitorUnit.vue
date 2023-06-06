<!-- 监控单元页 -->
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'

import SelectCmpt from 'components/rca/monitorUnit/SelectCmpt.vue'
import UnitInfo from 'components/rca/monitorUnit/UnitInfo.vue'
import api from 'src/api'
// const store = useStore()
// const route = userRoute()
const selectCmpt = ref()
const unitRef = ref()
const currentUnitType = ref()

// TODO 需要在store中保存数据
const businessOps = reactive([
  {
    label: '邮件系统',
    value: '111'
  },
  {
    label: 'test系统',
    value: '123'
  }
])

const unitOps = reactive([
  {
    label: '主机',
    value: 'host'
  },
  {
    label: '交换机',
    value: 'switch'
  },
  {
    label: '防火墙',
    value: 'firewall'
  },
  {
    label: 'F5负载均衡',
    value: 'balancer'
  },
  {
    label: 'VPN',
    value: 'vpn'
  },
  {
    label: 'Tomcat',
    value: 'tomcat'
  },
  {
    label: 'Nginx',
    value: 'os'
  },
  {
    label: 'MySQL',
    value: 'db'
  }
])

// 左侧查询列表中的数据
const unitList = reactive({
  unitDta: []
})
const queryParams = reactive({
  business: businessOps[0],
  unit: unitOps[0],
  timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { minutes: 5 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')]
})
const getAllMachine = async () => {
  const machineRes: any = await api.mail.getMailMachine({ query: { category: queryParams.unit.value, page: 1, page_size: 100 } })
  unitList.unitDta = machineRes.results
}
getAllMachine()
const changeParams = async (field: 'business' | 'unit' | 'timeRange', val: any) => {
  queryParams[field] = val
  await getAllMachine()
}
const overviewData = reactive([
  {
    type: 'info',
    chartType: 'gauge',
    chartData: '',
    list: [
      {
        label: '操作系统',
        value: ''
      },
      {
        label: '系统内核',
        value: ''
      },
      {
        label: '启动天数',
        value: ''
      },
      {
        label: '健康值',
        value: '---'
      },
      {
        label: '告警数',
        value: '---'
      }
    ]
  },
  {
    type: 'memory',
    chartType: 'gauge',
    chartData: '',
    list: [
      {
        label: '内存',
        value: ''
      },
      {
        label: 'CPU',
        value: ''
      },
      {
        label: '负载',
        value: ''
      },
      {
        label: 'CPU使用率',
        value: ''
      },
      {
        label: '内存使用率',
        value: ''
      }
    ]
  },
  {
    type: 'disk',
    chartType: 'gauge',
    chartData: '',
    list: [
      {
        label: '分区使用率',
        value: ''
      },
      {
        label: 'IOutil使用率',
        value: '---'
      },
      {
        label: '磁盘读取',
        value: ''
      },
      {
        label: '磁盘写入',
        value: ''
      }
    ]
  },
  {
    type: 'socket',
    chartType: 'gauge',
    chartData: '',
    list: [
      {
        label: '连接数',
        value: ''
      },
      {
        label: 'tcp_tw',
        value: ''
      },
      {
        label: '下载带宽',
        value: ''
      },
      {
        label: '上传带宽',
        value: ''
      }
    ]
  }
])
const sequentialObj = ref<Record<string, any>>({
  source: {
    cpu: [],
    mem: [],
    disk: []
  },
  performance: {
    requests: [],
    response: [],
    load: []
  },
  net: {
    bandwidth: [],
    flow: [],
    socket: []
  }
})
const getMetric = async (val: string) => {
  sequentialObj.value = {
    source: {
      cpu: [],
      mem: [],
      disk: []
    },
    performance: {
      requests: [],
      response: [],
      load: []
    },
    net: {
      bandwidth: [],
      flow: [],
      socket: []
    }
  }
  const metricRes: any = await api.mail.getMailMetric({ query: { timestamp__gte: Number(date.formatDate(queryParams.timeRange[0], 'X')), timestamp__lte: Number(date.formatDate(queryParams.timeRange[1], 'X')), instance: val } })
  if (metricRes.results.length > 0) {
    overviewData[0].list[0].value = metricRes.results[0].sys_name
    overviewData[0].list[1].value = metricRes.results[0].release
    overviewData[0].list[2].value = metricRes.results[0].boot_days + '天'
    overviewData[1].list[0].value = (Number(metricRes.results[0].memory_total) / 1024 / 1024 / 1024).toFixed(2) + 'GB'
    overviewData[1].list[1].value = metricRes.results[0].cpu_core_count
    overviewData[1].list[2].value = metricRes.results[0].node_load1
    overviewData[1].list[3].value = Number(metricRes.results[0].cpu_rate).toFixed(2) + '%'
    overviewData[1].list[4].value = (Number(metricRes.results[0].memory_used) / Number(metricRes.results[0].memory_total) * 100).toFixed(2) + '%'
    overviewData[2].list[0].value = Number(metricRes.results[0].filesystem_used_rate).toFixed(2) + '%'
    overviewData[2].list[2].value = (Number(metricRes.results[0].disk_read) / 1024 / 1024 / 1024).toFixed(2) + 'GB/s'
    overviewData[2].list[3].value = (Number(metricRes.results[0].disk_written) / 1024 / 1024 / 1024).toFixed(2) + 'GB/s'
    overviewData[3].list[0].value = metricRes.results[0].socket_CurrEstab
    overviewData[3].list[1].value = metricRes.results[0].socket_TCP_tw
    overviewData[3].list[2].value = (Number(metricRes.results[0].network_receive) / 1024 / 1024).toFixed(2) + 'Mb/s'
    overviewData[3].list[3].value = (Number(metricRes.results[0].network_transmit) / 1024 / 1024).toFixed(2) + 'Mb/s'
    metricRes.results.forEach((item: any) => {
      sequentialObj.value.source.cpu.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '系统使用率', y1Value: Number(Number(item.cpu_system_rate).toFixed(2)) })
      sequentialObj.value.source.cpu.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '磁盘使用率', y1Value: Number(Number(item.cpu_iowait_rate).toFixed(2)) })
      sequentialObj.value.source.cpu.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '用户使用率', y1Value: Number(Number(item.cpu_user_rate).toFixed(2)) })
      sequentialObj.value.source.cpu.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '总使用率', y1Value: Number(Number(item.cpu_rate).toFixed(2)) })
      sequentialObj.value.source.mem.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '总内存', y1Value: Number((Number(item.memory_total) / 1024 / 1024 / 1024).toFixed(2)) })
      sequentialObj.value.source.mem.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '已用', y1Value: Number((Number(item.memory_used) / 1024 / 1024 / 1024).toFixed(2)) })
      sequentialObj.value.source.disk.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '总使用量', y1Value: Number((Number(item.filesystem_avail) / 1024 / 1024 / 1024).toFixed(2)) })
      sequentialObj.value.source.disk.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '总磁盘量', y1Value: Number((Number(item.filesystem_size) / 1024 / 1024 / 1024).toFixed(2)) })
      sequentialObj.value.performance.load.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '15m', y1Value: Number(item.node_load15) })
      sequentialObj.value.performance.load.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '5m', y1Value: Number(item.node_load5) })
      sequentialObj.value.performance.load.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '1m', y1Value: Number(item.node_load1) })
      sequentialObj.value.net.bandwidth.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '下载', y1Value: Number((Number(item.network_receive) / 1024 / 1024).toFixed(2)) })
      sequentialObj.value.net.bandwidth.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '上传', y1Value: Number((Number(item.network_transmit) / 1024 / 1024).toFixed(2)) })
      sequentialObj.value.net.flow.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '下载', y1Value: Number((Number(item.netflow_receive) / 1024 / 1024).toFixed(2)) })
      sequentialObj.value.net.flow.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: '上传', y1Value: Number((Number(item.netflow_transmit) / 1024 / 1024).toFixed(2)) })
      sequentialObj.value.net.socket.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: 'Tcp_RetransSegs', y1Value: Number(Number(item.socket_Tcp_RetransSegs).toFixed(2)) })
      sequentialObj.value.net.socket.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: 'Tcp_OutSegs', y1Value: Number(Number(item.socket_Tcp_OutSegs).toFixed(2)) })
      sequentialObj.value.net.socket.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: 'Tcp_InSegs', y1Value: Number(Number(item.socket_Tcp_InSegs).toFixed(2)) })
      sequentialObj.value.net.socket.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: 'TCP_alloc', y1Value: Number(Number(item.socket_TCP_alloc).toFixed(2)) })
      sequentialObj.value.net.socket.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: 'UDP_inuse', y1Value: Number(Number(item.socket_UDP_inuse).toFixed(2)) })
      sequentialObj.value.net.socket.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: 'Sockets_used', y1Value: Number(Number(item.socket_Sockets_used).toFixed(2)) })
      sequentialObj.value.net.socket.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: 'TCP_tw', y1Value: Number(Number(item.socket_TCP_tw).toFixed(2)) })
      sequentialObj.value.net.socket.unshift({ xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'), type: 'CurrEstab', y1Value: Number(Number(item.socket_CurrEstab).toFixed(2)) })
    })
  }
}

watch(() => queryParams.unit.value, (val) => {
  currentUnitType.value = val
  switch (val) {
    case 'host':
      break
    case 'switch':
      break
    case 'firewall':
      break
    case 'balancer':
      break
    case 'vpn':
      break
    case 'tomcat':
      break
    case 'os':
      break
    case 'db':
      break
    default:
      break
  }
})
</script>

<template>
  <div class="MonitorUnit">
    <div class="bg-white text-aiops-sub-font">
      <select-cmpt
        ref="selectCmpt"
        :queryParams="queryParams"
        :businessOps="businessOps"
        :unitOps="unitOps"
        @changeParams="changeParams"
        >
      </select-cmpt>
    </div>

    <!-- 各种监控单元的数据展示 -->
    <unit-info
      class="unit-info"
      ref="currentCmtRef"
      :currentUnitType="currentUnitType"
      :unitData="overviewData"
      :chartData="sequentialObj"
      :unitList="unitList.unitDta"
      :queryParams="queryParams"
      @getMetric="getMetric"
      >
    </unit-info>
  </div>
</template>

<style lang="scss" scoped>
.MonitorUnit {
  padding: 10px;
  height: 100%;

  .unit-info {
    height: calc(100% - 65px);
  }
}
</style>
