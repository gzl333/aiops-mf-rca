const nodes = [
  {
    id: 'node1', // String，该节点存在则必须，节点的唯一标识
    deviceType: 'client',
    netElID: '00001', // 网元id 用于区分不同设备
    label: '客户端',
    ip: '',
    state: 'normal', //  节点状态：normal绿   childs（蓝色） warning（黄色） error（红色）
    comboId: '' // 集合id
  },
  // ---------- 防火墙 -----------
  {
    id: 'node2',
    deviceType: 'firewall',
    netElID: '00002',
    label: '防火墙',
    ip: {
      monitor: '192.168.21.1',
      log1: '159.226.14.2',
      log2: '159.226.14.3'
    },
    state: 'normal'
  },
  // ---------- 交换机 -----------
  {
    id: 'node96',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-5存储',
    ip: '159.226.14.71',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node97',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-6',
    ip: '192.168.14.13',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node98',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-7',
    ip: '159.226.14.79',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node99',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-8',
    ip: '159.226.14.79',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node100',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-9',
    ip: '159.226.14.80',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node101',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-10',
    ip: '159.226.14.81',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node102',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-11',
    ip: '192.168.14.14',
    state: 'normal',
    comboId: 'switch4'
  },
  {
    id: 'node103',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-12',
    ip: '192.168.14.14',
    state: 'normal',
    comboId: 'switch4'
  },
  {
    id: 'node104',
    deviceType: 'switch',
    netElID: '00004',
    label: '存储交换机-2',
    ip: '192.168.13.2',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node105',
    deviceType: 'switch',
    netElID: '00004',
    label: '存储交换机-3',
    ip: '192.168.13.3',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node106',
    deviceType: 'switch',
    netElID: '00004',
    label: '存储交换机-4',
    ip: '192.168.13.4',
    state: 'normal',
    comboId: ''
  },
  {
    id: 'node107',
    deviceType: 'switch',
    netElID: '00004',
    label: '存储交换机-5',
    ip: '192.168.13.5',
    state: 'warning',
    comboId: ''
  },
  {
    id: 'node108',
    deviceType: 'switch',
    netElID: '00004',
    label: '14段管理交换机',
    ip: '159.226.14.41',
    state: 'normal',
    comboId: ''
  },
  // ------------ F5负载均衡器 ------------
  {
    id: 'node4',
    deviceType: 'balancer', // Load balancer
    netElID: '00005',
    label: 'F5-主',
    ip: '159.226.14.74',
    state: 'normal',
    comboId: 'balancer1'
  },
  {
    id: 'node5',
    deviceType: 'balancer', // Load balancer
    netElID: '00006',
    label: 'F5-备',
    ip: '159.226.14.74',
    state: 'normal',
    comboId: 'balancer1'
  },
  {
    id: 'node7',
    deviceType: 'switch',
    netElID: '00003',
    label: '邮件交换机-1',
    ip: '159.226.14.72',
    state: 'error',
    comboId: 'switch1'
  },
  {
    id: 'node8',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-2',
    ip: '159.226.14.72',
    state: 'normal',
    comboId: 'switch1'
  },
  // {
  //   id: 'node9',
  //   deviceType: 'switch',
  //   netElID: '00004',
  //   label: '邮件交换机-5 存储网络交换机',
  //   ip: '',
  //   state: 'normal'
  // },
  {
    id: 'node10',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-3',
    ip: '159.226.14.73',
    state: 'normal',
    comboId: 'switch3'
  },
  {
    id: 'node11',
    deviceType: 'switch',
    netElID: '00004',
    label: '邮件交换机-4',
    ip: '159.226.14.73',
    state: 'warning',
    comboId: 'switch3'
  },
  {
    id: 'node17',
    deviceType: 'vpn',
    netElID: '00004',
    label: 'VPN1',
    ip: '159.226.14.82',
    state: 'normal'
  },
  {
    id: 'node20',
    deviceType: 'nas', // TODO 修改类型
    netElID: '00004',
    label: 'NAS网关1管理',
    ip: '',
    state: 'normal'
  },
  {
    id: 'node21',
    deviceType: 'san', // TODO 修改类型
    netElID: '00004',
    label: 'SAN存储',
    ip: '',
    state: 'normal'
  },
  {
    id: 'node69', // search 2个主机 他们与其它主机不连同一个交换机上
    deviceType: 'host',
    netElID: '00004',
    label: 'searchsvr-01',
    ip: '192.168.0.188',
    state: 'normal'
  },
  {
    id: 'node70',
    deviceType: 'host',
    netElID: '00004',
    label: 'searchsvr-02',
    ip: '192.168.0.189',
    state: 'warning'
  },
  {
    id: 'node76', // ------------- mysql主机 -------------
    deviceType: 'host',
    netElID: '00004',
    label: 'MySQLMaster Host',
    ip: '192.168.0.186',
    state: 'normal',
    comboId: 'MySQLhost1'
  },
  {
    id: 'node77',
    deviceType: 'host',
    netElID: '00004',
    label: 'MySQLSalve Host',
    ip: '192.168.0.187',
    state: 'normal',
    comboId: 'MySQLhost1'
  },
  // ---------------- MySQL -------------------
  {
    id: 'node78',
    deviceType: 'db',
    netElID: '00004',
    label: 'MySQLMaster',
    ip: '192.168.0.186',
    state: 'normal'
    // comboId: 'MySQL1'
  },
  {
    id: 'node79',
    deviceType: 'db',
    netElID: '00004',
    label: 'MySQLSalve',
    ip: '192.168.0.187',
    state: 'normal'
    // comboId: 'MySQL1'
  },
  { //
    id: 'node200',
    deviceType: 'apphosts',
    netElID: '00004',
    label: 'APP类主机',
    ip: '',
    state: 'childs'
    // comboId: 'MySQL1'
  },
  { //
    id: 'node300',
    deviceType: 'udmshosts',
    netElID: '00004',
    label: 'UDMS类主机',
    ip: '',
    state: 'childs'
    // comboId: 'MySQL1'
  },
  { //
    id: 'node400',
    deviceType: 'udhosts',
    netElID: '00004',
    label: 'UD类主机',
    ip: '',
    state: 'childs'
    // comboId: 'MySQL1'
  },
  { //
    id: 'node500',
    deviceType: 'otherhosts',
    netElID: '00004',
    label: '其他主机',
    ip: '',
    state: 'childs'
    // comboId: 'MySQL1'
  }
]

// --------------------------app主机 18个---------------------------
const appHost = [
  {
    id: 'node12', // app主机 18个
    deviceType: 'host',
    netElID: '00004',
    label: 'APP16',
    ip: '192.168.1.116',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node22',
    deviceType: 'host',
    netElID: '00004',
    label: 'slot3-app-09',
    ip: '192.168.1.109',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node23',
    deviceType: 'host',
    netElID: '00004',
    label: 'mail-bak2-APP-07',
    ip: '192.168.1.107',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node24',
    deviceType: 'host',
    netElID: '00004',
    label: 'app-15-new',
    ip: '192.168.1.115',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node25',
    deviceType: 'host',
    netElID: '00004',
    label: 'app-02-new',
    ip: '192.168.1.177',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node26',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-10',
    ip: '192.168.1.110',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node27',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-12',
    ip: '192.168.1.112',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node28',
    deviceType: 'host',
    netElID: '00004',
    label: 'slot04-app1',
    ip: '192.168.1.101',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node29',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-12-app-13',
    ip: '192.168.1.113',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node30',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-14',
    ip: '192.168.1.114',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node31',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-11',
    ip: '192.168.1.111',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node32',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-08',
    ip: '192.168.1.108',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node33',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-06',
    ip: '192.168.1.106',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node34',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-05',
    ip: '192.168.1.105',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node35',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-04',
    ip: '192.168.1.104',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node36',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-03',
    ip: '192.168.1.103',
    state: 'normal',
    comboId: 'apphost1'
  },
  {
    id: 'node37',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-02',
    ip: '192.168.1.102',
    state: 'normal',
    comboId: 'apphost1'
  },
  // {
  //   id: 'node38',
  //   deviceType: 'host',
  //   netElID: '00004',
  //   label: 'APP-02',
  //   ip: '192.168.1.102',
  //   state: 'normal',
  //   comboId: 'apphost1'
  // },
  {
    id: 'node39',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP17',
    ip: '192.168.1.117',
    state: 'normal',
    comboId: 'apphost1'
  }
]

// ---------------- app主机nginx 7个 -------------------
const appNginx = [
  {
    id: 'node87',
    deviceType: 'os',
    netElID: '00004',
    label: 'slot3-app-09',
    ip: '192.168.1.109',
    state: 'normal'
    // comboId: 'nginx1'
  },
  {
    id: 'node88',
    deviceType: 'os',
    netElID: '00004',
    label: 'APP-10',
    ip: '192.168.1.110',
    state: 'normal'
    // comboId: 'nginx1'
  },
  {
    id: 'node89',
    deviceType: 'tomcat',
    netElID: '00004',
    label: 'APP-12',
    ip: '192.168.1.112',
    state: 'normal'
    // comboId: 'nginx1'
  },
  {
    id: 'node90',
    deviceType: 'os',
    netElID: '00004',
    label: 'UDMS-12-app-13',
    ip: '192.168.1.113',
    state: 'normal'
    // comboId: 'nginx1'
  },
  {
    id: 'node91',
    deviceType: 'os',
    netElID: '00004',
    label: 'app-15-new',
    ip: '192.168.1.115',
    state: 'normal'
    // comboId: 'nginx1'
  },
  {
    id: 'node92',
    deviceType: 'os',
    netElID: '00004',
    label: 'APP16',
    ip: '192.168.1.116',
    state: 'normal'
    // comboId: 'nginx1'
  },
  {
    id: 'node93',
    deviceType: 'os',
    netElID: '00004',
    label: 'APP17',
    ip: '192.168.1.117',
    state: 'normal'
    // comboId: 'nginx1'
  }
]

// ---------------- app主机tomcat 7个 -------------------
const appTomcat = [
  {
    id: 'node80',
    deviceType: 'tomcat',
    netElID: '00004',
    label: 'slot3-app-09',
    ip: '192.168.1.109',
    state: 'normal'
    // comboId: 'tomcat1'
  },
  {
    id: 'node81',
    deviceType: 'tomcat',
    netElID: '00004',
    label: 'APP-10',
    ip: '192.168.1.110',
    state: 'normal'
    // comboId: 'tomcat1'
  },
  {
    id: 'node82',
    deviceType: 'tomcat',
    netElID: '00004',
    label: 'APP-12',
    ip: '192.168.1.112',
    state: 'normal'
    // comboId: 'tomcat1'
  },
  {
    id: 'node83',
    deviceType: 'tomcat',
    netElID: '00004',
    label: 'UDMS-12-app-13',
    ip: '192.168.1.113',
    state: 'normal'
    // comboId: 'tomcat1'
  },
  {
    id: 'node84',
    deviceType: 'tomcat',
    netElID: '00004',
    label: 'app-15-new',
    ip: '192.168.1.115',
    state: 'normal'
    // comboId: 'tomcat1'
  },
  {
    id: 'node85',
    deviceType: 'tomcat',
    netElID: '00004',
    label: 'APP16',
    ip: '192.168.1.116',
    state: 'normal'
    // comboId: 'tomcat1'
  },
  {
    id: 'node86',
    deviceType: 'tomcat',
    netElID: '00004',
    label: 'APP17',
    ip: '192.168.1.117',
    state: 'normal'
    // comboId: 'tomcat1'
  }
]

// ---------- udms主机 12个 ------------
const udmsHost = [
  {
    id: 'node40',
    deviceType: 'host',
    netElID: '00004',
    label: 'udms7-bak',
    ip: '192.168.0.196',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node41',
    deviceType: 'host',
    netElID: '00004',
    label: 'udms-12bak',
    ip: '192.168.0.201',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node42',
    deviceType: 'host',
    netElID: '00004',
    label: 'udms-05bak',
    ip: '192.168.0.194',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node43',
    deviceType: 'host',
    netElID: '00004',
    label: 'udms-06bak',
    ip: '192.168.0.195',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node44',
    deviceType: 'host',
    netElID: '00004',
    label: 'slot13-udms09',
    ip: '192.168.0.198',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node45',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-11',
    ip: '192.168.0.200',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node46',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-08',
    ip: '192.168.0.197',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node47',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-10',
    ip: '192.168.0.199',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node48',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-03',
    ip: '192.168.0.192',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node49',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-04',
    ip: '192.168.0.193',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node50',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-02',
    ip: '192.168.0.191',
    state: 'normal',
    comboId: 'udmshost1'
  },
  {
    id: 'node51',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-01',
    ip: '192.168.0.190',
    state: 'normal',
    comboId: 'udmshost1'
  }
]

// ---------- ud主机 17个 ------------
const udHost = [
  {
    id: 'node52',
    deviceType: 'host',
    netElID: '00004',
    label: 'ud17',
    ip: '192.168.0.231',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node53',
    deviceType: 'host',
    netElID: '00004',
    label: 'ud16',
    ip: '192.168.0.230',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node54',
    deviceType: 'host',
    netElID: '00004',
    label: 'ud15',
    ip: '192.168.0.229',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node55',
    deviceType: 'host',
    netElID: '00004',
    label: 'ud14',
    ip: '192.168.0.228',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node56',
    deviceType: 'host',
    netElID: '00004',
    label: 'ud13',
    ip: '192.168.0.227',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node57',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-09-old-ud11',
    ip: '192.168.0.243',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node58',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-bak-old-ud01',
    ip: '192.168.0.232',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node59',
    deviceType: 'host',
    netElID: '00004',
    label: 'ConvertLogDBSlave-old-ud02',
    ip: '192.168.0.233',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node60',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-16-old-ud05',
    ip: '192.168.0.237',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node61',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-17-old-ud04',
    ip: '192.168.0.236',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node62',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-15-old-ud06',
    ip: '192.168.0.238',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node63',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-14-old-ud07',
    ip: '192.168.0.239',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node64',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-13-old-ud08',
    ip: '192.168.0.240',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node65',
    deviceType: 'host',
    netElID: '00004',
    label: 'UDMS-06-old-ud03',
    ip: '192.168.0.234',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node66',
    deviceType: 'host',
    netElID: '00004',
    label: 'app-13-old-ud12',
    ip: '192.168.0.244',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node67',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-02bak-old-ud10',
    ip: '192.168.0.242',
    state: 'normal',
    comboId: 'udhost1'
  },
  {
    id: 'node68',
    deviceType: 'host',
    netElID: '00004',
    label: 'APP-15-old-ud09',
    ip: '192.168.0.241',
    state: 'normal',
    comboId: 'udhost1'
  }
]

// ---------- 剩余主机 6个(共8个) ------------
const otherHost = [
  // {
  //   id: 'node71', // newmail 主机 ???????
  //   deviceType: 'host',
  //   netElID: '00004',
  //   label: 'newmail1',
  //   ip: '192.168.0.39', // (可能没有监控到)
  //   state: 'normal'
  // },
  {
    id: 'node72', // 192.168.24.11 主机
    deviceType: 'host',
    netElID: '00004',
    label: '192.168.24.11',
    ip: '192.168.24.11',
    state: 'normal'
  },
  {
    id: 'node111', // 192.168.24.12 主机
    deviceType: 'host',
    netElID: '00004',
    label: 'IM-2',
    ip: '192.168.24.12',
    state: 'normal'
  },
  {
    id: 'node73', // ConvertLogDBMaster 日志主机
    deviceType: 'host',
    netElID: '00004',
    label: 'ConvertLogDBMaster',
    ip: '192.168.0.185',
    state: 'normal'
  },
  // {
  //   id: 'node74', // 监控 2个主机
  //   deviceType: 'host',
  //   netElID: '00004',
  //   label: 'NAGIOS',
  //   ip: '192.168.0.25', // （可能没有监控到）
  //   state: 'normal'
  // },
  {
    id: 'node75',
    deviceType: 'host',
    netElID: '00004',
    label: 'NET-MON',
    ip: '192.168.0.110',
    state: 'normal'
  },
  {
    id: 'node109',
    deviceType: 'host',
    netElID: '00004',
    label: 'localhost.localdomain', // prometheus
    ip: '192.168.21.15',
    state: 'normal'
  },
  {
    id: 'node110',
    deviceType: 'host',
    netElID: '00004',
    label: 'localhost.localdomain', // prometheus
    ip: '192.168.21.200',
    state: 'normal'
  }
]
export { nodes, appHost, appTomcat, appNginx, udmsHost, udHost, otherHost }
