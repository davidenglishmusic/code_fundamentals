<template>
<div class="navigation">
  <div class="previous button" v-on:click="$emit('previous')">&lt;</div>
  <div class="next button" v-on:click="$emit('next')">&gt;</div>
</div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped lang="less">
@import "../assets/variables.less";

.navigation {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    padding: 0.5rem;
    z-index: 1;

    .button {
        border-radius: 3rem;
        background-color: @code-side-color;
        border: 1px solid;
        border-color: @prompt-side-color;
        color: @prompt-side-color;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.25rem;
        cursor: pointer;

        &:hover {
            background-color: @prompt-side-color;
            color: @code-side-color;
        }
        @media (min-width: @tablet-min-width) {
            background-color: @prompt-side-color;
            border-color: @code-side-color;
            color: @code-side-color;

            &:hover {
                background-color: @code-side-color;
                color: @prompt-side-color;
            }
        }
    }
}
</style>
