<template>
  <div class="HeroSmall">
    <div class="HeroSmall__main">
      <transition name="fade-in-up">
        <div v-if="animation" class="HeroSmall__intro">
          <div v-for="tag in tags" :key="tag" class="HeroSmall__tag">
            {{ tag }}
          </div>
          <div class="HeroSmall__headline HeroSmall__headline--left">
            {{ animation.name }}
          </div>
          <div class="HeroSmall__description HeroSmall__description--left">
            {{ animation.description }}
          </div>
        </div>
        <div v-else class="HeroSmall__intro">
          <div v-if="tag" v-for="tag in tags" :key="tag" class="HeroSmall__tag">
            {{ tag }}
          </div>
          <div class="HeroSmall__headline HeroSmall__headline--left">
            {{ name }}
          </div>
          <div class="HeroSmall__description HeroSmall__description--left">
           {{ description }}
          </div>
        </div>
      </transition>
    </div>
    <nuxt-link to="/">
    <preloader class="Hero__preloader" once></preloader>
    </nuxt-link>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';

export default {
  name: 'HeroSmall',
  props: {
    animation: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String, 
      default: ''
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
      }
    };
  }
};
</script>

<style lang="scss">
@import './HeroSmall.scss';
</style>
