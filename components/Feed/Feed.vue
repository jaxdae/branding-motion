<template>
  <div class="Feed">
    <div v-show="!onList && searchTerm" class="Feed__search-results">
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
      number: null,
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
      'allCards',
      'searchTerm',
      'currentBrandSet',
      'activeSearch',
      'activeElement',
      'activeCategory',
    ]),
      filteredCards() {
      let filtered = {};
      if(this.activeSearch){
        let searchedCards = {};
        this.allCards.forEach((card, index) => {
          if(card.name.includes(this.searchTerm)){
          searchedCards[index] = card;
          }
        })
        if(this.activeElement && !this.activeCategory || this.activeCategory && !this.activeElement){
          if(this.activeElement){
            let searchedElementCards = {};
            Object.values(searchedCards).forEach((card, index) => {
              card.tags.forEach(tag => {
                if(this.activeTagsElements.includes(tag)){
                  searchedElementCards[index] = card;
                }
              })
            })
            this.number = Object.values(searchedElementCards).length;
            return searchedElementCards;
          }
          else {
            let searchedCategoryCards = {};
            Object.values(searchedCards).forEach((card, index) => {
              card.tags.forEach(tag => {
                if(this.activeTagsCategories.includes(tag)){
                  searchedCategoryCards[index] = card;
                }
              })
            })
            this.number = Object.values(searchedCategoryCards).length;
            return searchedCategoryCards;
          }
        }
        else if(this.activeElement && this.activeCategory){
          let searchedElementCards = {};
          Object.values(searchedCards).forEach((card, index) => {
            card.tags.forEach(tag => {
              if(this.activeTagsElements.includes(tag)){
                searchedElementCards[index] = card;
              }
            })
          })
          let searchedElementCategoryCards = {};
          Object.values(searchedElementCards).forEach((card, index) => {
            card.tags.forEach(tag => {
              if(this.activeTagsCategories.includes(tag)){
                searchedElementCategoryCards[index] = card;
              }
            })
          })
          this.number = Object.values(searchedElementCategoryCards).length;
          return searchedElementCategoryCards;
        }
        else{
          this.number = Object.values(searchedCards).length;
          return searchedCards;
        }
      }
      else {
        if(this.activeElement && !this.activeCategory || this.activeCategory && !this.activeElement){
          if(this.activeElement){
            let elementCards = {};
             this.allCards.forEach((card, index) => {
              card.tags.forEach(tag => {
                if(this.activeTagsElements.includes(tag)){
                  elementCards[index] = card;
                }
              })
            })
            return elementCards;
          }
          else {
            let categoryCards = {};
              this.allCards.forEach((card, index) => {
              card.tags.forEach(tag => {
                if(this.activeTagsCategories.includes(tag)){
                  categoryCards[index] = card;
                }
              })
            })
            return categoryCards;
          }
        }
        else if(this.activeElement && this.activeCategory){
          let elementCategoryCards = {};
          let elementCards = {};
          this.allCards.forEach((card, index) => {
              card.tags.forEach(tag => {
              if(this.activeTagsElements.includes(tag)){
                  elementCards[index] = card;
              }
            })
          })
          Object.values(elementCards).forEach((card, index) => {
            card.tags.forEach(tag => {
              if(this.activeTagsCategories.includes(tag)){
                  elementCategoryCards[index] = card;
              }
            })
          })
          return elementCategoryCards;
        }
        else{
          return this.allCards;
        }
      }
      
    },
  },
  methods: {
    removeElement(index) {
     this.$store.commit('removeTagElements', index);
     this.$store.commit('disableFilter');
     this.$store.commit('deactivateElement');
    },
    removeCategory(index) {
      this.$store.commit('removeTagCategories', index);
      this.$store.commit('disableFilter');
      this.$store.commit('deactivateCategory');
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
