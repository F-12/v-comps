/*
 * Updated at 2016-08-30
 * 增加disable支持
 */
<template>
<dl class="dropdown"
    ref="dropdown"
    :class="{'open': open}" @click>
  <dt class="dropdown-toggle">
    <button type="button" class="form-control btn btn-default" @click="toggle">
      <span class="dropdown-title">{{selectedOption ? selectedOption.text : ''}}</span>
      <span class="caret pull-right"></span>
    </button>
  </dt>
  <dd class="dropdown-menu">
    <input type="text" class="form-control" v-model="input"/>
    <ul>
      <li v-for="option in filteredOptions" :class="{'disable': option.disable}"  @click.stop="_select(option)">{{option.text}}</li>
    </ul>
  </dd>
</dl>
</template>

<script>
export default {
  props: {
    name: '',
    value: null,
    options: {
      type: Array,
      default: []
    },
    filterBy: {
      type: Function,
      default() {
        return input => () => true;
      }
    }
  },
  data() {
    return {
      input: '',
      open: false
    };
  },
  computed: {
    filteredOptions() {
      return this.filterBy ? this.options.filter(this.filterBy(this.input)) : this.options;
    },
    selectedOption() {
      return this.options.filter(o => o.value === this.value)[0];
    }
  },
  methods: {
    show() {
      this.open = true;
    },
    hide() {
      this.open = false;
    },
    toggle() {
      this.open = !this.open;
      this.input = '';
    },
    _select(option) {
      if(option.disable) {
        return;
      }
      this.$emit('selected', option);
      this.hide();
      this.$emit('input', option.value);
    }
  },
  mounted() {
    const dropdownEl = this.$refs.dropdown;
    const hide = this.hide.bind(this);
    this.$nextTick(() => {
      document.body.addEventListener('click', function(evt) {
        const el = evt.target;
        if(document.body.contains(el) && !dropdownEl.contains(el)) {
          hide();
        }
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
dl {
  display: inline-block;
  margin: 0 0;
  padding: 0;
  width: 100%;
  border: 0;
}
dd{
  padding: 5px;
  width: 100%;
}
dd ul{
  padding: 5px;
  list-style: none;
  max-height: 260px;
  overflow: auto;
}
dd ul li {
  padding: 3px;
}
dd ul li:hover {
  background-color: rgba(0,0,0,0.175);
}

dt button {
  width: 100%;
  height: 30px;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
  font-size: 12px;
  color: #555;
  padding: 6px 6px;
}
.caret{
  margin-top: 6px
}
li.disable {
  background-color: rgba(0,0,0,0.075);
}
.dropdown-title {
    max-width: 80%;
    width: 80%;
    display: inline-block;
    overflow: hidden;
}
</style>
