<template>
  <div class="imprint">
    <Hero></Hero>
    <Footer></Footer>
  </div>
</template>

<script>
import Hero from '@/components/Hero/Hero.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: 'PrivacyPolicy',
  components: {
    Hero,
    Footer
  }
};
</script>
