<template>
  <div class="CrossSellCard">
    <div class="CrossSellCard__wrapper">
      <nuxt-link :to="link" class="CrossSellCard__link">
        <video autoplay muted loop class="CrossSellCard__video">
          <source :src="video" type="video/mp4" />
        </video>
      </nuxt-link>
      <div class="CrossSellCard__content">
        <div class="CrossSellCard__tags">
          <div v-for="tag in tags" :key="tag.id" class="CrossSellCard__tag">
            {{ tag }}
          </div>
        </div>
        <div
          @click="save"
          :class="{ saved: isSaved }"
          class="CrossSellCard__heart"
        ></div>
        <div
          @click="save"
          :class="{ savedbg: isSaved }"
          class="CrossSellCard__heart--full"
        ></div>
        <nuxt-link :to="link" class="CrossSellCard__link">
          <div class="CrossSellCard__headline">{{ name }}</div>
          <div class="CrossSellCard__description">{{ description }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
export default {
  name: 'CrossSellCard',
  components: {},
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    video: {
      type: String,
      required: true
    },
    valueSet: {
      type: Object,
      default: () => {}
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
      isSaved: false,
    };
  },
  computed: {
      link() {
        if(this.isSet){
          return ('/sets/' + this.id.toString());
        } else {
          return this.id.toString();
        }
      }
  },
  methods: {
    save() {
      if (!this.isSaved) {
        this.isSaved = true;
      } else {
        this.isSaved = false;
      }
    },
  }
};
</script>

<style lang="scss">
@import './CrossSellCard.scss';
</style>
