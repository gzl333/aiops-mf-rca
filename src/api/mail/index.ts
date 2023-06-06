/* eslint-disable camelcase */
// 接口文档： https://aiopsbackend.cstcloud.cn/apidocs/

import { axiosAiops } from 'boot/axios'

export default {
  mail: {
    // 获取节点数据
    getNodeMetric (params: {query: {
      timestamp?: number,
      timestamp__lte?: number,
      timestamp__gte?: number,
      timestamp_gt?: number,
      timestamp_lt?: number,
      instance: string,
      ordering: string,
      page?: number,
      page_size?: number
    }}) {
      return axiosAiops({
        method: 'get',
        url: 'v1/mail/metric',
        params: params.query
      })
    },
    // 获取实例
    getMailMachine (params: {query: {
        category?: string,
        instance?: string,
        ordering?: string,
        page?: number,
        page_size?: number
      }}) {
      return axiosAiops({
        method: 'get',
        url: 'v1/mail/machine/',
        params: params.query
      })
    },
    // 获取监控数据
    getMailMetric (params: {query: {
        timestamp?: number,
        timestamp__lt?: number,
        timestamp__gt?: number,
        timestamp__gte?: number,
        timestamp__lte?: number
        instance?: string,
        ordering?: string,
        page?: number,
        page_size?: number
      }}) {
      return axiosAiops({
        method: 'get',
        url: 'v1/mail/metric/',
        params: params.query
      })
    }
  }
}
