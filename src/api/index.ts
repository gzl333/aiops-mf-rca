/* 标准api调用函数库,严格与后端接口一致 */

import aiops from 'src/api/aiops'
import service from 'src/api/service'
import mail from './mail/index'
export default {
  aiops,
  service,
  ...mail
}
