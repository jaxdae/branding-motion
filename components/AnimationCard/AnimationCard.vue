<template>
  <div class="AnimationCard">
    <div class="AnimationCard__wrapper">
      <nuxt-link to="/detail" class="AnimationCard__link">
        <video autoplay muted loop class="AnimationCard__video">
          <source :src="video" type="video/mp4" />
        </video>
      </nuxt-link>
      <div class="AnimationCard__content">
        <div class="AnimationCard__tags">
          <div v-for="tag in tags" :key="tag.id" class="AnimationCard__tag">
            {{ tag }}
          </div>
        </div>
        <div
          @click="save"
          :class="{ saved: isSaved }"
          class="AnimationCard__heart"
        ></div>
        <div
          @click="save"
          :class="{ savedbg: isSaved }"
          class="AnimationCard__heart--full"
        ></div>
        <nuxt-link to="/detail" class="AnimationCard__link">
          <div class="AnimationCard__headline">{{ name }}</div>
          <div class="AnimationCard__description">{{ description }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
export default {
  name: 'AnimationCard',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    video: {
      type: String,
      required: true
    },
    valueSet: {
      type: Object,
      default: () => {}
      //  required:true
    },
    html: {
      type: String,
      default: ''
    },
    css: {
      type: String,
      default: ''
    },
    js: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isSaved: false
    };
  },
  methods: {
    save() {
      if (!this.isSaved) {
        this.isSaved = true;
      } else {
        this.isSaved = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import './AnimationCard.scss';
</style>
