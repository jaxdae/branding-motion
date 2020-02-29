<template>
  <div class="HeroSmall">
        <transition name="opacity">
    <div class="Sets__darker" v-if="popupOpen"></div>
    </transition>
    <transition name="scale-up">
      <Popup
        v-if="popupOpen"
        edit
        :oldName="name"
        :oldDescription="description"
        :oldTags="tags"
        :setId="setId"
        @popupOpen="closePopup">
      </Popup>
    </transition>
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
           <div class="HeroSmall__tags">
          <div v-if="tag" v-for="tag in tags" :key="tag" class="HeroSmall__tag">
            {{ tag }}
          </div>
          <div class="HeroSmall__edit-tags" v-if="editable" @click="openPopup"></div>
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
    },
    editable: {
      type: Boolean,
      default: false,
    },
    setId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      popupOpen: false
    };
  },
  methods: {
    openPopup() {
      this.popupOpen = true;
    },
    closePopup() {
      this.popupOpen = false;
    }
  }
};
</script>

<style lang="scss">
@import './HeroSmall.scss';
@import './../../styles/animations.scss';
</style>
