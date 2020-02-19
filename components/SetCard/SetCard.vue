<template>
  <div class="SetCard">
    <div class="SetCard__wrapper">
      <nuxt-link :to="'/sets/' + id.toString()" class="SetCard__link">
        <video v-if="videos" v-for="video in videos.slice(0, 2)" :key="video.id" autoplay muted loop class="SetCard__video">
          <source :src="video" type=" video/mp4" />
        </video>
      </nuxt-link>
      <div class="SetCard__content">
        <div class="SetCard__tags">
          <div v-if="tags" v-for="tag in tags" :key="tag.id" class="SetCard__tag">
            {{ tag }}
          </div>
        </div>
        <nuxt-link :to="'/sets/' + id.toString()" class="SetCard__link">
          <div class="SetCard__heart"></div>
          <div class="SetCard__headline">{{ name }}</div>
          <div class="SetCard__description">{{ description }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
export default {
  name: 'SetCard',
  props: {
    id:{
      type: Number,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    videos: {
      type: Array,
      default: () => [],
    },
    valueSet: {
      type: Object,
      default: () => {}
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isSaved: false
    };
  }
};
</script>

<style lang="scss">
@import './SetCard.scss';
</style>
