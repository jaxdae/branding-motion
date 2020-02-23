<template>
  <div class="AnimationCard">
    <div class="AnimationCard__wrapper">
      <nuxt-link :to="link" class="AnimationCard__link">
        <video autoplay muted loop class="AnimationCard__video">
          <source :src="video" type="video/mp4" />
        </video>
      </nuxt-link>
      <div class="AnimationCard__content">
        <div v-if="showListChooser" class="AnimationCard__wishlist-overlay">
          <div class="AnimationCard__wishlist-wrapper">
            <div
              v-for="(sets, index) in availableSets"
              :key="sets.id"
              class="AnimationCard__save-option"
              @click="saveToSet(index)"
            >
              {{sets.name}}
            </div>
          </div>
        </div>
        <div class="AnimationCard__tags">
          <div v-if="tags" v-for="tag in tags" :key="tag.id" class="AnimationCard__tag">
            {{ tag }}
          </div>
        </div>
        <div 
          v-if="!inSet"
          class="AnimationCard__save"
        >
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
        </div>
        <div 
        @click="remove" v-else class="AnimationCard__delete">
        </div>
        <nuxt-link :to="link" class="AnimationCard__link">
          <div class="AnimationCard__headline">{{ name }}</div>
          <div class="AnimationCard__description">{{ description }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
import { mapGetters } from 'vuex';
export default {
  name: 'AnimationCard',
  components: {},
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
    inSet: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isSaved: false,
      showListChooser: false,
      savedToSet: null,
    };
  },
  computed: {
...mapGetters({
      availableSets: 'availableSets'
    }),
    link() {
      if(this.inSet){
        return '/' + this.id.toString();
      }else{
        return this.id.toString();
      }
    }
  },
  methods: {
    save() {
      if(!this.isSaved){
        if(this.availableSets.length > 1){
          this.showListChooser = true;
        }else{
        this.saveToSet(0);
        }
      }
    },
    saveToSet(index) {
      let req = {
        animationId: this.id,
        setId: this.availableSets[index].id
      }
      this.$store.dispatch('saveToSet', req);
      this.showListChooser = false;
      this.isSaved = true;
      this.savedToSet = req.setId;
    },
    remove() {
      this.$store.dispatch('removeFromSet', this.id);
    }
  },
  mounted(){
    this.$store.dispatch('getAllSets');
  }
};
</script>

<style lang="scss">
@import './AnimationCard.scss';
</style>
