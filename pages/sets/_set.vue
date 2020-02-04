<template>
  <div class="Set">
    <HeroSmall
      :tags="tags"
      :name="'Animations Name'"
      :description="'Description Text'">
    </HeroSmall>
    <Footer></Footer>
  </div>
</template>

<script>
import HeroSmall from '@/components/HeroSmall/HeroSmall.vue';
import Feed from '@/components/Feed/Feed.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: 'Set',
  components: {
    HeroSmall,
    Feed,
    Footer
  },
  data() {
    return {
      savedAnimations: {},
      tags: ['Luxurious', 'Feminine']
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
@import '../../styles/views/sets.scss';
@import '../../styles/views/general.scss';
</style>