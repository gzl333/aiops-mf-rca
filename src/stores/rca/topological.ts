// 根因定位-拓扑图
import { defineStore } from 'pinia'
import { date } from 'quasar'
import api from 'src/api'
interface LabelVal {
  label: string
  value: string
}

interface CommonData {
  xValue: string
  y1Value: number
  type: string
}
interface Warning {
  [propName: string]: number | string
}

interface ChartData {
  source: {
    cpu: CommonData[]
    memory: CommonData[]
    disk: CommonData[]
    f5Memory: CommonData[]
  },
  net: {
    bandwidth: CommonData[],
    flow: CommonData[],
    socket: CommonData[]
  },
  performance: {
    load: CommonData[],
    throughputTotal: CommonData[],
    throughput: CommonData[]
    conns: CommonData[]
    sslConns: CommonData[]
    pvaConns: CommonData[]
    tcpConns: CommonData[]
  },
  warning: Warning
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
            disk: [],
            f5Memory: []
          },
          net: {
            bandwidth: [],
            flow: [],
            socket: []
          },
          performance: {
            load: [],
            throughputTotal: [],
            throughput: [],
            conns: [],
            sslConns: [],
            pvaConns: [],
            tcpConns: []
          },
          // 预警线
          warning: {}
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
            disk: [],
            f5Memory: []
          },
          net: {
            bandwidth: [],
            flow: [],
            socket: []
          },
          performance: {
            load: [],
            throughputTotal: [],
            throughput: [],
            conns: [],
            sslConns: [],
            pvaConns: [],
            tcpConns: []
          },
          warning: {}
        }

        results.forEach((item: any) => {
          if (this.nodeInfo.type.includes('host')) {
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
          }
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

          data.source.f5Memory.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '主机内存使用',
            y1Value: Number((Number(item.f5_memory_used_host) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.source.f5Memory.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: 'TMM 内存使用',
            y1Value: Number((Number(item.f5_memory_used_ttm) / 1024 / 1024 / 1024).toFixed(2))
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

          data.performance.throughputTotal.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '服务器流量',
            y1Value: Number(Number((+item.f5_sysStatServerBytesIn + (+item.f5_sysStatServerBytesOut)) / 1024 / 1024 / 1024).toFixed(2))
          })

          data.performance.throughputTotal.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '客户端流量',
            y1Value: Number(Number((+item.f5_sysStatClientBytesIn + (+item.f5_sysStatClientBytesOut)) / 1024 / 1024 / 1024).toFixed(2))
          })

          data.performance.throughput.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '服务器入站流量',
            y1Value: Number((Number(item.f5_sysStatServerBytesIn) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.performance.throughput.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '服务器出站流量',
            y1Value: Number((Number(item.f5_sysStatServerBytesOut) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.performance.throughput.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '客户端入站流量',
            y1Value: Number((Number(item.f5_sysStatClientBytesIn) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.performance.throughput.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '客户端出站流量',
            y1Value: Number((Number(item.f5_sysStatClientBytesOut) / 1024 / 1024 / 1024).toFixed(2))
          })
          data.performance.conns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '所有客户端连接总数',
            y1Value: Number(item.f5_sysStatClientTotConns)
          })
          data.performance.conns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '所有服务器连接总数',
            y1Value: Number(item.f5_sysStatServerTotConns)
          })
          data.performance.conns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '当前所有客户端连接总数',
            y1Value: Number(item.f5_sysStatClientCurConns)
          })
          data.performance.conns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '当前所有服务器连接总数',
            y1Value: Number(item.f5_sysStatServerCurConns)
          })
          data.performance.sslConns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '客户端会话总数(本机模式)',
            y1Value: Number(item.f5_sysClientsslStatTotNativeConns)
          })
          data.performance.sslConns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '客户端会话总数(兼容和本机模式)',
            y1Value: Number(item.f5_sysClientsslStatTotCompatConns)
          })
          data.performance.sslConns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '当前所有客户端SSL会话连接数',
            y1Value: Number(item.f5_sysClientsslStatCurConns)
          })
          data.performance.sslConns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '当前所有服务器SSL会话的连接数',
            y1Value: Number(item.f5_sysServersslStatCurConns)
          })

          data.performance.pvaConns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '所有PVA客户端连接的总数',
            y1Value: Number(item.f5_sysStatPvaClientTotConns)
          })
          data.performance.pvaConns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '所有PVA服务器连接的总数',
            y1Value: Number(item.f5_sysStatPvaServerTotConns)
          })
          data.performance.tcpConns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '接收TCP连接数',
            y1Value: Number(item.f5_sysTcpStatAccepts)
          })
          data.performance.tcpConns.unshift({
            xValue: date.formatDate(item.timestamp * 1000, 'HH:mm'),
            type: '成功连接数',
            y1Value: Number(item.f5_sysTcpStatConnects)
          })
        })

        // 当自定义查询时返回数据，当查询参数为store中存储的数据时（不传params），将数据赋值给nodeInfo.data
        if (params?.timestampGte || params?.timestampLte || params?.ip) {
          return data
        } else {
          this.nodeInfo.chartData = data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @desc: 查询实例指标预警线
     * @param {object} params
     * @return {*}
     */
    async getMetricWarning (params?: { ip?: string }) {
      try {
        const { results } = await api.mail.getMailMetricWarning(
          {
            query: {
              instance: params?.ip || this.nodeInfo.ip
            }
          }
        )
        console.log('results warning: ', results)
        // 设置state中的预警线值
        if (results.length) {
          for (const key in results[0]) {
            this.nodeInfo.chartData.warning[key] = results[0][key]
          }
        } else {
          this.nodeInfo.chartData.warning = {}
        }
        // TODO 测试用数据，1.xxx段无数据，待删
        this.nodeInfo.chartData.warning =
         {
           instance: this.nodeInfo.ip,
           cpu_rate: 50.0,
           memory_used: 50.0,
           disk_used: 50.0
         }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
