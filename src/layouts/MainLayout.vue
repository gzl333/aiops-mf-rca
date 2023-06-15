<script setup lang="ts">
import { ref } from 'vue'
import MyDrawer from 'components/common/MyDrawer.vue'

const appPath = process.env.appPath as string

const navList = ref([
  {
    name: 'cstnetSys', // 中国科技网
    icon: '',
    path: appPath + '/cstnetSystem',
    pathName: 'cstnetSystem'
  },
  {
    name: 'dnsSys', // dns系统
    icon: 'dns',
    path: appPath + '/dnsSystem',
    pathName: 'dnsSystem'
  },
  {
    name: 'mailSys', // 邮件系统
    icon: 'mail_outline',
    path: appPath + '/mailSystem',
    pathName: 'mailSystem'
  }
  // {
  //   name: 'monitorU', // 监控单元
  //   icon: 'filter_center_focus',
  //   path: appPath + '/monitorUnit',
  //   pathName: 'monitorUnit'
  // }
  // {
  //   name: 'topo', // 拓扑图
  //   icon: 'bubble_chart',
  //   path: appPath + '/topological',
  //   pathName: 'topological'
  // }
])
</script>

<template>
  <q-layout view="hHh LpR fFf" >
    <my-drawer
      :nav-list="navList"
    ></my-drawer>

    <q-page-container>
      <div class="main">
        <router-view :key="$route.fullPath" />
      </div>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.main {
  margin: 16px;
  background: white;
  width: 100%;
  height: calc(100vh - 82px);
  box-shadow: rgba(233, 241, 250 ,0.9) 5px 0px 10px 4px;
}
</style>
