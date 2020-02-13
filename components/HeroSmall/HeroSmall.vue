<template>
  <div class="HeroSmall">
    <svg class="HeroSmall__waves" viewBox="0 0 120 28">
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
        class="HeroSmall__wave"
        xlink:href="#wave"
      ></use>
    </svg>
    <div class="HeroSmall__main">
      <transition name="fade-in-up">
        <div v-if="animation" class="HeroSmall__intro">
          <div v-for="tag in animation.tags" :key="tag" class="HeroSmall__tag">
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
          <div v-if="tag" v-for="tag in animation.tags" :key="tag" class="HeroSmall__tag">
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
    <nuxt-link to="/" class="HeroSmall__logo"></nuxt-link>
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
