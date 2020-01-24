<template>
  <div class="Hero">
    <svg class="Hero__waves" viewBox="0 0 120 28">
      <defs>
        <path
          id="wave"
          d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
        />
      </defs>
      <use
        v-for="wave in waves"
        :key="wave.id"
        :x="wave.x"
        :y="wave.y"
        class="Hero__wave"
        xlink:href="#wave"
      ></use>
    </svg>
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
        :options="slickOptions"
        @beforeChange="handleBeforeChange"
        class="Hero__middle"
      >
        <div
          v-for="video in sets.set.videos"
          :key="video.id"
          class="Hero__video"
        >
          <video muted loop autoplay class="Hero__single-video">
            <source :src="video" type="video/mp4" />
          </video>
        </div>
      </slick>
      <div class="Hero__right">
        <transition-group name="bounce" mode="out-in">
          <div
            v-for="set in sets"
            :key="set.id"
            v-if="currentSlide == set.id"
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
            <div class="Hero__content Hero__content--right">
              <div class="Hero__subheadline Hero__subheadline--right">
                {{ set.subheadline }}
              </div>
              <div class="Hero__headline Hero__headline--right">
                {{ set.headline }}
              </div>
              <div class="Hero__description Hero__description--right">
                {{ set.description }}
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="Hero__logo"></div>
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
  data() {
    return {
      slickOptions: {
        dots: true,
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        verticalSwiping: true,
        speed: 800,
        prevArrow: false
      },
      waves: {
        wave01: {
          x: 0,
          y: 8
        },
        wave02: {
          x: 0,
          y: 0
        },
        wave03: {
          x: 0,
          y: -8
        },
        wave04: {
          x: 0,
          y: -6
        },
        wave05: {
          x: 0,
          y: 6
        }
      },
      firstString: true,
      currentSlide: 0,
      sets: {
        set: {
          id: 0,
          tags: ['Feminine', 'Luxurious'],
          subheadline: 'pre-picked animation sets',
          headline: 'Sparkling joy',
          description:
            'A lightweight, feminine feel with a touch of luxury. This animation set includes: Button, Link, Slider, Add to wishlist, Add to cart, Page transition, …',
          videos: {
            video1: require('../../assets/videos/animation.mp4'),
            video2: require('../../assets/videos/animation.mp4'),
            video3: require('../../assets/videos/animation.mp4'),
            video4: require('../../assets/videos/animation.mp4'),
            video5: require('../../assets/videos/animation.mp4'),
            video6: require('../../assets/videos/animation.mp4')
          }
        },
        set1: {
          id: 1,
          tags: ['Robust', 'Simple'],
          subheadline: 'pre-picked animation sets',
          headline: 'Pure simplicity',
          description:
            'A lightweight, feminine feel with a touch of luxury. This animation set includes: Button, Link, Slider, Add to wishlist, Add to cart, Page transition, …',
          videos: {
            video1: require('../../assets/videos/animation.mp4'),
            video2: require('../../assets/videos/animation.mp4'),
            video3: require('../../assets/videos/animation.mp4')
          }
        }
      }
    };
  },
  methods: {
    handleBeforeChange(event, slick, currentSlide, nextSlide) {
      this.currentSlide = slick.currentSlide / 3;
    }
  }
};
</script>

<style lang="scss">
@import './Hero.scss';
</style>
