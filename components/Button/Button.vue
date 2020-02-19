<template>
  <nuxt-link v-if="link" :to="link" class="Button__button-wrapper">
    <button class="Button__button">{{label}}</button>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import './Button.scss';
</style>
