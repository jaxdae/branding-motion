<template>
  <div class="CrossSellCard">
    <nuxt-link :to="id.toString()" class="CrossSellCard__link">
      <div class="CrossSellCard__wrapper">
        <video autoplay muted loop class="CrossSellCard__video">
          <source :src="video" type="video/mp4" />
        </video>
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
          <div class="CrossSellCard__headline">{{ name }}</div>
          <div class="CrossSellCard__description">{{ description }}</div>
        </div>
      </div>
    </nuxt-link>
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
      //  required:true
    }
  },
  data() {
    return {
      isSaved: false,
      tags: []
    };
  },
  methods: {
    save() {
      if (!this.isSaved) {
        this.isSaved = true;
      } else {
        this.isSaved = false;
      }
    },
    getTags() {
      this.$axios.get('/api/animationtags/' + this.id)
       .then(response => {
         this.tags = response.data.map(tag => {
          return tag.name;
        })
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  mounted(){
    this.getTags();
  }
};
</script>

<style lang="scss">
@import './CrossSellCard.scss';
</style>
