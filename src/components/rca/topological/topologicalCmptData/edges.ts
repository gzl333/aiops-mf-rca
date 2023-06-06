const edges = [
  {
    source: 'node1', // String，必须，起始点 id
    target: 'node2', // String，必须，目标点 id
    state: 'normal' // string, 必须，值  normal / error
  },
  // {
  //   source: 'node2', // 防火墙 （连接交换机）
  //   target: 'node3', // 交换机
  //   state: 'error'
  // },
  {
    source: 'node98', // 交换机7
    target: 'node97', // 交换机6
    state: 'normal'
  },
  {
    source: 'node2',
    target: 'node98',
    state: 'normal'
  },
  {
    source: 'node2',
    target: 'node99',
    state: 'normal'
  },
  {
    source: 'node2',
    target: 'node100',
    state: 'normal'
  },
  {
    source: 'node98', // 交换机7
    target: 'node101', // 交换机10
    state: 'normal'
  },
  {
    source: 'node8', // 交换机2
    target: 'node104', // 存储交换机
    state: 'normal'
  },
  {
    source: 'node8',
    target: 'node105',
    state: 'normal'
  },
  {
    source: 'node8',
    target: 'node106',
    state: 'normal'
  },
  {
    source: 'node8',
    target: 'node107',
    state: 'normal'
  },
  {
    source: 'node101', // 交换机10
    target: 'node108', // 14段管理交换机
    state: 'normal'
  },
  {
    source: 'node97', // 交换机6
    target: 'node69', // search主机1
    state: 'normal'
  },
  {
    source: 'node97', // 交换机6
    target: 'node70', // search主机2
    state: 'normal'
  },
  {
    source: 'node102', // 交换机11
    target: 'node17', // vpn1
    state: 'normal'
  },
  {
    source: 'node2', // 防火墙
    target: 'node4', // 负载均衡器
    state: 'normal'
  },
  {
    source: 'node2', // 防火墙
    target: 'node5', // 负载均衡器
    state: 'normal'
  },
  {
    source: 'node4', // F5负载均衡器 连1，2，11，12
    target: 'node7', // 交换机1
    state: 'normal'
  },
  {
    source: 'node4',
    target: 'node8',
    state: 'normal'
  },
  {
    source: 'node4',
    target: 'node102',
    state: 'normal'
  },
  {
    source: 'node4',
    target: 'node103',
    state: 'normal'
  },
  // 交换机1，2 连3,4
  {
    source: 'node7',
    target: 'node10',
    state: 'normal'
  },
  {
    source: 'node7',
    target: 'node11',
    state: 'normal'
  },
  // {
  //   source: 'node7', // 交换机（连大量主机）
  //   target: 'node71',
  //   state: 'normal'
  // },
  // {
  //   source: 'node7',
  //   target: 'node72',
  //   state: 'normal'
  // },
  // {
  //   source: 'node7',
  //   target: 'node73',
  //   state: 'normal'
  // },
  // {
  //   source: 'node7',
  //   target: 'node74',
  //   state: 'normal'
  // },
  // {
  //   source: 'node7',
  //   target: 'node75',
  //   state: 'normal'
  // },
  {
    source: 'node7',
    target: 'node76',
    state: 'normal'
  },
  {
    source: 'node7',
    target: 'node200',
    state: 'normal'
  },
  {
    source: 'node7',
    target: 'node300',
    state: 'normal'
  },
  {
    source: 'node7',
    target: 'node400',
    state: 'normal'
  },
  {
    source: 'node7',
    target: 'node500',
    state: 'normal'
  },
  /// ///////////////////////////////////////
  // {
  //   source: 'node2',
  //   target: 'node16',
  //   state: 'normal'
  // },
  // {
  //   source: 'node16',
  //   target: 'node17',
  //   state: 'normal'
  // },
  // {
  //   source: 'node7',
  //   target: 'node18',
  //   state: 'normal'
  // },
  {
    source: 'node7',
    target: 'node96',
    state: 'normal'
  },
  {
    source: 'node96',
    target: 'node20',
    state: 'normal'
  },
  {
    source: 'node104', // 存储交换机
    target: 'node21', // san存储
    state: 'normal'
  },
  {
    source: 'node105', // 存储交换机
    target: 'node21', // san存储
    state: 'normal'
  },
  {
    source: 'node106', // 存储交换机
    target: 'node21', // san存储
    state: 'normal'
  },
  {
    source: 'node107', // 存储交换机
    target: 'node21', // san存储
    state: 'normal'
  },
  // {
  //   source: 'node12',
  //   target: 'node13',
  //   state: 'normal'
  // },
  // {
  //   source: 'node12',
  //   target: 'node14',
  //   state: 'normal'
  // },
  // ------------- 主机子节点 -----------
  {
    source: 'node76',
    target: 'node77',
    state: 'normal'
  },
  {
    source: 'node76',
    target: 'node78',
    state: 'normal'
  },
  {
    source: 'node77',
    target: 'node79',
    state: 'normal'
  }
  // {
  //   source: 'node39', // ---- tomcat ----
  //   target: 'node86',
  //   state: 'normal'
  // },
  // {
  //   source: 'node12',
  //   target: 'node85',
  //   state: 'normal'
  // },
  // {
  //   source: 'node24',
  //   target: 'node84',
  //   state: 'normal'
  // },
  // {
  //   source: 'node29',
  //   target: 'node83',
  //   state: 'normal'
  // },
  // {
  //   source: 'node27',
  //   target: 'node82',
  //   state: 'normal'
  // },
  // {
  //   source: 'node26',
  //   target: 'node81',
  //   state: 'normal'
  // },
  // {
  //   source: 'node22',
  //   target: 'node80',
  //   state: 'normal'
  // },
  // {
  //   source: 'node39', // ---- nginx ----
  //   target: 'node93',
  //   state: 'normal'
  // },
  // {
  //   source: 'node12',
  //   target: 'node92',
  //   state: 'normal'
  // },
  // {
  //   source: 'node24',
  //   target: 'node91',
  //   state: 'normal'
  // },
  // {
  //   source: 'node29',
  //   target: 'node90',
  //   state: 'normal'
  // },
  // {
  //   source: 'node27',
  //   target: 'node89',
  //   state: 'normal'
  // },
  // {
  //   source: 'node26',
  //   target: 'node88',
  //   state: 'normal'
  // },
  // {
  //   source: 'node22',
  //   target: 'node87',
  //   state: 'normal'
  // }
]
export default edges
