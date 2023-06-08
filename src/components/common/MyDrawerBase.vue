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
  width: 180
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
    class="q-mr-sm box-shadow-primary"
    :model-value="true"
    show-if-above
    :width="width"
    :breakpoint="0"
  >
    <q-scroll-area class="height-100">
      <q-list padding>
        <q-item>
          <q-item-section class="column items-center q-py-sm text-center text-weight-bold text-aiops-primary">
            {{ tc('rca') }}
          </q-item-section>
        </q-item>

        <q-item
          v-for="(item, index) in navList"
          :key="index"
          :clickable="active !== item.path"
          v-ripple
          :active="active === item.path"
          :to="{name: item.pathName}"
          @click="active = item.path"
        >
          <q-item-section avatar style="min-width: auto;">
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            {{ tc(item.name) }}
          </q-item-section>
        </q-item>

      </q-list>
      <!-- 发布版本信息 -->
      <div class="row justify-center q-pt-sm">
        <q-icon class="text-center cursor-pointer"
                name="info"
                size="xs"
                :color="activeItem === 'about' ? 'primary' : 'grey-4'"
                @click="navigateToUrl(appPath + '/about')">
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

  </q-drawer>
</template>

<style lang="scss" scoped>
</style>
