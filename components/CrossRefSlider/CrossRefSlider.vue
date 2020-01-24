<template>
  <div class="CrossRefSlider">
    <div class="CrossRefSlider__subheadline">Discover more animations</div>
    <div class="CrossRefSlider__headline">Want to complete your set?</div>
    <slick ref="slick" :options="slickOptions">
      <cross-sell-card
        v-for="card in cards"
        :key="card.id"
        :name="card.name"
        :description="card.description"
        :tags="card.tags"
        :video="card.video"
      ></cross-sell-card>
    </slick>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
import Slick from 'vue-slick';
import CrossSellCard from '../CrossSellCard/CrossSellCard';

export default {
  name: 'TopFilter',
  components: {
    CrossSellCard,
    Slick
  },
  props: {
    crossSells: {
      type: Array,
      default: () => []
    },
    cards: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 800
      }
    };
  },
  methods: {
    handleBeforeChange() {
      console.log('h');
    }
  }
};
</script>

<style lang="scss">
@import './CrossRefSlider.scss';
</style>
