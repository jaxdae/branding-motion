<template>
  <div class="Hero">
    <div class="Hero__main">
      <div class="Hero__left">
        <div class="Hero__intro">
          <div class="Hero__subheadline Hero__subheadline--left">
            About branding motion
          </div>
          <div class="Hero__headline Hero__headline--left">
            Get inspired!
          </div>
          <div class="Hero__description Hero__description--left">
            Branding motion is a platform for ready-to-copy frontend animations
            that are fitted perfectly to your brand's identity. <br /><br />
            Browse through curated sets or get started by setting all the trait
            filters. Recieve completely adjustable results in seconds. Save them
            on lists and export the code in your preferred language!
          </div>
          <div class="Hero__scroll">
            <span class="Hero__scroll-text">Scroll</span>
          </div>
        </div>
      </div>
      <slick
        ref="slick"
        v-if="sets.length>0"
        :options="slickOptions"
        @beforeChange="change"
        class="Hero__middle"
      >
      <div v-for="set in sets" :key="set.id">
        <div
          v-for="video in set.videos.slice(0, 3)"
          :key="video.id"
          class="Hero__video"
        >
          <video muted loop autoplay class="Hero__single-video">
            <source :src="video" type="video/mp4" />
          </video>
        </div>
        </div>
      </slick>
      <div class="Hero__right">
        <transition-group name="bounce" mode="out-in">
          <div
            v-for="(set, index) in sets"
            :key="set.id"
            v-if="currentSlide == index"
            class="Hero__info"
          >
            <div class="Hero__tag-wrapper">
              <div
                v-for="tag in set.tags"
                :key="tag.id"
                class="AnimationCard__tag"
              >
                {{ tag }}
              </div>
            </div>
            <nuxt-link :to="'/sets/' + set.id">
            <div class="Hero__content Hero__content--right">
              <div class="Hero__subheadline Hero__subheadline--right">
                Pre-picked animation sets
              </div>
              <div class="Hero__headline Hero__headline--right">
                {{ set.name }}
              </div>
              <div class="Hero__description Hero__description--right">
                {{ set.description }}
              </div>
            </div>
            </nuxt-link>
          </div>
        </transition-group>
      </div>
    </div>
    <nuxt-link to="/">
    <preloader class="Hero__preloader" once></preloader>
    </nuxt-link>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
import Slick from 'vue-slick';
export default {
  name: 'Hero',
  components: {
    Slick
  },
  props: {
    sets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      slickOptions: {
        dots: true,
        vertical: true,
        slidesToShow: 3,
        slidesToScroll:1,
        verticalSwiping: true,
        speed: 800,
        prevArrow: false
      },
      firstString: true,
      currentSlide: 0,
    };
  },
  methods: {
    change(event, slick, currentSlide) {
      if(this.currentSlide < this.sets.length - 1){
      this.currentSlide = slick.currentSlide + 1;
      }else{
        this.currentSlide = 0;
      }
    }
  },
};
</script>

<style lang="scss">
@import './Hero.scss';
</style>
