<script setup lang="ts">
import { ref, computed } from 'vue'
import { navigateToUrl } from 'single-spa'
import { useStore } from 'stores/store'
// import { useRoute, useRouter } from 'vue-router'
import { i18n } from 'boot/i18n'
import MyDrawer from 'components/common/MyDrawer.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const store = useStore()
// const router = useRouter()
// const route = useRoute()
const tc = i18n.global.tc

const activeItem = computed(() => store.items.currentPath[0])

const appVersion = process.env.appVersion
const releaseTime = process.env.releaseTime
const navList = ref([
  {
    name: 'monitorU',
    icon: 'filter_center_focus',
    path: '/my/rca/monitorUnit',
    pathName: 'monitorUnit'
  },
  {
    name: 'topo',
    icon: 'bubble_chart',
    path: '/my/rca/topological',
    pathName: 'topological'
  }
])
</script>

<template>
  <q-layout view="hHh LpR fFf" >
    <my-drawer
    style="margin-top: 60px;"
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
