<template>
  <div v-if="cards.length >= 1" class="CrossRefSlider">
    <div class="CrossRefSlider__subheadline">{{subheadline}}</div>
    <div class="CrossRefSlider__headline">{{ headline }}</div>
    <slick ref="slick" :options="slickOptions" v-if="cards.length >= 1">
      <cross-sell-card
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :description="card.description"
        :tags="card.tags"
        :settagsId="card.tagIds"
        :video="card.video"
        :isSet="isSet"
      ></cross-sell-card>
    </slick>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';

export default {
  name: 'TopFilter',
  props: {
    cards: {
      type: Array,
      default: () => []
    },
    headline: {
      type: String,
      default: ''
    },
    subheadline: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: () => []
    },
    isSet: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 800,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      }
    };
  },
};
</script>

<style lang="scss">
@import './CrossRefSlider.scss';
</style>
