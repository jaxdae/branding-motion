<template>
  <div class="Set">
    <HeroSmall
      :tags="tags"
      :name="'Animations Name'"
      :description="'Description Text'">
    </HeroSmall>
    <div v-if="customSets" style="color:white">{{customSets}}</div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
   computed: {
    ...mapState([
      'customSets'
    ])
  },
  methods: {
  },
  mounted(){
    console.log(this.$store)
  }
};
</script>
<style lang="scss">
@import '../../styles/views/sets.scss';
@import '../../styles/views/general.scss';
</style>