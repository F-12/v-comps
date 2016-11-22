<template>
<table>
  <colgroup>
    <col v-for="(h, index) in headItems" :col-index="index"></col>
  </colgroup>
  <thead>
    <tr>
      <th v-for="h in headItems" :class="h.classes.concat([h.hidden ? 'hidden' : ''])">
        <template v-if="h.hcomponent">
          <component :is="h.hcomponent" :col-index="colIdx" :item="h"></component>
        </template>
        <template v-else v-html="h.text"></template>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(rowIdx, row) in renderedSource">
      <td v-for="(colIdx, h) in headItems" :class="h.classes.concat([h.hidden ? 'hidden' : ''])">
        <template v-if="h.component">
          <component :is="h.component" :item="row" :key="h.key" :col-index="colIdx" :row-index="rowIdx"></component>
        </template>
        <template v-else v-html="h.render ? h.render(row): ''">
        </template>
      </td>
    </tr>
  </tbody>
</table>
</template>
<script>
// 职责分配：
// v-table组件只负责表格数据骨架的渲染与显示，具体的每个数据项的显示细节应该由表格组件的使用者控制
// 为了达成这个目的，表格组件内部不会维护任何关于数据项显示所需的任何状态，
// 实现数据项渲染的组件能获得的所有数据即传递到表格组件内的一行数据，因而实现数据项组件时只能依赖于传递到表格组件的source列表中的对象
// 存在表格数据项内需要传递事件给使用者，
// 需求:
// 1. headItems: {
//      component: 指定定义在Vue全局的组件名
//      text: 表头渲染的文本
//      key:  该列数据在source行对象中的key, 目前只支持字符串,
//      classes: 改列使用的css class
//    }
// 2. source： {
//      key1: value1, key2: value2
//    }
// 3. 支持排序及排序方向: 目前只实现自然序
// 4. 支持表头固定，目前通过jquery.floatthead支持，需要重构
// 5. 支持hidden column
// 6. 支持表头设置控件
// 说明：
// 1. filter应该v-table外进行支持
// 2. search应该在v-table外进行支持
/*require('floatthead');*/
export default {
  props: {
    headItems: {
      type: Array,
      default: []
    },
    source: {
      type: Array,
      default: []
    },
    sortBy: {
      type: String,
      default: ''
    },
    order: {
      type: String,
      default: 'asc'
    },
    floatHead: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    renderedSource() {
      if(this.sortBy && this.order.toLowerCase() === 'asc') {
        return this.source.sort((a, b) => a[this.sortBy] > b[this.sortBy] ? 1 : (a[this.sortBy] < b[this.sortBy] ? -1 : 0))
      }
      if(this.sortBy && this.order.toLowerCase() === 'desc') {
        return this.source.sort((a, b) => a[this.sortBy] > b[this.sortBy] ? -1 : (a[this.sortBy] < b[this.sortBy] ? 1 : 0))
      }
      return this.source;
    }
  },
  data() {
    return {
      resize: {
        index: -1,
        minWidth: 20
      },

    };
  },
  methods: {
  },
  created() {
    console.log('v-table created');
    /*this.headItems.forEach(hi => )*/
  }
};
</script>
<style scoped>
th {
  text-align: center;
}
/*th + th {*/
  /*border-left: 1px dotted rgba(0, 0, 0, 0.075);*/
/*}*/
th.hidden, td.hidden {
  display: none;
}
.col-left {
  text-align: left;
}
.col-center {
  text-align: center;;
}
.col-right {
  text-align: right;
}
</style>

