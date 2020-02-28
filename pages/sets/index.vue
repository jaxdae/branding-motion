<template>
  <div class="Sets">
    <transition name="opacity">
    <div class="Sets__darker" v-if="popupOpen || popupUploadOpen"></div>
    </transition>
    <transition name="scale-up">
      <Popup v-if="popupOpen" @popupOpen="setPopupState"></Popup>
    </transition>
    <transition name="scale-up">
      <popup-upload v-if="popupUploadOpen" @popupOpen="setPopupState"></popup-upload>
    </transition>
    <hero-small
      :name="'Animation Sets'"
      :description="'Go through all of your saved sets and animations, edit them and export the complete set once your set is completed.'">
    </hero-small>
    <div class="Sets__overview-feed">
      <div class="Sets__info">
        <div class="Sets__results">
          {{ `You have ${number} personal animation sets` }}
        </div>
        <Button 
            class="Sets__button--import"
            :label="'Import animation set'"
            :link="'/sets'"
            @click.native="importSet"
          >
          </Button>
          <Button 
            class="Sets__button"
            :label="'Add new animation set'"
            :link="'/sets'"
            @click.native="addSet"
          >
          </Button>
        </div>
        <transition-group name="fade">
      <set-card
        v-if="setRemoved && sets.length >= 1"
        v-for="card in sets"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :tags="card.tags"
        :description="card.description"
        :videos="card.videos"
      ></set-card>
      </transition-group>
      <preloader class="Sets__preloader" v-if="!setsReady"></preloader>
      <empty-placeholder v-if="sets.length < 1"></empty-placeholder>
    </div>
    <cross-ref-slider
      :subheadline="'See curated sets'"
      :headline="'Feeling uninspired?'"
      :cards="modifiedCards"
      isSet
    >
    </cross-ref-slider>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Sets',
  data() {
    return {
      popupOpen: false,
      popupUploadOpen: false,
    };
  },
  computed: {
    number() {
      return this.sets.length;
    },
    ...mapGetters({
      sets: 'setoverview/sets',
      curatedCards: 'setoverview/curatedCards',
      setRemoved: 'setdetail/setRemoved',
      setsReady: 'setoverview/setsReady',
    }),
    modifiedCards() {
      this.curatedCards.forEach(card => {
        card.video = card.videos[0]
      })
      return this.curatedCards
    }
  },
  methods: {
    importSet() {
      this.popupUploadOpen = true;
      document.getElementsByTagName('body')[0].classList.add('hidden');
    },
    addSet() {
      this.popupOpen = true;
      document.getElementsByTagName('body')[0].classList.add('hidden');
    },
    setPopupState(popupOpen) {
      this.popupOpen = popupOpen;
      this.popupUploadOpen = popupOpen;
    }
  },
  watch: {
    setRemoved (newVal, oldVal) {
      if(newVal == true){
        this.$store.dispatch('setoverview/getSets');
      }
    }
  },
  mounted(){
    this.$store.dispatch('setoverview/getCuratedSets');
    this.$store.dispatch('setoverview/getSets');
  }
};
</script>
<style lang="scss">
@import '../../styles/views/sets.scss';
@import '../../styles/views/general.scss';
@import '../../styles/animations.scss';
</style>