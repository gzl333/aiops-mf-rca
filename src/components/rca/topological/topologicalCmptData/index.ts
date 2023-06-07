// 邮件系统拓扑节点数据
import { nodes } from './nodes'
import edges from './edges'
import combos from './combos'
const mailNodeData = {
  // 点集
  nodes,
  // 边集
  edges,
  // 集合
  combos
}
const linuxIPs = ['192.168.0.110', '192.168.0.185', '192.168.0.186', '192.168.0.187', '192.168.0.188', '192.168.0.189',
  '192.168.0.190', '192.168.0.191', '192.168.0.192', '192.168.0.193', '192.168.0.194', '192.168.0.195',
  '192.168.0.196', '192.168.0.197', '192.168.0.198', '192.168.0.199', '192.168.0.200', '192.168.0.201',
  '192.168.0.227', '192.168.0.228', '192.168.0.229', '192.168.0.230', '192.168.0.231', '192.168.0.232',
  '192.168.0.233', '192.168.0.234', '192.168.0.236', '192.168.0.237', '192.168.0.238', '192.168.0.239',
  '192.168.0.240', '192.168.0.241', '192.168.0.242', '192.168.0.243', '192.168.0.244', '192.168.1.101',
  '192.168.1.102', '192.168.1.103', '192.168.1.104', '192.168.1.105', '192.168.1.106', '192.168.1.107',
  '192.168.1.108', '192.168.1.109', '192.168.1.110', '192.168.1.111', '192.168.1.112', '192.168.1.113',
  '192.168.1.114', '192.168.1.115', '192.168.1.116', '192.168.1.117', '192.168.21.15', '192.168.21.200',
  '192.168.24.11', '192.168.24.12']

const switchs = ['159.226.14.41', '159.226.14.71', '159.226.14.72',
  '159.226.14.73', '159.226.14.79', '159.226.14.80',
  '192.168.14.13', '192.168.14.14', '192.168.13.2',
  '192.168.13.3', '192.168.13.4', '192.168.13.5']
export default mailNodeData