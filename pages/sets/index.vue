<template>
  <div class="Sets">
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
            :link="'sets'"
            @click.native="importSet"
          >
          </Button>
          <Button 
            class="Sets__button"
            :label="'Add new animation set'"
            :link="'sets'"
            @click.native="addSet"
          >
          </Button>
        </div>
      <set-card
        v-if="setRemoved"
        v-for="card in sets"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :tags="card.tags"
        :description="card.description"
        :videos="card.videos"
      ></set-card>
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
    };
  },
  computed: {
    number() {
      return this.sets.length;
    },
    ...mapState({
      curatedLoad: 'setoverview/curatedLoad',
    }),
    ...mapGetters({
      sets: 'setoverview/sets',
      curatedCards: 'setoverview/curatedCards',
      setRemoved: 'setdetail/setRemoved'
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
      console.log('importSet')
    },
    addSet() {
      console.log('addSet')
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
</style>