<template>
  <div class="Footer">
    <div class="Footer__wrapper">
      <div class="Footer__links">
        <nuxt-link to="/imprint" class="Footer__link">Imprint</nuxt-link>
        <nuxt-link to="/privacypolicy" class="Footer__link">
          Privacy Policy
        </nuxt-link>
      </div>
      <div class="Footer__share">
        <div class="Footer__facebook"></div>
        <div class="Footer__instagram"></div>
      </div>
    </div>
    <div class="Footer__copyright">
      © Branding Motion – 2020
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import './Footer.scss';
</style>
