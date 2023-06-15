import { RouteRecordRaw } from 'vue-router'

// @mimas: allocated root path of current app, defined in package.json
const appPath = process.env.appPath as string

// 根因定位
const MainLayout = () => import('layouts/MainLayout.vue')
const CstnetSystem = () => import('pages/CstnetSystem.vue')
const DNSSystem = () => import('pages/DNSSystem.vue')
const MailSystem = () => import('pages/MailSystem.vue')

const MonitorUnit = () => import('pages/MonitorUnit.vue') // 监控单元
// const Topological = () => import('src/pages/TopologicalBase.vue') // 拓扑图

const routes: RouteRecordRaw[] = [
  {
    path: appPath,
    component: MainLayout,
    redirect: appPath + '/mailSystem',
    children: [
      // {
      //   path: 'topological',
      //   name: 'topological',
      //   component: Topological
      // },
      {
        path: 'monitorUnit',
        name: 'monitorUnit',
        component: MonitorUnit
      },
      {
        path: 'cstnetSystem',
        name: 'cstnetSystem',
        component: CstnetSystem
      },
      {
        path: 'DNSSystem',
        name: 'DNSSystem',
        component: DNSSystem
      },
      {
        path: 'mailSystem',
        name: 'mailSystem',
        component: MailSystem
      },
      // @mimas: about, updates, releases...
      {
        path: 'about',
        component: () => import('pages/AboutPage.vue')
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
