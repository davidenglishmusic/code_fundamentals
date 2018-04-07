<template>
<div class="prompt-pane pane">
  <div class="prompt-pad">
    <div v-for="(line, index) in promptLines" :key="index">{{line}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PromptPane',
  props: ['prompt'],
  computed: {
    promptLines: function() {
      if (this.prompt === null) {
        return;
      }
      return this.prompt.split('\n');
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/pane.less";

.prompt-pane {
    background-color: @prompt-side-color;
    color: lighten(@prompt-side-color, 95%);
}
</style>
