<template>
  <div class="Code">
    <div class="Code__html">
      <div class="Code__headline">HTML</div>
      <pre v-highlightjs><code>{{ html }}</code></pre>
    </div>
    <div class="Code_css">
      <div class="Code__headline">CSS</div>
      <pre v-highlightjs><code>{{ css }}</code></pre>
    </div>
    <div class="Code_js">
      <div class="Code__headline">JavaScript</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Code',
  props: {
    html: {
      type: String,
      default: ''
    },
    css: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import './Code.scss';
</style>
