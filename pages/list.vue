<template>
  <div class="List">
    <HeroSmall></HeroSmall>
    <Feed :on-list="true" :elements="elements" :categories="categories" class="Home__left">
      </Feed>
    <Footer></Footer>
  </div>
</template>

<script>
import HeroSmall from '@/components/HeroSmall/HeroSmall.vue';
import Feed from '@/components/Feed/Feed.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: 'List',
  components: {
    HeroSmall,
    Feed,
    Footer
  },
  data() {
    return {
      savedAnimations: {}
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
@import '../styles/views/list.scss';
@import '../styles/views/general.scss';
</style>