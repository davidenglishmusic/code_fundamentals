<template>
<div class="code-pad-wrapper">
  <div class="code-pad">
    <span v-html="codeLines"></span>
  </div>
</div>
</template>

<script>
export default {
  name: 'CodePad',
  props: ['code'],
  data: function() {
    return {
      codeLines: '',
      index: 0,
      typeIntervalIncrement: 50
    }
  },
  watch: {
    code: function() {
      this.index = 0;
      this.codeLines = '';
      this.typeCode();
    }
  },
  methods: {
    typeCode: function() {
      if (this.index < this.code.length) {
        this.codeLines += this.code.charAt(this.index);
        this.index++;
        setTimeout(this.typeCode, this.typeIntervalIncrement);
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/variables.less";

.code-pad-wrapper {
    display: flex;
    align-items: center;
    background-color: @prompt-side-color;
    color: @code-side-color;
    padding: 1rem;
    border-radius: 5px;
    min-width: 290px;
    min-height: 150px;
    @media (min-width: @tablet-min-width) {
        padding: 2rem;
        min-width: 355px;
        min-height: 226px;
    }

    .code-pad {
        display: flex;
        flex-direction: column;
        white-space: pre;
    }
}
</style>
