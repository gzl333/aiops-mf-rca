<script setup lang="ts">
import { ref, withDefaults, computed, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'

// const { t } = useI18n()

interface NodeParams {
  style?: {
    width?: number
    maxWidth?: string | number
    [propName: string]: any
  },
  info?: {
    systemID?: string
    type?: string
    elementID?: string
    timeRange?: string[]
    title: string
    [propName: string]: any
  },
  [propName: string]: any
}

interface Props {
  nodeParams?: NodeParams
}

const props = withDefaults(defineProps<Props>(), {
  nodeParams: () => {
    return {
      style: {
        width: 500,
        maxWidth: '70vw',
        maxHeight: '100vh'
      },
      info: { title: '详细信息' }
    }
  }
})
const emits = defineEmits(['clearState'])

const myParams = computed(() => props.nodeParams)

const isShow = ref(false)

const show = () => {
  isShow.value = true
}

const hidden = () => {
  isShow.value = false
}

watch(isShow, (val, preVal) => {
  if (!val) {
    emits('clearState') // 关闭弹框时外部还需执行的操作
  }
})

defineExpose({ show, hidden })
</script>

<template>
  <div class="MyDialog">
    <q-dialog v-model="isShow" class="text-aiops-sub-font">
      <q-card :style="{width: `${myParams.style?.width}px`, maxWidth: myParams.style?.maxWidth, maxHeight: myParams.style?.maxHeight}">
        <q-card-section class="row items-center">
          <q-icon style="padding-right: 1px" class="text-weight-bolder text-h6 color-primary" name="notes"></q-icon>
          <p class="text-subtitle1 text-weight-bold">{{ myParams.info?.title }}</p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <slot name="container">

          </slot>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <!-- <q-btn flat label="OK" v-close-popup /> -->
          <slot name="actions"></slot>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
.MyDialog {

  .subtitle {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

}
</style>
