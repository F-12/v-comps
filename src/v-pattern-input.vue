<template>
 <input type="text" @input="_handleInput($event)" />
</template>

<script>
export default {
  props: {
    value: null,
    pattern: {
      type: String,
      default: '^\\d*$'
    }
  },
  data() {
    return {
      input: null,
    };
  },
  computed: {
    patternRegexp() {
      return new RegExp(this.pattern);
    }
  },
  methods: {
    _handleInput(event) {
      const value = event.target.value;
      if(this.patternRegexp.test(value)) {
        this.input = value;
        this.$emit('input', value);
      } 
      event.target.value = this.input;
    }
  }
};
</script>

<style scoped>

</style>
