<template>
<nav>
  <ul class="pagination"
      :class="{
        'pagination-lg' : size === 'lg',
        'pagination-sm' : size === 'sm',
        }"
      >
    <li data-index="prev" :class="{ 'disabled': current <= 1}">
      <a href="javascript:void(0)" aria-label="Prev" @click="prevClick">
        {{prev.text}}
      </a>
    </li>
    <li v-for="(item, index) in items" :class="{'active': current === item, 'disabled': item === placeholder}" :key="index"><a href="javascript:;" @click="pageChanged(item)">{{ item }}</a></li>
    <li data-index="next" :class="{ 'disabled': current >= total}">
      <a href="javascript:void(0)" aria-label="Next" @click="nextClick()">
        {{next.text}}
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
// 需求：
// 1. 响应用户分页操作
// 2. 分页算法，支持大量分页符，支持单个分页符
// 3
const EVENT = {
  PAGE_CHANGED: 'change'
};
export default {
  props: {
    size: {
      type: String,
      default: 'sm'
    },
    total: {
      type: Number,
      default: 0
    },
    viewSize: { // 决定分页算法计算的显示长度
      type: Number,
      default: 8
    },
    placeholder: {
      type: String,
      default: '...'
    }, // 折叠的分页符显示样式
    prev: {
      type: Object,
      default() {
        return {
          text: '<<',
          callback() {}
        };
      }
    },
    next: {
      type: Object,
      default() {
        return {
          text: '<<',
          callback() {}
        };
      }
    }
  },
  data() {
    return {
        current: 1
    };
  },
  computed: {
    items() {
      if(this.total <= 1) {
        return [1];
      }
      if(this.viewSize === 1) {
        return [this.current];
      }
      const pageList = [];
      // 不需要折叠的情况
      if(this.viewSize >= this.total - 2) {
        for(let i = 1; i <= this.total; i++) {
          pageList.push(i);
        }
      } else {
          const left = this.current -  Math.floor(this.viewSize / 2);
          const right = this.current + Math.ceil(this.viewSize / 2);
          // 右边折叠的情况
          if(left <= 1) {
            for(let i = 1; i <= this.viewSize + 1; i++) {
              pageList.push(i);
            }
            pageList.push(this.placeholder);
            pageList.push(this.total);
          } else if(left > 1 && right <= this.total) {
            // 两边折叠
              pageList.push(1);
              if(left > 2) {
                pageList.push(this.placeholder);
              }
              for(let i = left; i < right; i++) {
                pageList.push(i);
              }
              if(right < this.total) {
                pageList.push(this.placeholder);
              }
              pageList.push(this.total);
          }else if(right > this.total) {
            // 左边折叠
            pageList.push(1);
            pageList.push(this.placeholder);
            for(let i = this.total - this.viewSize; i <= this.total; i++) {
              pageList.push(i);
            }
          }
      }
      return pageList;
    }
  },
  watch: {
    'current': function(value, old) {
      if(old !== value) {
        this.$emit(EVENT.PAGE_CHANGED, {total: this.total, current: this.current});
      }
    },
    'total': function(total) {
      !(total > 0) &&  (total = 1);
      if(this.current > total) {
        this.current = total;
      }
    }
  },
  methods: {
    prevClick() {
      if (this.current > 1) {
        this.current--;
        this.prev.callback && this.prev.callback(this.current, this.total);
      }
    },
    nextClick() {
      if (this.current < this.total) {
        this.current++;
        this.next.callback && this.next.callback(this.current, this.total);
      }
    },
    pageChanged(page) {
      if(page !== this.placeholder) {
        this.current = page;
      }
    }
  }
};
</script>
