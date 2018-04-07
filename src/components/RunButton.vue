<template>
<div class="run button">Run</div>
</template>

<script>
export default {
  name: 'RunButton'
}
</script>

<style scoped lang="less">
@import "../assets/variables.less";

.run {
    background-color: @prompt-side-color;
    border: 1px solid @code-side-color;
    padding: 0.5rem 1rem;
    z-index: 1;
    color: @code-side-color;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: @code-side-color;
        color: @prompt-side-color;
    }
}
</style>
