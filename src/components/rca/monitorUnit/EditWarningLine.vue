<!-- 编辑预警线弹框 -->
<script setup lang="ts">
import { ref, reactive, computed, withDefaults, onMounted, nextTick, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { date } from 'quasar'

import MyDialog from 'components/common/MyDialog.vue'

// const { t } = useI18n()

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

// const store = useStore()
// const route = userRoute()
interface NodeParams {
  style?: {
    width?: number
    maxWidth?: string | number
    [propName: string]: any
  },
  info?: {
    systemID: string
    elementID: string
    timeRange: [string, string]
    title: string
    [propName: string]: any
  },
  [propName: string]: any
}

interface Props {
  params?: NodeParams
  currentSelect?: any
  lineData?: any
}

// TODO 传入弹框名称，默认图表名，预警线值，单位，systemID（业务系统），elementID（节点）
const props = withDefaults(defineProps<Props>(), {
  params: () => {
    return {
      style: {
        width: 450,
        maxWidth: '70vw',
        maxHeight: '100vh'
      },
      info: {
        systemID: 'system00001',
        type: '',
        elementID: 'node00001',
        timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { minutes: 5 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')],
        title: '设置预警线'
      }
    }
  },
  lineData: () => {
    return {
      usage: {
        label: '', // 预警线名
        value: 0, // 预警值
        alias: '' // 预警线单位
      }
    }
  }
})

const emits = defineEmits(['changeWarningLine'])

const dialog = ref()

const myLineData = ref(JSON.parse(JSON.stringify(props.lineData)))

watch(() => props.lineData, (val) => {
  myLineData.value = JSON.parse(JSON.stringify(val))
})

const clearState = () => {
  // TODO 清除弹框默认信息
}

const show = async () => {
  myLineData.value = JSON.parse(JSON.stringify(props.lineData))
  await nextTick()
  dialog.value.show()
}

const hidden = () => {
  dialog.value.hidden()
}

const saveLine = () => {
  emits('changeWarningLine', myLineData.value)
}

defineExpose({ show, hidden })
</script>

<template>
  <div class="EditWarningLine">
    <my-dialog ref="dialog" :nodeParams="params" @clearState="clearState">
      <template #container>
        <div class="q-px-xs">
          <div class="row items-center q-mb-sm" v-for="(item, key) in myLineData" :key="key">
            <label class="q-pr-sm">{{ item.label }}</label>
            <q-input v-model="item.value" dense outlined type="text" :suffix="item.alias" >
            </q-input>
          </div>
        </div>
      </template>

      <template #actions>
        <q-btn padding="4px 14px" outline style="color: #606266;" label="关闭" v-close-popup />

        <!-- <q-btn outline padding="4px 14px" style="color: #606266;" label="关闭" v-close-popup /> -->
        <q-btn padding="4px 14px" unelevated color="aiops-primary" label="保存" @click="saveLine" v-close-popup />
      </template>
    </my-dialog>

  </div>
</template>

<style lang="scss" scoped>
.EditWarningLine {

}
</style>
