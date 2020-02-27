<template>
  <div class="Home">
    <Hero :sets="curatedCards"></Hero>
    <top-filter class="Home__topfilter"></top-filter>
    <div class="Home__content">
      <div class="Home__left">
        <Feed :allCards="displayCards" :allLoad="displayLoad">
          </Feed>
      </div>
      <div class="Home__right">
        <Button
          class="Home__cart"
          :label="'View animation set'"
          :link="'/sets'"
        >
        </Button>
        <Filters :filteroptions="filteroptions" class="Home__filters"></Filters>
      </div>
    </div>
 <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      elements: [],
      categories: [],
      filteroptions: {
        rational: {
          left: 'rational',
          right: 'emotional'
        },
        innovative: {
          left: 'innovative',
          right: 'traditional'
        },
        maskuline: {
          left: 'maskuline',
          right: 'feminine'
        },
        personal: {
          left: 'personal',
          right: 'institutional'
        },
        serious: {
          left: 'serious',
          right: 'straightforward'
        },
        luxurious: {
          left: 'luxurious',
          right: 'inexpensive'
        },
        delicate: {
          left: 'delicate',
          right: 'sturdy'
        },
        simple: {
          left: 'simple',
          right: 'complex'
        }
      }
    };
  },
   computed: {
    ...mapState({
      curatedLoad: 'setoverview/curatedLoad',
      allLoad: 'allLoad',
      initialLoad: 'initialLoad'
    }),
    ...mapGetters({
      curatedCards: 'setoverview/curatedCards',
      allCards: 'allCards',
      initialCards: 'initialCards'
    }),
    displayCards() {
      if(!this.allLoad){
        return this.initialCards;
      }else {
        return this.allCards;
      }
    },
    displayLoad() {
      if(!this.allLoad){
        return this.initialLoad;
      }else {
        return this.allLoad;
      }
    }
  },
  methods: {
    tags(categories, elements) {
      this.elements = elements;
      this.categories = categories;
    }
  },
  mounted() {
    this.$store.dispatch('getInitialCards');
    this.$store.dispatch('getAllCards');
    this.$store.dispatch('setoverview/getCuratedSets');
  }
};
</script>

<style lang="scss">
@import '../styles/views/general.scss';
@import '../styles/views/home.scss';
</style>
