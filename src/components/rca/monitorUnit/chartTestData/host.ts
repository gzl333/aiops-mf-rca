// cpu使用率
const cpuUsageData = [
  { xValue: '10:17', type: '总使用率', y1Value: 86.22 },
  { xValue: '10:17', type: '用户使用率', y1Value: 41.14 },
  { xValue: '10:17', type: '磁盘使用率', y1Value: 34.09 },
  { xValue: '10:17', type: '系统使用率', y1Value: 0.00 },
  { xValue: '10:19', type: '总使用率', y1Value: 86.22 },
  { xValue: '10:19', type: '用户使用率', y1Value: 43.14 },
  { xValue: '10:19', type: '磁盘使用率', y1Value: 0.09 },
  { xValue: '10:19', type: '系统使用率', y1Value: 0.00 },
  { xValue: '10:21', type: '总使用率', y1Value: 86.23 },
  { xValue: '10:21', type: '用户使用率', y1Value: 54.14 },
  { xValue: '10:21', type: '磁盘使用率', y1Value: 0.09 },
  { xValue: '10:21', type: '系统使用率', y1Value: 0.00 },
  { xValue: '10:23', type: '总使用率', y1Value: 74.36 },
  { xValue: '10:23', type: '用户使用率', y1Value: 50.26 },
  { xValue: '10:23', type: '磁盘使用率', y1Value: 0.21 },
  { xValue: '10:23', type: '系统使用率', y1Value: 0.00 },
  { xValue: '10:25', type: '总使用率', y1Value: 75.30 },
  { xValue: '10:25', type: '用户使用率', y1Value: 36.13 },
  { xValue: '10:25', type: '磁盘使用率', y1Value: 0.10 },
  { xValue: '10:25', type: '系统使用率', y1Value: 0.00 },
  { xValue: '10:27', type: '总使用率', y1Value: 68.39 },
  { xValue: '10:27', type: '用户使用率', y1Value: 45.23 },
  { xValue: '10:27', type: '磁盘使用率', y1Value: 0.16 },
  { xValue: '10:27', type: '系统使用率', y1Value: 0.00 }
]

// 内存信息
const memoryInfoData = [
  { xValue: '10:17', type: '已用', y1Value: 952 },
  { xValue: '10:17', type: '总内存', y1Value: 1007.53 },
  { xValue: '10:19', type: '已用', y1Value: 956 },
  { xValue: '10:19', type: '总内存', y1Value: 1007.53 },
  { xValue: '10:21', type: '已用', y1Value: 998 },
  { xValue: '10:21', type: '总内存', y1Value: 1007.53 },
  { xValue: '10:23', type: '已用', y1Value: 997 },
  { xValue: '10:23', type: '总内存', y1Value: 1007.53 },
  { xValue: '10:25', type: '已用', y1Value: 1005 },
  { xValue: '10:25', type: '总内存', y1Value: 1007.53 },
  { xValue: '10:27', type: '已用', y1Value: 990 },
  { xValue: '10:27', type: '总内存', y1Value: 1007.53 }
]

// 磁盘信息
const diskData = [
  { xValue: '10:17', type: '总磁盘量', y1Value: 15.6 },
  { xValue: '10:17', type: '总使用量', y1Value: 1.39 },
  { xValue: '10:19', type: '总磁盘量', y1Value: 15.6 },
  { xValue: '10:19', type: '总使用量', y1Value: 1.00 },
  { xValue: '10:21', type: '总磁盘量', y1Value: 15.6 },
  { xValue: '10:21', type: '总使用量', y1Value: 1.23 },
  { xValue: '10:23', type: '总磁盘量', y1Value: 15.6 },
  { xValue: '10:23', type: '总使用量', y1Value: 1.29 },
  { xValue: '10:25', type: '总磁盘量', y1Value: 15.6 },
  { xValue: '10:25', type: '总使用量', y1Value: 1.29 },
  { xValue: '10:27', type: '总磁盘量', y1Value: 15.6 },
  { xValue: '10:27', type: '总使用量', y1Value: 1.49 }
]

// 请求数
const requestsData = [
  {
    xValue: '10:17',
    y1Value: 23,
    type: '请求数'
  },
  {
    xValue: '10:19',
    y1Value: 35,
    type: '请求数'
  },
  {
    xValue: '10:21',
    y1Value: 68,
    type: '请求数'
  },
  {
    xValue: '10:23',
    y1Value: 70,
    type: '请求数'
  },
  {
    xValue: '10:25',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:27',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:29',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:31',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:33',
    y1Value: 90,
    type: '请求数'
  },
  {
    xValue: '10:35',
    y1Value: 90,
    type: '请求数'
  }
]

// 平均响应时间
const responseTimeData = [
  { xValue: '10:17', type: '平均响应时间', y1Value: 580 },
  { xValue: '10:19', type: '平均响应时间', y1Value: 400 },
  { xValue: '10:21', type: '平均响应时间', y1Value: 340 },
  { xValue: '10:23', type: '平均响应时间', y1Value: 650 },
  { xValue: '10:25', type: '平均响应时间', y1Value: 320 },
  { xValue: '10:27', type: '平均响应时间', y1Value: 500 }
]

// 系统平均负载
const sysLoadData = [
  { xValue: '10:17', type: '1m', y1Value: 1.02 },
  { xValue: '10:17', type: '5m', y1Value: 1.09 },
  { xValue: '10:17', type: '15m', y1Value: 1.39 },
  { xValue: '10:19', type: '1m', y1Value: 1.00 },
  { xValue: '10:19', type: '5m', y1Value: 1.09 },
  { xValue: '10:19', type: '15m', y1Value: 1.00 },
  { xValue: '10:21', type: '1m', y1Value: 2.3 },
  { xValue: '10:21', type: '5m', y1Value: 1.53 },
  { xValue: '10:21', type: '15m', y1Value: 1.23 },
  { xValue: '10:23', type: '1m', y1Value: 1.34 },
  { xValue: '10:23', type: '5m', y1Value: 1.56 },
  { xValue: '10:23', type: '15m', y1Value: 1.29 },
  { xValue: '10:25', type: '1m', y1Value: 1.45 },
  { xValue: '10:25', type: '5m', y1Value: 1.63 },
  { xValue: '10:25', type: '15m', y1Value: 1.29 },
  { xValue: '10:27', type: '1m', y1Value: 1.34 },
  { xValue: '10:27', type: '5m', y1Value: 1.74 },
  { xValue: '10:27', type: '15m', y1Value: 1.49 }
]

// 每分钟网络带宽使用
const bandwidthData = [
  { xValue: '10:17', type: '上传', y1Value: -203 },
  { xValue: '10:17', type: '下载', y1Value: 329 },
  { xValue: '10:19', type: '上传', y1Value: -243 },
  { xValue: '10:19', type: '下载', y1Value: 316 },
  { xValue: '10:21', type: '上传', y1Value: -223 },
  { xValue: '10:21', type: '下载', y1Value: 336 },
  { xValue: '10:23', type: '上传', y1Value: -223 },
  { xValue: '10:23', type: '下载', y1Value: 346 },
  { xValue: '10:25', type: '上传', y1Value: -357 },
  { xValue: '10:25', type: '下载', y1Value: 328 },
  { xValue: '10:27', type: '上传', y1Value: -239 },
  { xValue: '10:27', type: '下载', y1Value: 316 }
]

// 每分钟流量
const trafficData = [
  { xValue: '10:17', type: '上传', y1Value: -203 },
  { xValue: '10:17', type: '下载', y1Value: 329 },
  { xValue: '10:19', type: '上传', y1Value: -243 },
  { xValue: '10:19', type: '下载', y1Value: 316 },
  { xValue: '10:21', type: '上传', y1Value: -223 },
  { xValue: '10:21', type: '下载', y1Value: 336 },
  { xValue: '10:23', type: '上传', y1Value: -223 },
  { xValue: '10:23', type: '下载', y1Value: 346 },
  { xValue: '10:25', type: '上传', y1Value: -357 },
  { xValue: '10:25', type: '下载', y1Value: 328 },
  { xValue: '10:27', type: '上传', y1Value: -239 },
  { xValue: '10:27', type: '下载', y1Value: 316 }
]

// 网络socket连接信息
const socketData = [
  { xValue: '10:17', type: 'CurrEstab', y1Value: 13.0 },
  { xValue: '10:17', type: 'TCP_tw', y1Value: 10.2 },
  { xValue: '10:17', type: 'Sockets_used', y1Value: 1.02 },
  { xValue: '10:17', type: 'UDP_inuse', y1Value: 16.0 },

  { xValue: '10:17', type: 'TCP_alloc', y1Value: 30 },
  { xValue: '10:17', type: 'Tcp_InSegs', y1Value: 185 },
  { xValue: '10:17', type: 'Tcp_OutSegs', y1Value: 127 },
  { xValue: '10:17', type: 'Tcp_RetransSegs', y1Value: 0.05 },

  { xValue: '10:19', type: 'CurrEstab', y1Value: 13.0 },
  { xValue: '10:19', type: 'TCP_tw', y1Value: 10.2 },
  { xValue: '10:19', type: 'Sockets_used', y1Value: 1.09 },
  { xValue: '10:19', type: 'UDP_inuse', y1Value: 16.0 },
  { xValue: '10:19', type: 'TCP_alloc', y1Value: 30.22 },
  { xValue: '10:19', type: 'Tcp_InSegs', y1Value: 185 },
  { xValue: '10:19', type: 'Tcp_OutSegs', y1Value: 127.09 },
  { xValue: '10:19', type: 'Tcp_RetransSegs', y1Value: 0.05 },

  { xValue: '10:21', type: 'CurrEstab', y1Value: 13.0 },
  { xValue: '10:21', type: 'TCP_tw', y1Value: 10.2 },
  { xValue: '10:21', type: 'Sockets_used', y1Value: 1.09 },
  { xValue: '10:21', type: 'UDP_inuse', y1Value: 16.0 },
  { xValue: '10:21', type: 'TCP_alloc', y1Value: 30.22 },
  { xValue: '10:21', type: 'Tcp_InSegs', y1Value: 185 },
  { xValue: '10:21', type: 'Tcp_OutSegs', y1Value: 127.09 },
  { xValue: '10:21', type: 'Tcp_RetransSegs', y1Value: 0.05 },

  { xValue: '10:23', type: 'CurrEstab', y1Value: 13.0 },
  { xValue: '10:23', type: 'TCP_tw', y1Value: 10.2 },
  { xValue: '10:23', type: 'Sockets_used', y1Value: 1.09 },
  { xValue: '10:23', type: 'UDP_inuse', y1Value: 16.0 },
  { xValue: '10:23', type: 'TCP_alloc', y1Value: 30.22 },
  { xValue: '10:23', type: 'Tcp_InSegs', y1Value: 185 },
  { xValue: '10:23', type: 'Tcp_OutSegs', y1Value: 127.09 },
  { xValue: '10:23', type: 'Tcp_RetransSegs', y1Value: 0.05 },

  { xValue: '10:25', type: 'CurrEstab', y1Value: 13.0 },
  { xValue: '10:25', type: 'TCP_tw', y1Value: 10.2 },
  { xValue: '10:25', type: 'Sockets_used', y1Value: 1.09 },
  { xValue: '10:25', type: 'UDP_inuse', y1Value: 16.0 },
  { xValue: '10:25', type: 'TCP_alloc', y1Value: 30.22 },
  { xValue: '10:25', type: 'Tcp_InSegs', y1Value: 185 },
  { xValue: '10:25', type: 'Tcp_OutSegs', y1Value: 127.09 },
  { xValue: '10:25', type: 'Tcp_RetransSegs', y1Value: 0.05 },

  { xValue: '10:27', type: 'CurrEstab', y1Value: 13.0 },
  { xValue: '10:27', type: 'TCP_tw', y1Value: 10.2 },
  { xValue: '10:27', type: 'Sockets_used', y1Value: 1.09 },
  { xValue: '10:27', type: 'UDP_inuse', y1Value: 16.0 },
  { xValue: '10:27', type: 'TCP_alloc', y1Value: 30.22 },
  { xValue: '10:27', type: 'Tcp_InSegs', y1Value: 185 },
  { xValue: '10:27', type: 'Tcp_OutSegs', y1Value: 127.09 },
  { xValue: '10:27', type: 'Tcp_RetransSegs', y1Value: 0.05 }
]

export {
  cpuUsageData,
  memoryInfoData,
  diskData,
  requestsData,
  responseTimeData,
  sysLoadData,
  bandwidthData,
  trafficData,
  socketData
}
