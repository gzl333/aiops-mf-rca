// 根因定位-拓扑图
import { defineStore } from 'pinia'
import { date, Notify } from 'quasar'
import api from 'src/api'
interface LabelVal {
  label: string
  value: string
}

interface CPUData {
  xValue: string
  y1Value: number
  type: string
}

interface MemoryData {
  xValue: string
  y1Value: number
  type: string
}

interface DiskData {
  xValue: string
  y1Value: number
  type: string
}
interface BandwidthData {
  xValue: string
  y1Value: number
  type: string
}

interface FlowData {
  xValue: string
  y1Value: number
  type: string
}

interface SocketData {
  xValue: string
  y1Value: number
  type: string
}

interface LoadData {
  xValue: string
  y1Value: number
  type: string
}

interface ChartData {
  source: {
    cpu: CPUData[]
    memory: MemoryData[]
    disk: DiskData[]
  },
  net: {
    bandwidth: BandwidthData[],
    flow: FlowData[],
    socket: SocketData[]
  },
  performance: {
    load: LoadData[]
  }
}

interface State {
  currentBusiness: LabelVal
  businessOps: LabelVal[]
  startTime: string
  endTime: string
  nodeInfo: {
    ip: string
    label: string
    type: string
    typeName: string
    chartData: ChartData
  }
}

export const useStore = defineStore('topoStore', {
  state: (): State => {
    return {
      // 当前业务系统
      currentBusiness: {
        label: '邮件系统',
        value: '111'
      },
      // 全部业务系统
      businessOps: [
        {
          label: '邮件系统',
          value: '111'
        },
        {
          label: 'test系统',
          value: '123'
        }
      ],
      // 当前页选中开始时间（展示格式）
      startTime: date.formatDate(date.subtractFromDate(Date.now(), { minutes: 5 }), 'YYYY-MM-DD HH:mm'),
      // 当前页选中结束时间（展示格式）
      endTime: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
      // 当前选中节点（监控单元）信息
      nodeInfo: {
        // 节点ip/id
        ip: '',
        // 节点名称
        label: '',
        // 监控单元类型: apphosts(APP类主机) udmshosts(UDMS类主机) udhosts(UD类主机) otherhosts(其他主机) switch firewall balancer vpn tomcat os db
        type: '',
        // 监控单元名称: xx主机 交换机 防火墙 F5负载均衡器 VPN Tomcat Nginx MySQL
        typeName: '',
        // 接口数据
        chartData: {
          source: {
            cpu: [],
            memory: [],
            disk: []
          },
          net: {
            bandwidth: [],
            flow: [],
            socket: []
          },
          performance: {
            load: []
          }
        }
      }
    }
  },
  getters: {
    // 大于等于时间戳（开始时间戳）
    timestampGte: (state) => Number(date.formatDate(state.startTime, 'X')),
    // 小于等于时间戳（结束时间戳）
    timestampLte: (state) => Number(date.formatDate(state.endTime, 'X'))
  },
  actions: {
    /**
     * @desc: 查询实例指标
     * @param {object} params
     * @return {*}
     */
    async getMetric (params?: {timestampGte?: number, timestampLte?: number, ip?: string }) {
      try {
        const { results } = await api.mail.getMailMetric(
          {
            query: {
              timestamp__gte: params?.timestampGte || this.timestampGte,
              timestamp__lte: params?.timestampLte || this.timestampLte,
              instance: params?.ip || this.nodeInfo.ip
            }
          })
        console.log(this.nodeInfo.ip, 'getmetric====>', results)
        const data: ChartData = {
          source: {
            cpu: [],
            memory: [],
            disk: []
          },
          net: {
            bandwidth: [],
            flow: [],
            socket: []
          },
          performance: {
            load: []
          }
        }

        results.forEach((item: any) => {
          data.source.cpu.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '系统使用率',
            y1Value: Number(Number(item.cpu_system_rate).toFixed(2))
          })
          data.source.cpu.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '磁盘使用率',
            y1Value: Number(Number(item.cpu_iowait_rate).toFixed(2))
          })
          data.source.cpu.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '用户使用率',
            y1Value: Number(Number(item.cpu_user_rate).toFixed(2))
          })
          data.source.cpu.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '总使用率',
            y1Value: Number(Number(item.cpu_rate).toFixed(2))
          })
          data.source.memory.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '总内存',
            y1Value: Number((Number(item.memory_total) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.source.memory.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '已用',
            y1Value: Number((Number(item.memory_used) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.source.disk.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '总使用量',
            y1Value: Number((Number(item.filesystem_avail) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.source.disk.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '总磁盘量',
            y1Value: Number((Number(item.filesystem_size) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.net.bandwidth.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '下载',
            y1Value: Number((Number(item.network_receive) / 1024 / 1024).toFixed(2))
          })
          data.net.bandwidth.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '上传',
            y1Value: -Number((Number(item.network_transmit) / 1024 / 1024).toFixed(2))
          })
          data.net.flow.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '下载',
            y1Value: Number((Number(item.netflow_receive) / 1024 / 1024).toFixed(2))
          })
          data.net.flow.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '上传',
            y1Value: -Number((Number(item.netflow_transmit) / 1024 / 1024).toFixed(2))
          })
          data.net.socket.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'Tcp_RetransSegs',
            y1Value: Number(Number(item.socket_Tcp_RetransSegs).toFixed(2))
          })
          data.net.socket.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'Tcp_OutSegs',
            y1Value: Number(Number(item.socket_Tcp_OutSegs).toFixed(2))
          })
          data.net.socket.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'Tcp_InSegs',
            y1Value: Number(Number(item.socket_Tcp_InSegs).toFixed(2))
          })
          data.net.socket.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'TCP_alloc',
            y1Value: Number(Number(item.socket_TCP_alloc).toFixed(2))
          })
          data.net.socket.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'UDP_inuse',
            y1Value: Number(Number(item.socket_UDP_inuse).toFixed(2))
          })
          data.net.socket.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'Sockets_used',
            y1Value: Number(Number(item.socket_Sockets_used).toFixed(2))
          })
          data.net.socket.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'TCP_tw',
            y1Value: Number(Number(item.socket_TCP_tw).toFixed(2))
          })
          data.net.socket.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'CurrEstab',
            y1Value: Number(Number(item.socket_CurrEstab).toFixed(2))
          })

          data.performance.load.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '1m',
            y1Value: Number(Number(item.node_load1).toFixed(2))
          })
          data.performance.load.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '5m',
            y1Value: Number(Number(item.node_load5).toFixed(2))
          })
          data.performance.load.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '15m',
            y1Value: Number(Number(item.node_load15).toFixed(2))
          })
        })

        // 当自定义查询时返回数据，当查询参数为store中存储的数据时（不传params），将数据赋值给nodeInfo.data
        if (params?.timestampGte || params?.timestampLte || params?.ip) {
          return data
        } else {
          this.nodeInfo.chartData = data
        }
      } catch (error:any) {
        console.log(error)
        Notify.create({
          message: error
        })
      }
    }
  }
})
