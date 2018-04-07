<template>
<div class="code-pane pane">
  <div class="preface">{{preface}}</div>
  <CodePad :code="code" v-on:show-prompt-output="$emit('show-prompt-output')" />
  <RunButton v-on:click.native="$emit('show-prompt-output')" />
</div>
</template>
<script>
import CodePad from './CodePad.vue'
import RunButton from './RunButton.vue'

export default {
  name: 'CodePane',
  components: {
    CodePad,
    RunButton
  },
  props: ['preface', 'code']
}
</script>

<style scoped lang="less">
@import "../assets/pane.less";

.code-pane {
    background-color: @code-side-color;
    color: darken(@code-side-color, 95%);
    flex-direction: column;
    min-height: 320px;

    .preface {
        padding: 0 2rem 1rem;
        @media (min-width: @tablet-min-width) {
            padding-bottom: 2rem;
        }
    }

    .run {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(50%);

      @media (min-width: @tablet-min-width) {
          position: relative;
          left: auto;
          transform: none;
          margin-top: 2rem;

          &:hover {
            border: 1px solid @prompt-side-color;
          }
      }
    }
}
</style>
