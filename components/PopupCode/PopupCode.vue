<template>
  <div class="PopupCode">
    <div class="PopupCode__window">
      <div class="PopupCode__close" @click="close"></div>
      <h1 class="PopupCode__title">Get the code</h1>
      <div class="PopupCode__left">
        <h2 class="PopupCode__headline">HTML / Template</h2>
        <div class="PopupCode__codeblock">
          <pre v-highlightjs><code>{{ html }}</code></pre>
          <span class="PopupCode__copy" v-clipboard="() => html" v-clipboard:success="onHtmlCopy">{{copyTextHtml}}</span>
        </div>
        <h2 class="PopupCode__headline">CSS / Styling</h2>
        <div class="PopupCode__codeblock">
          <pre v-highlightjs><code>{{ css }}</code></pre>
          <span class="PopupCode__copy" v-clipboard="() => css" v-clipboard:success="onCssCopy">{{copyTextCss}}</span>
        </div>
        <h2 class="PopupCode__headline">JavaScript / Script</h2>
        <div class="PopupCode__codeblock">
        <pre v-highlightjs><code>{{ js }}</code></pre>
        <span class="PopupCode__copy" v-clipboard="() => js" v-clipboard:success="onJsCopy">{{copyTextJs}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupCode',
  props: {
    html: {
      type: String,
      default: ''
    },
    css: {
      type: String,
      default: ''
    },
    js: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      copyTextHtml: 'copy',
      copyTextCss: 'copy',
      copyTextJs: 'copy',
    };
  },
  computed: {
  },
  methods: {
    close() {
      document.getElementsByTagName('body')[0].classList.remove('hidden');
      this.$emit('popupOpen', false);
    },
     onHtmlCopy() {
      this.copyTextCss = 'copy';
      this.copyTextHtml = 'copied';
      this.copyTextJs = 'copy';
    },
    onCssCopy() {
      this.copyTextCss = 'copied';
      this.copyTextHtml = 'copy';
      this.copyTextJs = 'copy';
    },
     onJsCopy() {
      this.copyTextJs = 'copied';
      this.copyTextCss = 'copy';
      this.copyTextHtml = 'copy';
    },
  }
};
</script>

<style lang="scss">
@import './PopupCode.scss';
</style>