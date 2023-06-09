/* eslint-disable camelcase */
// 接口文档： https://aiopsbackend.cstcloud.cn/apidocs/

import { axiosAiops } from 'boot/axios'

export default {
  mail: {
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
        url: 'v1/mail/machine',
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
        url: 'v1/mail/metric',
        params: params.query
      })
    },
    // 获取日志数据
    getMailLog (params: {query: {
      timestamp?: number,
      timestamp__lt?: number,
      timestamp__gt?: number,
      timestamp__gte?: number,
      timestamp__lte?: number,
      instance?: string,
      ordering?: string,
      page?: number,
      page_size?: number,
      log_source?: string
    }}) {
      return axiosAiops({
        method: 'get',
        url: 'v1/mail/log',
        params: params.query
      })
    },
    // 获取预警线
    getMailMetricWarning (params: {query: {
      instance?: string,
      ordering?: string,
      page?: number,
      page_size?: number
    }}) {
      return axiosAiops({
        method: 'get',
        url: 'v1/mail/metric/warning',
        params: params.query
      })
    }
  }
}
