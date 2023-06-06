import { RouteRecordRaw } from 'vue-router'
// 根因定位
const MainLayout = () => import('layouts/MainLayout.vue')
const MonitorUnit = () => import('pages/MonitorUnit.vue') // 监控单元
const Topological = () => import('pages/TopologicalPage.vue') // 拓扑图

const routes: RouteRecordRaw[] = [
  {
    path: '/my/rca',
    component: MainLayout,
    redirect: '/my/rca/topological',
    children: [
      {
        path: 'topological',
        name: 'topological',
        component: Topological
      },
      {
        path: 'monitorUnit',
        name: 'monitorUnit',
        component: MonitorUnit
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
