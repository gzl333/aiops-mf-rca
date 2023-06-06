<!-- 拓扑图 -->
<script setup lang="ts">
import { ref, reactive, shallowRef, onMounted, nextTick, watch } from 'vue'
import { useStore } from 'stores/rca/topological'
import { storeToRefs } from 'pinia'
import { i18n } from 'boot/i18n'

import G6 from '@antv/g6'
import { date } from 'quasar'

import 'default-passive-events'
import nodeData from './topologicalCmptData/index'

import NodeOtherHosts from './nodes/NodeOtherHosts.vue'
import NodeUDHosts from './nodes/NodeUDHosts.vue'
import NodeUDMSHosts from './nodes/NodeUDMSHosts.vue'
import NodeAppHosts from './nodes/NodeAppHosts.vue'
import NodeHost from './nodes/NodeHost.vue'
import NodeSwitch from './nodes/NodeSwitch.vue'
import NodeFirewall from './nodes/NodeFirewall.vue'
import NodeBalancer from './nodes/NodeBalancer.vue'
import NodeVpn from './nodes/NodeVpn.vue'
import NodeTomcat from './nodes/NodeTomcat.vue'
import NodeOs from './nodes/NodeOs.vue'
import NodeDb from './nodes/NodeDb.vue'
import NodeNoData from './nodes/NodeNoData.vue'
import MyNoData from 'components/common/MyNoData.vue'

const tc = i18n.global.tc
const store = useStore()
const { nodeInfo } = storeToRefs(store)

interface NodeParams {
  style: {
    width?: number
    maxWidth?: string | number
    [propName: string]: any
  },
  info: {
    systemID: string
    type: string
    ip: string
    label?: string
    timeRange?: [string, string]
    title?: string
    [propName: string]: any
  },
  [propName: string]: any
}

nodeData.nodes.forEach((node: any) => {
  if (!node.style) {
    node.style = {}
  }
  switch (node.state) {
    case 'normal':
      node.style = { fill: '#befacc', stroke: '#40ca7e' }
      break
    case 'childs':
      node.style = { fill: '#C6E5FF', stroke: '#5B8FF9' }
      break
    case 'warning':
      node.style = { fill: '#ffd79e', stroke: '#FFAC33' }
      break
    case 'error':
      node.style = { fill: '#ffb2b2', stroke: '#FC5531' }
      break
    default:
      break
  }
})

nodeData.edges.forEach((edge: any) => {
  if (!edge.style) {
    edge.style = {}
  }
  switch (edge.state) {
    case 'normal':
      break
    case 'error':
      edge.style.stroke = '#FC5531'
      break
    default:
      break
  }
})
const graph: any = ref()
const canvasWidth = ref(0)
const canvasHeight = ref(0)
const topoG6 = ref()
const topoTitle = ref()

const nodeParams: NodeParams = reactive({
  style: {
    width: 400,
    maxWidth: '70vw',
    maxHeight: '100vh'
  },
  info: {
    systemID: '',
    type: 'node',
    ip: '',
    label: '',
    timeRange: [date.formatDate(date.subtractFromDate(Date.now(), { minutes: 5 }), 'YYYY-MM-DD HH:mm'), date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm')],
    title: '节点详情'
  }
})

const currentSelect = ref() // 当前选中的网元
const currentType = ref() // 网元类型
const currentDialogRef = ref() // 弹框ref

const currentDialog = shallowRef()
// 当前弹框组件 需使用shallowRef声明。
// 这里用ref的话，vue给出警告Vue接收到一个组件，该组件被制成反应对象。这可能会导致不必要的性能开销，应该通过将组件标记为“markRaw”或使用“shallowRef”而不是“ref”来避免。
// 如果使用 markRaw 那么currentComp将不永远不会再成为响应式对象。 所以得使用 shallowRef
// ref 替换成 shallowRef。

// 根据当前点击节点类型展示不同弹框
watch(() => currentType.value, async (val) => {
  nodeParams.style.width = 400
  nodeParams.info.title = '节点详情'
  nodeParams.info.type = 'node'
  nodeParams.info.ip = currentSelect.value._cfg.model.ip
  nodeParams.info.label = currentSelect.value._cfg.model.label
  nodeInfo.value.ip = currentSelect.value._cfg.model.ip
  nodeInfo.value.label = currentSelect.value._cfg.model.label

  switch (val) {
    // apphosts udmshosts udhosts otherhosts host  switch firewall balancer vpn tomcat os db
    case 'host':
      currentDialog.value = NodeHost
      nodeParams.info.title = '主机节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'switch':
      currentDialog.value = NodeSwitch
      nodeParams.info.title = '交换机节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'firewall':
      currentDialog.value = NodeFirewall
      nodeParams.info.title = '防火墙节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'balancer':
      currentDialog.value = NodeBalancer
      nodeParams.info.title = 'F5负载均衡器节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'vpn':
      currentDialog.value = NodeVpn
      nodeParams.info.title = 'VPN节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'tomcat':
      currentDialog.value = NodeTomcat
      nodeParams.info.title = 'Tomcat节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'os':
      currentDialog.value = NodeOs
      nodeParams.info.title = 'nginx节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'db':
      currentDialog.value = NodeDb
      nodeParams.info.title = 'MySQL节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'apphosts':
      currentDialog.value = NodeAppHosts
      nodeParams.style.width = 520
      nodeParams.info.title = 'APP类主机节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'udmshosts':
      currentDialog.value = NodeUDMSHosts
      nodeParams.style.width = 520
      nodeParams.info.title = 'UDMS类主机节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'udhosts':
      currentDialog.value = NodeUDHosts
      nodeParams.style.width = 520
      nodeParams.info.title = 'UD类主机节点'
      await nextTick()
      currentDialogRef.value.show()
      break
    case 'otherhosts':
      currentDialog.value = NodeOtherHosts
      nodeParams.style.width = 520
      nodeParams.info.title = '其他主机节点'
      await nextTick()
      currentDialogRef.value.show()
      break

    case '':
      break
    default:
      currentDialog.value = NodeNoData
      await nextTick()
      currentDialogRef.value.show()
      break
  }
})
/**
 * @desc: 重置容器宽高
 */
const resetContainer = async () => {
  await nextTick()
  if (topoG6.value) {
    setTimeout(() => {
      canvasWidth.value = topoG6.value.offsetWidth
      canvasHeight.value = topoG6.value.offsetHeight

      graph.value.changeSize(canvasWidth.value, canvasHeight.value)

      graph.value.fitCenter()
    }, 100)
  }
}

/**
 * @desc: window变化时设置容器宽高自适应
 */
const initSize = () => {
  setTimeout(() => {
    window.onresize = () => {
      resetContainer()
    }
  })
}

/**
 * @desc: 清除选中状态
 * @param {*} node
 */
const clearState = () => {
  graph.value.clearItemStates(currentSelect.value, 'selected')
  currentType.value = ''
}

/**
 * @desc: G6点击节点事件
 */
const nodeClick = async (ev: any) => {
  const shape = ev.target
  currentSelect.value = ev.item
  currentType.value = currentSelect.value._cfg.model.deviceType
  // console.log(currentSelect.value, 'currentType.value:', currentType.value)

  // 增加选中态
  graph.value.setItemState(currentSelect.value, 'selected', true)
  await nextTick()
}

onMounted(async () => {
  await nextTick() // DOM元素挂载完成后才能准确获取容器的宽高

  // 左上角小地图
  const minimap = new G6.Minimap({
    size: [100, 100],
    className: 'minimap',
    type: 'delegate'
  })

  // 左下图例
  const legendData = {
    nodes: [{
      id: '1',
      state: 'normal',
      label: '状态正常',
      order: 4,
      style: { fill: '#befacc', stroke: '#40ca7e' }
    },
    {
      id: '2',
      state: 'warning',
      label: '警告',
      order: 4,
      style: { fill: '#ffd79e', stroke: '#FFAC33' }
    },
    {
      id: '3',
      state: 'error',
      label: '严重警告',
      order: 4,
      style: { fill: '#ffb2b2', stroke: '#FC5531' }
    },
    {
      id: '4',
      state: 'childs',
      label: '含子节点',
      order: 4,
      style: { fill: '#C6E5FF', stroke: '#5B8FF9' }
    }]
  }
  const legend = new G6.Legend({
    data: legendData,
    align: 'left',
    layout: 'horizontal', // vertical
    position: 'bottom-left',
    vertiSep: -10,
    horiSep: 14,
    offsetY: -4,
    padding: [14, 8, 0, 8],
    containerStyle: {
      fill: '#dee3f5',
      fontSize: 14,
      radius: 4,
      // stroke: '#5B8FF9',
      lineWidth: 0
    }
  })

  graph.value = new G6.Graph({
    container: 'topo-g6', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    width: canvasWidth.value, // Number，必须，图的宽度
    height: canvasHeight.value, // Number，必须，图的高度
    fitCenter: true,
    layout: {
      type: 'dagre',
      sortByCombo: true,
      preventOverlap: true,
      linkDistance: 100, // 指定边距离为100
      nodesep: 18,
      ranksep: 26
    },
    animate: true, // Boolean，切换布局时是否使用动画过度，默认为 false
    animateCfg: {
      duration: 500, // Number，一次动画的时长
      easing: 'linearEasing' // String，动画函数
    },
    groupByTypes: false,
    modes: {
      default: [
        'drag-canvas',
        'zoom-canvas',
        {
          type: 'collapse-expand-combo',
          relayout: true
        }
      ]
    },
    defaultNode: {
      size: [25, 25],
      type: 'circle',
      anchorPoints: [[0.5, 0], [0.5, 1]],
      style: {
        lineWidth: 2,
        stroke: '#5B8FF9',
        fill: '#C6E5FF'
      },
      labelCfg: {
        style: {
          fill: '#000',
          fontSize: 14,
          background: {
            fill: '#fafafa',
            // stroke: '#9EC9FF',
            padding: [2, 2, 2, 2],
            radius: 4
          }
        },
        position: 'bottom'
      }
    },
    defaultCombo: {
      type: 'rect', // rect
      style: {
        fillOpacity: 0.1
      }
    },
    plugins: [minimap, legend] // 将 minimap,legend 实例配置到图上
  })

  graph.value.data(nodeData) // 读取数据源到图上
  graph.value.render() // 渲染图

  graph.value.zoom(0.68) // 设置默认缩放比例

  initSize()

  graph.value.on('node:click', nodeClick)
})

defineExpose({ resetContainer })
</script>

<template>
  <div class="TopologicalCmpt">
    <p class="text-h6 text-weight-bold text-center q-py-sm" ref="topoTitle">{{ tc('topoDgm')}}</p>
    <div ref="topoG6" id="topo-g6"></div>

    <div class="column justify-center items-center transform-no-data" v-if="false">
      <my-no-data :width="300"></my-no-data>
      <p>请在右侧添加网元信息</p>
    </div>

    <component
      :is="currentDialog"
      ref="currentDialogRef"
      :params="nodeParams"
      @clearState="clearState"
      :currentSelect="currentSelect">
    </component>

  </div>
</template>

<style lang="scss">
@import "~css/mixins.scss";

.TopologicalCmpt {
  height: 100%;

  #topo-g6 {
    height: calc(100vh - 230px);

    .minimap {
      position: absolute !important;
      top: 0 !important;
    }
  }
  .minimap {
      position: absolute !important;
      top: 0 !important;
    }
  .transform-no-data {
    @include transform(translate(0, 40%))
  }
}
</style>
