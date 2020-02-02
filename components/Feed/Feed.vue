<template>
  <div class="Feed">
    <div v-if="!onList" class="Feed__search-results">
      {{ `${number} results for "${searchTerm}"` }}
    </div>
    <div class="Feed__filter-wrapper">
      <div class="Feed__left">
        <div
          v-for="(filter, index) in $store.getters.activeTagsElements"
          :key="filter.id"
          class="Feed__filter"
        >
          {{ filter }}
          <span @click="removeElement(index)" class="Feed__close"></span>
        </div>
        <div
          v-for="(filter, index) in $store.getters.activeTagsCategories"
          :key="filter.id"
          class="Feed__filter"
        >
          {{ filter }}
          <span @click="removeCategory(index)" class="Feed__close"></span>
        </div>
      </div>
    </div>
    <div v-if="initialCards && !anyFilterSelected" class="Feed__cards">
      <Card
        v-for="card in initialCards"
        v-if="initialLoad"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :tags="card.tags"
        :description="card.description"
        :video="card.video"
        :valueset="card.valueSet"
        class="Feed__card"
      >
      </Card>
    </div>
    <div v-else class="Feed__cards">
      <Card
        v-for="card in filteredCards"
        v-if="allLoad"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :tags="card.tags"
        :description="card.description"
        :video="card.video"
        :valueset="card.valueSet"
        class="Feed__card"
      >
      </Card>
    </div>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
import Card from '../AnimationCard/AnimationCard';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Feed',
  components: {
    Card
  },
  props: {
    onList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      number: 6,
      searchTerm: 'Hover',
    }
  },
  computed: {
    ...mapState([
      'activeTagsCategories',
      'activeTagsElements',
      'initialLoad',
      'allLoad',
      'anyFilterSelected'
    ]),
    ...mapGetters([
      'initialCards',
      'allCards'
    ]),
    filteredCards() {
      let filtered = {};
      this.allCards.forEach((card, index) => {
        console.log(card)
        card.tags.forEach(tag => {
          if(this.activeTagsElements.includes(tag)){
            filtered[index] = card;
          }
        })
      })
      return(filtered)
    }
  },
  methods: {
    removeElement(index) {
     this.$store.commit('removeTagElements', index);
     this.$store.commit('disableFilter');
    },
    removeCategory(index) {
      this.$store.commit('removeTagCategories', index);
      this.$store.commit('disableFilter');
    }
  },
  mounted() {
    this.$store.dispatch('getInitialCards');
    this.$store.dispatch('getAllCards');
  }
};
</script>

<style lang="scss">
@import './Feed.scss';
</style>
