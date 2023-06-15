<!-- 左侧抽屉公共组件 -->
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'
import { navigateToUrl } from 'single-spa'

import { logs } from 'src/configs/logs'

const tc = i18n.global.tc
const router = useRouter()
const store = useStore()

interface NavList {
  name: string // 显示名称
  icon: string // 显示icon
  path: string // 跳转路由
  pathName: string // 跳转的路由名称
}

interface Props {
  width?: number
  navList: NavList[]
}

const props = withDefaults(defineProps<Props>(), {
  width: 120
})

const active = ref()
const activeItem = computed(() => store.items.currentPath[0])

const appPath = process.env.appPath as string
const releaseTime = process.env.releaseTime as string
const appVersion = logs[0].version

watch(() => router.currentRoute.value.path, (val) => {
  active.value = val
},
{ immediate: true, deep: true }
)

</script>

<template>
  <q-drawer
    style="padding-top: 60px;"
    bordered
    side="left"
    :width="width"
    :breakpoint="0"
    :model-value="true"
  >
  <div class="column full-height bg-grey-2">
    <q-scroll-area class="col non-selectable" visible>
      <q-list>
        <q-item>
          <q-item-section class="column items-center q-py-sm text-center text-weight-bold text-grey-8">
            {{ tc('rca') }}
          </q-item-section>
        </q-item>

        <q-item
          active-class="active-item"
          v-for="(item, index) in navList"
          :key="index"
          :clickable="active !== item.path"
          :active="active === item.path"
          @click="navigateToUrl(item.path)"
        >
          <q-item-section class="column items-center" v-if="item.pathName !== 'cstnetSystem'">
            <q-icon :name="item.icon" size="lg"/>
            <div class="active-text text-center">{{ tc(item.name) }}</div>
          </q-item-section>
          <q-item-section class="column items-center" v-else>
            <img src="../../assets/cst.png" alt="" v-if="active !== item.path">
            <img src="../../assets/cst_blue.png" alt="" v-else>
            <div class="active-text text-center">{{ tc(item.name) }}</div>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 发布版本信息 -->
      <div class="row justify-center q-pt-sm">
        <q-icon class="text-center cursor-pointer"
          name="info"
          size="xs"
          :color="activeItem === 'about' ? 'primary' : 'grey-4'"
          @click="navigateToUrl(appPath + '/about')"
        >
          <q-tooltip class="bg-grey-3">
            <div class="text-grey text-caption text-center">{{ tc('appVersion') }}</div>
            <div class="text-grey text-caption text-center">
              {{ appVersion }}
            </div>

            <div class="text-grey text-caption text-center">{{ tc('releaseTime') }}</div>
            <div class="text-grey text-caption text-center">
              {{ new Date(releaseTime).toLocaleString(i18n.global.locale as string) }}
            </div>
          </q-tooltip>
        </q-icon>
      </div>
    </q-scroll-area>
  </div>
  </q-drawer>
</template>

<style lang="scss" scoped>
.active-item {
  background-color: #DBF0FC; // $grey-4;

  .active-text {
    color: $primary;
  }
}
</style>
