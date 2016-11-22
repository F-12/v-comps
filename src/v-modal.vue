<template>
<transition name="fadeInOut" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
<div v-show="show" class="modal" tabindex="-1" role="dialog"  ref="modal">
  <transition name="fadeUpDown" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
    <div v-show="show" class="modal-dialog" 
                       :class="{'modal-lg': dialog.large, 'modal-sm': dialog.small}":role="dialog.role">
      <div class="modal-content" ref="modalContent">
        <div class="modal-header">
          <slot name="header">
            <button type="button" class="close" @click="hide"><span aria-hidden="true">×</span></button>
            <slot name="title">
              <h4 class="modal-title"></h4>
            </slot>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
        <slot name="footer">
          <button type="button" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-default" @click="hide">Close</button>
        </slot>
        </div>
      </div>
    </div>
  </transition>
</div>
</transition>
</template>

<script>
// TODO
// - 增加事件支持,包括show，shown，hide，hidden
export default {
  props: {
    dialog: {
      type: Object, 
      default() {
        return {role: 'dialog', large: '', small: ''};
      }
    }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
    'show': function(newVal) {
      if(newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'scroll';
      }
    }
  },
  methods: {
    hide() {
      this.show = false;
    },
    toggle() {
      this.show = !this.show;
    },
    open() {
      this.show = true;
    }
  },
  mounted() {
    const modalContentEl = this.$refs.modalContent;
    const hide = () => {
      if(this.show) { 
        this.hide();
      }
    };
    this.$nextTick(() => {
      document.body.addEventListener('click', function(evt) {
        const el = evt.target;
        if(document.body.contains(el) && !modalContentEl.contains(el)) {
          hide();
        }
      });
    })
  }

};
</script>

<style scoped>
.modal {
  background-color: rgba(51,51,51, 0.8);
  display: block;
}
.modal-dialog {
  padding-top: 10%;
}
</style>
