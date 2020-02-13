<template>
  <div class="Sets">
    <HeroSmall
      :name="'Animation Sets'"
      :description="'Go through all of your saved sets and animations, edit them and export the complete set once your set is completed.'">
    </HeroSmall>
    <div class="Sets__overview-feed">
      <div class="Sets__info">
        <div class="Sets__results">
          {{ `You have ${number} personal animation sets` }}
        </div>
          <Button 
            class="Sets__button"
            :label="'Add new animation set'"
          >
          </Button>
        </div>
      <SetCard
        v-for="card in sets"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :tags="card.tags"
        :description="card.description"
        :videos="card.videos"
      ></SetCard>
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
import HeroSmall from '@/components/HeroSmall/HeroSmall.vue';
import Button from '@/components/Button/Button.vue';
import Feed from '@/components/Feed/Feed.vue';
import Footer from '@/components/Footer/Footer.vue';
import SetCard from '@/components/SetCard/SetCard.vue';
import CrossRefSlider from '@/components/CrossRefSlider/CrossRefSlider.vue';

export default {
  name: 'Sets',
  components: {
    Button,
    CrossRefSlider,
    HeroSmall,
    Feed,
    Footer,
    SetCard
  },
  data() {
    return {
    };
  },
  computed: {
    number() {
      return this.sets.length;
    },
    ...mapState([
      'curatedLoad'
    ]),
    ...mapGetters([
      'curatedCards',
      'sets'
    ]),
    modifiedCards() {
      this.curatedCards.forEach(card => {
        card.video = card.videos[0]
      })
      return this.curatedCards
    }
  },
  mounted(){
    this.$store.dispatch('getCuratedSets');
    this.$store.dispatch('getSets');
  }
};
</script>
<style lang="scss">
@import '../../styles/views/sets.scss';
@import '../../styles/views/general.scss';
</style>